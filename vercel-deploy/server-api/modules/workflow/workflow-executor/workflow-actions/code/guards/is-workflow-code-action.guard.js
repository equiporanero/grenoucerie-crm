"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowCodeAction", {
    enumerable: true,
    get: function() {
        return isWorkflowCodeAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowCodeAction = (action)=>{
    return action.type === _workflowactiontype.WorkflowActionType.CODE;
};

//# sourceMappingURL=is-workflow-code-action.guard.js.map