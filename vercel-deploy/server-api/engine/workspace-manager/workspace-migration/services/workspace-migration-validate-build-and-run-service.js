"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceMigrationValidateBuildAndRunService", {
    enumerable: true,
    get: function() {
        return WorkspaceMigrationValidateBuildAndRunService;
    }
});
const _common = require("@nestjs/common");
const _metadata = require("twenty-shared/metadata");
const _utils = require("twenty-shared/utils");
const _twentyconfigservice = require("../../../core-modules/twenty-config/twenty-config.service");
const _allmanytoonemetadatarelationsconstant = require("../../../metadata-modules/flat-entity/constant/all-many-to-one-metadata-relations.constant");
const _createemptyflatentitymapsconstant = require("../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _flatentitymapsexception = require("../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _getmetadataflatentitymapskeyutil = require("../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const _getmetadatarelatedmetadatanamesforvalidationutil = require("../../../metadata-modules/flat-entity/utils/get-metadata-related-metadata-names-for-validation.util");
const _getsubflatentitymapsbyapplicationidsorthrowutil = require("../../../metadata-modules/flat-entity/utils/get-sub-flat-entity-maps-by-application-ids-or-throw.util");
const _metadataeventemitter = require("../../../subscriptions/metadata-event/metadata-event-emitter");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
const _twentystandardapplications = require("../../twenty-standard-application/constants/twenty-standard-applications");
const _workspacemigrationexception = require("../../workspace-migration.exception");
const _workspacemigrationadditionalcachedatamapskeyconstant = require("../constant/workspace-migration-additional-cache-data-maps-key.constant");
const _enrichcreateworkspacemigrationactionwithidsutil = require("./utils/enrich-create-workspace-migration-action-with-ids.util");
const _workspacemigrationbuildorchestratorservice = require("./workspace-migration-build-orchestrator.service");
const _computeuniversalflatentitymapsfromtothroughmutationutil = require("../utils/compute-universal-flat-entity-maps-from-to-through-mutation.util");
const _workspacemigrationrunnerservice = require("../workspace-migration-runner/services/workspace-migration-runner.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceMigrationValidateBuildAndRunService = class WorkspaceMigrationValidateBuildAndRunService {
    computeAllInvolvedApplicationIds({ allFlatEntityOperationByMetadataName, flatApplicationMaps, applicationUniversalIdentifier, allRelatedFlatEntityMaps }) {
        const applicationIds = new Set();
        const applicationId = flatApplicationMaps.idByUniversalIdentifier[applicationUniversalIdentifier];
        const twentyStandardApplicationId = flatApplicationMaps.idByUniversalIdentifier[_twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier];
        if (!(0, _utils.isDefined)(twentyStandardApplicationId) || !(0, _utils.isDefined)(applicationId)) {
            throw new _flatentitymapsexception.FlatEntityMapsException('Application to build and its dependent application not found', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
        }
        applicationIds.add(applicationId);
        const isBuildingTwentyStandardApplication = applicationUniversalIdentifier === _twentystandardapplications.TWENTY_STANDARD_APPLICATION.universalIdentifier;
        if (!isBuildingTwentyStandardApplication) {
            applicationIds.add(twentyStandardApplicationId);
        }
        for (const metadataName of Object.keys(allFlatEntityOperationByMetadataName)){
            const flatEntityOperations = allFlatEntityOperationByMetadataName[metadataName];
            if (!(0, _utils.isDefined)(flatEntityOperations)) {
                continue;
            }
            const { flatEntityToCreate, flatEntityToUpdate, flatEntityToDelete } = flatEntityOperations;
            const relations = _allmanytoonemetadatarelationsconstant.ALL_MANY_TO_ONE_METADATA_RELATIONS[metadataName];
            for (const flatEntity of [
                ...flatEntityToCreate,
                ...flatEntityToUpdate,
                ...flatEntityToDelete
            ]){
                const entityApplicationId = flatApplicationMaps.idByUniversalIdentifier[flatEntity.applicationUniversalIdentifier];
                if ((0, _utils.isDefined)(entityApplicationId)) {
                    applicationIds.add(entityApplicationId);
                }
                for (const relation of Object.values(relations)){
                    if (!(0, _utils.isDefined)(relation)) {
                        continue;
                    }
                    const { universalForeignKey, metadataName: targetMetadataName } = relation;
                    const referencedUniversalIdentifier = flatEntity[universalForeignKey];
                    if (!(0, _utils.isDefined)(referencedUniversalIdentifier)) {
                        continue;
                    }
                    const targetFlatEntityMaps = allRelatedFlatEntityMaps[(0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(targetMetadataName)];
                    if (!(0, _utils.isDefined)(targetFlatEntityMaps)) {
                        continue;
                    }
                    const referencedEntity = targetFlatEntityMaps.byUniversalIdentifier[referencedUniversalIdentifier];
                    if ((0, _utils.isDefined)(referencedEntity)) {
                        applicationIds.add(referencedEntity.applicationId);
                    }
                }
            }
        }
        return [
            ...applicationIds
        ];
    }
    async computeAllRelatedFlatEntityMaps({ allFlatEntityOperationByMetadataName, workspaceId, applicationUniversalIdentifier }) {
        const allMetadataNameToCompare = Object.keys(allFlatEntityOperationByMetadataName);
        const allMetadataNameCacheToCompute = [
            ...new Set([
                ...allMetadataNameToCompare,
                ...allMetadataNameToCompare.flatMap(_getmetadatarelatedmetadatanamesforvalidationutil.getMetadataRelatedMetadataNamesForValidation)
            ])
        ];
        const allFlatEntityMapsCacheKeysToCompute = allMetadataNameCacheToCompute.map(_getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey);
        const { flatApplicationMaps, ...allRelatedFlatEntityMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            ...allFlatEntityMapsCacheKeysToCompute,
            ..._workspacemigrationadditionalcachedatamapskeyconstant.WORKSPACE_MIGRATION_ADDITIONAL_CACHE_DATA_MAPS_KEY,
            'flatApplicationMaps'
        ]);
        const initialAccumulator = allMetadataNameCacheToCompute.reduce((allFlatEntityMaps, metadataName)=>({
                ...allFlatEntityMaps,
                [(0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(metadataName)]: (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)()
            }), {});
        const applicationIds = this.computeAllInvolvedApplicationIds({
            allFlatEntityOperationByMetadataName,
            flatApplicationMaps,
            applicationUniversalIdentifier,
            allRelatedFlatEntityMaps
        });
        const dependencyAllFlatEntityMaps = allMetadataNameCacheToCompute.reduce((allFlatEntityMaps, metadataName)=>{
            const metadataFlatEntityMapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(metadataName);
            return {
                ...allFlatEntityMaps,
                [metadataFlatEntityMapsKey]: (0, _getsubflatentitymapsbyapplicationidsorthrowutil.getSubFlatEntityMapsByApplicationIdsOrThrow)({
                    applicationIds,
                    flatEntityMaps: allRelatedFlatEntityMaps[metadataFlatEntityMapsKey]
                })
            };
        }, initialAccumulator);
        const additionalCacheDataMaps = _workspacemigrationadditionalcachedatamapskeyconstant.WORKSPACE_MIGRATION_ADDITIONAL_CACHE_DATA_MAPS_KEY.reduce((acc, additionalCacheDataMapsKey)=>{
            return {
                ...acc,
                [additionalCacheDataMapsKey]: allRelatedFlatEntityMaps[additionalCacheDataMapsKey]
            };
        }, {});
        return {
            allRelatedFlatEntityMaps,
            dependencyAllFlatEntityMaps,
            additionalCacheDataMaps
        };
    }
    async computeFromToAllFlatEntityMapsAndBuildOptions({ allFlatEntityOperationByMetadataName, workspaceId, applicationUniversalIdentifier }) {
        const { allRelatedFlatEntityMaps, dependencyAllFlatEntityMaps, additionalCacheDataMaps } = await this.computeAllRelatedFlatEntityMaps({
            allFlatEntityOperationByMetadataName,
            workspaceId,
            applicationUniversalIdentifier
        });
        const fromToAllFlatEntityMaps = {};
        const idByUniversalIdentifierByMetadataName = {};
        const inferDeletionFromMissingEntities = {};
        const allMetadataNameToCompare = Object.keys(allFlatEntityOperationByMetadataName);
        for (const metadataName of allMetadataNameToCompare){
            const flatEntityOperations = allFlatEntityOperationByMetadataName[metadataName];
            if (!(0, _utils.isDefined)(flatEntityOperations)) {
                throw new _flatentitymapsexception.FlatEntityMapsException(`Could not load flat entity maps to compare for ${metadataName}, should never occur`, _flatentitymapsexception.FlatEntityMapsExceptionCode.INTERNAL_SERVER_ERROR);
            }
            const { flatEntityToCreate, flatEntityToDelete, flatEntityToUpdate } = flatEntityOperations;
            const idByUniversalIdentifier = Object.fromEntries(flatEntityToCreate.filter((flatEntity)=>(0, _utils.isDefined)(flatEntity.id)).map((flatEntity)=>[
                    flatEntity.universalIdentifier,
                    flatEntity.id
                ]));
            if (Object.keys(idByUniversalIdentifier).length > 0) {
                idByUniversalIdentifierByMetadataName[metadataName] = idByUniversalIdentifier;
            }
            const flatEntityMapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(metadataName);
            const flatEntityMaps = allRelatedFlatEntityMaps[flatEntityMapsKey];
            // @ts-expect-error Metadata flat entity maps cache key and metadataName colliding
            fromToAllFlatEntityMaps[flatEntityMapsKey] = (0, _computeuniversalflatentitymapsfromtothroughmutationutil.computeUniversalFlatEntityMapsFromToThroughMutation)({
                flatEntityMaps: structuredClone(flatEntityMaps),
                flatEntityToCreate,
                flatEntityToDelete,
                flatEntityToUpdate
            });
            if (flatEntityToDelete.length > 0) {
                inferDeletionFromMissingEntities[metadataName] = true;
            }
        }
        return {
            fromToAllFlatEntityMaps,
            inferDeletionFromMissingEntities,
            dependencyAllFlatEntityMaps,
            additionalCacheDataMaps,
            idByUniversalIdentifierByMetadataName
        };
    }
    async validateBuildAndRunWorkspaceMigrationFromTo(args) {
        const { idByUniversalIdentifierByMetadataName, ...buildArgs } = args;
        const validateAndBuildResult = await this.workspaceMigrationBuildOrchestratorService.buildWorkspaceMigration(buildArgs).catch((error)=>{
            this.logger.error(error);
            throw new _workspacemigrationexception.WorkspaceMigrationV2Exception(error.message, _metadata.WorkspaceMigrationV2ExceptionCode.BUILDER_INTERNAL_SERVER_ERROR);
        });
        if (validateAndBuildResult.status === 'fail') {
            if (this.isDebugEnabled) {
                this.logger.debug(JSON.stringify(validateAndBuildResult, null, 2));
            }
            return validateAndBuildResult;
        }
        const workspaceMigration = (0, _utils.isDefined)(idByUniversalIdentifierByMetadataName) ? (0, _enrichcreateworkspacemigrationactionwithidsutil.enrichCreateWorkspaceMigrationActionsWithIds)({
            idByUniversalIdentifierByMetadataName,
            workspaceMigration: validateAndBuildResult.workspaceMigration
        }) : validateAndBuildResult.workspaceMigration;
        if (workspaceMigration.actions.length === 0) {
            return {
                status: 'success',
                workspaceMigration,
                hasSchemaMetadataChanged: false
            };
        }
        const { hasSchemaMetadataChanged, metadataEvents } = await this.workspaceMigrationRunnerService.run({
            workspaceId: args.workspaceId,
            workspaceMigration
        });
        this.metadataEventEmitter.emitMetadataEvents({
            metadataEvents: metadataEvents,
            workspaceId: args.workspaceId
        });
        return {
            status: 'success',
            workspaceMigration,
            hasSchemaMetadataChanged
        };
    }
    async validateBuildAndRunWorkspaceMigration({ allFlatEntityOperationByMetadataName: allFlatEntities, workspaceId, isSystemBuild = false, applicationUniversalIdentifier }) {
        const { fromToAllFlatEntityMaps, inferDeletionFromMissingEntities, dependencyAllFlatEntityMaps, additionalCacheDataMaps, idByUniversalIdentifierByMetadataName } = await this.computeFromToAllFlatEntityMapsAndBuildOptions({
            allFlatEntityOperationByMetadataName: allFlatEntities,
            workspaceId,
            applicationUniversalIdentifier
        });
        return await this.validateBuildAndRunWorkspaceMigrationFromTo({
            buildOptions: {
                isSystemBuild,
                inferDeletionFromMissingEntities,
                applicationUniversalIdentifier
            },
            fromToAllFlatEntityMaps,
            workspaceId,
            dependencyAllFlatEntityMaps,
            additionalCacheDataMaps,
            idByUniversalIdentifierByMetadataName
        });
    }
    constructor(workspaceMigrationRunnerService, workspaceMigrationBuildOrchestratorService, workspaceCacheService, metadataEventEmitter, twentyConfigService){
        this.workspaceMigrationRunnerService = workspaceMigrationRunnerService;
        this.workspaceMigrationBuildOrchestratorService = workspaceMigrationBuildOrchestratorService;
        this.workspaceCacheService = workspaceCacheService;
        this.metadataEventEmitter = metadataEventEmitter;
        this.logger = new _common.Logger(WorkspaceMigrationValidateBuildAndRunService.name);
        const logLevels = twentyConfigService.get('LOG_LEVELS');
        this.isDebugEnabled = logLevels.includes('debug');
    }
};
WorkspaceMigrationValidateBuildAndRunService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemigrationrunnerservice.WorkspaceMigrationRunnerService === "undefined" ? Object : _workspacemigrationrunnerservice.WorkspaceMigrationRunnerService,
        typeof _workspacemigrationbuildorchestratorservice.WorkspaceMigrationBuildOrchestratorService === "undefined" ? Object : _workspacemigrationbuildorchestratorservice.WorkspaceMigrationBuildOrchestratorService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _metadataeventemitter.MetadataEventEmitter === "undefined" ? Object : _metadataeventemitter.MetadataEventEmitter,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], WorkspaceMigrationValidateBuildAndRunService);

//# sourceMappingURL=workspace-migration-validate-build-and-run-service.js.map