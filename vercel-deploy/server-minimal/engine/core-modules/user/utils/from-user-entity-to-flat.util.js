"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUserEntityToFlat", {
    enumerable: true,
    get: function() {
        return fromUserEntityToFlat;
    }
});
const fromUserEntityToFlat = (entity)=>({
        id: entity.id,
        firstName: entity.firstName,
        lastName: entity.lastName,
        email: entity.email,
        isEmailVerified: entity.isEmailVerified,
        disabled: entity.disabled,
        canImpersonate: entity.canImpersonate,
        canAccessFullAdminPanel: entity.canAccessFullAdminPanel,
        locale: entity.locale,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString(),
        deletedAt: entity.deletedAt?.toISOString()
    });

//# sourceMappingURL=from-user-entity-to-flat.util.js.map