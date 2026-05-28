"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromDeleteViewFilterGroupInputToFlatViewFilterGroupOrThrow", {
    enumerable: true,
    get: function() {
        return fromDeleteViewFilterGroupInputToFlatViewFilterGroupOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _findflatentitybyidinflatentitymapsutil = require("../../flat-entity/utils/find-flat-entity-by-id-in-flat-entity-maps.util");
const _viewfiltergroupexception = require("../../view-filter-group/exceptions/view-filter-group.exception");
const fromDeleteViewFilterGroupInputToFlatViewFilterGroupOrThrow = ({ deleteViewFilterGroupInput: rawDeleteViewFilterGroupInput, flatViewFilterGroupMaps })=>{
    const { id: viewFilterGroupId } = (0, _utils.extractAndSanitizeObjectStringFields)(rawDeleteViewFilterGroupInput, [
        'id'
    ]);
    const existingFlatViewFilterGroupToDelete = (0, _findflatentitybyidinflatentitymapsutil.findFlatEntityByIdInFlatEntityMaps)({
        flatEntityId: viewFilterGroupId,
        flatEntityMaps: flatViewFilterGroupMaps
    });
    if (!(0, _utils.isDefined)(existingFlatViewFilterGroupToDelete)) {
        throw new _viewfiltergroupexception.ViewFilterGroupException('View filter group not found', _viewfiltergroupexception.ViewFilterGroupExceptionCode.VIEW_FILTER_GROUP_NOT_FOUND);
    }
    return {
        ...existingFlatViewFilterGroupToDelete,
        deletedAt: new Date().toISOString()
    };
};

//# sourceMappingURL=from-delete-view-filter-group-input-to-flat-view-filter-group-or-throw.util.js.map