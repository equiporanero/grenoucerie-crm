"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FilterWorkflowAction", {
    enumerable: true,
    get: function() {
        return FilterWorkflowAction;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workflowstepexecutorexception = require("../../exceptions/workflow-step-executor.exception");
const _findsteporthrowutil = require("../../utils/find-step-or-throw.util");
const _isworkflowfilteractionguard = require("./guards/is-workflow-filter-action.guard");
const _evaluatefilterconditionsutil = require("./utils/evaluate-filter-conditions.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FilterWorkflowAction = class FilterWorkflowAction {
    async execute(input) {
        const { currentStepId, steps, context } = input;
        const step = (0, _findsteporthrowutil.findStepOrThrow)({
            stepId: currentStepId,
            steps
        });
        if (!(0, _isworkflowfilteractionguard.isWorkflowFilterAction)(step)) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Step is not a filter action', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE);
        }
        const { stepFilterGroups, stepFilters } = step.settings.input;
        if (!stepFilterGroups || !stepFilters) {
            return {
                result: {
                    shouldEndWorkflowRun: false
                }
            };
        }
        const resolvedFilters = stepFilters.map((filter)=>({
                ...filter,
                rightOperand: (0, _utils.resolveInput)(filter.value, context),
                leftOperand: (0, _utils.resolveInput)(filter.stepOutputKey, context)
            }));
        const matchesFilter = (0, _evaluatefilterconditionsutil.evaluateFilterConditions)({
            filterGroups: stepFilterGroups,
            filters: resolvedFilters
        });
        return {
            result: {
                matchesFilter
            },
            shouldEndWorkflowRun: !matchesFilter
        };
    }
};
FilterWorkflowAction = _ts_decorate([
    (0, _common.Injectable)()
], FilterWorkflowAction);

//# sourceMappingURL=filter.workflow-action.js.map