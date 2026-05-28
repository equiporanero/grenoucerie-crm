"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowUpdateRecordAction", {
    enumerable: true,
    get: function() {
        return isWorkflowUpdateRecordAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowUpdateRecordAction = (action)=>{
    return action.type === _workflowactiontype.WorkflowActionType.UPDATE_RECORD;
};

//# sourceMappingURL=is-workflow-update-record-action.guard.js.map