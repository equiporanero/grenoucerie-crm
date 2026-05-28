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
    get WorkflowQueryValidationException () {
        return WorkflowQueryValidationException;
    },
    get WorkflowQueryValidationExceptionCode () {
        return WorkflowQueryValidationExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var WorkflowQueryValidationExceptionCode = /*#__PURE__*/ function(WorkflowQueryValidationExceptionCode) {
    WorkflowQueryValidationExceptionCode["FORBIDDEN"] = "FORBIDDEN";
    return WorkflowQueryValidationExceptionCode;
}({});
const getWorkflowQueryValidationExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "FORBIDDEN":
            return /*i18n*/ {
                id: "C9jd/U",
                message: "You do not have permission to perform this workflow action."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkflowQueryValidationException = class WorkflowQueryValidationException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkflowQueryValidationExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workflow-query-validation.exception.js.map