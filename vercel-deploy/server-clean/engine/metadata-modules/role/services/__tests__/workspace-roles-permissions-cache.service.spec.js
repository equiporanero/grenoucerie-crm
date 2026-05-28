"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _constants = require("twenty-shared/constants");
const _metadata = require("twenty-shared/metadata");
const _objectmetadataentity = require("../../../object-metadata/object-metadata.entity");
const _fieldpermissionentity = require("../../../object-permission/field-permission/field-permission.entity");
const _objectpermissionentity = require("../../../object-permission/object-permission.entity");
const _rolepermissionflagentity = require("../../../role-permission-flag/role-permission-flag.entity");
const _roleentity = require("../../role.entity");
const _workspacerolespermissionscacheservice = require("../workspace-roles-permissions-cache.service");
const _rowlevelpermissionpredicategroupentity = require("../../../row-level-permission-predicate/entities/row-level-permission-predicate-group.entity");
const _rowlevelpermissionpredicateentity = require("../../../row-level-permission-predicate/entities/row-level-permission-predicate.entity");
const WORKSPACE_ID = '20202020-0000-4000-8000-000000000000';
const ROLE_ID = '11111111-1111-4111-8111-111111111111';
const WORKSPACE_MEMBER_OBJECT_METADATA_ID = '22222222-2222-4222-8222-222222222222';
const WORKFLOW_OBJECT_METADATA_ID = '33333333-3333-4333-8333-333333333333';
const PERSON_OBJECT_METADATA_ID = '44444444-4444-4444-8444-444444444444';
const createBaseRole = (overrides)=>({
        id: ROLE_ID,
        label: 'Test role',
        workspaceId: WORKSPACE_ID,
        canUpdateAllSettings: false,
        canAccessAllTools: false,
        canReadAllObjectRecords: false,
        canUpdateAllObjectRecords: false,
        canSoftDeleteAllObjectRecords: false,
        canDestroyAllObjectRecords: false,
        description: null,
        icon: null,
        isEditable: true,
        canBeAssignedToUsers: true,
        canBeAssignedToAgents: true,
        canBeAssignedToApiKeys: true,
        fieldPermissions: [],
        rowLevelPermissionPredicates: [],
        rowLevelPermissionPredicateGroups: [],
        ...overrides
    });
