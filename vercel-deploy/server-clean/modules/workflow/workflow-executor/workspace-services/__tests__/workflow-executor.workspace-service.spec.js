"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _workflow = require("twenty-shared/workflow");
const _billingusageservice = require("../../../../../engine/core-modules/billing/services/billing-usage.service");
const _billingservice = require("../../../../../engine/core-modules/billing/services/billing.service");
const _exceptionhandlerservice = require("../../../../../engine/core-modules/exception-handler/exception-handler.service");
const _messagequeueconstants = require("../../../../../engine/core-modules/message-queue/message-queue.constants");
const _metricsservice = require("../../../../../engine/core-modules/metrics/metrics.service");
const _usagerecordedconstant = require("../../../../../engine/core-modules/usage/constants/usage-recorded.constant");
const _usageoperationtypeenum = require("../../../../../engine/core-modules/usage/enums/usage-operation-type.enum");
const _usageresourcetypeenum = require("../../../../../engine/core-modules/usage/enums/usage-resource-type.enum");
const _usageunitenum = require("../../../../../engine/core-modules/usage/enums/usage-unit.enum");
const _workspacecacheservice = require("../../../../../engine/workspace-cache/services/workspace-cache.service");
const _workspaceeventemitter = require("../../../../../engine/workspace-event-emitter/workspace-event-emitter");
const _workflowactionfactory = require("../../factories/workflow-action.factory");
const _shouldexecutesteputil = require("../../utils/should-execute-step.util");
const _shouldfailsafelyutil = require("../../utils/should-fail-safely.util");
const _shouldskipstepexecutionutil = require("../../utils/should-skip-step-execution.util");
const _workflowactiontype = require("../../workflow-actions/types/workflow-action.type");
const _workflowexecutorworkspaceservice = require("../workflow-executor.workspace-service");
const _workflowrunworkspaceservice = require("../../../workflow-runner/workflow-run/workflow-run.workspace-service");
jest.mock('src/modules/workflow/workflow-executor/utils/should-execute-step.util', ()=>{
    const actual = jest.requireActual('src/modules/workflow/workflow-executor/utils/should-execute-step.util');
    return {
        ...actual,
        shouldExecuteStep: jest.fn().mockReturnValue(true)
    };
});
jest.mock('src/modules/workflow/workflow-executor/utils/should-fail-safely.util', ()=>({
        shouldFailSafely: jest.fn().mockReturnValue(false)
    }));
jest.mock('src/modules/workflow/workflow-executor/utils/should-skip-step-execution.util', ()=>({
        shouldSkipStepExecution: jest.fn().mockReturnValue(false)
    }));
