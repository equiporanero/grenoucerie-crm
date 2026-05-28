"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDestroyPageLayoutWidgetInputToFlatPageLayoutWidgetOrThrow", {
    enumerable: true,
    get: function() {
        return fromDestroyPageLayoutWidgetInputToFlatPageLayoutWidgetOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _pagelayoutwidgetexception = require("../../page-layout-widget/exceptions/page-layout-widget.exception");
const fromDestroyPageLayoutWidgetInputToFlatPageLayoutWidgetOrThrow = ({ destroyPageLayoutWidgetInput, flatPageLayoutWidgetMaps })=>{
    const { id: pageLayoutWidgetId } = (0, _utils.extractAndSanitizeObjectStringFields)(destroyPageLayoutWidgetInput, [
        'id'
    ]);
    const existingFlatPageLayoutWidgetToDestroy = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: pageLayoutWidgetId,
        flatEntityMaps: flatPageLayoutWidgetMaps
    });
    if (!(0, _utils.isDefined)(existingFlatPageLayoutWidgetToDestroy)) {
        throw new _pagelayoutwidgetexception.PageLayoutWidgetException(_core.i18n._(/*i18n*/ {
            id: "v2G/zq",
            message: "Page layout widget to destroy not found"
        }), _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.PAGE_LAYOUT_WIDGET_NOT_FOUND);
    }
    return existingFlatPageLayoutWidgetToDestroy;
};

//# sourceMappingURL=from-destroy-page-layout-widget-input-to-flat-page-layout-widget-or-throw.util.js.map