"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _workflow = require("twenty-shared/workflow");
const _createmockworkflowstepsutil = require("../../../../utils/create-mock-workflow-steps.util");
const _shouldexecuteiteratorsteputil = require("../should-execute-iterator-step.util");
jest.mock('src/modules/workflow/workflow-executor/workflow-actions/iterator/utils/get-all-step-ids-in-loop.util', ()=>({
        getAllStepIdsInLoop: jest.fn()
    }));
const { getAllStepIdsInLoop } = jest.requireMock('src/modules/workflow/workflow-executor/workflow-actions/iterator/utils/get-all-step-ids-in-loop.util');
describe('shouldExecuteIteratorStep', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });
    describe('when the step has not been started', ()=>{
        it('should return true when all parent steps are successful', ()=>{
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
                    'step-4'
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
                    status: _workflow.StepStatus.SUCCESS
                }
            };
            // Mock getAllStepIdsInLoop to return the loop step IDs
            getAllStepIdsInLoop.mockReturnValue([
                'step-1',
                'step-2'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
            expect(getAllStepIdsInLoop).toHaveBeenCalledWith({
                iteratorStepId: 'iterator-1',
                initialLoopStepIds: [
                    'step-1',
                    'step-2'
                ],
                steps
            });
        });
        it('should return false when some parent steps not in loop have failed', ()=>{
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
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.FAILED
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-2'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
        it('should return false when some parent steps are not started', ()=>{
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
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.NOT_STARTED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
        it('should return true even if loop step is not started', ()=>{
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
                    status: _workflow.StepStatus.NOT_STARTED
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                }
            };
            // Only step-1 is in the loop
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
        it('should return true when there are no parent steps targeting the iterator', ()=>{
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
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                }
            };
            getAllStepIdsInLoop.mockReturnValue([]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
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
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
        it('should work correctly with multiple steps targeting the same iterator', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1',
                'step-2',
                'step-3'
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
                    'step-5'
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
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-4': {
                    status: _workflow.StepStatus.FAILED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1',
                'step-2',
                'step-3'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
    });
    describe('when the step has been started', ()=>{
        it('should return true if all the steps targeting the iterator have been successful', ()=>{
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
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
        it('should return false if some of the steps targeting the iterator have failed', ()=>{
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
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.FAILED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
        it('should return false if some of the steps targeting the iterator are still running', ()=>{
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
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.RUNNING
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
        it('should return true when there are no steps targeting the iterator', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1');
            const steps = [
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-1', [
                    'step-2'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'iterator-1': {
                    status: _workflow.StepStatus.RUNNING
                },
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                }
            };
            getAllStepIdsInLoop.mockReturnValue([]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
        it('should check all steps targeting iterator including loop steps when iterator has been started', ()=>{
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
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
        it('should return false when loop step has NOT_STARTED status and iterator has been started', ()=>{
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
                    status: _workflow.StepStatus.NOT_STARTED
                },
                'step-2': {
                    status: _workflow.StepStatus.SUCCESS
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
    });
    describe('edge cases', ()=>{
        it('should handle empty step info for parent steps', ()=>{
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
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            // Should return false because step-2 info is undefined
            expect(result).toBe(false);
        });
        it('should work with complex loop structures', ()=>{
            const iteratorStep = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator-1', [], [
                'step-1',
                'step-2',
                'step-3'
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
                (0, _createmockworkflowstepsutil.createMockCodeStep)('step-5', [
                    'iterator-1'
                ]),
                iteratorStep
            ];
            const stepInfos = {
                'step-1': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-2': {
                    status: _workflow.StepStatus.FAILED
                },
                'step-3': {
                    status: _workflow.StepStatus.NOT_STARTED
                },
                'step-4': {
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-5': {
                    status: _workflow.StepStatus.SUCCESS
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1',
                'step-2',
                'step-3'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(true);
        });
        it('should return false with complex loop when one non-loop parent is not successful', ()=>{
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
                    status: _workflow.StepStatus.SUCCESS
                },
                'step-4': {
                    status: _workflow.StepStatus.FAILED
                }
            };
            getAllStepIdsInLoop.mockReturnValue([
                'step-1',
                'step-2'
            ]);
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            expect(result).toBe(false);
        });
        it('should handle when iterator has no initialLoopStepIds defined', ()=>{
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
                    status: _workflow.StepStatus.SUCCESS
                }
            };
            const result = (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
                step: iteratorStep,
                steps,
                stepInfos
            });
            // getAllStepIdsInLoop should not be called if initialLoopStepIds is undefined
            expect(getAllStepIdsInLoop).not.toHaveBeenCalled();
            expect(result).toBe(true);
        });
    });
});

//# sourceMappingURL=should-execute-iterator-step.util.spec.js.map