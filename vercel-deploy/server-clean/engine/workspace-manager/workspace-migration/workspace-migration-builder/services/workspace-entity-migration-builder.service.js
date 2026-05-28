"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceEntityMigrationBuilderService", {
    enumerable: true,
    get: function() {
        return WorkspaceEntityMigrationBuilderService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _loggerservice = require("../../../../core-modules/logger/logger.service");
const _flatentitymapsexception = require("../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyuniversalidentifierorthrowutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier-or-throw.util");
const _findflatentitybyuniversalidentifierutil = require("../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _getmetadataflatentitymapskeyutil = require("../../../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const _adduniversalflatentitytouniversalflatentityandrelatedentitymapsthroughmutationorthrowutil = require("../../universal-flat-entity/utils/add-universal-flat-entity-to-universal-flat-entity-and-related-entity-maps-through-mutation-or-throw.util");
const _deleteuniversalflatentityforeignkeyaggregatorsutil = require("../../universal-flat-entity/utils/delete-universal-flat-entity-foreign-key-aggregators.util");
const _deleteuniversalflatentityfromuniversalflatentityandrelatedentitymapsthroughmutationorthrowutil = require("../../universal-flat-entity/utils/delete-universal-flat-entity-from-universal-flat-entity-and-related-entity-maps-through-mutation-or-throw.util");
const _deleteuniversalflatentityfromuniversalflatentitymapsthroughmutationorthrowutil = require("../../universal-flat-entity/utils/delete-universal-flat-entity-from-universal-flat-entity-maps-through-mutation-or-throw.util");
const _replaceuniversalflatentityinuniversalflatentitymapsthroughmutationorthrowutil = require("../../universal-flat-entity/utils/replace-universal-flat-entity-in-universal-flat-entity-maps-through-mutation-or-throw.util");
const _resetuniversalflatentityforeignkeyaggregatorsutil = require("../../universal-flat-entity/utils/reset-universal-flat-entity-foreign-key-aggregators.util");
const _universalflatentitydeletedcreatedupdatedmatrixdispatcherutil = require("../../universal-flat-entity/utils/universal-flat-entity-deleted-created-updated-matrix-dispatcher.util");
const _getmetadataemptyworkspacemigrationactionrecordutil = require("../../utils/get-metadata-empty-workspace-migration-action-record.util");
const _shouldinferdeletionfrommissingentitiesutil = require("../../utils/should-infer-deletion-from-missing-entities.util");
const _topologicallysortuniversalflatentitiesforselfreferentialfksutil = require("../../utils/topologically-sort-universal-flat-entities-for-self-referential-fks.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceEntityMigrationBuilderService = class WorkspaceEntityMigrationBuilderService {
    async validateAndBuild({ buildOptions, dependencyOptimisticFlatEntityMaps: optimisticFlatEntityMapsAndRelatedFlatEntityMaps, from: fromFlatEntityMaps, to: toFlatEntityMaps, additionalCacheDataMaps, workspaceId }) {
        this.logger.time(`EntityBuilder ${this.metadataName}`, 'validateAndBuild');
        this.logger.time(`EntityBuilder ${this.metadataName}`, 'matrix computation');
        const fromFlatEntities = Object.values(fromFlatEntityMaps.byUniversalIdentifier).filter(_utils.isDefined);
        const toFlatEntities = Object.values(toFlatEntityMaps.byUniversalIdentifier).filter(_utils.isDefined);
        const { createdFlatEntityMaps, deletedFlatEntityMaps, updatedFlatEntityMaps } = (0, _universalflatentitydeletedcreatedupdatedmatrixdispatcherutil.flatEntityDeletedCreatedUpdatedMatrixDispatcher)({
            from: fromFlatEntities,
            to: toFlatEntities,
            metadataName: this.metadataName,
            buildOptions
        });
        this.logger.timeEnd(`EntityBuilder ${this.metadataName}`, 'matrix computation');
        this.logger.time(`EntityBuilder ${this.metadataName}`, 'entity processing');
        const flatEntityMapsKey = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(this.metadataName);
        const actionsResult = (0, _getmetadataemptyworkspacemigrationactionrecordutil.getMetadataEmptyWorkspaceMigrationActionRecord)(this.metadataName);
        const allValidationResult = [];
        this.logger.time(`EntityBuilder ${this.metadataName}`, 'deletion validation');
        const remainingFlatEntityMapsToDelete = structuredClone(deletedFlatEntityMaps);
        const universalIdentifiersToDelete = (0, _shouldinferdeletionfrommissingentitiesutil.shouldInferDeletionFromMissingEntities)({
            buildOptions,
            metadataName: this.metadataName
        }) ? Object.keys(deletedFlatEntityMaps.byUniversalIdentifier) : [];
        for (const universalIdentifierToDelete of universalIdentifiersToDelete){
            (0, _deleteuniversalflatentityfromuniversalflatentitymapsthroughmutationorthrowutil.deleteUniversalFlatEntityFromUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalIdentifierToDelete,
                universalFlatEntityMapsToMutate: remainingFlatEntityMapsToDelete
            });
            const universalFlatEntityToDelete = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
                universalIdentifier: universalIdentifierToDelete,
                flatEntityMaps: deletedFlatEntityMaps
            });
            const validationResult = await this.validateFlatEntityDeletion({
                flatEntityToValidate: universalFlatEntityToDelete,
                workspaceId,
                remainingFlatEntityMapsToValidate: remainingFlatEntityMapsToDelete,
                buildOptions,
                optimisticFlatEntityMapsAndRelatedFlatEntityMaps,
                additionalCacheDataMaps
            });
            if (validationResult.status === 'fail') {
                allValidationResult.push(validationResult);
                continue;
            }
            (0, _deleteuniversalflatentityfromuniversalflatentityandrelatedentitymapsthroughmutationorthrowutil.deleteUniversalFlatEntityFromUniversalFlatEntityAndRelatedEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: universalFlatEntityToDelete,
                universalFlatEntityAndRelatedMapsToMutate: optimisticFlatEntityMapsAndRelatedFlatEntityMaps,
                metadataName: this.metadataName
            });
            actionsResult.delete.push(...Array.isArray(validationResult.action) ? validationResult.action : [
                validationResult.action
            ]);
        }
        this.logger.timeEnd(`EntityBuilder ${this.metadataName}`, 'deletion validation');
        this.logger.time(`EntityBuilder ${this.metadataName}`, 'update validation');
        for(const flatEntityToUpdateUniversalIdentifier in updatedFlatEntityMaps.byUniversalIdentifier){
            const flatEntityUpdate = updatedFlatEntityMaps.byUniversalIdentifier[flatEntityToUpdateUniversalIdentifier];
            if (!(0, _utils.isDefined)(flatEntityUpdate)) {
                throw new _flatentitymapsexception.FlatEntityMapsException('Could not find flat entity updates in maps dispatcher should never occur', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
            }
            const validationResult = await this.validateFlatEntityUpdate({
                flatEntityUpdate: flatEntityUpdate.update,
                optimisticFlatEntityMapsAndRelatedFlatEntityMaps,
                workspaceId,
                buildOptions,
                additionalCacheDataMaps,
                universalIdentifier: flatEntityToUpdateUniversalIdentifier
            });
            if (validationResult.status === 'fail') {
                allValidationResult.push(validationResult);
                continue;
            }
            const existingFlatEntity = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: flatEntityToUpdateUniversalIdentifier,
                flatEntityMaps: optimisticFlatEntityMapsAndRelatedFlatEntityMaps[flatEntityMapsKey]
            });
            if (!(0, _utils.isDefined)(existingFlatEntity)) {
                throw new _flatentitymapsexception.FlatEntityMapsException('Existing flat entity to update post successful validation is not defined, should never occur', _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND);
            }
            const updatedFlatEntity = {
                ...existingFlatEntity,
                ...flatEntityUpdate.update
            };
            (0, _replaceuniversalflatentityinuniversalflatentitymapsthroughmutationorthrowutil.replaceUniversalFlatEntityInUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: updatedFlatEntity,
                universalFlatEntityMapsToMutate: optimisticFlatEntityMapsAndRelatedFlatEntityMaps[flatEntityMapsKey]
            });
            actionsResult.update.push(...Array.isArray(validationResult.action) ? validationResult.action : [
                validationResult.action
            ]);
        }
        this.logger.timeEnd(`EntityBuilder ${this.metadataName}`, 'update validation');
        const remainingFlatEntityMapsToCreate = structuredClone(createdFlatEntityMaps);
        this.logger.time(`EntityBuilder ${this.metadataName}`, 'creation validation');
        const sortedCreateUniversalIdentifiers = (0, _topologicallysortuniversalflatentitiesforselfreferentialfksutil.topologicallySortUniversalFlatEntitiesForSelfReferentialFks)({
            metadataName: this.metadataName,
            universalFlatEntityMaps: createdFlatEntityMaps
        });
        for (const flatEntityToCreateUniversalIdentifier of sortedCreateUniversalIdentifiers){
            const rawUniversalflatEntityToCreate = (0, _findflatentitybyuniversalidentifierorthrowutil.findFlatEntityByUniversalIdentifierOrThrow)({
                universalIdentifier: flatEntityToCreateUniversalIdentifier,
                flatEntityMaps: createdFlatEntityMaps
            });
            const universalFlatEntityToCreate = (0, _resetuniversalflatentityforeignkeyaggregatorsutil.resetUniversalFlatEntityForeignKeyAggregators)({
                metadataName: this.metadataName,
                universalFlatEntity: rawUniversalflatEntityToCreate
            });
            const universalIdentifierToDelete = universalFlatEntityToCreate.universalIdentifier;
            (0, _deleteuniversalflatentityfromuniversalflatentitymapsthroughmutationorthrowutil.deleteUniversalFlatEntityFromUniversalFlatEntityMapsThroughMutationOrThrow)({
                universalIdentifierToDelete,
                universalFlatEntityMapsToMutate: remainingFlatEntityMapsToCreate
            });
            const validationResult = await this.innerValidateFlatEntityCreation({
                additionalCacheDataMaps,
                flatEntityToValidate: universalFlatEntityToCreate,
                workspaceId,
                optimisticFlatEntityMapsAndRelatedFlatEntityMaps,
                remainingFlatEntityMapsToValidate: remainingFlatEntityMapsToCreate,
                buildOptions
            });
            if (validationResult.status === 'fail') {
                allValidationResult.push(validationResult);
                continue;
            }
            (0, _adduniversalflatentitytouniversalflatentityandrelatedentitymapsthroughmutationorthrowutil.addUniversalFlatEntityToUniversalFlatEntityAndRelatedEntityMapsThroughMutationOrThrow)({
                universalFlatEntity: universalFlatEntityToCreate,
                universalFlatEntityAndRelatedMapsToMutate: optimisticFlatEntityMapsAndRelatedFlatEntityMaps,
                metadataName: this.metadataName
            });
            const formattedNewCreateAction = {
                ...validationResult.action,
                flatEntity: (0, _deleteuniversalflatentityforeignkeyaggregatorsutil.deleteUniversalFlatEntityForeignKeyAggregators)({
                    metadataName: this.metadataName,
                    universalFlatEntity: validationResult.action.flatEntity
                })
            };
            actionsResult.create.push(formattedNewCreateAction);
        }
        this.logger.timeEnd(`EntityBuilder ${this.metadataName}`, 'creation validation');
        this.logger.timeEnd(`EntityBuilder ${this.metadataName}`, 'entity processing');
        if (allValidationResult.length > 0) {
            return {
                status: 'fail',
                errors: allValidationResult
            };
        }
        this.logger.timeEnd(`EntityBuilder ${this.metadataName}`, 'validateAndBuild');
        return {
            status: 'success',
            actions: actionsResult
        };
    }
    validateUniversalIdentifier({ flatEntityToValidate: { universalIdentifier } }) {
        if (!(0, _uuid.validate)(universalIdentifier) || (0, _uuid.version)(universalIdentifier) < 4) {
            return [
                {
                    code: _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_MALFORMED,
                    message: `Invalid universalIdentifier: "${universalIdentifier}" is not a valid UUID, uuid version should be greater than 4`,
                    value: universalIdentifier
                }
            ];
        }
        return [];
    }
    validateUniversalIdentifierNotAlreadyInCurrentMetadataMaps({ universalIdentifier, universalFlatEntityMaps }) {
        const existingEntity = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: universalFlatEntityMaps,
            universalIdentifier
        });
        if ((0, _utils.isDefined)(existingEntity)) {
            return [
                {
                    code: _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_ALREADY_EXISTS,
                    message: `Cannot create ${this.metadataName}: universalIdentifier "${universalIdentifier}" already exists in ${this.metadataName} maps from application "${existingEntity.applicationUniversalIdentifier}"`
                }
            ];
        }
        return [];
    }
    async innerValidateFlatEntityCreation(args) {
        const uuidValidationResult = this.validateUniversalIdentifier(args);
        const perTypeExistenceResult = this.validateUniversalIdentifierNotAlreadyInCurrentMetadataMaps({
            universalIdentifier: args.flatEntityToValidate.universalIdentifier,
            universalFlatEntityMaps: args.optimisticFlatEntityMapsAndRelatedFlatEntityMaps[(0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(this.metadataName)]
        });
        const centralizedErrors = [
            ...uuidValidationResult,
            ...perTypeExistenceResult
        ];
        const result = await this.validateFlatEntityCreation(args);
        if (result.status === 'fail') {
            return {
                ...result,
                errors: [
                    ...result.errors,
                    ...centralizedErrors
                ]
            };
        }
        if (result.status === 'success' && centralizedErrors.length > 0) {
            return {
                status: 'fail',
                flatEntityMinimalInformation: {
                    universalIdentifier: args.flatEntityToValidate.universalIdentifier
                },
                errors: centralizedErrors,
                metadataName: this.metadataName,
                type: 'create'
            };
        }
        return result;
    }
    constructor(metadataName){
        this.metadataName = metadataName;
    }
};
_ts_decorate([
    (0, _common.Inject)(_loggerservice.LoggerService),
    _ts_metadata("design:type", typeof _loggerservice.LoggerService === "undefined" ? Object : _loggerservice.LoggerService)
], WorkspaceEntityMigrationBuilderService.prototype, "logger", void 0);

//# sourceMappingURL=workspace-entity-migration-builder.service.js.map