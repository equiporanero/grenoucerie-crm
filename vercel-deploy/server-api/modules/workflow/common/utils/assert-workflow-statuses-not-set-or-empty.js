"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "assertWorkflowStatusesNotSetOrEmpty", {
    enumerable: true,
    get: function() {
        return assertWorkflowStatusesNotSetOrEmpty;
    }
});
const _workflowqueryvalidationexception = require("../exceptions/workflow-query-validation.exception");
const assertWorkflowStatusesNotSetOrEmpty = (statuses)=>{
    if (statuses && statuses.length > 0) {
        throw new _workflowqueryvalidationexception.WorkflowQueryValidationException('Statuses cannot be set manually.', _workflowqueryvalidationexception.WorkflowQueryValidationExceptionCode.FORBIDDEN);
    }
};

//# sourceMappingURL=assert-workflow-statuses-not-set-or-empty.js.map