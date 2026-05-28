"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertWorkflowStatusesNotSet", {
    enumerable: true,
    get: function() {
        return assertWorkflowStatusesNotSet;
    }
});
const _workflowqueryvalidationexception = require("../exceptions/workflow-query-validation.exception");
const assertWorkflowStatusesNotSet = (statuses)=>{
    if (statuses) {
        throw new _workflowqueryvalidationexception.WorkflowQueryValidationException('Statuses cannot be set manually.', _workflowqueryvalidationexception.WorkflowQueryValidationExceptionCode.FORBIDDEN, {
            userFriendlyMessage: /*i18n*/ {
                id: "S7DRR+",
                message: "Statuses cannot be set manually."
            }
        });
    }
};

//# sourceMappingURL=assert-workflow-statuses-not-set.js.map