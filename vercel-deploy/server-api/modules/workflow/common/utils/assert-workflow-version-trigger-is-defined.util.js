"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertWorkflowVersionTriggerIsDefined", {
    enumerable: true,
    get: function() {
        return assertWorkflowVersionTriggerIsDefined;
    }
});
const _workflowtriggerexception = require("../../workflow-trigger/exceptions/workflow-trigger.exception");
function assertWorkflowVersionTriggerIsDefined(workflowVersion) {
    if (!workflowVersion.trigger) {
        throw new _workflowtriggerexception.WorkflowTriggerException('Workflow version does not contain trigger', _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_VERSION, {
            userFriendlyMessage: /*i18n*/ {
                id: "k4DPlQ",
                message: "Workflow version does not contain trigger"
            }
        });
    }
}

//# sourceMappingURL=assert-workflow-version-trigger-is-defined.util.js.map