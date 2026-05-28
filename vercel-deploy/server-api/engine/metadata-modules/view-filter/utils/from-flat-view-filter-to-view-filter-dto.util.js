"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatViewFilterToViewFilterDto", {
    enumerable: true,
    get: function() {
        return fromFlatViewFilterToViewFilterDto;
    }
});
const fromFlatViewFilterToViewFilterDto = (flatViewFilter)=>{
    const { createdAt, updatedAt, deletedAt, ...rest } = flatViewFilter;
    return {
        ...rest,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        deletedAt: deletedAt ? new Date(deletedAt) : null
    };
};

//# sourceMappingURL=from-flat-view-filter-to-view-filter-dto.util.js.map