"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatViewToViewDto", {
    enumerable: true,
    get: function() {
        return fromFlatViewToViewDto;
    }
});
const fromFlatViewToViewDto = (flatView)=>{
    const { createdAt, updatedAt, deletedAt, ...rest } = flatView;
    return {
        ...rest,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        deletedAt: deletedAt ? new Date(deletedAt) : null
    };
};

//# sourceMappingURL=from-flat-view-to-view-dto.util.js.map