describe('WorkflowExecutorWorkspaceService', ()=>{
    let service;
    let workflowActionFactory;
    let workspaceEventEmitter;
    let workflowRunWorkspaceService;
    const mockWorkflowExecutor = {
        execute: jest.fn().mockResolvedValue({
            result: {
                success: true
            }
        })
    };
    const mockWorkspaceEventEmitter = {
        emitCustomBatchEvent: jest.fn()
    };
    const mockWorkflowRunWorkspaceService = {
        endWorkflowRun: jest.fn(),
        updateWorkflowRunStepInfo: jest.fn(),
        getWorkflowRunOrFail: jest.fn()
    };
    const mockBillingService = {
        isBillingEnabled: jest.fn().mockReturnValue(true)
    };
    const mockBillingUsageService = {
        hasAvailableCredits: jest.fn().mockResolvedValue(true),
        decrementAvailableCreditsInCache: jest.fn().mockResolvedValue(undefined)
    };
    const mockExceptionHandlerService = {
        captureExceptions: jest.fn()
    };
    const mockMetricsService = {
        incrementCounterForEvent: jest.fn()
    };
    const mockMessageQueueService = {
        add: jest.fn()
    };
    beforeEach(async ()=>{
        jest.clearAllMocks();
        const module = await _testing.Test.createTestingModule({
            providers: [
                _workflowexecutorworkspaceservice.WorkflowExecutorWorkspaceService,
                {
                    provide: _workflowactionfactory.WorkflowActionFactory,
                    useValue: {
                        get: jest.fn().mockReturnValue(mockWorkflowExecutor)
                    }
                },
                {
                    provide: _workspaceeventemitter.WorkspaceEventEmitter,
                    useValue: mockWorkspaceEventEmitter
                },
                {
                    provide: _workflowrunworkspaceservice.WorkflowRunWorkspaceService,
                    useValue: mockWorkflowRunWorkspaceService
                },
                {
                    provide: _billingservice.BillingService,
                    useValue: mockBillingService
                },
                {
                    provide: _billingusageservice.BillingUsageService,
                    useValue: mockBillingUsageService
                },
                {
                    provide: _workspacecacheservice.WorkspaceCacheService,
                    useValue: {
                        getOrRecompute: jest.fn().mockResolvedValue({
                            billingSubscription: {
                                currentPeriodStart: new Date('2026-04-01T00:00:00Z')
                            }
                        })
                    }
                },
                {
                    provide: _exceptionhandlerservice.ExceptionHandlerService,
                    useValue: mockExceptionHandlerService
                },
                {
                    provide: `MESSAGE_QUEUE_${_messagequeueconstants.MessageQueue.workflowQueue}`,
                    useValue: mockMessageQueueService
                },
                {
                    provide: _metricsservice.MetricsService,
                    useValue: mockMetricsService
                }
            ]
        }).compile();
        service = module.get(_workflowexecutorworkspaceservice.WorkflowExecutorWorkspaceService);
        workflowActionFactory = module.get(_workflowactionfactory.WorkflowActionFactory);
        workspaceEventEmitter = module.get(_workspaceeventemitter.WorkspaceEventEmitter);
        workflowRunWorkspaceService = module.get(_workflowrunworkspaceservice.WorkflowRunWorkspaceService);
    });
    describe('execute', ()=>{
        const mockWorkflowRunId = 'workflow-run-id';
        const mockWorkspaceId = 'workspace-id';
        const mockSteps = [
            {
                id: 'step-1',
                type: _workflowactiontype.WorkflowActionType.CODE,
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
            }
        ];
        const mockStepInfos = {
            trigger: {
                result: {},
                status: _workflow.StepStatus.SUCCESS
            },
            'step-1': {
                status: _workflow.StepStatus.NOT_STARTED
            },
            'step-2': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        mockWorkflowRunWorkspaceService.getWorkflowRunOrFail.mockReturnValue({
            state: {
                flow: {
                    steps: mockSteps
                },
                stepInfos: mockStepInfos
            },
            workflowId: 'workflow-id'
        });
        it('should execute a step and continue to the next step on success', async ()=>{
            const mockStepResult = {
                result: {
                    stepOutput: 'success'
                }
            };
            mockWorkflowExecutor.execute.mockResolvedValueOnce(mockStepResult);
            await service.executeFromSteps({
                workflowRunId: mockWorkflowRunId,
                stepIds: [
                    'step-1'
                ],
                workspaceId: mockWorkspaceId
            });
            expect(workflowActionFactory.get).toHaveBeenCalledWith(_workflowactiontype.WorkflowActionType.CODE);
            expect(mockWorkflowExecutor.execute).toHaveBeenCalledWith({
                currentStepId: 'step-1',
                steps: mockSteps,
                context: (0, _workflow.getWorkflowRunContext)(mockStepInfos),
                runInfo: {
                    workflowRunId: mockWorkflowRunId,
                    workspaceId: mockWorkspaceId
                }
            });
            expect(workspaceEventEmitter.emitCustomBatchEvent).toHaveBeenCalledWith(_usagerecordedconstant.USAGE_RECORDED, [
                {
                    resourceType: _usageresourcetypeenum.UsageResourceType.WORKFLOW,
                    operationType: _usageoperationtypeenum.UsageOperationType.WORKFLOW_EXECUTION,
                    creditsUsedMicro: 100,
                    quantity: 1,
                    unit: _usageunitenum.UsageUnit.INVOCATION,
                    resourceId: 'workflow-id',
                    periodStart: new Date('2026-04-01T00:00:00.000Z')
                }
            ], 'workspace-id');
            expect(workflowRunWorkspaceService.updateWorkflowRunStepInfo).toHaveBeenCalledTimes(4);
            expect(workflowRunWorkspaceService.updateWorkflowRunStepInfo).toHaveBeenNthCalledWith(1, {
                stepId: 'step-1',
                stepInfo: {
                    status: _workflow.StepStatus.RUNNING
                },
                workflowRunId: mockWorkflowRunId,
                workspaceId: 'workspace-id'
            });
            expect(workflowRunWorkspaceService.updateWorkflowRunStepInfo).toHaveBeenNthCalledWith(2, {
                stepId: 'step-1',
                stepInfo: {
                    ...mockStepResult,
                    status: _workflow.StepStatus.SUCCESS
                },
                workflowRunId: mockWorkflowRunId,
                workspaceId: 'workspace-id'
            });
            // execute second step
            expect(workflowActionFactory.get).toHaveBeenCalledWith(_workflowactiontype.WorkflowActionType.SEND_EMAIL);
        });
        it('should handle step execution errors', async ()=>{
            mockWorkflowExecutor.execute.mockRejectedValueOnce(new Error('Step execution failed'));
            await service.executeFromSteps({
                workflowRunId: mockWorkflowRunId,
                stepIds: [
                    'step-1'
                ],
                workspaceId: mockWorkspaceId
            });
            expect(workspaceEventEmitter.emitCustomBatchEvent).not.toHaveBeenCalled();
            expect(workflowRunWorkspaceService.updateWorkflowRunStepInfo).toHaveBeenCalledTimes(2);
            expect(workflowRunWorkspaceService.updateWorkflowRunStepInfo).toHaveBeenNthCalledWith(1, {
                stepId: 'step-1',
                stepInfo: {
                    status: _workflow.StepStatus.RUNNING
                },
                workflowRunId: mockWorkflowRunId,
                workspaceId: 'workspace-id'
            });
            expect(workflowRunWorkspaceService.updateWorkflowRunStepInfo).toHaveBeenNthCalledWith(2, {
                stepId: 'step-1',
                stepInfo: {
                    error: 'Step execution failed',
                    status: _workflow.StepStatus.FAILED
                },
                workflowRunId: mockWorkflowRunId,
                workspaceId: 'workspace-id'
            });
        });
        it('should handle pending events', async ()=>{
            const mockPendingEvent = {
                pendingEvent: true
            };
            mockWorkflowExecutor.execute.mockResolvedValueOnce(mockPendingEvent);
            await service.executeFromSteps({
                workflowRunId: mockWorkflowRunId,
                stepIds: [
                    'step-1'
                ],
                workspaceId: mockWorkspaceId
            });
            expect(workflowRunWorkspaceService.updateWorkflowRunStepInfo).toHaveBeenCalledTimes(2);
            expect(workflowRunWorkspaceService.updateWorkflowRunStepInfo).toHaveBeenNthCalledWith(1, {
                stepId: 'step-1',
                stepInfo: {
                    status: _workflow.StepStatus.RUNNING
                },
                workflowRunId: mockWorkflowRunId,
                workspaceId: 'workspace-id'
            });
            expect(workflowRunWorkspaceService.updateWorkflowRunStepInfo).toHaveBeenNthCalledWith(2, {
                stepId: 'step-1',
                stepInfo: {
                    status: _workflow.StepStatus.PENDING
                },
                workflowRunId: mockWorkflowRunId,
                workspaceId: 'workspace-id'
            });
            // No recursive call to execute should happen
            expect(workflowActionFactory.get).not.toHaveBeenCalledWith(_workflowactiontype.WorkflowActionType.SEND_EMAIL);
        });
        it('should not emit billing event for skipped steps', async ()=>{
            _shouldexecutesteputil.shouldExecuteStep.mockReturnValue(false);
            _shouldskipstepexecutionutil.shouldSkipStepExecution.mockReturnValue(true);
            await service.executeFromSteps({
                workflowRunId: mockWorkflowRunId,
                stepIds: [
                    'step-1'
                ],
                workspaceId: mockWorkspaceId
            });
            expect(workflowActionFactory.get).not.toHaveBeenCalled();
            expect(workspaceEventEmitter.emitCustomBatchEvent).not.toHaveBeenCalled();
            _shouldexecutesteputil.shouldExecuteStep.mockReturnValue(true);
            _shouldskipstepexecutionutil.shouldSkipStepExecution.mockReturnValue(false);
        });
        it('should not emit billing event for fail-safely steps', async ()=>{
            _shouldexecutesteputil.shouldExecuteStep.mockReturnValue(false);
            _shouldfailsafelyutil.shouldFailSafely.mockReturnValue(true);
            await service.executeFromSteps({
                workflowRunId: mockWorkflowRunId,
                stepIds: [
                    'step-1'
                ],
                workspaceId: mockWorkspaceId
            });
            expect(workflowActionFactory.get).not.toHaveBeenCalled();
            expect(workspaceEventEmitter.emitCustomBatchEvent).not.toHaveBeenCalled();
            _shouldexecutesteputil.shouldExecuteStep.mockReturnValue(true);
            _shouldfailsafelyutil.shouldFailSafely.mockReturnValue(false);
        });
        it('should return if step should not be executed', async ()=>{
            _shouldexecutesteputil.shouldExecuteStep.mockReturnValueOnce(false);
            await service.executeFromSteps({
                workflowRunId: mockWorkflowRunId,
                stepIds: [
                    'step-1'
                ],
                workspaceId: mockWorkspaceId
            });
            expect(workflowActionFactory.get).not.toHaveBeenCalled();
        });
        it('should queue another job when max executed step count is reached', async ()=>{
            const mockStepResult = {
                result: {
                    stepOutput: 'success'
                }
            };
            mockWorkflowExecutor.execute.mockResolvedValueOnce(mockStepResult);
            await service.executeFromSteps({
                workflowRunId: mockWorkflowRunId,
                stepIds: [
                    'step-1'
                ],
                workspaceId: mockWorkspaceId,
                executedStepsCount: 21
            });
            expect(mockMessageQueueService.add).toHaveBeenCalledWith('RunWorkflowJob', {
                workspaceId: mockWorkspaceId,
                workflowRunId: mockWorkflowRunId,
                lastExecutedStepId: 'step-1'
            });
            // Should not execute the next step (step-2) in the same job
            expect(workflowActionFactory.get).toHaveBeenCalledTimes(1);
            expect(workflowActionFactory.get).toHaveBeenCalledWith(_workflowactiontype.WorkflowActionType.CODE);
        });
    });
    describe('getNextStepIdsToExecute', ()=>{
        it('should return nextStepIds for a regular step', async ()=>{
            const step = {
                id: 'step-1',
                type: _workflowactiontype.WorkflowActionType.CODE,
                nextStepIds: [
                    'step-2',
                    'step-3'
                ],
                settings: {}
            };
            const result = await service.getNextStepIdsToExecute({
                executedStep: step,
                executedStepOutput: {
                    result: {}
                }
            });
            expect(result).toEqual({
                nextStepIdsToExecute: [
                    'step-2',
                    'step-3'
                ]
            });
        });
        it('should return initialLoopStepIds for an iterator that has not processed all items', async ()=>{
            const step = {
                id: 'iterator-1',
                type: _workflowactiontype.WorkflowActionType.ITERATOR,
                nextStepIds: [
                    'after-loop'
                ],
                settings: {
                    input: {
                        initialLoopStepIds: [
                            'loop-step-1'
                        ]
                    }
                }
            };
            const result = await service.getNextStepIdsToExecute({
                executedStep: step,
                executedStepOutput: {
                    result: {
                        hasProcessedAllItems: false
                    }
                }
            });
            expect(result).toEqual({
                nextStepIdsToExecute: [
                    'loop-step-1'
                ]
            });
        });
        it('should return nextStepIds for an iterator that has processed all items', async ()=>{
            const step = {
                id: 'iterator-1',
                type: _workflowactiontype.WorkflowActionType.ITERATOR,
                nextStepIds: [
                    'after-loop'
                ],
                settings: {
                    input: {
                        initialLoopStepIds: [
                            'loop-step-1'
                        ]
                    }
                }
            };
            const result = await service.getNextStepIdsToExecute({
                executedStep: step,
                executedStepOutput: {
                    result: {
                        hasProcessedAllItems: true
                    }
                }
            });
            expect(result).toEqual({
                nextStepIdsToExecute: [
                    'after-loop'
                ]
            });
        });
        it('should return matching branch nextStepIds and non-matching branch nextStepIds to skip for if-else', async ()=>{
            const step = {
                id: 'if-else-1',
                type: _workflowactiontype.WorkflowActionType.IF_ELSE,
                nextStepIds: [],
                settings: {
                    input: {
                        branches: [
                            {
                                id: 'branch-if',
                                filterGroupId: 'fg1',
                                nextStepIds: [
                                    'step-a'
                                ]
                            },
                            {
                                id: 'branch-else',
                                nextStepIds: [
                                    'step-b'
                                ]
                            }
                        ],
                        stepFilterGroups: [],
                        stepFilters: []
                    }
                }
            };
            const result = await service.getNextStepIdsToExecute({
                executedStep: step,
                executedStepOutput: {
                    result: {
                        matchingBranchId: 'branch-if'
                    }
                }
            });
            expect(result).toEqual({
                nextStepIdsToExecute: [
                    'step-a'
                ],
                nextStepIdsToSkip: [
                    'step-b'
                ]
            });
        });
        it('should return nextStepIds for a fail-safe iterator instead of entering the loop', async ()=>{
            const step = {
                id: 'iterator-1',
                type: _workflowactiontype.WorkflowActionType.ITERATOR,
                nextStepIds: [
                    'after-loop'
                ],
                settings: {
                    input: {
                        initialLoopStepIds: [
                            'loop-step-1'
                        ]
                    }
                }
            };
            const result = await service.getNextStepIdsToExecute({
                executedStep: step,
                executedStepOutput: {
                    shouldFailSafely: true
                }
            });
            expect(result).toEqual({
                nextStepIdsToExecute: [
                    'after-loop'
                ]
            });
        });
        it('should return nextStepIds for a skipped iterator instead of entering the loop', async ()=>{
            const step = {
                id: 'iterator-1',
                type: _workflowactiontype.WorkflowActionType.ITERATOR,
                nextStepIds: [
                    'after-loop'
                ],
                settings: {
                    input: {
                        initialLoopStepIds: [
                            'loop-step-1'
                        ]
                    }
                }
            };
            const result = await service.getNextStepIdsToExecute({
                executedStep: step,
                executedStepOutput: {
                    shouldSkipStepExecution: true
                }
            });
            expect(result).toEqual({
                nextStepIdsToExecute: [
                    'after-loop'
                ]
            });
        });
        it('should return nextStepIdsToFailSafely for all branches when if-else is fail-safe', async ()=>{
            const step = {
                id: 'if-else-1',
                type: _workflowactiontype.WorkflowActionType.IF_ELSE,
                nextStepIds: [],
                settings: {
                    input: {
                        branches: [
                            {
                                id: 'branch-if',
                                filterGroupId: 'fg1',
                                nextStepIds: [
                                    'step-a'
                                ]
                            },
                            {
                                id: 'branch-else',
                                nextStepIds: [
                                    'step-b'
                                ]
                            }
                        ],
                        stepFilterGroups: [],
                        stepFilters: []
                    }
                }
            };
            const result = await service.getNextStepIdsToExecute({
                executedStep: step,
                executedStepOutput: {
                    shouldFailSafely: true
                }
            });
            expect(result).toEqual({
                nextStepIdsToFailSafely: [
                    'step-a',
                    'step-b'
                ]
            });
        });
        it('should return nextStepIdsToSkip for all branches when if-else has no matching branch', async ()=>{
            const step = {
                id: 'if-else-1',
                type: _workflowactiontype.WorkflowActionType.IF_ELSE,
                nextStepIds: [],
                settings: {
                    input: {
                        branches: [
                            {
                                id: 'branch-if',
                                filterGroupId: 'fg1',
                                nextStepIds: [
                                    'step-a'
                                ]
                            },
                            {
                                id: 'branch-else',
                                nextStepIds: [
                                    'step-b'
                                ]
                            }
                        ],
                        stepFilterGroups: [],
                        stepFilters: []
                    }
                }
            };
            const result = await service.getNextStepIdsToExecute({
                executedStep: step,
                executedStepOutput: {
                    shouldSkipStepExecution: true
                }
            });
            expect(result).toEqual({
                nextStepIdsToSkip: [
                    'step-a',
                    'step-b'
                ]
            });
        });
        it('should skip multiple non-matching branches for if-else with many branches', async ()=>{
            const step = {
                id: 'if-else-1',
                type: _workflowactiontype.WorkflowActionType.IF_ELSE,
                nextStepIds: [],
                settings: {
                    input: {
                        branches: [
                            {
                                id: 'branch-1',
                                filterGroupId: 'fg1',
                                nextStepIds: [
                                    'step-a'
                                ]
                            },
                            {
                                id: 'branch-2',
                                filterGroupId: 'fg2',
                                nextStepIds: [
                                    'step-b'
                                ]
                            },
                            {
                                id: 'branch-else',
                                nextStepIds: [
                                    'step-c'
                                ]
                            }
                        ],
                        stepFilterGroups: [],
                        stepFilters: []
                    }
                }
            };
            const result = await service.getNextStepIdsToExecute({
                executedStep: step,
                executedStepOutput: {
                    result: {
                        matchingBranchId: 'branch-2'
                    }
                }
            });
            expect(result).toEqual({
                nextStepIdsToExecute: [
                    'step-b'
                ],
                nextStepIdsToSkip: [
                    'step-a',
                    'step-c'
                ]
            });
        });
    });
    describe('sendWorkflowNodeRunEvent', ()=>{
        it('should emit a billing event', async ()=>{
            await service['sendWorkflowNodeRunEvent']('workspace-id', 'workflow-id');
            expect(workspaceEventEmitter.emitCustomBatchEvent).toHaveBeenCalledWith(_usagerecordedconstant.USAGE_RECORDED, [
                {
                    resourceType: _usageresourcetypeenum.UsageResourceType.WORKFLOW,
                    operationType: _usageoperationtypeenum.UsageOperationType.WORKFLOW_EXECUTION,
                    creditsUsedMicro: 100,
                    quantity: 1,
                    unit: _usageunitenum.UsageUnit.INVOCATION,
                    resourceId: 'workflow-id',
                    periodStart: new Date('2026-04-01T00:00:00.000Z')
                }
            ], 'workspace-id');
        });
    });
});

//# sourceMappingURL=workflow-executor.workspace-service.spec.js.map