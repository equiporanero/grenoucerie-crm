"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _workflow = require("twenty-shared/workflow");
const _shouldexecutechildsteputil = require("../should-execute-child-step.util");
const _workflowactiontype = require("../../workflow-actions/types/workflow-action.type");
describe('shouldExecuteChildStep', ()=>{
    const parentSteps = [
        {
            id: 'parent-1',
            type: _workflowactiontype.WorkflowActionType.CODE,
            settings: {
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
            nextStepIds: []
        },
        {
            id: 'parent-2',
            type: _workflowactiontype.WorkflowActionType.SEND_EMAIL,
            settings: {
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
            nextStepIds: []
        }
    ];
    it('should return true when there are no parent steps', ()=>{
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps: [],
            stepInfos: {}
        });
        expect(result).toBe(true);
    });
    it('should return true when at least one parent succeeded and all parents are completed', ()=>{
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'parent-2': {
                status: _workflow.StepStatus.SUCCESS
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps,
            stepInfos
        });
        expect(result).toBe(true);
    });
    it('should return true when one parent succeeded and others are stopped', ()=>{
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'parent-2': {
                status: _workflow.StepStatus.STOPPED
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps,
            stepInfos
        });
        expect(result).toBe(true);
    });
    it('should return true when one parent succeeded and others are skipped', ()=>{
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'parent-2': {
                status: _workflow.StepStatus.SKIPPED
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps,
            stepInfos
        });
        expect(result).toBe(true);
    });
    it('should return true when one parent succeeded and others are mix of stopped and skipped', ()=>{
        const multiParentSteps = [
            {
                id: 'parent-1',
                type: _workflowactiontype.WorkflowActionType.CODE,
                settings: {
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
                nextStepIds: []
            },
            {
                id: 'parent-2',
                type: _workflowactiontype.WorkflowActionType.SEND_EMAIL,
                settings: {
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
                nextStepIds: []
            },
            {
                id: 'parent-3',
                type: _workflowactiontype.WorkflowActionType.CODE,
                settings: {
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
                nextStepIds: []
            }
        ];
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'parent-2': {
                status: _workflow.StepStatus.STOPPED
            },
            'parent-3': {
                status: _workflow.StepStatus.SKIPPED
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps: multiParentSteps,
            stepInfos
        });
        expect(result).toBe(true);
    });
    it('should return false when all parents are completed but none succeeded', ()=>{
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.STOPPED
            },
            'parent-2': {
                status: _workflow.StepStatus.SKIPPED
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false when one parent succeeded but another is still running', ()=>{
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'parent-2': {
                status: _workflow.StepStatus.RUNNING
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false when one parent succeeded but another has not started', ()=>{
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'parent-2': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false when one parent succeeded but another is pending', ()=>{
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'parent-2': {
                status: _workflow.StepStatus.PENDING
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false when one parent succeeded but another has failed', ()=>{
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'parent-2': {
                status: _workflow.StepStatus.FAILED
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false when all parents are still running', ()=>{
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.RUNNING
            },
            'parent-2': {
                status: _workflow.StepStatus.RUNNING
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false when all parents have not started', ()=>{
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.NOT_STARTED
            },
            'parent-2': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false when no parent has succeeded even though all are completed', ()=>{
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.SKIPPED
            },
            'parent-2': {
                status: _workflow.StepStatus.STOPPED
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should handle single parent step successfully', ()=>{
        const singleParent = [
            {
                id: 'parent-1',
                type: _workflowactiontype.WorkflowActionType.CODE,
                settings: {
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
                nextStepIds: []
            }
        ];
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.SUCCESS
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps: singleParent,
            stepInfos
        });
        expect(result).toBe(true);
    });
    it('should return false when single parent has stopped without success', ()=>{
        const singleParent = [
            {
                id: 'parent-1',
                type: _workflowactiontype.WorkflowActionType.CODE,
                settings: {
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
                nextStepIds: []
            }
        ];
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.STOPPED
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps: singleParent,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should handle missing step info gracefully', ()=>{
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.SUCCESS
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should work correctly with multiple successful parents', ()=>{
        const multiParentSteps = [
            {
                id: 'parent-1',
                type: _workflowactiontype.WorkflowActionType.CODE,
                settings: {
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
                nextStepIds: []
            },
            {
                id: 'parent-2',
                type: _workflowactiontype.WorkflowActionType.SEND_EMAIL,
                settings: {
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
                nextStepIds: []
            },
            {
                id: 'parent-3',
                type: _workflowactiontype.WorkflowActionType.CODE,
                settings: {
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
                nextStepIds: []
            }
        ];
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'parent-2': {
                status: _workflow.StepStatus.SUCCESS
            },
            'parent-3': {
                status: _workflow.StepStatus.SUCCESS
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps: multiParentSteps,
            stepInfos
        });
        expect(result).toBe(true);
    });
    it('should return false with large number of parents when none succeeded', ()=>{
        const manyParentSteps = Array.from({
            length: 25
        }, (_, i)=>({
                id: `parent-${i + 1}`,
                type: _workflowactiontype.WorkflowActionType.CODE,
                settings: {
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
                nextStepIds: []
            }));
        // All parents stopped or skipped, none succeeded
        const stepInfos = Object.fromEntries(manyParentSteps.map((step, i)=>[
                step.id,
                {
                    status: i % 2 === 0 ? _workflow.StepStatus.STOPPED : _workflow.StepStatus.SKIPPED
                }
            ]));
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps: manyParentSteps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false when one parent succeeded and another is FAILED_SAFELY', ()=>{
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.SUCCESS
            },
            'parent-2': {
                status: _workflow.StepStatus.FAILED_SAFELY
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false when single parent is FAILED_SAFELY', ()=>{
        const singleParent = [
            {
                id: 'parent-1',
                type: _workflowactiontype.WorkflowActionType.CODE,
                settings: {
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
                nextStepIds: []
            }
        ];
        const stepInfos = {
            'parent-1': {
                status: _workflow.StepStatus.FAILED_SAFELY
            }
        };
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps: singleParent,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false with large number of parents when not all completed', ()=>{
        const manyParentSteps = Array.from({
            length: 25
        }, (_, i)=>({
                id: `parent-${i + 1}`,
                type: _workflowactiontype.WorkflowActionType.CODE,
                settings: {
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
                nextStepIds: []
            }));
        // First parent succeeded, rest are still running
        const stepInfos = Object.fromEntries(manyParentSteps.map((step, i)=>[
                step.id,
                {
                    status: i === 0 ? _workflow.StepStatus.SUCCESS : _workflow.StepStatus.RUNNING
                }
            ]));
        const result = (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
            parentSteps: manyParentSteps,
            stepInfos
        });
        expect(result).toBe(false);
    });
});

//# sourceMappingURL=should-execute-child-step.util.spec.js.map