"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createDeleteWorkflowVersionEdgeTool", {
    enumerable: true,
    get: function() {
        return createDeleteWorkflowVersionEdgeTool;
    }
});
const _zod = require("zod");
const _workflowactiontypeenum = require("../../workflow-executor/workflow-actions/types/workflow-action-type.enum");
const deleteWorkflowVersionEdgeSchema = _zod.z.object({
    workflowVersionId: _zod.z.string().uuid().describe('The UUID of the workflow version'),
    source: _zod.z.union([
        _zod.z.literal('trigger'),
        _zod.z.string().uuid()
    ]).describe('The source step: "trigger" or a step UUID'),
    target: _zod.z.string().uuid().describe('The UUID of the target step'),
    sourceConnectionOptions: _zod.z.object({
        connectedStepType: _zod.z.literal(_workflowactiontypeenum.WorkflowActionType.ITERATOR),
        settings: _zod.z.object({
            isConnectedToLoop: _zod.z.boolean()
        })
    }).optional().describe('Optional connection options for iterator steps')
});
const createDeleteWorkflowVersionEdgeTool = (deps, context)=>({
        name: 'delete_workflow_version_edge',
        description: 'Delete a connection (edge) between workflow steps.',
        inputSchema: deleteWorkflowVersionEdgeSchema,
        execute: async (parameters)=>{
            try {
                return await deps.workflowVersionEdgeService.deleteWorkflowVersionEdge({
                    source: parameters.source,
                    target: parameters.target,
                    workflowVersionId: parameters.workflowVersionId,
                    workspaceId: context.workspaceId,
                    sourceConnectionOptions: parameters.sourceConnectionOptions
                });
            } catch (error) {
                return {
                    success: false,
                    error: error.message,
                    message: `Failed to delete workflow version edge: ${error.message}`
                };
            }
        }
    });

//# sourceMappingURL=delete-workflow-version-edge.tool.js.map