"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createUpdateWorkflowVersionPositionsTool", {
    enumerable: true,
    get: function() {
        return createUpdateWorkflowVersionPositionsTool;
    }
});
const _zod = require("zod");
const updateWorkflowVersionPositionsSchema = _zod.z.object({
    workflowVersionId: _zod.z.string().uuid().describe('The UUID of the workflow version'),
    positions: _zod.z.array(_zod.z.object({
        id: _zod.z.string().describe('Step or trigger ID'),
        position: _zod.z.object({
            x: _zod.z.number(),
            y: _zod.z.number()
        })
    })).describe('Array of step positions to update')
});
const createUpdateWorkflowVersionPositionsTool = (deps, context)=>({
        name: 'update_workflow_version_positions',
        description: 'Update the positions of multiple workflow steps. This is useful for reorganizing the workflow layout.',
        inputSchema: updateWorkflowVersionPositionsSchema,
        execute: async (parameters)=>{
            try {
                return await deps.workflowVersionService.updateWorkflowVersionPositions({
                    workflowVersionId: parameters.workflowVersionId,
                    positions: parameters.positions,
                    workspaceId: context.workspaceId
                });
            } catch (error) {
                return {
                    success: false,
                    error: error.message,
                    message: `Failed to update workflow version step positions: ${error.message}`
                };
            }
        }
    });

//# sourceMappingURL=update-workflow-version-positions.tool.js.map