"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationSyncService", {
    enumerable: true,
    get: function() {
        return ApplicationSyncService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _applicationexception = require("../application.exception");
const _applicationmanifestmigrationservice = require("./application-manifest-migration.service");
const _applicationservice = require("../application.service");
const _buildfromtoalluniversalflatentitymapsutil = require("./utils/build-from-to-all-universal-flat-entity-maps.util");
const _getapplicationsuballflatentitymapsutil = require("./utils/get-application-sub-all-flat-entity-maps.util");
const _filestorageservice = require("../../file-storage/file-storage.service");
const _createemptyallflatentitymapsconstant = require("../../../metadata-modules/flat-entity/constant/create-empty-all-flat-entity-maps.constant");
const _getmetadataflatentitymapskeyutil = require("../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
const _streamtobuffer = require("../../../../utils/stream-to-buffer");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ApplicationSyncService = class ApplicationSyncService {
    async synchronizeFromManifest({ workspaceId, manifest, applicationRegistrationId }) {
        const application = await this.syncApplication({
            workspaceId,
            manifest,
            applicationRegistrationId
        });
        const ownerFlatApplication = application;
        const syncResult = await this.applicationManifestMigrationService.syncMetadataFromManifest({
            manifest,
            workspaceId,
            ownerFlatApplication
        });
        this.logger.log('Application sync from manifest completed');
        return syncResult;
    }
    // Registers the application + only the pre-install logic function in
    // workspace metadata so the pre-install hook can resolve and execute it
    // before the main synchronizeFromManifest runs the full migrations.
    // No-op when the manifest does not declare a pre-install logic function.
    async preInstallSynchronizeFromManifest({ workspaceId, manifest, applicationRegistrationId }) {
        if (!(0, _utils.isDefined)(manifest.application.preInstallLogicFunction)) {
            return;
        }
        const application = await this.syncApplication({
            workspaceId,
            manifest,
            applicationRegistrationId
        });
        const ownerFlatApplication = application;
        await this.applicationManifestMigrationService.syncPreInstallLogicFunctionFromManifest({
            manifest,
            workspaceId,
            ownerFlatApplication
        });
        this.logger.log('Pre-install sync from manifest completed');
    }
    async syncApplication({ workspaceId, manifest, applicationRegistrationId }) {
        const name = manifest.application.displayName;
        const packageJson = JSON.parse((await (0, _streamtobuffer.streamToBuffer)(await this.fileStorageService.readFile({
            applicationUniversalIdentifier: manifest.application.universalIdentifier,
            fileFolder: _types.FileFolder.Dependencies,
            resourcePath: 'package.json',
            workspaceId
        }))).toString('utf-8'));
        const application = await this.applicationService.findByUniversalIdentifier({
            universalIdentifier: manifest.application.universalIdentifier,
            workspaceId
        });
        if (!application) {
            throw new _applicationexception.ApplicationException(`Application "${manifest.application.universalIdentifier}" is not installed in workspace "${workspaceId}". Install it first.`, _applicationexception.ApplicationExceptionCode.APP_NOT_INSTALLED);
        }
        const resolvedRegistrationId = applicationRegistrationId ?? application.applicationRegistrationId;
        return await this.applicationService.update(application.id, {
            name,
            description: manifest.application.description,
            logo: manifest.application.logoUrl ?? null,
            version: packageJson.version,
            packageJsonChecksum: manifest.application.packageJsonChecksum,
            yarnLockChecksum: manifest.application.yarnLockChecksum,
            applicationRegistrationId: resolvedRegistrationId,
            workspaceId
        });
    }
    async uninstallApplication({ workspaceId, applicationUniversalIdentifier }) {
        const application = await this.applicationService.findByUniversalIdentifier({
            universalIdentifier: applicationUniversalIdentifier,
            workspaceId
        });
        if (!(0, _utils.isDefined)(application)) {
            throw new _applicationexception.ApplicationException(`Application with universalIdentifier ${applicationUniversalIdentifier} not found`, _applicationexception.ApplicationExceptionCode.ENTITY_NOT_FOUND);
        }
        if (!application.canBeUninstalled) {
            throw new _applicationexception.ApplicationException('This application cannot be uninstalled.', _applicationexception.ApplicationExceptionCode.FORBIDDEN);
        }
        const flatEntityMapsCacheKeys = Object.values(_metadata.ALL_METADATA_NAME).map(_getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey);
        const cacheResult = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            ...flatEntityMapsCacheKeys,
            'featureFlagsMap'
        ]);
        const { featureFlagsMap, ...fromAllFlatEntityMaps } = cacheResult;
        const applicationFromAllFlatEntityMaps = (0, _getapplicationsuballflatentitymapsutil.getApplicationSubAllFlatEntityMaps)({
            applicationIds: [
                application.id
            ],
            fromAllFlatEntityMaps
        });
        const fromToAllFlatEntityMaps = (0, _buildfromtoalluniversalflatentitymapsutil.buildFromToAllUniversalFlatEntityMaps)({
            fromAllFlatEntityMaps: applicationFromAllFlatEntityMaps,
            toAllUniversalFlatEntityMaps: (0, _createemptyallflatentitymapsconstant.createEmptyAllFlatEntityMaps)()
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigrationFromTo({
            buildOptions: {
                isSystemBuild: true,
                inferDeletionFromMissingEntities: true,
                applicationUniversalIdentifier
            },
            fromToAllFlatEntityMaps,
            workspaceId,
            additionalCacheDataMaps: {
                featureFlagsMap
            }
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Validation errors occurred while uninstalling application');
        }
        await this.applicationService.delete(applicationUniversalIdentifier, workspaceId);
        return validateAndBuildResult.workspaceMigration;
    }
    constructor(applicationService, applicationManifestMigrationService, workspaceMigrationValidateBuildAndRunService, workspaceCacheService, fileStorageService){
        this.applicationService = applicationService;
        this.applicationManifestMigrationService = applicationManifestMigrationService;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.workspaceCacheService = workspaceCacheService;
        this.fileStorageService = fileStorageService;
        this.logger = new _common.Logger(ApplicationSyncService.name);
    }
};
ApplicationSyncService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _applicationmanifestmigrationservice.ApplicationManifestMigrationService === "undefined" ? Object : _applicationmanifestmigrationservice.ApplicationManifestMigrationService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _filestorageservice.FileStorageService === "undefined" ? Object : _filestorageservice.FileStorageService
    ])
], ApplicationSyncService);

//# sourceMappingURL=application-sync.service.js.map