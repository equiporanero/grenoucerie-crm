"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LambdaDriver", {
    enumerable: true,
    get: function() {
        return LambdaDriver;
    }
});
const _crypto = require("crypto");
const _promises = /*#__PURE__*/ _interop_require_wildcard(require("node:fs/promises"));
const _path = require("path");
const _clientlambda = require("@aws-sdk/client-lambda");
const _clients3 = require("@aws-sdk/client-s3");
const _clientsts = require("@aws-sdk/client-sts");
const _s3requestpresigner = require("@aws-sdk/s3-request-presigner");
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _guards = require("@sniptt/guards");
const _assetspath = require("../../../../../constants/assets-path");
const _commonlayerdependenciesdirname = require("../constants/common-layer-dependencies-dirname");
const _copybuilder = require("../utils/copy-builder");
const _copycommonlayerdependencies = require("../utils/copy-common-layer-dependencies");
const _copyexecutor = require("../utils/copy-executor");
const _copyyarninstall = require("../utils/copy-yarn-install");
const _createzipfile = require("../utils/create-zip-file");
const _temporarydirmanager = require("../utils/temporary-dir-manager");
const _logicfunctionexecutionresultdto = require("../../../../metadata-modules/logic-function/dtos/logic-function-execution-result.dto");
const _logicfunctionentity = require("../../../../metadata-modules/logic-function/logic-function.entity");
const _logicfunctionexception = require("../../../../metadata-modules/logic-function/logic-function.exception");
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
const UPDATE_FUNCTION_DURATION_TIMEOUT_IN_SECONDS = 60;
const CREDENTIALS_DURATION_IN_SECONDS = 60 * 60; // 1h
const YARN_INSTALL_LAMBDA_TIMEOUT_SECONDS = 300;
const YARN_INSTALL_LAMBDA_MEMORY_MB = 1024;
const COMMON_LAYER_NAME_PREFIX = 'twenty-common-layer';
const BUILDER_LAMBDA_TIMEOUT_SECONDS = 60;
const BUILDER_LAMBDA_MEMORY_MB = 512;
const EXECUTOR_LAMBDA_MEMORY_MB = 512;
const LAMBDA_EPHEMERAL_STORAGE_MB = 4096;
const YARN_INSTALL_HANDLER_PATH = (0, _path.resolve)(__dirname, (0, _path.join)(_assetspath.ASSET_PATH, 'engine/core-modules/logic-function/logic-function-drivers/constants/yarn-install/index.mjs'));
const BUILDER_HANDLER_PATH = (0, _path.resolve)(__dirname, (0, _path.join)(_assetspath.ASSET_PATH, 'engine/core-modules/logic-function/logic-function-drivers/constants/builder/index.mjs'));
let LambdaDriver = class LambdaDriver {
    areAssumeRoleCredentialsExpired() {
        return !(0, _utils.isDefined)(this.assumeRoleCredentials) || (0, _utils.isDefined)(this.credentialsExpiry) && new Date() >= this.credentialsExpiry;
    }
    async refreshAssumeRoleCredentials() {
        const stsClient = new _clientsts.STSClient({
            region: this.options.region
        });
        const assumeRoleCommand = new _clientsts.AssumeRoleCommand({
            RoleArn: this.options.subhostingRole,
            RoleSessionName: 'LambdaSession',
            DurationSeconds: CREDENTIALS_DURATION_IN_SECONDS
        });
        const { Credentials } = await stsClient.send(assumeRoleCommand);
        if (!(0, _utils.isDefined)(Credentials) || !(0, _utils.isDefined)(Credentials.AccessKeyId) || !(0, _utils.isDefined)(Credentials.SecretAccessKey) || !(0, _utils.isDefined)(Credentials.SessionToken)) {
            throw new Error('Failed to assume role');
        }
        this.assumeRoleCredentials = {
            accessKeyId: Credentials.AccessKeyId,
            secretAccessKey: Credentials.SecretAccessKey,
            sessionToken: Credentials.SessionToken
        };
        this.credentialsExpiry = new Date(Date.now() + (CREDENTIALS_DURATION_IN_SECONDS - 60 * 5) * 1000);
        this.lambdaClient = undefined;
    }
    async getAssumeRoleCredentials() {
        if (this.areAssumeRoleCredentialsExpired()) {
            await this.refreshAssumeRoleCredentials();
        }
        return this.assumeRoleCredentials;
    }
    async getLambdaClient() {
        if (!(0, _utils.isDefined)(this.lambdaClient) || (0, _utils.isDefined)(this.options.subhostingRole) && this.areAssumeRoleCredentialsExpired()) {
            this.lambdaClient = new _clientlambda.Lambda({
                ...this.options,
                ...(0, _utils.isDefined)(this.options.subhostingRole) && {
                    credentials: await this.getAssumeRoleCredentials()
                }
            });
        }
        return this.lambdaClient;
    }
    async generatePresignedUploadUrl(s3Key, expiresIn = 300) {
        const s3Client = new _clients3.S3Client({
            region: this.options.layerBucketRegion,
            credentials: (0, _utils.isDefined)(this.options.subhostingRole) ? await this.getAssumeRoleCredentials() : this.options.credentials
        });
        const putCommand = new _clients3.PutObjectCommand({
            Bucket: this.options.layerBucket,
            Key: s3Key,
            ContentType: 'application/zip'
        });
        return (0, _s3requestpresigner.getSignedUrl)(s3Client, putCommand, {
            expiresIn
        });
    }
    async waitFunctionActive(functionName, maxWaitTime = UPDATE_FUNCTION_DURATION_TIMEOUT_IN_SECONDS) {
        await (0, _clientlambda.waitUntilFunctionActiveV2)({
            client: await this.getLambdaClient(),
            maxWaitTime
        }, {
            FunctionName: functionName
        });
    }
    async waitFunctionUpdated(functionName, maxWaitTime = UPDATE_FUNCTION_DURATION_TIMEOUT_IN_SECONDS) {
        await (0, _clientlambda.waitUntilFunctionUpdatedV2)({
            client: await this.getLambdaClient(),
            maxWaitTime
        }, {
            FunctionName: functionName
        });
    }
    getDepsLayerName(flatApplication) {
        const checksum = flatApplication.yarnLockChecksum ?? 'default';
        return `deps-${checksum}`;
    }
    getSdkLayerName({ workspaceId, applicationUniversalIdentifier }) {
        return `sdk-${workspaceId}-${applicationUniversalIdentifier}`;
    }
    async getCommonLayerName() {
        if ((0, _utils.isDefined)(this.commonLayerName)) {
            return this.commonLayerName;
        }
        const [packageJson, yarnLock] = await Promise.all([
            _promises.readFile((0, _path.join)(_commonlayerdependenciesdirname.COMMON_LAYER_DEPENDENCIES_DIRNAME, 'package.json'), 'utf-8'),
            _promises.readFile((0, _path.join)(_commonlayerdependenciesdirname.COMMON_LAYER_DEPENDENCIES_DIRNAME, 'yarn.lock'), 'utf-8')
        ]);
        const checksum = (0, _crypto.createHash)('sha256').update(packageJson).update(yarnLock).digest('hex').slice(0, 12);
        this.commonLayerName = `${COMMON_LAYER_NAME_PREFIX}-${checksum}`;
        return this.commonLayerName;
    }
    async getYarnInstallFunctionName() {
        if ((0, _utils.isDefined)(this.yarnInstallFunctionName)) {
            return this.yarnInstallFunctionName;
        }
        const handlerContent = await _promises.readFile(YARN_INSTALL_HANDLER_PATH, 'utf-8');
        const checksum = (0, _crypto.createHash)('sha256').update(handlerContent).digest('hex').slice(0, 12);
        this.yarnInstallFunctionName = `twenty-yarn-install-${checksum}`;
        return this.yarnInstallFunctionName;
    }
    async getBuilderFunctionName() {
        if ((0, _utils.isDefined)(this.builderFunctionName)) {
            return this.builderFunctionName;
        }
        const handlerContent = await _promises.readFile(BUILDER_HANDLER_PATH, 'utf-8');
        const checksum = (0, _crypto.createHash)('sha256').update(handlerContent).digest('hex').slice(0, 12);
        this.builderFunctionName = `twenty-builder-${checksum}`;
        return this.builderFunctionName;
    }
    async ensureCommonLayerExists() {
        const commonLayerName = await this.getCommonLayerName();
        const existingArn = await this.getExistingLayerArn(commonLayerName);
        if ((0, _utils.isDefined)(existingArn)) {
            return existingArn;
        }
        const temporaryDirManager = new _temporarydirmanager.TemporaryDirManager();
        const { sourceTemporaryDir, lambdaZipPath } = await temporaryDirManager.init();
        try {
            await (0, _copycommonlayerdependencies.copyCommonLayerDependencies)(sourceTemporaryDir);
            await (0, _createzipfile.createZipFile)(sourceTemporaryDir, lambdaZipPath);
            const lambdaClient = await this.getLambdaClient();
            const result = await lambdaClient.send(new _clientlambda.PublishLayerVersionCommand({
                LayerName: commonLayerName,
                Content: {
                    ZipFile: await _promises.readFile(lambdaZipPath)
                },
                CompatibleRuntimes: [
                    _logicfunctionentity.LogicFunctionRuntime.NODE18,
                    _logicfunctionentity.LogicFunctionRuntime.NODE22
                ]
            }));
            if (!result.LayerVersionArn) {
                throw new Error('PublishLayerVersion did not return a LayerVersionArn for common layer');
            }
            return result.LayerVersionArn;
        } finally{
            await temporaryDirManager.clean();
        }
    }
    async ensureYarnInstallLambdaExists() {
        const yarnInstallFunctionName = await this.getYarnInstallFunctionName();
        const lambdaClient = await this.getLambdaClient();
        try {
            await lambdaClient.send(new _clientlambda.GetFunctionCommand({
                FunctionName: yarnInstallFunctionName
            }));
            return;
        } catch (error) {
            if (!(error instanceof _clientlambda.ResourceNotFoundException)) {
                throw error;
            }
        }
        const commonLayerArn = await this.ensureCommonLayerExists();
        const temporaryDirManager = new _temporarydirmanager.TemporaryDirManager();
        const { sourceTemporaryDir, lambdaZipPath } = await temporaryDirManager.init();
        try {
            await (0, _copyyarninstall.copyYarnInstall)(sourceTemporaryDir);
            await (0, _createzipfile.createZipFile)(sourceTemporaryDir, lambdaZipPath);
            const params = {
                Code: {
                    ZipFile: await _promises.readFile(lambdaZipPath)
                },
                FunctionName: yarnInstallFunctionName,
                Layers: [
                    commonLayerArn
                ],
                Handler: 'index.handler',
                Role: this.options.lambdaRole,
                Runtime: _logicfunctionentity.LogicFunctionRuntime.NODE22,
                Timeout: YARN_INSTALL_LAMBDA_TIMEOUT_SECONDS,
                MemorySize: YARN_INSTALL_LAMBDA_MEMORY_MB,
                EphemeralStorage: {
                    Size: LAMBDA_EPHEMERAL_STORAGE_MB
                }
            };
            await lambdaClient.send(new _clientlambda.CreateFunctionCommand(params));
        } finally{
            await temporaryDirManager.clean();
        }
        await this.waitFunctionActive(yarnInstallFunctionName);
    }
    async invokeYarnInstallLambda(payload) {
        const lambdaClient = await this.getLambdaClient();
        const yarnInstallFunctionName = await this.getYarnInstallFunctionName();
        const result = await lambdaClient.send(new _clientlambda.InvokeCommand({
            FunctionName: yarnInstallFunctionName,
            Payload: JSON.stringify(payload),
            LogType: _clientlambda.LogType.Tail
        }), {
            abortSignal: AbortSignal.timeout(YARN_INSTALL_LAMBDA_TIMEOUT_SECONDS * 1000)
        });
        if (result.FunctionError) {
            const parsedResult = result.Payload ? JSON.parse(result.Payload.transformToString()) : {};
            throw new _logicfunctionexception.LogicFunctionException(`Yarn install Lambda failed: ${JSON.stringify(parsedResult)}`, _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_CREATE_FAILED);
        }
        const parsedResult = result.Payload ? JSON.parse(result.Payload.transformToString()) : {};
        if (!parsedResult.success) {
            throw new Error('Yarn install Lambda did not report success');
        }
        return parsedResult;
    }
    async ensureBuilderLambdaExists() {
        const builderFunctionName = await this.getBuilderFunctionName();
        const lambdaClient = await this.getLambdaClient();
        try {
            await lambdaClient.send(new _clientlambda.GetFunctionCommand({
                FunctionName: builderFunctionName
            }));
            return;
        } catch (error) {
            if (!(error instanceof _clientlambda.ResourceNotFoundException)) {
                throw error;
            }
        }
        const commonLayerArn = await this.ensureCommonLayerExists();
        const temporaryDirManager = new _temporarydirmanager.TemporaryDirManager();
        const { sourceTemporaryDir, lambdaZipPath } = await temporaryDirManager.init();
        try {
            await (0, _copybuilder.copyBuilder)(sourceTemporaryDir);
            await (0, _createzipfile.createZipFile)(sourceTemporaryDir, lambdaZipPath);
            const params = {
                Code: {
                    ZipFile: await _promises.readFile(lambdaZipPath)
                },
                FunctionName: builderFunctionName,
                Layers: [
                    commonLayerArn
                ],
                Handler: 'index.handler',
                Role: this.options.lambdaRole,
                Runtime: _logicfunctionentity.LogicFunctionRuntime.NODE22,
                Timeout: BUILDER_LAMBDA_TIMEOUT_SECONDS,
                MemorySize: BUILDER_LAMBDA_MEMORY_MB,
                EphemeralStorage: {
                    Size: LAMBDA_EPHEMERAL_STORAGE_MB
                }
            };
            await lambdaClient.send(new _clientlambda.CreateFunctionCommand(params));
        } finally{
            await temporaryDirManager.clean();
        }
        await this.waitFunctionActive(builderFunctionName);
    }
    async transpile({ sourceCode, sourceFileName, builtFileName }) {
        await this.ensureBuilderLambdaExists();
        const lambdaClient = await this.getLambdaClient();
        const builderFunctionName = await this.getBuilderFunctionName();
        const payload = {
            action: 'transpile',
            sourceCode,
            sourceFileName,
            builtFileName
        };
        const result = await lambdaClient.send(new _clientlambda.InvokeCommand({
            FunctionName: builderFunctionName,
            Payload: JSON.stringify(payload),
            LogType: _clientlambda.LogType.Tail
        }), {
            abortSignal: AbortSignal.timeout(BUILDER_LAMBDA_TIMEOUT_SECONDS * 1000)
        });
        if (result.FunctionError) {
            const parsedResult = result.Payload ? JSON.parse(result.Payload.transformToString()) : {};
            const userCompilationErrorRegex = /^Build failed with \d+ error/;
            const isUserCompilationError = (0, _guards.isNonEmptyString)(parsedResult?.errorMessage) && userCompilationErrorRegex.test(parsedResult.errorMessage);
            if (isUserCompilationError) {
                throw new _logicfunctionexception.LogicFunctionException(`Function code compilation failed: ${parsedResult.errorMessage}`, _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_COMPILATION_FAILED);
            }
            throw new _logicfunctionexception.LogicFunctionException(`Builder Lambda failed: ${JSON.stringify(parsedResult)}`, _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_CREATE_FAILED);
        }
        const parsedResult = result.Payload ? JSON.parse(result.Payload.transformToString()) : {};
        if (!parsedResult.builtCode) {
            throw new Error('Builder Lambda did not return builtCode');
        }
        return {
            builtCode: parsedResult.builtCode
        };
    }
    async getExistingLayerArn(layerName) {
        const listLayerParams = {
            LayerName: layerName,
            MaxItems: 1
        };
        const listLayerResult = await (await this.getLambdaClient()).send(new _clientlambda.ListLayerVersionsCommand(listLayerParams));
        return listLayerResult.LayerVersions?.[0]?.LayerVersionArn;
    }
    async publishLayer({ layerName, zipBuffer }) {
        const result = await (await this.getLambdaClient()).send(new _clientlambda.PublishLayerVersionCommand({
            LayerName: layerName,
            Content: {
                ZipFile: zipBuffer
            },
            CompatibleRuntimes: [
                _logicfunctionentity.LogicFunctionRuntime.NODE18,
                _logicfunctionentity.LogicFunctionRuntime.NODE22
            ]
        }));
        if (!(0, _utils.isDefined)(result.LayerVersionArn)) {
            throw new Error('New layer version ARN is undefined');
        }
        return result.LayerVersionArn;
    }
    async getDependencyContents(flatApplication, applicationUniversalIdentifier) {
        const temporaryDirManager = new _temporarydirmanager.TemporaryDirManager();
        const { sourceTemporaryDir } = await temporaryDirManager.init();
        try {
            await this.logicFunctionResourceService.copyDependenciesInMemory({
                applicationUniversalIdentifier,
                workspaceId: flatApplication.workspaceId,
                inMemoryFolderPath: sourceTemporaryDir
            });
            const [packageJson, yarnLock] = await Promise.all([
                _promises.readFile(`${sourceTemporaryDir}/package.json`, 'utf-8'),
                _promises.readFile(`${sourceTemporaryDir}/yarn.lock`, 'utf-8')
            ]);
            return {
                packageJson,
                yarnLock
            };
        } finally{
            await temporaryDirManager.clean();
        }
    }
    async createLayerIfNotExist({ flatApplication, applicationUniversalIdentifier }) {
        const layerName = this.getDepsLayerName(flatApplication);
        const existingArn = await this.getExistingLayerArn(layerName);
        if ((0, _utils.isDefined)(existingArn)) {
            return;
        }
        const { packageJson, yarnLock } = await this.getDependencyContents(flatApplication, applicationUniversalIdentifier);
        await this.ensureYarnInstallLambdaExists();
        const s3Key = `lambda-layers/${layerName}.zip`;
        const presignedUploadUrl = await this.generatePresignedUploadUrl(s3Key);
        await this.invokeYarnInstallLambda({
            action: 'createLayer',
            packageJson,
            yarnLock,
            presignedUploadUrl
        });
        const bucket = this.options.layerBucket;
        const lambdaClient = await this.getLambdaClient();
        const publishResult = await lambdaClient.send(new _clientlambda.PublishLayerVersionCommand({
            LayerName: layerName,
            Content: {
                S3Bucket: bucket,
                S3Key: s3Key
            },
            CompatibleRuntimes: [
                _logicfunctionentity.LogicFunctionRuntime.NODE18,
                _logicfunctionentity.LogicFunctionRuntime.NODE22
            ]
        }));
        if (!publishResult.LayerVersionArn) {
            throw new Error(`PublishLayerVersion did not return a LayerVersionArn for layer '${layerName}'`);
        }
    }
    async getLayerArn({ flatApplication, applicationUniversalIdentifier }) {
        const layerName = this.getDepsLayerName(flatApplication);
        const existingArn = await this.getExistingLayerArn(layerName);
        if ((0, _utils.isDefined)(existingArn)) {
            return existingArn;
        }
        await this.createLayerIfNotExist({
            flatApplication,
            applicationUniversalIdentifier
        });
        const newArn = await this.getExistingLayerArn(layerName);
        if (!(0, _utils.isDefined)(newArn)) {
            throw new Error(`Layer '${layerName}' was not created by the yarn install Lambda`);
        }
        return newArn;
    }
    async ensureSdkLayer({ flatApplication, applicationUniversalIdentifier }) {
        const layerName = this.getSdkLayerName({
            workspaceId: flatApplication.workspaceId,
            applicationUniversalIdentifier
        });
        if (!flatApplication.isSdkLayerStale) {
            const existingArn = await this.getExistingLayerArn(layerName);
            if ((0, _utils.isDefined)(existingArn)) {
                return existingArn;
            }
        }
        await this.deleteAllLayerVersions({
            lambdaClient: await this.getLambdaClient(),
            layerName
        });
        const sdkArchiveBuffer = await this.sdkClientArchiveService.downloadArchiveBuffer({
            workspaceId: flatApplication.workspaceId,
            applicationId: flatApplication.id,
            applicationUniversalIdentifier
        });
        const zipBuffer = await this.reprefixZipEntries({
            sourceBuffer: sdkArchiveBuffer,
            prefix: 'nodejs/node_modules/twenty-client-sdk'
        });
        const arn = await this.publishLayer({
            layerName,
            zipBuffer
        });
        await this.sdkClientArchiveService.markSdkLayerFresh({
            applicationId: flatApplication.id,
            workspaceId: flatApplication.workspaceId
        });
        return arn;
    }
    // Re-wraps zip entries under a new prefix path without extracting to disk.
    async reprefixZipEntries({ sourceBuffer, prefix }) {
        const { default: unzipper } = await Promise.resolve().then(()=>/*#__PURE__*/ _interop_require_wildcard(require("unzipper")));
        const archiver = (await Promise.resolve().then(()=>/*#__PURE__*/ _interop_require_wildcard(require("archiver")))).default;
        const directory = await unzipper.Open.buffer(sourceBuffer);
        const archive = archiver('zip', {
            zlib: {
                level: 9
            }
        });
        const chunks = [];
        archive.on('data', (chunk)=>chunks.push(chunk));
        for (const entry of directory.files){
            if (entry.type === 'Directory') {
                continue;
            }
            archive.append(entry.stream(), {
                name: `${prefix}/${entry.path}`
            });
        }
        await new Promise((resolve, reject)=>{
            archive.on('end', resolve);
            archive.on('error', reject);
            void archive.finalize();
        });
        return Buffer.concat(chunks);
    }
    async getLambdaExecutor(flatLogicFunction) {
        try {
            const getFunctionCommand = new _clientlambda.GetFunctionCommand({
                FunctionName: flatLogicFunction.id
            });
            return await (await this.getLambdaClient()).send(getFunctionCommand);
        } catch (error) {
            if (!(error instanceof _clientlambda.ResourceNotFoundException)) {
                throw error;
            }
        }
    }
    async delete(flatLogicFunction) {
        const lambdaExecutor = await this.getLambdaExecutor(flatLogicFunction);
        if ((0, _utils.isDefined)(lambdaExecutor)) {
            const deleteFunctionCommand = new _clientlambda.DeleteFunctionCommand({
                FunctionName: flatLogicFunction.id
            });
            await (await this.getLambdaClient()).send(deleteFunctionCommand);
        }
    }
    async deleteAllLayerVersions({ lambdaClient, layerName }) {
        let marker;
        do {
            const listResult = await lambdaClient.send(new _clientlambda.ListLayerVersionsCommand({
                LayerName: layerName,
                MaxItems: 50,
                Marker: marker
            }));
            const versions = listResult.LayerVersions ?? [];
            await Promise.all(versions.map((version)=>lambdaClient.send(new _clientlambda.DeleteLayerVersionCommand({
                    LayerName: layerName,
                    VersionNumber: version.Version
                }))));
            marker = listResult.NextMarker;
        }while ((0, _utils.isDefined)(marker))
    }
    hasExpectedLayers({ lambdaExecutor, flatApplication, applicationUniversalIdentifier }) {
        const layers = lambdaExecutor.Configuration?.Layers;
        if (!(0, _utils.isDefined)(layers) || layers.length !== 2) {
            return false;
        }
        const depsLayerName = this.getDepsLayerName(flatApplication);
        const sdkLayerName = this.getSdkLayerName({
            workspaceId: flatApplication.workspaceId,
            applicationUniversalIdentifier
        });
        return layers.some((layer)=>layer.Arn?.includes(depsLayerName)) && layers.some((layer)=>layer.Arn?.includes(sdkLayerName));
    }
    async updateLambdaExecutorConfiguration({ flatLogicFunction, depsLayerArn, sdkLayerArn }) {
        const lambdaClient = await this.getLambdaClient();
        await lambdaClient.send(new _clientlambda.UpdateFunctionConfigurationCommand({
            FunctionName: flatLogicFunction.id,
            Layers: [
                depsLayerArn,
                sdkLayerArn
            ],
            Runtime: flatLogicFunction.runtime,
            Timeout: 900,
            MemorySize: EXECUTOR_LAMBDA_MEMORY_MB
        }));
    }
    async buildLambdaExecutor({ flatLogicFunction, flatApplication, applicationUniversalIdentifier }) {
        const buildArgs = {
            flatLogicFunction,
            flatApplication,
            applicationUniversalIdentifier
        };
        const { canSkip } = await this.checkLambdaExecutorBuildStatus(buildArgs);
        if (canSkip) {
            return;
        }
        const buildLockTtlMs = 120_000;
        const buildLockRetryMs = 500;
        const buildLockMaxRetries = 240;
        await this.cacheLockService.withLock(async ()=>{
            // Need to check again inside the lock in case lock was not acquired immediately.
            const { canSkip, lambdaExecutor } = await this.checkLambdaExecutorBuildStatus(buildArgs);
            if (canSkip) {
                return;
            }
            await this.ensureLambdaExecutor({
                ...buildArgs,
                lambdaExecutor
            });
        }, `lambda-build:${flatLogicFunction.id}`, {
            ttl: buildLockTtlMs,
            ms: buildLockRetryMs,
            maxRetries: buildLockMaxRetries
        });
    }
    async checkLambdaExecutorBuildStatus({ flatLogicFunction, flatApplication, applicationUniversalIdentifier }) {
        const lambdaExecutor = await this.getLambdaExecutor(flatLogicFunction);
        const canSkip = (0, _utils.isDefined)(lambdaExecutor) && !flatApplication.isSdkLayerStale && this.hasExpectedLayers({
            lambdaExecutor,
            flatApplication,
            applicationUniversalIdentifier
        });
        return {
            canSkip,
            lambdaExecutor
        };
    }
    async ensureLambdaExecutor({ flatLogicFunction, flatApplication, applicationUniversalIdentifier, lambdaExecutor }) {
        let depsLayerArn;
        try {
            depsLayerArn = await this.getLayerArn({
                flatApplication,
                applicationUniversalIdentifier
            });
        } catch (error) {
            this.logger.error(`Failed to get dependency layer for function ${flatLogicFunction.id}: ${error instanceof Error ? error.message : String(error)}`, error instanceof Error ? error.stack : undefined);
            throw new _logicfunctionexception.LogicFunctionException(`Failed to get dependency layer for function '${flatLogicFunction.id}': ${error instanceof Error ? error.message : 'Unknown error'}`, _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_LAYER_BUILD_FAILED);
        }
        let sdkLayerArn;
        try {
            sdkLayerArn = await this.ensureSdkLayer({
                flatApplication,
                applicationUniversalIdentifier
            });
        } catch (error) {
            this.logger.error(`Failed to get SDK layer for function ${flatLogicFunction.id}: ${error instanceof Error ? error.message : String(error)}`, error instanceof Error ? error.stack : undefined);
            throw new _logicfunctionexception.LogicFunctionException(`Failed to get SDK layer for function '${flatLogicFunction.id}': ${error instanceof Error ? error.message : 'Unknown error'}`, _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_LAYER_BUILD_FAILED);
        }
        if (!(0, _utils.isDefined)(lambdaExecutor)) {
            await this.createLambdaExecutor({
                flatLogicFunction,
                depsLayerArn,
                sdkLayerArn
            });
            await this.waitFunctionActive(flatLogicFunction.id);
            return;
        }
        await this.updateLambdaExecutorConfiguration({
            flatLogicFunction,
            depsLayerArn,
            sdkLayerArn
        });
        await this.waitFunctionUpdated(flatLogicFunction.id);
    }
    async createLambdaExecutor({ flatLogicFunction, depsLayerArn, sdkLayerArn }) {
        const temporaryDirManager = new _temporarydirmanager.TemporaryDirManager();
        const { sourceTemporaryDir, lambdaZipPath } = await temporaryDirManager.init();
        try {
            await (0, _copyexecutor.copyExecutor)(sourceTemporaryDir);
            await (0, _createzipfile.createZipFile)(sourceTemporaryDir, lambdaZipPath);
            // SDK layer listed last so it overwrites the stub twenty-client-sdk
            // from the deps layer (later layers take precedence in /opt merge).
            const params = {
                Code: {
                    ZipFile: await _promises.readFile(lambdaZipPath)
                },
                FunctionName: flatLogicFunction.id,
                Layers: [
                    depsLayerArn,
                    sdkLayerArn
                ],
                Handler: 'index.handler',
                Role: this.options.lambdaRole,
                Runtime: flatLogicFunction.runtime,
                Timeout: 900,
                MemorySize: EXECUTOR_LAMBDA_MEMORY_MB,
                EphemeralStorage: {
                    Size: LAMBDA_EPHEMERAL_STORAGE_MB
                }
            };
            const lambdaClient = await this.getLambdaClient();
            await lambdaClient.send(new _clientlambda.CreateFunctionCommand(params));
        } finally{
            await temporaryDirManager.clean();
        }
    }
    parseLambdaLogResult(logResult) {
        if (!logResult) {
            return {
                logs: '',
                initDurationMs: null,
                billedDurationMs: null,
                reportDurationMs: null,
                coldStart: false
            };
        }
        const decoded = Buffer.from(logResult, 'base64').toString('utf8');
        const initDurationMs = decoded.match(/Init Duration:\s*([\d.]+)\s*ms/i)?.[1] ?? null;
        const billedDurationMs = decoded.match(/Billed Duration:\s*([\d.]+)\s*ms/i)?.[1] ?? null;
        const reportDurationMs = decoded.match(/\bDuration:\s*([\d.]+)\s*ms/i)?.[1] ?? null;
        const logs = decoded.split('\t').join(' ').replace(/^(START|END|REPORT).*\n?/gm, '').replace(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z) [a-f0-9-]+ INFO /gm, '$1 INFO ').trim();
        return {
            logs,
            initDurationMs,
            billedDurationMs,
            reportDurationMs,
            coldStart: initDurationMs !== null
        };
    }
    async execute({ flatLogicFunction, flatApplication, applicationUniversalIdentifier, payload, env, timeoutMs = 900_000 }) {
        const buildStart = Date.now();
        await this.buildLambdaExecutor({
            flatLogicFunction,
            flatApplication,
            applicationUniversalIdentifier
        });
        const buildExecutorMs = Date.now() - buildStart;
        const startTime = Date.now();
        const compiledCode = await this.logicFunctionResourceService.getBuiltCode({
            workspaceId: flatLogicFunction.workspaceId,
            applicationUniversalIdentifier,
            builtHandlerPath: flatLogicFunction.builtHandlerPath
        });
        const getBuiltCodeMs = Date.now() - startTime;
        const executorPayload = {
            params: payload,
            code: compiledCode,
            env: env ?? {},
            handlerName: flatLogicFunction.handlerName
        };
        const payloadString = JSON.stringify(executorPayload);
        const params = {
            FunctionName: flatLogicFunction.id,
            Payload: payloadString,
            LogType: _clientlambda.LogType.Tail
        };
        const command = new _clientlambda.InvokeCommand(params);
        try {
            const lambdaClient = await this.getLambdaClient();
            const invokeStart = Date.now();
            const result = await lambdaClient.send(command, {
                abortSignal: AbortSignal.timeout(timeoutMs)
            });
            const invokeSendMs = Date.now() - invokeStart;
            const parsedResult = result.Payload ? JSON.parse(result.Payload.transformToString()) : {};
            const { logs, initDurationMs, billedDurationMs, reportDurationMs, coldStart } = this.parseLambdaLogResult(result.LogResult);
            const duration = Date.now() - startTime;
            this.logger.log(`[lambda-timing] fnId=${flatLogicFunction.id} totalMs=${Date.now() - buildStart} buildExecutorMs=${buildExecutorMs} getBuiltCodeMs=${getBuiltCodeMs} payloadBytes=${Buffer.byteLength(payloadString, 'utf8')} invokeSendMs=${invokeSendMs} reportDurationMs=${reportDurationMs ?? 'n/a'} billedMs=${billedDurationMs ?? 'n/a'} initDurationMs=${initDurationMs ?? 'n/a'} coldStart=${coldStart}`);
            if (result.FunctionError) {
                return {
                    data: null,
                    duration,
                    status: _logicfunctionexecutionresultdto.LogicFunctionExecutionStatus.ERROR,
                    error: parsedResult,
                    logs
                };
            }
            return {
                data: parsedResult,
                logs,
                duration,
                status: _logicfunctionexecutionresultdto.LogicFunctionExecutionStatus.SUCCESS
            };
        } catch (error) {
            this.logger.error(`Lambda invocation failed for function ${flatLogicFunction.id}: ${error instanceof Error ? error.message : String(error)}`, error instanceof Error ? error.stack : undefined);
            if (error instanceof _clientlambda.ResourceNotFoundException) {
                throw new _logicfunctionexception.LogicFunctionException(`Function '${flatLogicFunction.id}' does not exist`, _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_NOT_FOUND);
            }
            if (error instanceof Error && error.name === 'TimeoutError') {
                throw new _logicfunctionexception.LogicFunctionException(`Lambda invocation timed out for function '${flatLogicFunction.id}': ${error.message}`, _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_EXECUTION_TIMEOUT);
            }
            if (error instanceof _logicfunctionexception.LogicFunctionException) {
                throw error;
            }
            throw new _logicfunctionexception.LogicFunctionException(`Lambda invocation failed for function '${flatLogicFunction.id}': ${error instanceof Error ? error.message : 'Unknown error'}`, _logicfunctionexception.LogicFunctionExceptionCode.LOGIC_FUNCTION_EXECUTION_FAILED);
        }
    }
    constructor(options){
        this.logger = new _common.Logger(LambdaDriver.name);
        this.credentialsExpiry = null;
        this.options = options;
        this.lambdaClient = undefined;
        this.logicFunctionResourceService = options.logicFunctionResourceService;
        this.sdkClientArchiveService = options.sdkClientArchiveService;
        this.cacheLockService = options.cacheLockService;
    }
};

//# sourceMappingURL=lambda.driver.js.map