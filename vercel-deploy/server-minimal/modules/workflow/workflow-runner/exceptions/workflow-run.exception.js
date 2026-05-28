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
    get WorkflowRunException () {
        return WorkflowRunException;
    },
    get WorkflowRunExceptionCode () {
        return WorkflowRunExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var WorkflowRunExceptionCode = /*#__PURE__*/ function(WorkflowRunExceptionCode) {
    WorkflowRunExceptionCode["WORKFLOW_RUN_NOT_FOUND"] = "WORKFLOW_RUN_NOT_FOUND";
    WorkflowRunExceptionCode["WORKFLOW_ROOT_STEP_NOT_FOUND"] = "WORKFLOW_ROOT_STEP_NOT_FOUND";
    WorkflowRunExceptionCode["INVALID_OPERATION"] = "INVALID_OPERATION";
    WorkflowRunExceptionCode["INVALID_INPUT"] = "INVALID_INPUT";
    WorkflowRunExceptionCode["WORKFLOW_RUN_LIMIT_REACHED"] = "WORKFLOW_RUN_LIMIT_REACHED";
    WorkflowRunExceptionCode["WORKFLOW_RUN_INVALID"] = "WORKFLOW_RUN_INVALID";
    return WorkflowRunExceptionCode;
}({});
const getWorkflowRunExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "WORKFLOW_RUN_NOT_FOUND":
            return /*i18n*/ {
                id: "daijCZ",
                message: "Workflow run not found."
            };
        case "WORKFLOW_ROOT_STEP_NOT_FOUND":
            return /*i18n*/ {
                id: "ysb9m+",
                message: "Workflow root step not found."
            };
        case "INVALID_OPERATION":
            return /*i18n*/ {
                id: "aYt8SY",
                message: "Invalid workflow operation."
            };
        case "INVALID_INPUT":
            return /*i18n*/ {
                id: "E7F6q9",
                message: "Invalid workflow input."
            };
        case "WORKFLOW_RUN_LIMIT_REACHED":
            return /*i18n*/ {
                id: "AzylSS",
                message: "Workflow run limit reached."
            };
        case "WORKFLOW_RUN_INVALID":
            return /*i18n*/ {
                id: "mNaQTB",
                message: "Invalid workflow run."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkflowRunException = class WorkflowRunException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkflowRunExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workflow-run.exception.js.map