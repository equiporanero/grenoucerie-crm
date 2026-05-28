"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _workflow = require("twenty-shared/workflow");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _workflowcommonworkspaceservice = require("../../../common/workspace-services/workflow-common.workspace-service");
const _workflowversionedgeworkspaceservice = require("../workflow-version-edge.workspace-service");
const _workflowactiontype = require("../../../workflow-executor/workflow-actions/types/workflow-action.type");
const _workflowtriggertype = require("../../../workflow-trigger/types/workflow-trigger.type");
const mockWorkflowVersionId = 'workflow-version-id';
const mockWorkspaceId = 'workspace-id';
const mockSteps = [
    {
        id: 'step-1',
        type: _workflowactiontype.WorkflowActionType.FORM,
        settings: {
            errorHandlingOptions: {
                continueOnFailure: {
                    value: false
                },
                retryOnFailure: {
                    value: false
                }
            }
        },
        nextStepIds: [
            'step-2'
        ]
    },
    {
        id: 'step-2',
        type: _workflowactiontype.WorkflowActionType.SEND_EMAIL,
        settings: {
            errorHandlingOptions: {
                continueOnFailure: {
                    value: false
                },
                retryOnFailure: {
                    value: false
                }
            }
        },
        nextStepIds: []
    },
    {
        id: 'step-3',
        type: _workflowactiontype.WorkflowActionType.SEND_EMAIL,
        settings: {
            errorHandlingOptions: {
                continueOnFailure: {
                    value: false
                },
                retryOnFailure: {
                    value: false
                }
            }
        },
        nextStepIds: []
    }
];
const mockTrigger = {
    type: _workflowtriggertype.WorkflowTriggerType.MANUAL,
    settings: {},
    nextStepIds: [
        'step-1'
    ]
};
const mockWorkflowVersion = {
    id: mockWorkflowVersionId,
    trigger: mockTrigger,
    steps: mockSteps,
    status: 'DRAFT'
};
describe('WorkflowVersionEdgeWorkspaceService', ()=>{
    let globalWorkspaceOrmManager;
    let workflowCommonWorkspaceService;
    let service;
    let mockWorkflowVersionWorkspaceRepository;
    beforeEach(async ()=>{
        mockWorkflowVersionWorkspaceRepository = {
            findOne: jest.fn(),
            update: jest.fn()
        };
        mockWorkflowVersionWorkspaceRepository.findOne.mockResolvedValue(mockWorkflowVersion);
        globalWorkspaceOrmManager = {
            executeInWorkspaceContext: jest.fn().mockImplementation(async (callback, _authContext)=>callback()),
            getRepository: jest.fn().mockResolvedValue(mockWorkflowVersionWorkspaceRepository)
        };
        workflowCommonWorkspaceService = {
            getWorkflowVersionOrFail: jest.fn().mockResolvedValue(mockWorkflowVersion)
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _workflowversionedgeworkspaceservice.WorkflowVersionEdgeWorkspaceService,
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: globalWorkspaceOrmManager
                },
                {
                    provide: _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService,
                    useValue: workflowCommonWorkspaceService
                }
            ]
        }).compile();
        service = module.get(_workflowversionedgeworkspaceservice.WorkflowVersionEdgeWorkspaceService);
    });
    describe('createWorkflowVersionEdge', ()=>{
        it('should throw if target does not exists', async ()=>{
            const call = async ()=>await service.createWorkflowVersionEdge({
                    source: _workflow.TRIGGER_STEP_ID,
                    target: 'not-existing-step',
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
            await expect(call).rejects.toThrow(`Target step 'not-existing-step' not found in workflowVersion '${mockWorkflowVersionId}'`);
        });
        it('should throw if trigger is not found', async ()=>{
            const mockWorkflowVersionWithoutTrigger = {
                ...mockWorkflowVersion,
                trigger: null
            };
            workflowCommonWorkspaceService.getWorkflowVersionOrFail.mockResolvedValue(mockWorkflowVersionWithoutTrigger);
            const call = async ()=>await service.createWorkflowVersionEdge({
                    source: _workflow.TRIGGER_STEP_ID,
                    target: 'step-1',
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
            await expect(call).rejects.toThrow(`Trigger not found in workflowVersion '${mockWorkflowVersionId}'`);
        });
        describe('with source is the trigger', ()=>{
            it('should create an edge between trigger and step-1', async ()=>{
                const result = await service.createWorkflowVersionEdge({
                    source: _workflow.TRIGGER_STEP_ID,
                    target: 'step-3',
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
                expect(workflowCommonWorkspaceService.getWorkflowVersionOrFail).toHaveBeenCalledWith({
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
                expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalledWith(mockWorkflowVersionId, {
                    trigger: {
                        ...mockTrigger,
                        nextStepIds: [
                            'step-1',
                            'step-3'
                        ]
                    }
                });
                expect(result).toEqual({
                    triggerDiff: [
                        {
                            path: [
                                'trigger',
                                'nextStepIds',
                                1
                            ],
                            type: 'CREATE',
                            value: 'step-3'
                        }
                    ],
                    stepsDiff: []
                });
            });
            it('should not duplicate stepIds if edge already exists', async ()=>{
                const result = await service.createWorkflowVersionEdge({
                    source: _workflow.TRIGGER_STEP_ID,
                    target: 'step-1',
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
                expect(mockWorkflowVersionWorkspaceRepository.update).not.toHaveBeenCalled();
                expect(result).toEqual({
                    triggerDiff: [],
                    stepsDiff: []
                });
            });
        });
        describe('with source is a step', ()=>{
            describe('with iterator step', ()=>{
                const mockIteratorStep = {
                    id: 'iterator-step',
                    type: _workflowactiontype.WorkflowActionType.ITERATOR,
                    settings: {
                        errorHandlingOptions: {
                            continueOnFailure: {
                                value: false
                            },
                            retryOnFailure: {
                                value: false
                            }
                        },
                        input: {
                            initialLoopStepIds: [
                                'step-1'
                            ]
                        }
                    },
                    nextStepIds: [
                        'step-2'
                    ]
                };
                beforeEach(()=>{
                    const mockStepsWithIterator = [
                        ...mockSteps,
                        mockIteratorStep
                    ];
                    const mockWorkflowVersionWithIterator = {
                        ...mockWorkflowVersion,
                        steps: mockStepsWithIterator
                    };
                    workflowCommonWorkspaceService.getWorkflowVersionOrFail.mockResolvedValue(mockWorkflowVersionWithIterator);
                });
                it('should add target to initialLoopStepIds when isConnectedToLoop is true', async ()=>{
                    const result = await service.createWorkflowVersionEdge({
                        source: 'iterator-step',
                        target: 'step-3',
                        workflowVersionId: mockWorkflowVersionId,
                        workspaceId: mockWorkspaceId,
                        sourceConnectionOptions: {
                            connectedStepType: _workflowactiontype.WorkflowActionType.ITERATOR,
                            settings: {
                                isConnectedToLoop: true
                            }
                        }
                    });
                    expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalledWith(mockWorkflowVersionId, {
                        steps: expect.arrayContaining([
                            expect.objectContaining({
                                id: 'iterator-step',
                                settings: expect.objectContaining({
                                    input: expect.objectContaining({
                                        initialLoopStepIds: [
                                            'step-1',
                                            'step-3'
                                        ]
                                    })
                                })
                            })
                        ])
                    });
                    expect(result).toEqual({
                        stepsDiff: [
                            {
                                path: [
                                    'steps',
                                    3,
                                    'settings',
                                    'input',
                                    'initialLoopStepIds',
                                    1
                                ],
                                type: 'CREATE',
                                value: 'step-3'
                            }
                        ],
                        triggerDiff: []
                    });
                });
                it('should not duplicate target in initialLoopStepIds when it already exists', async ()=>{
                    const result = await service.createWorkflowVersionEdge({
                        source: 'iterator-step',
                        target: 'step-1',
                        workflowVersionId: mockWorkflowVersionId,
                        workspaceId: mockWorkspaceId,
                        sourceConnectionOptions: {
                            connectedStepType: _workflowactiontype.WorkflowActionType.ITERATOR,
                            settings: {
                                isConnectedToLoop: true
                            }
                        }
                    });
                    expect(mockWorkflowVersionWorkspaceRepository.update).not.toHaveBeenCalled();
                    expect(result).toEqual({
                        stepsDiff: [],
                        triggerDiff: []
                    });
                });
                it('should throw if source is not an iterator but connection options are for iterator', async ()=>{
                    const call = async ()=>await service.createWorkflowVersionEdge({
                            source: 'step-1',
                            target: 'step-3',
                            workflowVersionId: mockWorkflowVersionId,
                            workspaceId: mockWorkspaceId,
                            sourceConnectionOptions: {
                                connectedStepType: _workflowactiontype.WorkflowActionType.ITERATOR,
                                settings: {
                                    isConnectedToLoop: true
                                }
                            }
                        });
                    await expect(call).rejects.toThrow(`Source step 'step-1' is not an iterator`);
                });
                it('should create normal edge when isConnectedToLoop is false', async ()=>{
                    const result = await service.createWorkflowVersionEdge({
                        source: 'iterator-step',
                        target: 'step-3',
                        workflowVersionId: mockWorkflowVersionId,
                        workspaceId: mockWorkspaceId,
                        sourceConnectionOptions: {
                            connectedStepType: _workflowactiontype.WorkflowActionType.ITERATOR,
                            settings: {
                                isConnectedToLoop: false
                            }
                        }
                    });
                    expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalledWith(mockWorkflowVersionId, {
                        steps: expect.arrayContaining([
                            expect.objectContaining({
                                id: 'iterator-step',
                                nextStepIds: [
                                    'step-2',
                                    'step-3'
                                ]
                            })
                        ])
                    });
                    expect(result).toEqual({
                        stepsDiff: [
                            {
                                path: [
                                    'steps',
                                    3,
                                    'nextStepIds',
                                    1
                                ],
                                type: 'CREATE',
                                value: 'step-3'
                            }
                        ],
                        triggerDiff: []
                    });
                });
            });
            it('should create an edge between step-2 and step-3', async ()=>{
                const result = await service.createWorkflowVersionEdge({
                    source: 'step-2',
                    target: 'step-3',
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
                expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalledWith(mockWorkflowVersionId, {
                    steps: mockSteps.map((step)=>{
                        if (step.id === 'step-2') {
                            return {
                                ...step,
                                nextStepIds: [
                                    'step-3'
                                ]
                            };
                        }
                        return step;
                    })
                });
                expect(result).toEqual({
                    stepsDiff: [
                        {
                            path: [
                                'steps',
                                1,
                                'nextStepIds',
                                0
                            ],
                            type: 'CREATE',
                            value: 'step-3'
                        }
                    ],
                    triggerDiff: []
                });
            });
            it('should not duplicate if edge already exist between 2 steps', async ()=>{
                const result = await service.createWorkflowVersionEdge({
                    source: 'step-1',
                    target: 'step-2',
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
                expect(mockWorkflowVersionWorkspaceRepository.update).not.toHaveBeenCalled();
                expect(result).toEqual({
                    stepsDiff: [],
                    triggerDiff: []
                });
            });
            it('should throw if source step does not exists', async ()=>{
                const call = async ()=>await service.createWorkflowVersionEdge({
                        source: 'not-existing-step',
                        target: 'step-2',
                        workflowVersionId: mockWorkflowVersionId,
                        workspaceId: mockWorkspaceId
                    });
                await expect(call).rejects.toThrow(`Source step 'not-existing-step' not found in workflowVersion '${mockWorkflowVersionId}'`);
            });
        });
    });
    describe('deleteWorkflowVersionEdge', ()=>{
        it('should throw if target does not exists', async ()=>{
            const call = async ()=>await service.deleteWorkflowVersionEdge({
                    source: _workflow.TRIGGER_STEP_ID,
                    target: 'not-existing-step',
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
            await expect(call).rejects.toThrow(`Target step 'not-existing-step' not found in workflowVersion '${mockWorkflowVersionId}'`);
        });
        describe('with source is the trigger', ()=>{
            it('should delete an edge between trigger and step-1', async ()=>{
                const result = await service.deleteWorkflowVersionEdge({
                    source: _workflow.TRIGGER_STEP_ID,
                    target: 'step-1',
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
                expect(workflowCommonWorkspaceService.getWorkflowVersionOrFail).toHaveBeenCalledWith({
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
                expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalledWith(mockWorkflowVersionId, {
                    trigger: {
                        ...mockTrigger,
                        nextStepIds: []
                    }
                });
                expect(result).toEqual({
                    triggerDiff: [
                        {
                            oldValue: 'step-1',
                            path: [
                                'trigger',
                                'nextStepIds',
                                0
                            ],
                            type: 'REMOVE'
                        }
                    ],
                    stepsDiff: []
                });
            });
            it('should not delete if edge does not exists', async ()=>{
                const result = await service.deleteWorkflowVersionEdge({
                    source: _workflow.TRIGGER_STEP_ID,
                    target: 'step-2',
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
                expect(workflowCommonWorkspaceService.getWorkflowVersionOrFail).toHaveBeenCalledWith({
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
                expect(mockWorkflowVersionWorkspaceRepository.update).not.toHaveBeenCalled();
                expect(result).toEqual({
                    stepsDiff: [],
                    triggerDiff: []
                });
            });
        });
        describe('with source is a step', ()=>{
            it('should delete an existing edge between two steps', async ()=>{
                const result = await service.deleteWorkflowVersionEdge({
                    source: 'step-1',
                    target: 'step-2',
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
                expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalledWith(mockWorkflowVersionId, {
                    steps: mockSteps.map((step)=>{
                        if (step.id === 'step-1') {
                            return {
                                ...step,
                                nextStepIds: []
                            };
                        }
                        return step;
                    })
                });
                expect(result).toEqual({
                    stepsDiff: [
                        {
                            oldValue: 'step-2',
                            path: [
                                'steps',
                                0,
                                'nextStepIds',
                                0
                            ],
                            type: 'REMOVE'
                        }
                    ],
                    triggerDiff: []
                });
            });
            it('should not delete if edge does not exist', async ()=>{
                const result = await service.deleteWorkflowVersionEdge({
                    source: 'step-1',
                    target: 'step-3',
                    workflowVersionId: mockWorkflowVersionId,
                    workspaceId: mockWorkspaceId
                });
                expect(mockWorkflowVersionWorkspaceRepository.update).not.toHaveBeenCalledWith();
                expect(result).toEqual({
                    stepsDiff: [],
                    triggerDiff: []
                });
            });
            it('should throw if source step does not exists', async ()=>{
                const call = async ()=>await service.deleteWorkflowVersionEdge({
                        source: 'not-existing-step',
                        target: 'step-2',
                        workflowVersionId: mockWorkflowVersionId,
                        workspaceId: mockWorkspaceId
                    });
                await expect(call).rejects.toThrow(`Source step 'not-existing-step' not found in workflowVersion '${mockWorkflowVersionId}'`);
            });
        });
        describe('with sourceConnectionOptions', ()=>{
            describe('with iterator step', ()=>{
                const mockIteratorStep = {
                    id: 'iterator-step',
                    type: _workflowactiontype.WorkflowActionType.ITERATOR,
                    settings: {
                        errorHandlingOptions: {
                            continueOnFailure: {
                                value: false
                            },
                            retryOnFailure: {
                                value: false
                            }
                        },
                        input: {
                            initialLoopStepIds: [
                                'step-2',
                                'step-3'
                            ]
                        }
                    },
                    nextStepIds: [
                        'step-1'
                    ]
                };
                const mockStepsWithIterator = [
                    mockIteratorStep,
                    ...mockSteps
                ];
                const mockWorkflowVersionWithIterator = {
                    ...mockWorkflowVersion,
                    steps: mockStepsWithIterator
                };
                beforeEach(()=>{
                    workflowCommonWorkspaceService.getWorkflowVersionOrFail.mockResolvedValue(mockWorkflowVersionWithIterator);
                });
                it('should throw if source step is not an iterator when connectedStepType is ITERATOR', async ()=>{
                    const call = async ()=>await service.deleteWorkflowVersionEdge({
                            source: 'step-1',
                            target: 'step-2',
                            workflowVersionId: mockWorkflowVersionId,
                            workspaceId: mockWorkspaceId,
                            sourceConnectionOptions: {
                                connectedStepType: _workflowactiontype.WorkflowActionType.ITERATOR,
                                settings: {
                                    isConnectedToLoop: true
                                }
                            }
                        });
                    await expect(call).rejects.toThrow(`Source step 'step-1' is not an iterator`);
                });
                it('should remove target from initialLoopStepIds when isConnectedToLoop is true', async ()=>{
                    const result = await service.deleteWorkflowVersionEdge({
                        source: 'iterator-step',
                        target: 'step-2',
                        workflowVersionId: mockWorkflowVersionId,
                        workspaceId: mockWorkspaceId,
                        sourceConnectionOptions: {
                            connectedStepType: _workflowactiontype.WorkflowActionType.ITERATOR,
                            settings: {
                                isConnectedToLoop: true
                            }
                        }
                    });
                    expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalledWith(mockWorkflowVersionId, {
                        steps: expect.arrayContaining([
                            expect.objectContaining({
                                id: 'iterator-step',
                                settings: expect.objectContaining({
                                    input: expect.objectContaining({
                                        initialLoopStepIds: [
                                            'step-3'
                                        ]
                                    })
                                })
                            })
                        ])
                    });
                    expect(result).toEqual({
                        stepsDiff: [
                            {
                                oldValue: 'step-2',
                                path: [
                                    'steps',
                                    0,
                                    'settings',
                                    'input',
                                    'initialLoopStepIds',
                                    0
                                ],
                                type: 'CHANGE',
                                value: 'step-3'
                            },
                            {
                                oldValue: 'step-3',
                                path: [
                                    'steps',
                                    0,
                                    'settings',
                                    'input',
                                    'initialLoopStepIds',
                                    1
                                ],
                                type: 'REMOVE'
                            }
                        ],
                        triggerDiff: []
                    });
                });
                it('should not update if target is not in initialLoopStepIds when isConnectedToLoop is true', async ()=>{
                    const result = await service.deleteWorkflowVersionEdge({
                        source: 'iterator-step',
                        target: 'step-1',
                        workflowVersionId: mockWorkflowVersionId,
                        workspaceId: mockWorkspaceId,
                        sourceConnectionOptions: {
                            connectedStepType: _workflowactiontype.WorkflowActionType.ITERATOR,
                            settings: {
                                isConnectedToLoop: true
                            }
                        }
                    });
                    expect(mockWorkflowVersionWorkspaceRepository.update).not.toHaveBeenCalled();
                    expect(result).toEqual({
                        stepsDiff: [],
                        triggerDiff: []
                    });
                });
                it('should remove target from nextStepIds when isConnectedToLoop is false', async ()=>{
                    const result = await service.deleteWorkflowVersionEdge({
                        source: 'iterator-step',
                        target: 'step-1',
                        workflowVersionId: mockWorkflowVersionId,
                        workspaceId: mockWorkspaceId,
                        sourceConnectionOptions: {
                            connectedStepType: _workflowactiontype.WorkflowActionType.ITERATOR,
                            settings: {
                                isConnectedToLoop: false
                            }
                        }
                    });
                    expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalledWith(mockWorkflowVersionId, {
                        steps: expect.arrayContaining([
                            expect.objectContaining({
                                id: 'iterator-step',
                                nextStepIds: []
                            })
                        ])
                    });
                    expect(result).toEqual({
                        stepsDiff: [
                            {
                                oldValue: 'step-1',
                                path: [
                                    'steps',
                                    0,
                                    'nextStepIds',
                                    0
                                ],
                                type: 'REMOVE'
                            }
                        ],
                        triggerDiff: []
                    });
                });
            });
        });
    });
});

//# sourceMappingURL=workflow-version-edge.workspace-service.spec.js.map