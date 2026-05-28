"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowFindRecordsAction", {
    enumerable: true,
    get: function() {
        return isWorkflowFindRecordsAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowFindRecordsAction = (action)=>{
    return action.type === _workflowactiontype.WorkflowActionType.FIND_RECORDS;
};

//# sourceMappingURL=is-workflow-find-records-action.guard.js.map