"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "insertStep", {
    enumerable: true,
    get: function() {
        return insertStep;
    }
});
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _workflowversionstepexception = require("../../../common/exceptions/workflow-version-step.exception");
const _workflowactiontype = require("../../../workflow-executor/workflow-actions/types/workflow-action.type");
const insertStep = ({ existingSteps, existingTrigger, insertedStep, nextStepId, parentStepId, parentStepConnectionOptions })=>{
    let { updatedSteps, updatedTrigger } = (0, _utils.isDefined)(parentStepId) ? updateParentStep({
        trigger: existingTrigger,
        steps: existingSteps,
        parentStepId,
        insertedStepId: insertedStep.id,
        nextStepId,
        parentStepConnectionOptions
    }) : {
        updatedSteps: existingSteps,
        updatedTrigger: existingTrigger
    };
    const updatedInsertedStep = {
        ...insertedStep,
        nextStepIds: nextStepId ? [
            nextStepId
        ] : undefined
    };
    return {
        updatedSteps: [
            ...updatedSteps,
            updatedInsertedStep
        ],
        updatedTrigger,
        updatedInsertedStep
    };
};
const updateParentStep = ({ steps, trigger, parentStepId, insertedStepId, nextStepId, parentStepConnectionOptions })=>{
    if ((0, _utils.isDefined)(parentStepConnectionOptions)) {
        return updateStepsWithOptions({
            steps,
            parentStepId,
            insertedStepId,
            parentStepConnectionOptions,
            trigger,
            nextStepId
        });
    } else {
        return updateParentStepNextStepIds({
            steps,
            trigger,
            parentStepId,
            insertedStepId,
            nextStepId
        });
    }
};
const updateParentStepNextStepIds = ({ steps, trigger, parentStepId, insertedStepId, nextStepId })=>{
    let updatedTrigger = trigger;
    let updatedSteps = steps;
    if (parentStepId === _workflow.TRIGGER_STEP_ID) {
        if (!trigger) {
            throw new _workflowversionstepexception.WorkflowVersionStepException('Cannot insert step from undefined trigger', _workflowversionstepexception.WorkflowVersionStepExceptionCode.INVALID_REQUEST);
        }
        updatedTrigger = {
            ...trigger,
            nextStepIds: [
                ...new Set([
                    ...trigger.nextStepIds?.filter((id)=>id !== nextStepId) || [],
                    insertedStepId
                ])
            ]
        };
    } else {
        updatedSteps = steps.map((step)=>{
            if (step.id === parentStepId) {
                return {
                    ...step,
                    nextStepIds: [
                        ...new Set([
                            ...step.nextStepIds?.filter((id)=>id !== nextStepId) || [],
                            insertedStepId
                        ])
                    ]
                };
            }
            return step;
        });
    }
    return {
        updatedSteps,
        updatedTrigger
    };
};
const updateStepsWithOptions = ({ parentStepId, insertedStepId, steps, parentStepConnectionOptions, trigger, nextStepId })=>{
    let updatedSteps = steps;
    switch(parentStepConnectionOptions.connectedStepType){
        case _workflowactiontype.WorkflowActionType.ITERATOR:
            if (!parentStepConnectionOptions.settings.isConnectedToLoop) {
                break;
            }
            updatedSteps = steps.map((step)=>{
                if (step.id === parentStepId) {
                    if (step.type !== _workflowactiontype.WorkflowActionType.ITERATOR) {
                        throw new _workflowversionstepexception.WorkflowVersionStepException(`Step ${step.id} is not an iterator`, _workflowversionstepexception.WorkflowVersionStepExceptionCode.INVALID_REQUEST);
                    }
                    return {
                        ...step,
                        settings: {
                            ...step.settings,
                            input: {
                                ...step.settings.input,
                                initialLoopStepIds: [
                                    ...new Set([
                                        ...step.settings.input.initialLoopStepIds?.filter((id)=>id !== nextStepId) || [],
                                        insertedStepId
                                    ])
                                ]
                            }
                        }
                    };
                }
                return step;
            });
            break;
        default:
            break;
    }
    return {
        updatedSteps,
        updatedTrigger: trigger
    };
};

//# sourceMappingURL=insert-step.js.map