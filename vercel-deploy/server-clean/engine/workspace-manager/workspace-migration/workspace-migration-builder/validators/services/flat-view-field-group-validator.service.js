"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatViewFieldGroupValidatorService", {
    enumerable: true,
    get: function() {
        return FlatViewFieldGroupValidatorService;
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
let FlatViewFieldGroupValidatorService = class FlatViewFieldGroupValidatorService {
    validateFlatViewFieldGroupCreation({ flatEntityToValidate: flatViewFieldGroupToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewFieldGroupMaps: optimisticFlatViewFieldGroupMaps, flatViewMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatViewFieldGroupToValidate.universalIdentifier,
                viewUniversalIdentifier: flatViewFieldGroupToValidate.viewUniversalIdentifier
            },
            metadataName: 'viewFieldGroup',
            type: 'create'
        });
        const existingFlatViewFieldGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewFieldGroupToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatViewFieldGroupMaps
        });
        if ((0, _utils.isDefined)(existingFlatViewFieldGroup)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "oKThPN",
                    message: "View field group with this universal identifier already exists"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "pkIuNd",
                    message: "View field group already exists"
                }
            });
        }
        const flatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatViewFieldGroupToValidate.viewUniversalIdentifier,
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
        }
        return validationResult;
    }
    validateFlatViewFieldGroupDeletion({ flatEntityToValidate: { universalIdentifier }, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewFieldGroupMaps: optimisticFlatViewFieldGroupMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'viewFieldGroup',
            type: 'delete'
        });
        const existingFlatViewFieldGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatViewFieldGroupMaps
        });
        if (!(0, _utils.isDefined)(existingFlatViewFieldGroup)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "uO9NF0",
                    message: "View field group to delete not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "uO9NF0",
                    message: "View field group to delete not found"
                }
            });
        }
        return validationResult;
    }
    validateFlatViewFieldGroupUpdate({ universalIdentifier, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatViewFieldGroupMaps: optimisticFlatViewFieldGroupMaps, flatViewMaps } }) {
        const existingFlatViewFieldGroup = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatViewFieldGroupMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'viewFieldGroup',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(existingFlatViewFieldGroup)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "KpmBDs",
                    message: "View field group to update not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "KpmBDs",
                    message: "View field group to update not found"
                }
            });
            return validationResult;
        }
        const flatView = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: existingFlatViewFieldGroup.viewUniversalIdentifier,
            flatEntityMaps: flatViewMaps
        });
        if (!(0, _utils.isDefined)(flatView)) {
            validationResult.errors.push({
                code: _viewexception.ViewExceptionCode.INVALID_VIEW_DATA,
                message: _core.i18n._(/*i18n*/ {
                    id: "rej7zQ",
                    message: "View field group parent view not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "rej7zQ",
                    message: "View field group parent view not found"
                }
            });
        }
        return validationResult;
    }
};
FlatViewFieldGroupValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatViewFieldGroupValidatorService);

//# sourceMappingURL=flat-view-field-group-validator.service.js.map