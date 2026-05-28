"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createCreateWorkflowVersionEdgeTool", {
    enumerable: true,
    get: function() {
        return createCreateWorkflowVersionEdgeTool;
    }
});
const _zod = require("zod");
const _workflowactiontypeenum = require("../../workflow-executor/workflow-actions/types/workflow-action-type.enum");
const createWorkflowVersionEdgeSchema = _zod.z.object({
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
const createCreateWorkflowVersionEdgeTool = (deps, context)=>({
        name: 'create_workflow_version_edge',
        description: 'Create a connection (edge) between two workflow steps. This defines the flow between steps.',
        inputSchema: createWorkflowVersionEdgeSchema,
        execute: async (parameters)=>{
            try {
                return await deps.workflowVersionEdgeService.createWorkflowVersionEdge({
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
                    message: `Failed to create workflow version edge: ${error.message}`
                };
            }
        }
    });

//# sourceMappingURL=create-workflow-version-edge.tool.js.map