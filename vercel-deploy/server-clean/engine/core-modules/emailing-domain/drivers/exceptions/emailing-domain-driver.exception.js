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
    get EmailingDomainDriverException () {
        return EmailingDomainDriverException;
    },
    get EmailingDomainDriverExceptionCode () {
        return EmailingDomainDriverExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../../../api/common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../../../utils/custom-exception");
var EmailingDomainDriverExceptionCode = /*#__PURE__*/ function(EmailingDomainDriverExceptionCode) {
    EmailingDomainDriverExceptionCode["NOT_FOUND"] = "NOT_FOUND";
    EmailingDomainDriverExceptionCode["TEMPORARY_ERROR"] = "TEMPORARY_ERROR";
    EmailingDomainDriverExceptionCode["INSUFFICIENT_PERMISSIONS"] = "INSUFFICIENT_PERMISSIONS";
    EmailingDomainDriverExceptionCode["CONFIGURATION_ERROR"] = "CONFIGURATION_ERROR";
    EmailingDomainDriverExceptionCode["SENDING_SUSPENDED"] = "SENDING_SUSPENDED";
    EmailingDomainDriverExceptionCode["UNKNOWN"] = "UNKNOWN";
    return EmailingDomainDriverExceptionCode;
}({});
const getEmailingDomainDriverExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "NOT_FOUND":
            return /*i18n*/ {
                id: "Ik1o4d",
                message: "Email domain not found."
            };
        case "INSUFFICIENT_PERMISSIONS":
            return /*i18n*/ {
                id: "9sx+WQ",
                message: "Insufficient permissions for email domain."
            };
        case "CONFIGURATION_ERROR":
            return /*i18n*/ {
                id: "MYgdAv",
                message: "Email domain configuration error."
            };
        case "SENDING_SUSPENDED":
            return /*i18n*/ {
                id: "CTcVpP",
                message: "Sending is currently suspended for this email domain."
            };
        case "TEMPORARY_ERROR":
        case "UNKNOWN":
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let EmailingDomainDriverException = class EmailingDomainDriverException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getEmailingDomainDriverExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=emailing-domain-driver.exception.js.map