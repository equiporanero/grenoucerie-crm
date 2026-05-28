"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeleteViewInputToFlatViewOrThrow", {
    enumerable: true,
    get: function() {
        return fromDeleteViewInputToFlatViewOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _viewexception = require("../../view/exceptions/view.exception");
const fromDeleteViewInputToFlatViewOrThrow = ({ deleteViewInput: rawDeleteViewInput, flatViewMaps })=>{
    const { id: viewId } = (0, _utils.extractAndSanitizeObjectStringFields)(rawDeleteViewInput, [
        'id'
    ]);
    const existingFlatViewToDelete = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewId,
        flatEntityMaps: flatViewMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewToDelete)) {
        throw new _viewexception.ViewException(_core.i18n._(/*i18n*/ {
            id: "toB/08",
            message: "View to delete not found"
        }), _viewexception.ViewExceptionCode.VIEW_NOT_FOUND);
    }
    return {
        ...existingFlatViewToDelete,
        deletedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-delete-view-input-to-flat-view-or-throw.util.js.map