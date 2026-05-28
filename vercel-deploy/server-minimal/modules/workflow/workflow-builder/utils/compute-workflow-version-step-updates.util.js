"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeWorkflowVersionStepChanges", {
    enumerable: true,
    get: function() {
        return computeWorkflowVersionStepChanges;
    }
});
const _classvalidator = require("class-validator");
const _microdiff = /*#__PURE__*/ _interop_require_default(require("microdiff"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const computeWorkflowVersionStepChanges = ({ existingTrigger, existingSteps, updatedTrigger, updatedSteps })=>{
    const triggerDiff = updatedTrigger !== undefined ? (0, _microdiff.default)({
        trigger: existingTrigger
    }, {
        trigger: updatedTrigger
    }) : [];
    const stepsDiff = (0, _classvalidator.isDefined)(updatedSteps) ? (0, _microdiff.default)({
        steps: existingSteps
    }, {
        steps: updatedSteps
    }) : [];
    return {
        triggerDiff,
        stepsDiff
    };
};

//# sourceMappingURL=compute-workflow-version-step-updates.util.js.map