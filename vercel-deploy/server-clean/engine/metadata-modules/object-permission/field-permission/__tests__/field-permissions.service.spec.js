"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _objectmetadataitemmock = require("../../../../api/__mocks__/object-metadata-item.mock");
const _applicationservice = require("../../../../core-modules/application/application.service");
const _fieldmetadataentity = require("../../../field-metadata/field-metadata.entity");
const _workspacemanyorallflatentitymapscacheservice = require("../../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _fieldpermissionentity = require("../field-permission.entity");
const _fieldpermissionservice = require("../field-permission.service");
const _permissionsexception = require("../../../permissions/permissions.exception");
const _roleentity = require("../../../role/role.entity");
const _workspacecacheservice = require("../../../../workspace-cache/services/workspace-cache.service");
const _workspacemigrationbuilderexception = require("../../../../workspace-manager/workspace-migration/exceptions/workspace-migration-builder-exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
const _getfieldmetadataentitymock = require("../../../../../utils/__test__/get-field-metadata-entity.mock");
const emptyFlatFieldPermissionMaps = {
    byUniversalIdentifier: {},
    universalIdentifierById: {},
    byId: {},
    idByUniversalIdentifier: {},
    universalIdentifiersByApplicationId: {}
};
describe('FieldPermissionService', ()=>{
    let service;
    let fieldPermissionsRepository;
    let roleRepository;
    let fieldMetadataRepository;
    let workspaceCacheService;
    let workspaceManyOrAllFlatEntityMapsCacheService;
    let workspaceMigrationValidateBuildAndRunService;
    let flatRoleMaps;
    const testWorkspaceId = '20202020-0000-0000-0000-000000000000';
    const testRoleId = '20202020-0000-0000-0000-000000000001';
    const testObjectMetadataId = '20202020-0000-0000-0000-000000000002';
    const testFieldMetadataId = _objectmetadataitemmock.fieldTextMock.id;
    const mockRole = {
        id: testRoleId,
        label: 'Test Role',
        description: 'Test role for unit tests',
        canUpdateAllSettings: false,
        canReadAllObjectRecords: true,
        canUpdateAllObjectRecords: false,
        canSoftDeleteAllObjectRecords: false,
        canDestroyAllObjectRecords: false,
        workspaceId: testWorkspaceId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isEditable: true
    };
    const mockRolesPermissions = {
        [testRoleId]: {
            [testObjectMetadataId]: {
                canReadObjectRecords: true,
                canUpdateObjectRecords: true,
                canSoftDeleteObjectRecords: false,
                canDestroyObjectRecords: false,
                restrictedFields: {},
                rowLevelPermissionPredicates: [],
                rowLevelPermissionPredicateGroups: []
            },
            [_objectmetadataitemmock.fieldRelationMock.objectMetadataId]: {
                canReadObjectRecords: true,
                canUpdateObjectRecords: true,
                canSoftDeleteObjectRecords: false,
                canDestroyObjectRecords: false,
                restrictedFields: {},
                rowLevelPermissionPredicates: [],
                rowLevelPermissionPredicateGroups: []
            }
        }
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _fieldpermissionservice.FieldPermissionService,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_roleentity.RoleEntity),
                    useValue: {
                        findOne: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_fieldpermissionentity.FieldPermissionEntity),
                    useValue: {
                        find: jest.fn(),
                        upsert: jest.fn(),
                        delete: jest.fn()
                    }
                },
                {
                    provide: _workspacecacheservice.WorkspaceCacheService,
                    useValue: {
                        getOrRecompute: jest.fn(),
                        invalidate: jest.fn(),
                        invalidateAndRecompute: jest.fn()
                    }
                },
                {
                    provide: _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
                    useValue: {
                        getOrRecomputeManyOrAllFlatEntityMaps: jest.fn()
                    }
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_fieldmetadataentity.FieldMetadataEntity),
                    useValue: {
                        find: jest.fn()
                    }
                },
                {
                    provide: _applicationservice.ApplicationService,
                    useValue: {
                        findWorkspaceTwentyStandardAndCustomApplicationOrThrow: jest.fn().mockResolvedValue({
                            workspaceCustomFlatApplication: {
                                id: 'app-id',
                                universalIdentifier: 'app-universal-id'
                            }
                        })
                    }
                },
                {
                    provide: _workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService,
                    useValue: {
                        validateBuildAndRunWorkspaceMigration: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_fieldpermissionservice.FieldPermissionService);
        workspaceMigrationValidateBuildAndRunService = module.get(_workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService);
        fieldPermissionsRepository = module.get((0, _typeorm.getRepositoryToken)(_fieldpermissionentity.FieldPermissionEntity));
        roleRepository = module.get((0, _typeorm.getRepositoryToken)(_roleentity.RoleEntity));
        fieldMetadataRepository = module.get((0, _typeorm.getRepositoryToken)(_fieldmetadataentity.FieldMetadataEntity));
        workspaceCacheService = module.get(_workspacecacheservice.WorkspaceCacheService);
        workspaceManyOrAllFlatEntityMapsCacheService = module.get(_workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService);
        // Setup default mocks
        roleRepository.findOne.mockResolvedValue(mockRole);
        fieldMetadataRepository.find.mockResolvedValue([
            _objectmetadataitemmock.fieldTextMock,
            _objectmetadataitemmock.fieldRelationMock
        ]);
        workspaceCacheService.getOrRecompute.mockImplementation((_workspaceId, keys)=>{
            if (keys?.includes('flatFieldPermissionMaps')) {
                return Promise.resolve({
                    flatFieldPermissionMaps: emptyFlatFieldPermissionMaps
                });
            }
            if (keys?.includes('rolesPermissions')) {
                return Promise.resolve({
                    rolesPermissions: mockRolesPermissions
                });
            }
            return Promise.resolve({});
        });
        const testFieldMetadata = (0, _getfieldmetadataentitymock.getMockFieldMetadataEntity)({
            ..._objectmetadataitemmock.fieldTextMock,
            label: 'Test Field',
            objectMetadataId: testObjectMetadataId,
            workspaceId: testWorkspaceId,
            id: testFieldMetadataId
        });
        flatRoleMaps = {
            byUniversalIdentifier: {
                [testRoleId]: {
                    id: testRoleId,
                    isEditable: true,
                    universalIdentifier: testRoleId
                }
            },
            universalIdentifierById: {
                [testRoleId]: testRoleId
            },
            byId: {},
            idByUniversalIdentifier: {},
            universalIdentifiersByApplicationId: {}
        };
        workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
            flatRoleMaps,
            flatObjectMetadataMaps: {
                byUniversalIdentifier: {
                    [testObjectMetadataId]: {
                        ..._objectmetadataitemmock.objectMetadataItemMock,
                        id: testObjectMetadataId,
                        fieldIds: [
                            testFieldMetadataId
                        ],
                        indexMetadataIds: [],
                        viewIds: [],
                        universalIdentifier: testObjectMetadataId,
                        applicationId: null
                    },
                    [_objectmetadataitemmock.fieldRelationMock.objectMetadataId]: {
                        ..._objectmetadataitemmock.objectMetadataItemMock,
                        id: _objectmetadataitemmock.fieldRelationMock.objectMetadataId,
                        fieldIds: [
                            _objectmetadataitemmock.fieldRelationMock.id
                        ],
                        indexMetadataIds: [],
                        viewIds: [],
                        universalIdentifier: _objectmetadataitemmock.fieldRelationMock.objectMetadataId,
                        applicationId: null
                    },
                    [_objectmetadataitemmock.fieldRelationMock.relationTargetObjectMetadataId]: {
                        ..._objectmetadataitemmock.objectMetadataItemMock,
                        id: _objectmetadataitemmock.fieldRelationMock.relationTargetObjectMetadataId,
                        fieldIds: [
                            _objectmetadataitemmock.fieldRelationMock.relationTargetFieldMetadataId
                        ],
                        indexMetadataIds: [],
                        viewIds: [],
                        universalIdentifier: _objectmetadataitemmock.fieldRelationMock.relationTargetObjectMetadataId,
                        applicationId: null
                    }
                },
                universalIdentifierById: {
                    [testObjectMetadataId]: testObjectMetadataId,
                    [_objectmetadataitemmock.fieldRelationMock.objectMetadataId]: _objectmetadataitemmock.fieldRelationMock.objectMetadataId,
                    [_objectmetadataitemmock.fieldRelationMock.relationTargetObjectMetadataId]: _objectmetadataitemmock.fieldRelationMock.relationTargetObjectMetadataId
                },
                universalIdentifiersByApplicationId: {}
            },
            flatFieldMetadataMaps: {
                byUniversalIdentifier: {
                    [testFieldMetadata.universalIdentifier]: testFieldMetadata,
                    [_objectmetadataitemmock.fieldRelationMock.universalIdentifier]: _objectmetadataitemmock.fieldRelationMock,
                    [_objectmetadataitemmock.fieldRelationMock.relationTargetFieldMetadataId]: {
                        ..._objectmetadataitemmock.fieldRelationMock,
                        id: _objectmetadataitemmock.fieldRelationMock.relationTargetFieldMetadataId,
                        universalIdentifier: _objectmetadataitemmock.fieldRelationMock.relationTargetFieldMetadataId
                    }
                },
                universalIdentifierById: {
                    [testFieldMetadataId]: testFieldMetadata.universalIdentifier,
                    [_objectmetadataitemmock.fieldRelationMock.id]: _objectmetadataitemmock.fieldRelationMock.universalIdentifier,
                    [_objectmetadataitemmock.fieldRelationMock.relationTargetFieldMetadataId]: _objectmetadataitemmock.fieldRelationMock.relationTargetFieldMetadataId
                },
                universalIdentifiersByApplicationId: {}
            }
        });
        fieldPermissionsRepository.find.mockResolvedValue([]);
        fieldPermissionsRepository.upsert.mockResolvedValue({});
        fieldPermissionsRepository.delete.mockResolvedValue({});
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    describe('upsertFieldPermissions', ()=>{
        const createUpsertInput = (fieldPermissions)=>({
                roleId: testRoleId,
                fieldPermissions: fieldPermissions.map((fieldPermission)=>({
                        objectMetadataId: testObjectMetadataId,
                        fieldMetadataId: testFieldMetadataId,
                        ...fieldPermission
                    }))
            });
        describe('successful cases', ()=>{
            it('should successfully upsert field permissions', async ()=>{
                workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration.mockResolvedValue({
                    status: 'success'
                });
                const input = createUpsertInput([
                    {
                        canReadFieldValue: false,
                        canUpdateFieldValue: false
                    }
                ]);
                const result = await service.upsertFieldPermissions({
                    workspaceId: testWorkspaceId,
                    input
                });
                expect(workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration).toHaveBeenCalledWith(expect.objectContaining({
                    workspaceId: testWorkspaceId,
                    isSystemBuild: false,
                    allFlatEntityOperationByMetadataName: expect.objectContaining({
                        fieldPermission: expect.objectContaining({
                            flatEntityToCreate: expect.any(Array),
                            flatEntityToUpdate: expect.any(Array),
                            flatEntityToDelete: expect.any(Array)
                        })
                    })
                }));
                expect(result).toEqual(expect.any(Array));
                expect(workspaceCacheService.invalidateAndRecompute).toHaveBeenCalledWith(testWorkspaceId, [
                    'rolesPermissions'
                ]);
            });
            it('should delete field permissions when both canReadFieldValue and canUpdateFieldValue are null', async ()=>{
                const existingUniversalId = 'existing-fp-universal-id';
                const mapsWithOneCurrentPermission = {
                    ...emptyFlatFieldPermissionMaps,
                    byUniversalIdentifier: {
                        [existingUniversalId]: {
                            id: 'existing-fp-id',
                            universalIdentifier: existingUniversalId,
                            roleUniversalIdentifier: testRoleId,
                            objectMetadataId: testObjectMetadataId,
                            fieldMetadataId: testFieldMetadataId,
                            canReadFieldValue: undefined,
                            canUpdateFieldValue: false,
                            applicationUniversalIdentifier: 'app-ui',
                            objectMetadataUniversalIdentifier: testObjectMetadataId,
                            fieldMetadataUniversalIdentifier: testFieldMetadataId,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        }
                    },
                    universalIdentifierById: {
                        'existing-fp-id': existingUniversalId
                    }
                };
                let flatFieldPermissionMapsCallCount = 0;
                workspaceCacheService.getOrRecompute.mockImplementation((_w, keys)=>{
                    if (keys?.includes('flatFieldPermissionMaps')) {
                        flatFieldPermissionMapsCallCount += 1;
                        return Promise.resolve({
                            flatFieldPermissionMaps: flatFieldPermissionMapsCallCount === 1 ? mapsWithOneCurrentPermission : emptyFlatFieldPermissionMaps
                        });
                    }
                    if (keys?.includes('rolesPermissions')) {
                        return Promise.resolve({
                            rolesPermissions: mockRolesPermissions
                        });
                    }
                    return Promise.resolve({});
                });
                workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration.mockResolvedValue({
                    status: 'success'
                });
                const input = createUpsertInput([
                    {
                        canReadFieldValue: null,
                        canUpdateFieldValue: null
                    }
                ]);
                await service.upsertFieldPermissions({
                    workspaceId: testWorkspaceId,
                    input
                });
                expect(workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration).toHaveBeenCalledWith(expect.objectContaining({
                    allFlatEntityOperationByMetadataName: expect.objectContaining({
                        fieldPermission: expect.objectContaining({
                            flatEntityToDelete: expect.arrayContaining([
                                expect.objectContaining({
                                    universalIdentifier: existingUniversalId
                                })
                            ])
                        })
                    })
                }));
            });
            it('should not delete field permissions when one value is null and the other is false', async ()=>{
                const existingUniversalId = 'existing-fp-ui-2';
                const mapsWithOneCurrent = {
                    ...emptyFlatFieldPermissionMaps,
                    byUniversalIdentifier: {
                        [existingUniversalId]: {
                            id: 'existing-fp-id-2',
                            universalIdentifier: existingUniversalId,
                            roleUniversalIdentifier: testRoleId,
                            objectMetadataId: testObjectMetadataId,
                            fieldMetadataId: testFieldMetadataId,
                            canReadFieldValue: false,
                            canUpdateFieldValue: undefined,
                            applicationUniversalIdentifier: 'app-ui',
                            objectMetadataUniversalIdentifier: testObjectMetadataId,
                            fieldMetadataUniversalIdentifier: testFieldMetadataId,
                            createdAt: new Date().toISOString(),
                            updatedAt: new Date().toISOString()
                        }
                    },
                    universalIdentifierById: {
                        'existing-fp-id-2': existingUniversalId
                    }
                };
                let flatMapsCallCount = 0;
                workspaceCacheService.getOrRecompute.mockImplementation((_w, keys)=>{
                    if (keys?.includes('flatFieldPermissionMaps')) {
                        flatMapsCallCount += 1;
                        return Promise.resolve({
                            flatFieldPermissionMaps: flatMapsCallCount === 1 ? mapsWithOneCurrent : emptyFlatFieldPermissionMaps
                        });
                    }
                    if (keys?.includes('rolesPermissions')) {
                        return Promise.resolve({
                            rolesPermissions: mockRolesPermissions
                        });
                    }
                    return Promise.resolve({});
                });
                workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration.mockResolvedValue({
                    status: 'success'
                });
                const input = createUpsertInput([
                    {
                        canUpdateFieldValue: false,
                        canReadFieldValue: null
                    }
                ]);
                await service.upsertFieldPermissions({
                    workspaceId: testWorkspaceId,
                    input
                });
                const callArg = workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration.mock.calls[0][0];
                expect(callArg.allFlatEntityOperationByMetadataName.fieldPermission.flatEntityToDelete).toHaveLength(0);
            });
        });
        describe('relation cases', ()=>{
            it('should create two field permissions when a relation field permission is created', async ()=>{
                workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration.mockResolvedValue({
                    status: 'success'
                });
                const input = createUpsertInput([
                    {
                        canReadFieldValue: false,
                        canUpdateFieldValue: false,
                        fieldMetadataId: _objectmetadataitemmock.fieldRelationMock.id,
                        objectMetadataId: _objectmetadataitemmock.fieldRelationMock.objectMetadataId
                    }
                ]);
                await service.upsertFieldPermissions({
                    workspaceId: testWorkspaceId,
                    input
                });
                const callArg = workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration.mock.calls[0][0];
                expect(callArg.allFlatEntityOperationByMetadataName.fieldPermission.flatEntityToCreate).toHaveLength(2);
            });
        });
        describe('validation errors', ()=>{
            it('should throw error when canReadFieldValue is true', async ()=>{
                const input = createUpsertInput([
                    {
                        canReadFieldValue: true,
                        canUpdateFieldValue: false
                    }
                ]);
                await expect(service.upsertFieldPermissions({
                    workspaceId: testWorkspaceId,
                    input
                })).rejects.toThrow(new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.ONLY_FIELD_RESTRICTION_ALLOWED, _permissionsexception.PermissionsExceptionCode.ONLY_FIELD_RESTRICTION_ALLOWED));
            });
            it('should throw error when canUpdateFieldValue is true', async ()=>{
                const input = createUpsertInput([
                    {
                        canReadFieldValue: false,
                        canUpdateFieldValue: true
                    }
                ]);
                await expect(service.upsertFieldPermissions({
                    workspaceId: testWorkspaceId,
                    input
                })).rejects.toThrow(new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.ONLY_FIELD_RESTRICTION_ALLOWED, _permissionsexception.PermissionsExceptionCode.ONLY_FIELD_RESTRICTION_ALLOWED));
            });
            it('should throw error when object metadata is not found', async ()=>{
                workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                    flatRoleMaps,
                    flatObjectMetadataMaps: {
                        byUniversalIdentifier: {},
                        universalIdentifierById: {},
                        universalIdentifiersByApplicationId: {}
                    },
                    flatFieldMetadataMaps: {
                        byUniversalIdentifier: {},
                        universalIdentifierById: {},
                        universalIdentifiersByApplicationId: {}
                    }
                });
                const input = createUpsertInput([
                    {
                        objectMetadataId: 'non-existent-object',
                        canReadFieldValue: false,
                        canUpdateFieldValue: false
                    }
                ]);
                await expect(service.upsertFieldPermissions({
                    workspaceId: testWorkspaceId,
                    input
                })).rejects.toThrow(new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.OBJECT_METADATA_NOT_FOUND, _permissionsexception.PermissionsExceptionCode.OBJECT_METADATA_NOT_FOUND));
            });
            it('should throw error when trying to add field permission on system object', async ()=>{
                const systemObjectMetadata = {
                    ..._objectmetadataitemmock.objectMetadataItemMock,
                    isSystem: true
                };
                workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                    flatRoleMaps,
                    flatObjectMetadataMaps: {
                        byUniversalIdentifier: {
                            [testObjectMetadataId]: {
                                ...systemObjectMetadata,
                                id: testObjectMetadataId,
                                fieldIds: [],
                                indexMetadataIds: [],
                                viewIds: [],
                                universalIdentifier: testObjectMetadataId,
                                applicationId: null
                            }
                        },
                        universalIdentifierById: {
                            [testObjectMetadataId]: testObjectMetadataId
                        },
                        universalIdentifiersByApplicationId: {}
                    },
                    flatFieldMetadataMaps: {
                        byUniversalIdentifier: {},
                        universalIdentifierById: {},
                        universalIdentifiersByApplicationId: {}
                    }
                });
                const input = createUpsertInput([
                    {
                        canReadFieldValue: false,
                        canUpdateFieldValue: false
                    }
                ]);
                await expect(service.upsertFieldPermissions({
                    workspaceId: testWorkspaceId,
                    input
                })).rejects.toThrow(new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.CANNOT_ADD_FIELD_PERMISSION_ON_SYSTEM_OBJECT, _permissionsexception.PermissionsExceptionCode.CANNOT_ADD_FIELD_PERMISSION_ON_SYSTEM_OBJECT));
            });
            it('should throw error when field metadata is not found', async ()=>{
                workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                    flatRoleMaps,
                    flatObjectMetadataMaps: {
                        byUniversalIdentifier: {
                            [testObjectMetadataId]: {
                                ..._objectmetadataitemmock.objectMetadataItemMock,
                                id: testObjectMetadataId,
                                fieldIds: [],
                                indexMetadataIds: [],
                                viewIds: [],
                                universalIdentifier: testObjectMetadataId,
                                applicationId: null
                            }
                        },
                        universalIdentifierById: {
                            [testObjectMetadataId]: testObjectMetadataId
                        },
                        universalIdentifiersByApplicationId: {}
                    },
                    flatFieldMetadataMaps: {
                        byUniversalIdentifier: {},
                        universalIdentifierById: {},
                        universalIdentifiersByApplicationId: {}
                    }
                });
                const input = createUpsertInput([
                    {
                        fieldMetadataId: 'non-existent-field',
                        canReadFieldValue: false,
                        canUpdateFieldValue: false
                    }
                ]);
                await expect(service.upsertFieldPermissions({
                    workspaceId: testWorkspaceId,
                    input
                })).rejects.toThrow(new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.FIELD_METADATA_NOT_FOUND, _permissionsexception.PermissionsExceptionCode.FIELD_METADATA_NOT_FOUND));
            });
            it('should throw error when object permission is not found', async ()=>{
                workspaceCacheService.getOrRecompute.mockImplementation((_w, keys)=>{
                    if (keys?.includes('flatFieldPermissionMaps')) {
                        return Promise.resolve({
                            flatFieldPermissionMaps: emptyFlatFieldPermissionMaps
                        });
                    }
                    if (keys?.includes('rolesPermissions')) {
                        return Promise.resolve({
                            rolesPermissions: {}
                        });
                    }
                    return Promise.resolve({});
                });
                const input = createUpsertInput([
                    {
                        canReadFieldValue: false,
                        canUpdateFieldValue: false
                    }
                ]);
                await expect(service.upsertFieldPermissions({
                    workspaceId: testWorkspaceId,
                    input
                })).rejects.toThrow(new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.OBJECT_PERMISSION_NOT_FOUND, _permissionsexception.PermissionsExceptionCode.OBJECT_PERMISSION_NOT_FOUND));
            });
        });
        describe('role validation errors', ()=>{
            it('should throw error when role is not editable', async ()=>{
                workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration.mockResolvedValue({
                    status: 'fail',
                    report: {
                        fieldPermission: [
                            {
                                code: _permissionsexception.PermissionsExceptionCode.ROLE_NOT_EDITABLE,
                                message: 'Role is not editable',
                                userFriendlyMessage: /*i18n*/ {
                                    id: "nzveUr",
                                    message: "This role cannot be modified."
                                }
                            }
                        ]
                    }
                });
                const input = createUpsertInput([
                    {
                        canReadFieldValue: false,
                        canUpdateFieldValue: false
                    }
                ]);
                await expect(service.upsertFieldPermissions({
                    workspaceId: testWorkspaceId,
                    input
                })).rejects.toThrow(_workspacemigrationbuilderexception.WorkspaceMigrationBuilderException);
            });
        });
    });
});

//# sourceMappingURL=field-permissions.service.spec.js.map