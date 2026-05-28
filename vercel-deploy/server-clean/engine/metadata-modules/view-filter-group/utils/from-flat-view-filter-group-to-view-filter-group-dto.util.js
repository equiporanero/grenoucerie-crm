"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatViewFilterGroupToViewFilterGroupDto", {
    enumerable: true,
    get: function() {
        return fromFlatViewFilterGroupToViewFilterGroupDto;
    }
});
const fromFlatViewFilterGroupToViewFilterGroupDto = (flatViewFilterGroup)=>{
    const { createdAt, updatedAt, deletedAt, ...rest } = flatViewFilterGroup;
    return {
        ...rest,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        deletedAt: deletedAt ? new Date(deletedAt) : null
    };
};

//# sourceMappingURL=from-flat-view-filter-group-to-view-filter-group-dto.util.js.map