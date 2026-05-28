"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findEnclosingIteratorWithContinueOnFailure", {
    enumerable: true,
    get: function() {
        return findEnclosingIteratorWithContinueOnFailure;
    }
});
const _isworkflowiteratoractionguard = require("../guards/is-workflow-iterator-action.guard");
const _getallstepidsinlooputil = require("./get-all-step-ids-in-loop.util");
const findEnclosingIteratorWithContinueOnFailure = ({ failedStepId, steps })=>{
    const iteratorSteps = steps.filter(_isworkflowiteratoractionguard.isWorkflowIteratorAction);
    const candidates = iteratorSteps.filter((iterator)=>iterator.settings.input.initialLoopStepIds && iterator.settings.input.initialLoopStepIds.length > 0).map((iterator)=>({
            iterator,
            loopStepIds: (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
                iteratorStepId: iterator.id,
                initialLoopStepIds: iterator.settings.input.initialLoopStepIds,
                steps
            })
        })).filter(({ loopStepIds })=>loopStepIds.includes(failedStepId)).sort((a, b)=>a.loopStepIds.length - b.loopStepIds.length);
    return candidates.find(({ iterator })=>iterator.settings.input.shouldContinueOnIterationFailure === true)?.iterator;
};

//# sourceMappingURL=find-enclosing-iterator-with-continue-on-failure.util.js.map