"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _workflow = require("twenty-shared/workflow");
const _createmockworkflowstepsutil = require("../create-mock-workflow-steps.util");
const _shouldskipstepexecutionutil = require("../should-skip-step-execution.util");
describe('shouldSkipStepExecution', ()=>{
    it('should return true when all parent steps are skipped', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-3', [])
        ];
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.SKIPPED
            },
            'step-2': {
                status: _workflow.StepStatus.SKIPPED
            },
            'step-3': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[2],
            steps,
            stepInfos
        });
        expect(result).toBe(true);
    });
    it('should return true when all parent steps are stopped', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-3', [])
        ];
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.STOPPED
            },
            'step-2': {
                status: _workflow.StepStatus.STOPPED
            },
            'step-3': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[2],
            steps,
            stepInfos
        });
        expect(result).toBe(true);
    });
    it('should return true when parent steps are mix of skipped and stopped', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-3', [])
        ];
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.SKIPPED
            },
            'step-2': {
                status: _workflow.StepStatus.STOPPED
            },
            'step-3': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[2],
            steps,
            stepInfos
        });
        expect(result).toBe(true);
    });
    it('should return false when at least one parent step is successful', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-3', [])
        ];
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.SKIPPED
            },
            'step-2': {
                status: _workflow.StepStatus.SUCCESS
            },
            'step-3': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[2],
            steps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false when at least one parent step is failed', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-3', [])
        ];
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.SKIPPED
            },
            'step-2': {
                status: _workflow.StepStatus.FAILED
            },
            'step-3': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[2],
            steps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false when at least one parent step is running', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-3', [])
        ];
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.SKIPPED
            },
            'step-2': {
                status: _workflow.StepStatus.RUNNING
            },
            'step-3': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[2],
            steps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false when at least one parent step is not started', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                'step-3'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-3', [])
        ];
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.SKIPPED
            },
            'step-2': {
                status: _workflow.StepStatus.NOT_STARTED
            },
            'step-3': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[2],
            steps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return false when there are no parent steps', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                'step-2'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', []),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-3', [])
        ];
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.SKIPPED
            },
            'step-2': {
                status: _workflow.StepStatus.SKIPPED
            },
            'step-3': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[2],
            steps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should return true when single parent step is skipped', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                'step-2'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [])
        ];
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.SKIPPED
            },
            'step-2': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[1],
            steps,
            stepInfos
        });
        expect(result).toBe(true);
    });
    it('should handle undefined steps gracefully', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                'step-2'
            ]),
            undefined,
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [])
        ];
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.SKIPPED
            },
            'step-2': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[2],
            steps,
            stepInfos
        });
        expect(result).toBe(true);
    });
    it('should return false when parent step status is pending', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                'step-2'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [])
        ];
        const stepInfos = {
            'step-1': {
                status: _workflow.StepStatus.PENDING
            },
            'step-2': {
                status: _workflow.StepStatus.NOT_STARTED
            }
        };
        const result = (0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[1],
            steps,
            stepInfos
        });
        expect(result).toBe(false);
    });
    it('should work with multiple parent steps with different statuses', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                'step-4'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                'step-4'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-3', [
                'step-4'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step-4', [])
        ];
        // Test case 1: All skipped - should return true
        expect((0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[3],
            steps,
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-3': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-4': {
                    status: _workflow.StepStatus.NOT_STARTED
                }
            }
        })).toBe(true);
        // Test case 2: Mixed skipped/stopped - should return true
        expect((0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[3],
            steps,
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.STOPPED
                },
                'step-3': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-4': {
                    status: _workflow.StepStatus.NOT_STARTED
                }
            }
        })).toBe(true);
        // Test case 3: One success among skipped - should return false
        expect((0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[3],
            steps,
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-3': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-4': {
                    status: _workflow.StepStatus.NOT_STARTED
                }
            }
        })).toBe(false);
        // Test case 4: One failed among skipped - should return false
        expect((0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: steps[3],
            steps,
            stepInfos: {
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.FAILED
                },
                'step-3': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-4': {
                    status: _workflow.StepStatus.NOT_STARTED
                }
            }
        })).toBe(false);
    });
});

//# sourceMappingURL=should-skip-step-execution.util.spec.js.map