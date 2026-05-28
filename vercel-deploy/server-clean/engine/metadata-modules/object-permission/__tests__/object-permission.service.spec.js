"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _applicationservice = require("../../../core-modules/application/application.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _objectpermissionservice = require("../object-permission.service");
const _permissionsexception = require("../../permissions/permissions.exception");
const _workspacemigrationvalidatebuildandrunservice = require("../../../workspace-manager/workspace-migration/services/workspace-migration-validate-build-and-run-service");
const createMockFlatRoleMaps = (roleId, isEditable)=>({
        byUniversalIdentifier: {
            [roleId]: {
                id: roleId,
                universalIdentifier: roleId,
                isEditable,
                canReadAllObjectRecords: true,
                canUpdateAllObjectRecords: true,
                canSoftDeleteAllObjectRecords: false,
                canDestroyAllObjectRecords: false
            }
        },
        universalIdentifierById: {
            [roleId]: roleId
        },
        byId: {
            [roleId]: {
                id: roleId,
                universalIdentifier: roleId,
                isEditable
            }
        }
    });
const createMockFlatObjectMetadataMaps = (objectMetadataId, isSystem)=>({
        byUniversalIdentifier: {
            [objectMetadataId]: {
                id: objectMetadataId,
                universalIdentifier: objectMetadataId,
                isSystem
            }
        },
        universalIdentifierById: {
            [objectMetadataId]: objectMetadataId
        },
        byId: {
            [objectMetadataId]: {
                id: objectMetadataId,
                isSystem
            }
        }
    });
describe('ObjectPermissionService', ()=>{
    let service;
    let workspaceManyOrAllFlatEntityMapsCacheService;
    let workspaceMigrationValidateBuildAndRunService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _objectpermissionservice.ObjectPermissionService,
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
                    provide: _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
                    useValue: {
                        getOrRecomputeManyOrAllFlatEntityMaps: jest.fn()
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
        service = module.get(_objectpermissionservice.ObjectPermissionService);
        workspaceManyOrAllFlatEntityMapsCacheService = module.get(_workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService);
        workspaceMigrationValidateBuildAndRunService = module.get(_workspacemigrationvalidatebuildandrunservice.WorkspaceMigrationValidateBuildAndRunService);
    });
    describe('upsertObjectPermissions', ()=>{
        const workspaceId = 'workspace-id';
        const roleId = 'role-id';
        const systemObjectMetadataId = 'system-object-id';
        const customObjectMetadataId = 'custom-object-id';
        it('should throw PermissionsException when trying to add object permission on system object', async ()=>{
            const input = {
                roleId,
                objectPermissions: [
                    {
                        objectMetadataId: systemObjectMetadataId,
                        canReadObjectRecords: true,
                        canUpdateObjectRecords: false,
                        canSoftDeleteObjectRecords: false,
                        canDestroyObjectRecords: false
                    }
                ]
            };
            workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectPermissionMaps: {
                    byUniversalIdentifier: {},
                    universalIdentifierById: {},
                    byId: {}
                },
                flatRoleMaps: createMockFlatRoleMaps(roleId, true),
                flatObjectMetadataMaps: createMockFlatObjectMetadataMaps(systemObjectMetadataId, true)
            });
            await expect(service.upsertObjectPermissions({
                workspaceId,
                input
            })).rejects.toThrow(new _permissionsexception.PermissionsException(_permissionsexception.PermissionsExceptionMessage.CANNOT_ADD_OBJECT_PERMISSION_ON_SYSTEM_OBJECT, _permissionsexception.PermissionsExceptionCode.CANNOT_ADD_OBJECT_PERMISSION_ON_SYSTEM_OBJECT));
            expect(workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration).not.toHaveBeenCalled();
        });
        it('should successfully create object permission for custom (non-system) object', async ()=>{
            const input = {
                roleId,
                objectPermissions: [
                    {
                        objectMetadataId: customObjectMetadataId,
                        canReadObjectRecords: true,
                        canUpdateObjectRecords: true,
                        canSoftDeleteObjectRecords: false,
                        canDestroyObjectRecords: false
                    }
                ]
            };
            const permissionUniversalId = 'permission-universal-id';
            const freshFlatObjectPermission = {
                id: 'permission-id',
                universalIdentifier: permissionUniversalId,
                roleId,
                roleUniversalIdentifier: roleId,
                objectMetadataId: customObjectMetadataId,
                objectMetadataUniversalIdentifier: customObjectMetadataId,
                canReadObjectRecords: true,
                canUpdateObjectRecords: true,
                canSoftDeleteObjectRecords: false,
                canDestroyObjectRecords: false
            };
            workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValueOnce({
                flatObjectPermissionMaps: {
                    byUniversalIdentifier: {},
                    universalIdentifierById: {},
                    byId: {}
                },
                flatRoleMaps: createMockFlatRoleMaps(roleId, true),
                flatObjectMetadataMaps: createMockFlatObjectMetadataMaps(customObjectMetadataId, false)
            }).mockResolvedValueOnce({
                flatObjectPermissionMaps: {
                    byUniversalIdentifier: {
                        [permissionUniversalId]: freshFlatObjectPermission
                    },
                    universalIdentifierById: {
                        [freshFlatObjectPermission.id]: permissionUniversalId
                    },
                    byId: {
                        [freshFlatObjectPermission.id]: freshFlatObjectPermission
                    }
                }
            });
            workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration.mockResolvedValue({
                status: 'success'
            });
            const result = await service.upsertObjectPermissions({
                workspaceId,
                input
            });
            expect(result).toHaveLength(1);
            expect(result[0]).toMatchObject({
                objectMetadataId: customObjectMetadataId,
                canReadObjectRecords: true,
                canUpdateObjectRecords: true,
                canSoftDeleteObjectRecords: false,
                canDestroyObjectRecords: false
            });
            expect(workspaceMigrationValidateBuildAndRunService.validateBuildAndRunWorkspaceMigration).toHaveBeenCalled();
        });
        it('should throw PermissionsException when object metadata is not found', async ()=>{
            const input = {
                roleId,
                objectPermissions: [
                    {
                        objectMetadataId: 'non-existent-object-id',
                        canReadObjectRecords: true,
                        canUpdateObjectRecords: false,
                        canSoftDeleteObjectRecords: false,
                        canDestroyObjectRecords: false
                    }
                ]
            };
            workspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps.mockResolvedValue({
                flatObjectPermissionMaps: {
                    byUniversalIdentifier: {},
                    universalIdentifierById: {},
                    byId: {}
                },
                flatRoleMaps: createMockFlatRoleMaps(roleId, true),
                flatObjectMetadataMaps: {
                    byUniversalIdentifier: {},
                    universalIdentifierById: {},
                    byId: {}
                }
            });
            await expect(service.upsertObjectPermissions({
                workspaceId,
                input
            })).rejects.toThrow(new _permissionsexception.PermissionsException('Object metadata id not found', _permissionsexception.PermissionsExceptionCode.OBJECT_METADATA_NOT_FOUND));
        });
    });
});

//# sourceMappingURL=object-permission.service.spec.js.map