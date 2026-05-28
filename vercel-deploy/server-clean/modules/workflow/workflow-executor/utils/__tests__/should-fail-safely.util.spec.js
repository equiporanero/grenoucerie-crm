"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _workflow = require("twenty-shared/workflow");
const _createmockworkflowstepsutil = require("../create-mock-workflow-steps.util");
const _shouldfailsafelyutil = require("../should-fail-safely.util");
describe('shouldFailSafely', ()=>{
    it('should return false when step has no parents', ()=>{
        const step = (0, _createmockworkflowstepsutil.createMockCodeStep)('step1');
        const steps = [
            step
        ];
        const result = (0, _shouldfailsafelyutil.shouldFailSafely)({
            step,
            steps,
            stepInfos: {}
        });
        expect(result).toBe(false);
    });
    it('should return false when all parents are SUCCESS', ()=>{
        const parentStep = (0, _createmockworkflowstepsutil.createMockCodeStep)('parent', [
            'child'
        ]);
        const childStep = (0, _createmockworkflowstepsutil.createMockCodeStep)('child');
        const steps = [
            parentStep,
            childStep
        ];
        const result = (0, _shouldfailsafelyutil.shouldFailSafely)({
            step: childStep,
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
    it('should return true when one parent is FAILED_SAFELY and all are terminal', ()=>{
        const parent1 = (0, _createmockworkflowstepsutil.createMockCodeStep)('parent1', [
            'child'
        ]);
        const parent2 = (0, _createmockworkflowstepsutil.createMockCodeStep)('parent2', [
            'child'
        ]);
        const childStep = (0, _createmockworkflowstepsutil.createMockCodeStep)('child');
        const steps = [
            parent1,
            parent2,
            childStep
        ];
        const result = (0, _shouldfailsafelyutil.shouldFailSafely)({
            step: childStep,
            steps,
            stepInfos: {
                parent1: {
                    status: _workflow.StepStatus.FAILED_SAFELY,
                    error: 'some error'
                },
                parent2: {
                    status: _workflow.StepStatus.SUCCESS,
                    result: {}
                }
            }
        });
        expect(result).toBe(true);
    });
    it('should return false when parent is FAILED_SAFELY but another parent is still running', ()=>{
        const parent1 = (0, _createmockworkflowstepsutil.createMockCodeStep)('parent1', [
            'child'
        ]);
        const parent2 = (0, _createmockworkflowstepsutil.createMockCodeStep)('parent2', [
            'child'
        ]);
        const childStep = (0, _createmockworkflowstepsutil.createMockCodeStep)('child');
        const steps = [
            parent1,
            parent2,
            childStep
        ];
        const result = (0, _shouldfailsafelyutil.shouldFailSafely)({
            step: childStep,
            steps,
            stepInfos: {
                parent1: {
                    status: _workflow.StepStatus.FAILED_SAFELY,
                    error: 'some error'
                },
                parent2: {
                    status: _workflow.StepStatus.RUNNING
                }
            }
        });
        expect(result).toBe(false);
    });
    it('should return true when all parents are FAILED_SAFELY', ()=>{
        const parent1 = (0, _createmockworkflowstepsutil.createMockCodeStep)('parent1', [
            'child'
        ]);
        const parent2 = (0, _createmockworkflowstepsutil.createMockCodeStep)('parent2', [
            'child'
        ]);
        const childStep = (0, _createmockworkflowstepsutil.createMockCodeStep)('child');
        const steps = [
            parent1,
            parent2,
            childStep
        ];
        const result = (0, _shouldfailsafelyutil.shouldFailSafely)({
            step: childStep,
            steps,
            stepInfos: {
                parent1: {
                    status: _workflow.StepStatus.FAILED_SAFELY
                },
                parent2: {
                    status: _workflow.StepStatus.FAILED_SAFELY,
                    error: 'err'
                }
            }
        });
        expect(result).toBe(true);
    });
    it('should return true for FAILED_SAFELY + SKIPPED parents', ()=>{
        const parent1 = (0, _createmockworkflowstepsutil.createMockCodeStep)('parent1', [
            'child'
        ]);
        const parent2 = (0, _createmockworkflowstepsutil.createMockCodeStep)('parent2', [
            'child'
        ]);
        const childStep = (0, _createmockworkflowstepsutil.createMockCodeStep)('child');
        const steps = [
            parent1,
            parent2,
            childStep
        ];
        const result = (0, _shouldfailsafelyutil.shouldFailSafely)({
            step: childStep,
            steps,
            stepInfos: {
                parent1: {
                    status: _workflow.StepStatus.FAILED_SAFELY
                },
                parent2: {
                    status: _workflow.StepStatus.SKIPPED
                }
            }
        });
        expect(result).toBe(true);
    });
});
describe('shouldFailSafely for iterator steps', ()=>{
    it('should return false for iterator with flag when failure from own loop', ()=>{
        const iterator = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
            'after'
        ], [
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
        const result = (0, _shouldfailsafelyutil.shouldFailSafely)({
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
    it('should return true for iterator without flag when loop-back parent is FAILED_SAFELY', ()=>{
        const iterator = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
            'after'
        ], [
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
        const result = (0, _shouldfailsafelyutil.shouldFailSafely)({
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
    it('should return true for unstarted iterator when external parent is FAILED_SAFELY', ()=>{
        const parentStep = (0, _createmockworkflowstepsutil.createMockCodeStep)('parent', [
            'iterator1'
        ]);
        const iterator = (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
            'after'
        ], [
            'stepA'
        ], true);
        const stepA = (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
            'iterator1'
        ]);
        const steps = [
            parentStep,
            iterator,
            stepA
        ];
        const result = (0, _shouldfailsafelyutil.shouldFailSafely)({
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
});

//# sourceMappingURL=should-fail-safely.util.spec.js.map