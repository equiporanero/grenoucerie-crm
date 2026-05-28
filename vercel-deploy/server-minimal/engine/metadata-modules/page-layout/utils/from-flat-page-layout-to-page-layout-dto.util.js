"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatPageLayoutToPageLayoutDto", {
    enumerable: true,
    get: function() {
        return fromFlatPageLayoutToPageLayoutDto;
    }
});
const fromFlatPageLayoutToPageLayoutDto = (flatPageLayout)=>{
    const { createdAt, updatedAt, deletedAt, tabIds: _tabIds, defaultTabToFocusOnMobileAndSidePanelId, ...rest } = flatPageLayout;
    return {
        ...rest,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
        deletedAt: deletedAt ? new Date(deletedAt) : null,
        defaultTabToFocusOnMobileAndSidePanelId: defaultTabToFocusOnMobileAndSidePanelId ?? undefined
    };
};

//# sourceMappingURL=from-flat-page-layout-to-page-layout-dto.util.js.map