"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatViewFieldValidatorService", {
    enumerable: true,
    get: function() {
        return FlatViewFieldValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil = require("../../../../../metadata-modules/flat-entity/utils/find-many-flat-entity-by-universal-identifier-in-universal-flat-entity-maps-or-throw.util");
const _isviewfieldinlowestpositionutil = require("../../../../../metadata-modules/flat-view-field/utils/is-view-field-in-lowest-position.util");
const _viewexception = require("../../../../../metadata-modules/view/exceptions/view.exception");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
const _validatelabelidentifierfieldmetadataidflatviewfieldutil = require("../utils/validate-label-identifier-field-metadata-id-flat-view-field.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FlatViewFieldValidatorService = class FlatViewFieldValidatorService {
    validateFlatViewFieldUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewFieldMaps: optimisticFlatViewFieldMaps, flatViewMaps, flatObjectMetadataMaps } }) {
        const existingFlatViewField = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatViewFieldMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'viewField',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingFlatViewField)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "Fpy/K1",
                    message: "View field to update not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "Fpy/K1",
                    message: "View field to update not found"
                }
            });
            return validationResult;
        }
        const updatedFlatViewField = {
            ...existingFlatViewField,
            ...flatEntityUpdate
        };
        validationResult.flatEntityMinimalInformation = {
            ...validationResult.flatEntityMinimalInformation,
            viewUniversalIdentifier: updatedFlatViewField.viewUniversalIdentifier,
            fieldMetadataUniversalIdentifier: updatedFlatViewField.fieldMetadataUniversalIdentifier
        };
        const flatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: updatedFlatViewField.viewUniversalIdentifier,
            flatEntityMaps: flatViewMaps
        });
        if (!(0, _utils.isDefined)(flatView)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "AprfQL",
                    message: "View field to update parent view not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "AprfQL",
                    message: "View field to update parent view not found"
                }
            });
            return validationResult;
        }
        const flatObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatView.objectMetadataUniversalIdentifier,
            flatEntityMaps: flatObjectMetadataMaps
        });
        if (!(0, _utils.isDefined)(flatObjectMetadata)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "sqzMKR",
                    message: "View field to update parent view object not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "sqzMKR",
                    message: "View field to update parent view object not found"
                }
            });
            return validationResult;
        }
        if (flatView.type !== _types.ViewType.FIELDS_WIDGET && flatObjectMetadata.labelIdentifierFieldMetadataUniversalIdentifier === updatedFlatViewField.fieldMetadataUniversalIdentifier) {
            const otherFlatViewFields = (0, _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil.findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMapsOrThrow)({
                universalIdentifiers: flatView.viewFieldUniversalIdentifiers.filter((viewFieldUniversalIdentifier)=>viewFieldUniversalIdentifier !== updatedFlatViewField.universalIdentifier),
                flatEntityMaps: optimisticFlatViewFieldMaps
            });
            validationResult.errors.push(...(0, _validatelabelidentifierfieldmetadataidflatviewfieldutil.validateLabelIdentifierFieldMetadataIdFlatViewField)({
                otherFlatViewFields,
                flatViewFieldToValidate: updatedFlatViewField
            }));
        }
        return validationResult;
    }
    validateFlatViewFieldDeletion({ flatEntityToValidate: { universalIdentifier }, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewFieldMaps: optimisticFlatViewFieldMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'viewField',
            type: 'delete'
        });
        const existingFlatViewField = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatViewFieldMaps
        });
        if (!(0, _utils.isDefined)(existingFlatViewField)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "XJlyZS",
                    message: "View field to delete not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "XJlyZS",
                    message: "View field to delete not found"
                }
            });
            return validationResult;
        }
        return validationResult;
    }
    validateFlatViewFieldCreation({ flatEntityToValidate: flatViewFieldToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewFieldMaps: optimisticFlatViewFieldMaps, flatFieldMetadataMaps, flatViewMaps, flatObjectMetadataMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatViewFieldToValidate.universalIdentifier,
                viewUniversalIdentifier: flatViewFieldToValidate.viewUniversalIdentifier,
                fieldMetadataUniversalIdentifier: flatViewFieldToValidate.fieldMetadataUniversalIdentifier
            },
            metadataName: 'viewField',
            type: 'create'
        });
        const existingFlatViewField = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewFieldToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatViewFieldMaps
        });
        if ((0, _utils.isDefined)(existingFlatViewField)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "mdX5P2",
                    message: "View field metadata with this universal identifier already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "7jUWQ+",
                    message: "View field metadata already exists"
                }
            });
        }
        const flatFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewFieldToValidate.fieldMetadataUniversalIdentifier,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(flatFieldMetadata)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "MPt365",
                    message: "Field metadata not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "MPt365",
                    message: "Field metadata not found"
                }
            });
        }
        const flatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewFieldToValidate.viewUniversalIdentifier,
            flatEntityMaps: flatViewMaps
        });
        if (!(0, _utils.isDefined)(flatView)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "F4A9mL",
                    message: "View not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "F4A9mL",
                    message: "View not found"
                }
            });
            return validationResult;
        }
        const otherFlatViewFields = (0, _findmanyflatentitybyuniversalidentifierinuniversalflatentitymapsorthrowutil.findManyFlatEntityByUniversalIdentifierInUniversalFlatEntityMapsOrThrow)({
            universalIdentifiers: flatView.viewFieldUniversalIdentifiers,
            flatEntityMaps: optimisticFlatViewFieldMaps
        });
        const equivalentExistingFlatViewFieldExists = otherFlatViewFields.some((flatViewField)=>flatViewField.viewUniversalIdentifier === flatViewFieldToValidate.viewUniversalIdentifier && flatViewField.fieldMetadataUniversalIdentifier === flatViewFieldToValidate.fieldMetadataUniversalIdentifier);
        if (equivalentExistingFlatViewFieldExists) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "Zqbr+6",
                    message: "View field with same fieldMetadataUniversalIdentifier and viewUniversalIdentifier already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "pTvQqf",
                    message: "View field already exists"
                }
            });
        }
        const flatObjectMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            flatEntityMaps: flatObjectMetadataMaps,
            universalIdentifier: flatView.objectMetadataUniversalIdentifier
        });
        if (!(0, _utils.isDefined)(flatObjectMetadata)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "WZzm3R",
                    message: "View field related view object metadata not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "WZzm3R",
                    message: "View field related view object metadata not found"
                }
            });
            return validationResult;
        }
        if (flatView.type !== _types.ViewType.FIELDS_WIDGET && flatObjectMetadata.labelIdentifierFieldMetadataUniversalIdentifier === flatViewFieldToValidate.fieldMetadataUniversalIdentifier) {
            validationResult.errors.push(...(0, _validatelabelidentifierfieldmetadataidflatviewfieldutil.validateLabelIdentifierFieldMetadataIdFlatViewField)({
                flatViewFieldToValidate,
                otherFlatViewFields
            }));
        } else if (flatView.type !== _types.ViewType.FIELDS_WIDGET && otherFlatViewFields.some((flatViewField)=>flatViewField.fieldMetadataUniversalIdentifier === flatObjectMetadata.labelIdentifierFieldMetadataUniversalIdentifier) && (0, _isviewfieldinlowestpositionutil.isViewFieldInLowestPosition)({
            flatViewField: flatViewFieldToValidate,
            otherFlatViewFields
        })) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "7LMaUn",
                    message: "View field position cannot be lower than label identifier view field position"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "7LMaUn",
                    message: "View field position cannot be lower than label identifier view field position"
                }
            });
        }
        return validationResult;
    }
    constructor(){}
};
FlatViewFieldValidatorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], FlatViewFieldValidatorService);

//# sourceMappingURL=flat-view-field-validator.service.js.map