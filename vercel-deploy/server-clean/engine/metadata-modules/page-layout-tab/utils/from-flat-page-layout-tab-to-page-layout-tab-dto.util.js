"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatPageLayoutTabToPageLayoutTabDto", {
    enumerable: true,
    get: function() {
        return fromFlatPageLayoutTabToPageLayoutTabDto;
    }
});
const fromFlatPageLayoutTabToPageLayoutTabDto = (flatPageLayoutTab)=>{
    const { createdAt, updatedAt, deletedAt, widgetIds: _widgetIds, overrides, ...rest } = flatPageLayoutTab;
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

//# sourceMappingURL=from-flat-page-layout-tab-to-page-layout-tab-dto.util.js.map