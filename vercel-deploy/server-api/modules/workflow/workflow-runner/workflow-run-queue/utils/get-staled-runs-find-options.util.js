"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getStaledRunsFindOptions", {
    enumerable: true,
    get: function() {
        return getStaledRunsFindOptions;
    }
});
const _typeorm = require("typeorm");
const _workflowrunworkspaceentity = require("../../../common/standard-objects/workflow-run.workspace-entity");
const _staledrunsthreshold = require("../constants/staled-runs-threshold");
const getStaledRunsFindOptions = ()=>{
    const thresholdDate = new Date(Date.now() - _staledrunsthreshold.STALED_RUNS_THRESHOLD_MS);
    return {
        status: _workflowrunworkspaceentity.WorkflowRunStatus.ENQUEUED,
        enqueuedAt: (0, _typeorm.Or)((0, _typeorm.LessThan)(thresholdDate), (0, _typeorm.IsNull)())
    };
};

//# sourceMappingURL=get-staled-runs-find-options.util.js.map