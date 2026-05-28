"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "shouldExecuteChildStep", {
    enumerable: true,
    get: function() {
        return shouldExecuteChildStep;
    }
});
const _workflow = require("twenty-shared/workflow");
const shouldExecuteChildStep = ({ parentSteps, stepInfos })=>{
    if (parentSteps.length === 0) {
        return true;
    }
    const hasSuccessfulParentStep = parentSteps.some((parentStep)=>stepInfos[parentStep.id]?.status === _workflow.StepStatus.SUCCESS);
    const areAllParentsCompleted = parentSteps.every((parentStep)=>stepInfos[parentStep.id]?.status === _workflow.StepStatus.SUCCESS || stepInfos[parentStep.id]?.status === _workflow.StepStatus.STOPPED || stepInfos[parentStep.id]?.status === _workflow.StepStatus.SKIPPED);
    return hasSuccessfulParentStep && areAllParentsCompleted;
};

//# sourceMappingURL=should-execute-child-step.util.js.map