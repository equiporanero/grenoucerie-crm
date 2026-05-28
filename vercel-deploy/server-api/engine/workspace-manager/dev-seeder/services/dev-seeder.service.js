"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DevSeederService", {
    enumerable: true,
    get: function() {
        return DevSeederService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _uuid = require("uuid");
const _applicationregistrationservice = require("../../../core-modules/application/application-registration/application-registration.service");
const _applicationservice = require("../../../core-modules/application/application.service");
const _sdkclientgenerationservice = require("../../../core-modules/sdk-client/sdk-client-generation.service");
const _twentyconfigservice = require("../../../core-modules/twenty-config/twenty-config.service");
const _upgrademigrationservice = require("../../../core-modules/upgrade/services/upgrade-migration.service");
const _upgradesequencereaderservice = require("../../../core-modules/upgrade/services/upgrade-sequence-reader.service");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _objectmetadataentity = require("../../../metadata-modules/object-metadata/object-metadata.entity");
const _workspacecachestorageservice = require("../../../workspace-cache-storage/workspace-cache-storage.service");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
const _workspacedatasourceservice = require("../../../workspace-datasource/workspace-datasource.service");
const _seedbillingcustomersutil = require("../core/billing/utils/seed-billing-customers.util");
const _seedbillingsubscriptionsutil = require("../core/billing/utils/seed-billing-subscriptions.util");
const _seederworkspacesconstant = require("../core/constants/seeder-workspaces.constant");
const _devseederpermissionsservice = require("../core/services/dev-seeder-permissions.service");
const _seedagentsutil = require("../core/utils/seed-agents.util");
const _seedapikeysutil = require("../core/utils/seed-api-keys.util");
const _seedfeatureflagsutil = require("../core/utils/seed-feature-flags.util");
const _seedmetadataentitiesutil = require("../core/utils/seed-metadata-entities.util");
const _seedpagelayoutsutil = require("../core/utils/seed-page-layouts.util");
const _seedserveridutil = require("../core/utils/seed-server-id.util");
const _seeduserworkspacesutil = require("../core/utils/seed-user-workspaces.util");
const _seedusersutil = require("../core/utils/seed-users.util");
const _seedworkspaceutil = require("../core/utils/seed-workspace.util");
const _devseederdataservice = require("../data/services/dev-seeder-data.service");
const _devseedermetadataservice = require("../metadata/services/dev-seeder-metadata.service");
const _prefillfrontcomponentservice = require("../../standard-objects-prefill-data/services/prefill-front-component.service");
const _prefilllogicfunctionservice = require("../../standard-objects-prefill-data/services/prefill-logic-function.service");
const _prefillfrontcomponentdefinitionsutil = require("../../standard-objects-prefill-data/utils/prefill-front-component-definitions.util");
const _prefillworkflowcodesteplogicfunctionsutil = require("../../standard-objects-prefill-data/utils/prefill-workflow-code-step-logic-functions.util");
const _twentystandardapplicationservice = require("../../twenty-standard-application/services/twenty-standard-application.service");
const _workspacemigrationvalidatebuildandrunservice = require("../../workspace-migration/services/workspace-migration-validate-build-and-run-service");
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
let DevSeederService = class DevSeederService {
    async seedDev(workspaceId, options) {
        const light = options?.light ?? false;
        const isBillingEnabled = this.twentyConfigService.get('IS_BILLING_ENABLED');
        const appVersion = this.twentyConfigService.get('APP_VERSION') ?? 'unknown';
        const lastAttemptedInstanceCommand = await this.upgradeMigrationService.getLastAttemptedInstanceCommandOrThrow();
        const initialCursor = this.upgradeSequenceReaderService.getInitialCursorForNewWorkspace(lastAttemptedInstanceCommand);
        await this.seedCoreSchema({
            workspaceId,
            seedBilling: isBillingEnabled,
            appVersion,
            initialCursor
        });
        await this.applicationRegistrationService.createCliRegistrationIfNotExists();
        const schemaName = await this.workspaceDataSourceService.createWorkspaceDBSchema(workspaceId);
        const { featureFlagsMap } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatApplicationMaps',
            'featureFlagsMap'
        ]);
        await this.workspaceRepository.update(workspaceId, {
            databaseSchema: schemaName
        });
        const { workspaceCustomFlatApplication, twentyStandardFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        await this.twentyStandardApplicationService.synchronizeTwentyStandardApplicationOrThrow({
            workspaceId
        });
        await this.sdkClientGenerationService.generateSdkClientForApplication({
            workspaceId,
            applicationId: twentyStandardFlatApplication.id,
            applicationUniversalIdentifier: twentyStandardFlatApplication.universalIdentifier
        });
        await this.devSeederMetadataService.seed({
            workspaceId,
            light
        });
        await this.sdkClientGenerationService.generateSdkClientForApplication({
            workspaceId,
            applicationId: workspaceCustomFlatApplication.id,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        await this.devSeederMetadataService.seedRelations({
            workspaceId,
            light
        });
        await this.devSeederPermissionsService.initPermissions({
            workspaceId,
            twentyStandardFlatApplication,
            workspaceCustomFlatApplication,
            light
        });
        const objectMetadataRepository = this.coreDataSource.getRepository(_objectmetadataentity.ObjectMetadataEntity);
        const objectMetadataItems = await objectMetadataRepository.find({
            where: {
                workspaceId
            },
            relations: {
                fields: true
            }
        });
        await this.prefillLogicFunctionService.ensureSeeded({
            workspaceId,
            definitions: (0, _prefillworkflowcodesteplogicfunctionsutil.getCreateCompanyWhenAddingNewPersonCodeStepLogicFunctionDefinitions)(workspaceId)
        });
        await this.prefillFrontComponentService.ensureSeeded({
            workspaceId,
            definitions: (0, _prefillfrontcomponentdefinitionsutil.getSeedFrontComponentDefinitions)(workspaceId)
        });
        await (0, _seedpagelayoutsutil.seedPageLayouts)({
            workspaceId,
            flatApplication: twentyStandardFlatApplication,
            objectMetadataItems,
            workspaceMigrationValidateBuildAndRunService: this.workspaceMigrationValidateBuildAndRunService
        });
        await this.devSeederDataService.seed({
            schemaName,
            workspaceId,
            featureFlags: featureFlagsMap,
            light
        });
        await this.workspaceCacheStorageService.flush(workspaceId, undefined);
    }
    async seedEmptyWorkspace(workspaceId) {
        const appVersion = this.twentyConfigService.get('APP_VERSION') ?? 'unknown';
        const lastAttemptedInstanceCommand = await this.upgradeMigrationService.getLastAttemptedInstanceCommandOrThrow();
        const initialCursor = this.upgradeSequenceReaderService.getInitialCursorForNewWorkspace(lastAttemptedInstanceCommand);
        const createWorkspaceStaticInput = _seederworkspacesconstant.SEEDER_CREATE_EMPTY_WORKSPACE_INPUT[workspaceId];
        const queryRunner = this.coreDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const workspaceCustomApplicationId = (0, _uuid.v4)();
            await (0, _seedworkspaceutil.createWorkspace)({
                queryRunner,
                schemaName: 'core',
                createWorkspaceInput: {
                    ...createWorkspaceStaticInput,
                    workspaceCustomApplicationId
                }
            });
            await this.applicationService.createWorkspaceCustomApplication({
                workspaceId,
                applicationId: workspaceCustomApplicationId
            }, queryRunner);
            await this.applicationService.createTwentyStandardApplication({
                workspaceId,
                skipCacheInvalidation: true
            }, queryRunner);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally{
            await queryRunner.release();
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        await this.devSeederPermissionsService.initMinimalPermissionsAndActivateWorkspace({
            workspaceId,
            workspaceCustomFlatApplication
        });
        await this.upgradeMigrationService.markAsWorkspaceInitial({
            name: initialCursor.name,
            workspaceId,
            executedByVersion: appVersion,
            status: initialCursor.status
        });
        await this.workspaceCacheStorageService.flush(workspaceId, undefined);
    }
    async seedCoreSchema({ workspaceId, appVersion, initialCursor, seedBilling = true }) {
        const schemaName = 'core';
        const createWorkspaceStaticInput = _seederworkspacesconstant.SEEDER_CREATE_WORKSPACE_INPUT[workspaceId];
        const queryRunner = this.coreDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const workspaceCustomApplicationId = (0, _uuid.v4)();
            await (0, _seedworkspaceutil.createWorkspace)({
                queryRunner,
                schemaName,
                createWorkspaceInput: {
                    ...createWorkspaceStaticInput,
                    workspaceCustomApplicationId
                }
            });
            await this.applicationService.createWorkspaceCustomApplication({
                workspaceId,
                applicationId: workspaceCustomApplicationId
            }, queryRunner);
            await (0, _seedserveridutil.seedServerId)({
                queryRunner,
                schemaName
            });
            await (0, _seedusersutil.seedUsers)({
                queryRunner,
                schemaName
            });
            await (0, _seeduserworkspacesutil.seedUserWorkspaces)({
                queryRunner,
                schemaName,
                workspaceId
            });
            await this.applicationService.createTwentyStandardApplication({
                workspaceId,
                skipCacheInvalidation: true
            }, queryRunner);
            await (0, _seedagentsutil.seedAgents)({
                queryRunner,
                schemaName,
                workspaceId
            });
            await (0, _seedapikeysutil.seedApiKeys)({
                queryRunner,
                schemaName,
                workspaceId
            });
            await (0, _seedfeatureflagsutil.seedFeatureFlags)({
                queryRunner,
                schemaName,
                workspaceId
            });
            if (seedBilling) {
                await (0, _seedbillingcustomersutil.seedBillingCustomers)({
                    queryRunner,
                    schemaName,
                    workspaceId
                });
                await (0, _seedbillingsubscriptionsutil.seedBillingSubscriptions)({
                    queryRunner,
                    schemaName,
                    workspaceId
                });
            }
            await (0, _seedmetadataentitiesutil.seedMetadataEntities)({
                queryRunner,
                schemaName,
                workspaceId
            });
            await this.upgradeMigrationService.markAsWorkspaceInitial({
                name: initialCursor.name,
                workspaceId,
                executedByVersion: appVersion,
                status: initialCursor.status,
                queryRunner
            });
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally{
            await queryRunner.release();
        }
    }
    constructor(workspaceCacheStorageService, twentyConfigService, workspaceDataSourceService, twentyStandardApplicationService, devSeederMetadataService, devSeederPermissionsService, devSeederDataService, applicationService, applicationRegistrationService, workspaceCacheService, sdkClientGenerationService, upgradeMigrationService, upgradeSequenceReaderService, workspaceMigrationValidateBuildAndRunService, prefillFrontComponentService, prefillLogicFunctionService, coreDataSource, workspaceRepository){
        this.workspaceCacheStorageService = workspaceCacheStorageService;
        this.twentyConfigService = twentyConfigService;
        this.workspaceDataSourceService = workspaceDataSourceService;
        this.twentyStandardApplicationService = twentyStandardApplicationService;
        this.devSeederMetadataService = devSeederMetadataService;
        this.devSeederPermissionsService = devSeederPermissionsService;
        this.devSeederDataService = devSeederDataService;
        this.applicationService = applicationService;
        this.applicationRegistrationService = applicationRegistrationService;
        this.workspaceCacheService = workspaceCacheService;
        this.sdkClientGenerationService = sdkClientGenerationService;
        this.upgradeMigrationService = upgradeMigrationService;
        this.upgradeSequenceReaderService = upgradeSequenceReaderService;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.prefillFrontComponentService = prefillFrontComponentService;
        this.prefillLogicFunctionService = prefillLogicFunctionService;
        this.coreDataSource = coreDataSource;
        this.workspaceRepository = workspaceRepository;
    }
};
DevSeederService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(16, (0, _typeorm.InjectDataSource)()),
    _ts_param(17, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacecachestorageservice.WorkspaceCacheStorageService === "undefined" ? Object : _workspacecachestorageservice.WorkspaceCacheStorageService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _workspacedatasourceservice.WorkspaceDataSourceService === "undefined" ? Object : _workspacedatasourceservice.WorkspaceDataSourceService,
        typeof _twentystandardapplicationservice.TwentyStandardApplicationService === "undefined" ? Object : _twentystandardapplicationservice.TwentyStandardApplicationService,
        typeof _devseedermetadataservice.DevSeederMetadataService === "undefined" ? Object : _devseedermetadataservice.DevSeederMetadataService,
        typeof _devseederpermissionsservice.DevSeederPermissionsService === "undefined" ? Object : _devseederpermissionsservice.DevSeederPermissionsService,
        typeof _devseederdataservice.DevSeederDataService === "undefined" ? Object : _devseederdataservice.DevSeederDataService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _applicationregistrationservice.ApplicationRegistrationService === "undefined" ? Object : _applicationregistrationservice.ApplicationRegistrationService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _sdkclientgenerationservice.SdkClientGenerationService === "undefined" ? Object : _sdkclientgenerationservice.SdkClientGenerationService,
        typeof _upgrademigrationservice.UpgradeMigrationService === "undefined" ? Object : _upgrademigrationservice.UpgradeMigrationService,
        typeof _upgradesequencereaderservice.UpgradeSequenceReaderService === "undefined" ? Object : _upgradesequencereaderservice.UpgradeSequenceReaderService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _prefillfrontcomponentservice.PrefillFrontComponentService === "undefined" ? Object : _prefillfrontcomponentservice.PrefillFrontComponentService,
        typeof _prefilllogicfunctionservice.PrefillLogicFunctionService === "undefined" ? Object : _prefilllogicfunctionservice.PrefillLogicFunctionService,
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], DevSeederService);

//# sourceMappingURL=dev-seeder.service.js.map