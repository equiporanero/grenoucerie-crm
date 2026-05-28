"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowIfElseAction", {
    enumerable: true,
    get: function() {
        return isWorkflowIfElseAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowIfElseAction = (action)=>action.type === _workflowactiontype.WorkflowActionType.IF_ELSE;

//# sourceMappingURL=is-workflow-if-else-action.guard.js.map