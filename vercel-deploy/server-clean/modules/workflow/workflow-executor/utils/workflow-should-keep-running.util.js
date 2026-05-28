"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "workflowShouldKeepRunning", {
    enumerable: true,
    get: function() {
        return workflowShouldKeepRunning;
    }
});
const _workflow = require("twenty-shared/workflow");
const _workflowrunworkspaceentity = require("../../common/standard-objects/workflow-run.workspace-entity");
const _shouldexecutesteputil = require("./should-execute-step.util");
const workflowShouldKeepRunning = ({ stepInfos, steps })=>{
    const runningOrPendingStepExists = steps.some((step)=>[
            _workflow.StepStatus.PENDING,
            _workflow.StepStatus.RUNNING
        ].includes(stepInfos[step.id]?.status));
    const completedStepWithNotStartedExecutableChildren = steps.some((step)=>(stepInfos[step.id]?.status === _workflow.StepStatus.SUCCESS || stepInfos[step.id]?.status === _workflow.StepStatus.FAILED_SAFELY) && (step.nextStepIds ?? []).some((nextStepId)=>{
            const nextStep = steps.find((candidateStep)=>candidateStep.id === nextStepId);
            if (!nextStep) {
                return false;
            }
            return stepInfos[nextStepId]?.status === _workflow.StepStatus.NOT_STARTED && (0, _shouldexecutesteputil.shouldExecuteStep)({
                step: nextStep,
                steps,
                stepInfos,
                workflowRunStatus: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING
            });
        }));
    return runningOrPendingStepExists || completedStepWithNotStartedExecutableChildren;
};

//# sourceMappingURL=workflow-should-keep-running.util.js.map