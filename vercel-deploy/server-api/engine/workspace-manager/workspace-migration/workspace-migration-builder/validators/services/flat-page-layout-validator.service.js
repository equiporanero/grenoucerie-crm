"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatPageLayoutValidatorService", {
    enumerable: true,
    get: function() {
        return FlatPageLayoutValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const PAGE_LAYOUT_EXCEPTION_CODE = {
    PAGE_LAYOUT_NOT_FOUND: 'PAGE_LAYOUT_NOT_FOUND'
};
let FlatPageLayoutValidatorService = class FlatPageLayoutValidatorService {
    validateFlatPageLayoutCreation({ flatEntityToValidate: flatPageLayout }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatPageLayout.universalIdentifier,
                name: flatPageLayout.name
            },
            metadataName: 'pageLayout',
            type: 'create'
        });
        return validationResult;
    }
    validateFlatPageLayoutDeletion({ flatEntityToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatPageLayoutMaps: optimisticFlatPageLayoutMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatEntityToValidate.universalIdentifier,
                name: flatEntityToValidate.name
            },
            metadataName: 'pageLayout',
            type: 'delete'
        });
        const existingPageLayout = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatEntityToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatPageLayoutMaps
        });
        if (!(0, _utils.isDefined)(existingPageLayout)) {
            validationResult.errors.push({
                code: PAGE_LAYOUT_EXCEPTION_CODE.PAGE_LAYOUT_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "ZKtamk",
                    message: "Page layout not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "ZKtamk",
                    message: "Page layout not found"
                }
            });
            return validationResult;
        }
        return validationResult;
    }
    validateFlatPageLayoutUpdate({ universalIdentifier, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatPageLayoutMaps: optimisticFlatPageLayoutMaps } }) {
        const fromFlatPageLayout = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatPageLayoutMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'pageLayout',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(fromFlatPageLayout)) {
            validationResult.errors.push({
                code: PAGE_LAYOUT_EXCEPTION_CODE.PAGE_LAYOUT_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "ZKtamk",
                    message: "Page layout not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "ZKtamk",
                    message: "Page layout not found"
                }
            });
            return validationResult;
        }
        return validationResult;
    }
};
FlatPageLayoutValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatPageLayoutValidatorService);

//# sourceMappingURL=flat-page-layout-validator.service.js.map