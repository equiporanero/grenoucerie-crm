"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _typeorm = require("typeorm");
const _EntityPersistExecutor = require("typeorm/persistence/EntityPersistExecutor");
const _PlainObjectToDatabaseEntityTransformer = require("typeorm/query-builder/transformer/PlainObjectToDatabaseEntityTransformer");
const _permissionsutils = require("../repository/permissions.utils");
const _ormworkspacecontextstorage = require("../storage/orm-workspace-context.storage");
const _getobjectmetadatafromentitytargetutil = require("../utils/get-object-metadata-from-entity-target.util");
const _workspaceentitymanager = require("./workspace-entity-manager");
jest.mock('src/engine/twenty-orm/repository/permissions.utils', ()=>({
        validateOperationIsPermittedOrThrow: jest.fn()
    }));
jest.mock('src/engine/twenty-orm/utils/get-object-metadata-from-entity-target.util', ()=>({
        getObjectMetadataFromEntityTarget: jest.fn()
    }));
jest.mock('src/engine/twenty-orm/utils/format-data.util', ()=>({
        formatData: jest.fn().mockReturnValue([])
    }));
jest.mock('src/engine/twenty-orm/utils/format-result.util', ()=>({
        formatResult: jest.fn().mockReturnValue([])
    }));
jest.mock('src/engine/twenty-orm/entity-manager/workspace-entity-manager', ()=>({
        ...jest.requireActual('src/engine/twenty-orm/entity-manager/workspace-entity-manager')
    }));
const mockedWorkspaceUpdateQueryBuilder = {
    set: jest.fn().mockImplementation(()=>({
            where: jest.fn().mockReturnThis(),
            whereInIds: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValue({
                affected: 1,
                raw: [],
                generatedMaps: []
            }),
            returning: jest.fn().mockReturnThis()
        })),
    execute: jest.fn().mockResolvedValue({
        affected: 1,
        raw: [],
        generatedMaps: []
    })
};
jest.mock('../repository/workspace-select-query-builder', ()=>({
        WorkspaceSelectQueryBuilder: jest.fn().mockImplementation(()=>({
                where: jest.fn().mockReturnThis(),
                getMany: jest.fn().mockResolvedValue([]),
                getOne: jest.fn().mockResolvedValue(null),
                getManyAndCount: jest.fn().mockResolvedValue([
                    [],
                    0
                ]),
                execute: jest.fn().mockResolvedValue({
                    affected: 1,
                    raw: [],
                    generatedMaps: []
                }),
                setFindOptions: jest.fn().mockReturnThis(),
                returning: jest.fn().mockReturnThis(),
                update: jest.fn().mockReturnValue(mockedWorkspaceUpdateQueryBuilder),
                insert: jest.fn().mockReturnThis()
            }))
    }));
