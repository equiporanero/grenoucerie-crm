"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _messagequeueservice = require("../../../../../../engine/core-modules/message-queue/services/message-queue.service");
const _globalworkspaceormmanager = require("../../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _workflowautomatedtriggerworkspaceentity = require("../../../../common/standard-objects/workflow-automated-trigger.workspace-entity");
const _workflowcommonworkspaceservice = require("../../../../common/workspace-services/workflow-common.workspace-service");
const _workflowdatabaseeventtriggerlistener = require("../workflow-database-event-trigger.listener");
const _workflowtriggerjob = require("../../../jobs/workflow-trigger.job");
describe('WorkflowDatabaseEventTriggerListener', ()=>{
    let listener;
    let globalWorkspaceOrmManager;
    let messageQueueService;
    const mockRepository = {
        find: jest.fn()
    };
    const createMockFlatObjectMetadata = (overrides)=>({
            id: 'test-object-metadata',
            workspaceId: 'test-workspace',
            nameSingular: 'testObject',
            namePlural: 'testObjects',
            labelSingular: 'Test Object',
            labelPlural: 'Test Objects',
            description: 'Test object for testing',
            targetTableName: 'test_objects',
            isSystem: false,
            isCustom: false,
            isActive: true,
            isRemote: false,
            isAuditLogged: true,
            isSearchable: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            icon: 'Icon123',
            universalIdentifier: 'test-object-metadata',
            fieldIds: [],
            indexMetadataIds: [],
            viewIds: [],
            applicationId: null,
            ...overrides
        });
    beforeEach(async ()=>{
        globalWorkspaceOrmManager = {
            getRepository: jest.fn().mockResolvedValue(mockRepository),
            executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn())
        };
        messageQueueService = {
            add: jest.fn()
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _workflowdatabaseeventtriggerlistener.WorkflowDatabaseEventTriggerListener,
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: globalWorkspaceOrmManager
                },
                {
                    provide: _messagequeueservice.MessageQueueService,
                    useValue: messageQueueService
                },
                {
                    provide: 'MESSAGE_QUEUE_workflow-queue',
                    useValue: messageQueueService
                },
                {
                    provide: _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService,
                    useValue: {
                        getWorkflowById: jest.fn(),
                        getObjectMetadataInfo: jest.fn().mockResolvedValue({
                            flatObjectMetadata: createMockFlatObjectMetadata({}),
                            flatObjectMetadataMaps: {
                                byId: {},
                                byName: {}
                            },
                            flatFieldMetadataMaps: {
                                byId: {},
                                byName: {}
                            }
                        })
                    }
                }
            ]
        }).compile();
        listener = module.get(_workflowdatabaseeventtriggerlistener.WorkflowDatabaseEventTriggerListener);
    });
    describe('handleObjectRecordUpdateEvent', ()=>{
        const workspaceId = 'test-workspace';
        const databaseEventName = 'testEvent';
        const workflowId = 'test-workflow';
        const mockPayload = {
            workspaceId,
            name: databaseEventName,
            objectMetadata: createMockFlatObjectMetadata({}),
            events: [
                {
                    recordId: 'test-record',
                    properties: {
                        updatedFields: [
                            'field1',
                            'field2'
                        ],
                        before: {
                            field1: 'old',
                            field2: 'old'
                        },
                        after: {
                            field1: 'new',
                            field2: 'new'
                        }
                    }
                }
            ]
        };
        const mockEventListeners = [
            {
                type: _workflowautomatedtriggerworkspaceentity.AutomatedTriggerType.DATABASE_EVENT,
                workflowId,
                settings: {
                    eventName: databaseEventName,
                    fields: [
                        'field1',
                        'field3'
                    ]
                }
            }
        ];
        it('should trigger workflow when fields are specified and match updated fields', async ()=>{
            mockRepository.find.mockResolvedValue(mockEventListeners);
            await listener.handleObjectRecordUpdateEvent(mockPayload);
            expect(messageQueueService.add).toHaveBeenCalledWith(_workflowtriggerjob.WorkflowTriggerJob.name, {
                workspaceId,
                workflowId,
                payload: mockPayload.events[0]
            }, {
                retryLimit: 3
            });
        });
        it('should trigger workflow when no fields are specified', async ()=>{
            mockRepository.find.mockResolvedValue([
                {
                    ...mockEventListeners[0],
                    settings: {
                        eventName: databaseEventName,
                        fields: undefined
                    }
                }
            ]);
            await listener.handleObjectRecordUpdateEvent(mockPayload);
            expect(messageQueueService.add).toHaveBeenCalled();
        });
        it('should trigger workflow when fields array is empty', async ()=>{
            mockRepository.find.mockResolvedValue([
                {
                    ...mockEventListeners[0],
                    settings: {
                        eventName: databaseEventName,
                        fields: []
                    }
                }
            ]);
            await listener.handleObjectRecordUpdateEvent(mockPayload);
            expect(messageQueueService.add).toHaveBeenCalled();
        });
        it('should not trigger workflow when fields are specified but none match updated fields', async ()=>{
            mockRepository.find.mockResolvedValue([
                {
                    ...mockEventListeners[0],
                    settings: {
                        eventName: databaseEventName,
                        fields: [
                            'field3',
                            'field4'
                        ]
                    }
                }
            ]);
            await listener.handleObjectRecordUpdateEvent(mockPayload);
            expect(messageQueueService.add).not.toHaveBeenCalled();
        });
        it('should handle create events correctly', async ()=>{
            const createPayload = {
                ...mockPayload,
                name: 'createEvent',
                events: [
                    {
                        ...mockPayload.events[0],
                        properties: {
                            after: {
                                field1: 'new',
                                field2: 'new'
                            }
                        }
                    }
                ]
            };
            mockRepository.find.mockResolvedValue([
                {
                    type: _workflowautomatedtriggerworkspaceentity.AutomatedTriggerType.DATABASE_EVENT,
                    workflowId,
                    settings: {
                        eventName: 'createEvent'
                    }
                }
            ]);
            await listener.handleObjectRecordCreateEvent(createPayload);
            expect(messageQueueService.add).toHaveBeenCalledWith(_workflowtriggerjob.WorkflowTriggerJob.name, {
                workspaceId,
                workflowId,
                payload: createPayload.events[0]
            }, {
                retryLimit: 3
            });
        });
        it('should handle delete events correctly', async ()=>{
            const deletePayload = {
                ...mockPayload,
                name: 'deleteEvent',
                events: [
                    {
                        ...mockPayload.events[0],
                        properties: {
                            before: {
                                field1: 'old',
                                field2: 'old'
                            }
                        }
                    }
                ]
            };
            mockRepository.find.mockResolvedValue([
                {
                    type: _workflowautomatedtriggerworkspaceentity.AutomatedTriggerType.DATABASE_EVENT,
                    workflowId,
                    settings: {
                        eventName: 'deleteEvent'
                    }
                }
            ]);
            await listener.handleObjectRecordDeleteEvent(deletePayload);
            expect(messageQueueService.add).toHaveBeenCalledWith(_workflowtriggerjob.WorkflowTriggerJob.name, {
                workspaceId,
                workflowId,
                payload: deletePayload.events[0]
            }, {
                retryLimit: 3
            });
        });
        it('should handle destroy events correctly', async ()=>{
            const destroyPayload = {
                ...mockPayload,
                name: 'destroyEvent',
                events: [
                    {
                        ...mockPayload.events[0],
                        properties: {
                            before: {
                                field1: 'old',
                                field2: 'old'
                            }
                        }
                    }
                ]
            };
            mockRepository.find.mockResolvedValue([
                {
                    type: _workflowautomatedtriggerworkspaceentity.AutomatedTriggerType.DATABASE_EVENT,
                    workflowId,
                    settings: {
                        eventName: 'destroyEvent'
                    }
                }
            ]);
            await listener.handleObjectRecordDestroyEvent(destroyPayload);
            expect(messageQueueService.add).toHaveBeenCalledWith(_workflowtriggerjob.WorkflowTriggerJob.name, {
                workspaceId,
                workflowId,
                payload: destroyPayload.events[0]
            }, {
                retryLimit: 3
            });
        });
        it('should handle multiple events in a batch', async ()=>{
            const batchPayload = {
                ...mockPayload,
                events: [
                    mockPayload.events[0],
                    {
                        ...mockPayload.events[0],
                        recordId: 'test-record-2',
                        properties: {
                            updatedFields: [
                                'field1'
                            ],
                            before: {
                                field1: 'old'
                            },
                            after: {
                                field1: 'new'
                            }
                        }
                    }
                ]
            };
            mockRepository.find.mockResolvedValue([
                {
                    type: _workflowautomatedtriggerworkspaceentity.AutomatedTriggerType.DATABASE_EVENT,
                    workflowId,
                    settings: {
                        eventName: databaseEventName,
                        fields: [
                            'field1'
                        ]
                    }
                }
            ]);
            await listener.handleObjectRecordUpdateEvent(batchPayload);
            expect(messageQueueService.add).toHaveBeenCalledTimes(2);
            expect(messageQueueService.add).toHaveBeenNthCalledWith(1, _workflowtriggerjob.WorkflowTriggerJob.name, {
                workspaceId,
                workflowId,
                payload: batchPayload.events[0]
            }, {
                retryLimit: 3
            });
            expect(messageQueueService.add).toHaveBeenNthCalledWith(2, _workflowtriggerjob.WorkflowTriggerJob.name, {
                workspaceId,
                workflowId,
                payload: batchPayload.events[1]
            }, {
                retryLimit: 3
            });
        });
    });
});

//# sourceMappingURL=workflow-database-event-trigger.listener.spec.js.map