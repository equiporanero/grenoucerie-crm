"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowIteratorAction", {
    enumerable: true,
    get: function() {
        return isWorkflowIteratorAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowIteratorAction = (action)=>action.type === _workflowactiontype.WorkflowActionType.ITERATOR;

//# sourceMappingURL=is-workflow-iterator-action.guard.js.map