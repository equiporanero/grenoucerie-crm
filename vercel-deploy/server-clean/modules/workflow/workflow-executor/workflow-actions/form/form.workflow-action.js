"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FormWorkflowAction", {
    enumerable: true,
    get: function() {
        return FormWorkflowAction;
    }
});
const _common = require("@nestjs/common");
const _workflowstepexecutorexception = require("../../exceptions/workflow-step-executor.exception");
const _findsteporthrowutil = require("../../utils/find-step-or-throw.util");
const _isworkflowformactionguard = require("./guards/is-workflow-form-action.guard");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FormWorkflowAction = class FormWorkflowAction {
    async execute({ currentStepId, steps }) {
        const step = (0, _findsteporthrowutil.findStepOrThrow)({
            stepId: currentStepId,
            steps
        });
        if (!(0, _isworkflowformactionguard.isWorkflowFormAction)(step)) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Step is not a form action', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE);
        }
        return {
            pendingEvent: true
        };
    }
};
FormWorkflowAction = _ts_decorate([
    (0, _common.Injectable)()
], FormWorkflowAction);

//# sourceMappingURL=form.workflow-action.js.map