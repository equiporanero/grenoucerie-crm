"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "shouldExecuteStep", {
    enumerable: true,
    get: function() {
        return shouldExecuteStep;
    }
});
const _utils = require("twenty-shared/utils");
const _workflowrunworkspaceentity = require("../../common/standard-objects/workflow-run.workspace-entity");
const _shouldexecutechildsteputil = require("./should-execute-child-step.util");
const _stephasbeenstartedutil = require("./step-has-been-started.util");
const _isworkflowiteratoractionguard = require("../workflow-actions/iterator/guards/is-workflow-iterator-action.guard");
const _shouldexecuteiteratorsteputil = require("../workflow-actions/iterator/utils/should-execute-iterator-step.util");
const shouldExecuteStep = ({ step, steps, stepInfos, workflowRunStatus })=>{
    if (workflowRunStatus !== _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING) {
        return false;
    }
    if ((0, _isworkflowiteratoractionguard.isWorkflowIteratorAction)(step)) {
        return (0, _shouldexecuteiteratorsteputil.shouldExecuteIteratorStep)({
            step,
            steps,
            stepInfos
        });
    }
    if ((0, _stephasbeenstartedutil.stepHasBeenStarted)(step.id, stepInfos)) {
        return false;
    }
    const parentSteps = steps.filter((parentStep)=>(0, _utils.isDefined)(parentStep) && parentStep.nextStepIds?.includes(step.id));
    return (0, _shouldexecutechildsteputil.shouldExecuteChildStep)({
        parentSteps,
        stepInfos
    });
};

//# sourceMappingURL=should-execute-step.util.js.map