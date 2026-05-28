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
    get WorkflowTriggerGraphqlApiExceptionFilter () {
        return WorkflowTriggerGraphqlApiExceptionFilter;
    },
    get handleWorkflowTriggerException () {
        return handleWorkflowTriggerException;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const _workflowtriggerexception = require("../../../../modules/workflow/workflow-trigger/exceptions/workflow-trigger.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const handleWorkflowTriggerException = (exception)=>{
    switch(exception.code){
        case _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_INPUT:
        case _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_VERSION:
        case _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_ACTION_TYPE:
        case _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_TRIGGER:
        case _workflowtriggerexception.WorkflowTriggerExceptionCode.INVALID_WORKFLOW_STATUS:
        case _workflowtriggerexception.WorkflowTriggerExceptionCode.FORBIDDEN:
            throw new _graphqlerrorsutil.UserInputError(exception);
        case _workflowtriggerexception.WorkflowTriggerExceptionCode.NOT_FOUND:
            throw new _graphqlerrorsutil.NotFoundError(exception);
        case _workflowtriggerexception.WorkflowTriggerExceptionCode.INTERNAL_ERROR:
            throw exception;
        default:
            {
                (0, _utils.assertUnreachable)(exception.code);
            }
    }
};
let WorkflowTriggerGraphqlApiExceptionFilter = class WorkflowTriggerGraphqlApiExceptionFilter {
    catch(exception) {
        handleWorkflowTriggerException(exception);
    }
};
WorkflowTriggerGraphqlApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_workflowtriggerexception.WorkflowTriggerException)
], WorkflowTriggerGraphqlApiExceptionFilter);

//# sourceMappingURL=workflow-trigger-graphql-api-exception.filter.js.map