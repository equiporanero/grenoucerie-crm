"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatViewGroupValidatorService", {
    enumerable: true,
    get: function() {
        return FlatViewGroupValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _viewexception = require("../../../../../metadata-modules/view/exceptions/view.exception");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FlatViewGroupValidatorService = class FlatViewGroupValidatorService {
    validateFlatViewGroupUpdate({ universalIdentifier, flatEntityUpdate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewGroupMaps: optimisticFlatViewGroupMaps, flatViewMaps } }) {
        const existingFlatViewGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatViewGroupMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'viewGroup',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingFlatViewGroup)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "UP/TXo",
                    message: "View group to update not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "UP/TXo",
                    message: "View group to update not found"
                }
            });
            return validationResult;
        }
        const updatedFlatViewGroup = {
            ...existingFlatViewGroup,
            ...flatEntityUpdate
        };
        if (!(0, _utils.isDefined)(updatedFlatViewGroup.fieldValue)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "M4sb1B",
                    message: "Field value is required"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "M4sb1B",
                    message: "Field value is required"
                }
            });
        }
        validationResult.flatEntityMinimalInformation = {
            ...validationResult.flatEntityMinimalInformation,
            viewUniversalIdentifier: updatedFlatViewGroup.viewUniversalIdentifier
        };
        const flatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: updatedFlatViewGroup.viewUniversalIdentifier,
            flatEntityMaps: flatViewMaps
        });
        if (!(0, _utils.isDefined)(flatView)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "P0grPG",
                    message: "View group to update parent view not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "P0grPG",
                    message: "View group to update parent view not found"
                }
            });
        }
        return validationResult;
    }
    validateFlatViewGroupDeletion({ flatEntityToValidate: { universalIdentifier }, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewGroupMaps: optimisticFlatViewGroupMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'viewGroup',
            type: 'delete'
        });
        const existingFlatViewGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatViewGroupMaps
        });
        if (!(0, _utils.isDefined)(existingFlatViewGroup)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "JdAvYa",
                    message: "View group to delete not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "JdAvYa",
                    message: "View group to delete not found"
                }
            });
        }
        return validationResult;
    }
    validateFlatViewGroupCreation({ flatEntityToValidate: flatViewGroupToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewGroupMaps: optimisticFlatViewGroupMaps, flatViewMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatViewGroupToValidate.universalIdentifier,
                viewUniversalIdentifier: flatViewGroupToValidate.viewUniversalIdentifier
            },
            metadataName: 'viewGroup',
            type: 'create'
        });
        const existingFlatViewGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewGroupToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatViewGroupMaps
        });
        if ((0, _utils.isDefined)(existingFlatViewGroup)) {
            const flatViewGroupUniversalIdentifier = flatViewGroupToValidate.universalIdentifier;
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "c1XRE3",
                    message: "View group metadata with universal identifier {flatViewGroupUniversalIdentifier} already exists",
                    values: {
                        flatViewGroupUniversalIdentifier: flatViewGroupUniversalIdentifier
                    }
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "MGbEFN",
                    message: "View group metadata already exists"
                }
            });
        }
        const flatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewGroupToValidate.viewUniversalIdentifier,
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
        if (!(0, _utils.isDefined)(flatViewGroupToValidate.fieldValue)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "M4sb1B",
                    message: "Field value is required"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "M4sb1B",
                    message: "Field value is required"
                }
            });
        }
        return validationResult;
    }
};
FlatViewGroupValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatViewGroupValidatorService);

//# sourceMappingURL=flat-view-group-validator.service.js.map