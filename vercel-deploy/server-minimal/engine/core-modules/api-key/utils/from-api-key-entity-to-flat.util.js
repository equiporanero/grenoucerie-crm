"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromApiKeyEntityToFlat", {
    enumerable: true,
    get: function() {
        return fromApiKeyEntityToFlat;
    }
});
const fromApiKeyEntityToFlat = (entity)=>({
        id: entity.id,
        name: entity.name,
        workspaceId: entity.workspaceId,
        expiresAt: entity.expiresAt.toISOString(),
        revokedAt: entity.revokedAt?.toISOString() ?? null,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString()
    });

//# sourceMappingURL=from-api-key-entity-to-flat.util.js.map