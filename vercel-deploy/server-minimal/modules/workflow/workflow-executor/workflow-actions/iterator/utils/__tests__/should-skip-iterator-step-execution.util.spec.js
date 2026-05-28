"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _workflow = require("twenty-shared/workflow");
const _createmockworkflowstepsutil = require("../../../../utils/create-mock-workflow-steps.util");
const _shouldskipiteratorstepexecutionutil = require("../should-skip-iterator-step-execution.util");
jest.mock('src/modules/workflow/workflow-executor/workflow-actions/iterator/utils/get-all-step-ids-in-loop.util', ()=>({
        getAllStepIdsInLoop: jest.fn()
    }));
const { getAllStepIdsInLoop } = jest.requireMock('src/modules/workflow/workflow-executor/workflow-actions/iterator/utils/get-all-step-ids-in-loop.util');
describe('shouldSkipIteratorStepExecution', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });
    describe('when the iterator has not been started', ()=>{
        it('should return true when all parent steps are skipped', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.SKIPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
        it('should return true when all parent steps are stopped', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.STOPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.STOPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
        it('should return true when parent steps are mix of skipped and stopped', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.STOPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
        it('should return false when at least one parent step is successful', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
        it('should return false when at least one parent step is failed', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.FAILED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
        it('should return false when at least one parent step is not started', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.NOT_STARTED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
        it('should only check parent steps not in loop', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.SKIPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
        it('should return false when there are no parent steps', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1');
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'step-2'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', []),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.SKIPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
        it('should handle undefined steps gracefully', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                undefined,
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.SKIPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
        it('should work correctly with multiple steps targeting the same iterator', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1',
                'step-2'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-3', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-4', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-3': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-4': {
                    status: _workflow.StepStatus.STOPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1',
                'step-2'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
        it('should return false when one non-loop parent is not skipped/stopped', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-3', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-3': {
                    status: _workflow.StepStatus.RUNNING
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
    });
    describe('when the iterator has been started', ()=>{
        it('should return false when iterator has been started', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'iterator-1': {
                    status: _workflow.StepStatus.RUNNING
                },
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.SKIPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
        it('should return false even when all parent steps are skipped/stopped', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-2', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'iterator-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-2': {
                    status: _workflow.StepStatus.STOPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
        it('should return false when iterator is pending', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'iterator-1': {
                    status: _workflow.StepStatus.PENDING
                },
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
        it('should return false when iterator is skipped', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'iterator-1': {
                    status: _workflow.StepStatus.SKIPPED
                },
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
        it('should return false when iterator failed', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1'
            ]);
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'iterator-1': {
                    status: _workflow.StepStatus.FAILED
                },
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
    });
    describe('edge cases with initialLoopStepIds', ()=>{
        it('should handle undefined initialLoopStepIds', ()=>{
            const iteratorStep = {
                ...(0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1'),
                settings: {
                    input: {
                        initialLoopStepIds: undefined,
                        items: []
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
                }
            };
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
            expect(getAllStepIdsInLoop).not.toHaveBeenCalled();
        });
        it('should handle empty initialLoopStepIds array', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1');
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SKIPPED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([]);
            const result = (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
    });
});

//# sourceMappingURL=should-skip-iterator-step-execution.util.spec.js.map