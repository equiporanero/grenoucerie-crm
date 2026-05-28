"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _assert = /*#__PURE__*/ _interop_require_default(require("assert"));
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _coreentitycacheservice = require("../../../core-entity-cache/services/core-entity-cache.service");
const _applicationservice = require("../../application/application.service");
const _preinstalledappsservice = require("../../application/pre-installed-apps/pre-installed-apps.service");
const _billingsubscriptionservice = require("../../billing/services/billing-subscription.service");
const _billingservice = require("../../billing/services/billing.service");
const _dnsmanagerservice = require("../../dns-manager/services/dns-manager.service");
const _customdomainmanagerservice = require("../../domain/custom-domain-manager/services/custom-domain-manager.service");
const _subdomainmanagerservice = require("../../domain/subdomain-manager/services/subdomain-manager.service");
const _exceptionhandlerservice = require("../../exception-handler/exception-handler.service");
const _featureflagservice = require("../../feature-flag/services/feature-flag.service");
const _emailingdomainworkspacecleanupjob = require("../../emailing-domain/jobs/emailing-domain-workspace-cleanup.job");
const _filecorepictureservice = require("../../file/file-core-picture/services/file-core-picture.service");
const _fileworkspacefolderdeletionjob = require("../../file/jobs/file-workspace-folder-deletion.job");
const _messagequeuedecorator = require("../../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../message-queue/services/message-queue.service");
const _sdkclientgenerationservice = require("../../sdk-client/sdk-client-generation.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _upgrademigrationservice = require("../../upgrade/services/upgrade-migration.service");
const _upgradesequencereaderservice = require("../../upgrade/services/upgrade-sequence-reader.service");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
const _userworkspaceservice = require("../../user-workspace/user-workspace.service");
const _userentity = require("../../user/user.entity");
const _workspaceentity = require("../workspace.entity");
const _workspaceexception = require("../workspace.exception");
const _aimodelregistryservice = require("../../../metadata-modules/ai/ai-models/services/ai-model-registry.service");
const _ismodelallowedutil = require("../../../metadata-modules/ai/ai-models/utils/is-model-allowed.util");
const _fieldmetadataentity = require("../../../metadata-modules/field-metadata/field-metadata.entity");
const _allmetadataentitybymetadatanameconstant = require("../../../metadata-modules/flat-entity/constant/all-metadata-entity-by-metadata-name.constant");
const _allmetadatanamessortedatomicallyconstant = require("../../../metadata-modules/flat-entity/constant/all-metadata-names-sorted-atomically.constant");
const _workspacemanyorallflatentitymapscacheservice = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _permissionsexception = require("../../../metadata-modules/permissions/permissions.exception");
const _permissionsservice = require("../../../metadata-modules/permissions/permissions.service");
const _workspacecachestorageservice = require("../../../workspace-cache-storage/workspace-cache-storage.service");
const _getworkspaceschemanameutil = require("../../../workspace-datasource/utils/get-workspace-schema-name.util");
const _workspacedatasourceservice = require("../../../workspace-datasource/workspace-datasource.service");
const _prefilllogicfunctionservice = require("../../../workspace-manager/standard-objects-prefill-data/services/prefill-logic-function.service");
const _prefillcompaniesutil = require("../../../workspace-manager/standard-objects-prefill-data/utils/prefill-companies.util");
const _prefilldashboardsutil = require("../../../workspace-manager/standard-objects-prefill-data/utils/prefill-dashboards.util");
const _prefillopportunitiesutil = require("../../../workspace-manager/standard-objects-prefill-data/utils/prefill-opportunities.util");
const _prefillpeopleutil = require("../../../workspace-manager/standard-objects-prefill-data/utils/prefill-people.util");
const _prefillworkflowcodesteplogicfunctionsutil = require("../../../workspace-manager/standard-objects-prefill-data/utils/prefill-workflow-code-step-logic-functions.util");
const _prefillworkflowcommandmenuitemsutil = require("../../../workspace-manager/standard-objects-prefill-data/utils/prefill-workflow-command-menu-items.util");
const _prefillworkflowsutil = require("../../../workspace-manager/standard-objects-prefill-data/utils/prefill-workflows.util");
const _workspacemanagerservice = require("../../../workspace-manager/workspace-manager.service");
const _defaultfeatureflags = require("../../../workspace-manager/workspace-migration/constant/default-feature-flags");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
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
let WorkspaceService = class WorkspaceService extends _nestjsquerytypeorm.TypeOrmQueryService {
    async updateWorkspaceById({ payload, userWorkspaceId, apiKey }) {
        const workspace = await this.workspaceRepository.findOneBy({
            id: payload.id
        });
        (0, _utils.assertIsDefinedOrThrow)(workspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        await this.validateWorkspaceUpdatePermissions({
            payload,
            userWorkspaceId,
            workspaceId: workspace.id,
            apiKey,
            workspaceActivationStatus: workspace.activationStatus
        });
        if ((0, _utils.isDefined)(payload.subdomain) && workspace.subdomain !== payload.subdomain) {
            await this.subdomainManagerService.validateSubdomainOrThrow(payload.subdomain);
        }
        let customDomainRegistered = false;
        if (payload.customDomain === null && (0, _utils.isDefined)(workspace.customDomain)) {
            await this.dnsManagerService.deleteHostnameSilently(workspace.customDomain);
            workspace.isCustomDomainEnabled = false;
        }
        if (payload.customDomain && workspace.customDomain !== payload.customDomain) {
            await this.customDomainManagerService.setCustomDomain(workspace, payload.customDomain);
            customDomainRegistered = true;
        }
        const authProvidersBySystem = {
            google: this.twentyConfigService.get('AUTH_GOOGLE_ENABLED'),
            password: this.twentyConfigService.get('AUTH_PASSWORD_ENABLED'),
            microsoft: this.twentyConfigService.get('AUTH_MICROSOFT_ENABLED')
        };
        if (payload.isGoogleAuthEnabled && !authProvidersBySystem.google) {
            throw new _workspaceexception.WorkspaceException('Google auth is not enabled in the system.', _workspaceexception.WorkspaceExceptionCode.ENVIRONMENT_VAR_NOT_ENABLED);
        }
        if (payload.isMicrosoftAuthEnabled && !authProvidersBySystem.microsoft) {
            throw new _workspaceexception.WorkspaceException('Microsoft auth is not enabled in the system.', _workspaceexception.WorkspaceExceptionCode.ENVIRONMENT_VAR_NOT_ENABLED);
        }
        if (payload.isPasswordAuthEnabled && !authProvidersBySystem.password) {
            throw new _workspaceexception.WorkspaceException('Password auth is not enabled in the system.', _workspaceexception.WorkspaceExceptionCode.ENVIRONMENT_VAR_NOT_ENABLED);
        }
        if (payload.isGoogleAuthBypassEnabled && !authProvidersBySystem.google) {
            throw new _workspaceexception.WorkspaceException('Google auth is not enabled in the system.', _workspaceexception.WorkspaceExceptionCode.ENVIRONMENT_VAR_NOT_ENABLED);
        }
        if (payload.isMicrosoftAuthBypassEnabled && !authProvidersBySystem.microsoft) {
            throw new _workspaceexception.WorkspaceException('Microsoft auth is not enabled in the system.', _workspaceexception.WorkspaceExceptionCode.ENVIRONMENT_VAR_NOT_ENABLED);
        }
        if (payload.isPasswordAuthBypassEnabled && !authProvidersBySystem.password) {
            throw new _workspaceexception.WorkspaceException('Password auth is not enabled in the system.', _workspaceexception.WorkspaceExceptionCode.ENVIRONMENT_VAR_NOT_ENABLED);
        }
        const isChangingModels = (0, _utils.isDefined)(payload.smartModel) || (0, _utils.isDefined)(payload.fastModel);
        const isChangingAvailability = payload.useRecommendedModels !== undefined || payload.enabledAiModelIds !== undefined;
        if (isChangingModels || isChangingAvailability) {
            const effectiveWorkspace = {
                useRecommendedModels: payload.useRecommendedModels ?? workspace.useRecommendedModels,
                enabledAiModelIds: payload.enabledAiModelIds ?? workspace.enabledAiModelIds
            };
            const modelsToValidate = [
                payload.smartModel ?? workspace.smartModel,
                payload.fastModel ?? workspace.fastModel
            ].filter(_utils.isDefined);
            for (const modelId of modelsToValidate){
                if (!this.aiModelRegistryService.isModelAdminAllowed(modelId)) {
                    throw new _workspaceexception.WorkspaceException('Selected model has been disabled by the administrator', _workspaceexception.WorkspaceExceptionCode.ENVIRONMENT_VAR_NOT_ENABLED);
                }
                if (!(0, _ismodelallowedutil.isModelAllowedByWorkspace)(modelId, effectiveWorkspace, this.aiModelRegistryService.getRecommendedModelIds())) {
                    throw new _workspaceexception.WorkspaceException('Selected model is not available in this workspace', _workspaceexception.WorkspaceExceptionCode.ENVIRONMENT_VAR_NOT_ENABLED);
                }
            }
        }
        let updatedWorkspace;
        try {
            updatedWorkspace = await this.workspaceRepository.save({
                ...workspace,
                ...payload
            });
        } catch (error) {
            // revert custom domain registration on error
            if (payload.customDomain && customDomainRegistered) {
                this.dnsManagerService.deleteHostnameSilently(payload.customDomain).catch((err)=>{
                    this.exceptionHandlerService.captureExceptions([
                        err
                    ]);
                });
            }
            throw error;
        }
        await this.coreEntityCacheService.invalidate('workspaceEntity', workspace.id);
        if (payload.logo === null && (0, _utils.isDefined)(workspace.logoFileId)) {
            await this.fileCorePictureService.deleteCorePicture({
                fileId: workspace.logoFileId,
                workspaceId: workspace.id
            });
        }
        return updatedWorkspace;
    }
    async activateWorkspace(user, workspace, data) {
        if (!data.displayName || !data.displayName.length) {
            throw new _common.BadRequestException("'displayName' not provided");
        }
        if (workspace.activationStatus === _workspace.WorkspaceActivationStatus.ONGOING_CREATION) {
            throw new Error('Workspace is already being created');
        }
        if (workspace.activationStatus !== _workspace.WorkspaceActivationStatus.PENDING_CREATION) {
            throw new Error('Workspace is not pending creation');
        }
        await this.workspaceRepository.update(workspace.id, {
            activationStatus: _workspace.WorkspaceActivationStatus.ONGOING_CREATION
        });
        await this.coreEntityCacheService.invalidate('workspaceEntity', workspace.id);
        await this.workspaceManagerService.init({
            workspace,
            userId: user.id
        });
        await this.featureFlagService.enableFeatureFlags(_defaultfeatureflags.DEFAULT_FEATURE_FLAGS, workspace.id);
        await this.userWorkspaceService.createWorkspaceMember(workspace.id, user);
        await this.prefillCreatedWorkspaceRecords({
            workspaceId: workspace.id,
            schemaName: (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspace.id)
        });
        await this.activateAndInitializeUpgradeState({
            workspaceId: workspace.id,
            displayName: data.displayName
        });
        try {
            await this.sdkClientGenerationService.enqueueSdkClientGenerationForWorkspace(workspace.id);
        } catch (error) {
            this.logger.error(`failed to enqueue SDK client generation jobs for workspace ${workspace.id}`, error);
            this.exceptionHandlerService.captureExceptions([
                error
            ]);
        }
        await this.coreEntityCacheService.invalidate('workspaceEntity', workspace.id);
        return await this.workspaceRepository.findOneBy({
            id: workspace.id
        });
    }
    async activateAndInitializeUpgradeState({ displayName, workspaceId }) {
        const lastAttemptedInstanceCommand = await this.upgradeMigrationService.getLastAttemptedInstanceCommandOrThrow();
        const initialCursor = this.upgradeSequenceReaderService.getInitialCursorForNewWorkspace(lastAttemptedInstanceCommand);
        const executedByVersion = this.twentyConfigService.get('APP_VERSION') ?? 'unknown';
        const queryRunner = this.coreDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            await queryRunner.manager.update(_workspaceentity.WorkspaceEntity, workspaceId, {
                displayName,
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
            });
            await this.upgradeMigrationService.markAsWorkspaceInitial({
                name: initialCursor.name,
                workspaceId,
                executedByVersion,
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
    async suspendWorkspace(id) {
        await this.workspaceRepository.update(id, {
            activationStatus: _workspace.WorkspaceActivationStatus.SUSPENDED,
            suspendedAt: new Date()
        });
    }
    async deleteWorkspace(id, softDelete = false) {
        const workspace = await this.workspaceRepository.findOne({
            where: {
                id
            },
            withDeleted: true
        });
        (0, _assert.default)(workspace, 'Workspace not found');
        const userWorkspaces = await this.userWorkspaceRepository.find({
            where: {
                workspaceId: id
            },
            withDeleted: true
        });
        for (const userWorkspace of userWorkspaces){
            await this.handleRemoveWorkspaceMember(id, userWorkspace.userId, softDelete);
        }
        this.logger.log(`workspace ${id} user workspaces deleted`);
        this.logger.log(`workspace ${id} cache flushed`);
        if (softDelete) {
            if (this.billingService.isBillingEnabled()) {
                await this.billingSubscriptionService.cancelSubscription(workspace.id);
            }
            await this.workspaceRepository.softDelete({
                id
            });
            await this.coreEntityCacheService.invalidate('workspaceEntity', id);
            this.logger.log(`workspace ${id} soft deleted`);
            return workspace;
        }
        if (this.billingService.isBillingEnabled()) {
            await this.billingSubscriptionService.assertSubscriptionCanceledOrNone(workspace.id);
        }
        await this.deleteWorkspaceSyncableMetadataEntities(workspace);
        await this.workspaceDataSourceService.deleteWorkspaceDBSchema(workspace.id);
        await this.workspaceCacheStorageService.flush(workspace.id, workspace.metadataVersion);
        await this.flatEntityMapsCacheService.flushFlatEntityMaps({
            workspaceId: workspace.id
        });
        await this.messageQueueService.add(_fileworkspacefolderdeletionjob.FileWorkspaceFolderDeletionJob.name, {
            workspaceId: id
        });
        await this.messageQueueService.add(_emailingdomainworkspacecleanupjob.EmailingDomainWorkspaceCleanupJob.name, {
            workspaceId: id
        });
        if (workspace.customDomain) {
            await this.dnsManagerService.deleteHostnameSilently(workspace.customDomain);
            this.logger.log(`workspace ${id} custom domain deleted`);
        }
        await this.workspaceRepository.delete(id);
        await this.coreEntityCacheService.invalidate('workspaceEntity', id);
        this.logger.log(`workspace ${id} hard deleted`);
        return workspace;
    }
    async deleteWorkspaceSyncableMetadataEntities(workspace) {
        const queryRunner = this.coreDataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            await queryRunner.startTransaction();
            for (const metadataName of _allmetadatanamessortedatomicallyconstant.ALL_METADATA_NAMES_SORTED_ATOMICALLY){
                if (metadataName === 'fieldMetadata') {
                    const deletedCount = await this.deleteFieldMetadataInChunks(queryRunner, workspace.id);
                    if (deletedCount > 0) {
                        this.logger.log(`workspace ${workspace.id}: deleted ${deletedCount} ${metadataName} record(s)`);
                    }
                    continue;
                }
                const entity = _allmetadataentitybymetadatanameconstant.ALL_METADATA_ENTITY_BY_METADATA_NAME[metadataName];
                const result = await queryRunner.manager.delete(entity, {
                    workspaceId: workspace.id
                });
                if (result.affected && result.affected > 0) {
                    this.logger.log(`workspace ${workspace.id}: deleted ${result.affected} ${metadataName} record(s)`);
                }
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally{
            await queryRunner.release();
        }
    }
    // FieldMetadataEntity has a self-referencing FK (relationTargetFieldMetadataId)
    // Related fields must be deleted together to avoid constraint violations
    async deleteFieldMetadataInChunks(queryRunner, workspaceId) {
        const CHUNK_SIZE = 50;
        let totalDeleted = 0;
        const { flatFieldMetadataMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatFieldMetadataMaps'
            ]
        });
        const fields = Object.values(flatFieldMetadataMaps.byUniversalIdentifier).filter(_utils.isDefined);
        if (fields.length === 0) {
            return 0;
        }
        const processedIds = new Set();
        const fieldsMap = new Map(fields.map((field)=>[
                field.id,
                field
            ]));
        const chunks = [];
        let currentChunk = [];
        for (const field of fields){
            if (processedIds.has(field.id)) {
                continue;
            }
            currentChunk.push(field.id);
            processedIds.add(field.id);
            if (field.relationTargetFieldMetadataId) {
                const relatedField = fieldsMap.get(field.relationTargetFieldMetadataId);
                if (relatedField && !processedIds.has(relatedField.id)) {
                    currentChunk.push(relatedField.id);
                    processedIds.add(relatedField.id);
                }
            }
            if (currentChunk.length >= CHUNK_SIZE) {
                chunks.push([
                    ...currentChunk
                ]);
                currentChunk = [];
            }
        }
        if (currentChunk.length > 0) {
            chunks.push(currentChunk);
        }
        for (const [index, chunk] of chunks.entries()){
            const result = await queryRunner.manager.createQueryBuilder().delete().from(_fieldmetadataentity.FieldMetadataEntity).whereInIds(chunk).execute();
            const deletedInChunk = result.affected || 0;
            totalDeleted += deletedInChunk;
            this.logger.log(`workspace ${workspaceId}: fieldMetadata chunk ${index + 1}/${chunks.length} - deleted ${deletedInChunk} record(s)`);
        }
        return totalDeleted;
    }
    async handleRemoveWorkspaceMember(workspaceId, userId, softDelete = false) {
        const userWorkspaces = await this.userWorkspaceRepository.find({
            where: {
                userId
            }
        });
        const userWorkspaceOfRemovedWorkspaceMember = userWorkspaces?.find((userWorkspace)=>userWorkspace.workspaceId === workspaceId);
        if ((0, _utils.isDefined)(userWorkspaceOfRemovedWorkspaceMember)) {
            await this.userWorkspaceService.deleteUserWorkspace({
                userWorkspaceId: userWorkspaceOfRemovedWorkspaceMember.id,
                softDelete
            });
            await this.coreEntityCacheService.invalidate('userWorkspaceEntity', userWorkspaceOfRemovedWorkspaceMember.id);
        }
        const hasOtherUserWorkspaces = (0, _utils.isDefined)(userWorkspaceOfRemovedWorkspaceMember) ? userWorkspaces.length > 1 : userWorkspaces.length > 0;
        if (!hasOtherUserWorkspaces) {
            await this.userRepository.softDelete(userId);
            await this.coreEntityCacheService.invalidate('user', userId);
        }
    }
    async validateWorkspaceUpdatePermissions({ payload, userWorkspaceId, workspaceId, apiKey, workspaceActivationStatus }) {
        if (workspaceActivationStatus === _workspace.WorkspaceActivationStatus.PENDING_CREATION) {
            return;
        }
        const systemFields = new Set([
            'id',
            'createdAt',
            'updatedAt',
            'deletedAt'
        ]);
        const fieldsBeingUpdated = Object.keys(payload).filter((field)=>!systemFields.has(field));
        if (fieldsBeingUpdated.length === 0) {
            return;
        }
        if (!userWorkspaceId) {
            throw new Error('Missing userWorkspaceId in authContext');
        }
        const fieldsByPermission = new Map();
        for (const field of fieldsBeingUpdated){
            const requiredPermission = this.WORKSPACE_FIELD_PERMISSIONS[field];
            if (!requiredPermission) {
                throw new _permissionsexception.PermissionsException(`Field "${field}" is not allowed to be updated`, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "o6DGfJ",
                        message: 'The field "{field}" cannot be updated. Please contact your workspace administrator.',
                        values: {
                            field: field
                        }
                    }
                });
            }
            if (!fieldsByPermission.has(requiredPermission)) {
                fieldsByPermission.set(requiredPermission, []);
            }
            fieldsByPermission.get(requiredPermission).push(field);
        }
        for (const [permission, fields] of fieldsByPermission.entries()){
            const hasPermission = await this.permissionsService.userHasWorkspaceSettingPermission({
                userWorkspaceId,
                workspaceId,
                setting: permission,
                apiKeyId: apiKey?.id
            });
            if (!hasPermission) {
                const fieldsList = fields.join(', ');
                throw new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.PERMISSION_DENIED, _permissionsexception.PermissionsExceptionCode.PERMISSION_DENIED, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "1dsy9v",
                        message: "You do not have permission to update these fields: {fieldsList}. Please contact your workspace administrator.",
                        values: {
                            fieldsList: fieldsList
                        }
                    }
                });
            }
        }
    }
    async prefillCreatedWorkspaceRecords({ workspaceId, schemaName }) {
        const { flatObjectMetadataMaps, flatFieldMetadataMaps, flatPageLayoutMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps',
                'flatPageLayoutMaps'
            ]
        });
        await this.prefillLogicFunctionService.ensureSeeded({
            workspaceId,
            definitions: (0, _prefillworkflowcodesteplogicfunctionsutil.getCreateCompanyWhenAddingNewPersonCodeStepLogicFunctionDefinitions)(workspaceId)
        });
        const queryRunner = this.coreDataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            await queryRunner.startTransaction();
            await (0, _prefillcompaniesutil.prefillCompanies)(queryRunner.manager, schemaName);
            await (0, _prefillpeopleutil.prefillPeople)(queryRunner.manager, schemaName);
            await (0, _prefillworkflowsutil.prefillWorkflows)(queryRunner.manager, workspaceId, schemaName, flatObjectMetadataMaps, flatFieldMetadataMaps);
            await (0, _prefillopportunitiesutil.prefillOpportunities)(queryRunner.manager, schemaName);
            await (0, _prefilldashboardsutil.prefillDashboards)(queryRunner.manager, schemaName, flatPageLayoutMaps);
            await queryRunner.commitTransaction();
        } catch (error) {
            if (queryRunner.isTransactionActive) {
                await queryRunner.rollbackTransaction();
            }
            throw error;
        } finally{
            await queryRunner.release();
        }
        try {
            await (0, _prefillworkflowcommandmenuitemsutil.prefillWorkflowCommandMenuItems)({
                workspaceId,
                applicationService: this.applicationService,
                flatEntityMapsCacheService: this.flatEntityMapsCacheService,
                workspaceMigrationValidateBuildAndRunService: this.workspaceMigrationValidateBuildAndRunService
            });
        } catch (error) {
            this.logger.error(`Non-critical: failed to prefill workflow command menu items for workspace ${workspaceId}`, error);
            this.exceptionHandlerService.captureExceptions([
                error
            ]);
        }
        try {
            await this.preInstalledAppsService.installOnWorkspace(workspaceId);
        } catch (error) {
            this.logger.error(`Non-critical: failed to install pre-installed apps for workspace ${workspaceId}`, error);
            this.exceptionHandlerService.captureExceptions([
                error
            ]);
        }
    }
    async findOneWorkspaceById(id) {
        return await this.workspaceRepository.findOneBy({
            id
        });
    }
    constructor(workspaceRepository, userRepository, userWorkspaceRepository, workspaceManagerService, featureFlagService, billingSubscriptionService, billingService, userWorkspaceService, twentyConfigService, exceptionHandlerService, permissionsService, dnsManagerService, flatEntityMapsCacheService, prefillLogicFunctionService, applicationService, preInstalledAppsService, workspaceMigrationValidateBuildAndRunService, workspaceCacheStorageService, subdomainManagerService, workspaceDataSourceService, customDomainManagerService, fileCorePictureService, aiModelRegistryService, messageQueueService, coreDataSource, coreEntityCacheService, upgradeMigrationService, upgradeSequenceReaderService, sdkClientGenerationService){
        super(workspaceRepository), this.workspaceRepository = workspaceRepository, this.userRepository = userRepository, this.userWorkspaceRepository = userWorkspaceRepository, this.workspaceManagerService = workspaceManagerService, this.featureFlagService = featureFlagService, this.billingSubscriptionService = billingSubscriptionService, this.billingService = billingService, this.userWorkspaceService = userWorkspaceService, this.twentyConfigService = twentyConfigService, this.exceptionHandlerService = exceptionHandlerService, this.permissionsService = permissionsService, this.dnsManagerService = dnsManagerService, this.flatEntityMapsCacheService = flatEntityMapsCacheService, this.prefillLogicFunctionService = prefillLogicFunctionService, this.applicationService = applicationService, this.preInstalledAppsService = preInstalledAppsService, this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService, this.workspaceCacheStorageService = workspaceCacheStorageService, this.subdomainManagerService = subdomainManagerService, this.workspaceDataSourceService = workspaceDataSourceService, this.customDomainManagerService = customDomainManagerService, this.fileCorePictureService = fileCorePictureService, this.aiModelRegistryService = aiModelRegistryService, this.messageQueueService = messageQueueService, this.coreDataSource = coreDataSource, this.coreEntityCacheService = coreEntityCacheService, this.upgradeMigrationService = upgradeMigrationService, this.upgradeSequenceReaderService = upgradeSequenceReaderService, this.sdkClientGenerationService = sdkClientGenerationService, this.logger = new _common.Logger(WorkspaceService.name), this.WORKSPACE_FIELD_PERMISSIONS = {
            subdomain: _constants.PermissionFlagType.WORKSPACE,
            customDomain: _constants.PermissionFlagType.WORKSPACE,
            displayName: _constants.PermissionFlagType.WORKSPACE,
            logo: _constants.PermissionFlagType.WORKSPACE,
            trashRetentionDays: _constants.PermissionFlagType.WORKSPACE,
            eventLogRetentionDays: _constants.PermissionFlagType.SECURITY,
            inviteHash: _constants.PermissionFlagType.WORKSPACE_MEMBERS,
            isPublicInviteLinkEnabled: _constants.PermissionFlagType.SECURITY,
            allowImpersonation: _constants.PermissionFlagType.SECURITY,
            isGoogleAuthEnabled: _constants.PermissionFlagType.SECURITY,
            isMicrosoftAuthEnabled: _constants.PermissionFlagType.SECURITY,
            isPasswordAuthEnabled: _constants.PermissionFlagType.SECURITY,
            editableProfileFields: _constants.PermissionFlagType.SECURITY,
            isTwoFactorAuthenticationEnforced: _constants.PermissionFlagType.SECURITY,
            defaultRoleId: _constants.PermissionFlagType.ROLES,
            fastModel: _constants.PermissionFlagType.WORKSPACE,
            smartModel: _constants.PermissionFlagType.WORKSPACE,
            aiAdditionalInstructions: _constants.PermissionFlagType.WORKSPACE,
            enabledAiModelIds: _constants.PermissionFlagType.AI_SETTINGS,
            useRecommendedModels: _constants.PermissionFlagType.AI_SETTINGS,
            isInternalMessagesImportEnabled: _constants.PermissionFlagType.WORKSPACE
        };
    }
};
WorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_userentity.UserEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_param(23, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.deleteCascadeQueue)),
    _ts_param(24, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacemanagerservice.WorkspaceManagerService === "undefined" ? Object : _workspacemanagerservice.WorkspaceManagerService,
        typeof _featureflagservice.FeatureFlagService === "undefined" ? Object : _featureflagservice.FeatureFlagService,
        typeof _billingsubscriptionservice.BillingSubscriptionService === "undefined" ? Object : _billingsubscriptionservice.BillingSubscriptionService,
        typeof _billingservice.BillingService === "undefined" ? Object : _billingservice.BillingService,
        typeof _userworkspaceservice.UserWorkspaceService === "undefined" ? Object : _userworkspaceservice.UserWorkspaceService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService,
        typeof _permissionsservice.PermissionsService === "undefined" ? Object : _permissionsservice.PermissionsService,
        typeof _dnsmanagerservice.DnsManagerService === "undefined" ? Object : _dnsmanagerservice.DnsManagerService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _prefilllogicfunctionservice.PrefillLogicFunctionService === "undefined" ? Object : _prefilllogicfunctionservice.PrefillLogicFunctionService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _preinstalledappsservice.PreInstalledAppsService === "undefined" ? Object : _preinstalledappsservice.PreInstalledAppsService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _workspacecachestorageservice.WorkspaceCacheStorageService === "undefined" ? Object : _workspacecachestorageservice.WorkspaceCacheStorageService,
        typeof _subdomainmanagerservice.SubdomainManagerService === "undefined" ? Object : _subdomainmanagerservice.SubdomainManagerService,
        typeof _workspacedatasourceservice.WorkspaceDataSourceService === "undefined" ? Object : _workspacedatasourceservice.WorkspaceDataSourceService,
        typeof _customdomainmanagerservice.CustomDomainManagerService === "undefined" ? Object : _customdomainmanagerservice.CustomDomainManagerService,
        typeof _filecorepictureservice.FileCorePictureService === "undefined" ? Object : _filecorepictureservice.FileCorePictureService,
        typeof _aimodelregistryservice.AiModelRegistryService === "undefined" ? Object : _aimodelregistryservice.AiModelRegistryService,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource,
        typeof _coreentitycacheservice.CoreEntityCacheService === "undefined" ? Object : _coreentitycacheservice.CoreEntityCacheService,
        typeof _upgrademigrationservice.UpgradeMigrationService === "undefined" ? Object : _upgrademigrationservice.UpgradeMigrationService,
        typeof _upgradesequencereaderservice.UpgradeSequenceReaderService === "undefined" ? Object : _upgradesequencereaderservice.UpgradeSequenceReaderService,
        typeof _sdkclientgenerationservice.SdkClientGenerationService === "undefined" ? Object : _sdkclientgenerationservice.SdkClientGenerationService
    ])
], WorkspaceService);

//# sourceMappingURL=workspace.service.js.map