"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "shouldExecuteIteratorStep", {
    enumerable: true,
    get: function() {
        return shouldExecuteIteratorStep;
    }
});
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _terminalstepstatusesconstant = require("../../../constants/terminal-step-statuses.constant");
const _shouldexecutechildsteputil = require("../../../utils/should-execute-child-step.util");
const _stephasbeenstartedutil = require("../../../utils/step-has-been-started.util");
const _getallstepidsinlooputil = require("./get-all-step-ids-in-loop.util");
const shouldExecuteIteratorStep = ({ step, steps, stepInfos })=>{
    const stepsTargetingIterator = steps.filter((parentStep)=>(0, _utils.isDefined)(parentStep) && parentStep.nextStepIds?.includes(step.id));
    const initialLoopStepIds = step.settings.input.initialLoopStepIds;
    const stepIdsInLoop = (0, _utils.isDefined)(initialLoopStepIds) ? (0, _getallstepidsinlooputil.getAllStepIdsInLoop)({
        iteratorStepId: step.id,
        initialLoopStepIds,
        steps
    }) : [];
    const parentSteps = stepsTargetingIterator.filter((parentStep)=>!stepIdsInLoop.includes(parentStep.id));
    const stepsToCheck = (0, _stephasbeenstartedutil.stepHasBeenStarted)(step.id, stepInfos) ? stepsTargetingIterator : parentSteps;
    // When iterator has been started and has the continue-on-failure flag,
    // allow re-execution even if all loop-back parents are FAILED_SAFELY/SKIPPED
    // (i.e. don't require at least one SUCCESS parent)
    if ((0, _stephasbeenstartedutil.stepHasBeenStarted)(step.id, stepInfos) && step.settings.input.shouldContinueOnIterationFailure) {
        const hasFailureFromOwnLoop = stepIdsInLoop.some((loopStepId)=>stepInfos[loopStepId]?.status === _workflow.StepStatus.FAILED_SAFELY && (0, _utils.isDefined)(stepInfos[loopStepId]?.error));
        if (hasFailureFromOwnLoop) {
            const areAllParentsTerminal = stepsToCheck.every((parentStep)=>_terminalstepstatusesconstant.TERMINAL_STEP_STATUSES.includes(stepInfos[parentStep.id]?.status));
            return areAllParentsTerminal;
        }
    }
    return (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
        parentSteps: stepsToCheck,
        stepInfos
    });
};

//# sourceMappingURL=should-execute-iterator-step.util.js.map