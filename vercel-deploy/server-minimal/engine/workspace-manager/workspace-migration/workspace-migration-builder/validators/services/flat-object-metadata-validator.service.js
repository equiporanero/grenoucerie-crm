"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatObjectMetadataValidatorService", {
    enumerable: true,
    get: function() {
        return FlatObjectMetadataValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _validateflatobjectmetadatanameandlabelsutil = require("../../../../../metadata-modules/flat-object-metadata/validators/utils/validate-flat-object-metadata-name-and-labels.util");
const _objectmetadataexception = require("../../../../../metadata-modules/object-metadata/object-metadata.exception");
const _belongstotwentystandardapputil = require("../../../../../metadata-modules/utils/belongs-to-twenty-standard-app.util");
const _iscallertwentystandardapputil = require("../../../../../metadata-modules/utils/is-caller-twenty-standard-app.util");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatObjectMetadataValidatorService = class FlatObjectMetadataValidatorService {
    validateFlatObjectMetadataUpdate({ universalIdentifier, flatEntityUpdate, buildOptions, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatObjectMetadataMaps: optimisticFlatObjectMetadataMaps } }) {
        const existingFlatObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatObjectMetadataMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'objectMetadata',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingFlatObjectMetadata)) {
            validationResult.errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "pQ5dZU",
                    message: "Object to update not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "pQ5dZU",
                    message: "Object to update not found"
                }
            });
            return validationResult;
        }
        const updatedFlatObjectMetadata = {
            ...existingFlatObjectMetadata,
            ...flatEntityUpdate
        };
        validationResult.flatEntityMinimalInformation = {
            ...validationResult.flatEntityMinimalInformation,
            namePlural: existingFlatObjectMetadata.namePlural,
            nameSingular: existingFlatObjectMetadata.nameSingular
        };
        if (!buildOptions.isSystemBuild && existingFlatObjectMetadata.isSystem) {
            const allowedOverrideKeys = new Set([
                'standardOverrides',
                'isActive'
            ]);
            const disallowedProperties = Object.keys(flatEntityUpdate).filter((property)=>!allowedOverrideKeys.has(property));
            if (disallowedProperties.length > 0) {
                validationResult.errors.push({
                    code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                    message: _core.i18n._(/*i18n*/ {
                        id: "aF4zgq",
                        message: "System objects cannot be updated directly. Use standardOverrides for cosmetic changes."
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "sndTPB",
                        message: "System objects cannot be updated"
                    }
                });
            }
        }
        validationResult.errors.push(...(0, _validateflatobjectmetadatanameandlabelsutil.validateFlatObjectMetadataNameAndLabels)({
            optimisticUniversalFlatObjectMetadataMaps: optimisticFlatObjectMetadataMaps,
            universalFlatObjectMetadataToValidate: updatedFlatObjectMetadata,
            buildOptions
        }));
        // TODO remove this once we migrated labelIdentifierFieldMetadataId as non nullable
        if (flatEntityUpdate.labelIdentifierFieldMetadataUniversalIdentifier !== undefined) {
            if (flatEntityUpdate.labelIdentifierFieldMetadataUniversalIdentifier === null) {
                validationResult.errors.push({
                    code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                    message: 'labelIdentifierFieldMetadataId cannot be null',
                    userFriendlyMessage: /*i18n*/ {
                        id: "AgbRjM",
                        message: "Field label identifier is required"
                    }
                });
            }
        }
        return validationResult;
    }
    validateFlatObjectMetadataDeletion({ flatEntityToValidate: { universalIdentifier }, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatObjectMetadataMaps: optimisticFlatObjectMetadataMaps }, buildOptions }) {
        const flatObjectMetadataToDelete = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatObjectMetadataMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'objectMetadata',
            type: 'delete'
        });
        if (!(0, _utils.isDefined)(flatObjectMetadataToDelete)) {
            validationResult.errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.OBJECT_METADATA_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "bMeJkW",
                    message: "Object to delete not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "bMeJkW",
                    message: "Object to delete not found"
                }
            });
        } else {
            validationResult.flatEntityMinimalInformation = {
                ...validationResult.flatEntityMinimalInformation,
                namePlural: flatObjectMetadataToDelete.namePlural,
                nameSingular: flatObjectMetadataToDelete.nameSingular
            };
            if (flatObjectMetadataToDelete.isRemote) {
                validationResult.errors.push({
                    code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                    message: _core.i18n._(/*i18n*/ {
                        id: "yVxtzR",
                        message: "Remote objects are not supported yet"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "yVxtzR",
                        message: "Remote objects are not supported yet"
                    }
                });
            }
            if (!buildOptions.isSystemBuild && flatObjectMetadataToDelete.isSystem) {
                validationResult.errors.push({
                    code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                    message: _core.i18n._(/*i18n*/ {
                        id: "/ojawH",
                        message: "System objects cannot be deleted"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "/ojawH",
                        message: "System objects cannot be deleted"
                    }
                });
            }
            if (!(0, _iscallertwentystandardapputil.isCallerTwentyStandardApp)(buildOptions) && (0, _belongstotwentystandardapputil.belongsToTwentyStandardApp)(flatObjectMetadataToDelete)) {
                validationResult.errors.push({
                    code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                    message: _core.i18n._(/*i18n*/ {
                        id: "Ptv+nG",
                        message: "Standard objects cannot be deleted"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "Ptv+nG",
                        message: "Standard objects cannot be deleted"
                    }
                });
            }
        }
        return validationResult;
    }
    validateFlatObjectMetadataCreation({ flatEntityToValidate: flatObjectMetadataToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatObjectMetadataMaps: optimisticUniversalFlatObjectMetadataMaps }, buildOptions }) {
        const objectValidationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatObjectMetadataToValidate.universalIdentifier,
                namePlural: flatObjectMetadataToValidate.namePlural,
                nameSingular: flatObjectMetadataToValidate.nameSingular
            },
            metadataName: 'objectMetadata',
            type: 'create'
        });
        if ((0, _utils.isDefined)((0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatObjectMetadataToValidate.universalIdentifier,
            flatEntityMaps: optimisticUniversalFlatObjectMetadataMaps
        }))) {
            objectValidationResult.errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "KFbNbH",
                    message: "Object with same universal identifier already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "KFbNbH",
                    message: "Object with same universal identifier already exists"
                }
            });
        }
        if (flatObjectMetadataToValidate.isRemote) {
            objectValidationResult.errors.push({
                code: _objectmetadataexception.ObjectMetadataExceptionCode.INVALID_OBJECT_INPUT,
                message: _core.i18n._(/*i18n*/ {
                    id: "yVxtzR",
                    message: "Remote objects are not supported yet"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "yVxtzR",
                    message: "Remote objects are not supported yet"
                }
            });
        }
        objectValidationResult.errors.push(...(0, _validateflatobjectmetadatanameandlabelsutil.validateFlatObjectMetadataNameAndLabels)({
            optimisticUniversalFlatObjectMetadataMaps,
            universalFlatObjectMetadataToValidate: flatObjectMetadataToValidate,
            buildOptions
        }));
        return objectValidationResult;
    }
};
FlatObjectMetadataValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatObjectMetadataValidatorService);

//# sourceMappingURL=flat-object-metadata-validator.service.js.map