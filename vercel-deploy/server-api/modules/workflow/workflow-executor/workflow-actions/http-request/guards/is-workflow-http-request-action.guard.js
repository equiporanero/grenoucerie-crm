"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowHttpRequestAction", {
    enumerable: true,
    get: function() {
        return isWorkflowHttpRequestAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowHttpRequestAction = (action)=>{
    return action.type === _workflowactiontype.WorkflowActionType.HTTP_REQUEST;
};

//# sourceMappingURL=is-workflow-http-request-action.guard.js.map