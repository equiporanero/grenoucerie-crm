"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatViewSortToViewSortDto", {
    enumerable: true,
    get: function() {
        return fromFlatViewSortToViewSortDto;
    }
});
const fromFlatViewSortToViewSortDto = (flatViewSort)=>{
    const { createdAt, updatedAt, deletedAt, ...rest } = flatViewSort;
    return {
        ...rest,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        deletedAt: deletedAt ? new Date(deletedAt) : null
    };
};

//# sourceMappingURL=from-flat-view-sort-to-view-sort-dto.util.js.map