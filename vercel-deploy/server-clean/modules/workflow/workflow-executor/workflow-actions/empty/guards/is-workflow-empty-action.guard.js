"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowEmptyAction", {
    enumerable: true,
    get: function() {
        return isWorkflowEmptyAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowEmptyAction = (action)=>{
    return action.type === _workflowactiontype.WorkflowActionType.EMPTY;
};

//# sourceMappingURL=is-workflow-empty-action.guard.js.map