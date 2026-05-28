"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowFormAction", {
    enumerable: true,
    get: function() {
        return isWorkflowFormAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowFormAction = (action)=>action.type === _workflowactiontype.WorkflowActionType.FORM;

//# sourceMappingURL=is-workflow-form-action.guard.js.map