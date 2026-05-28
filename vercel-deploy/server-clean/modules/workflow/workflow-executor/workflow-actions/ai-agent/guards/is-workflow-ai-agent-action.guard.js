"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isWorkflowAiAgentAction", {
    enumerable: true,
    get: function() {
        return isWorkflowAiAgentAction;
    }
});
const _workflowactiontype = require("../../types/workflow-action.type");
const isWorkflowAiAgentAction = (action)=>{
    return action.type === _workflowactiontype.WorkflowActionType.AI_AGENT;
};

//# sourceMappingURL=is-workflow-ai-agent-action.guard.js.map