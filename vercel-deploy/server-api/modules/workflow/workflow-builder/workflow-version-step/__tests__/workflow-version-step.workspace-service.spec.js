"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _workflow = require("twenty-shared/workflow");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _workflowcommonworkspaceservice = require("../../../common/workspace-services/workflow-common.workspace-service");
const _workflowschemaworkspaceservice = require("../../workflow-schema/workflow-schema.workspace-service");
const _workflowversionstepcreationworkspaceservice = require("../workflow-version-step-creation.workspace-service");
const _workflowversionstepdeletionworkspaceservice = require("../workflow-version-step-deletion.workspace-service");
const _workflowversionstephelpersworkspaceservice = require("../workflow-version-step-helpers.workspace-service");
const _workflowversionstepoperationsworkspaceservice = require("../workflow-version-step-operations.workspace-service");
const _workflowversionstepupdateworkspaceservice = require("../workflow-version-step-update.workspace-service");
const _workflowversionstepworkspaceservice = require("../workflow-version-step.workspace-service");
const _workflowactiontype = require("../../../workflow-executor/workflow-actions/types/workflow-action.type");
const _workflowtriggertype = require("../../../workflow-trigger/types/workflow-trigger.type");
jest.mock('src/modules/workflow/workflow-builder/utils/compute-workflow-version-step-updates.util', ()=>({
        computeWorkflowVersionStepChanges: jest.fn()
    }));
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
describe('WorkflowVersionStepWorkspaceService', ()=>{
    let globalWorkspaceOrmManager;
    let service;
    let mockWorkflowVersionWorkspaceRepository;
    let mockComputeWorkflowVersionStepChanges;
    beforeEach(async ()=>{
        const { computeWorkflowVersionStepChanges } = require('src/modules/workflow/workflow-builder/utils/compute-workflow-version-step-updates.util');
        mockComputeWorkflowVersionStepChanges = computeWorkflowVersionStepChanges;
        mockWorkflowVersionWorkspaceRepository = {
            findOne: jest.fn(),
            update: jest.fn()
        };
        mockWorkflowVersionWorkspaceRepository.findOne.mockResolvedValue(mockWorkflowVersion);
        globalWorkspaceOrmManager = {
            getRepository: jest.fn().mockResolvedValue(mockWorkflowVersionWorkspaceRepository),
            executeInWorkspaceContext: jest.fn().mockImplementation((fn, _authContext)=>fn())
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _workflowversionstepworkspaceservice.WorkflowVersionStepWorkspaceService,
                _workflowversionstephelpersworkspaceservice.WorkflowVersionStepHelpersWorkspaceService,
                _workflowversionstepcreationworkspaceservice.WorkflowVersionStepCreationWorkspaceService,
                _workflowversionstepupdateworkspaceservice.WorkflowVersionStepUpdateWorkspaceService,
                _workflowversionstepdeletionworkspaceservice.WorkflowVersionStepDeletionWorkspaceService,
                {
                    provide: _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
                    useValue: globalWorkspaceOrmManager
                },
                {
                    provide: _workflowschemaworkspaceservice.WorkflowSchemaWorkspaceService,
                    useValue: {
                        enrichOutputSchema: jest.fn().mockImplementation((args)=>args.step)
                    }
                },
                {
                    provide: _workflowversionstepoperationsworkspaceservice.WorkflowVersionStepOperationsWorkspaceService,
                    useValue: {
                        runStepCreationSideEffectsAndBuildStep: jest.fn().mockImplementation(({ type })=>({
                                builtStep: {
                                    id: 'new-step-id',
                                    type,
                                    settings: {},
                                    nextStepIds: []
                                },
                                additionalCreatedSteps: []
                            })),
                        runWorkflowVersionStepDeletionSideEffects: jest.fn(),
                        cloneStep: jest.fn().mockImplementation(({ step })=>({
                                ...step,
                                id: 'cloned-step-id'
                            })),
                        markStepAsDuplicate: jest.fn().mockImplementation(({ step })=>step),
                        createDraftStep: jest.fn().mockImplementation(({ step })=>step)
                    }
                },
                {
                    provide: _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService,
                    useValue: {
                        getWorkflowVersionOrFail: jest.fn().mockResolvedValue(mockWorkflowVersion)
                    }
                }
            ]
        }).compile();
        service = module.get(_workflowversionstepworkspaceservice.WorkflowVersionStepWorkspaceService);
    });
    describe('createWorkflowVersionStep', ()=>{
        it('should create a step linked to trigger', async ()=>{
            const mockChanges = {
                triggerDiff: [
                    {
                        type: 'CHANGE',
                        path: [
                            'nextStepIds'
                        ],
                        value: [
                            'step-1',
                            'new-step-id'
                        ]
                    }
                ],
                stepsDiff: [
                    {
                        type: 'CREATE',
                        path: [],
                        value: {
                            id: 'new-step-id',
                            type: 'FORM'
                        }
                    }
                ]
            };
            mockComputeWorkflowVersionStepChanges.mockReturnValue(mockChanges);
            const result = await service.createWorkflowVersionStep({
                input: {
                    stepType: _workflowactiontype.WorkflowActionType.FORM,
                    parentStepId: _workflow.TRIGGER_STEP_ID,
                    nextStepId: undefined,
                    workflowVersionId: mockWorkflowVersionId
                },
                workspaceId: mockWorkspaceId
            });
            expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalled();
            expect(mockComputeWorkflowVersionStepChanges).toHaveBeenCalled();
            expect(result).toEqual(mockChanges);
            expect(result.triggerDiff).toBeDefined();
            expect(result.stepsDiff).toBeDefined();
        });
        it('should create a step between a trigger and a step', async ()=>{
            const mockChanges = {
                triggerDiff: [
                    {
                        type: 'CHANGE',
                        path: [
                            'nextStepIds'
                        ],
                        value: [
                            'new-step-id'
                        ]
                    }
                ],
                stepsDiff: [
                    {
                        type: 'CREATE',
                        path: [],
                        value: {
                            id: 'new-step-id',
                            type: 'FORM',
                            nextStepIds: [
                                'step-1'
                            ]
                        }
                    }
                ]
            };
            mockComputeWorkflowVersionStepChanges.mockReturnValue(mockChanges);
            const result = await service.createWorkflowVersionStep({
                input: {
                    stepType: _workflowactiontype.WorkflowActionType.FORM,
                    parentStepId: _workflow.TRIGGER_STEP_ID,
                    nextStepId: 'step-1',
                    workflowVersionId: mockWorkflowVersionId
                },
                workspaceId: mockWorkspaceId
            });
            expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalled();
            expect(mockComputeWorkflowVersionStepChanges).toHaveBeenCalled();
            expect(result).toEqual(mockChanges);
            expect(result.triggerDiff).toBeDefined();
            expect(result.stepsDiff).toBeDefined();
        });
        it('should create a step between two steps', async ()=>{
            const mockChanges = {
                triggerDiff: [],
                stepsDiff: [
                    {
                        type: 'CHANGE',
                        path: [
                            0,
                            'nextStepIds'
                        ],
                        value: [
                            'new-step-id'
                        ]
                    },
                    {
                        type: 'CREATE',
                        path: [],
                        value: {
                            id: 'new-step-id',
                            type: 'FORM',
                            nextStepIds: [
                                'step-2'
                            ]
                        }
                    }
                ]
            };
            mockComputeWorkflowVersionStepChanges.mockReturnValue(mockChanges);
            const result = await service.createWorkflowVersionStep({
                input: {
                    stepType: _workflowactiontype.WorkflowActionType.FORM,
                    parentStepId: 'step-1',
                    nextStepId: 'step-2',
                    workflowVersionId: mockWorkflowVersionId
                },
                workspaceId: mockWorkspaceId
            });
            expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalled();
            expect(mockComputeWorkflowVersionStepChanges).toHaveBeenCalled();
            expect(result).toEqual(mockChanges);
            expect(result.triggerDiff).toBeDefined();
            expect(result.stepsDiff).toBeDefined();
        });
        it('should create a step without parent or children', async ()=>{
            const mockChanges = {
                triggerDiff: [],
                stepsDiff: [
                    {
                        type: 'CREATE',
                        path: [],
                        value: {
                            id: 'new-step-id',
                            type: 'FORM'
                        }
                    }
                ]
            };
            mockComputeWorkflowVersionStepChanges.mockReturnValue(mockChanges);
            const result = await service.createWorkflowVersionStep({
                input: {
                    stepType: _workflowactiontype.WorkflowActionType.FORM,
                    parentStepId: undefined,
                    nextStepId: undefined,
                    workflowVersionId: mockWorkflowVersionId
                },
                workspaceId: mockWorkspaceId
            });
            expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalled();
            expect(mockComputeWorkflowVersionStepChanges).toHaveBeenCalled();
            expect(result).toEqual(mockChanges);
            expect(result.triggerDiff).toBeDefined();
            expect(result.stepsDiff).toBeDefined();
        });
    });
    describe('deleteWorkflowVersionStep', ()=>{
        it('should delete step linked to trigger', async ()=>{
            const mockChanges = {
                triggerDiff: [
                    {
                        type: 'CHANGE',
                        path: [
                            'nextStepIds'
                        ],
                        value: [
                            'step-2'
                        ]
                    }
                ],
                stepsDiff: [
                    {
                        type: 'REMOVE',
                        path: [
                            0
                        ]
                    }
                ]
            };
            mockComputeWorkflowVersionStepChanges.mockReturnValue(mockChanges);
            const result = await service.deleteWorkflowVersionStep({
                stepIdToDelete: 'step-1',
                workflowVersionId: mockWorkflowVersionId,
                workspaceId: mockWorkspaceId
            });
            expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalled();
            expect(mockComputeWorkflowVersionStepChanges).toHaveBeenCalled();
            expect(result).toEqual(mockChanges);
            expect(result.triggerDiff).toBeDefined();
            expect(result.stepsDiff).toBeDefined();
        });
        it('should delete trigger', async ()=>{
            const mockChanges = {
                triggerDiff: [
                    {
                        type: 'REMOVE',
                        path: []
                    }
                ],
                stepsDiff: []
            };
            mockComputeWorkflowVersionStepChanges.mockReturnValue(mockChanges);
            const result = await service.deleteWorkflowVersionStep({
                stepIdToDelete: _workflow.TRIGGER_STEP_ID,
                workflowVersionId: mockWorkflowVersionId,
                workspaceId: mockWorkspaceId
            });
            expect(mockWorkflowVersionWorkspaceRepository.update).toHaveBeenCalled();
            expect(mockComputeWorkflowVersionStepChanges).toHaveBeenCalled();
            expect(result).toEqual(mockChanges);
            expect(result.triggerDiff).toBeDefined();
            expect(result.stepsDiff).toBeDefined();
        });
    });
});

//# sourceMappingURL=workflow-version-step.workspace-service.spec.js.map