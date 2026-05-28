"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "shouldFailSafelyIteratorStep", {
    enumerable: true,
    get: function() {
        return shouldFailSafelyIteratorStep;
    }
});
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _terminalstepstatusesconstant = require("../../../constants/terminal-step-statuses.constant");
const _stephasbeenstartedutil = require("../../../utils/step-has-been-started.util");
const _getallstepidsinlooputil = require("./get-all-step-ids-in-loop.util");
const shouldFailSafelyIteratorStep = ({ step, steps, stepInfos })=>{
    const stepsTargetingIterator = steps.filter((parentStep)=>(0, _utils.isDefined)(parentStep) && parentStep.nextStepIds?.includes(step.id));
    const initialLoopStepIds = step.settings.input.initialLoopStepIds;
    const stepIdsInLoop = (0, _utils.isDefined)(initialLoopStepIds) ? (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
        iteratorStepId: step.id,
        initialLoopStepIds,
        steps
    }) : [];
    const externalParentSteps = stepsTargetingIterator.filter((parentStep)=>!stepIdsInLoop.includes(parentStep.id));
    if (!(0, _stephasbeenstartedutil.stepHasBeenStarted)(step.id, stepInfos)) {
        if (externalParentSteps.length === 0) {
            return false;
        }
        const areAllExternalParentsTerminal = externalParentSteps.every((parentStep)=>_terminalstepstatusesconstant.TERMINAL_STEP_STATUSES.includes(stepInfos[parentStep.id]?.status));
        const hasFailedSafelyExternalParent = externalParentSteps.some((parentStep)=>stepInfos[parentStep.id]?.status === _workflow.StepStatus.FAILED_SAFELY);
        return areAllExternalParentsTerminal && hasFailedSafelyExternalParent;
    }
    const areAllParentsTerminal = stepsTargetingIterator.every((parentStep)=>_terminalstepstatusesconstant.TERMINAL_STEP_STATUSES.includes(stepInfos[parentStep.id]?.status));
    if (!areAllParentsTerminal) {
        return false;
    }
    const hasFailedSafelyParent = stepsTargetingIterator.some((parentStep)=>stepInfos[parentStep.id]?.status === _workflow.StepStatus.FAILED_SAFELY);
    if (!hasFailedSafelyParent) {
        return false;
    }
    // If the iterator has the flag, check whether the failure originated from
    // its own loop. If yes, the iterator handles it (re-execute) — not fail safely.
    if (step.settings.input.shouldContinueOnIterationFailure) {
        const hasFailureFromOwnLoop = stepIdsInLoop.some((loopStepId)=>stepInfos[loopStepId]?.status === _workflow.StepStatus.FAILED_SAFELY && (0, _utils.isDefined)(stepInfos[loopStepId]?.error));
        if (hasFailureFromOwnLoop) {
            return false;
        }
    }
    return true;
};

//# sourceMappingURL=should-fail-safely-iterator-step.util.js.map