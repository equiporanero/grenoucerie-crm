"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertWorkflowVersionHasSteps", {
    enumerable: true,
    get: function() {
        return assertWorkflowVersionHasSteps;
    }
});
const _workflowtriggerexception = require("../../workflow-trigger/exceptions/workflow-trigger.exception");
function assertWorkflowVersionHasSteps(workflowVersion) {
    if (workflowVersion.steps === null || workflowVersion.steps.length < 1) {
        throw new _workflowtriggerexception.WorkflowTriggerException('Workflow version does not contain at least one step', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_VERSION, {
            userFriendlyMessage: /*i18n*/ {
                id: "n4/IOE",
                message: "Workflow version does not contain at least one step"
            }
        });
    }
}

//# sourceMappingURL=assert-workflow-version-has-steps.js.map