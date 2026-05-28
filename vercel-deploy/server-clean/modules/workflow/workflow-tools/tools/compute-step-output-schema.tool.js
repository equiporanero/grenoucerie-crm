"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createComputeStepOutputSchemaTool", {
    enumerable: true,
    get: function() {
        return createComputeStepOutputSchemaTool;
    }
});
const _workflow = require("twenty-shared/workflow");
const _zod = require("zod");
const computeStepOutputSchemaSchema = _zod.z.object({
    step: _zod.z.union([
        _workflow.workflowTriggerSchema,
        _workflow.workflowActionSchema
    ]).describe('The workflow step configuration'),
    workflowVersionId: _zod.z.string().uuid().describe('The UUID of the workflow version')
});
const createComputeStepOutputSchemaTool = (deps, context)=>({
        name: 'compute_step_output_schema',
        description: 'Compute the output schema for a workflow step. This determines what data the step produces. The step parameter must be a valid WorkflowTrigger or WorkflowAction with the correct settings structure for its type.',
        inputSchema: computeStepOutputSchemaSchema,
        execute: async (parameters)=>{
            try {
                return await deps.workflowSchemaService.computeStepOutputSchema({
                    step: parameters.step,
                    workspaceId: context.workspaceId,
                    workflowVersionId: parameters.workflowVersionId
                });
            } catch (error) {
                return {
                    success: false,
                    error: error.message,
                    message: `Failed to compute step output schema: ${error.message}`
                };
            }
        }
    });

//# sourceMappingURL=compute-step-output-schema.tool.js.map