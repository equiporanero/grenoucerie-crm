"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFieldPermissionManifestToUniversalFlatFieldPermission", {
    enumerable: true,
    get: function() {
        return fromFieldPermissionManifestToUniversalFlatFieldPermission;
    }
});
const fromFieldPermissionManifestToUniversalFlatFieldPermission = ({ fieldPermissionManifest, roleUniversalIdentifier, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: fieldPermissionManifest.universalIdentifier,
        applicationUniversalIdentifier,
        roleUniversalIdentifier,
        objectMetadataUniversalIdentifier: fieldPermissionManifest.objectUniversalIdentifier,
        fieldMetadataUniversalIdentifier: fieldPermissionManifest.fieldUniversalIdentifier,
        canReadFieldValue: fieldPermissionManifest.canReadFieldValue ?? null,
        canUpdateFieldValue: fieldPermissionManifest.canUpdateFieldValue ?? null,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-field-permission-manifest-to-universal-flat-field-permission.util.js.map