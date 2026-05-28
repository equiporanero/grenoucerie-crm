"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LocalDriver", {
    enumerable: true,
    get: function() {
        return LocalDriver;
    }
});
const _fs = require("fs");
const _nodechild_process = require("node:child_process");
const _path = require("path");
const _esbuild = require("esbuild");
const _application = require("twenty-shared/application");
const _logicfunctionexecutortmpdirfolder = require("../constants/logic-function-executor-tmpdir-folder");
const _interceptconsole = require("../utils/intercept-console");
const _temporarydirmanager = require("../utils/temporary-dir-manager");
const _handlercontant = require("../../../../metadata-modules/logic-function/constants/handler.contant");
const _logicfunctionexecutionresultdto = require("../../../../metadata-modules/logic-function/dtos/logic-function-execution-result.dto");
const _copyyarnengineandbuilddependencies = require("../../../application/application-package/utils/copy-yarn-engine-and-build-dependencies");
const LAYER_BUILD_LOCK_TTL_MS = 120_000;
const LAYER_BUILD_LOCK_RETRY_MS = 500;
const LAYER_BUILD_LOCK_MAX_RETRIES = 240;
const LAYER_BUILD_READY_SENTINEL = '.twenty-layer-ready';
const pathExists = async (targetPath)=>{
    try {
        await _fs.promises.access(targetPath);
        return true;
    } catch  {
        return false;
    }
};
let LocalDriver = class LocalDriver {
    getDepsLayerPath(flatApplication) {
        const checksum = flatApplication.yarnLockChecksum ?? 'default';
        return (0, _path.join)(_logicfunctionexecutortmpdirfolder.LOGIC_FUNCTION_EXECUTOR_TMPDIR_FOLDER, 'deps', checksum);
    }
    getSdkLayerPath({ workspaceId, applicationUniversalIdentifier }) {
        return (0, _path.join)(_logicfunctionexecutortmpdirfolder.LOGIC_FUNCTION_EXECUTOR_TMPDIR_FOLDER, 'sdk', `${workspaceId}-${applicationUniversalIdentifier}`);
    }
    async createLayerIfNotExist({ flatApplication, applicationUniversalIdentifier }) {
        const depsLayerPath = this.getDepsLayerPath(flatApplication);
        const depsReadySentinelPath = (0, _path.join)(depsLayerPath, LAYER_BUILD_READY_SENTINEL);
        if (await pathExists(depsReadySentinelPath)) {
            return;
        }
        const lockKey = `local-driver-deps-layer:${flatApplication.yarnLockChecksum ?? 'default'}`;
        await this.cacheLockService.withLock(async ()=>{
            if (await pathExists(depsReadySentinelPath)) {
                return;
            }
            await _fs.promises.rm(depsLayerPath, {
                recursive: true,
                force: true
            });
            await this.logicFunctionResourceService.copyDependenciesInMemory({
                applicationUniversalIdentifier,
                workspaceId: flatApplication.workspaceId,
                inMemoryFolderPath: depsLayerPath
            });
            await (0, _copyyarnengineandbuilddependencies.copyYarnEngineAndBuildDependencies)(depsLayerPath);
            await _fs.promises.writeFile(depsReadySentinelPath, '');
        }, lockKey, {
            ttl: LAYER_BUILD_LOCK_TTL_MS,
            ms: LAYER_BUILD_LOCK_RETRY_MS,
            maxRetries: LAYER_BUILD_LOCK_MAX_RETRIES
        });
    }
    async ensureSdkLayer({ flatApplication, applicationUniversalIdentifier }) {
        const sdkLayerPath = this.getSdkLayerPath({
            workspaceId: flatApplication.workspaceId,
            applicationUniversalIdentifier
        });
        const sdkNodeModulesPath = (0, _path.join)(sdkLayerPath, 'node_modules');
        const sdkReadySentinelPath = (0, _path.join)(sdkLayerPath, LAYER_BUILD_READY_SENTINEL);
        if (await pathExists(sdkReadySentinelPath) && !flatApplication.isSdkLayerStale) {
            return;
        }
        const lockKey = `local-driver-sdk-layer:${flatApplication.workspaceId}:${applicationUniversalIdentifier}`;
        await this.cacheLockService.withLock(async ()=>{
            const { flatApplicationMaps } = await this.workspaceCacheService.getOrRecompute(flatApplication.workspaceId, [
                'flatApplicationMaps'
            ]);
            const freshFlatApplication = flatApplicationMaps.byId[flatApplication.id];
            const isStale = freshFlatApplication?.isSdkLayerStale ?? true;
            if (await pathExists(sdkReadySentinelPath) && !isStale) {
                return;
            }
            await _fs.promises.rm(sdkLayerPath, {
                recursive: true,
                force: true
            });
            const sdkPackagePath = (0, _path.join)(sdkNodeModulesPath, 'twenty-client-sdk');
            await this.sdkClientArchiveService.downloadAndExtractToPackage({
                workspaceId: flatApplication.workspaceId,
                applicationId: flatApplication.id,
                applicationUniversalIdentifier,
                targetPackagePath: sdkPackagePath
            });
            await this.sdkClientArchiveService.markSdkLayerFresh({
                applicationId: flatApplication.id,
                workspaceId: flatApplication.workspaceId
            });
            await _fs.promises.writeFile(sdkReadySentinelPath, '');
        }, lockKey, {
            ttl: LAYER_BUILD_LOCK_TTL_MS,
            ms: LAYER_BUILD_LOCK_RETRY_MS,
            maxRetries: LAYER_BUILD_LOCK_MAX_RETRIES
        });
    }
    async transpile({ sourceCode, sourceFileName, builtFileName }) {
        const temporaryDirManager = new _temporarydirmanager.TemporaryDirManager();
        const { sourceTemporaryDir } = await temporaryDirManager.init();
        try {
            const entryFilePath = (0, _path.join)(sourceTemporaryDir, sourceFileName);
            const builtBundleFilePath = (0, _path.join)(sourceTemporaryDir, builtFileName);
            await _fs.promises.mkdir((0, _path.dirname)(entryFilePath), {
                recursive: true
            });
            await _fs.promises.writeFile(entryFilePath, sourceCode, 'utf-8');
            await _fs.promises.mkdir((0, _path.dirname)(builtBundleFilePath), {
                recursive: true
            });
            await (0, _esbuild.build)({
                entryPoints: [
                    entryFilePath
                ],
                outfile: builtBundleFilePath,
                platform: 'node',
                format: 'esm',
                target: 'esnext',
                bundle: true,
                sourcemap: true,
                packages: 'external',
                banner: _application.NODE_ESM_CJS_BANNER
            });
            const builtCode = await _fs.promises.readFile(builtBundleFilePath, 'utf-8');
            return {
                builtCode
            };
        } finally{
            await temporaryDirManager.clean();
        }
    }
    async delete() {}
    // Symlinks everything from the deps layer except twenty-client-sdk,
    // which comes from the SDK layer (workspace-specific generated client).
    async assembleNodeModules({ sourceTemporaryDir, flatApplication, applicationUniversalIdentifier }) {
        const depsNodeModules = (0, _path.join)(this.getDepsLayerPath(flatApplication), 'node_modules');
        const sdkNodeModules = (0, _path.join)(this.getSdkLayerPath({
            workspaceId: flatApplication.workspaceId,
            applicationUniversalIdentifier
        }), 'node_modules');
        const execNodeModules = (0, _path.join)(sourceTemporaryDir, 'node_modules');
        await _fs.promises.mkdir(execNodeModules, {
            recursive: true
        });
        const entries = await _fs.promises.readdir(depsNodeModules, {
            withFileTypes: true
        });
        const symlinkPromises = entries.filter((entry)=>entry.name !== 'twenty-client-sdk').map((entry)=>_fs.promises.symlink((0, _path.join)(depsNodeModules, entry.name), (0, _path.join)(execNodeModules, entry.name), entry.isDirectory() ? 'dir' : 'file'));
        await Promise.all(symlinkPromises);
        await _fs.promises.symlink((0, _path.join)(sdkNodeModules, 'twenty-client-sdk'), (0, _path.join)(execNodeModules, 'twenty-client-sdk'), 'dir');
    }
    async execute({ flatLogicFunction, flatApplication, applicationUniversalIdentifier, payload, env, timeoutMs = 900_000 }) {
        await this.createLayerIfNotExist({
            flatApplication,
            applicationUniversalIdentifier
        });
        await this.ensureSdkLayer({
            flatApplication,
            applicationUniversalIdentifier
        });
        const startTime = Date.now();
        const temporaryDirManager = new _temporarydirmanager.TemporaryDirManager();
        try {
            const { sourceTemporaryDir } = await temporaryDirManager.init();
            const inMemoryBuiltHandlerPath = await this.logicFunctionResourceService.copyBuiltCodeInMemory({
                workspaceId: flatLogicFunction.workspaceId,
                applicationUniversalIdentifier,
                builtHandlerPath: flatLogicFunction.builtHandlerPath,
                inMemoryDestinationPath: sourceTemporaryDir
            });
            await this.assembleNodeModules({
                sourceTemporaryDir,
                flatApplication,
                applicationUniversalIdentifier
            });
            let logs = '';
            const consoleListener = new _interceptconsole.ConsoleListener();
            consoleListener.intercept((type, args)=>{
                const formattedArgs = args.map((arg)=>{
                    if (typeof arg === 'object' && arg !== null) {
                        const seen = new WeakSet();
                        return JSON.stringify(arg, (_key, value)=>{
                            if (typeof value === 'object' && value !== null) {
                                if (seen.has(value)) {
                                    return '[Circular]';
                                }
                                seen.add(value);
                            }
                            return value;
                        }, 2);
                    }
                    return arg;
                });
                const formattedType = type === 'log' ? 'info' : type;
                logs += `${new Date().toISOString()} ${formattedType.toUpperCase()} ${formattedArgs.join(' ')}\n`;
            });
            try {
                const runnerPath = await this.writeBootstrapRunner({
                    dir: sourceTemporaryDir,
                    builtFileAbsPath: inMemoryBuiltHandlerPath,
                    handlerName: flatLogicFunction.handlerName
                });
                const { ok, result, error, stack, stdout, stderr } = await this.runChildWithEnv({
                    runnerPath,
                    env: env ?? {},
                    payload,
                    timeoutMs
                });
                if (stdout) logs += stdout.split('\n').filter(Boolean).map((l)=>`${new Date().toISOString()} INFO ${l}`).join('\n') + '\n';
                if (stderr) logs += stderr.split('\n').filter(Boolean).map((l)=>`${new Date().toISOString()} ERROR ${l}`).join('\n') + '\n';
                const duration = Date.now() - startTime;
                if (ok) {
                    return {
                        data: result ?? null,
                        logs,
                        duration,
                        status: _logicfunctionexecutionresultdto.LogicFunctionExecutionStatus.SUCCESS
                    };
                }
                return {
                    data: null,
                    logs,
                    duration,
                    error: {
                        errorType: 'UnhandledError',
                        errorMessage: error || 'Unknown error',
                        stackTrace: stack ? String(stack).split('\n') : []
                    },
                    status: _logicfunctionexecutionresultdto.LogicFunctionExecutionStatus.ERROR
                };
            } finally{
                consoleListener.release();
            }
        } finally{
            await temporaryDirManager.clean();
        }
    }
    async writeBootstrapRunner({ dir, builtFileAbsPath, handlerName }) {
        if (!_handlercontant.HANDLER_NAME_REGEX.test(handlerName)) {
            throw new Error(`Invalid handlerName "${handlerName}": must be a valid JavaScript identifier or dotted path`);
        }
        const runnerPath = (0, _path.join)(dir, '__runner.cjs');
        const code = `
      // Auto-generated. Do not edit.
      const { pathToFileURL } = require('node:url');

      (async () => {
        try {
          const builtUrl = pathToFileURL(${JSON.stringify(builtFileAbsPath)});
          const mod = await import(builtUrl.href);
          if (typeof mod.${handlerName} !== 'function') {
            throw new Error('Export "${handlerName}" not found in function bundle');
          }

          let payload = undefined;
          if (process.send) {
            process.on('message', async (msg) => {
              if (!msg || msg.type !== 'run') return;
              try {
                const out = await mod.${handlerName}(msg.payload);
                process.send && process.send({ ok: true, result: out });
                process.exit(0);
              } catch (err) {
                process.send && process.send({ ok: false, error: String(err), stack: err?.stack });
                process.exit(1);
              }
            });
          } else {
            // Fallback: read payload from argv[2] (JSON) and print to stdout
            const json = process.argv[2];
            payload = json ? JSON.parse(json) : undefined;
            const out = await mod.${handlerName}(payload);
            process.stdout.write(JSON.stringify({ ok: true, result: out }));
            process.exit(0);
          }
        } catch (err) {
          const msg = String(err);
          if (process.send) {
            process.send({ ok: false, error: msg, stack: err?.stack });
          } else {
            process.stdout.write(msg);
          }
          process.exit(1);
        }
      })();
    `;
        await _fs.promises.writeFile(runnerPath, code, 'utf8');
        return runnerPath;
    }
    runChildWithEnv(options) {
        const { runnerPath, env, payload, timeoutMs } = options;
        return new Promise((resolve)=>{
            // Strip NODE_OPTIONS to prevent tsx loader from being inherited
            const { NODE_OPTIONS: _n1, ...cleanProcessEnv } = process.env;
            const { NODE_OPTIONS: _n2, ...cleanUserEnv } = env;
            const child = (0, _nodechild_process.spawn)(process.execPath, [
                runnerPath
            ], {
                env: {
                    ...cleanProcessEnv,
                    ...cleanUserEnv
                },
                stdio: [
                    'pipe',
                    'pipe',
                    'pipe',
                    'ipc'
                ]
            });
            let stdout = '';
            let stderr = '';
            let settled = false;
            child.stdout?.on('data', (d)=>stdout += String(d));
            child.stderr?.on('data', (d)=>stderr += String(d));
            child.on('message', (msg)=>{
                if (settled) return;
                settled = true;
                resolve({
                    ...msg,
                    stdout,
                    stderr
                });
            });
            child.on('exit', (code)=>{
                if (settled) return;
                settled = true;
                if (code === 0) {
                    resolve({
                        ok: true,
                        stdout,
                        stderr
                    });
                } else {
                    resolve({
                        ok: false,
                        error: `Exited with code ${code}`,
                        stdout,
                        stderr
                    });
                }
            });
            const t = setTimeout(()=>{
                if (settled) return;
                settled = true;
                child.kill('SIGKILL');
                resolve({
                    ok: false,
                    error: `Timed out after ${timeoutMs}ms`,
                    stdout,
                    stderr
                });
            }, timeoutMs);
            child.send?.({
                type: 'run',
                payload
            });
            child.on('close', ()=>clearTimeout(t));
        });
    }
    constructor(options){
        this.logicFunctionResourceService = options.logicFunctionResourceService;
        this.sdkClientArchiveService = options.sdkClientArchiveService;
        this.cacheLockService = options.cacheLockService;
        this.workspaceCacheService = options.workspaceCacheService;
    }
};

//# sourceMappingURL=local.driver.js.map