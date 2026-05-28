"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _constants = require("twenty-shared/constants");
const _fromRoleEntityToRoleDtoutil = require("../fromRoleEntityToRoleDto.util");
const buildRoleEntity = (overrides = {})=>({
        id: 'role-id',
        label: 'Role',
        universalIdentifier: 'role-universal-identifier',
        canUpdateAllSettings: false,
        canAccessAllTools: false,
        description: null,
        icon: null,
        isEditable: true,
        canReadAllObjectRecords: false,
        canUpdateAllObjectRecords: false,
        canSoftDeleteAllObjectRecords: false,
        canDestroyAllObjectRecords: false,
        canBeAssignedToUsers: true,
        canBeAssignedToAgents: true,
        canBeAssignedToApiKeys: true,
        roleTargets: [],
        objectPermissions: [],
        fieldPermissions: [],
        rolePermissionFlags: [],
        ...overrides
    });
describe('fromRoleEntityToRoleDto', ()=>{
    it('returns undefined permission flags when role permission flags are not loaded', ()=>{
        const roleDto = (0, _fromRoleEntityToRoleDtoutil.fromRoleEntityToRoleDto)(buildRoleEntity({
            rolePermissionFlags: undefined
        }));
        expect(roleDto.permissionFlags).toBeUndefined();
    });
    it('maps loaded role permission flags to the public permission flag DTO shape', ()=>{
        const roleDto = (0, _fromRoleEntityToRoleDtoutil.fromRoleEntityToRoleDto)(buildRoleEntity({
            rolePermissionFlags: [
                {
                    id: 'role-permission-flag-id',
                    roleId: 'role-id',
                    permissionFlag: {
                        key: _constants.PermissionFlagType.WORKSPACE
                    }
                }
            ]
        }));
        expect(roleDto.permissionFlags).toEqual([
            {
                id: 'role-permission-flag-id',
                roleId: 'role-id',
                flag: _constants.PermissionFlagType.WORKSPACE
            }
        ]);
    });
});

//# sourceMappingURL=fromRoleEntityToRoleDto.util.spec.js.map