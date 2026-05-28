"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "stepHasBeenStarted", {
    enumerable: true,
    get: function() {
        return stepHasBeenStarted;
    }
});
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const stepHasBeenStarted = (stepId, stepInfos)=>{
    return (0, _utils.isDefined)(stepInfos[stepId]?.status) && stepInfos[stepId].status !== _workflow.StepStatus.NOT_STARTED;
};

//# sourceMappingURL=step-has-been-started.util.js.map