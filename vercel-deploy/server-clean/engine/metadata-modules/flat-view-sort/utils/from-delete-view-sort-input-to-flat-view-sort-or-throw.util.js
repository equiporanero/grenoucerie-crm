"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeleteViewSortInputToFlatViewSortOrThrow", {
    enumerable: true,
    get: function() {
        return fromDeleteViewSortInputToFlatViewSortOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _viewsortexception = require("../../view-sort/exceptions/view-sort.exception");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const fromDeleteViewSortInputToFlatViewSortOrThrow = ({ deleteViewSortInput: rawDeleteViewSortInput, flatViewSortMaps })=>{
    const { id: viewSortId } = (0, _utils.extractAndSanitizeObjectStringFields)(rawDeleteViewSortInput, [
        'id'
    ]);
    const existingFlatViewSortToDelete = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewSortId,
        flatEntityMaps: flatViewSortMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewSortToDelete)) {
        throw new _viewsortexception.ViewSortException(_core.i18n._(/*i18n*/ {
            id: "3zMs+f",
            message: "View sort not found"
        }), _viewsortexception.ViewSortExceptionCode.VIEW_SORT_NOT_FOUND);
    }
    return {
        ...existingFlatViewSortToDelete,
        deletedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-delete-view-sort-input-to-flat-view-sort-or-throw.util.js.map