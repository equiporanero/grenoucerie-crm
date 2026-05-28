"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowDraftEmailAction", {
    enumerable: true,
    get: function() {
        return isWorkflowDraftEmailAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowDraftEmailAction = (action)=>{
    return action.type === _workflowactiontype.WorkflowActionType.DRAFT_EMAIL;
};

//# sourceMappingURL=is-workflow-draft-email-action.guard.js.map