"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDeleteWorkflowVersionStepTool", {
    enumerable: true,
    get: function() {
        return createDeleteWorkflowVersionStepTool;
    }
});
const _zod = require("zod");
const deleteWorkflowVersionStepSchema = _zod.z.object({
    workflowVersionId: _zod.z.string().uuid().describe('The UUID of the workflow version containing the step'),
    stepId: _zod.z.string().uuid().describe('The UUID of the step to delete')
});
const createDeleteWorkflowVersionStepTool = (deps, context)=>({
        name: 'delete_workflow_version_step',
        description: 'Delete a step from a workflow version. This removes the step and updates the workflow structure.',
        inputSchema: deleteWorkflowVersionStepSchema,
        execute: async (parameters)=>{
            try {
                return await deps.workflowVersionStepService.deleteWorkflowVersionStep({
                    workspaceId: context.workspaceId,
                    workflowVersionId: parameters.workflowVersionId,
                    stepIdToDelete: parameters.stepId
                });
            } catch (error) {
                return {
                    success: false,
                    error: error.message,
                    message: `Failed to delete workflow version step: ${error.message}`
                };
            }
        }
    });

//# sourceMappingURL=delete-workflow-version-step.tool.js.map