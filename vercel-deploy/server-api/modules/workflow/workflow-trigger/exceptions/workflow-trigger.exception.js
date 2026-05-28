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
    get WorkflowTriggerException () {
        return WorkflowTriggerException;
    },
    get WorkflowTriggerExceptionCode () {
        return WorkflowTriggerExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../../../engine/api/common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../../utils/custom-exception");
var WorkflowTriggerExceptionCode = /*#__PURE__*/ function(WorkflowTriggerExceptionCode) {
    WorkflowTriggerExceptionCode["INVALID_INPUT"] = "INVALID_INPUT";
    WorkflowTriggerExceptionCode["INVALID_WORKFLOW_TRIGGER"] = "INVALID_WORKFLOW_TRIGGER";
    WorkflowTriggerExceptionCode["INVALID_WORKFLOW_VERSION"] = "INVALID_WORKFLOW_VERSION";
    WorkflowTriggerExceptionCode["INVALID_WORKFLOW_STATUS"] = "INVALID_WORKFLOW_STATUS";
    WorkflowTriggerExceptionCode["INVALID_ACTION_TYPE"] = "INVALID_ACTION_TYPE";
    WorkflowTriggerExceptionCode["NOT_FOUND"] = "NOT_FOUND";
    WorkflowTriggerExceptionCode["FORBIDDEN"] = "FORBIDDEN";
    WorkflowTriggerExceptionCode["INTERNAL_ERROR"] = "INTERNAL_ERROR";
    return WorkflowTriggerExceptionCode;
}({});
const getWorkflowTriggerExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "INVALID_INPUT":
            return /*i18n*/ {
                id: "rEIcf+",
                message: "Invalid workflow trigger input."
            };
        case "INVALID_WORKFLOW_TRIGGER":
            return /*i18n*/ {
                id: "dw+g0N",
                message: "Invalid workflow trigger configuration."
            };
        case "INVALID_WORKFLOW_VERSION":
            return /*i18n*/ {
                id: "8Dzcmh",
                message: "Invalid workflow version."
            };
        case "INVALID_WORKFLOW_STATUS":
            return /*i18n*/ {
                id: "dIxBwv",
                message: "Invalid workflow status."
            };
        case "INVALID_ACTION_TYPE":
            return /*i18n*/ {
                id: "pSjWxS",
                message: "Invalid action type."
            };
        case "NOT_FOUND":
            return /*i18n*/ {
                id: "R67jts",
                message: "Workflow not found."
            };
        case "FORBIDDEN":
            return /*i18n*/ {
                id: "nPwrik",
                message: "You do not have permission to access this workflow."
            };
        case "INTERNAL_ERROR":
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkflowTriggerException = class WorkflowTriggerException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkflowTriggerExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workflow-trigger.exception.js.map