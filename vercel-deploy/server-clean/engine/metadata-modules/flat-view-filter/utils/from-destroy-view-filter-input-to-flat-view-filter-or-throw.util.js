"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDestroyViewFilterInputToFlatViewFilterOrThrow", {
    enumerable: true,
    get: function() {
        return fromDestroyViewFilterInputToFlatViewFilterOrThrow;
    }
});
const _core = require("@lingui/core");
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _viewfilterexception = require("../../view-filter/exceptions/view-filter.exception");
const fromDestroyViewFilterInputToFlatViewFilterOrThrow = ({ destroyViewFilterInput, flatViewFilterMaps })=>{
    const { id: viewFilterId } = (0, _utils.extractAndSanitizeObjectStringFields)(destroyViewFilterInput, [
        'id'
    ]);
    const existingFlatViewFilterToDestroy = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewFilterId,
        flatEntityMaps: flatViewFilterMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewFilterToDestroy)) {
        throw new _viewfilterexception.ViewFilterException(_core.i18n._(/*i18n*/ {
            id: "9gedIx",
            message: "View filter to destroy not found"
        }), _viewfilterexception.ViewFilterExceptionCode.VIEW_FILTER_NOT_FOUND);
    }
    return existingFlatViewFilterToDestroy;
};

//# sourceMappingURL=from-destroy-view-filter-input-to-flat-view-filter-or-throw.util.js.map