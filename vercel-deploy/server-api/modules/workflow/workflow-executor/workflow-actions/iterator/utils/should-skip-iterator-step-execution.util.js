"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "shouldSkipIteratorStepExecution", {
    enumerable: true,
    get: function() {
        return shouldSkipIteratorStepExecution;
    }
});
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _stephasbeenstartedutil = require("../../../utils/step-has-been-started.util");
const _getallstepidsinlooputil = require("./get-all-step-ids-in-loop.util");
const shouldSkipIteratorStepExecution = ({ step, steps, stepInfos })=>{
    const stepsTargetingIterator = steps.filter((parentStep)=>(0, _utils.isDefined)(parentStep) && parentStep.nextStepIds?.includes(step.id));
    const initialLoopStepIds = step.settings.input.initialLoopStepIds;
    const stepIdsInLoop = (0, _utils.isDefined)(initialLoopStepIds) ? (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
        iteratorStepId: step.id,
        initialLoopStepIds,
        steps
    }) : [];
    const parentSteps = stepsTargetingIterator.filter((step)=>!stepIdsInLoop.includes(step.id));
    if ((0, _stephasbeenstartedutil.stepHasBeenStarted)(step.id, stepInfos) || parentSteps.length === 0) {
        return false;
    }
    return parentSteps.every((parentStep)=>stepInfos[parentStep.id]?.status === _workflow.StepStatus.SKIPPED || stepInfos[parentStep.id]?.status === _workflow.StepStatus.STOPPED || stepInfos[parentStep.id]?.status === _workflow.StepStatus.FAILED_SAFELY);
};

//# sourceMappingURL=should-skip-iterator-step-execution.util.js.map