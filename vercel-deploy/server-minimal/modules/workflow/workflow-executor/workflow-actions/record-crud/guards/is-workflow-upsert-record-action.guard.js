"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowUpsertRecordAction", {
    enumerable: true,
    get: function() {
        return isWorkflowUpsertRecordAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowUpsertRecordAction = (action)=>{
    return action.type === _workflowactiontype.WorkflowActionType.UPSERT_RECORD;
};

//# sourceMappingURL=is-workflow-upsert-record-action.guard.js.map