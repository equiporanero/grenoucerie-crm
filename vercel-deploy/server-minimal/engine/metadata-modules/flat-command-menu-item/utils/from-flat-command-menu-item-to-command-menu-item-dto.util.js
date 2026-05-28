"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatCommandMenuItemToCommandMenuItemDto", {
    enumerable: true,
    get: function() {
        return fromFlatCommandMenuItemToCommandMenuItemDto;
    }
});
const fromFlatCommandMenuItemToCommandMenuItemDto = (flatCommandMenuItem)=>({
        id: flatCommandMenuItem.id,
        workflowVersionId: flatCommandMenuItem.workflowVersionId ?? undefined,
        frontComponentId: flatCommandMenuItem.frontComponentId ?? undefined,
        engineComponentKey: flatCommandMenuItem.engineComponentKey,
        label: flatCommandMenuItem.label,
        icon: flatCommandMenuItem.icon ?? undefined,
        shortLabel: flatCommandMenuItem.shortLabel ?? undefined,
        position: flatCommandMenuItem.position,
        isPinned: flatCommandMenuItem.isPinned,
        payload: flatCommandMenuItem.payload ?? undefined,
        hotKeys: flatCommandMenuItem.hotKeys ?? undefined,
        availabilityType: flatCommandMenuItem.availabilityType,
        conditionalAvailabilityExpression: flatCommandMenuItem.conditionalAvailabilityExpression ?? undefined,
        availabilityObjectMetadataId: flatCommandMenuItem.availabilityObjectMetadataId ?? undefined,
        pageLayoutId: flatCommandMenuItem.pageLayoutId ?? undefined,
        workspaceId: flatCommandMenuItem.workspaceId,
        applicationId: flatCommandMenuItem.applicationId ?? undefined,
        createdAt: new Date(flatCommandMenuItem.createdAt),
        updatedAt: new Date(flatCommandMenuItem.updatedAt)
    });

//# sourceMappingURL=from-flat-command-menu-item-to-command-menu-item-dto.util.js.map