"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromRoleManifestToUniversalFlatRole", {
    enumerable: true,
    get: function() {
        return fromRoleManifestToUniversalFlatRole;
    }
});
const fromRoleManifestToUniversalFlatRole = ({ roleManifest, applicationUniversalIdentifier, now })=>{
    return {
        universalIdentifier: roleManifest.universalIdentifier,
        applicationUniversalIdentifier,
        label: roleManifest.label,
        description: roleManifest.description ?? null,
        icon: roleManifest.icon ?? null,
        canUpdateAllSettings: roleManifest.canUpdateAllSettings ?? false,
        canAccessAllTools: roleManifest.canAccessAllTools ?? false,
        canReadAllObjectRecords: roleManifest.canReadAllObjectRecords ?? false,
        canUpdateAllObjectRecords: roleManifest.canUpdateAllObjectRecords ?? false,
        canSoftDeleteAllObjectRecords: roleManifest.canSoftDeleteAllObjectRecords ?? false,
        canDestroyAllObjectRecords: roleManifest.canDestroyAllObjectRecords ?? false,
        isEditable: true,
        canBeAssignedToUsers: roleManifest.canBeAssignedToUsers ?? true,
        canBeAssignedToAgents: roleManifest.canBeAssignedToAgents ?? true,
        canBeAssignedToApiKeys: roleManifest.canBeAssignedToApiKeys ?? true,
        roleTargetUniversalIdentifiers: [],
        objectPermissionUniversalIdentifiers: [],
        fieldPermissionUniversalIdentifiers: [],
        rolePermissionFlagUniversalIdentifiers: [],
        rowLevelPermissionPredicateUniversalIdentifiers: [],
        rowLevelPermissionPredicateGroupUniversalIdentifiers: [],
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-role-manifest-to-universal-flat-role.util.js.map