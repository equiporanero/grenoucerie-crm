"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _createmockworkflowstepsutil = require("../../../../utils/create-mock-workflow-steps.util");
const _findenclosingiteratorwithcontinueonfailureutil = require("../find-enclosing-iterator-with-continue-on-failure.util");
describe('findEnclosingIteratorWithContinueOnFailure', ()=>{
    it('should return undefined when step is not inside any iterator', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step1', [
                'step2'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('step2', [])
        ];
        const result = (0, _findenclosingiteratorwithcontinueonfailureutil.findEnclosingIteratorWithContinueOnFailure)({
            failedStepId: 'step1',
            steps
        });
        expect(result).toBeUndefined();
    });
    it('should return undefined when enclosing iterator does not have the flag', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
                'after'
            ], [
                'stepA'
            ], false),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                'stepB'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('stepB', [
                'iterator1'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('after', [])
        ];
        const result = (0, _findenclosingiteratorwithcontinueonfailureutil.findEnclosingIteratorWithContinueOnFailure)({
            failedStepId: 'stepA',
            steps
        });
        expect(result).toBeUndefined();
    });
    it('should return the enclosing iterator when it has the flag', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockIteratorStep)('iterator1', [
                'after'
            ], [
                'stepA'
            ], true),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                'stepB'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('stepB', [
                'iterator1'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('after', [])
        ];
        const result = (0, _findenclosingiteratorwithcontinueonfailureutil.findEnclosingIteratorWithContinueOnFailure)({
            failedStepId: 'stepA',
            steps
        });
        expect(result?.id).toBe('iterator1');
    });
    it('should return the innermost iterator with the flag in nested iterators', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockIteratorStep)('outerIterator', [
                'after'
            ], [
                'innerIterator'
            ], true),
            (0, _createmockworkflowstepsutil.createMockIteratorStep)('innerIterator', [
                'outerIterator'
            ], [
                'stepA'
            ], true),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                'stepB'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('stepB', [
                'innerIterator'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('after', [])
        ];
        const result = (0, _findenclosingiteratorwithcontinueonfailureutil.findEnclosingIteratorWithContinueOnFailure)({
            failedStepId: 'stepA',
            steps
        });
        expect(result?.id).toBe('innerIterator');
    });
    it('should skip inner iterator without flag and return outer with flag', ()=>{
        const steps = [
            (0, _createmockworkflowstepsutil.createMockIteratorStep)('outerIterator', [
                'after'
            ], [
                'innerIterator'
            ], true),
            (0, _createmockworkflowstepsutil.createMockIteratorStep)('innerIterator', [
                'outerIterator'
            ], [
                'stepA'
            ], false),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('stepA', [
                'stepB'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('stepB', [
                'innerIterator'
            ]),
            (0, _createmockworkflowstepsutil.createMockCodeStep)('after', [])
        ];
        const result = (0, _findenclosingiteratorwithcontinueonfailureutil.findEnclosingIteratorWithContinueOnFailure)({
            failedStepId: 'stepA',
            steps
        });
        expect(result?.id).toBe('outerIterator');
    });
});

//# sourceMappingURL=find-enclosing-iterator-with-continue-on-failure.util.spec.js.map