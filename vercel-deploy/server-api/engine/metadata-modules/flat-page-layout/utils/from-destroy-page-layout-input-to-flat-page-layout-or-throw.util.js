"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDestroyPageLayoutInputToFlatPageLayoutOrThrow", {
    enumerable: true,
    get: function() {
        return fromDestroyPageLayoutInputToFlatPageLayoutOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _pagelayoutexception = require("../../page-layout/exceptions/page-layout.exception");
const fromDestroyPageLayoutInputToFlatPageLayoutOrThrow = ({ destroyPageLayoutInput, flatPageLayoutMaps })=>{
    const { id: pageLayoutId } = (0, _utils.extractAndSanitizeObjectStringFields)(destroyPageLayoutInput, [
        'id'
    ]);
    const existingFlatPageLayoutToDestroy = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: pageLayoutId,
        flatEntityMaps: flatPageLayoutMaps
    });
    if (!(0, _utils.isDefined)(existingFlatPageLayoutToDestroy)) {
        throw new _pagelayoutexception.PageLayoutException(_core.i18n._(/*i18n*/ {
            id: "zrm54u",
            message: "Page layout to destroy not found"
        }), _pagelayoutexception.PageLayoutExceptionCode.PAGE_LAYOUT_NOT_FOUND);
    }
    return existingFlatPageLayoutToDestroy;
};

//# sourceMappingURL=from-destroy-page-layout-input-to-flat-page-layout-or-throw.util.js.map