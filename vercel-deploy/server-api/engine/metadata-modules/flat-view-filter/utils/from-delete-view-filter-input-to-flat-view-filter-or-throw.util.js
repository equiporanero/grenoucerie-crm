"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeleteViewFilterInputToFlatViewFilterOrThrow", {
    enumerable: true,
    get: function() {
        return fromDeleteViewFilterInputToFlatViewFilterOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _viewfilterexception = require("../../view-filter/exceptions/view-filter.exception");
const fromDeleteViewFilterInputToFlatViewFilterOrThrow = ({ deleteViewFilterInput: rawDeleteViewFilterInput, flatViewFilterMaps })=>{
    const { id: viewFilterId } = (0, _utils.extractAndSanitizeObjectStringFields)(rawDeleteViewFilterInput, [
        'id'
    ]);
    const existingFlatViewFilterToDelete = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewFilterId,
        flatEntityMaps: flatViewFilterMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewFilterToDelete)) {
        throw new _viewfilterexception.ViewFilterException(_core.i18n._(/*i18n*/ {
            id: "3l1ppY",
            message: "View filter to delete not found"
        }), _viewfilterexception.ViewFilterExceptionCode.VIEW_FILTER_NOT_FOUND);
    }
    return {
        ...existingFlatViewFilterToDelete,
        deletedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-delete-view-filter-input-to-flat-view-filter-or-throw.util.js.map