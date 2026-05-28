"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get WorkflowVersionStepGraphqlApiExceptionFilter () {
        return WorkflowVersionStepGraphqlApiExceptionFilter;
    },
    get handleWorkflowVersionStepException () {
        return handleWorkflowVersionStepException;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const _workflowversionstepexception = require("../../../../modules/workflow/common/exceptions/workflow-version-step.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const handleWorkflowVersionStepException = (exception)=>{
    switch(exception.code){
        case _workflowversionstepexception.WorkflowVersionStepExceptionCode.INVALID_REQUEST:
            throw new _graphqlerrorsutil.UserInputError(exception);
        case _workflowversionstepexception.WorkflowVersionStepExceptionCode.NOT_FOUND:
            throw new _graphqlerrorsutil.NotFoundError(exception);
        case _workflowversionstepexception.WorkflowVersionStepExceptionCode.CODE_STEP_FAILURE:
        case _workflowversionstepexception.WorkflowVersionStepExceptionCode.AI_AGENT_STEP_FAILURE:
            throw new _graphqlerrorsutil.InternalServerError(exception);
        default:
            {
                (0, _utils.assertUnreachable)(exception.code);
            }
    }
};
let WorkflowVersionStepGraphqlApiExceptionFilter = class WorkflowVersionStepGraphqlApiExceptionFilter {
    catch(exception) {
        handleWorkflowVersionStepException(exception);
    }
};
WorkflowVersionStepGraphqlApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_workflowversionstepexception.WorkflowVersionStepException)
], WorkflowVersionStepGraphqlApiExceptionFilter);

//# sourceMappingURL=workflow-version-step-graphql-api-exception.filter.js.map