"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUpdateWorkflowVersionTriggerTool", {
    enumerable: true,
    get: function() {
        return createUpdateWorkflowVersionTriggerTool;
    }
});
const _workflow = require("twenty-shared/workflow");
const _zod = require("zod");
const updateWorkflowVersionTriggerSchema = _zod.z.object({
    workflowVersionId: _zod.z.string().uuid().describe('The UUID of the workflow version containing the trigger'),
    trigger: _workflow.workflowTriggerSchema.describe('The updated trigger configuration')
});
const createUpdateWorkflowVersionTriggerTool = (deps, context)=>({
        name: 'update_workflow_version_trigger',
        description: 'Update the trigger of a workflow version. This modifies the trigger configuration (e.g., changing trigger type, settings, or conditions).',
        inputSchema: updateWorkflowVersionTriggerSchema,
        execute: async (parameters)=>{
            try {
                await deps.workflowVersionStepHelpersService.getValidatedDraftWorkflowVersion({
                    workflowVersionId: parameters.workflowVersionId,
                    workspaceId: context.workspaceId
                });
                await deps.workflowVersionStepHelpersService.updateWorkflowVersionStepsAndTrigger({
                    workspaceId: context.workspaceId,
                    workflowVersionId: parameters.workflowVersionId,
                    trigger: parameters.trigger
                });
                return parameters.trigger;
            } catch (error) {
                return {
                    success: false,
                    error: error.message,
                    message: `Failed to update workflow version trigger: ${error.message}`
                };
            }
        }
    });

//# sourceMappingURL=update-workflow-version-trigger.tool.js.map