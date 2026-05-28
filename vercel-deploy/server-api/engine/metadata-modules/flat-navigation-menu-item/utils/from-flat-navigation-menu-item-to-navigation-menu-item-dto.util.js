"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatNavigationMenuItemToNavigationMenuItemDto", {
    enumerable: true,
    get: function() {
        return fromFlatNavigationMenuItemToNavigationMenuItemDto;
    }
});
const fromFlatNavigationMenuItemToNavigationMenuItemDto = (flatNavigationMenuItem)=>({
        id: flatNavigationMenuItem.id,
        type: flatNavigationMenuItem.type,
        userWorkspaceId: flatNavigationMenuItem.userWorkspaceId ?? undefined,
        targetRecordId: flatNavigationMenuItem.targetRecordId ?? undefined,
        targetObjectMetadataId: flatNavigationMenuItem.targetObjectMetadataId ?? undefined,
        viewId: flatNavigationMenuItem.viewId ?? undefined,
        folderId: flatNavigationMenuItem.folderId ?? undefined,
        name: flatNavigationMenuItem.name ?? undefined,
        link: flatNavigationMenuItem.link ?? undefined,
        icon: flatNavigationMenuItem.icon ?? undefined,
        color: flatNavigationMenuItem.color ?? undefined,
        pageLayoutId: flatNavigationMenuItem.pageLayoutId ?? undefined,
        position: flatNavigationMenuItem.position,
        workspaceId: flatNavigationMenuItem.workspaceId,
        applicationId: flatNavigationMenuItem.applicationId ?? undefined,
        createdAt: new Date(flatNavigationMenuItem.createdAt),
        updatedAt: new Date(flatNavigationMenuItem.updatedAt)
    });

//# sourceMappingURL=from-flat-navigation-menu-item-to-navigation-menu-item-dto.util.js.map