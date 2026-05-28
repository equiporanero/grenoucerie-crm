"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowSendEmailAction", {
    enumerable: true,
    get: function() {
        return isWorkflowSendEmailAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowSendEmailAction = (action)=>{
    return action.type === _workflowactiontype.WorkflowActionType.SEND_EMAIL;
};

//# sourceMappingURL=is-workflow-send-email-action.guard.js.map