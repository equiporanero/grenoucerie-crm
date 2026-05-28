"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatFieldMetadataValidatorService", {
    enumerable: true,
    get: function() {
        return FlatFieldMetadataValidatorService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _fieldmetadataexception = require("../../../../../metadata-modules/field-metadata/field-metadata.exception");
const _createemptyflatentitymapsconstant = require("../../../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _flatfieldmetadatarelationpropertiestocompareconstant = require("../../../../../metadata-modules/flat-field-metadata/constants/flat-field-metadata-relation-properties-to-compare.constant");
const _flatfieldmetadatatypevalidatorservice = require("../../../../../metadata-modules/flat-field-metadata/services/flat-field-metadata-type-validator.service");
const _isflatfieldmetadatanamesyncedwithlabelutil = require("../../../../../metadata-modules/flat-field-metadata/utils/is-flat-field-metadata-name-synced-with-label.util");
const _ismorphorrelationflatfieldmetadatautil = require("../../../../../metadata-modules/flat-field-metadata/utils/is-morph-or-relation-flat-field-metadata.util");
const _validateflatfieldmetadatanameavailabilityutil = require("../../../../../metadata-modules/flat-field-metadata/validators/utils/validate-flat-field-metadata-name-availability.util");
const _validateflatfieldmetadatanameutil = require("../../../../../metadata-modules/flat-field-metadata/validators/utils/validate-flat-field-metadata-name.util");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FlatFieldMetadataValidatorService = class FlatFieldMetadataValidatorService {
    validateFlatFieldMetadataUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatFieldMetadataMaps: optimisticFlatFieldMetadataMaps, flatObjectMetadataMaps }, workspaceId, buildOptions, additionalCacheDataMaps }) {
        const existingFlatFieldMetadataToUpdate = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatFieldMetadataMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'fieldMetadata',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingFlatFieldMetadataToUpdate)) {
            validationResult.errors.push({
                code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_NOT_FOUND,
                message: 'field metadata to update not found',
                userFriendlyMessage: /*i18n*/ {
                    id: "K6qzz4",
                    message: "Field to update not found"
                }
            });
            return validationResult;
        }
        const flatFieldMetadataToValidate = {
            ...existingFlatFieldMetadataToUpdate,
            ...flatEntityUpdate
        };
        validationResult.flatEntityMinimalInformation = {
            ...validationResult.flatEntityMinimalInformation,
            name: flatFieldMetadataToValidate.name,
            objectMetadataUniversalIdentifier: flatFieldMetadataToValidate.objectMetadataUniversalIdentifier
        };
        const SYSTEM_FIELD_ALLOWED_UPDATE_PROPERTIES = [
            'universalSettings',
            'isActive'
        ];
        if (!buildOptions.isSystemBuild && existingFlatFieldMetadataToUpdate.isSystem) {
            const disallowedProperties = Object.keys(flatEntityUpdate).filter((property)=>!SYSTEM_FIELD_ALLOWED_UPDATE_PROPERTIES.includes(property));
            if (disallowedProperties.length > 0) {
                validationResult.errors.push({
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_MUTATION_NOT_ALLOWED,
                    message: `System fields only allow updating: ${SYSTEM_FIELD_ALLOWED_UPDATE_PROPERTIES.join(', ')}. Forbidden properties: ${disallowedProperties.join(', ')}`,
                    userFriendlyMessage: /*i18n*/ {
                        id: "oEsYJM",
                        message: "System fields cannot be updated"
                    }
                });
            }
        }
        const flatObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatFieldMetadataToValidate.objectMetadataUniversalIdentifier,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(flatObjectMetadata)) {
            validationResult.errors.push({
                code: _fieldmetadataexception.FieldMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND,
                message: 'field metadata to update object metadata not found',
                userFriendlyMessage: /*i18n*/ {
                    id: "E8vJ0A",
                    message: "Object related to field to update not found"
                }
            });
            return validationResult;
        }
        if (!(0, _utils.isDefined)(flatObjectMetadata.labelIdentifierFieldMetadataUniversalIdentifier)) {
            validationResult.errors.push({
                code: _fieldmetadataexception.FieldMetadataExceptionCode.LABEL_IDENTIFIER_FIELD_METADATA_ID_NOT_FOUND,
                message: 'Label identifier field metadata id does not exist',
                userFriendlyMessage: /*i18n*/ {
                    id: "MnOwTp",
                    message: "Object related to updated field does not have a label identifier"
                }
            });
        } else if (flatObjectMetadata.labelIdentifierFieldMetadataUniversalIdentifier === flatFieldMetadataToValidate.universalIdentifier && (0, _utils.isDefined)(flatEntityUpdate.isActive) && flatFieldMetadataToValidate.isActive === false) {
            validationResult.errors.push({
                code: _fieldmetadataexception.FieldMetadataExceptionCode.LABEL_IDENTIFIER_FIELD_METADATA_ID_NOT_FOUND,
                message: 'Label identifier field metadata cannot be deactivated',
                userFriendlyMessage: /*i18n*/ {
                    id: "ljUvzm",
                    message: "Label identifier field cannot be deactivated"
                }
            });
        }
        // Should be moved in relation field validator
        if ((0, _ismorphorrelationflatfieldmetadatautil.isMorphOrRelationUniversalFlatFieldMetadata)(flatFieldMetadataToValidate)) {
            const updatedProperties = Object.keys(flatEntityUpdate);
            const relationNonEditableUpdatedProperties = updatedProperties.filter((property)=>!_flatfieldmetadatarelationpropertiestocompareconstant.FLAT_FIELD_METADATA_RELATION_PROPERTIES_TO_COMPARE.includes(property));
            if (relationNonEditableUpdatedProperties.length > 0) {
                validationResult.errors.push({
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_MUTATION_NOT_ALLOWED,
                    message: `Forbidden updated properties for relation field metadata: ${relationNonEditableUpdatedProperties.join(', ')}`,
                    userFriendlyMessage: /*i18n*/ {
                        id: "eWmJYU",
                        message: "Forbidden updated properties for relation field metadata"
                    }
                });
            }
        }
        ///
        if ((0, _utils.isDefined)(flatEntityUpdate.name)) {
            validationResult.errors.push(...(0, _validateflatfieldmetadatanameutil.validateFlatFieldMetadataName)({
                name: flatFieldMetadataToValidate.name,
                buildOptions
            }), ...(0, _validateflatfieldmetadatanameavailabilityutil.validateFlatFieldMetadataNameAvailability)({
                name: flatFieldMetadataToValidate.name,
                universalFlatFieldMetadataMaps: optimisticFlatFieldMetadataMaps,
                universalFlatObjectMetadata: flatObjectMetadata,
                buildOptions
            }));
        }
        if (flatFieldMetadataToValidate.isLabelSyncedWithName && !(0, _isflatfieldmetadatanamesyncedwithlabelutil.isFlatFieldMetadataNameSyncedWithLabel)({
            flatFieldMetadata: flatFieldMetadataToValidate,
            buildOptions
        })) {
            validationResult.errors.push({
                code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_MUTATION_NOT_ALLOWED,
                message: `Name is not synced with label.`,
                userFriendlyMessage: /*i18n*/ {
                    id: "r5C2wB",
                    message: "Updated field name is not synced with label"
                }
            });
        }
        if (flatFieldMetadataToValidate.isNullable === false && flatFieldMetadataToValidate.defaultValue === null) {
            validationResult.errors.push({
                code: _fieldmetadataexception.FieldMetadataExceptionCode.INVALID_FIELD_INPUT,
                message: 'Default value cannot be null for non-nullable fields',
                userFriendlyMessage: /*i18n*/ {
                    id: "XeWfi3",
                    message: "Default value cannot be null."
                }
            });
        }
        const fieldMetadataTypeValidationErrors = this.flatFieldMetadataTypeValidatorService.validateFlatFieldMetadataTypeSpecificities({
            update: flatEntityUpdate,
            optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                flatFieldMetadataMaps: optimisticFlatFieldMetadataMaps,
                flatObjectMetadataMaps
            },
            flatEntityToValidate: flatFieldMetadataToValidate,
            buildOptions,
            remainingFlatEntityMapsToValidate: (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)(),
            workspaceId,
            additionalCacheDataMaps
        });
        if (fieldMetadataTypeValidationErrors.length > 0) {
            validationResult.errors.push(...fieldMetadataTypeValidationErrors);
        }
        return validationResult;
    }
    validateFlatFieldMetadataDeletion({ flatEntityToValidate: { universalIdentifier }, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatFieldMetadataMaps: optimisticFlatFieldMetadataMaps, flatObjectMetadataMaps }, buildOptions }) {
        const flatFieldMetadataToDelete = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatFieldMetadataMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'fieldMetadata',
            type: 'delete'
        });
        if (!(0, _utils.isDefined)(flatFieldMetadataToDelete)) {
            validationResult.errors.push({
                code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_METADATA_NOT_FOUND,
                message: 'Field metadata to delete not found',
                userFriendlyMessage: /*i18n*/ {
                    id: "uTPwH1",
                    message: "Field metadata to delete not found"
                }
            });
            return validationResult;
        }
        validationResult.flatEntityMinimalInformation = {
            ...validationResult.flatEntityMinimalInformation,
            name: flatFieldMetadataToDelete.name,
            objectMetadataUniversalIdentifier: flatFieldMetadataToDelete.objectMetadataUniversalIdentifier
        };
        const relatedFlatObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatFieldMetadataToDelete.objectMetadataUniversalIdentifier,
            flatEntityMaps: flatObjectMetadataMaps
        });
        const parentObjectMetadataHasBeenDeleted = !(0, _utils.isDefined)(relatedFlatObjectMetadata);
        if (!buildOptions.isSystemBuild && flatFieldMetadataToDelete.isSystem && !parentObjectMetadataHasBeenDeleted) {
            validationResult.errors.push({
                code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_MUTATION_NOT_ALLOWED,
                message: 'System fields cannot be deleted',
                userFriendlyMessage: /*i18n*/ {
                    id: "q1oDDx",
                    message: "System fields cannot be deleted"
                }
            });
        }
        if ((0, _utils.isDefined)(relatedFlatObjectMetadata) && relatedFlatObjectMetadata.labelIdentifierFieldMetadataUniversalIdentifier === flatFieldMetadataToDelete.universalIdentifier) {
            validationResult.errors.push({
                code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_MUTATION_NOT_ALLOWED,
                message: 'Cannot delete, please update the label identifier field first',
                userFriendlyMessage: /*i18n*/ {
                    id: "AQyr9X",
                    message: "Cannot delete, please update the label identifier field first"
                }
            });
        }
        return validationResult;
    }
    validateFlatFieldMetadataCreation({ flatEntityToValidate: flatFieldMetadataToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatFieldMetadataMaps: optimisticFlatFieldMetadataMaps, flatObjectMetadataMaps }, workspaceId, buildOptions, remainingFlatEntityMapsToValidate, additionalCacheDataMaps }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatFieldMetadataToValidate.universalIdentifier,
                name: flatFieldMetadataToValidate.name,
                objectMetadataUniversalIdentifier: flatFieldMetadataToValidate.objectMetadataUniversalIdentifier
            },
            metadataName: 'fieldMetadata',
            type: 'create'
        });
        const parentFlatObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatFieldMetadataToValidate.objectMetadataUniversalIdentifier,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(parentFlatObjectMetadata)) {
            validationResult.errors.push({
                code: _fieldmetadataexception.FieldMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND,
                message: 'Object metadata not found',
                userFriendlyMessage: /*i18n*/ {
                    id: "cK8ILP",
                    message: "Field to create related object not found"
                }
            });
        } else {
            if ((0, _utils.isDefined)((0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: flatFieldMetadataToValidate.universalIdentifier,
                flatEntityMaps: optimisticFlatFieldMetadataMaps
            }))) {
                validationResult.errors.push({
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_ALREADY_EXISTS,
                    message: 'Field with same universal identifier already exists in object',
                    userFriendlyMessage: /*i18n*/ {
                        id: "vngnhF",
                        message: "Field already exists"
                    }
                });
            }
            if (parentFlatObjectMetadata.isRemote === true) {
                validationResult.errors.push({
                    code: _fieldmetadataexception.FieldMetadataExceptionCode.FIELD_MUTATION_NOT_ALLOWED,
                    message: 'Remote objects are read-only',
                    userFriendlyMessage: /*i18n*/ {
                        id: "PWdFkY",
                        message: "Remote objects are not production ready yet"
                    }
                });
            }
            validationResult.errors.push(...(0, _validateflatfieldmetadatanameavailabilityutil.validateFlatFieldMetadataNameAvailability)({
                name: flatFieldMetadataToValidate.name,
                universalFlatFieldMetadataMaps: optimisticFlatFieldMetadataMaps,
                universalFlatObjectMetadata: parentFlatObjectMetadata,
                buildOptions
            }));
        }
        if (flatFieldMetadataToValidate.isLabelSyncedWithName && !(0, _isflatfieldmetadatanamesyncedwithlabelutil.isFlatFieldMetadataNameSyncedWithLabel)({
            flatFieldMetadata: flatFieldMetadataToValidate,
            buildOptions
        })) {
            validationResult.errors.push({
                code: _fieldmetadataexception.FieldMetadataExceptionCode.NAME_NOT_SYNCED_WITH_LABEL,
                message: `Name is not synced with label`,
                userFriendlyMessage: /*i18n*/ {
                    id: "prTOhK",
                    message: "Field name is not synced with field label"
                },
                value: flatFieldMetadataToValidate.label
            });
        }
        validationResult.errors.push(...(0, _validateflatfieldmetadatanameutil.validateFlatFieldMetadataName)({
            name: flatFieldMetadataToValidate.name,
            buildOptions
        }));
        validationResult.errors.push(...this.flatFieldMetadataTypeValidatorService.validateFlatFieldMetadataTypeSpecificities({
            optimisticFlatEntityMapsAndRelatedFlatEntityMaps: {
                flatFieldMetadataMaps: optimisticFlatFieldMetadataMaps,
                flatObjectMetadataMaps
            },
            flatEntityToValidate: flatFieldMetadataToValidate,
            buildOptions,
            workspaceId,
            remainingFlatEntityMapsToValidate,
            additionalCacheDataMaps
        }));
        return validationResult;
    }
    constructor(flatFieldMetadataTypeValidatorService){
        this.flatFieldMetadataTypeValidatorService = flatFieldMetadataTypeValidatorService;
    }
};
FlatFieldMetadataValidatorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _flatfieldmetadatatypevalidatorservice.FlatFieldMetadataTypeValidatorService === "undefined" ? Object : _flatfieldmetadatatypevalidatorservice.FlatFieldMetadataTypeValidatorService
    ])
], FlatFieldMetadataValidatorService);

//# sourceMappingURL=flat-field-metadata-validator.service.js.map