"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get fromRoleEntitiesToRoleDtos () {
        return fromRoleEntitiesToRoleDtos;
    },
    get fromRoleEntityToRoleDto () {
        return fromRoleEntityToRoleDto;
    }
});
const fromRoleEntityToRoleDto = (role)=>{
    return {
        id: role.id,
        label: role.label,
        universalIdentifier: role.universalIdentifier,
        canUpdateAllSettings: role.canUpdateAllSettings,
        canAccessAllTools: role.canAccessAllTools,
        description: role.description ?? undefined,
        icon: role.icon ?? undefined,
        isEditable: role.isEditable,
        canReadAllObjectRecords: role.canReadAllObjectRecords,
        canUpdateAllObjectRecords: role.canUpdateAllObjectRecords,
        canSoftDeleteAllObjectRecords: role.canSoftDeleteAllObjectRecords,
        canDestroyAllObjectRecords: role.canDestroyAllObjectRecords,
        canBeAssignedToUsers: role.canBeAssignedToUsers,
        canBeAssignedToAgents: role.canBeAssignedToAgents,
        canBeAssignedToApiKeys: role.canBeAssignedToApiKeys,
        roleTargets: role.roleTargets,
        permissionFlags: role.rolePermissionFlags?.map((rolePermissionFlag)=>({
                id: rolePermissionFlag.id,
                roleId: rolePermissionFlag.roleId,
                flag: rolePermissionFlag.permissionFlag.key
            })),
        objectPermissions: role.objectPermissions,
        fieldPermissions: role.fieldPermissions
    };
};
const fromRoleEntitiesToRoleDtos = (roleEntities)=>roleEntities.map(fromRoleEntityToRoleDto);

//# sourceMappingURL=fromRoleEntityToRoleDto.util.js.map