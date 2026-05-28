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
    get WorkflowVersionEdgeException () {
        return WorkflowVersionEdgeException;
    },
    get WorkflowVersionEdgeExceptionCode () {
        return WorkflowVersionEdgeExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var WorkflowVersionEdgeExceptionCode = /*#__PURE__*/ function(WorkflowVersionEdgeExceptionCode) {
    WorkflowVersionEdgeExceptionCode["NOT_FOUND"] = "NOT_FOUND";
    WorkflowVersionEdgeExceptionCode["INVALID_REQUEST"] = "INVALID_REQUEST";
    return WorkflowVersionEdgeExceptionCode;
}({});
const getWorkflowVersionEdgeExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "NOT_FOUND":
            return /*i18n*/ {
                id: "KSK8fH",
                message: "Workflow edge not found."
            };
        case "INVALID_REQUEST":
            return /*i18n*/ {
                id: "bznmUY",
                message: "Invalid workflow edge request."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkflowVersionEdgeException = class WorkflowVersionEdgeException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkflowVersionEdgeExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workflow-version-edge.exception.js.map