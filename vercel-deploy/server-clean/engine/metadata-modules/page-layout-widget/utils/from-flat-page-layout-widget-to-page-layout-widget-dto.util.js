"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatPageLayoutWidgetToPageLayoutWidgetDto", {
    enumerable: true,
    get: function() {
        return fromFlatPageLayoutWidgetToPageLayoutWidgetDto;
    }
});
const fromFlatPageLayoutWidgetToPageLayoutWidgetDto = (flatPageLayoutWidget)=>{
    const { createdAt, updatedAt, deletedAt, objectMetadataId, overrides, ...rest } = flatPageLayoutWidget;
    return {
        ...rest,
        ...overrides ?? {},
        overrides,
        isOverridden: false,
        objectMetadataId: objectMetadataId ?? undefined,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        deletedAt: deletedAt ? new Date(deletedAt) : undefined
    };
};

//# sourceMappingURL=from-flat-page-layout-widget-to-page-layout-widget-dto.util.js.map