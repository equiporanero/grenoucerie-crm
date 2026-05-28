"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromPermissionFlagManifestToUniversalFlatPermissionFlag", {
    enumerable: true,
    get: function() {
        return fromPermissionFlagManifestToUniversalFlatPermissionFlag;
    }
});
const fromPermissionFlagManifestToUniversalFlatPermissionFlag = ({ permissionFlagManifest, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: permissionFlagManifest.universalIdentifier,
        applicationUniversalIdentifier,
        key: permissionFlagManifest.key,
        label: permissionFlagManifest.label,
        description: permissionFlagManifest.description ?? null,
        icon: permissionFlagManifest.icon ?? null,
        permissionType: 'tool',
        rolePermissionFlagUniversalIdentifiers: [],
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-permission-flag-manifest-to-universal-flat-permission-flag.util.js.map