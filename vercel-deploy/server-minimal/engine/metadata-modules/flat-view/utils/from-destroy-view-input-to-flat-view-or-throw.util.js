"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDestroyViewInputToFlatViewOrThrow", {
    enumerable: true,
    get: function() {
        return fromDestroyViewInputToFlatViewOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _viewexception = require("../../view/exceptions/view.exception");
const fromDestroyViewInputToFlatViewOrThrow = ({ destroyViewInput: rawDestroyViewInput, flatViewMaps })=>{
    const { id: viewId } = (0, _utils.extractAndSanitizeObjectStringFields)(rawDestroyViewInput, [
        'id'
    ]);
    const existingFlatViewToDestroy = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewId,
        flatEntityMaps: flatViewMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewToDestroy)) {
        throw new _viewexception.ViewException(_core.i18n._(/*i18n*/ {
            id: "NnD3Ti",
            message: "View to destroy not found"
        }), _viewexception.ViewExceptionCode.VIEW_NOT_FOUND);
    }
    return existingFlatViewToDestroy;
};

//# sourceMappingURL=from-destroy-view-input-to-flat-view-or-throw.util.js.map