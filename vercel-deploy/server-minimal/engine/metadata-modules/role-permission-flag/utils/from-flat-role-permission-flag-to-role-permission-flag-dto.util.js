"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromFlatRolePermissionFlagToRolePermissionFlagDto", {
    enumerable: true,
    get: function() {
        return fromFlatRolePermissionFlagToRolePermissionFlagDto;
    }
});
const _utils = require("twenty-shared/utils");
const _permissionsexception = require("../../permissions/permissions.exception");
const fromFlatRolePermissionFlagToRolePermissionFlagDto = (flatRolePermissionFlag, flatPermissionFlagMaps)=>{
    const permissionFlag = flatPermissionFlagMaps.byUniversalIdentifier[flatRolePermissionFlag.permissionFlagUniversalIdentifier];
    if (!(0, _utils.isDefined)(permissionFlag)) {
        throw new _permissionsexception.PermissionsException(`Permission flag ${flatRolePermissionFlag.permissionFlagUniversalIdentifier} not found`, _permissionsexception.PermissionsExceptionCode.PERMISSION_NOT_FOUND);
    }
    return {
        id: flatRolePermissionFlag.id,
        roleId: flatRolePermissionFlag.roleId,
        flag: permissionFlag.key
    };
};

//# sourceMappingURL=from-flat-role-permission-flag-to-role-permission-flag-dto.util.js.map