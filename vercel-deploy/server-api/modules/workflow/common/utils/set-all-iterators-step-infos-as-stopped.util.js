"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "setAllIteratorsStepInfosAsStopped", {
    enumerable: true,
    get: function() {
        return setAllIteratorsStepInfosAsStopped;
    }
});
const _workflow = require("twenty-shared/workflow");
const _isworkflowiteratoractionguard = require("../../workflow-executor/workflow-actions/iterator/guards/is-workflow-iterator-action.guard");
const setAllIteratorsStepInfosAsStopped = ({ stepInfos, steps })=>{
    const stoppedStepInfos = {};
    for (const step of steps){
        if (stepInfos[step.id]?.status === _workflow.StepStatus.RUNNING && (0, _isworkflowiteratoractionguard.isWorkflowIteratorAction)(step)) {
            stoppedStepInfos[step.id] = {
                ...stepInfos[step.id],
                status: _workflow.StepStatus.STOPPED
            };
        }
    }
    return stoppedStepInfos;
};

//# sourceMappingURL=set-all-iterators-step-infos-as-stopped.util.js.map