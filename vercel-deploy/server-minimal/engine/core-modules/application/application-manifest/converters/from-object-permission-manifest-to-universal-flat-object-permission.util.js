"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromObjectPermissionManifestToUniversalFlatObjectPermission", {
    enumerable: true,
    get: function() {
        return fromObjectPermissionManifestToUniversalFlatObjectPermission;
    }
});
const fromObjectPermissionManifestToUniversalFlatObjectPermission = ({ objectPermissionManifest, roleUniversalIdentifier, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: objectPermissionManifest.universalIdentifier,
        applicationUniversalIdentifier,
        roleUniversalIdentifier,
        objectMetadataUniversalIdentifier: objectPermissionManifest.objectUniversalIdentifier,
        canReadObjectRecords: objectPermissionManifest.canReadObjectRecords,
        canUpdateObjectRecords: objectPermissionManifest.canUpdateObjectRecords,
        canSoftDeleteObjectRecords: objectPermissionManifest.canSoftDeleteObjectRecords,
        canDestroyObjectRecords: objectPermissionManifest.canDestroyObjectRecords,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-object-permission-manifest-to-universal-flat-object-permission.util.js.map