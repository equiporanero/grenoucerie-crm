"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromUserWorkspacePermissionsToUserWorkspacePermissionsDto", {
    enumerable: true,
    get: function() {
        return fromUserWorkspacePermissionsToUserWorkspacePermissionsDto;
    }
});
const fromUserWorkspacePermissionsToUserWorkspacePermissionsDto = ({ objectsPermissions: rawObjectsPermissions, permissionFlags: rawSettingsPermissions })=>{
    const objectPermissions = Object.entries(rawObjectsPermissions).map(([objectMetadataId, permissions])=>({
            objectMetadataId,
            canReadObjectRecords: permissions.canReadObjectRecords,
            canUpdateObjectRecords: permissions.canUpdateObjectRecords,
            canSoftDeleteObjectRecords: permissions.canSoftDeleteObjectRecords,
            canDestroyObjectRecords: permissions.canDestroyObjectRecords,
            restrictedFields: permissions.restrictedFields,
            rowLevelPermissionPredicates: permissions.rowLevelPermissionPredicates,
            rowLevelPermissionPredicateGroups: permissions.rowLevelPermissionPredicateGroups
        }));
    const objectsPermissions = objectPermissions;
    const permissionFlags = Object.keys(rawSettingsPermissions).filter((feature)=>rawSettingsPermissions[feature] === true);
    return {
        objectPermissions,
        objectsPermissions,
        permissionFlags
    };
};

//# sourceMappingURL=fromUserWorkspacePermissionsToUserWorkspacePermissionsDto.js.map