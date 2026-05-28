"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getRunsToCleanFindOptions", {
    enumerable: true,
    get: function() {
        return getRunsToCleanFindOptions;
    }
});
const _typeorm = require("typeorm");
const _workflowrunworkspaceentity = require("../../../common/standard-objects/workflow-run.workspace-entity");
const _runstocleanthreshold = require("../constants/runs-to-clean-threshold");
const getRunsToCleanFindOptions = ()=>{
    const thresholdDate = new Date(Date.now() - _runstocleanthreshold.RUNS_TO_CLEAN_THRESHOLD_DAYS * 24 * 60 * 60 * 1000).toISOString();
    return {
        status: (0, _typeorm.In)([
            _workflowrunworkspaceentity.WorkflowRunStatus.COMPLETED,
            _workflowrunworkspaceentity.WorkflowRunStatus.FAILED
        ]),
        createdAt: (0, _typeorm.LessThan)(thresholdDate)
    };
};

//# sourceMappingURL=get-runs-to-clean-find-options.util.js.map