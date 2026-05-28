"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _constants = require("twenty-shared/constants");
const _apikeyroleservice = require("../../../core-modules/api-key/services/api-key-role.service");
const _applicationentity = require("../../../core-modules/application/application.entity");
const _permissionsservice = require("../permissions.service");
const _roleentity = require("../../role/role.entity");
const _userroleservice = require("../../user-role/user-role.service");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
describe('PermissionsService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _permissionsservice.PermissionsService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_roleentity.RoleEntity),
                    useValue: {}
                },
                {
                    provide: _apikeyroleservice.ApiKeyRoleService,
                    useValue: {}
                },
                {
                    provide: _userroleservice.UserRoleService,
                    useValue: {}
                },
                {
                    provide: _workspacecacheservice.WorkspaceCacheService,
                    useValue: {}
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_applicationentity.ApplicationEntity),
                    useValue: {}
                }
            ]
        }).compile();
        service = module.get(_permissionsservice.PermissionsService);
    });
    describe('checkRolePermissions', ()=>{
        describe('canAccessAllTools for tool permissions', ()=>{
            it('should grant permission when canAccessAllTools is true for a tool permission', ()=>{
                const roleWithAllTools = {
                    id: 'test-role-id',
                    label: 'Test Role',
                    description: 'Test role description',
                    icon: 'IconTest',
                    canAccessAllTools: true,
                    canUpdateAllSettings: false,
                    canReadAllObjectRecords: false,
                    canUpdateAllObjectRecords: false,
                    canSoftDeleteAllObjectRecords: false,
                    canDestroyAllObjectRecords: false,
                    canBeAssignedToUsers: true,
                    canBeAssignedToAgents: true,
                    canBeAssignedToApiKeys: true,
                    rolePermissionFlags: [],
                    workspaceId: 'test-workspace-id',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isEditable: true
                };
                // Test all tool permissions
                expect(service.checkRolePermissions(roleWithAllTools, _constants.PermissionFlagType.UPLOAD_FILE)).toBe(true);
                expect(service.checkRolePermissions(roleWithAllTools, _constants.PermissionFlagType.DOWNLOAD_FILE)).toBe(true);
                expect(service.checkRolePermissions(roleWithAllTools, _constants.PermissionFlagType.AI)).toBe(true);
                expect(service.checkRolePermissions(roleWithAllTools, _constants.PermissionFlagType.VIEWS)).toBe(true);
                expect(service.checkRolePermissions(roleWithAllTools, _constants.PermissionFlagType.SEND_EMAIL_TOOL)).toBe(true);
                expect(service.checkRolePermissions(roleWithAllTools, _constants.PermissionFlagType.IMPORT_CSV)).toBe(true);
                expect(service.checkRolePermissions(roleWithAllTools, _constants.PermissionFlagType.EXPORT_CSV)).toBe(true);
                expect(service.checkRolePermissions(roleWithAllTools, _constants.PermissionFlagType.CONNECTED_ACCOUNTS)).toBe(true);
            });
            it('should NOT grant settings permissions when canAccessAllTools is true', ()=>{
                const roleWithAllTools = {
                    id: 'test-role-id',
                    label: 'Test Role',
                    description: 'Test role description',
                    icon: 'IconTest',
                    canAccessAllTools: true,
                    canUpdateAllSettings: false,
                    canReadAllObjectRecords: false,
                    canUpdateAllObjectRecords: false,
                    canSoftDeleteAllObjectRecords: false,
                    canDestroyAllObjectRecords: false,
                    canBeAssignedToUsers: true,
                    canBeAssignedToAgents: true,
                    canBeAssignedToApiKeys: true,
                    rolePermissionFlags: [],
                    workspaceId: 'test-workspace-id',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isEditable: true
                };
                // Test that settings permissions are NOT granted
                expect(service.checkRolePermissions(roleWithAllTools, _constants.PermissionFlagType.ROLES)).toBe(false);
                expect(service.checkRolePermissions(roleWithAllTools, _constants.PermissionFlagType.WORKSPACE)).toBe(false);
                expect(service.checkRolePermissions(roleWithAllTools, _constants.PermissionFlagType.DATA_MODEL)).toBe(false);
                expect(service.checkRolePermissions(roleWithAllTools, _constants.PermissionFlagType.SECURITY)).toBe(false);
            });
        });
        describe('canUpdateAllSettings for settings permissions', ()=>{
            it('should grant permission when canUpdateAllSettings is true for a settings permission', ()=>{
                const roleWithAllSettings = {
                    id: 'test-role-id',
                    label: 'Test Role',
                    description: 'Test role description',
                    icon: 'IconTest',
                    canAccessAllTools: false,
                    canUpdateAllSettings: true,
                    canReadAllObjectRecords: false,
                    canUpdateAllObjectRecords: false,
                    canSoftDeleteAllObjectRecords: false,
                    canDestroyAllObjectRecords: false,
                    canBeAssignedToUsers: true,
                    canBeAssignedToAgents: true,
                    canBeAssignedToApiKeys: true,
                    rolePermissionFlags: [],
                    roleTargets: [],
                    objectPermissions: [],
                    fieldPermissions: [],
                    workspaceId: 'test-workspace-id',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isEditable: true
                };
                // Test all settings permissions
                expect(service.checkRolePermissions(roleWithAllSettings, _constants.PermissionFlagType.ROLES)).toBe(true);
                expect(service.checkRolePermissions(roleWithAllSettings, _constants.PermissionFlagType.WORKSPACE)).toBe(true);
                expect(service.checkRolePermissions(roleWithAllSettings, _constants.PermissionFlagType.DATA_MODEL)).toBe(true);
                expect(service.checkRolePermissions(roleWithAllSettings, _constants.PermissionFlagType.SECURITY)).toBe(true);
                expect(service.checkRolePermissions(roleWithAllSettings, _constants.PermissionFlagType.WORKFLOWS)).toBe(true);
                expect(service.checkRolePermissions(roleWithAllSettings, _constants.PermissionFlagType.WORKSPACE_MEMBERS)).toBe(true);
                expect(service.checkRolePermissions(roleWithAllSettings, _constants.PermissionFlagType.API_KEYS_AND_WEBHOOKS)).toBe(true);
            });
            it('should NOT grant tool permissions when canUpdateAllSettings is true', ()=>{
                const roleWithAllSettings = {
                    id: 'test-role-id',
                    label: 'Test Role',
                    description: 'Test role description',
                    icon: 'IconTest',
                    canAccessAllTools: false,
                    canUpdateAllSettings: true,
                    canReadAllObjectRecords: false,
                    canUpdateAllObjectRecords: false,
                    canSoftDeleteAllObjectRecords: false,
                    canDestroyAllObjectRecords: false,
                    canBeAssignedToUsers: true,
                    canBeAssignedToAgents: true,
                    canBeAssignedToApiKeys: true,
                    rolePermissionFlags: [],
                    roleTargets: [],
                    objectPermissions: [],
                    fieldPermissions: [],
                    workspaceId: 'test-workspace-id',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isEditable: true
                };
                // Test that tool permissions are NOT granted
                expect(service.checkRolePermissions(roleWithAllSettings, _constants.PermissionFlagType.UPLOAD_FILE)).toBe(false);
                expect(service.checkRolePermissions(roleWithAllSettings, _constants.PermissionFlagType.DOWNLOAD_FILE)).toBe(false);
                expect(service.checkRolePermissions(roleWithAllSettings, _constants.PermissionFlagType.AI)).toBe(false);
                expect(service.checkRolePermissions(roleWithAllSettings, _constants.PermissionFlagType.VIEWS)).toBe(false);
            });
        });
        describe('Granular permissions with rolePermissionFlags', ()=>{
            it('should grant specific tool permission when included in rolePermissionFlags even if canAccessAllTools is false', ()=>{
                const roleWithSpecificPermission = {
                    id: 'test-role-id',
                    label: 'Test Role',
                    description: 'Test role description',
                    icon: 'IconTest',
                    canAccessAllTools: false,
                    canUpdateAllSettings: false,
                    canReadAllObjectRecords: false,
                    canUpdateAllObjectRecords: false,
                    canSoftDeleteAllObjectRecords: false,
                    canDestroyAllObjectRecords: false,
                    canBeAssignedToUsers: true,
                    canBeAssignedToAgents: true,
                    canBeAssignedToApiKeys: true,
                    rolePermissionFlags: [
                        {
                            id: 'permission-1',
                            permissionFlag: {
                                key: _constants.PermissionFlagType.UPLOAD_FILE,
                                universalIdentifier: _constants.SystemPermissionFlag.UPLOAD_FILE
                            },
                            roleId: 'test-role-id',
                            workspaceId: 'test-workspace-id',
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    ],
                    workspaceId: 'test-workspace-id',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isEditable: true
                };
                expect(service.checkRolePermissions(roleWithSpecificPermission, _constants.PermissionFlagType.UPLOAD_FILE)).toBe(true);
                expect(service.checkRolePermissions(roleWithSpecificPermission, _constants.PermissionFlagType.DOWNLOAD_FILE)).toBe(false);
            });
            it('should grant specific settings permission when included in rolePermissionFlags even if canUpdateAllSettings is false', ()=>{
                const roleWithSpecificPermission = {
                    id: 'test-role-id',
                    label: 'Test Role',
                    description: 'Test role description',
                    icon: 'IconTest',
                    canAccessAllTools: false,
                    canUpdateAllSettings: false,
                    canReadAllObjectRecords: false,
                    canUpdateAllObjectRecords: false,
                    canSoftDeleteAllObjectRecords: false,
                    canDestroyAllObjectRecords: false,
                    canBeAssignedToUsers: true,
                    canBeAssignedToAgents: true,
                    canBeAssignedToApiKeys: true,
                    rolePermissionFlags: [
                        {
                            id: 'permission-1',
                            permissionFlag: {
                                key: _constants.PermissionFlagType.ROLES,
                                universalIdentifier: _constants.SystemPermissionFlag.ROLES
                            },
                            roleId: 'test-role-id',
                            workspaceId: 'test-workspace-id',
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    ],
                    workspaceId: 'test-workspace-id',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isEditable: true
                };
                expect(service.checkRolePermissions(roleWithSpecificPermission, _constants.PermissionFlagType.ROLES)).toBe(true);
                expect(service.checkRolePermissions(roleWithSpecificPermission, _constants.PermissionFlagType.WORKSPACE)).toBe(false);
            });
        });
        describe('No permissions', ()=>{
            it('should deny all permissions when neither canAccessAllTools nor canUpdateAllSettings are true and no specific permissions', ()=>{
                const roleWithNoPermissions = {
                    id: 'test-role-id',
                    label: 'Test Role',
                    description: 'Test role description',
                    icon: 'IconTest',
                    canAccessAllTools: false,
                    canUpdateAllSettings: false,
                    canReadAllObjectRecords: false,
                    canUpdateAllObjectRecords: false,
                    canSoftDeleteAllObjectRecords: false,
                    canDestroyAllObjectRecords: false,
                    canBeAssignedToUsers: true,
                    canBeAssignedToAgents: true,
                    canBeAssignedToApiKeys: true,
                    rolePermissionFlags: [],
                    roleTargets: [],
                    objectPermissions: [],
                    fieldPermissions: [],
                    workspaceId: 'test-workspace-id',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isEditable: true
                };
                // Tool permissions should be denied
                expect(service.checkRolePermissions(roleWithNoPermissions, _constants.PermissionFlagType.UPLOAD_FILE)).toBe(false);
                expect(service.checkRolePermissions(roleWithNoPermissions, _constants.PermissionFlagType.AI)).toBe(false);
                // Settings permissions should be denied
                expect(service.checkRolePermissions(roleWithNoPermissions, _constants.PermissionFlagType.ROLES)).toBe(false);
                expect(service.checkRolePermissions(roleWithNoPermissions, _constants.PermissionFlagType.WORKSPACE)).toBe(false);
            });
        });
    });
});

//# sourceMappingURL=permissions.service.spec.js.map