"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createCreateWorkflowVersionStepTool", {
    enumerable: true,
    get: function() {
        return createCreateWorkflowVersionStepTool;
    }
});
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _zod = require("zod");
const _workflowactiontypeenum = require("../../workflow-executor/workflow-actions/types/workflow-action-type.enum");
const baseStepFields = {
    workflowVersionId: _zod.z.string().uuid().describe('The UUID of the workflow version to add the step to'),
    parentStepId: _zod.z.string().optional().describe('Optional ID of the parent step this step should come after (UUID, or "trigger" for the trigger step). If not provided, the step will be added at the end of the workflow.'),
    parentStepConnectionOptions: _zod.z.object({
        type: _zod.z.string().optional(),
        conditionGroupIndex: _zod.z.number().optional()
    }).optional().describe('Optional parent step connection options'),
    nextStepId: _zod.z.string().optional().describe('Optional ID of the step this new step should connect to'),
    position: _zod.z.object({
        x: _zod.z.number(),
        y: _zod.z.number()
    }).optional().describe('Optional position coordinates for the step')
};
const nonLogicFunctionStepTypes = Object.values(_workflowactiontypeenum.WorkflowActionType).filter((type)=>type !== _workflowactiontypeenum.WorkflowActionType.LOGIC_FUNCTION);
const createWorkflowVersionStepSchema = _zod.z.discriminatedUnion('stepType', [
    _zod.z.object({
        ...baseStepFields,
        stepType: _zod.z.literal(_workflowactiontypeenum.WorkflowActionType.LOGIC_FUNCTION),
        defaultSettings: _zod.z.object({
            input: _zod.z.object({
                logicFunctionId: _zod.z.string().describe('The ID of the logic function. Use list_logic_function_tools to discover available IDs.')
            })
        }).describe('Settings for the LOGIC_FUNCTION step. Must include input.logicFunctionId.')
    }),
    _zod.z.object({
        ...baseStepFields,
        stepType: _zod.z.enum(nonLogicFunctionStepTypes),
        defaultSettings: _zod.z.record(_zod.z.string(), _zod.z.unknown()).optional().describe('Optional default settings for the step.')
    })
]);
const enrichResultWithNextStep = ({ result, stepType })=>{
    switch(stepType){
        case _workflowactiontypeenum.WorkflowActionType.CODE:
            return {
                ...result,
                nextStep: 'This CODE step was created with a default placeholder function. You MUST now call update_logic_function_source with the logicFunctionId from this step to define the actual code.'
            };
        default:
            return result;
    }
};
const createCreateWorkflowVersionStepTool = (deps, context)=>({
        name: 'create_workflow_version_step',
        description: 'Create a new step in a workflow version. This adds a step to the specified workflow version with the given configuration. If parentStepId is not provided, the step will be appended at the end of the workflow.',
        inputSchema: createWorkflowVersionStepSchema,
        execute: async (parameters)=>{
            try {
                let effectiveParentStepId = parameters.parentStepId;
                if (!(0, _utils.isDefined)(effectiveParentStepId)) {
                    const workflowVersion = await deps.workflowVersionStepHelpersService.getValidatedDraftWorkflowVersion({
                        workflowVersionId: parameters.workflowVersionId,
                        workspaceId: context.workspaceId
                    });
                    const steps = workflowVersion.steps ?? [];
                    if (steps.length === 0) {
                        effectiveParentStepId = _workflow.TRIGGER_STEP_ID;
                    } else {
                        const leafStep = steps.filter((step)=>!(0, _utils.isDefined)(step.nextStepIds) || step.nextStepIds.length === 0);
                        if (leafStep.length > 1) {
                            effectiveParentStepId = undefined;
                        } else {
                            effectiveParentStepId = leafStep[0]?.id;
                        }
                    }
                }
                const result = await deps.workflowVersionStepService.createWorkflowVersionStep({
                    workspaceId: context.workspaceId,
                    input: {
                        ...parameters,
                        parentStepId: effectiveParentStepId
                    }
                });
                return enrichResultWithNextStep({
                    result,
                    stepType: parameters.stepType
                });
            } catch (error) {
                return {
                    success: false,
                    error: error.message,
                    message: `Failed to create workflow version step: ${error.message}`
                };
            }
        }
    });

//# sourceMappingURL=create-workflow-version-step.tool.js.map