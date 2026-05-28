"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowFilterAction", {
    enumerable: true,
    get: function() {
        return isWorkflowFilterAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowFilterAction = (action)=>action.type === _workflowactiontype.WorkflowActionType.FILTER;

//# sourceMappingURL=is-workflow-filter-action.guard.js.map