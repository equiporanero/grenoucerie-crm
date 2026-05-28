"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUpdateWorkflowVersionStepTool", {
    enumerable: true,
    get: function() {
        return createUpdateWorkflowVersionStepTool;
    }
});
const _workflow = require("twenty-shared/workflow");
const _zod = require("zod");
const updateWorkflowVersionStepSchema = _zod.z.object({
    workflowVersionId: _zod.z.string().uuid().describe('The UUID of the workflow version containing the step'),
    step: _zod.z.union([
        _workflow.workflowActionSchema
    ]).describe('The updated step configuration')
});
const createUpdateWorkflowVersionStepTool = (deps, context)=>({
        name: 'update_workflow_version_step',
        description: 'Update an existing step in a workflow version. This modifies the step configuration.',
        inputSchema: updateWorkflowVersionStepSchema,
        execute: async (parameters)=>{
            try {
                return await deps.workflowVersionStepService.updateWorkflowVersionStep({
                    workspaceId: context.workspaceId,
                    workflowVersionId: parameters.workflowVersionId,
                    step: parameters.step
                });
            } catch (error) {
                return {
                    success: false,
                    error: error.message,
                    message: `Failed to update workflow version step: ${error.message}`
                };
            }
        }
    });

//# sourceMappingURL=update-workflow-version-step.tool.js.map