describe('WorkspaceRolesPermissionsCacheService', ()=>{
    let service;
    let roleRepository;
    let objectMetadataRepository;
    let objectPermissionRepository;
    let rolePermissionFlagRepository;
    const workspaceObjectMetadataFixture = [
        {
            id: WORKSPACE_MEMBER_OBJECT_METADATA_ID,
            isSystem: true,
            universalIdentifier: _metadata.STANDARD_OBJECTS.workspaceMember.universalIdentifier,
            labelIdentifierFieldMetadataId: null
        },
        {
            id: WORKFLOW_OBJECT_METADATA_ID,
            isSystem: true,
            universalIdentifier: _metadata.STANDARD_OBJECTS.workflow.universalIdentifier,
            labelIdentifierFieldMetadataId: null
        },
        {
            id: PERSON_OBJECT_METADATA_ID,
            isSystem: false,
            universalIdentifier: _metadata.STANDARD_OBJECTS.person.universalIdentifier,
            labelIdentifierFieldMetadataId: null
        }
    ];
    beforeEach(async ()=>{
        roleRepository = {
            find: jest.fn()
        };
        objectMetadataRepository = {
            find: jest.fn().mockResolvedValue(workspaceObjectMetadataFixture)
        };
        objectPermissionRepository = {
            find: jest.fn().mockResolvedValue([])
        };
        rolePermissionFlagRepository = {
            find: jest.fn().mockResolvedValue([])
        };
        const fieldPermissionRepository = {
            find: jest.fn().mockResolvedValue([])
        };
        const rowLevelPermissionPredicateRepository = {
            find: jest.fn().mockResolvedValue([])
        };
        const rowLevelPermissionPredicateGroupRepository = {
            find: jest.fn().mockResolvedValue([])
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _workspacerolespermissionscacheservice.WorkspaceRolesPermissionsCacheService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_objectmetadataentity.ObjectMetadataEntity),
                    useValue: objectMetadataRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_roleentity.RoleEntity),
                    useValue: roleRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_objectpermissionentity.ObjectPermissionEntity),
                    useValue: objectPermissionRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_rolepermissionflagentity.RolePermissionFlagEntity),
                    useValue: rolePermissionFlagRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_fieldpermissionentity.FieldPermissionEntity),
                    useValue: fieldPermissionRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_rowlevelpermissionpredicateentity.RowLevelPermissionPredicateEntity),
                    useValue: rowLevelPermissionPredicateRepository
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity),
                    useValue: rowLevelPermissionPredicateGroupRepository
                }
            ]
        }).compile();
        service = module.get(_workspacerolespermissionscacheservice.WorkspaceRolesPermissionsCacheService);
    });
    describe('workspaceMember object', ()=>{
        it('should deny all record permissions when role has neither workspace members access nor update-all-settings', async ()=>{
            roleRepository.find.mockResolvedValue([
                createBaseRole({
                    rolePermissionFlags: [],
                    objectPermissions: []
                })
            ]);
            const result = await service.computeForCache(WORKSPACE_ID);
            const workspaceMemberPermissions = result[ROLE_ID][WORKSPACE_MEMBER_OBJECT_METADATA_ID];
            expect(workspaceMemberPermissions.canReadObjectRecords).toBe(true);
            expect(workspaceMemberPermissions.canUpdateObjectRecords).toBe(false);
            expect(workspaceMemberPermissions.canSoftDeleteObjectRecords).toBe(false);
            expect(workspaceMemberPermissions.canDestroyObjectRecords).toBe(false);
        });
        it('should grant all record permissions when role has WORKSPACE_MEMBERS permission flag', async ()=>{
            rolePermissionFlagRepository.find.mockResolvedValue([
                {
                    roleId: ROLE_ID,
                    permissionFlag: {
                        key: _constants.PermissionFlagType.WORKSPACE_MEMBERS,
                        universalIdentifier: _constants.SystemPermissionFlag.WORKSPACE_MEMBERS
                    }
                }
            ]);
            roleRepository.find.mockResolvedValue([
                createBaseRole({
                    rolePermissionFlags: [],
                    objectPermissions: []
                })
            ]);
            const result = await service.computeForCache(WORKSPACE_ID);
            const workspaceMemberPermissions = result[ROLE_ID][WORKSPACE_MEMBER_OBJECT_METADATA_ID];
            expect(workspaceMemberPermissions.canReadObjectRecords).toBe(true);
            expect(workspaceMemberPermissions.canUpdateObjectRecords).toBe(true);
            expect(workspaceMemberPermissions.canSoftDeleteObjectRecords).toBe(true);
            expect(workspaceMemberPermissions.canDestroyObjectRecords).toBe(true);
        });
        it('should grant all record permissions when role has canUpdateAllSettings', async ()=>{
            roleRepository.find.mockResolvedValue([
                createBaseRole({
                    canUpdateAllSettings: true,
                    rolePermissionFlags: [],
                    objectPermissions: []
                })
            ]);
            const result = await service.computeForCache(WORKSPACE_ID);
            const workspaceMemberPermissions = result[ROLE_ID][WORKSPACE_MEMBER_OBJECT_METADATA_ID];
            expect(workspaceMemberPermissions.canReadObjectRecords).toBe(true);
            expect(workspaceMemberPermissions.canUpdateObjectRecords).toBe(true);
        });
    });
    describe('workflow object', ()=>{
        it('should deny all record permissions when role has neither workflows access nor update-all-settings', async ()=>{
            roleRepository.find.mockResolvedValue([
                createBaseRole({
                    rolePermissionFlags: [],
                    objectPermissions: []
                })
            ]);
            const result = await service.computeForCache(WORKSPACE_ID);
            const workflowPermissions = result[ROLE_ID][WORKFLOW_OBJECT_METADATA_ID];
            expect(workflowPermissions.canReadObjectRecords).toBe(false);
            expect(workflowPermissions.canUpdateObjectRecords).toBe(false);
            expect(workflowPermissions.canSoftDeleteObjectRecords).toBe(false);
            expect(workflowPermissions.canDestroyObjectRecords).toBe(false);
        });
        it('should grant all record permissions when role has WORKFLOWS permission flag', async ()=>{
            rolePermissionFlagRepository.find.mockResolvedValue([
                {
                    roleId: ROLE_ID,
                    permissionFlag: {
                        key: _constants.PermissionFlagType.WORKFLOWS,
                        universalIdentifier: _constants.SystemPermissionFlag.WORKFLOWS
                    }
                }
            ]);
            roleRepository.find.mockResolvedValue([
                createBaseRole({
                    rolePermissionFlags: [],
                    objectPermissions: []
                })
            ]);
            const result = await service.computeForCache(WORKSPACE_ID);
            const workflowPermissions = result[ROLE_ID][WORKFLOW_OBJECT_METADATA_ID];
            expect(workflowPermissions.canReadObjectRecords).toBe(true);
            expect(workflowPermissions.canUpdateObjectRecords).toBe(true);
            expect(workflowPermissions.canSoftDeleteObjectRecords).toBe(true);
            expect(workflowPermissions.canDestroyObjectRecords).toBe(true);
        });
    });
    describe('regular object (person)', ()=>{
        it('should apply object permission overrides when object is not system', async ()=>{
            objectPermissionRepository.find.mockResolvedValue([
                {
                    roleId: ROLE_ID,
                    objectMetadataId: PERSON_OBJECT_METADATA_ID,
                    canReadObjectRecords: true,
                    canUpdateObjectRecords: false,
                    canSoftDeleteObjectRecords: false,
                    canDestroyObjectRecords: false
                }
            ]);
            roleRepository.find.mockResolvedValue([
                createBaseRole({
                    rolePermissionFlags: [],
                    objectPermissions: []
                })
            ]);
            const result = await service.computeForCache(WORKSPACE_ID);
            const personPermissions = result[ROLE_ID][PERSON_OBJECT_METADATA_ID];
            expect(personPermissions.canReadObjectRecords).toBe(true);
            expect(personPermissions.canUpdateObjectRecords).toBe(false);
            expect(personPermissions.canSoftDeleteObjectRecords).toBe(false);
            expect(personPermissions.canDestroyObjectRecords).toBe(false);
        });
        it('should use role-wide CRUD defaults when no object permission row exists', async ()=>{
            roleRepository.find.mockResolvedValue([
                createBaseRole({
                    canReadAllObjectRecords: true,
                    canUpdateAllObjectRecords: true,
                    canSoftDeleteAllObjectRecords: true,
                    canDestroyAllObjectRecords: true,
                    rolePermissionFlags: [],
                    objectPermissions: []
                })
            ]);
            const result = await service.computeForCache(WORKSPACE_ID);
            const personPermissions = result[ROLE_ID][PERSON_OBJECT_METADATA_ID];
            expect(personPermissions.canReadObjectRecords).toBe(true);
            expect(personPermissions.canUpdateObjectRecords).toBe(true);
            expect(personPermissions.canSoftDeleteObjectRecords).toBe(true);
            expect(personPermissions.canDestroyObjectRecords).toBe(true);
        });
    });
});

//# sourceMappingURL=workspace-roles-permissions-cache.service.spec.js.map