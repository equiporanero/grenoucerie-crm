"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatViewFieldToViewFieldDto", {
    enumerable: true,
    get: function() {
        return fromFlatViewFieldToViewFieldDto;
    }
});
const fromFlatViewFieldToViewFieldDto = (flatViewField)=>{
    const { createdAt, updatedAt, deletedAt, overrides, ...rest } = flatViewField;
    return {
        ...rest,
        ...overrides ?? {},
        isOverridden: false,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        deletedAt: deletedAt ? new Date(deletedAt) : null
    };
};

//# sourceMappingURL=from-flat-view-field-to-view-field-dto.util.js.map