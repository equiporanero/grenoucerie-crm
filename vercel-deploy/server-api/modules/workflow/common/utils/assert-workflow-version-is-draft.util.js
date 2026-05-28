"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertWorkflowVersionIsDraft", {
    enumerable: true,
    get: function() {
        return assertWorkflowVersionIsDraft;
    }
});
const _workflowqueryvalidationexception = require("../exceptions/workflow-query-validation.exception");
const _workflowversionworkspaceentity = require("../standard-objects/workflow-version.workspace-entity");
const assertWorkflowVersionIsDraft = (workflowVersion)=>{
    if (workflowVersion.status !== _workflowversionworkspaceentity.WorkflowVersionStatus.DRAFT) {
        throw new _workflowqueryvalidationexception.WorkflowQueryValidationException('Workflow version is not in draft status', _workflowqueryvalidationexception.WorkflowQueryValidationExceptionCode.FORBIDDEN, {
            userFriendlyMessage: /*i18n*/ {
                id: "bqFL4g",
                message: "Workflow version is not in draft status"
            }
        });
    }
};

//# sourceMappingURL=assert-workflow-version-is-draft.util.js.map