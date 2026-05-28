"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "workflowHasRunningSteps", {
    enumerable: true,
    get: function() {
        return workflowHasRunningSteps;
    }
});
const _workflow = require("twenty-shared/workflow");
const workflowHasRunningSteps = ({ stepInfos, steps })=>{
    return steps.some((step)=>stepInfos[step.id]?.status === _workflow.StepStatus.RUNNING);
};

//# sourceMappingURL=workflow-has-running-steps.util.js.map