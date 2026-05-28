// Injection token for WorkflowToolWorkspaceService to break circular dependency:
// ToolProviderModule -> WorkflowToolsModule -> WorkflowTriggerModule
// -> WorkflowRunnerModule -> WorkflowExecutorModule -> AiAgentActionModule
// -> AiAgentExecutionModule -> ToolProviderModule
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WORKFLOW_TOOL_SERVICE_TOKEN", {
    enumerable: true,
    get: function() {
        return WORKFLOW_TOOL_SERVICE_TOKEN;
    }
});
const WORKFLOW_TOOL_SERVICE_TOKEN = Symbol('WORKFLOW_TOOL_SERVICE_TOKEN');

//# sourceMappingURL=workflow-tool-service.token.js.map