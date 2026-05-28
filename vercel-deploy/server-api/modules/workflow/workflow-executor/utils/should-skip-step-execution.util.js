"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "shouldSkipStepExecution", {
    enumerable: true,
    get: function() {
        return shouldSkipStepExecution;
    }
});
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _isworkflowiteratoractionguard = require("../workflow-actions/iterator/guards/is-workflow-iterator-action.guard");
const _shouldskipiteratorstepexecutionutil = require("../workflow-actions/iterator/utils/should-skip-iterator-step-execution.util");
const shouldSkipStepExecution = ({ step, steps, stepInfos })=>{
    if ((0, _isworkflowiteratoractionguard.isWorkflowIteratorAction)(step)) {
        return (0, _shouldskipiteratorstepexecutionutil.shouldSkipIteratorStepExecution)({
            step,
            steps,
            stepInfos
        });
    }
    const parentSteps = steps.filter((parentStep)=>(0, _utils.isDefined)(parentStep) && parentStep.nextStepIds?.includes(step.id));
    if (parentSteps.length === 0) {
        return false;
    }
    return parentSteps.every((parentStep)=>stepInfos[parentStep.id]?.status === _workflow.StepStatus.SKIPPED || stepInfos[parentStep.id]?.status === _workflow.StepStatus.STOPPED || stepInfos[parentStep.id]?.status === _workflow.StepStatus.FAILED_SAFELY);
};

//# sourceMappingURL=should-skip-step-execution.util.js.map