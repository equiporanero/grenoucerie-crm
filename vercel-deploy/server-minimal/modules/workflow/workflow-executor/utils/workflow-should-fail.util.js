"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "workflowShouldFail", {
    enumerable: true,
    get: function() {
        return workflowShouldFail;
    }
});
const _workflow = require("twenty-shared/workflow");
const workflowShouldFail = ({ stepInfos, steps })=>{
    const failedSteps = steps.filter((step)=>stepInfos[step.id]?.status === _workflow.StepStatus.FAILED);
    return failedSteps.length > 0;
};

//# sourceMappingURL=workflow-should-fail.util.js.map