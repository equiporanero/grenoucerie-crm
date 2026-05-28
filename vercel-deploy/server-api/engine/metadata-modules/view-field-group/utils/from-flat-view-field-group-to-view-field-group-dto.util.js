"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatViewFieldGroupToViewFieldGroupDto", {
    enumerable: true,
    get: function() {
        return fromFlatViewFieldGroupToViewFieldGroupDto;
    }
});
const fromFlatViewFieldGroupToViewFieldGroupDto = (flatViewFieldGroup)=>{
    const { createdAt, updatedAt, deletedAt, overrides, ...rest } = flatViewFieldGroup;
    return {
        ...rest,
        ...overrides ?? {},
        overrides,
        isOverridden: false,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        deletedAt: deletedAt ? new Date(deletedAt) : null
    };
};

//# sourceMappingURL=from-flat-view-field-group-to-view-field-group-dto.util.js.map