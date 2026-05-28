"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowCreateRecordAction", {
    enumerable: true,
    get: function() {
        return isWorkflowCreateRecordAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowCreateRecordAction = (action)=>{
    return action.type === _workflowactiontype.WorkflowActionType.CREATE_RECORD;
};

//# sourceMappingURL=is-workflow-create-record-action.guard.js.map