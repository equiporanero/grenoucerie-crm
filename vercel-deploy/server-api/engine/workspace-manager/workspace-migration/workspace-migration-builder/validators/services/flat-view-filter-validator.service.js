"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatViewFilterValidatorService", {
    enumerable: true,
    get: function() {
        return FlatViewFilterValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _viewfilterexception = require("../../../../../metadata-modules/view-filter/exceptions/view-filter.exception");
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
let FlatViewFilterValidatorService = class FlatViewFilterValidatorService {
    validateFlatViewFilterCreation({ flatEntityToValidate: flatViewFilterToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewFilterMaps: optimisticFlatViewFilterMaps, flatViewMaps, flatFieldMetadataMaps, flatViewFilterGroupMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatViewFilterToValidate.universalIdentifier
            },
            metadataName: 'viewFilter',
            type: 'create'
        });
        const existingViewFilter = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewFilterToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatViewFilterMaps
        });
        if ((0, _utils.isDefined)(existingViewFilter)) {
            validationResult.errors.push({
                code: _viewfilterexception.ViewFilterExceptionCode.INVALID_VIEW_FILTER_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "bM1MKh",
                    message: "View filter with this universal identifier already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "sbHaOg",
                    message: "View filter already exists"
                }
            });
        }
        const referencedView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewFilterToValidate.viewUniversalIdentifier,
            flatEntityMaps: flatViewMaps
        });
        if (!(0, _utils.isDefined)(referencedView)) {
            validationResult.errors.push({
                code: _viewfilterexception.ViewFilterExceptionCode.INVALID_VIEW_FILTER_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "F4A9mL",
                    message: "View not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "F4A9mL",
                    message: "View not found"
                }
            });
        }
        const referencedFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewFilterToValidate.fieldMetadataUniversalIdentifier,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(referencedFieldMetadata)) {
            validationResult.errors.push({
                code: _viewfilterexception.ViewFilterExceptionCode.INVALID_VIEW_FILTER_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "MPt365",
                    message: "Field metadata not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "MPt365",
                    message: "Field metadata not found"
                }
            });
        } else {
            let relationTargetFieldType;
            if ((0, _utils.isDefined)(flatViewFilterToValidate.relationTargetFieldMetadataUniversalIdentifier)) {
                const relationTargetFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                    universalIdentifier: flatViewFilterToValidate.relationTargetFieldMetadataUniversalIdentifier,
                    flatEntityMaps: flatFieldMetadataMaps
                });
                relationTargetFieldType = relationTargetFieldMetadata?.type;
            }
            const incompatibleOperandError = this.getIncompatibleOperandError({
                operand: flatViewFilterToValidate.operand,
                fieldType: referencedFieldMetadata.type,
                subFieldName: flatViewFilterToValidate.subFieldName,
                relationTargetFieldType
            });
            if ((0, _utils.isDefined)(incompatibleOperandError)) {
                validationResult.errors.push(incompatibleOperandError);
            }
        }
        if ((0, _utils.isDefined)(flatViewFilterToValidate.viewFilterGroupUniversalIdentifier)) {
            const referencedViewFilterGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: flatViewFilterToValidate.viewFilterGroupUniversalIdentifier,
                flatEntityMaps: flatViewFilterGroupMaps
            });
            if (!(0, _utils.isDefined)(referencedViewFilterGroup)) {
                validationResult.errors.push({
                    code: _viewfilterexception.ViewFilterExceptionCode.INVALID_VIEW_FILTER_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "eUPMYZ",
                        message: "View filter group not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "eUPMYZ",
                        message: "View filter group not found"
                    }
                });
            }
        }
        return validationResult;
    }
    validateFlatViewFilterDeletion({ flatEntityToValidate: flatViewFilterToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewFilterMaps: optimisticFlatViewFilterMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatViewFilterToValidate.universalIdentifier
            },
            metadataName: 'viewFilter',
            type: 'delete'
        });
        const existingViewFilter = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewFilterToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatViewFilterMaps
        });
        if (!(0, _utils.isDefined)(existingViewFilter)) {
            validationResult.errors.push({
                code: _viewfilterexception.ViewFilterExceptionCode.VIEW_FILTER_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "1KSqGE",
                    message: "View filter not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "1KSqGE",
                    message: "View filter not found"
                }
            });
            return validationResult;
        }
        return validationResult;
    }
    validateFlatViewFilterUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewFilterMaps: optimisticFlatViewFilterMaps, flatFieldMetadataMaps, flatViewFilterGroupMaps } }) {
        const existingViewFilter = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatViewFilterMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'viewFilter',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingViewFilter)) {
            validationResult.errors.push({
                code: _viewfilterexception.ViewFilterExceptionCode.VIEW_FILTER_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "1KSqGE",
                    message: "View filter not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "1KSqGE",
                    message: "View filter not found"
                }
            });
            return validationResult;
        }
        const updatedFlatViewFilter = {
            ...existingViewFilter,
            ...flatEntityUpdate
        };
        const referencedFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: updatedFlatViewFilter.fieldMetadataUniversalIdentifier,
            flatEntityMaps: flatFieldMetadataMaps
        });
        if (!(0, _utils.isDefined)(referencedFieldMetadata)) {
            validationResult.errors.push({
                code: _viewfilterexception.ViewFilterExceptionCode.INVALID_VIEW_FILTER_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "MPt365",
                    message: "Field metadata not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "MPt365",
                    message: "Field metadata not found"
                }
            });
        } else {
            let relationTargetFieldType;
            if ((0, _utils.isDefined)(updatedFlatViewFilter.relationTargetFieldMetadataUniversalIdentifier)) {
                const relationTargetFieldMetadata = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                    universalIdentifier: updatedFlatViewFilter.relationTargetFieldMetadataUniversalIdentifier,
                    flatEntityMaps: flatFieldMetadataMaps
                });
                relationTargetFieldType = relationTargetFieldMetadata?.type;
            }
            const incompatibleOperandError = this.getIncompatibleOperandError({
                operand: updatedFlatViewFilter.operand,
                fieldType: referencedFieldMetadata.type,
                subFieldName: updatedFlatViewFilter.subFieldName,
                relationTargetFieldType
            });
            if ((0, _utils.isDefined)(incompatibleOperandError)) {
                validationResult.errors.push(incompatibleOperandError);
            }
        }
        if ((0, _utils.isDefined)(updatedFlatViewFilter.viewFilterGroupUniversalIdentifier)) {
            const referencedViewFilterGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
                universalIdentifier: updatedFlatViewFilter.viewFilterGroupUniversalIdentifier,
                flatEntityMaps: flatViewFilterGroupMaps
            });
            if (!(0, _utils.isDefined)(referencedViewFilterGroup)) {
                validationResult.errors.push({
                    code: _viewfilterexception.ViewFilterExceptionCode.INVALID_VIEW_FILTER_DATA,
                    message: _core.i18n._(/*i18n*/ {
                        id: "eUPMYZ",
                        message: "View filter group not found"
                    }),
                    userFriendlyMessage: /*i18n*/ {
                        id: "eUPMYZ",
                        message: "View filter group not found"
                    }
                });
            }
        }
        return validationResult;
    }
    getIncompatibleOperandError({ operand, fieldType, subFieldName, relationTargetFieldType }) {
        const effectiveFieldType = fieldType === _types.FieldMetadataType.RELATION && (0, _utils.isDefined)(relationTargetFieldType) ? relationTargetFieldType : fieldType;
        if (!(effectiveFieldType in _utils.FILTER_OPERANDS_MAP)) {
            return undefined;
        }
        const allowedOperands = (0, _utils.getFilterOperandsForFilterableFieldType)({
            filterType: effectiveFieldType,
            subFieldName
        });
        if (allowedOperands.includes(operand)) {
            return undefined;
        }
        return {
            code: _viewfilterexception.ViewFilterExceptionCode.INVALID_VIEW_FILTER_DATA,
            message: _core.i18n._(/*i18n*/ {
                id: "vX5t8O",
                message: 'Operand "{operand}" is not supported on field type "{effectiveFieldType}". Supported operands: {0}.',
                values: {
                    operand: operand,
                    effectiveFieldType: effectiveFieldType,
                    0: allowedOperands.join(', ')
                }
            }),
            userFriendlyMessage: /*i18n*/ {
                id: "MkIaen",
                message: "Filter operand is not supported for this field type"
            }
        };
    }
    constructor(){}
};
FlatViewFilterValidatorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], FlatViewFilterValidatorService);

//# sourceMappingURL=flat-view-filter-validator.service.js.map