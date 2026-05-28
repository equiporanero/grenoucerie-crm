"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _processnestedrelationshelper = require("../../../api/common/common-nested-relations-processor/process-nested-relations.helper");
const _commonselectfieldshelper = require("../../../api/common/common-select-fields/common-select-fields-helper");
const _createemptyflatentitymapsconstant = require("../../../metadata-modules/flat-entity/constant/create-empty-flat-entity-maps.constant");
const _workspacemanyorallflatentitymapscacheservice = require("../../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _addflatentitytoflatentitymapsorthrowutil = require("../../../metadata-modules/flat-entity/utils/add-flat-entity-to-flat-entity-maps-or-throw.util");
const _companyflatfieldsmock = require("../../../metadata-modules/flat-field-metadata/__mocks__/company-flat-fields.mock");
const _getflatfieldmetadatamock = require("../../../metadata-modules/flat-field-metadata/__mocks__/get-flat-field-metadata.mock");
const _companyflatobjectmock = require("../../../metadata-modules/flat-object-metadata/__mocks__/company-flat-object.mock");
const _eventstreamservice = require("../../event-stream.service");
const _subscriptionservice = require("../../subscription.service");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
const _objectrecordeventpublisher = require("../object-record-event-publisher");
jest.mock('src/engine/twenty-orm/utils/build-row-level-permission-record-filter.util', ()=>({
        buildRowLevelPermissionRecordFilter: jest.fn()
    }));
jest.mock('src/engine/twenty-orm/utils/is-record-matching-rls-row-level-permission-predicate.util', ()=>({
        isRecordMatchingRLSRowLevelPermissionPredicate: jest.fn()
    }));
const { buildRowLevelPermissionRecordFilter } = require('src/engine/twenty-orm/utils/build-row-level-permission-record-filter.util');
const { isRecordMatchingRLSRowLevelPermissionPredicate } = require('src/engine/twenty-orm/utils/is-record-matching-rls-row-level-permission-predicate.util');
const buildFlatFieldMetadataMaps = (fields)=>fields.reduce((maps, field)=>(0, _addflatentitytoflatentitymapsorthrowutil.addFlatEntityToFlatEntityMapsOrThrow)({
            flatEntity: field,
            flatEntityMaps: maps
        }), (0, _createemptyflatentitymapsconstant.createEmptyFlatEntityMaps)());
describe('ObjectRecordEventPublisher', ()=>{
    let service;
    let mockSubscriptionService;
    let mockEventStreamService;
    let mockWorkspaceCacheService;
    let mockProcessNestedRelationsHelper;
    let mockWorkspaceManyOrAllFlatEntityMapsCacheService;
    let mockGlobalWorkspaceOrmManager;
    const workspaceId = _companyflatobjectmock.COMPANY_FLAT_OBJECT_MOCK.workspaceId;
    const streamChannelId = 'test-stream-channel-id';
    const userWorkspaceId = 'test-user-workspace-id';
    const roleId = 'test-role-id';
    const companyObjectMetadata = _companyflatobjectmock.COMPANY_FLAT_OBJECT_MOCK;
    const companyNameField = _companyflatfieldsmock.COMPANY_FLAT_FIELDS_MOCK.name;
    const mockFlatFieldMetadataMaps = buildFlatFieldMetadataMaps([
        companyNameField
    ]);
    const mockUserWorkspaceRoleMap = {
        [userWorkspaceId]: roleId
    };
    const mockRolesPermissions = {
        [roleId]: {
            [companyObjectMetadata.id]: {
                canReadObjectRecords: true,
                canUpdateObjectRecords: true,
                canSoftDeleteObjectRecords: true,
                canDestroyObjectRecords: true,
                restrictedFields: {},
                rowLevelPermissionPredicates: [],
                rowLevelPermissionPredicateGroups: []
            }
        }
    };
    const mockStreamData = {
        authContext: {
            userWorkspaceId,
            userId: 'test-user-id',
            workspaceMemberId: 'test-workspace-member-id'
        },
        workspaceId,
        queries: {
            'query-1': {
                objectNameSingular: 'company',
                variables: {}
            }
        },
        createdAt: Date.now()
    };
    const createMockEvent = (overrides = {})=>({
            recordId: 'record-1',
            userId: 'test-user-id',
            workspaceMemberId: 'test-workspace-member-id',
            properties: {
                after: {
                    id: 'record-1',
                    name: 'Test Company'
                }
            },
            ...overrides
        });
    const mockFlatWorkspaceMemberMaps = {
        byId: {
            'test-workspace-member-id': {
                id: 'test-workspace-member-id',
                userId: 'test-user-id',
                name: {
                    firstName: 'Test',
                    lastName: 'User'
                },
                locale: 'en'
            }
        },
        idByUserId: {
            'test-user-id': 'test-workspace-member-id'
        }
    };
    const createPermissionsContext = (overrides = {})=>({
            flatRowLevelPermissionPredicateMaps: {
                byId: {},
                idByUniversalIdentifier: {},
                universalIdentifiersByApplicationId: {}
            },
            flatRowLevelPermissionPredicateGroupMaps: {
                byId: {},
                idByUniversalIdentifier: {},
                universalIdentifiersByApplicationId: {}
            },
            flatFieldMetadataMaps: overrides.flatFieldMetadataMaps ?? mockFlatFieldMetadataMaps,
            userWorkspaceRoleMap: overrides.userWorkspaceRoleMap ?? mockUserWorkspaceRoleMap,
            rolesPermissions: overrides.rolesPermissions ?? mockRolesPermissions
        });
    const createCacheMock = (permissionsOverrides = {}, workspaceMemberMapsOverride)=>{
        return (_workspaceId, keys)=>{
            if (keys.includes('flatWorkspaceMemberMaps')) {
                return Promise.resolve({
                    flatWorkspaceMemberMaps: workspaceMemberMapsOverride ?? mockFlatWorkspaceMemberMaps
                });
            }
            return Promise.resolve(createPermissionsContext(permissionsOverrides));
        };
    };
    beforeEach(async ()=>{
        jest.clearAllMocks();
        mockSubscriptionService = {
            publish: jest.fn().mockResolvedValue(undefined),
            publishToEventStream: jest.fn().mockResolvedValue(undefined)
        };
        mockEventStreamService = {
            getActiveStreamIds: jest.fn().mockResolvedValue([
                streamChannelId
            ]),
            getStreamsData: jest.fn().mockResolvedValue(new Map([
                [
                    streamChannelId,
                    mockStreamData
                ]
            ])),
            removeFromActiveStreams: jest.fn().mockResolvedValue(undefined)
        };
        mockWorkspaceCacheService = {
            getOrRecompute: jest.fn().mockImplementation(createCacheMock())
        };
        mockProcessNestedRelationsHelper = {
            processNestedRelations: jest.fn()
        };
        mockWorkspaceManyOrAllFlatEntityMapsCacheService = {
            getOrRecomputeManyOrAllFlatEntityMaps: jest.fn().mockResolvedValue({
                flatFieldMetadataMaps: mockFlatFieldMetadataMaps,
                flatObjectMetadataMaps: {
                    byId: {
                        [companyObjectMetadata.id]: companyObjectMetadata
                    },
                    idByUniversalIdentifier: {},
                    universalIdentifiersByApplicationId: {}
                }
            })
        };
        mockGlobalWorkspaceOrmManager = {
            getGlobalWorkspaceDataSourceReplica: jest.fn().mockResolvedValue({
                getRepository: jest.fn()
            })
        };
        buildRowLevelPermissionRecordFilter.mockReturnValue({});
        isRecordMatchingRLSRowLevelPermissionPredicate.mockReturnValue(true);
        const module = await _testing.Test.createTestingModule({
            providers: [
                _objectrecordeventpublisher.ObjectRecordEventPublisher,
                {
                    provide: _subscriptionservice.SubscriptionService,
                    useValue: mockSubscriptionService
                },
                {
                    provide: _eventstreamservice.EventStreamService,
                    useValue: mockEventStreamService
                },
                {
                    provide: _workspacecacheservice.WorkspaceCacheService,
                    useValue: mockWorkspaceCacheService
                },
                {
                    provide: _processnestedrelationshelper.ProcessNestedRelationsHelper,
                    useValue: mockProcessNestedRelationsHelper
                },
                {
                    provide: _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService,
                    useValue: mockWorkspaceManyOrAllFlatEntityMapsCacheService
                },
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: mockGlobalWorkspaceOrmManager
                },
                {
                    provide: _commonselectfieldshelper.CommonSelectFieldsHelper,
                    useValue: new _commonselectfieldshelper.CommonSelectFieldsHelper()
                }
            ]
        }).compile();
        service = module.get(_objectrecordeventpublisher.ObjectRecordEventPublisher);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('publish', ()=>{
        it('should skip publishing to event streams when no active streams exist', async ()=>{
            mockEventStreamService.getActiveStreamIds.mockResolvedValue([]);
            const eventBatch = {
                name: 'company.created',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent()
                ]
            };
            await service.publish(eventBatch);
            expect(mockEventStreamService.getActiveStreamIds).toHaveBeenCalledWith(workspaceId);
            expect(mockEventStreamService.getStreamsData).not.toHaveBeenCalled();
            expect(mockSubscriptionService.publishToEventStream).not.toHaveBeenCalled();
        });
        it('should publish events when record matches query and permissions', async ()=>{
            const eventBatch = {
                name: 'company.created',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent()
                ]
            };
            await service.publish(eventBatch);
            expect(mockSubscriptionService.publishToEventStream).toHaveBeenCalled();
            const publishCall = mockSubscriptionService.publishToEventStream.mock.calls[0][0];
            expect(publishCall.workspaceId).toBe(workspaceId);
            expect(publishCall.eventStreamChannelId).toBe(streamChannelId);
            expect(publishCall.payload.objectRecordEventsWithQueryIds).toHaveLength(1);
            expect(publishCall.payload.objectRecordEventsWithQueryIds[0].queryIds).toContain('query-1');
        });
        it('should not publish events when object-level read permission is denied', async ()=>{
            const permissionsWithoutRead = {
                [roleId]: {
                    [companyObjectMetadata.id]: {
                        canReadObjectRecords: false,
                        canUpdateObjectRecords: true,
                        canSoftDeleteObjectRecords: true,
                        canDestroyObjectRecords: true,
                        restrictedFields: {},
                        rowLevelPermissionPredicates: [],
                        rowLevelPermissionPredicateGroups: []
                    }
                }
            };
            mockWorkspaceCacheService.getOrRecompute.mockImplementation(createCacheMock({
                rolesPermissions: permissionsWithoutRead
            }));
            const eventBatch = {
                name: 'company.created',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent()
                ]
            };
            await service.publish(eventBatch);
            expect(mockSubscriptionService.publishToEventStream).not.toHaveBeenCalled();
        });
        it('should not publish events when query object name does not match event', async ()=>{
            const streamDataWithDifferentObject = {
                ...mockStreamData,
                queries: {
                    'query-1': {
                        objectNameSingular: 'person',
                        variables: {}
                    }
                }
            };
            mockEventStreamService.getStreamsData.mockResolvedValue(new Map([
                [
                    streamChannelId,
                    streamDataWithDifferentObject
                ]
            ]));
            const eventBatch = {
                name: 'company.created',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent()
                ]
            };
            await service.publish(eventBatch);
            expect(mockSubscriptionService.publishToEventStream).not.toHaveBeenCalled();
        });
        it('should not publish events when record does not match RLS filter', async ()=>{
            isRecordMatchingRLSRowLevelPermissionPredicate.mockReturnValue(false);
            const streamDataWithFilter = {
                ...mockStreamData,
                queries: {
                    'query-1': {
                        objectNameSingular: 'company',
                        variables: {
                            filter: {
                                name: {
                                    eq: 'Other Company'
                                }
                            }
                        }
                    }
                }
            };
            mockEventStreamService.getStreamsData.mockResolvedValue(new Map([
                [
                    streamChannelId,
                    streamDataWithFilter
                ]
            ]));
            const eventBatch = {
                name: 'company.created',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent()
                ]
            };
            await service.publish(eventBatch);
            expect(mockSubscriptionService.publishToEventStream).not.toHaveBeenCalled();
        });
        it('should filter restricted fields from events', async ()=>{
            const restrictedField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                objectMetadataId: companyObjectMetadata.id,
                type: _companyflatfieldsmock.COMPANY_FLAT_FIELDS_MOCK.name.type,
                name: 'secretField',
                universalIdentifier: 'restricted-field-universal-id',
                workspaceId
            });
            const permissionsWithRestrictedFields = {
                [roleId]: {
                    [companyObjectMetadata.id]: {
                        canReadObjectRecords: true,
                        canUpdateObjectRecords: true,
                        canSoftDeleteObjectRecords: true,
                        canDestroyObjectRecords: true,
                        restrictedFields: {
                            [restrictedField.id]: {
                                canRead: false,
                                canUpdate: false
                            }
                        },
                        rowLevelPermissionPredicates: [],
                        rowLevelPermissionPredicateGroups: []
                    }
                }
            };
            const fieldMetadataMapsWithRestricted = buildFlatFieldMetadataMaps([
                restrictedField
            ]);
            mockWorkspaceCacheService.getOrRecompute.mockImplementation(createCacheMock({
                flatFieldMetadataMaps: fieldMetadataMapsWithRestricted,
                rolesPermissions: permissionsWithRestrictedFields
            }));
            const eventBatch = {
                name: 'company.created',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent({
                        properties: {
                            after: {
                                id: 'record-1',
                                name: 'Test Company',
                                secretField: 'secret-value'
                            }
                        }
                    })
                ]
            };
            await service.publish(eventBatch);
            expect(mockSubscriptionService.publishToEventStream).toHaveBeenCalled();
            const publishCall = mockSubscriptionService.publishToEventStream.mock.calls[0][0];
            expect(publishCall.payload.objectRecordEventsWithQueryIds[0].objectRecordEvent.properties.after).not.toHaveProperty('secretField');
            expect(publishCall.payload.objectRecordEventsWithQueryIds[0].objectRecordEvent.properties.after).toHaveProperty('name');
        });
        it('should skip update events when all updated fields are restricted', async ()=>{
            const restrictedField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                objectMetadataId: companyObjectMetadata.id,
                type: _companyflatfieldsmock.COMPANY_FLAT_FIELDS_MOCK.name.type,
                name: 'secretField',
                universalIdentifier: 'restricted-field-universal-id',
                workspaceId
            });
            const permissionsWithRestrictedFields = {
                [roleId]: {
                    [companyObjectMetadata.id]: {
                        canReadObjectRecords: true,
                        canUpdateObjectRecords: true,
                        canSoftDeleteObjectRecords: true,
                        canDestroyObjectRecords: true,
                        restrictedFields: {
                            [restrictedField.id]: {
                                canRead: false,
                                canUpdate: false
                            }
                        },
                        rowLevelPermissionPredicates: [],
                        rowLevelPermissionPredicateGroups: []
                    }
                }
            };
            const fieldMetadataMapsWithRestricted = buildFlatFieldMetadataMaps([
                restrictedField
            ]);
            mockWorkspaceCacheService.getOrRecompute.mockImplementation(createCacheMock({
                flatFieldMetadataMaps: fieldMetadataMapsWithRestricted,
                rolesPermissions: permissionsWithRestrictedFields
            }));
            const eventBatch = {
                name: 'company.updated',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent({
                        properties: {
                            before: {
                                id: 'record-1',
                                secretField: 'old-secret'
                            },
                            after: {
                                id: 'record-1',
                                secretField: 'new-secret'
                            },
                            updatedFields: [
                                'secretField'
                            ],
                            diff: {
                                secretField: {
                                    before: 'old-secret',
                                    after: 'new-secret'
                                }
                            }
                        }
                    })
                ]
            };
            await service.publish(eventBatch);
            expect(mockSubscriptionService.publishToEventStream).not.toHaveBeenCalled();
        });
        it('should filter diff when restricted fields are updated', async ()=>{
            const restrictedField = (0, _getflatfieldmetadatamock.getFlatFieldMetadataMock)({
                objectMetadataId: companyObjectMetadata.id,
                type: _companyflatfieldsmock.COMPANY_FLAT_FIELDS_MOCK.name.type,
                name: 'secretField',
                universalIdentifier: 'restricted-field-universal-id',
                workspaceId
            });
            const permissionsWithRestrictedFields = {
                [roleId]: {
                    [companyObjectMetadata.id]: {
                        canReadObjectRecords: true,
                        canUpdateObjectRecords: true,
                        canSoftDeleteObjectRecords: true,
                        canDestroyObjectRecords: true,
                        restrictedFields: {
                            [restrictedField.id]: {
                                canRead: false,
                                canUpdate: false
                            }
                        },
                        rowLevelPermissionPredicates: [],
                        rowLevelPermissionPredicateGroups: []
                    }
                }
            };
            const fieldMetadataMapsWithRestricted = buildFlatFieldMetadataMaps([
                restrictedField
            ]);
            mockWorkspaceCacheService.getOrRecompute.mockImplementation(createCacheMock({
                flatFieldMetadataMaps: fieldMetadataMapsWithRestricted,
                rolesPermissions: permissionsWithRestrictedFields
            }));
            const eventBatch = {
                name: 'company.updated',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent({
                        properties: {
                            before: {
                                id: 'record-1',
                                name: 'Old Name',
                                secretField: 'old-secret'
                            },
                            after: {
                                id: 'record-1',
                                name: 'New Name',
                                secretField: 'new-secret'
                            },
                            updatedFields: [
                                'name',
                                'secretField'
                            ],
                            diff: {
                                name: {
                                    before: 'Old Name',
                                    after: 'New Name'
                                },
                                secretField: {
                                    before: 'old-secret',
                                    after: 'new-secret'
                                }
                            }
                        }
                    })
                ]
            };
            await service.publish(eventBatch);
            expect(mockSubscriptionService.publishToEventStream).toHaveBeenCalled();
            const publishCall = mockSubscriptionService.publishToEventStream.mock.calls[0][0];
            const eventPayload = publishCall.payload.objectRecordEventsWithQueryIds[0].objectRecordEvent;
            expect(eventPayload.properties.updatedFields).toEqual([
                'name'
            ]);
            expect(eventPayload.properties.diff).not.toHaveProperty('secretField');
            expect(eventPayload.properties.diff).toHaveProperty('name');
            expect(eventPayload.properties.before).not.toHaveProperty('secretField');
            expect(eventPayload.properties.after).not.toHaveProperty('secretField');
        });
        it('should remove stale streams from active streams', async ()=>{
            const staleStreamId = 'stale-stream-id';
            mockEventStreamService.getActiveStreamIds.mockResolvedValue([
                streamChannelId,
                staleStreamId
            ]);
            mockEventStreamService.getStreamsData.mockResolvedValue(new Map([
                [
                    streamChannelId,
                    mockStreamData
                ],
                [
                    staleStreamId,
                    undefined
                ]
            ]));
            const eventBatch = {
                name: 'company.created',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent()
                ]
            };
            await service.publish(eventBatch);
            expect(mockEventStreamService.removeFromActiveStreams).toHaveBeenCalledWith(workspaceId, [
                staleStreamId
            ]);
        });
        it('should skip streams with no registered queries', async ()=>{
            const streamDataWithNoQueries = {
                ...mockStreamData,
                queries: {}
            };
            mockEventStreamService.getStreamsData.mockResolvedValue(new Map([
                [
                    streamChannelId,
                    streamDataWithNoQueries
                ]
            ]));
            const eventBatch = {
                name: 'company.created',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent()
                ]
            };
            await service.publish(eventBatch);
            expect(mockSubscriptionService.publishToEventStream).not.toHaveBeenCalled();
        });
        it('should not publish when user has no role assigned', async ()=>{
            mockWorkspaceCacheService.getOrRecompute.mockImplementation(createCacheMock({
                userWorkspaceRoleMap: {}
            }));
            const eventBatch = {
                name: 'company.created',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent()
                ]
            };
            await service.publish(eventBatch);
            expect(mockSubscriptionService.publishToEventStream).not.toHaveBeenCalled();
        });
        it('should combine query filter with RLS filter', async ()=>{
            const rlsFilter = {
                status: {
                    eq: 'active'
                }
            };
            buildRowLevelPermissionRecordFilter.mockReturnValue(rlsFilter);
            const streamDataWithFilter = {
                ...mockStreamData,
                queries: {
                    'query-1': {
                        objectNameSingular: 'company',
                        variables: {
                            filter: {
                                name: {
                                    eq: 'Test Company'
                                }
                            }
                        }
                    }
                }
            };
            mockEventStreamService.getStreamsData.mockResolvedValue(new Map([
                [
                    streamChannelId,
                    streamDataWithFilter
                ]
            ]));
            const eventBatch = {
                name: 'company.created',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent({
                        properties: {
                            after: {
                                id: 'record-1',
                                name: 'Test Company',
                                status: 'active'
                            }
                        }
                    })
                ]
            };
            await service.publish(eventBatch);
            expect(isRecordMatchingRLSRowLevelPermissionPredicate).toHaveBeenCalledWith(expect.objectContaining({
                record: expect.objectContaining({
                    name: 'Test Company',
                    status: 'active'
                }),
                filter: expect.objectContaining({
                    and: expect.arrayContaining([
                        {
                            name: {
                                eq: 'Test Company'
                            }
                        },
                        {
                            status: {
                                eq: 'active'
                            }
                        }
                    ])
                })
            }));
        });
        it('should handle multiple events in a batch', async ()=>{
            const eventBatch = {
                name: 'company.created',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent({
                        recordId: 'record-1',
                        properties: {
                            after: {
                                id: 'record-1',
                                name: 'Company 1'
                            }
                        }
                    }),
                    createMockEvent({
                        recordId: 'record-2',
                        properties: {
                            after: {
                                id: 'record-2',
                                name: 'Company 2'
                            }
                        }
                    })
                ]
            };
            await service.publish(eventBatch);
            expect(mockSubscriptionService.publishToEventStream).toHaveBeenCalled();
            const publishCall = mockSubscriptionService.publishToEventStream.mock.calls[0][0];
            expect(publishCall.payload.objectRecordEventsWithQueryIds).toHaveLength(2);
        });
        it('should handle multiple matching queries', async ()=>{
            const streamDataWithMultipleQueries = {
                ...mockStreamData,
                queries: {
                    'query-1': {
                        objectNameSingular: 'company',
                        variables: {}
                    },
                    'query-2': {
                        objectNameSingular: 'company',
                        variables: {}
                    }
                }
            };
            mockEventStreamService.getStreamsData.mockResolvedValue(new Map([
                [
                    streamChannelId,
                    streamDataWithMultipleQueries
                ]
            ]));
            const eventBatch = {
                name: 'company.created',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent()
                ]
            };
            await service.publish(eventBatch);
            expect(mockSubscriptionService.publishToEventStream).toHaveBeenCalled();
            const publishCall = mockSubscriptionService.publishToEventStream.mock.calls[0][0];
            expect(publishCall.payload.objectRecordEventsWithQueryIds[0].queryIds).toContain('query-1');
            expect(publishCall.payload.objectRecordEventsWithQueryIds[0].queryIds).toContain('query-2');
        });
        it('should use before record for delete events', async ()=>{
            const streamDataWithFilter = {
                ...mockStreamData,
                queries: {
                    'query-1': {
                        objectNameSingular: 'company',
                        variables: {
                            filter: {
                                name: {
                                    eq: 'Deleted Company'
                                }
                            }
                        }
                    }
                }
            };
            mockEventStreamService.getStreamsData.mockResolvedValue(new Map([
                [
                    streamChannelId,
                    streamDataWithFilter
                ]
            ]));
            const eventBatch = {
                name: 'company.deleted',
                workspaceId,
                objectMetadata: companyObjectMetadata,
                events: [
                    createMockEvent({
                        properties: {
                            before: {
                                id: 'record-1',
                                name: 'Deleted Company'
                            }
                        }
                    })
                ]
            };
            await service.publish(eventBatch);
            expect(isRecordMatchingRLSRowLevelPermissionPredicate).toHaveBeenCalledWith(expect.objectContaining({
                record: expect.objectContaining({
                    id: 'record-1',
                    name: 'Deleted Company'
                })
            }));
        });
        describe('subscribers without valid authentication', ()=>{
            it('should not publish events and log warning when subscriber has no userWorkspaceId', async ()=>{
                const anonymousStreamData = {
                    authContext: {},
                    workspaceId,
                    queries: {
                        'query-1': {
                            objectNameSingular: 'company',
                            variables: {}
                        }
                    },
                    createdAt: Date.now()
                };
                mockEventStreamService.getStreamsData.mockResolvedValue(new Map([
                    [
                        streamChannelId,
                        anonymousStreamData
                    ]
                ]));
                mockWorkspaceCacheService.getOrRecompute.mockImplementation(createCacheMock());
                const eventBatch = {
                    name: 'company.created',
                    workspaceId,
                    objectMetadata: companyObjectMetadata,
                    events: [
                        createMockEvent()
                    ]
                };
                await service.publish(eventBatch);
                expect(mockSubscriptionService.publishToEventStream).not.toHaveBeenCalled();
            });
            it('should not publish events and log warning when user role cannot be found', async ()=>{
                const unknownUserStreamData = {
                    authContext: {
                        userWorkspaceId: 'unknown-user-workspace-id',
                        userId: 'unknown-user-id'
                    },
                    workspaceId,
                    queries: {
                        'query-1': {
                            objectNameSingular: 'company',
                            variables: {}
                        }
                    },
                    createdAt: Date.now()
                };
                mockEventStreamService.getStreamsData.mockResolvedValue(new Map([
                    [
                        streamChannelId,
                        unknownUserStreamData
                    ]
                ]));
                mockWorkspaceCacheService.getOrRecompute.mockImplementation(createCacheMock({
                    userWorkspaceRoleMap: {}
                }));
                const eventBatch = {
                    name: 'company.created',
                    workspaceId,
                    objectMetadata: companyObjectMetadata,
                    events: [
                        createMockEvent()
                    ]
                };
                await service.publish(eventBatch);
                expect(mockSubscriptionService.publishToEventStream).not.toHaveBeenCalled();
            });
        });
        describe('dynamic RLS predicates', ()=>{
            it('should pass workspaceMemberId to buildRowLevelPermissionRecordFilter for dynamic predicates', async ()=>{
                const workspaceMemberId = 'test-workspace-member-id';
                const rlsFilter = {
                    assigneeId: {
                        eq: workspaceMemberId
                    }
                };
                buildRowLevelPermissionRecordFilter.mockReturnValue(rlsFilter);
                const streamDataWithWorkspaceMember = {
                    authContext: {
                        userWorkspaceId,
                        userId: 'test-user-id',
                        workspaceMemberId
                    },
                    workspaceId,
                    queries: {
                        'query-1': {
                            objectNameSingular: 'company',
                            variables: {
                                filter: {
                                    name: {
                                        eq: 'Test Company'
                                    }
                                }
                            }
                        }
                    },
                    createdAt: Date.now()
                };
                mockEventStreamService.getStreamsData.mockResolvedValue(new Map([
                    [
                        streamChannelId,
                        streamDataWithWorkspaceMember
                    ]
                ]));
                mockWorkspaceCacheService.getOrRecompute.mockImplementation(createCacheMock());
                const eventBatch = {
                    name: 'company.created',
                    workspaceId,
                    objectMetadata: companyObjectMetadata,
                    events: [
                        createMockEvent({
                            properties: {
                                after: {
                                    id: 'record-1',
                                    name: 'Test Company',
                                    assigneeId: workspaceMemberId
                                }
                            }
                        })
                    ]
                };
                await service.publish(eventBatch);
                expect(buildRowLevelPermissionRecordFilter).toHaveBeenCalledWith(expect.objectContaining({
                    workspaceMember: expect.objectContaining({
                        id: workspaceMemberId
                    })
                }));
            });
            it('should pass full workspaceMember data from cache for dynamic predicates', async ()=>{
                const workspaceMemberId = 'test-workspace-member-id';
                const customWorkspaceMember = {
                    id: workspaceMemberId,
                    userId: 'test-user-id',
                    name: {
                        firstName: 'John',
                        lastName: 'Doe'
                    },
                    locale: 'en',
                    colorScheme: 'light'
                };
                const customFlatWorkspaceMemberMaps = {
                    byId: {
                        [workspaceMemberId]: customWorkspaceMember
                    },
                    idByUserId: {
                        'test-user-id': workspaceMemberId
                    }
                };
                const rlsFilter = {
                    locale: {
                        eq: 'en'
                    }
                };
                buildRowLevelPermissionRecordFilter.mockReturnValue(rlsFilter);
                const streamDataWithWorkspaceMember = {
                    authContext: {
                        userWorkspaceId,
                        userId: 'test-user-id',
                        workspaceMemberId
                    },
                    workspaceId,
                    queries: {
                        'query-1': {
                            objectNameSingular: 'company',
                            variables: {}
                        }
                    },
                    createdAt: Date.now()
                };
                mockEventStreamService.getStreamsData.mockResolvedValue(new Map([
                    [
                        streamChannelId,
                        streamDataWithWorkspaceMember
                    ]
                ]));
                mockWorkspaceCacheService.getOrRecompute.mockImplementation(createCacheMock({}, customFlatWorkspaceMemberMaps));
                const eventBatch = {
                    name: 'company.created',
                    workspaceId,
                    objectMetadata: companyObjectMetadata,
                    events: [
                        createMockEvent({
                            properties: {
                                after: {
                                    id: 'record-1',
                                    name: 'Test Company',
                                    locale: 'en'
                                }
                            }
                        })
                    ]
                };
                await service.publish(eventBatch);
                expect(buildRowLevelPermissionRecordFilter).toHaveBeenCalledWith(expect.objectContaining({
                    workspaceMember: customWorkspaceMember
                }));
            });
            it('should pass undefined workspaceMember when workspaceMemberId is not in cache', async ()=>{
                const workspaceMemberId = 'non-existent-workspace-member-id';
                const emptyFlatWorkspaceMemberMaps = {
                    byId: {},
                    idByUserId: {}
                };
                buildRowLevelPermissionRecordFilter.mockReturnValue({});
                const streamDataWithWorkspaceMember = {
                    authContext: {
                        userWorkspaceId,
                        userId: 'test-user-id',
                        workspaceMemberId
                    },
                    workspaceId,
                    queries: {
                        'query-1': {
                            objectNameSingular: 'company',
                            variables: {}
                        }
                    },
                    createdAt: Date.now()
                };
                mockEventStreamService.getStreamsData.mockResolvedValue(new Map([
                    [
                        streamChannelId,
                        streamDataWithWorkspaceMember
                    ]
                ]));
                mockWorkspaceCacheService.getOrRecompute.mockImplementation(createCacheMock({}, emptyFlatWorkspaceMemberMaps));
                const eventBatch = {
                    name: 'company.created',
                    workspaceId,
                    objectMetadata: companyObjectMetadata,
                    events: [
                        createMockEvent()
                    ]
                };
                await service.publish(eventBatch);
                expect(buildRowLevelPermissionRecordFilter).toHaveBeenCalledWith(expect.objectContaining({
                    workspaceMember: undefined
                }));
            });
        });
        describe('nested relations enrichment', ()=>{
            it('should enrich events with nested relations when publishing', async ()=>{
                const recordAfter = {
                    id: 'record-1',
                    name: 'Test Company'
                };
                const eventBatch = {
                    name: 'company.created',
                    workspaceId,
                    objectMetadata: companyObjectMetadata,
                    events: [
                        createMockEvent({
                            properties: {
                                after: recordAfter
                            }
                        })
                    ]
                };
                await service.publish(eventBatch);
                expect(mockWorkspaceManyOrAllFlatEntityMapsCacheService.getOrRecomputeManyOrAllFlatEntityMaps).toHaveBeenCalledWith({
                    workspaceId,
                    flatMapsKeys: [
                        'flatObjectMetadataMaps',
                        'flatFieldMetadataMaps'
                    ]
                });
                expect(mockGlobalWorkspaceOrmManager.getGlobalWorkspaceDataSourceReplica).toHaveBeenCalled();
                expect(mockProcessNestedRelationsHelper.processNestedRelations).toHaveBeenCalledWith(expect.objectContaining({
                    parentObjectMetadataItem: companyObjectMetadata,
                    parentObjectRecords: expect.arrayContaining([
                        recordAfter
                    ]),
                    authContext: expect.objectContaining({
                        userWorkspaceId,
                        userId: 'test-user-id'
                    }),
                    workspaceDataSource: expect.objectContaining({
                        getRepository: expect.any(Function)
                    }),
                    rolePermissionConfig: expect.objectContaining({
                        intersectionOf: [
                            roleId
                        ]
                    })
                }));
            });
            it('should include both before and after records when enriching update events', async ()=>{
                const recordBefore = {
                    id: 'record-1',
                    name: 'Old Name'
                };
                const recordAfter = {
                    id: 'record-1',
                    name: 'New Name'
                };
                const eventBatch = {
                    name: 'company.updated',
                    workspaceId,
                    objectMetadata: companyObjectMetadata,
                    events: [
                        createMockEvent({
                            properties: {
                                before: recordBefore,
                                after: recordAfter,
                                updatedFields: [
                                    'name'
                                ],
                                diff: {
                                    name: {
                                        before: 'Old Name',
                                        after: 'New Name'
                                    }
                                }
                            }
                        })
                    ]
                };
                await service.publish(eventBatch);
                expect(mockProcessNestedRelationsHelper.processNestedRelations).toHaveBeenCalledWith(expect.objectContaining({
                    parentObjectRecords: expect.arrayContaining([
                        recordBefore,
                        recordAfter
                    ])
                }));
            });
            it('should include only before records when enriching delete events', async ()=>{
                const recordBefore = {
                    id: 'record-1',
                    name: 'Deleted Company'
                };
                const streamDataWithFilter = {
                    ...mockStreamData,
                    queries: {
                        'query-1': {
                            objectNameSingular: 'company',
                            variables: {}
                        }
                    }
                };
                mockEventStreamService.getStreamsData.mockResolvedValue(new Map([
                    [
                        streamChannelId,
                        streamDataWithFilter
                    ]
                ]));
                const eventBatch = {
                    name: 'company.deleted',
                    workspaceId,
                    objectMetadata: companyObjectMetadata,
                    events: [
                        createMockEvent({
                            properties: {
                                before: recordBefore
                            }
                        })
                    ]
                };
                await service.publish(eventBatch);
                expect(mockProcessNestedRelationsHelper.processNestedRelations).toHaveBeenCalledWith(expect.objectContaining({
                    parentObjectRecords: expect.arrayContaining([
                        recordBefore
                    ])
                }));
            });
            it('should enrich multiple records from batch events', async ()=>{
                const record1 = {
                    id: 'record-1',
                    name: 'Company 1'
                };
                const record2 = {
                    id: 'record-2',
                    name: 'Company 2'
                };
                const record3 = {
                    id: 'record-3',
                    name: 'Company 3'
                };
                const eventBatch = {
                    name: 'company.created',
                    workspaceId,
                    objectMetadata: companyObjectMetadata,
                    events: [
                        createMockEvent({
                            recordId: 'record-1',
                            properties: {
                                after: record1
                            }
                        }),
                        createMockEvent({
                            recordId: 'record-2',
                            properties: {
                                after: record2
                            }
                        }),
                        createMockEvent({
                            recordId: 'record-3',
                            properties: {
                                after: record3
                            }
                        })
                    ]
                };
                await service.publish(eventBatch);
                expect(mockProcessNestedRelationsHelper.processNestedRelations).toHaveBeenCalledWith(expect.objectContaining({
                    parentObjectRecords: expect.arrayContaining([
                        record1,
                        record2,
                        record3
                    ])
                }));
            });
            it('should not call processNestedRelations when no events match', async ()=>{
                const permissionsWithoutRead = {
                    [roleId]: {
                        [companyObjectMetadata.id]: {
                            canReadObjectRecords: false,
                            canUpdateObjectRecords: true,
                            canSoftDeleteObjectRecords: true,
                            canDestroyObjectRecords: true,
                            restrictedFields: {},
                            rowLevelPermissionPredicates: [],
                            rowLevelPermissionPredicateGroups: []
                        }
                    }
                };
                mockWorkspaceCacheService.getOrRecompute.mockImplementation(createCacheMock({
                    rolesPermissions: permissionsWithoutRead
                }));
                const eventBatch = {
                    name: 'company.created',
                    workspaceId,
                    objectMetadata: companyObjectMetadata,
                    events: [
                        createMockEvent()
                    ]
                };
                await service.publish(eventBatch);
                expect(mockProcessNestedRelationsHelper.processNestedRelations).not.toHaveBeenCalled();
            });
            it('should pass correct role permission config when enriching events', async ()=>{
                const customRoleId = 'custom-role-id';
                const customUserWorkspaceRoleMap = {
                    [userWorkspaceId]: customRoleId
                };
                const customRolesPermissions = {
                    [customRoleId]: {
                        [companyObjectMetadata.id]: {
                            canReadObjectRecords: true,
                            canUpdateObjectRecords: true,
                            canSoftDeleteObjectRecords: true,
                            canDestroyObjectRecords: true,
                            restrictedFields: {},
                            rowLevelPermissionPredicates: [],
                            rowLevelPermissionPredicateGroups: []
                        }
                    }
                };
                mockWorkspaceCacheService.getOrRecompute.mockImplementation(createCacheMock({
                    userWorkspaceRoleMap: customUserWorkspaceRoleMap,
                    rolesPermissions: customRolesPermissions
                }));
                const recordAfter = {
                    id: 'record-1',
                    name: 'Test Company'
                };
                const eventBatch = {
                    name: 'company.created',
                    workspaceId,
                    objectMetadata: companyObjectMetadata,
                    events: [
                        createMockEvent({
                            properties: {
                                after: recordAfter
                            }
                        })
                    ]
                };
                await service.publish(eventBatch);
                expect(mockProcessNestedRelationsHelper.processNestedRelations).toHaveBeenCalledWith(expect.objectContaining({
                    rolePermissionConfig: {
                        intersectionOf: [
                            customRoleId
                        ]
                    }
                }));
            });
        });
    });
});

//# sourceMappingURL=object-record-event-publisher.spec.js.map