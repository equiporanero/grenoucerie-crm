"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUserWorkspaceEntityToFlat", {
    enumerable: true,
    get: function() {
        return fromUserWorkspaceEntityToFlat;
    }
});
const fromUserWorkspaceEntityToFlat = (entity)=>({
        id: entity.id,
        workspaceId: entity.workspaceId,
        userId: entity.userId,
        defaultAvatarUrl: entity.defaultAvatarUrl,
        locale: entity.locale,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString(),
        deletedAt: entity.deletedAt?.toISOString() ?? null
    });

//# sourceMappingURL=from-user-workspace-entity-to-flat.util.js.map