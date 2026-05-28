"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IfElseWorkflowAction", {
    enumerable: true,
    get: function() {
        return IfElseWorkflowAction;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workflowstepexecutorexception = require("../../exceptions/workflow-step-executor.exception");
const _findsteporthrowutil = require("../../utils/find-step-or-throw.util");
const _isworkflowifelseactionguard = require("./guards/is-workflow-if-else-action.guard");
const _findmatchingbranchutil = require("./utils/find-matching-branch.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let IfElseWorkflowAction = class IfElseWorkflowAction {
    async execute(input) {
        const { currentStepId, steps, context } = input;
        const step = (0, _findsteporthrowutil.findStepOrThrow)({
            stepId: currentStepId,
            steps
        });
        if (!(0, _isworkflowifelseactionguard.isWorkflowIfElseAction)(step)) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Step is not an if-else action', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE);
        }
        const { stepFilterGroups, stepFilters, branches } = step.settings.input;
        if (!branches || branches.length === 0) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('If-else action must have at least one branch', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_INPUT);
        }
        if (!stepFilterGroups || !stepFilters) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('If-else action must have stepFilterGroups and stepFilters defined', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_INPUT);
        }
        const resolvedFilters = stepFilters.map((filter)=>({
                ...filter,
                rightOperand: (0, _utils.resolveInput)(filter.value, context),
                leftOperand: (0, _utils.resolveInput)(filter.stepOutputKey, context)
            }));
        const matchingBranch = (0, _findmatchingbranchutil.findMatchingBranch)({
            branches,
            stepFilterGroups,
            resolvedFilters
        });
        return {
            result: {
                matchingBranchId: matchingBranch.id
            }
        };
    }
};
IfElseWorkflowAction = _ts_decorate([
    (0, _common.Injectable)()
], IfElseWorkflowAction);

//# sourceMappingURL=if-else.workflow-action.js.map