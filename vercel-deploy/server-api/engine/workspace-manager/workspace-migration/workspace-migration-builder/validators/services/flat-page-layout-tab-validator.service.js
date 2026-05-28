"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatPageLayoutTabValidatorService", {
    enumerable: true,
    get: function() {
        return FlatPageLayoutTabValidatorService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyuniversalidentifierutil = require("../../../../../metadata-modules/flat-entity/utils/find-flat-entity-by-universal-identifier.util");
const _pagelayoutexception = require("../../../../../metadata-modules/page-layout/exceptions/page-layout.exception");
const _getflatentityvalidationerrorutil = require("../../builders/utils/get-flat-entity-validation-error.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const PAGE_LAYOUT_TAB_EXCEPTION_CODE = {
    PAGE_LAYOUT_TAB_NOT_FOUND: 'PAGE_LAYOUT_TAB_NOT_FOUND'
};
let FlatPageLayoutTabValidatorService = class FlatPageLayoutTabValidatorService {
    validateFlatPageLayoutTabCreation({ flatEntityToValidate: flatPageLayoutTab, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatPageLayoutMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatPageLayoutTab.universalIdentifier,
                title: flatPageLayoutTab.title
            },
            metadataName: 'pageLayoutTab',
            type: 'create'
        });
        const referencedPageLayout = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatPageLayoutTab.pageLayoutUniversalIdentifier,
            flatEntityMaps: flatPageLayoutMaps
        });
        if (!(0, _utils.isDefined)(referencedPageLayout)) {
            validationResult.errors.push({
                code: _pagelayoutexception.PageLayoutExceptionCode.PAGE_LAYOUT_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "ZKtamk",
                    message: "Page layout not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "ZKtamk",
                    message: "Page layout not found"
                }
            });
        }
        return validationResult;
    }
    validateFlatPageLayoutTabDeletion({ flatEntityToValidate, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatPageLayoutTabMaps: optimisticFlatPageLayoutTabMaps } }) {
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier: flatEntityToValidate.universalIdentifier,
                title: flatEntityToValidate.title
            },
            metadataName: 'pageLayoutTab',
            type: 'delete'
        });
        const existingPageLayoutTab = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier: flatEntityToValidate.universalIdentifier,
            flatEntityMaps: optimisticFlatPageLayoutTabMaps
        });
        if (!(0, _utils.isDefined)(existingPageLayoutTab)) {
            validationResult.errors.push({
                code: PAGE_LAYOUT_TAB_EXCEPTION_CODE.PAGE_LAYOUT_TAB_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "qJ9V6q",
                    message: "Page layout tab not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "qJ9V6q",
                    message: "Page layout tab not found"
                }
            });
            return validationResult;
        }
        return validationResult;
    }
    validateFlatPageLayoutTabUpdate({ universalIdentifier, optimisticFlatEntityMapsAndRelatedFlatEntityMaps: { flatPageLayoutTabMaps: optimisticFlatPageLayoutTabMaps } }) {
        const fromFlatPageLayoutTab = (0, _findflatentitybyuniversalidentifierutil.findFlatEntityByUniversalIdentifier)({
            universalIdentifier,
            flatEntityMaps: optimisticFlatPageLayoutTabMaps
        });
        const validationResult = (0, _getflatentityvalidationerrorutil.getEmptyFlatEntityValidationError)({
            flatEntityMinimalInformation: {
                universalIdentifier
            },
            metadataName: 'pageLayoutTab',
            type: 'update'
        });
        if (!(0, _utils.isDefined)(fromFlatPageLayoutTab)) {
            validationResult.errors.push({
                code: PAGE_LAYOUT_TAB_EXCEPTION_CODE.PAGE_LAYOUT_TAB_NOT_FOUND,
                message: _core.i18n._(/*i18n*/ {
                    id: "qJ9V6q",
                    message: "Page layout tab not found"
                }),
                userFriendlyMessage: /*i18n*/ {
                    id: "qJ9V6q",
                    message: "Page layout tab not found"
                }
            });
            return validationResult;
        }
        return validationResult;
    }
};
FlatPageLayoutTabValidatorService = _ts_decorate([
    (0, _common.Injectable)()
], FlatPageLayoutTabValidatorService);

//# sourceMappingURL=flat-page-layout-tab-validator.service.js.map