"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _constants = require("twenty-shared/constants");
const _permissionsexception = require("../../../permissions/permissions.exception");
const _fromflatrolepermissionflagtorolepermissionflagdtoutil = require("../from-flat-role-permission-flag-to-role-permission-flag-dto.util");
const buildFlatRolePermissionFlag = (overrides = {})=>({
        id: 'role-permission-flag-id',
        roleId: 'role-id',
        permissionFlagUniversalIdentifier: 'permission-flag-universal-id',
        ...overrides
    });
const buildFlatPermissionFlag = ()=>({
        id: 'permission-flag-id',
        workspaceId: 'workspace-id',
        applicationId: 'application-id',
        universalIdentifier: 'permission-flag-universal-id',
        applicationUniversalIdentifier: 'application-universal-id',
        key: _constants.PermissionFlagType.WORKSPACE,
        label: 'Workspace',
        description: null,
        icon: null,
        permissionType: 'settings',
        rolePermissionFlagIds: [],
        rolePermissionFlagUniversalIdentifiers: [],
        createdAt: '2026-05-13T00:00:00.000Z',
        updatedAt: '2026-05-13T00:00:00.000Z'
    });
const buildFlatPermissionFlagMaps = ()=>({
        byUniversalIdentifier: {
            'permission-flag-universal-id': buildFlatPermissionFlag()
        },
        universalIdentifierById: {
            'permission-flag-id': 'permission-flag-universal-id'
        },
        universalIdentifiersByApplicationId: {}
    });
describe('fromFlatRolePermissionFlagToRolePermissionFlagDto', ()=>{
    it('maps role permission flags to the public permission flag DTO shape', ()=>{
        expect((0, _fromflatrolepermissionflagtorolepermissionflagdtoutil.fromFlatRolePermissionFlagToRolePermissionFlagDto)(buildFlatRolePermissionFlag(), buildFlatPermissionFlagMaps())).toEqual({
            id: 'role-permission-flag-id',
            roleId: 'role-id',
            flag: _constants.PermissionFlagType.WORKSPACE
        });
    });
    it('throws a permissions exception when the permission flag is missing', ()=>{
        expect(()=>(0, _fromflatrolepermissionflagtorolepermissionflagdtoutil.fromFlatRolePermissionFlagToRolePermissionFlagDto)(buildFlatRolePermissionFlag(), {
                byUniversalIdentifier: {},
                universalIdentifierById: {},
                universalIdentifiersByApplicationId: {}
            })).toThrow(new _permissionsexception.PermissionsException('Permission flag permission-flag-universal-id not found', _permissionsexception.PermissionsExceptionCode.PERMISSION_NOT_FOUND));
    });
});

//# sourceMappingURL=from-flat-role-permission-flag-to-role-permission-flag-dto.util.spec.js.map