describe('WorkspaceEntityManager', ()=>{
    let entityManager;
    let mockDataSource;
    let mockPermissionOptions;
    let mockInternalContext;
    let mockWorkspaceContext;
    beforeEach(()=>{
        const mockFlatObjectMetadata = {
            id: 'test-entity-id',
            nameSingular: 'test-entity',
            namePlural: 'test-entities',
            labelSingular: 'Test Entity',
            labelPlural: 'Test Entities',
            workspaceId: 'test-workspace-id',
            icon: 'test-icon',
            color: null,
            isCustom: false,
            isRemote: false,
            isAuditLogged: false,
            isSearchable: false,
            isSystem: false,
            isActive: true,
            targetTableName: 'test_entity',
            fieldIds: [
                'field-id'
            ],
            indexMetadataIds: [],
            objectPermissionIds: [],
            fieldPermissionIds: [],
            viewIds: [],
            universalIdentifier: 'test-entity-id',
            description: null,
            imageIdentifierFieldMetadataId: null,
            labelIdentifierFieldMetadataId: null,
            shortcut: null,
            standardOverrides: null,
            applicationId: 'test-application-id',
            isLabelSyncedWithName: false,
            isUIReadOnly: false,
            duplicateCriteria: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            applicationUniversalIdentifier: 'test-application-id',
            fieldUniversalIdentifiers: [
                'field-id'
            ],
            objectPermissionUniversalIdentifiers: [],
            fieldPermissionUniversalIdentifiers: [],
            viewUniversalIdentifiers: [],
            indexMetadataUniversalIdentifiers: [],
            labelIdentifierFieldMetadataUniversalIdentifier: null,
            imageIdentifierFieldMetadataUniversalIdentifier: null
        };
        _getobjectmetadatafromentitytargetutil.getObjectMetadataFromEntityTarget.mockReturnValue(mockFlatObjectMetadata);
        const mockFlatFieldMetadata = {
            id: 'field-id',
            type: 'TEXT',
            name: 'fieldName',
            label: 'Field Name',
            objectMetadataId: 'test-entity-id',
            isNullable: true,
            isLabelSyncedWithName: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            universalIdentifier: 'field-id',
            defaultValue: null,
            description: null,
            icon: null,
            isActive: true,
            isCustom: false,
            isSystem: false,
            isUIReadOnly: false,
            isUnique: false,
            options: null,
            settings: null,
            standardOverrides: null,
            workspaceId: 'test-workspace-id',
            viewFieldIds: [],
            viewFilterIds: [],
            fieldPermissionIds: [],
            kanbanAggregateOperationViewIds: [],
            calendarViewIds: [],
            mainGroupByFieldMetadataViewIds: [],
            relationTargetFieldMetadataId: null,
            relationTargetObjectMetadataId: null,
            morphId: null,
            applicationId: 'application-id',
            applicationUniversalIdentifier: 'application-id',
            objectMetadataUniversalIdentifier: 'test-entity-id',
            relationTargetObjectMetadataUniversalIdentifier: null,
            relationTargetFieldMetadataUniversalIdentifier: null,
            viewFilterUniversalIdentifiers: [],
            viewFieldUniversalIdentifiers: [],
            kanbanAggregateOperationViewUniversalIdentifiers: [],
            calendarViewUniversalIdentifiers: [],
            mainGroupByFieldMetadataViewUniversalIdentifiers: [],
            fieldPermissionUniversalIdentifiers: [],
            viewSortIds: [],
            viewSortUniversalIdentifiers: [],
            universalSettings: null
        };
        const flatObjectMetadataMaps = {
            byUniversalIdentifier: {
                'test-entity-id': mockFlatObjectMetadata
            },
            universalIdentifierById: {
                'test-entity-id': 'test-entity-id'
            },
            universalIdentifiersByApplicationId: {}
        };
        const flatFieldMetadataMaps = {
            byUniversalIdentifier: {
                'field-id': mockFlatFieldMetadata
            },
            universalIdentifierById: {
                'field-id': 'field-id'
            },
            universalIdentifiersByApplicationId: {}
        };
        mockInternalContext = {
            workspaceId: 'test-workspace-id',
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            flatIndexMaps: {
                byUniversalIdentifier: {},
                universalIdentifierById: {},
                universalIdentifiersByApplicationId: {}
            },
            flatRowLevelPermissionPredicateMaps: {
                byUniversalIdentifier: {},
                universalIdentifierById: {},
                universalIdentifiersByApplicationId: {}
            },
            flatRowLevelPermissionPredicateGroupMaps: {
                byUniversalIdentifier: {},
                universalIdentifierById: {},
                universalIdentifiersByApplicationId: {}
            },
            objectIdByNameSingular: {
                'test-entity': 'test-entity-id'
            },
            featureFlagsMap: {
                IS_UNIQUE_INDEXES_ENABLED: false,
                IS_JSON_FILTER_ENABLED: false,
                IS_MARKETPLACE_SETTING_TAB_VISIBLE: false,
                IS_PUBLIC_DOMAIN_ENABLED: false,
                IS_EMAIL_GROUP_ENABLED: false,
                IS_JUNCTION_RELATIONS_ENABLED: false,
                IS_REST_METADATA_API_NEW_FORMAT_DIRECT: false
            },
            userWorkspaceRoleMap: {},
            eventEmitterService: {
                emitMutationEvent: jest.fn(),
                emitDatabaseBatchEvent: jest.fn(),
                emitCustomBatchEvent: jest.fn()
            },
            coreDataSource: {
                getRepository: jest.fn(()=>({
                        find: jest.fn(),
                        softDelete: jest.fn()
                    }))
            }
        };
        mockDataSource = {
            featureFlagMap: {
                IS_UNIQUE_INDEXES_ENABLED: false,
                IS_JSON_FILTER_ENABLED: false,
                IS_PUBLIC_DOMAIN_ENABLED: false
            },
            permissionsPerRoleId: {},
            eventEmitterService: mockInternalContext.eventEmitterService,
            coreDataSource: mockInternalContext.coreDataSource
        };
        mockPermissionOptions = {
            shouldBypassPermissionChecks: false,
            objectRecordsPermissions: {
                'test-entity': {
                    canReadObjectRecords: true,
                    canUpdateObjectRecords: false,
                    canSoftDeleteObjectRecords: false,
                    canDestroyObjectRecords: false,
                    restrictedFields: {},
                    rowLevelPermissionPredicates: [],
                    rowLevelPermissionPredicateGroups: []
                }
            }
        };
        const mockAuthContext = {
            user: {
                id: 'user-id'
            },
            workspace: {
                id: 'test-workspace-id'
            },
            workspaceMemberId: 'workspace-member-id',
            userWorkspaceId: 'user-workspace-id',
            apiKey: null
        };
        mockWorkspaceContext = {
            authContext: mockAuthContext,
            flatObjectMetadataMaps,
            flatFieldMetadataMaps,
            flatIndexMaps: mockInternalContext.flatIndexMaps,
            flatRowLevelPermissionPredicateMaps: mockInternalContext.flatRowLevelPermissionPredicateMaps,
            flatRowLevelPermissionPredicateGroupMaps: mockInternalContext.flatRowLevelPermissionPredicateGroupMaps,
            objectIdByNameSingular: mockInternalContext.objectIdByNameSingular,
            featureFlagsMap: mockInternalContext.featureFlagsMap,
            permissionsPerRoleId: mockDataSource.permissionsPerRoleId,
            entityMetadatas: [],
            userWorkspaceRoleMap: {
                'user-workspace-id': 'role-id'
            },
            apiKeyRoleMap: {}
        };
        (0, _ormworkspacecontextstorage.setWorkspaceContext)(mockWorkspaceContext);
        // Mock TypeORM connection methods
        const mockWorkspaceDataSource = {
            getMetadata: jest.fn().mockReturnValue({
                name: 'test-entity',
                columns: [],
                relations: [],
                findInheritanceMetadata: jest.fn(),
                findColumnWithPropertyPath: jest.fn()
            }),
            eventEmitterService: mockInternalContext.eventEmitterService,
            coreDataSource: mockInternalContext.coreDataSource,
            createQueryBuilder: jest.fn().mockReturnValue({
                delete: jest.fn().mockReturnThis(),
                from: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValue({
                    affected: 1,
                    raw: [],
                    generatedMaps: []
                }),
                getMany: jest.fn().mockResolvedValue([]),
                getOne: jest.fn().mockResolvedValue(null),
                getManyAndCount: jest.fn().mockResolvedValue([
                    [],
                    0
                ]),
                update: jest.fn().mockReturnThis(),
                softDelete: jest.fn().mockReturnThis(),
                restore: jest.fn().mockReturnThis()
            }),
            createQueryRunner: jest.fn().mockReturnValue({
                connect: jest.fn(),
                startTransaction: jest.fn(),
                commitTransaction: jest.fn(),
                rollbackTransaction: jest.fn(),
                release: jest.fn(),
                clearTable: jest.fn()
            }),
            createQueryRunnerForEntityPersistExecutor: jest.fn().mockReturnValue({
                connect: jest.fn(),
                startTransaction: jest.fn(),
                commitTransaction: jest.fn(),
                rollbackTransaction: jest.fn(),
                release: jest.fn(),
                clearTable: jest.fn()
            })
        };
        entityManager = new _workspaceentitymanager.WorkspaceEntityManager(mockDataSource);
        Object.defineProperty(entityManager, 'connection', {
            get: ()=>mockWorkspaceDataSource
        });
        jest.spyOn(entityManager, 'validatePermissions');
        jest.spyOn(entityManager, 'createQueryBuilder');
        jest.spyOn(entityManager, 'getFormattedResultWithoutNonReadableFields').mockImplementation(({ formattedResult })=>formattedResult);
        jest.spyOn(entityManager, 'extractTargetNameSingularFromEntityTarget').mockImplementation((entityName)=>{
            return entityName;
        });
        // Mock typeORM's EntityManager methods
        jest.spyOn(_typeorm.EntityManager.prototype, 'save').mockImplementation(()=>Promise.resolve({}));
        jest.spyOn(_typeorm.EntityManager.prototype, 'update').mockImplementation(()=>Promise.resolve({
                affected: 1,
                raw: [],
                generatedMaps: []
            }));
        jest.spyOn(_typeorm.EntityManager.prototype, 'restore').mockImplementation(()=>Promise.resolve({
                affected: 1,
                raw: [],
                generatedMaps: []
            }));
        jest.spyOn(_typeorm.EntityManager.prototype, 'clear').mockImplementation(()=>Promise.resolve());
        jest.spyOn(_typeorm.EntityManager.prototype, 'preload').mockImplementation(()=>Promise.resolve({}));
        jest.spyOn(_EntityPersistExecutor.EntityPersistExecutor.prototype, 'execute').mockImplementation(()=>Promise.resolve());
        jest.spyOn(_PlainObjectToDatabaseEntityTransformer.PlainObjectToDatabaseEntityTransformer.prototype, 'transform').mockImplementation(()=>Promise.resolve({}));
        // Mock metadata methods
        const mockMetadata = {
            hasAllPrimaryKeys: jest.fn().mockReturnValue(true),
            columns: [],
            relations: [],
            findInheritanceMetadata: jest.fn(),
            findColumnWithPropertyPath: jest.fn()
        };
        // Update mockWorkspaceDataSource to include metadata
        mockWorkspaceDataSource.getMetadata = jest.fn().mockReturnValue(mockMetadata);
        // Reset the mock before each test
        jest.clearAllMocks();
    });
    describe('Query Method', ()=>{
        it('should call validatePermissions and validateOperationIsPermittedOrThrow for find', async ()=>{
            await (0, _ormworkspacecontextstorage.withWorkspaceContext)(mockWorkspaceContext, ()=>entityManager.find('test-entity', {}, mockPermissionOptions));
            expect(entityManager.createQueryBuilder).toHaveBeenCalledWith('test-entity', undefined, undefined, mockPermissionOptions);
        });
        it('should throw error for query', async ()=>{
            expect(()=>entityManager.query('SELECT * FROM test')).toThrow('Method not allowed.');
        });
    });
    describe('Save Methods', ()=>{
        it('should call validatePermissions and validateOperationIsPermittedOrThrow for save', async ()=>{
            await (0, _ormworkspacecontextstorage.withWorkspaceContext)(mockWorkspaceContext, ()=>entityManager.save('test-entity', {}, {
                    reload: false
                }, mockPermissionOptions));
            expect(entityManager['validatePermissions']).toHaveBeenCalledWith({
                target: 'test-entity',
                operationType: 'update',
                permissionOptions: mockPermissionOptions,
                selectedColumns: [],
                updatedColumns: []
            });
            expect(_permissionsutils.validateOperationIsPermittedOrThrow).toHaveBeenCalledWith({
                entityName: 'test-entity',
                operationType: 'update',
                flatObjectMetadataMaps: mockInternalContext.flatObjectMetadataMaps,
                flatFieldMetadataMaps: mockInternalContext.flatFieldMetadataMaps,
                objectIdByNameSingular: mockInternalContext.objectIdByNameSingular,
                objectsPermissions: mockPermissionOptions.objectRecordsPermissions,
                selectedColumns: [],
                allFieldsSelected: false,
                updatedColumns: []
            });
        });
    });
    describe('Update Methods', ()=>{
        it('should call createQueryBuilder with permissionOptions for update', async ()=>{
            await (0, _ormworkspacecontextstorage.withWorkspaceContext)(mockWorkspaceContext, ()=>entityManager.update('test-entity', {}, {}, mockPermissionOptions));
            expect(entityManager['createQueryBuilder']).toHaveBeenCalledWith('test-entity', undefined, undefined, mockPermissionOptions);
        });
    });
    describe('Other Methods', ()=>{
        it('should call validatePermissions and validateOperationIsPermittedOrThrow for clear', async ()=>{
            await (0, _ormworkspacecontextstorage.withWorkspaceContext)(mockWorkspaceContext, ()=>entityManager.clear('test-entity', mockPermissionOptions));
            expect(entityManager['validatePermissions']).toHaveBeenCalledWith({
                target: 'test-entity',
                operationType: 'delete',
                permissionOptions: mockPermissionOptions,
                selectedColumns: []
            });
            expect(_permissionsutils.validateOperationIsPermittedOrThrow).toHaveBeenCalledWith({
                entityName: 'test-entity',
                operationType: 'delete',
                flatObjectMetadataMaps: mockInternalContext.flatObjectMetadataMaps,
                flatFieldMetadataMaps: mockInternalContext.flatFieldMetadataMaps,
                objectIdByNameSingular: mockInternalContext.objectIdByNameSingular,
                objectsPermissions: mockPermissionOptions.objectRecordsPermissions,
                selectedColumns: [],
                allFieldsSelected: false,
                updatedColumns: []
            });
        });
    });
});

//# sourceMappingURL=workspace-entity-manager.spec.js.map