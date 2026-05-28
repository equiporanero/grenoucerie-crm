"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowLogicFunctionAction", {
    enumerable: true,
    get: function() {
        return isWorkflowLogicFunctionAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowLogicFunctionAction = (action)=>{
    return action.type === _workflowactiontype.WorkflowActionType.LOGIC_FUNCTION;
};

//# sourceMappingURL=is-workflow-logic-function-action.guard.js.map