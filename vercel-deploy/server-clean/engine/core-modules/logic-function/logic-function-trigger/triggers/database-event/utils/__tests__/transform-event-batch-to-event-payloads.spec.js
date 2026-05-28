"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _transformeventbatchtoeventpayloads = require("../transform-event-batch-to-event-payloads");
const _getflatobjectmetadatamock = require("../../../../../../../metadata-modules/flat-object-metadata/__mocks__/get-flat-object-metadata.mock");
const createMockLogicFunction = (overrides = {})=>({
        id: 'function-1',
        workspaceId: 'workspace-1',
        databaseEventTriggerSettings: {
            eventName: 'company.updated'
        },
        ...overrides
    });
const createMockEvent = (overrides = {})=>({
        recordId: 'record-1',
        properties: {
            after: {}
        },
        ...overrides
    });
const createMockWorkspaceEventBatch = (overrides = {})=>({
        name: 'company.updated',
        workspaceId: 'workspace-1',
        objectMetadata: (0, _getflatobjectmetadatamock.getFlatObjectMetadataMock)({
            universalIdentifier: 'company-uuid',
            nameSingular: 'company'
        }),
        events: [
            createMockEvent()
        ],
        ...overrides
    });
describe('transformEventBatchToEventPayloads', ()=>{
    describe('basic transformation', ()=>{
        it('should transform a single event batch with a single logic function', ()=>{
            const workspaceEventBatch = createMockWorkspaceEventBatch();
            const logicFunctions = [
                createMockLogicFunction()
            ];
            const result = (0, _transformeventbatchtoeventpayloads.transformEventBatchToEventPayloads)({
                workspaceEventBatch,
                logicFunctions
            });
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                logicFunctionId: 'function-1',
                workspaceId: 'workspace-1',
                payload: expect.objectContaining({
                    name: 'company.updated',
                    workspaceId: 'workspace-1',
                    recordId: 'record-1'
                })
            });
        });
        it('should create multiple payloads for multiple events in a batch', ()=>{
            const workspaceEventBatch = createMockWorkspaceEventBatch({
                events: [
                    createMockEvent({
                        recordId: 'record-1'
                    }),
                    createMockEvent({
                        recordId: 'record-2'
                    }),
                    createMockEvent({
                        recordId: 'record-3'
                    })
                ]
            });
            const logicFunctions = [
                createMockLogicFunction()
            ];
            const result = (0, _transformeventbatchtoeventpayloads.transformEventBatchToEventPayloads)({
                workspaceEventBatch,
                logicFunctions
            });
            expect(result).toHaveLength(3);
            expect(result.map((r)=>r.payload.recordId)).toEqual([
                'record-1',
                'record-2',
                'record-3'
            ]);
        });
        it('should create payloads for each logic function', ()=>{
            const workspaceEventBatch = createMockWorkspaceEventBatch();
            const logicFunctions = [
                createMockLogicFunction({
                    id: 'function-1'
                }),
                createMockLogicFunction({
                    id: 'function-2'
                })
            ];
            const result = (0, _transformeventbatchtoeventpayloads.transformEventBatchToEventPayloads)({
                workspaceEventBatch,
                logicFunctions
            });
            expect(result).toHaveLength(2);
            expect(result.map((r)=>r.logicFunctionId)).toEqual([
                'function-1',
                'function-2'
            ]);
        });
    });
    describe('updatedFields filtering', ()=>{
        it('should include all events when updatedFields is undefined', ()=>{
            const workspaceEventBatch = createMockWorkspaceEventBatch({
                name: 'company.updated',
                events: [
                    createMockEvent({
                        recordId: 'record-1',
                        properties: {
                            after: {},
                            updatedFields: [
                                'name'
                            ]
                        }
                    }),
                    createMockEvent({
                        recordId: 'record-2',
                        properties: {
                            after: {},
                            updatedFields: [
                                'address'
                            ]
                        }
                    })
                ]
            });
            const logicFunctions = [
                createMockLogicFunction({
                    databaseEventTriggerSettings: {
                        eventName: 'company.updated'
                    }
                })
            ];
            const result = (0, _transformeventbatchtoeventpayloads.transformEventBatchToEventPayloads)({
                workspaceEventBatch,
                logicFunctions
            });
            expect(result).toHaveLength(2);
        });
        it('should include all events when updatedFields is empty array', ()=>{
            const workspaceEventBatch = createMockWorkspaceEventBatch({
                name: 'company.updated',
                events: [
                    createMockEvent({
                        recordId: 'record-1',
                        properties: {
                            after: {},
                            updatedFields: [
                                'name'
                            ]
                        }
                    }),
                    createMockEvent({
                        recordId: 'record-2',
                        properties: {
                            after: {},
                            updatedFields: [
                                'address'
                            ]
                        }
                    })
                ]
            });
            const logicFunctions = [
                createMockLogicFunction({
                    databaseEventTriggerSettings: {
                        eventName: 'company.updated',
                        updatedFields: []
                    }
                })
            ];
            const result = (0, _transformeventbatchtoeventpayloads.transformEventBatchToEventPayloads)({
                workspaceEventBatch,
                logicFunctions
            });
            expect(result).toHaveLength(2);
        });
        it('should filter events to only those matching updatedFields', ()=>{
            const workspaceEventBatch = createMockWorkspaceEventBatch({
                name: 'company.updated',
                events: [
                    createMockEvent({
                        recordId: 'record-1',
                        properties: {
                            after: {},
                            updatedFields: [
                                'name'
                            ]
                        }
                    }),
                    createMockEvent({
                        recordId: 'record-2',
                        properties: {
                            after: {},
                            updatedFields: [
                                'address'
                            ]
                        }
                    }),
                    createMockEvent({
                        recordId: 'record-3',
                        properties: {
                            after: {},
                            updatedFields: [
                                'name',
                                'description'
                            ]
                        }
                    })
                ]
            });
            const logicFunctions = [
                createMockLogicFunction({
                    databaseEventTriggerSettings: {
                        eventName: 'company.updated',
                        updatedFields: [
                            'name'
                        ]
                    }
                })
            ];
            const result = (0, _transformeventbatchtoeventpayloads.transformEventBatchToEventPayloads)({
                workspaceEventBatch,
                logicFunctions
            });
            expect(result).toHaveLength(2);
            expect(result.map((r)=>r.payload.recordId)).toEqual([
                'record-1',
                'record-3'
            ]);
        });
        it('should filter events matching any of the specified updatedFields', ()=>{
            const workspaceEventBatch = createMockWorkspaceEventBatch({
                name: 'company.updated',
                events: [
                    createMockEvent({
                        recordId: 'record-1',
                        properties: {
                            after: {},
                            updatedFields: [
                                'name'
                            ]
                        }
                    }),
                    createMockEvent({
                        recordId: 'record-2',
                        properties: {
                            after: {},
                            updatedFields: [
                                'address'
                            ]
                        }
                    }),
                    createMockEvent({
                        recordId: 'record-3',
                        properties: {
                            after: {},
                            updatedFields: [
                                'phone'
                            ]
                        }
                    })
                ]
            });
            const logicFunctions = [
                createMockLogicFunction({
                    databaseEventTriggerSettings: {
                        eventName: 'company.updated',
                        updatedFields: [
                            'name',
                            'address'
                        ]
                    }
                })
            ];
            const result = (0, _transformeventbatchtoeventpayloads.transformEventBatchToEventPayloads)({
                workspaceEventBatch,
                logicFunctions
            });
            expect(result).toHaveLength(2);
            expect(result.map((r)=>r.payload.recordId)).toEqual([
                'record-1',
                'record-2'
            ]);
        });
        it('should return no events when none match the updatedFields filter', ()=>{
            const workspaceEventBatch = createMockWorkspaceEventBatch({
                name: 'company.updated',
                events: [
                    createMockEvent({
                        recordId: 'record-1',
                        properties: {
                            after: {},
                            updatedFields: [
                                'name'
                            ]
                        }
                    }),
                    createMockEvent({
                        recordId: 'record-2',
                        properties: {
                            after: {},
                            updatedFields: [
                                'address'
                            ]
                        }
                    })
                ]
            });
            const logicFunctions = [
                createMockLogicFunction({
                    databaseEventTriggerSettings: {
                        eventName: 'company.updated',
                        updatedFields: [
                            'phone'
                        ]
                    }
                })
            ];
            const result = (0, _transformeventbatchtoeventpayloads.transformEventBatchToEventPayloads)({
                workspaceEventBatch,
                logicFunctions
            });
            expect(result).toHaveLength(0);
        });
        it('should handle different updatedFields filters per logic function', ()=>{
            const workspaceEventBatch = createMockWorkspaceEventBatch({
                name: 'company.updated',
                events: [
                    createMockEvent({
                        recordId: 'record-1',
                        properties: {
                            after: {},
                            updatedFields: [
                                'name'
                            ]
                        }
                    }),
                    createMockEvent({
                        recordId: 'record-2',
                        properties: {
                            after: {},
                            updatedFields: [
                                'address'
                            ]
                        }
                    })
                ]
            });
            const logicFunctions = [
                createMockLogicFunction({
                    id: 'function-1',
                    databaseEventTriggerSettings: {
                        eventName: 'company.updated',
                        updatedFields: [
                            'name'
                        ]
                    }
                }),
                createMockLogicFunction({
                    id: 'function-2',
                    databaseEventTriggerSettings: {
                        eventName: 'company.updated',
                        updatedFields: [
                            'address'
                        ]
                    }
                })
            ];
            const result = (0, _transformeventbatchtoeventpayloads.transformEventBatchToEventPayloads)({
                workspaceEventBatch,
                logicFunctions
            });
            expect(result).toHaveLength(2);
            const function1Payloads = result.filter((r)=>r.logicFunctionId === 'function-1');
            const function2Payloads = result.filter((r)=>r.logicFunctionId === 'function-2');
            expect(function1Payloads).toHaveLength(1);
            expect(function1Payloads[0].payload.recordId).toBe('record-1');
            expect(function2Payloads).toHaveLength(1);
            expect(function2Payloads[0].payload.recordId).toBe('record-2');
        });
    });
    describe('edge cases', ()=>{
        it('should return empty array when no logic functions provided', ()=>{
            const workspaceEventBatch = createMockWorkspaceEventBatch();
            const result = (0, _transformeventbatchtoeventpayloads.transformEventBatchToEventPayloads)({
                workspaceEventBatch,
                logicFunctions: []
            });
            expect(result).toHaveLength(0);
        });
        it('should return empty array when no events in batch', ()=>{
            const workspaceEventBatch = createMockWorkspaceEventBatch({
                events: []
            });
            const logicFunctions = [
                createMockLogicFunction()
            ];
            const result = (0, _transformeventbatchtoeventpayloads.transformEventBatchToEventPayloads)({
                workspaceEventBatch,
                logicFunctions
            });
            expect(result).toHaveLength(0);
        });
    });
});

//# sourceMappingURL=transform-event-batch-to-event-payloads.spec.js.map