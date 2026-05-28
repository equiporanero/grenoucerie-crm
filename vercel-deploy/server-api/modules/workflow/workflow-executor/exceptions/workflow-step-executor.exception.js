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
    get WorkflowStepExecutorException () {
        return WorkflowStepExecutorException;
    },
    get WorkflowStepExecutorExceptionCode () {
        return WorkflowStepExecutorExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../../../engine/api/common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../../utils/custom-exception");
var WorkflowStepExecutorExceptionCode = /*#__PURE__*/ function(WorkflowStepExecutorExceptionCode) {
    WorkflowStepExecutorExceptionCode["SCOPED_WORKSPACE_NOT_FOUND"] = "SCOPED_WORKSPACE_NOT_FOUND";
    WorkflowStepExecutorExceptionCode["INVALID_STEP_TYPE"] = "INVALID_STEP_TYPE";
    WorkflowStepExecutorExceptionCode["INVALID_STEP_INPUT"] = "INVALID_STEP_INPUT";
    WorkflowStepExecutorExceptionCode["STEP_NOT_FOUND"] = "STEP_NOT_FOUND";
    WorkflowStepExecutorExceptionCode["INTERNAL_ERROR"] = "INTERNAL_ERROR";
    return WorkflowStepExecutorExceptionCode;
}({});
const getWorkflowStepExecutorExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "SCOPED_WORKSPACE_NOT_FOUND":
            return /*i18n*/ {
                id: "EhVOPs",
                message: "Workspace not found."
            };
        case "INVALID_STEP_TYPE":
            return /*i18n*/ {
                id: "0NdYmj",
                message: "Invalid workflow step type."
            };
        case "STEP_NOT_FOUND":
            return /*i18n*/ {
                id: "dD9Vpa",
                message: "Workflow step not found."
            };
        case "INVALID_STEP_INPUT":
            return /*i18n*/ {
                id: "v+ozTr",
                message: "Invalid workflow step input."
            };
        case "INTERNAL_ERROR":
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkflowStepExecutorException = class WorkflowStepExecutorException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkflowStepExecutorExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workflow-step-executor.exception.js.map