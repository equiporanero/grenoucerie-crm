"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IndexMetadataService", {
    enumerable: true,
    get: function() {
        return IndexMetadataService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _uuid = require("uuid");
const _applicationservice = require("../../../core-modules/application/application.service");
const _iscompositefieldmetadatatypeutil = require("../../field-metadata/utils/is-composite-field-metadata-type.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _findflatentitybyuniversalidentifierutil = require("../../flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _constants = require("twenty-shared/constants");
const _indexfieldmetadataexception = require("../index-field-metadata.exception");
const _generateflatindexutil = require("../utils/generate-flat-index.util");
const _validateindextypeagainstfieldsutil = require("../utils/validate-index-type-against-fields.util");
const _validatenoduplicateuniqueindexutil = require("../utils/validate-no-duplicate-unique-index.util");
const _workspacemigrationbuilderexception = require("../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let IndexMetadataService = class IndexMetadataService {
    async createOne({ createIndexInput, workspaceId }) {
        const { fields: fieldInputs } = createIndexInput;
        if (fieldInputs.length === 0) {
            throw new _indexfieldmetadataexception.IndexMetadataException('At least one field is required to create an index', _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_FIELDS_REQUIRED, {
                userFriendlyMessage: /*i18n*/ {
                    id: "TtfDdb",
                    message: "Pick at least one field for the index."
                }
            });
        }
        // Duplicate check considers (fieldMetadataId, subFieldName) pair so the
        // user CAN pick "Address > City" and "Address > Postcode" in the same
        // composite index, but not the exact same column twice.
        const dedupKeys = fieldInputs.map((input)=>`${input.fieldMetadataId}::${input.subFieldName ?? ''}`);
        if (new Set(dedupKeys).size !== dedupKeys.length) {
            throw new _indexfieldmetadataexception.IndexMetadataException('Duplicate field+sub-field in index field list', _indexfieldmetadataexception.IndexMetadataExceptionCode.DUPLICATE_INDEX_FIELDS, {
                userFriendlyMessage: /*i18n*/ {
                    id: "eaW27s",
                    message: "The same column cannot appear twice in an index."
                }
            });
        }
        const { flatObjectMetadataMaps: existingFlatObjectMetadataMaps, flatFieldMetadataMaps: existingFlatFieldMetadataMaps, flatIndexMaps: existingFlatIndexMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatObjectMetadataMaps',
                'flatFieldMetadataMaps',
                'flatIndexMaps'
            ]
        });
        const flatObjectMetadata = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityMaps: existingFlatObjectMetadataMaps,
            flatEntityId: createIndexInput.objectMetadataId
        });
        if (!(0, _utils.isDefined)(flatObjectMetadata)) {
            throw new _indexfieldmetadataexception.IndexMetadataException(`Object metadata ${createIndexInput.objectMetadataId} not found`, _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_OBJECT_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "P23sJE",
                    message: "Could not find the object for this index."
                }
            });
        }
        // Resolve each input to a flat field + validated subFieldName (or null
        // for scalar/relation parents).
        const resolvedInputs = fieldInputs.map((input)=>{
            const flatField = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
                flatEntityMaps: existingFlatFieldMetadataMaps,
                flatEntityId: input.fieldMetadataId
            });
            if (!(0, _utils.isDefined)(flatField) || flatField.objectMetadataId !== createIndexInput.objectMetadataId) {
                throw new _indexfieldmetadataexception.IndexMetadataException(`Field ${input.fieldMetadataId} not found on object ${createIndexInput.objectMetadataId}`, _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_FIELD_NOT_FOUND_ON_OBJECT, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "DWJeR1",
                        message: "One of the selected fields does not belong to this object."
                    }
                });
            }
            if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationFlatFieldMetadata)(flatField) && flatField.settings?.relationType !== _types.RelationType.MANY_TO_ONE) {
                throw new _indexfieldmetadataexception.IndexMetadataException(`Field ${flatField.name} is a non-MANY_TO_ONE relation and has no join column to index`, _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_NOT_SUPPORTED_FOR_MORH_RELATION_FIELD_AND_RELATION_FIELD, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "ZM94I5",
                        message: '"{0}" is a one-to-many relation and can\'t be indexed directly. Index the foreign-key side instead.',
                        values: {
                            0: flatField.label
                        }
                    }
                });
            }
            const isComposite = (0, _iscompositefieldmetadatatypeutil.isCompositeFieldMetadataType)(flatField.type);
            if (isComposite) {
                if (!(0, _guards.isNonEmptyString)(input.subFieldName)) {
                    throw new _indexfieldmetadataexception.IndexMetadataException(`Composite field ${flatField.name} requires a sub-field selection`, _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_NOT_SUPPORTED_FOR_COMPOSITE_FIELD, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "RrxR7k",
                            message: 'Pick a specific sub-field of "{0}" — composite fields can\'t be indexed as a whole.',
                            values: {
                                0: flatField.label
                            }
                        }
                    });
                }
                const compositeType = _types.compositeTypeDefinitions.get(flatField.type);
                const knownProperty = compositeType?.properties.find((property)=>property.name === input.subFieldName);
                if (!(0, _utils.isDefined)(knownProperty)) {
                    throw new _indexfieldmetadataexception.IndexMetadataException(`Unknown sub-field ${input.subFieldName} on composite field ${flatField.name}`, _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_NOT_SUPPORTED_FOR_COMPOSITE_FIELD, {
                        userFriendlyMessage: /*i18n*/ {
                            id: "6RLdgl",
                            message: '"{0}" is not a valid sub-field of "{1}".',
                            values: {
                                0: input.subFieldName,
                                1: flatField.label
                            }
                        }
                    });
                }
            } else if ((0, _guards.isNonEmptyString)(input.subFieldName)) {
                // Scalar / relation parent — sub-field doesn't apply.
                throw new _indexfieldmetadataexception.IndexMetadataException(`Field ${flatField.name} is not composite — subFieldName must not be set`, _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_NOT_SUPPORTED_FOR_COMPOSITE_FIELD, {
                    userFriendlyMessage: /*i18n*/ {
                        id: "bxSgKk",
                        message: '"{0}" is not a composite field — remove the sub-field selection.',
                        values: {
                            0: flatField.label
                        }
                    }
                });
            }
            return {
                flatField,
                subFieldName: isComposite ? input.subFieldName ?? null : null
            };
        });
        const objectFlatFieldMetadatas = resolvedInputs.map(({ flatField })=>flatField);
        (0, _validateindextypeagainstfieldsutil.validateIndexTypeAgainstFieldsOrThrow)({
            indexType: createIndexInput.indexType,
            fields: resolvedInputs.map(({ flatField, subFieldName })=>({
                    type: flatField.type,
                    name: flatField.name,
                    label: flatField.label,
                    subFieldName
                }))
        });
        (0, _validatenoduplicateuniqueindexutil.validateNoDuplicateUniqueIndexOrThrow)({
            proposed: {
                isUnique: false,
                fields: resolvedInputs.map(({ flatField, subFieldName })=>({
                        fieldMetadataId: flatField.id,
                        subFieldName
                    }))
            },
            existingFlatIndexMaps,
            objectMetadataId: createIndexInput.objectMetadataId
        });
        const existingCustomIndexCount = Object.values(existingFlatIndexMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((flatIndex)=>flatIndex.objectMetadataId === createIndexInput.objectMetadataId && flatIndex.isCustom).length;
        if (existingCustomIndexCount >= _constants.MAX_CUSTOM_INDEXES_PER_OBJECT) {
            throw new _indexfieldmetadataexception.IndexMetadataException(`Custom index limit of ${_constants.MAX_CUSTOM_INDEXES_PER_OBJECT} reached for object ${createIndexInput.objectMetadataId}`, _indexfieldmetadataexception.IndexMetadataExceptionCode.CUSTOM_INDEX_LIMIT_REACHED, {
                userFriendlyMessage: /*i18n*/ {
                    id: "TRUO3G",
                    message: "You can have at most {MAX_CUSTOM_INDEXES_PER_OBJECT} custom indexes per object. Delete one before creating a new one.",
                    values: {
                        MAX_CUSTOM_INDEXES_PER_OBJECT: _constants.MAX_CUSTOM_INDEXES_PER_OBJECT
                    }
                }
            });
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const indexMetadataUniversalIdentifier = (0, _uuid.v4)();
        const createdAt = new Date().toISOString();
        const universalFlatIndexMetadata = (0, _generateflatindexutil.generateFlatIndexMetadataWithNameOrThrow)({
            flatObjectMetadata,
            objectFlatFieldMetadatas,
            flatIndex: {
                createdAt,
                updatedAt: createdAt,
                indexType: createIndexInput.indexType,
                // WHERE clause is system-only — see CreateIndexInput for rationale.
                indexWhereClause: null,
                isCustom: true,
                isUnique: false,
                objectMetadataUniversalIdentifier: flatObjectMetadata.universalIdentifier,
                universalIdentifier: indexMetadataUniversalIdentifier,
                applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier,
                universalFlatIndexFieldMetadatas: resolvedInputs.map(({ flatField, subFieldName }, order)=>({
                        createdAt,
                        updatedAt: createdAt,
                        order,
                        subFieldName,
                        fieldMetadataUniversalIdentifier: flatField.universalIdentifier,
                        indexMetadataUniversalIdentifier
                    }))
            }
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                index: {
                    flatEntityToCreate: [
                        universalFlatIndexMetadata
                    ],
                    flatEntityToDelete: [],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Validation errors occurred while creating index');
        }
        const { flatIndexMaps: recomputedFlatIndexMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatIndexMaps'
            ]
        });
        const createdFlatIndexMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: indexMetadataUniversalIdentifier,
            flatEntityMaps: recomputedFlatIndexMaps
        });
        if (!(0, _utils.isDefined)(createdFlatIndexMetadata)) {
            throw new _indexfieldmetadataexception.IndexMetadataException(`Index ${indexMetadataUniversalIdentifier} was created but is missing from the recomputed cache`, _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_CREATION_FAILED);
        }
        return createdFlatIndexMetadata;
    }
    async deleteOne({ id, workspaceId }) {
        const { flatIndexMaps: existingFlatIndexMaps } = await this.flatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps({
            workspaceId,
            flatMapsKeys: [
                'flatIndexMaps'
            ]
        });
        const flatIndexToDelete = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
            flatEntityMaps: existingFlatIndexMaps,
            flatEntityId: id
        });
        // Map "no such index" to a domain-specific error so the GraphQL handler
        // can return a NotFoundError instead of leaking a FlatEntityMapsException.
        if (!(0, _utils.isDefined)(flatIndexToDelete)) {
            throw new _indexfieldmetadataexception.IndexMetadataException(`Index ${id} not found`, _indexfieldmetadataexception.IndexMetadataExceptionCode.INDEX_NOT_FOUND, {
                userFriendlyMessage: /*i18n*/ {
                    id: "7f5dRA",
                    message: "This index does not exist or has already been deleted."
                }
            });
        }
        // Protect system indexes — they back uniqueness constraints, FK lookups,
        // and search performance. Dropping one corrupts the data model.
        if (!flatIndexToDelete.isCustom) {
            throw new _indexfieldmetadataexception.IndexMetadataException(`Index ${id} is a system index and cannot be deleted`, _indexfieldmetadataexception.IndexMetadataExceptionCode.CANNOT_DELETE_SYSTEM_INDEX, {
                userFriendlyMessage: /*i18n*/ {
                    id: "aK2k19",
                    message: "System indexes are required for Twenty to work and cannot be deleted."
                }
            });
        }
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        const validateAndBuildResult = await this.workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration({
            allFlatEntityOperationByMetadataName: {
                index: {
                    flatEntityToCreate: [],
                    flatEntityToDelete: [
                        flatIndexToDelete
                    ],
                    flatEntityToUpdate: []
                }
            },
            workspaceId,
            applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
        });
        if (validateAndBuildResult.status === 'fail') {
            throw new _workspacemigrationbuilderexception.WorkspaceMigrationBuilderException(validateAndBuildResult, 'Validation errors occurred while deleting index');
        }
        return flatIndexToDelete;
    }
    constructor(flatEntityMapsCacheService, workspaceMigrationValidateBuildAndRunService, applicationService){
        this.flatEntityMapsCacheService = flatEntityMapsCacheService;
        this.workspaceMigrationValidateBuildAndRunService = workspaceMigrationValidateBuildAndRunService;
        this.applicationService = applicationService;
    }
};
IndexMetadataService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
        typeof _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService === "undefined" ? Object : _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService
    ])
], IndexMetadataService);

//# sourceMappingURL=index-metadata.service.js.map