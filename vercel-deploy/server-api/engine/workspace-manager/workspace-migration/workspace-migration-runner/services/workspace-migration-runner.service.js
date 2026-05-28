"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationRunnerService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationRunnerService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _loggerservice = require("../../../../core-modules/logger/logger.service");
const _twentyconfigservice = require("../../../../core-modules/twenty-config/twenty-config.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _getmetadataflatentitymapskeyutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const _getmetadatarelatedmetadatanamesforvalidationutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-related-metadata-names-for-validation.util");
const _getmetadatarelatedmetadatanamesutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-related-metadata-names.util");
const _getmetadataserializedrelationnamesutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-serialized-relation-names.util");
const _findallviewsgraphqloperationconstant = require("../../../../metadata-modules/view/constants/find-all-views-graphql-operation.constant");
const _workspacemetadataversionservice = require("../../../../metadata-modules/workspace-metadata-version/services/workspace-metadata-version.service");
const _workspacecachestorageservice = require("../../../../workspace-cache-storage/workspace-cache-storage.service");
const _workspacecacheservice = require("../../../../workspace-cache/services/workspace-cache.service");
const _workspacemigrationrunnerexception = require("../exceptions/workspace-migration-runner.exception");
const _workspacemigrationrunneractionhandlerregistryservice = require("../registry/workspace-migration-runner-action-handler-registry.service");
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
let WorkspaceMigrationRunnerService = class WorkspaceMigrationRunnerService {
    getLegacyCacheInvalidationPromises({ allFlatEntityMapsKeys, workspaceId }) {
        const asyncOperations = [];
        const flatMapsKeysSet = new Set(allFlatEntityMapsKeys);
        const shouldIncrementMetadataGraphqlSchemaVersion = flatMapsKeysSet.has('flatObjectMetadataMaps') || flatMapsKeysSet.has('flatFieldMetadataMaps');
        if (shouldIncrementMetadataGraphqlSchemaVersion) {
            asyncOperations.push(this.workspaceMetadataVersionService.incrementMetadataVersion(workspaceId));
        }
        const viewRelatedFlatMapsKeys = [
            'flatViewMaps',
            'flatViewFilterMaps',
            'flatViewGroupMaps',
            'flatViewFieldMaps',
            'flatViewFilterGroupMaps'
        ];
        const shouldInvalidateFindViewsGraphqlCacheOperation = viewRelatedFlatMapsKeys.some((key)=>flatMapsKeysSet.has(key));
        if (shouldInvalidateFindViewsGraphqlCacheOperation || shouldIncrementMetadataGraphqlSchemaVersion) {
            asyncOperations.push(this.workspaceCacheStorageService.flushGraphQLOperation({
                operationName: _findallviewsgraphqloperationconstant.FIND_ALL_VIEWS_GRAPHQL_OPERATION,
                workspaceId
            }));
        }
        const shouldInvalidateRoleMapCache = flatMapsKeysSet.has('flatRoleMaps') || flatMapsKeysSet.has('flatRoleTargetMaps');
        const shouldInvalidateRolesPermissionsCache = flatMapsKeysSet.has('flatObjectPermissionMaps') || flatMapsKeysSet.has('flatFieldPermissionMaps') || flatMapsKeysSet.has('flatRolePermissionFlagMaps');
        if (shouldIncrementMetadataGraphqlSchemaVersion || shouldInvalidateRoleMapCache || shouldInvalidateRolesPermissionsCache) {
            asyncOperations.push(this.workspaceCacheService.invalidateAndRecompute(workspaceId, [
                'rolesPermissions',
                'userWorkspaceRoleMap',
                'flatRoleTargetMaps',
                'apiKeyRoleMap',
                'ORMEntityMetadatas',
                'flatRoleTargetByAgentIdMaps',
                'graphQLResolverNameMap'
            ]));
        }
        if (flatMapsKeysSet.has('flatApplicationVariableMaps')) {
            asyncOperations.push(this.workspaceCacheService.invalidateAndRecompute(workspaceId, [
                'applicationVariableMaps'
            ]));
        }
        return asyncOperations;
    }
    async invalidateCache({ allFlatEntityMapsKeys, workspaceId }) {
        this.logger.time('Runner', `Cache invalidation ${allFlatEntityMapsKeys.join()}`);
        await this.flatEntityMapsCacheService.invalidateFlatEntityMaps({
            workspaceId,
            flatMapsKeys: allFlatEntityMapsKeys
        });
        const invalidationResults = await Promise.allSettled(this.getLegacyCacheInvalidationPromises({
            allFlatEntityMapsKeys,
            workspaceId
        }));
        const invalidationFailures = invalidationResults.filter((result)=>result.status === 'rejected');
        if (invalidationFailures.length > 0) {
            invalidationFailures.forEach((err)=>this.logger.error(`Failed to invalidate a legacy cache ${err.reason}`, 'Runner'));
            throw new Error(`Failed to invalidate ${invalidationFailures.length} cache operations`);
        }
        this.logger.timeEnd('Runner', `Cache invalidation ${allFlatEntityMapsKeys.join()}`);
    }
    constructor(flatEntityMapsCacheService, coreDataSource, workspaceMigrationRunnerActionHandlerRegistry, workspaceMetadataVersionService, workspaceCacheStorageService, workspaceCacheService, logger, twentyConfigService){
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.coreDataSource = coreDataSource;
        this.workspaceMigrationRunnerActionHandlerRegistry = workspaceMigrationRunnerActionHandlerRegistry;
        this.workspaceMetadataVersionService = workspaceMetadataVersionService;
        this.workspaceCacheStorageService = workspaceCacheStorageService;
        this.workspaceCacheService = workspaceCacheService;
        this.logger = logger;
        this.twentyConfigService = twentyConfigService;
        this.run = async ({ workspaceMigration: { actions, applicationUniversalIdentifier }, workspaceId })=>{
            if (this.twentyConfigService.get('WORKSPACE_SCHEMA_DDL_LOCKED')) {
                throw new _workspacemigrationrunnerexception.WorkspaceMigrationRunnerException({
                    message: 'Workspace schema DDL changes are locked. This is typically set during hot upgrades.',
                    code: _workspacemigrationrunnerexception.WorkspaceMigrationRunnerExceptionCode.DDL_LOCKED
                });
            }
            this.logger.time('Runner', 'Total execution');
            this.logger.time('Runner', 'Initial cache retrieval');
            const queryRunner = this.coreDataSource.createQueryRunner();
            const actionMetadataNames = [
                ...new Set(actions.flatMap((action)=>action.metadataName))
            ];
            const actionsMetadataAndRelatedMetadataNames = [
                ...new Set([
                    ...actionMetadataNames,
                    ...actionMetadataNames.flatMap(_getmetadatarelatedmetadatanamesutil.getMetadataRelatedMetadataNames),
                    ...actionMetadataNames.flatMap(_getmetadataserializedrelationnamesutil.getMetadataSerializedRelationNames),
                    ...actionMetadataNames.flatMap(_getmetadatarelatedmetadatanamesforvalidationutil.getMetadataRelatedMetadataNamesForValidation)
                ])
            ];
            const allFlatEntityMapsKeys = actionsMetadataAndRelatedMetadataNames.map(_getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey);
            let allFlatEntityMaps = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
                workspaceId,
                flatMapsKeys: allFlatEntityMapsKeys
            });
            this.logger.timeEnd('Runner', 'Initial cache retrieval');
            const { flatApplicationMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
                'flatApplicationMaps'
            ]);
            const applicationId = flatApplicationMaps.idByUniversalIdentifier[applicationUniversalIdentifier];
            const flatApplication = (0, _utils.isDefined)(applicationId) ? flatApplicationMaps.byId[applicationId] : undefined;
            if (!(0, _utils.isDefined)(applicationId) || !(0, _utils.isDefined)(flatApplication)) {
                throw new _workspacemigrationrunnerexception.WorkspaceMigrationRunnerException({
                    message: `Could not find application for application with universal identifier: ${applicationUniversalIdentifier}`,
                    code: _workspacemigrationrunnerexception.WorkspaceMigrationRunnerExceptionCode.APPLICATION_NOT_FOUND
                });
            }
            this.logger.time('Runner', 'Transaction execution');
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const allMetadataEvents = [];
            try {
                for (const action of actions){
                    const { partialOptimisticCache, metadataEvents } = await this.workspaceMigrationRunnerActionHandlerRegistry.executeActionHandler({
                        action,
                        context: {
                            flatApplication,
                            action,
                            allFlatEntityMaps,
                            queryRunner,
                            workspaceId
                        }
                    });
                    allFlatEntityMaps = {
                        ...allFlatEntityMaps,
                        ...partialOptimisticCache
                    };
                    allMetadataEvents.push(...metadataEvents);
                }
                await queryRunner.commitTransaction();
                this.logger.timeEnd('Runner', 'Transaction execution');
            } catch (error) {
                await queryRunner.rollbackTransaction().catch((rollbackError)=>// oxlint-disable-next-line no-console
                    console.trace(`Failed to rollback transaction: ${rollbackError.message}`));
                const invertedActions = [
                    ...actions
                ].reverse();
                for (const invertedAction of invertedActions){
                    await this.workspaceMigrationRunnerActionHandlerRegistry.executeActionRollbackHandler({
                        action: invertedAction,
                        context: {
                            flatApplication,
                            action: invertedAction,
                            allFlatEntityMaps,
                            workspaceId
                        }
                    });
                }
                try {
                    await this.invalidateCache({
                        allFlatEntityMapsKeys,
                        workspaceId
                    });
                } catch (cacheError) {
                    this.logger.error(`Cache invalidation failed after rollback: ${cacheError}`, 'Runner');
                }
                if (error instanceof _workspacemigrationrunnerexception.WorkspaceMigrationRunnerException) {
                    throw error;
                }
                throw new _workspacemigrationrunnerexception.WorkspaceMigrationRunnerException({
                    message: error.message,
                    code: _workspacemigrationrunnerexception.WorkspaceMigrationRunnerExceptionCode.INTERNAL_SERVER_ERROR
                });
            } finally{
                await queryRunner.release();
            }
            try {
                await this.invalidateCache({
                    allFlatEntityMapsKeys,
                    workspaceId
                });
            } catch (cacheError) {
                this.logger.error(`Cache invalidation failed after committed transaction: ${cacheError}`, 'Runner');
            }
            const hasSchemaMetadataChanged = allFlatEntityMapsKeys.includes('flatObjectMetadataMaps') || allFlatEntityMapsKeys.includes('flatFieldMetadataMaps');
            this.logger.timeEnd('Runner', 'Total execution');
            return {
                allFlatEntityMaps,
                metadataEvents: allMetadataEvents,
                hasSchemaMetadataChanged
            };
        };
    }
};
WorkspaceMigrationRunnerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectDataSource)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource,
        typeof _workspacemigrationrunneractionhandlerregistryservice.WorkspaceMigrationRunnerActionHandlerRegistryService === "undefined" ? Object : _workspacemigrationrunneractionhandlerregistryservice.WorkspaceMigrationRunnerActionHandlerRegistryService,
        typeof _workspacemetadataversionservice.WorkspaceMetadataVersionService === "undefined" ? Object : _workspacemetadataversionservice.WorkspaceMetadataVersionService,
        typeof _workspacecachestorageservice.WorkspaceCacheStorageService === "undefined" ? Object : _workspacecachestorageservice.WorkspaceCacheStorageService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _loggerservice.LoggerService === "undefined" ? Object : _loggerservice.LoggerService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], WorkspaceMigrationRunnerService);

//# sourceMappingURL=workspace-migration-runner.service.js.map