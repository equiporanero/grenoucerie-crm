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
    get WorkspaceCleanerException () {
        return WorkspaceCleanerException;
    },
    get WorkspaceCleanerExceptionCode () {
        return WorkspaceCleanerExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../utils/custom-exception");
var WorkspaceCleanerExceptionCode = /*#__PURE__*/ function(WorkspaceCleanerExceptionCode) {
    WorkspaceCleanerExceptionCode["BILLING_SUBSCRIPTION_NOT_FOUND"] = "BILLING_SUBSCRIPTION_NOT_FOUND";
    return WorkspaceCleanerExceptionCode;
}({});
const getWorkspaceCleanerExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "BILLING_SUBSCRIPTION_NOT_FOUND":
            return /*i18n*/ {
                id: "Je6GWV",
                message: "Billing subscription not found."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let WorkspaceCleanerException = class WorkspaceCleanerException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getWorkspaceCleanerExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=workspace-cleaner.exception.js.map