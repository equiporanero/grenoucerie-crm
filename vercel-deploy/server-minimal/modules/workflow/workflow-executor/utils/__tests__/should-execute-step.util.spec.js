"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _workflow = require("twenty-shared/workflow");
const _workflowrunworkspaceentity = require("../../../common/standard-objects/workflow-run.workspace-entity");
const _shouldexecutesteputil = require("../should-execute-step.util");
const _workflowactiontype = require("../../workflow-actions/types/workflow-action.type");
describe('shouldExecuteStep', ()=>{
    const steps = [
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
                'step-3'
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
            nextStepIds: [
                'step-3'
            ]
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
    it('should return true if all parents succeeded', ()=>{
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'step-2': {
                status: _workflow.StepStatus.SUCCESS
            },
            'step-3': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos,
            steps,
            step: steps[2],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        });
        expect(result).toBe(true);
    });
    it('should return false if one parent is not succeeded', ()=>{
        expect((0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.NOT_STARTED
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-3': {
                    status: _workflow.StepStatus.NOT_STARTED
                }
            },
            steps,
            step: steps[2],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        })).toBe(false);
        expect((0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.NOT_STARTED
                },
                'step-3': {
                    status: _workflow.StepStatus.NOT_STARTED
                }
            },
            steps,
            step: steps[2],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        })).toBe(false);
        expect((0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.NOT_STARTED
                },
                'step-2': {
                    status: _workflow.StepStatus.NOT_STARTED
                },
                'step-3': {
                    status: _workflow.StepStatus.NOT_STARTED
                }
            },
            steps,
            step: steps[2],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        })).toBe(false);
    });
    it('should return false if step has already ran', ()=>{
        expect((0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-3': {
                    status: _workflow.StepStatus.SUCCESS
                }
            },
            steps,
            step: steps[2],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        })).toBe(false);
        expect((0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-3': {
                    status: _workflow.StepStatus.PENDING
                }
            },
            steps,
            step: steps[2],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        })).toBe(false);
        expect((0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-3': {
                    status: _workflow.StepStatus.FAILED
                }
            },
            steps,
            step: steps[2],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        })).toBe(false);
        expect((0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-3': {
                    status: _workflow.StepStatus.RUNNING
                }
            },
            steps,
            step: steps[2],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        })).toBe(false);
    });
    it('should return false if workflowRun is not RUNNING', ()=>{
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'step-2': {
                status: _workflow.StepStatus.SUCCESS
            },
            'step-3': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        for (const workflowRunStatus of [
            _workflowrunworkspaceentity.WorkflowRunStatus.FAILED,
            _workflowrunworkspaceentity.WorkflowRunStatus.ENQUEUED,
            _workflowrunworkspaceentity.WorkflowRunStatus.COMPLETED,
            _workflowrunworkspaceentity.WorkflowRunStatus.NOT_STARTED
        ]){
            const result = (0, _shouldexecutesteputil.shouldExecuteStep)({
                stepInfos,
                steps,
                step: steps[2],
                workflowRunStatus
            });
            expect(result).toBe(false);
        }
    });
    it('should return true when step has no parent steps', ()=>{
        const stepsWithoutParents = [
            {
                id: 'step-1',
                name: 'Mock Step',
                type: _workflowactiontype.WorkflowActionType.CODE,
                settings: {
                    input: {
                        logicFunctionId: 'mock-function-id',
                        logicFunctionInput: {}
                    },
                    errorHandlingOptions: {
                        continueOnFailure: {
                            value: false
                        },
                        retryOnFailure: {
                            value: false
                        }
                    },
                    outputSchema: {}
                },
                valid: true,
                nextStepIds: []
            }
        ];
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos,
            steps: stepsWithoutParents,
            step: stepsWithoutParents[0],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        });
        expect(result).toBe(true);
    });
    it('should return false when one parent is RUNNING', ()=>{
        const result = (0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.RUNNING
                },
                'step-3': {
                    status: _workflow.StepStatus.NOT_STARTED
                }
            },
            steps,
            step: steps[2],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        });
        expect(result).toBe(false);
    });
    it('should handle undefined parent steps gracefully', ()=>{
        const stepsWithUndefined = [
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
                    'step-3'
                ]
            },
            undefined,
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
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'step-3': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos,
            steps: stepsWithUndefined,
            step: stepsWithUndefined[2],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        });
        expect(result).toBe(true);
    });
    it('should return false when at least one parent is FAILED', ()=>{
        const result = (0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.FAILED
                },
                'step-3': {
                    status: _workflow.StepStatus.NOT_STARTED
                }
            },
            steps,
            step: steps[2],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        });
        expect(result).toBe(false);
    });
    it('should work correctly with multiple successful parents', ()=>{
        const multiParentSteps = [
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
                    'step-4'
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
                nextStepIds: [
                    'step-4'
                ]
            },
            {
                id: 'step-3',
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
                    'step-4'
                ]
            },
            {
                id: 'step-4',
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
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'step-2': {
                status: _workflow.StepStatus.SUCCESS
            },
            'step-3': {
                status: _workflow.StepStatus.SUCCESS
            },
            'step-4': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos,
            steps: multiParentSteps,
            step: multiParentSteps[3],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        });
        expect(result).toBe(true);
    });
    it('should return false when step status is SKIPPED', ()=>{
        const result = (0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-3': {
                    status: _workflow.StepStatus.SKIPPED
                }
            },
            steps,
            step: steps[2],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        });
        expect(result).toBe(false);
    });
    it('should return false when step status is STOPPED', ()=>{
        const result = (0, _shouldexecutesteputil.shouldExecuteStep)({
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-3': {
                    status: _workflow.StepStatus.STOPPED
                }
            },
            steps,
            step: steps[2],
            workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
        });
        expect(result).toBe(false);
    });
});

//# sourceMappingURL=should-execute-step.util.spec.js.map