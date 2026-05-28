"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatIndexValidatorService", {
    enumerable: true,
    get: function() {
        return FlatIndexValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _flatentitymapsexception = require("../../../../../metadata-modules/flat-entity/exceptions/flat-entity-maps.exception");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _iscompositeflatfieldmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/is-composite-flat-field-metadata.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _indexexceptioncode = require("../../../../../metadata-modules/flat-index-metadata/exceptions/index-exception-code");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
const _iscompositefielddefaultvaluecompatiblewithuniqueindexutil = require("../../utils/is-composite-field-default-value-compatible-with-unique-index.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatIndexValidatorService = class FlatIndexValidatorService {
    validateFlatIndexDeletion({ optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatIndexMaps: optimisticFlatIndexMaps }, flatEntityToValidate: { universalIdentifier } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'index',
            type: 'delete'
        });
        const existingFlatIndexToDelete = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatIndexMaps
        });
        if (!(0, _utils.isDefined)(existingFlatIndexToDelete)) {
            validationResult.errors.push({
                code: _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "fY2zUQ",
                    message: "Index to delete not found"
                })
            });
        }
        return validationResult;
    }
    validateFlatIndexCreation({ flatEntityToValidate: flatIndexToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatIndexMaps: optimisticFlatIndexMaps, flatObjectMetadataMaps, flatFieldMetadataMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatIndexToValidate.universalIdentifier,
                name: flatIndexToValidate.name
            },
            metadataName: 'index',
            type: 'create'
        });
        const existingFlatIndex = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatIndexToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatIndexMaps
        });
        if ((0, _utils.isDefined)(existingFlatIndex)) {
            validationResult.errors.push({
                code: _indexexceptioncode.IndexExceptionCode.INDEX_ALREADY_EXISTS,
                message: _core.i18n._(/*i18n*/ {
                    id: "D6Tjt0",
                    message: "Index with same universal identifier already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "Kfy/ML",
                    message: "Index already exists"
                }
            });
        }
        const relatedObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatIndexToValidate.objectMetadataUniversalIdentifier,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(relatedObjectMetadata)) {
            validationResult.errors.push({
                code: _indexexceptioncode.IndexExceptionCode.INDEX_OBJECT_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "HVajHk",
                    message: "Could not find index related object metadata"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "Hl6cv2",
                    message: "Index related object not found"
                }
            });
        }
        const allExistingFlatIndex = Object.values(optimisticFlatIndexMaps.byUniversalIdentifier).filter(_utils.isDefined);
        const existingFlatIndexOnName = allExistingFlatIndex.find((flatIndexMetadata)=>flatIndexMetadata.name.toLocaleUpperCase() === flatIndexToValidate.name.toLocaleUpperCase());
        if ((0, _utils.isDefined)(existingFlatIndexOnName)) {
            validationResult.errors.push({
                code: _indexexceptioncode.IndexExceptionCode.INDEX_ALREADY_EXISTS,
                message: _core.i18n._(/*i18n*/ {
                    id: "a+k+8J",
                    message: "Index with same name already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "a+k+8J",
                    message: "Index with same name already exists"
                }
            });
        }
        if (flatIndexToValidate.universalFlatIndexFieldMetadatas.length === 0) {
            validationResult.errors.push({
                code: _indexexceptioncode.IndexExceptionCode.INDEX_EMPTY_FIELDS,
                message: _core.i18n._(/*i18n*/ {
                    id: "K1hWwv",
                    message: "Index must have at least one field"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "+MvnxO",
                    message: "An index must contain at least one field"
                }
            });
        } else {
            flatIndexToValidate.universalFlatIndexFieldMetadatas.forEach((universalFlatIndexField)=>{
                const relatedFlatField = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                    universalIdentifier: universalFlatIndexField.fieldMetadataUniversalIdentifier,
                    flatEntityMaps: flatFieldMetadataMaps
                });
                if (!(0, _utils.isDefined)(relatedFlatField)) {
                    validationResult.errors.push({
                        code: _indexexceptioncode.IndexExceptionCode.INDEX_FIELD_NOT_FOUND,
                        message: _core.i18n._(/*i18n*/ {
                            id: "jBrX/g",
                            message: "Could not find index field related field metadata"
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "S+y2Wg",
                            message: "Field referenced in index does not exist"
                        }
                    });
                } else {
                    if (relatedFlatField.objectMetadataUniversalIdentifier !== flatIndexToValidate.objectMetadataUniversalIdentifier) {
                        validationResult.errors.push({
                            code: _indexexceptioncode.IndexExceptionCode.INDEX_FIELD_WRONG_OBJECT,
                            message: _core.i18n._(/*i18n*/ {
                                id: "qelyBB",
                                message: "Field does not belong to the indexed object"
                            }),
                            userFriendlyMessage: /*i18n*/ {
                                id: "ugu505",
                                message: "Field cannot be indexed as it belongs to a different object"
                            }
                        });
                    }
                    if (flatIndexToValidate.isUnique) {
                        const compositeType = (0, _iscompositeflatfieldmetadatautil.isCompositeUniversalFlatFieldMetadata)(relatedFlatField) ? _types.compositeTypeDefinitions.get(relatedFlatField.type) : undefined;
                        const canUseDefaultValueInUniqueIndex = (0, _utils.isDefined)(compositeType) ? (0, _iscompositefielddefaultvaluecompatiblewithuniqueindexutil.isCompositeFieldDefaultValueCompatibleWithUniqueIndex)({
                            fieldType: relatedFlatField.type,
                            compositeProperties: compositeType.properties,
                            defaultValue: relatedFlatField.defaultValue
                        }) : !(0, _utils.isDefined)(relatedFlatField.defaultValue);
                        if (!canUseDefaultValueInUniqueIndex && relatedFlatField.isUnique) {
                            const fieldName = relatedFlatField.name;
                            const fieldType = relatedFlatField.type;
                            validationResult.errors.push({
                                code: _indexexceptioncode.IndexExceptionCode.INDEX_FIELD_INVALID_DEFAULT_VALUE,
                                message: _core.i18n._(/*i18n*/ {
                                    id: "WWSSTx",
                                    message: "Unique index cannot be created for field {fieldName} of type {fieldType}",
                                    values: {
                                        fieldName: fieldName,
                                        fieldType: fieldType
                                    }
                                }),
                                userFriendlyMessage: /*i18n*/ {
                                    id: "LeIJhm",
                                    message: "{fieldType} fields cannot have a default value.",
                                    values: {
                                        fieldType: fieldType
                                    }
                                }
                            });
                        }
                        const isCompositeFieldWithNonIncludedUniqueConstraint = (0, _iscompositeflatfieldmetadatautil.isCompositeUniversalFlatFieldMetadata)(relatedFlatField) && !compositeType?.properties.some((property)=>property.isIncludedInUniqueConstraint);
                        // MORPH_RELATION resolves to multiple join columns and can't
                        // satisfy a single-column UNIQUE constraint. RELATION is only
                        // accepted as MANY_TO_ONE: that side owns a single join column
                        // (UUID) which Postgres can uniquely index.
                        const isUnindexableRelation = (0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationUniversalFlatFieldMetadata)(relatedFlatField) && (relatedFlatField.type === _types.FieldMetadataType.MORPH_RELATION || relatedFlatField.universalSettings?.relationType !== _types.RelationType.MANY_TO_ONE);
                        if (isUnindexableRelation || isCompositeFieldWithNonIncludedUniqueConstraint) {
                            const fieldType = relatedFlatField.type;
                            const fieldName = relatedFlatField.name;
                            validationResult.errors.push({
                                code: _indexexceptioncode.IndexExceptionCode.INDEX_FIELD_INVALID_TYPE_FOR_UNIQUE,
                                message: _core.i18n._(/*i18n*/ {
                                    id: "WWSSTx",
                                    message: "Unique index cannot be created for field {fieldName} of type {fieldType}",
                                    values: {
                                        fieldName: fieldName,
                                        fieldType: fieldType
                                    }
                                }),
                                userFriendlyMessage: /*i18n*/ {
                                    id: "ZkHTHm",
                                    message: "{fieldType} fields cannot be unique.",
                                    values: {
                                        fieldType: fieldType
                                    }
                                }
                            });
                        }
                    }
                }
                if (universalFlatIndexField.indexMetadataUniversalIdentifier !== flatIndexToValidate.universalIdentifier) {
                    validationResult.errors.push({
                        code: _indexexceptioncode.IndexExceptionCode.INDEX_FIELD_INVALID_REFERENCE,
                        message: _core.i18n._(/*i18n*/ {
                            id: "ITue4V",
                            message: "Index field references incorrect index metadata"
                        }),
                        userFriendlyMessage: /*i18n*/ {
                            id: "EwXumf",
                            message: "Index field has an invalid reference"
                        }
                    });
                }
            });
        }
        return validationResult;
    }
};
FlatIndexValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatIndexValidatorService);

//# sourceMappingURL=flat-index-metadata-validator.service.js.map