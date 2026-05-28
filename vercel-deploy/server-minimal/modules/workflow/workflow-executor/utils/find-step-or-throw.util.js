"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findStepOrThrow", {
    enumerable: true,
    get: function() {
        return findStepOrThrow;
    }
});
const _workflowstepexecutorexception = require("../exceptions/workflow-step-executor.exception");
const findStepOrThrow = ({ stepId, steps })=>{
    const step = steps.find((step)=>step.id === stepId);
    if (!step) {
        throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Step not found', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.STEP_NOT_FOUND);
    }
    return step;
};

//# sourceMappingURL=find-step-or-throw.util.js.map