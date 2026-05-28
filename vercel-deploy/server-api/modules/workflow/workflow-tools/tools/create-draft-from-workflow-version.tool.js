"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createCreateDraftFromWorkflowVersionTool", {
    enumerable: true,
    get: function() {
        return createCreateDraftFromWorkflowVersionTool;
    }
});
const _zod = require("zod");
const createDraftFromWorkflowVersionSchema = _zod.z.object({
    workflowId: _zod.z.string().uuid().describe('The UUID of the workflow'),
    workflowVersionIdToCopy: _zod.z.string().uuid().describe('The UUID of the workflow version to create a draft from')
});
const createCreateDraftFromWorkflowVersionTool = (deps, context)=>({
        name: 'create_draft_from_workflow_version',
        description: 'Create a new draft workflow version from an existing one. This allows for iterative workflow development.',
        inputSchema: createDraftFromWorkflowVersionSchema,
        execute: async (parameters)=>{
            try {
                return await deps.workflowVersionService.createDraftFromWorkflowVersion({
                    workspaceId: context.workspaceId,
                    workflowId: parameters.workflowId,
                    workflowVersionIdToCopy: parameters.workflowVersionIdToCopy
                });
            } catch (error) {
                return {
                    success: false,
                    error: error.message,
                    message: `Failed to create draft from workflow version: ${error.message}`
                };
            }
        }
    });

//# sourceMappingURL=create-draft-from-workflow-version.tool.js.map