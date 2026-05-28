"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowDelayAction", {
    enumerable: true,
    get: function() {
        return isWorkflowDelayAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowDelayAction = (action)=>{
    return action.type === _workflowactiontype.WorkflowActionType.DELAY;
};

//# sourceMappingURL=is-workflow-delay-action.guard.js.map