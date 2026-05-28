"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatViewGroupToViewGroupDto", {
    enumerable: true,
    get: function() {
        return fromFlatViewGroupToViewGroupDto;
    }
});
const fromFlatViewGroupToViewGroupDto = (flatViewGroup)=>{
    const { createdAt, updatedAt, deletedAt, ...rest } = flatViewGroup;
    return {
        ...rest,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        deletedAt: deletedAt ? new Date(deletedAt) : null
    };
};

//# sourceMappingURL=from-flat-view-group-to-view-group-dto.util.js.map