"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAllStepIdsInLoop", {
    enumerable: true,
    get: function() {
        return getAllStepIdsInLoop;
    }
});
const _isworkflowifelseactionguard = require("../../if-else/guards/is-workflow-if-else-action.guard");
const _isworkflowiteratoractionguard = require("../guards/is-workflow-iterator-action.guard");
const traverseSteps = ({ iteratorStepId, stepIds, steps, visitedStepIds, allStepIdsInLoop })=>{
    for (const stepId of stepIds){
        if (visitedStepIds.has(stepId) || stepId === iteratorStepId) {
            continue;
        }
        visitedStepIds.add(stepId);
        allStepIdsInLoop.add(stepId);
        const step = steps.find((s)=>s.id === stepId);
        if (!step) {
            continue;
        }
        if ((0, _isworkflowiteratoractionguard.isWorkflowIteratorAction)(step)) {
            const nestedIteratorInput = step.settings.input;
            if (nestedIteratorInput.initialLoopStepIds) {
                const nestedLoopStepIds = getAllStepIdsInLoop({
                    iteratorStepId: stepId,
                    initialLoopStepIds: nestedIteratorInput.initialLoopStepIds,
                    steps
                });
                nestedLoopStepIds.forEach((nestedStepId)=>{
                    allStepIdsInLoop.add(nestedStepId);
                });
            }
        }
        if ((0, _isworkflowifelseactionguard.isWorkflowIfElseAction)(step)) {
            for (const branch of step.settings.input.branches){
                if (branch.nextStepIds) {
                    traverseSteps({
                        iteratorStepId,
                        stepIds: branch.nextStepIds,
                        steps,
                        visitedStepIds,
                        allStepIdsInLoop
                    });
                }
            }
        }
        if (!step.nextStepIds) {
            continue;
        }
        const connectsBackToIterator = step.nextStepIds.includes(iteratorStepId);
        if (connectsBackToIterator) {
            continue;
        }
        traverseSteps({
            iteratorStepId,
            stepIds: step.nextStepIds,
            steps,
            visitedStepIds,
            allStepIdsInLoop
        });
    }
};
const getAllStepIdsInLoop = ({ iteratorStepId, initialLoopStepIds, steps })=>{
    const allStepIdsInLoop = new Set();
    const visitedStepIds = new Set();
    traverseSteps({
        iteratorStepId,
        stepIds: initialLoopStepIds,
        steps,
        visitedStepIds,
        allStepIdsInLoop
    });
    return Array.from(allStepIdsInLoop);
};

//# sourceMappingURL=get-all-step-ids-in-loop.util.js.map