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
    get WorkflowVersionStepException () {
        return WorkflowVersionStepException;
    },
    get WorkflowVersionStepExceptionCode () {
        return WorkflowVersionStepExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var WorkflowVersionStepExceptionCode = /*#__PURE__*/ function(WorkflowVersionStepExceptionCode) {
    WorkflowVersionStepExceptionCode["INVALID_REQUEST"] = "INVALID_REQUEST";
    WorkflowVersionStepExceptionCode["NOT_FOUND"] = "NOT_FOUND";
    WorkflowVersionStepExceptionCode["CODE_STEP_FAILURE"] = "CODE_STEP_FAILURE";
    WorkflowVersionStepExceptionCode["AI_AGENT_STEP_FAILURE"] = "AI_AGENT_STEP_FAILURE";
    return WorkflowVersionStepExceptionCode;
}({});
const getWorkflowVersionStepExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "INVALID_REQUEST":
            return /*i18n*/ {
                id: "GRz5NM",
                message: "Invalid workflow step request."
            };
        case "NOT_FOUND":
            return /*i18n*/ {
                id: "dD9Vpa",
                message: "Workflow step not found."
            };
        case "CODE_STEP_FAILURE":
            return /*i18n*/ {
                id: "o21Tgt",
                message: "Code step execution failed."
            };
        case "AI_AGENT_STEP_FAILURE":
            return /*i18n*/ {
                id: "WG8+0x",
                message: "AI agent step execution failed."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkflowVersionStepException = class WorkflowVersionStepException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkflowVersionStepExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workflow-version-step.exception.js.map