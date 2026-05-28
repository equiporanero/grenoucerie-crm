"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CodeWorkflowAction", {
    enumerable: true,
    get: function() {
        return CodeWorkflowAction;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _logicfunctionexecutorservice = require("../../../../../engine/core-modules/logic-function/logic-function-executor/logic-function-executor.service");
const _workflowstepexecutorexception = require("../../exceptions/workflow-step-executor.exception");
const _findsteporthrowutil = require("../../utils/find-step-or-throw.util");
const _isworkflowcodeactionguard = require("./guards/is-workflow-code-action.guard");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CodeWorkflowAction = class CodeWorkflowAction {
    async execute({ currentStepId, steps, context, runInfo }) {
        const step = (0, _findsteporthrowutil.findStepOrThrow)({
            stepId: currentStepId,
            steps
        });
        if (!(0, _isworkflowcodeactionguard.isWorkflowCodeAction)(step)) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Step is not a code action', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE);
        }
        const workflowActionInput = (0, _utils.resolveInput)(step.settings.input, context);
        const { workspaceId } = runInfo;
        const result = await this.logicFunctionExecutorService.execute({
            logicFunctionId: workflowActionInput.logicFunctionId,
            workspaceId,
            payload: workflowActionInput.logicFunctionInput
        });
        if (result.error) {
            return {
                error: result.error.errorMessage
            };
        }
        return {
            result: result.data || {}
        };
    }
    constructor(logicFunctionExecutorService){
        this.logicFunctionExecutorService = logicFunctionExecutorService;
    }
};
CodeWorkflowAction = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _logicfunctionexecutorservice.LogicFunctionExecutorService === "undefined" ? Object : _logicfunctionexecutorservice.LogicFunctionExecutorService
    ])
], CodeWorkflowAction);

//# sourceMappingURL=code.workflow-action.js.map