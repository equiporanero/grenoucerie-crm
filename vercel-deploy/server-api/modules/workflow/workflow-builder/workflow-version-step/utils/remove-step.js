"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get getEmptyChildStepIdsForIfElse () {
        return getEmptyChildStepIdsForIfElse;
    },
    get removeStep () {
        return removeStep;
    }
});
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _uuid = require("uuid");
const _isworkflowemptyactionguard = require("../../../workflow-executor/workflow-actions/empty/guards/is-workflow-empty-action.guard");
const _isworkflowifelseactionguard = require("../../../workflow-executor/workflow-actions/if-else/guards/is-workflow-if-else-action.guard");
const _workflowactiontype = require("../../../workflow-executor/workflow-actions/types/workflow-action.type");
const computeUpdatedNextStepIds = ({ existingNextStepIds, stepIdToRemove, stepToDeleteChildrenIds })=>{
    const filteredNextStepIds = (0, _utils.isDefined)(existingNextStepIds) ? existingNextStepIds.filter((id)=>id !== stepIdToRemove) : [];
    return [
        ...new Set([
            ...filteredNextStepIds,
            // We automatically link parent and child steps together
            ...stepToDeleteChildrenIds || []
        ])
    ];
};
const getEmptyChildStepIdsForIfElse = ({ branches, allSteps })=>{
    const childStepIds = branches.flatMap((branch)=>branch.nextStepIds);
    return childStepIds.filter((childStepId)=>{
        const childStep = allSteps.find((step)=>step.id === childStepId);
        return (0, _utils.isDefined)(childStep) && (0, _isworkflowemptyactionguard.isWorkflowEmptyAction)(childStep);
    });
};
const createReplacementEmptyNode = ({ ifElseStep, isIfBranch, deletedStepPosition })=>{
    const offset = isIfBranch ? _workflow.IF_ELSE_BRANCH_POSITION_OFFSETS.IF : _workflow.IF_ELSE_BRANCH_POSITION_OFFSETS.ELSE;
    return {
        id: (0, _uuid.v4)(),
        name: 'Add an Action',
        type: _workflowactiontype.WorkflowActionType.EMPTY,
        valid: true,
        settings: {
            outputSchema: {},
            errorHandlingOptions: {
                continueOnFailure: {
                    value: false
                },
                retryOnFailure: {
                    value: false
                }
            },
            input: {}
        },
        position: deletedStepPosition ?? {
            x: (ifElseStep.position?.x ?? 0) + offset.x,
            y: (ifElseStep.position?.y ?? 0) + offset.y
        }
    };
};
const updateIfElseStepOnDeletion = ({ step, stepIdToDelete, stepToDeleteChildrenIds, allRemovedStepIds, replacementEmptyNodes, deletedStepPosition })=>{
    if (!(0, _isworkflowifelseactionguard.isWorkflowIfElseAction)(step)) {
        return step;
    }
    const totalBranches = step.settings.input.branches.length;
    const updatedBranches = step.settings.input.branches.map((branch, branchIndex)=>{
        let updatedNextStepIds = branch.nextStepIds;
        if (branch.nextStepIds.includes(stepIdToDelete)) {
            updatedNextStepIds = computeUpdatedNextStepIds({
                existingNextStepIds: branch.nextStepIds,
                stepIdToRemove: stepIdToDelete,
                stepToDeleteChildrenIds
            });
        }
        const finalNextStepIds = updatedNextStepIds.filter((id)=>!allRemovedStepIds.includes(id));
        const isIfBranch = branchIndex === 0;
        const isElseBranch = branchIndex === totalBranches - 1 && !(0, _utils.isDefined)(branch.filterGroupId);
        if ((isIfBranch || isElseBranch) && finalNextStepIds.length === 0) {
            const emptyNode = createReplacementEmptyNode({
                ifElseStep: step,
                isIfBranch,
                deletedStepPosition
            });
            replacementEmptyNodes.push(emptyNode);
            return {
                ...branch,
                nextStepIds: [
                    emptyNode.id
                ]
            };
        }
        return {
            ...branch,
            nextStepIds: finalNextStepIds
        };
    });
    const filteredBranches = updatedBranches.filter((branch, branchIndex)=>{
        const isIfBranch = branchIndex === 0;
        const isElseBranch = branchIndex === updatedBranches.length - 1 && !(0, _utils.isDefined)(branch.filterGroupId);
        const isElseIfBranch = branchIndex > 0 && branchIndex < updatedBranches.length - 1 && (0, _utils.isDefined)(branch.filterGroupId);
        if (isIfBranch || isElseBranch) {
            return true;
        }
        if (isElseIfBranch && branch.nextStepIds.length === 0) {
            return false;
        }
        return true;
    });
    return {
        ...step,
        settings: {
            ...step.settings,
            input: {
                ...step.settings.input,
                branches: filteredBranches
            }
        }
    };
};
const updateNextStepIdsOnDeletion = ({ step, stepIdToDelete, stepToDeleteChildrenIds })=>{
    return {
        ...step,
        nextStepIds: computeUpdatedNextStepIds({
            existingNextStepIds: step.nextStepIds ?? [],
            stepIdToRemove: stepIdToDelete,
            stepToDeleteChildrenIds
        })
    };
};
const updateIteratorStepOnDeletion = ({ step, stepIdToDelete, stepToDeleteChildrenIds })=>{
    return {
        ...step,
        settings: {
            ...step.settings,
            input: {
                ...step.settings.input,
                initialLoopStepIds: computeUpdatedNextStepIds({
                    existingNextStepIds: step.settings.input.initialLoopStepIds ?? [],
                    stepIdToRemove: stepIdToDelete,
                    stepToDeleteChildrenIds
                })
            }
        }
    };
};
const removeStep = ({ existingTrigger, existingSteps, stepIdToDelete, stepToDeleteChildrenIds })=>{
    if (stepIdToDelete === _workflow.TRIGGER_STEP_ID) {
        return {
            updatedSteps: existingSteps,
            updatedTrigger: null,
            removedStepIds: [
                _workflow.TRIGGER_STEP_ID
            ]
        };
    }
    const stepToDelete = existingSteps?.find((step)=>step.id === stepIdToDelete);
    let emptyChildStepIds = [];
    if ((0, _utils.isDefined)(stepToDelete) && (0, _isworkflowifelseactionguard.isWorkflowIfElseAction)(stepToDelete) && (0, _utils.isDefined)(existingSteps)) {
        emptyChildStepIds = getEmptyChildStepIdsForIfElse({
            branches: stepToDelete.settings.input.branches,
            allSteps: existingSteps
        });
    }
    const allRemovedStepIds = [
        stepIdToDelete,
        ...emptyChildStepIds
    ];
    const replacementEmptyNodes = [];
    const updatedSteps = existingSteps?.filter((step)=>!allRemovedStepIds.includes(step.id)).map((step)=>{
        if (step.type === _workflowactiontype.WorkflowActionType.IF_ELSE) {
            return updateIfElseStepOnDeletion({
                step,
                stepIdToDelete,
                stepToDeleteChildrenIds,
                allRemovedStepIds,
                replacementEmptyNodes,
                deletedStepPosition: stepToDelete?.position
            });
        }
        if (step.nextStepIds?.includes(stepIdToDelete)) {
            return updateNextStepIdsOnDeletion({
                step,
                stepIdToDelete,
                stepToDeleteChildrenIds
            });
        }
        if (step.type === _workflowactiontype.WorkflowActionType.ITERATOR && (0, _utils.isDefined)(step.settings.input.initialLoopStepIds) && step.settings.input.initialLoopStepIds.includes(stepIdToDelete)) {
            return updateIteratorStepOnDeletion({
                step,
                stepIdToDelete,
                stepToDeleteChildrenIds
            });
        }
        return step;
    }) ?? [];
    updatedSteps.push(...replacementEmptyNodes);
    let updatedTrigger = existingTrigger;
    if ((0, _utils.isDefined)(existingTrigger)) {
        if (existingTrigger.nextStepIds?.includes(stepIdToDelete)) {
            updatedTrigger = {
                ...existingTrigger,
                nextStepIds: computeUpdatedNextStepIds({
                    existingNextStepIds: existingTrigger.nextStepIds,
                    stepIdToRemove: stepIdToDelete,
                    stepToDeleteChildrenIds
                })
            };
        }
    }
    return {
        updatedSteps,
        updatedTrigger,
        removedStepIds: allRemovedStepIds
    };
};

//# sourceMappingURL=remove-step.js.map