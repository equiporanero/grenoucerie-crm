"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createActivateWorkflowVersionTool", {
    enumerable: true,
    get: function() {
        return createActivateWorkflowVersionTool;
    }
});
const _zod = require("zod");
const activateWorkflowVersionSchema = _zod.z.object({
    workflowVersionId: _zod.z.string().uuid().describe('The UUID of the workflow version to activate')
});
const createActivateWorkflowVersionTool = (deps, context)=>({
        name: 'activate_workflow_version',
        description: 'Activate a workflow version. This makes the workflow version active and available for execution.',
        inputSchema: activateWorkflowVersionSchema,
        execute: async (parameters)=>{
            try {
                return await deps.workflowTriggerService.activateWorkflowVersion(parameters.workflowVersionId, context.workspaceId);
            } catch (error) {
                return {
                    success: false,
                    error: error.message,
                    message: `Failed to activate workflow version: ${error.message}`
                };
            }
        }
    });

//# sourceMappingURL=activate-workflow-version.tool.js.map