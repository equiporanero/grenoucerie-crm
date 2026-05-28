"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDestroyViewFilterGroupInputToFlatViewFilterGroupOrThrow", {
    enumerable: true,
    get: function() {
        return fromDestroyViewFilterGroupInputToFlatViewFilterGroupOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _viewfiltergroupexception = require("../../view-filter-group/exceptions/view-filter-group.exception");
const fromDestroyViewFilterGroupInputToFlatViewFilterGroupOrThrow = ({ destroyViewFilterGroupInput, flatViewFilterGroupMaps })=>{
    const { id: viewFilterGroupId } = (0, _utils.extractAndSanitizeObjectStringFields)(destroyViewFilterGroupInput, [
        'id'
    ]);
    const existingFlatViewFilterGroupToDestroy = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewFilterGroupId,
        flatEntityMaps: flatViewFilterGroupMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewFilterGroupToDestroy)) {
        throw new _viewfiltergroupexception.ViewFilterGroupException('View filter group not found', _viewfiltergroupexception.ViewFilterGroupExceptionCode.VIEW_FILTER_GROUP_NOT_FOUND);
    }
    return existingFlatViewFilterGroupToDestroy;
};

//# sourceMappingURL=from-destroy-view-filter-group-input-to-flat-view-filter-group-or-throw.util.js.map