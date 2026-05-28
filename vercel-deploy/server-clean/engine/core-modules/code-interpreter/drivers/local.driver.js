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
const _child_process = require("child_process");
const _fs = require("fs");
const _os = require("os");
const _path = require("path");
const _codeinterpreterconstants = require("../code-interpreter.constants");
const _getmimetypeutil = require("../utils/get-mime-type.util");
const SANDBOX_SCRIPTS_PATH = (0, _path.join)(__dirname, '..', 'sandbox-scripts');
async function copyDirectoryRecursive(src, dest) {
    await _fs.promises.mkdir(dest, {
        recursive: true
    });
    const entries = await _fs.promises.readdir(src, {
        withFileTypes: true
    });
    for (const entry of entries){
        const srcPath = (0, _path.join)(src, entry.name);
        const destPath = (0, _path.join)(dest, entry.name);
        if (entry.isDirectory()) {
            await copyDirectoryRecursive(srcPath, destPath);
        } else {
            await _fs.promises.copyFile(srcPath, destPath);
        }
    }
}
let LocalDriver = class LocalDriver {
    async execute(code, files, context, callbacks) {
        const workDir = await _fs.promises.mkdtemp((0, _path.join)((0, _os.tmpdir)(), 'code-interpreter-'));
        const outputDir = (0, _path.join)(workDir, 'output');
        const scriptsDir = (0, _path.join)(workDir, 'scripts');
        await _fs.promises.mkdir(outputDir);
        // Copy pre-installed scripts to sandbox
        try {
            await copyDirectoryRecursive(SANDBOX_SCRIPTS_PATH, scriptsDir);
        } catch  {
        // Scripts directory might not exist in dev environment
        }
        try {
            for (const file of files ?? []){
                const safeFilename = (0, _path.basename)(file.filename);
                await _fs.promises.writeFile((0, _path.join)(workDir, safeFilename), file.content);
            }
            // Rewrite E2B-style paths to local paths for compatibility
            const rewrittenCode = code.replace(/\/home\/user\/scripts\//g, `${scriptsDir}/`).replace(/\/home\/user\/scripts/g, scriptsDir).replace(/\/home\/user\/output\//g, `${outputDir}/`).replace(/\/home\/user\/output/g, outputDir).replace(/\/home\/user\//g, `${workDir}/`).replace(/\/home\/user/g, workDir);
            const scriptPath = (0, _path.join)(workDir, 'script.py');
            await _fs.promises.writeFile(scriptPath, rewrittenCode);
            const timeoutMs = this.options.timeoutMs ?? _codeinterpreterconstants.DEFAULT_CODE_INTERPRETER_TIMEOUT_MS;
            const { stdout, stderr, exitCode, error } = await this.runPythonScript(scriptPath, workDir, outputDir, context?.env, timeoutMs, callbacks);
            const outputFiles = [];
            try {
                const outputEntries = await _fs.promises.readdir(outputDir, {
                    withFileTypes: true
                });
                for (const entry of outputEntries){
                    if (entry.isFile()) {
                        const content = await _fs.promises.readFile((0, _path.join)(outputDir, entry.name));
                        const outputFile = {
                            filename: entry.name,
                            content,
                            mimeType: (0, _getmimetypeutil.getMimeType)(entry.name)
                        };
                        outputFiles.push(outputFile);
                        await callbacks?.onResult?.(outputFile);
                    }
                }
            } catch  {
            // Output directory might be empty or not exist
            }
            return {
                stdout,
                stderr,
                exitCode,
                files: outputFiles,
                error
            };
        } finally{
            await _fs.promises.rm(workDir, {
                recursive: true,
                force: true
            });
        }
    }
    runPythonScript(scriptPath, workDir, outputDir, env, timeoutMs, callbacks) {
        return new Promise((resolve)=>{
            const child = (0, _child_process.spawn)('python3', [
                scriptPath
            ], {
                cwd: workDir,
                env: {
                    ...process.env,
                    OUTPUT_DIR: outputDir,
                    ...env
                }
            });
            let stdout = '';
            let stderr = '';
            let killed = false;
            const timeout = setTimeout(()=>{
                killed = true;
                child.kill('SIGKILL');
            }, timeoutMs ?? _codeinterpreterconstants.DEFAULT_CODE_INTERPRETER_TIMEOUT_MS);
            child.stdout.on('data', (data)=>{
                const text = data.toString();
                stdout += text;
                const lines = text.split('\n');
                for (const line of lines){
                    if (line) {
                        callbacks?.onStdout?.(line);
                    }
                }
            });
            child.stderr.on('data', (data)=>{
                const text = data.toString();
                stderr += text;
                const lines = text.split('\n');
                for (const line of lines){
                    if (line) {
                        callbacks?.onStderr?.(line);
                    }
                }
            });
            child.on('close', (code)=>{
                clearTimeout(timeout);
                resolve({
                    stdout,
                    stderr,
                    exitCode: code ?? 0,
                    error: killed ? 'Process timed out' : undefined
                });
            });
            child.on('error', (err)=>{
                clearTimeout(timeout);
                resolve({
                    stdout,
                    stderr,
                    exitCode: 1,
                    error: err.message
                });
            });
        });
    }
    constructor(options = {}){
        this.options = options;
    }
};

//# sourceMappingURL=local.driver.js.map