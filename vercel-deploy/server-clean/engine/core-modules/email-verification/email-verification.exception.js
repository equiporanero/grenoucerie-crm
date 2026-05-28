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
    get EmailVerificationException () {
        return EmailVerificationException;
    },
    get EmailVerificationExceptionCode () {
        return EmailVerificationExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var EmailVerificationExceptionCode = /*#__PURE__*/ function(EmailVerificationExceptionCode) {
    EmailVerificationExceptionCode["EMAIL_VERIFICATION_NOT_REQUIRED"] = "EMAIL_VERIFICATION_NOT_REQUIRED";
    EmailVerificationExceptionCode["INVALID_TOKEN"] = "INVALID_TOKEN";
    EmailVerificationExceptionCode["INVALID_APP_TOKEN_TYPE"] = "INVALID_APP_TOKEN_TYPE";
    EmailVerificationExceptionCode["TOKEN_EXPIRED"] = "TOKEN_EXPIRED";
    EmailVerificationExceptionCode["EMAIL_MISSING"] = "EMAIL_MISSING";
    EmailVerificationExceptionCode["EMAIL_ALREADY_VERIFIED"] = "EMAIL_ALREADY_VERIFIED";
    EmailVerificationExceptionCode["INVALID_EMAIL"] = "INVALID_EMAIL";
    EmailVerificationExceptionCode["RATE_LIMIT_EXCEEDED"] = "RATE_LIMIT_EXCEEDED";
    return EmailVerificationExceptionCode;
}({});
const getEmailVerificationExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "EMAIL_VERIFICATION_NOT_REQUIRED":
            return /*i18n*/ {
                id: "PeMFTI",
                message: "Email verification is not required."
            };
        case "INVALID_TOKEN":
        case "INVALID_APP_TOKEN_TYPE":
        case "TOKEN_EXPIRED":
            return /*i18n*/ {
                id: "gH+wBS",
                message: "There is an issue with your token. Please try again."
            };
        case "EMAIL_MISSING":
            return /*i18n*/ {
                id: "Qof3ks",
                message: "Email is required."
            };
        case "EMAIL_ALREADY_VERIFIED":
            return /*i18n*/ {
                id: "m9fD11",
                message: "Email is already verified."
            };
        case "INVALID_EMAIL":
            return /*i18n*/ {
                id: "9lqqpY",
                message: "Invalid email address."
            };
        case "RATE_LIMIT_EXCEEDED":
            return /*i18n*/ {
                id: "M68C8m",
                message: "Too many requests. Please try again later."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let EmailVerificationException = class EmailVerificationException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getEmailVerificationExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=email-verification.exception.js.map