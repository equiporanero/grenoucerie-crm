"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDeactivateWorkflowVersionTool", {
    enumerable: true,
    get: function() {
        return createDeactivateWorkflowVersionTool;
    }
});
const _zod = require("zod");
const deactivateWorkflowVersionSchema = _zod.z.object({
    workflowVersionId: _zod.z.string().uuid().describe('The UUID of the workflow version to deactivate')
});
const createDeactivateWorkflowVersionTool = (deps, context)=>({
        name: 'deactivate_workflow_version',
        description: 'Deactivate a workflow version. This makes the workflow version inactive and unavailable for execution.',
        inputSchema: deactivateWorkflowVersionSchema,
        execute: async (parameters)=>{
            try {
                return await deps.workflowTriggerService.deactivateWorkflowVersion(parameters.workflowVersionId, context.workspaceId);
            } catch (error) {
                return {
                    success: false,
                    error: error.message,
                    message: `Failed to deactivate workflow version: ${error.message}`
                };
            }
        }
    });

//# sourceMappingURL=deactivate-workflow-version.tool.js.map