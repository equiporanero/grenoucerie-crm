"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationInstallService", {
    enumerable: true,
    get: function() {
        return ApplicationInstallService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _fs = require("fs");
const _path = require("path");
const _semver = /*#__PURE__*/ _interop_require_default(require("semver"));
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _applicationexception = require("../application.exception");
const _applicationregistrationentity = require("../application-registration/application-registration.entity");
const _applicationregistrationsourcetypeenum = require("../application-registration/enums/application-registration-source-type.enum");
const _applicationservice = require("../application.service");
const _applicationpackagefetcherservice = require("../application-package/application-package-fetcher.service");
const _applicationversionvalidationservice = require("../application-package/application-version-validation.service");
const _applicationsyncservice = require("../application-manifest/application-sync.service");
const _cachelockservice = require("../../cache-lock/cache-lock.service");
const _filestorageservice = require("../../file-storage/file-storage.service");
const _logicfunctiontriggerjob = require("../../logic-function/logic-function-trigger/jobs/logic-function-trigger.job");
const _messagequeuedecorator = require("../../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../message-queue/services/message-queue.service");
const _sdkclientgenerationservice = require("../../sdk-client/sdk-client-generation.service");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
const _logicfunctionexecutorservice = require("../../logic-function/logic-function-executor/logic-function-executor.service");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let ApplicationInstallService = class ApplicationInstallService {
    async installApplication(params) {
        const appRegistration = await this.appRegistrationRepository.findOne({
            where: {
                id: params.appRegistrationId
            }
        });
        if (!appRegistration) {
            throw new _applicationexception.ApplicationException(`Application registration with id ${params.appRegistrationId} not found`, _applicationexception.ApplicationExceptionCode.APPLICATION_NOT_FOUND);
        }
        if (appRegistration.sourceType === _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.LOCAL) {
            this.logger.log(`Skipping install for LOCAL app ${appRegistration.universalIdentifier} (files synced by CLI watcher in dev mode)`);
            return true;
        }
        if (appRegistration.sourceType === _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.OAUTH_ONLY) {
            this.logger.log(`Skipping install for OAUTH_ONLY app ${appRegistration.universalIdentifier} (OAuth-only clients have no code artifacts)`);
            return true;
        }
        const lockKey = `app-install:${params.workspaceId}:${appRegistration.universalIdentifier}`;
        return this.cacheLockService.withLock(()=>this.doInstallApplication(appRegistration, {
                version: params.version,
                workspaceId: params.workspaceId
            }), lockKey, {
            ttl: 60_000,
            ms: 500,
            maxRetries: 120
        });
    }
    async doInstallApplication(appRegistration, params) {
        const resolvedPackage = await this.applicationPackageFetcherService.resolvePackage(appRegistration, {
            targetVersion: params.version
        });
        if (!resolvedPackage) {
            return true;
        }
        const requiredServerVersion = resolvedPackage.packageJson.engines?.['twenty'];
        const versionValidation = await this.applicationVersionValidationService.validateServerCompatibility(requiredServerVersion);
        if (!versionValidation.compatible) {
            await this.applicationPackageFetcherService.cleanupExtractedDir(resolvedPackage.cleanupDir);
            throw new _applicationexception.ApplicationException(versionValidation.message, ApplicationInstallService.VERSION_REASON_TO_EXCEPTION_CODE[versionValidation.reason]);
        }
        const universalIdentifier = appRegistration.universalIdentifier;
        const existingApplication = await this.applicationService.findByUniversalIdentifier({
            universalIdentifier,
            workspaceId: params.workspaceId
        });
        const isVersionUpgrade = (0, _utils.isDefined)(existingApplication);
        const previousVersion = existingApplication?.version ?? undefined;
        const newVersion = resolvedPackage.packageJson.version;
        if (!(0, _utils.isDefined)(newVersion)) {
            throw new _applicationexception.ApplicationException(`Package ${universalIdentifier} has no version`, _applicationexception.ApplicationExceptionCode.PACKAGE_RESOLUTION_FAILED);
        }
        const application = await this.ensureApplicationExists({
            existingApplication,
            universalIdentifier,
            name: resolvedPackage.manifest.application.displayName,
            logo: resolvedPackage.manifest.application.logoUrl ?? null,
            workspaceId: params.workspaceId,
            applicationRegistrationId: appRegistration.id,
            sourceType: appRegistration.sourceType
        });
        const incomingVersion = resolvedPackage.packageJson.version;
        try {
            if (isVersionUpgrade && (0, _utils.isDefined)(application.version) && (0, _utils.isDefined)(incomingVersion)) {
                if (!(0, _utils.isDefined)(_semver.default.valid(incomingVersion))) {
                    throw new _applicationexception.ApplicationException(`Invalid version "${incomingVersion}" in package.json. Must be a valid semver version.`, _applicationexception.ApplicationExceptionCode.INVALID_INPUT);
                }
                if ((0, _utils.isDefined)(_semver.default.valid(application.version))) {
                    if (_semver.default.eq(incomingVersion, application.version)) {
                        throw new _applicationexception.ApplicationException(`${universalIdentifier}@${incomingVersion} is already installed in this workspace.`, _applicationexception.ApplicationExceptionCode.APP_ALREADY_INSTALLED);
                    }
                    if (_semver.default.lt(incomingVersion, application.version)) {
                        throw new _applicationexception.ApplicationException(`Cannot install ${universalIdentifier}@${incomingVersion}: version ${application.version} is already installed and downgrading is not allowed.`, _applicationexception.ApplicationExceptionCode.CANNOT_DOWNGRADE_APPLICATION);
                    }
                }
            }
            await this.writeFilesToStorage(resolvedPackage.extractedDir, resolvedPackage.manifest, universalIdentifier, params.workspaceId);
            await this.runPreInstallHook({
                manifest: resolvedPackage.manifest,
                workspaceId: params.workspaceId,
                applicationRegistrationId: appRegistration.id,
                previousVersion,
                newVersion,
                isVersionUpgrade,
                universalIdentifier
            });
            const { hasSchemaMetadataChanged } = await this.applicationSyncService.synchronizeFromManifest({
                workspaceId: params.workspaceId,
                manifest: resolvedPackage.manifest,
                applicationRegistrationId: appRegistration.id
            });
            if (!isVersionUpgrade || hasSchemaMetadataChanged) {
                await this.sdkClientGenerationService.generateSdkClientForApplication({
                    workspaceId: params.workspaceId,
                    applicationId: application.id,
                    applicationUniversalIdentifier: universalIdentifier
                });
            }
            await this.runPostInstallHook({
                manifest: resolvedPackage.manifest,
                workspaceId: params.workspaceId,
                previousVersion,
                newVersion,
                isVersionUpgrade,
                universalIdentifier
            });
            this.logger.log(`Successfully installed app ${universalIdentifier} v${resolvedPackage.packageJson.version ?? 'unknown'}`);
            return true;
        } catch (error) {
            this.logger.error(`Failed to install app ${appRegistration.universalIdentifier}: ${error}`);
            if (!isVersionUpgrade) {
                await this.applicationSyncService.uninstallApplication({
                    applicationUniversalIdentifier: universalIdentifier,
                    workspaceId: params.workspaceId
                });
            }
            throw error;
        } finally{
            if (resolvedPackage) {
                await this.applicationPackageFetcherService.cleanupExtractedDir(resolvedPackage.cleanupDir);
            }
        }
    }
    async runPreInstallHook(params) {
        const { manifest, workspaceId, applicationRegistrationId, previousVersion, newVersion, isVersionUpgrade, universalIdentifier } = params;
        if (!(0, _utils.isDefined)(manifest.application.preInstallLogicFunction)) {
            return;
        }
        await this.applicationSyncService.preInstallSynchronizeFromManifest({
            workspaceId: params.workspaceId,
            manifest,
            applicationRegistrationId
        });
        const { universalIdentifier: preInstallLogicFunctionUniversalIdentifier, shouldRunOnVersionUpgrade } = manifest.application.preInstallLogicFunction;
        if (isVersionUpgrade && !shouldRunOnVersionUpgrade) {
            this.logger.log(`Skipping pre-install hook for app ${universalIdentifier}: version upgrade and shouldRunOnVersionUpgrade is false`);
            return;
        }
        const { flatLogicFunctionMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatLogicFunctionMaps'
        ]);
        const flatLogicFunction = flatLogicFunctionMaps.byUniversalIdentifier[preInstallLogicFunctionUniversalIdentifier];
        // preInstallSynchronizeFromManifest should have registered this function
        // moments ago — a miss here means the pared-down sync did not persist the
        // entry, which is a real failure and should abort the install.
        if (!(0, _utils.isDefined)(flatLogicFunction)) {
            throw new _applicationexception.ApplicationException(`Pre-install logic function "${preInstallLogicFunctionUniversalIdentifier}" not found for application "${universalIdentifier}" after pre-install sync. The pared-down sync did not register the function as expected.`, _applicationexception.ApplicationExceptionCode.ENTITY_NOT_FOUND);
        }
        const payload = {
            previousVersion,
            newVersion
        };
        this.logger.log(`Executing pre-install hook for app ${universalIdentifier} with payload:`, JSON.stringify(payload));
        const result = await this.logicFunctionExecutorService.execute({
            logicFunctionId: flatLogicFunction.id,
            workspaceId,
            payload
        });
        if (!(0, _utils.isDefined)(result)) {
            this.logger.log('Pre-install hook executed successfully');
        }
        if (result.error) {
            throw new _applicationexception.ApplicationException(result.error.errorMessage, _applicationexception.ApplicationExceptionCode.PRE_INSTALL_ERROR);
        }
    }
    async runPostInstallHook(params) {
        const { manifest, workspaceId, previousVersion, newVersion, isVersionUpgrade, universalIdentifier } = params;
        if (!(0, _utils.isDefined)(manifest.application.postInstallLogicFunction)) {
            return;
        }
        const { universalIdentifier: postInstallLogicFunctionUniversalIdentifier, shouldRunOnVersionUpgrade, shouldRunSynchronously } = manifest.application.postInstallLogicFunction;
        if (isVersionUpgrade && !shouldRunOnVersionUpgrade) {
            this.logger.log(`Skipping post-install hook for app ${universalIdentifier}: version upgrade and shouldRunOnVersionUpgrade is false`);
            return;
        }
        const { flatLogicFunctionMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatLogicFunctionMaps'
        ]);
        const flatLogicFunction = flatLogicFunctionMaps.byUniversalIdentifier[postInstallLogicFunctionUniversalIdentifier];
        if (!(0, _utils.isDefined)(flatLogicFunction)) {
            throw new _applicationexception.ApplicationException(`Post-install logic function "${postInstallLogicFunctionUniversalIdentifier}" not found for application "${universalIdentifier}" after sync. Manifest may reference a stale identifier.`, _applicationexception.ApplicationExceptionCode.ENTITY_NOT_FOUND);
        }
        const payload = {
            previousVersion,
            newVersion
        };
        this.logger.log(`Enqueuing post-install hook for app ${universalIdentifier} with payload:`, JSON.stringify(payload));
        if (!shouldRunSynchronously) {
            await this.messageQueueService.add(_logicfunctiontriggerjob.LogicFunctionTriggerJob.name, [
                {
                    logicFunctionId: flatLogicFunction.id,
                    workspaceId,
                    payload
                }
            ], {
                retryLimit: 3
            });
            return;
        }
        const result = await this.logicFunctionExecutorService.execute({
            logicFunctionId: flatLogicFunction.id,
            workspaceId,
            payload
        });
        if (!(0, _utils.isDefined)(result)) {
            this.logger.log('Post-install hook executed successfully');
        }
        if (result.error) {
            throw new _applicationexception.ApplicationException(result.error.errorMessage, _applicationexception.ApplicationExceptionCode.POST_INSTALL_ERROR);
        }
    }
    async writeFilesToStorage(extractedDir, manifest, applicationUniversalIdentifier, workspaceId) {
        const filesToWrite = this.buildFileList(manifest);
        for (const { relativePath, fileFolder } of filesToWrite){
            const absolutePath = (0, _path.resolve)(extractedDir, relativePath);
            if (!absolutePath.startsWith(extractedDir)) {
                throw new _applicationexception.ApplicationException(`Path traversal detected for file: ${relativePath}`, _applicationexception.ApplicationExceptionCode.INVALID_INPUT);
            }
            let content;
            try {
                content = await _fs.promises.readFile(absolutePath);
            } catch  {
                throw new _applicationexception.ApplicationException(`File not found in package: ${relativePath}`, _applicationexception.ApplicationExceptionCode.PACKAGE_RESOLUTION_FAILED);
            }
            await this.fileStorageService.writeFile({
                sourceFile: content,
                fileFolder,
                applicationUniversalIdentifier,
                workspaceId,
                resourcePath: relativePath,
                settings: {
                    isTemporaryFile: false,
                    toDelete: false
                }
            });
        }
    }
    buildFileList(manifest) {
        const files = [];
        files.push({
            relativePath: 'package.json',
            fileFolder: _types.FileFolder.Dependencies
        }, {
            relativePath: 'manifest.json',
            fileFolder: _types.FileFolder.Source
        });
        for (const logicFunction of manifest.logicFunctions ?? []){
            files.push({
                relativePath: logicFunction.builtHandlerPath,
                fileFolder: _types.FileFolder.BuiltLogicFunction
            });
        }
        for (const frontComponent of manifest.frontComponents ?? []){
            files.push({
                relativePath: frontComponent.builtComponentPath,
                fileFolder: _types.FileFolder.BuiltFrontComponent
            });
        }
        for (const publicAsset of manifest.publicAssets ?? []){
            files.push({
                relativePath: publicAsset.filePath,
                fileFolder: _types.FileFolder.PublicAsset
            });
        }
        return files;
    }
    async ensureApplicationExists(params) {
        if ((0, _utils.isDefined)(params.existingApplication)) {
            return params.existingApplication;
        }
        return await this.applicationService.create({
            universalIdentifier: params.universalIdentifier,
            name: params.name,
            logo: params.logo,
            sourcePath: params.universalIdentifier,
            sourceType: params.sourceType,
            applicationRegistrationId: params.applicationRegistrationId,
            workspaceId: params.workspaceId
        });
    }
    constructor(appRegistrationRepository, applicationService, applicationPackageFetcherService, applicationVersionValidationService, applicationSyncService, fileStorageService, logicFunctionExecutorService, cacheLockService, sdkClientGenerationService, messageQueueService, workspaceCacheService){
        this.appRegistrationRepository = appRegistrationRepository;
        this.applicationService = applicationService;
        this.applicationPackageFetcherService = applicationPackageFetcherService;
        this.applicationVersionValidationService = applicationVersionValidationService;
        this.applicationSyncService = applicationSyncService;
        this.fileStorageService = fileStorageService;
        this.logicFunctionExecutorService = logicFunctionExecutorService;
        this.cacheLockService = cacheLockService;
        this.sdkClientGenerationService = sdkClientGenerationService;
        this.messageQueueService = messageQueueService;
        this.workspaceCacheService = workspaceCacheService;
        this.logger = new _common.Logger(ApplicationInstallService.name);
    }
};
ApplicationInstallService.VERSION_REASON_TO_EXCEPTION_CODE = {
    INVALID_REQUIRED_VERSION: _applicationexception.ApplicationExceptionCode.INVALID_APP_ENGINE_REQUIREMENT,
    INVALID_SERVER_VERSION: _applicationexception.ApplicationExceptionCode.INVALID_SERVER_VERSION,
    INCOMPATIBLE: _applicationexception.ApplicationExceptionCode.SERVER_VERSION_INCOMPATIBLE
};
ApplicationInstallService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_applicationregistrationentity.ApplicationRegistrationEntity)),
    _ts_param(9, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.logicFunctionQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _applicationpackagefetcherservice.ApplicationPackageFetcherService === "undefined" ? Object : _applicationpackagefetcherservice.ApplicationPackageFetcherService,
        typeof _applicationversionvalidationservice.ApplicationVersionValidationService === "undefined" ? Object : _applicationversionvalidationservice.ApplicationVersionValidationService,
        typeof _applicationsyncservice.ApplicationSyncService === "undefined" ? Object : _applicationsyncservice.ApplicationSyncService,
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService,
        typeof _logicfunctionexecutorservice.LogicFunctionExecutorService === "undefined" ? Object : _logicfunctionexecutorservice.LogicFunctionExecutorService,
        typeof _cachelockservice.CacheLockService === "undefined" ? Object : _cachelockservice.CacheLockService,
        typeof _sdkclientgenerationservice.SdkClientGenerationService === "undefined" ? Object : _sdkclientgenerationservice.SdkClientGenerationService,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], ApplicationInstallService);

//# sourceMappingURL=application-install.service.js.map