"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatPermissionFlagToPermissionFlagDto", {
    enumerable: true,
    get: function() {
        return fromFlatPermissionFlagToPermissionFlagDto;
    }
});
const fromFlatPermissionFlagToPermissionFlagDto = (flatDefinition)=>({
        id: flatDefinition.id,
        universalIdentifier: flatDefinition.universalIdentifier,
        key: flatDefinition.key,
        label: flatDefinition.label,
        description: flatDefinition.description,
        icon: flatDefinition.icon,
        permissionType: flatDefinition.permissionType,
        workspaceId: flatDefinition.workspaceId,
        applicationId: flatDefinition.applicationId,
        createdAt: new Date(flatDefinition.createdAt),
        updatedAt: new Date(flatDefinition.updatedAt)
    });

//# sourceMappingURL=from-flat-permission-flag-to-permission-flag-dto.util.js.map