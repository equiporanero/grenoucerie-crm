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
    get EmailToolException () {
        return EmailToolException;
    },
    get EmailToolExceptionCode () {
        return EmailToolExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../../../../utils/custom-exception");
var EmailToolExceptionCode = /*#__PURE__*/ function(EmailToolExceptionCode) {
    EmailToolExceptionCode["INVALID_CONNECTED_ACCOUNT_ID"] = "INVALID_CONNECTED_ACCOUNT_ID";
    EmailToolExceptionCode["CONNECTED_ACCOUNT_NOT_FOUND"] = "CONNECTED_ACCOUNT_NOT_FOUND";
    EmailToolExceptionCode["INVALID_EMAIL"] = "INVALID_EMAIL";
    EmailToolExceptionCode["WORKSPACE_ID_NOT_FOUND"] = "WORKSPACE_ID_NOT_FOUND";
    EmailToolExceptionCode["FILE_NOT_FOUND"] = "FILE_NOT_FOUND";
    EmailToolExceptionCode["INVALID_FILE_ID"] = "INVALID_FILE_ID";
    EmailToolExceptionCode["TOO_MANY_RECIPIENTS"] = "TOO_MANY_RECIPIENTS";
    return EmailToolExceptionCode;
}({});
const getEmailToolExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "INVALID_CONNECTED_ACCOUNT_ID":
            return /*i18n*/ {
                id: "jUt31O",
                message: "Invalid connected account ID."
            };
        case "CONNECTED_ACCOUNT_NOT_FOUND":
            return /*i18n*/ {
                id: "/OJTzk",
                message: "Connected account not found."
            };
        case "INVALID_EMAIL":
            return /*i18n*/ {
                id: "9lqqpY",
                message: "Invalid email address."
            };
        case "WORKSPACE_ID_NOT_FOUND":
            return /*i18n*/ {
                id: "EhVOPs",
                message: "Workspace not found."
            };
        case "FILE_NOT_FOUND":
            return /*i18n*/ {
                id: "weWV3g",
                message: "File not found."
            };
        case "INVALID_FILE_ID":
            return /*i18n*/ {
                id: "d6DMa/",
                message: "Invalid file ID."
            };
        case "TOO_MANY_RECIPIENTS":
            return /*i18n*/ {
                id: "qSInGy",
                message: "Too many recipients."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let EmailToolException = class EmailToolException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getEmailToolExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=email-tool.exception.js.map