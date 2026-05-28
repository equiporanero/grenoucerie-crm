"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDestroyPageLayoutTabInputToFlatPageLayoutTabOrThrow", {
    enumerable: true,
    get: function() {
        return fromDestroyPageLayoutTabInputToFlatPageLayoutTabOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _pagelayouttabexception = require("../../page-layout-tab/exceptions/page-layout-tab.exception");
const fromDestroyPageLayoutTabInputToFlatPageLayoutTabOrThrow = ({ destroyPageLayoutTabInput, flatPageLayoutTabMaps })=>{
    const { id: pageLayoutTabId } = (0, _utils.extractAndSanitizeObjectStringFields)(destroyPageLayoutTabInput, [
        'id'
    ]);
    const existingFlatPageLayoutTabToDestroy = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: pageLayoutTabId,
        flatEntityMaps: flatPageLayoutTabMaps
    });
    if (!(0, _utils.isDefined)(existingFlatPageLayoutTabToDestroy)) {
        throw new _pagelayouttabexception.PageLayoutTabException(_core.i18n._(/*i18n*/ {
            id: "LTouJ4",
            message: "Page layout tab to destroy not found"
        }), _pagelayouttabexception.PageLayoutTabExceptionCode.PAGE_LAYOUT_TAB_NOT_FOUND);
    }
    return existingFlatPageLayoutTabToDestroy;
};

//# sourceMappingURL=from-destroy-page-layout-tab-input-to-flat-page-layout-tab-or-throw.util.js.map