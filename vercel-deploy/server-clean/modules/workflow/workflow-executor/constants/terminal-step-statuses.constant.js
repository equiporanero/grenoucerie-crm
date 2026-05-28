"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TERMINAL_STEP_STATUSES", {
    enumerable: true,
    get: function() {
        return TERMINAL_STEP_STATUSES;
    }
});
const _workflow = require("twenty-shared/workflow");
const TERMINAL_STEP_STATUSES = [
    _workflow.StepStatus.SUCCESS,
    _workflow.StepStatus.STOPPED,
    _workflow.StepStatus.SKIPPED,
    _workflow.StepStatus.FAILED_SAFELY
];

//# sourceMappingURL=terminal-step-statuses.constant.js.map