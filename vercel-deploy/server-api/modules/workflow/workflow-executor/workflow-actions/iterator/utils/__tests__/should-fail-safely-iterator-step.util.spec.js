"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _workflow = require("twenty-shared/workflow");
const _createmockworkflowstepsutil = require("../../../../utils/create-mock-workflow-steps.util");
const _shouldfailsafelyiteratorsteputil = require("../should-fail-safely-iterator-step.util");
describe('shouldFailSafelyIteratorStep', ()=>{
    describe('unstarted iterator', ()=>{
        it('should return false when external parent is SUCCESS', ()=>{
            const parent = (0, _createmockworkflowstepsutil.createMockCodeStep)('parent', [
                'iterator1'
            ]);
            const iterator = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [], [
                'stepA'
            ], true);
            const stepA = (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                'iterator1'
            ]);
            const steps = [
                parent,
                iterator,
                stepA
            ];
            const result = (0, _shouldfailsafelyiteratorsteputil.shouldFailSafelyIteratorStep)({
                step: iterator,
                steps,
                stepInfos: {
                    parent: {
                        status: _workflow.StepStatus.SUCCESS,
                        result: {}
                    }
                }
            });
            expect(result).toBe(false);
        });
        it('should return true when external parent is FAILED_SAFELY', ()=>{
            const parent = (0, _createmockworkflowstepsutil.createMockCodeStep)('parent', [
                'iterator1'
            ]);
            const iterator = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [], [
                'stepA'
            ], true);
            const stepA = (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                'iterator1'
            ]);
            const steps = [
                parent,
                iterator,
                stepA
            ];
            const result = (0, _shouldfailsafelyiteratorsteputil.shouldFailSafelyIteratorStep)({
                step: iterator,
                steps,
                stepInfos: {
                    parent: {
                        status: _workflow.StepStatus.FAILED_SAFELY
                    }
                }
            });
            expect(result).toBe(true);
        });
        it('should return false when no external parents', ()=>{
            const iterator = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [], [
                'stepA'
            ], true);
            const stepA = (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                'iterator1'
            ]);
            const steps = [
                iterator,
                stepA
            ];
            const result = (0, _shouldfailsafelyiteratorsteputil.shouldFailSafelyIteratorStep)({
                step: iterator,
                steps,
                stepInfos: {}
            });
            expect(result).toBe(false);
        });
    });
    describe('started iterator with flag', ()=>{
        it('should return false when failure originated from own loop', ()=>{
            const iterator = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [], [
                'stepA'
            ], true);
            const stepA = (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                'stepB'
            ]);
            const stepB = (0, _createmockworkflowstepsutil.createMockCodeStep)('stepB', [
                'iterator1'
            ]);
            const steps = [
                iterator,
                stepA,
                stepB
            ];
            const result = (0, _shouldfailsafelyiteratorsteputil.shouldFailSafelyIteratorStep)({
                step: iterator,
                steps,
                stepInfos: {
                    iterator1: {
                        status: _workflow.StepStatus.RUNNING
                    },
                    stepA: {
                        status: _workflow.StepStatus.FAILED_SAFELY,
                        error: 'actual error'
                    },
                    stepB: {
                        status: _workflow.StepStatus.FAILED_SAFELY
                    }
                }
            });
            expect(result).toBe(false);
        });
        it('should return false when loop-back parents have no FAILED_SAFELY', ()=>{
            const iterator = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [], [
                'stepA'
            ], true);
            const stepA = (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                'stepB'
            ]);
            const stepB = (0, _createmockworkflowstepsutil.createMockCodeStep)('stepB', [
                'iterator1'
            ]);
            const steps = [
                iterator,
                stepA,
                stepB
            ];
            const result = (0, _shouldfailsafelyiteratorsteputil.shouldFailSafelyIteratorStep)({
                step: iterator,
                steps,
                stepInfos: {
                    iterator1: {
                        status: _workflow.StepStatus.RUNNING
                    },
                    stepA: {
                        status: _workflow.StepStatus.SUCCESS,
                        result: {}
                    },
                    stepB: {
                        status: _workflow.StepStatus.SUCCESS,
                        result: {}
                    }
                }
            });
            expect(result).toBe(false);
        });
    });
    describe('started iterator without flag', ()=>{
        it('should return true when loop-back parent is FAILED_SAFELY', ()=>{
            const iterator = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [], [
                'stepA'
            ], false);
            const stepA = (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                'stepB'
            ]);
            const stepB = (0, _createmockworkflowstepsutil.createMockCodeStep)('stepB', [
                'iterator1'
            ]);
            const steps = [
                iterator,
                stepA,
                stepB
            ];
            const result = (0, _shouldfailsafelyiteratorsteputil.shouldFailSafelyIteratorStep)({
                step: iterator,
                steps,
                stepInfos: {
                    iterator1: {
                        status: _workflow.StepStatus.RUNNING
                    },
                    stepA: {
                        status: _workflow.StepStatus.FAILED_SAFELY,
                        error: 'err'
                    },
                    stepB: {
                        status: _workflow.StepStatus.FAILED_SAFELY
                    }
                }
            });
            expect(result).toBe(true);
        });
        it('should return false when loop-back parents are not all terminal', ()=>{
            const iterator = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [], [
                'stepA'
            ], false);
            const stepA = (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                'stepB'
            ]);
            const stepB = (0, _createmockworkflowstepsutil.createMockCodeStep)('stepB', [
                'iterator1'
            ]);
            const steps = [
                iterator,
                stepA,
                stepB
            ];
            const result = (0, _shouldfailsafelyiteratorsteputil.shouldFailSafelyIteratorStep)({
                step: iterator,
                steps,
                stepInfos: {
                    iterator1: {
                        status: _workflow.StepStatus.RUNNING
                    },
                    stepA: {
                        status: _workflow.StepStatus.FAILED_SAFELY,
                        error: 'err'
                    },
                    stepB: {
                        status: _workflow.StepStatus.RUNNING
                    }
                }
            });
            expect(result).toBe(false);
        });
    });
});

//# sourceMappingURL=should-fail-safely-iterator-step.util.spec.js.map