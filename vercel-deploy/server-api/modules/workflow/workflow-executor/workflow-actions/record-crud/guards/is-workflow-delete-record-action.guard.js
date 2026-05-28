"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowDeleteRecordAction", {
    enumerable: true,
    get: function() {
        return isWorkflowDeleteRecordAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowDeleteRecordAction = (action)=>{
    return action.type === _workflowactiontype.WorkflowActionType.DELETE_RECORD;
};

//# sourceMappingURL=is-workflow-delete-record-action.guard.js.map