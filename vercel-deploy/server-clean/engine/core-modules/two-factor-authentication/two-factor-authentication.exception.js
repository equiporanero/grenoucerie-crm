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
    get TwoFactorAuthenticationException () {
        return TwoFactorAuthenticationException;
    },
    get TwoFactorAuthenticationExceptionCode () {
        return TwoFactorAuthenticationExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var TwoFactorAuthenticationExceptionCode = /*#__PURE__*/ function(TwoFactorAuthenticationExceptionCode) {
    TwoFactorAuthenticationExceptionCode["INVALID_CONFIGURATION"] = "INVALID_CONFIGURATION";
    TwoFactorAuthenticationExceptionCode["TWO_FACTOR_AUTHENTICATION_METHOD_NOT_FOUND"] = "TWO_FACTOR_AUTHENTICATION_METHOD_NOT_FOUND";
    TwoFactorAuthenticationExceptionCode["INVALID_OTP"] = "INVALID_OTP";
    TwoFactorAuthenticationExceptionCode["TWO_FACTOR_AUTHENTICATION_METHOD_ALREADY_PROVISIONED"] = "TWO_FACTOR_AUTHENTICATION_METHOD_ALREADY_PROVISIONED";
    TwoFactorAuthenticationExceptionCode["MALFORMED_DATABASE_OBJECT"] = "MALFORMED_DATABASE_OBJECT";
    return TwoFactorAuthenticationExceptionCode;
}({});
const getTwoFactorAuthenticationExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "INVALID_CONFIGURATION":
            return /*i18n*/ {
                id: "spfaiG",
                message: "Invalid two-factor authentication configuration."
            };
        case "TWO_FACTOR_AUTHENTICATION_METHOD_NOT_FOUND":
            return /*i18n*/ {
                id: "lNKrNc",
                message: "Two-factor authentication method not found."
            };
        case "INVALID_OTP":
            return /*i18n*/ {
                id: "I4caYo",
                message: "Invalid verification code."
            };
        case "TWO_FACTOR_AUTHENTICATION_METHOD_ALREADY_PROVISIONED":
            return /*i18n*/ {
                id: "T+yZIr",
                message: "Two-factor authentication is already set up."
            };
        case "MALFORMED_DATABASE_OBJECT":
            return /*i18n*/ {
                id: "S7yZl9",
                message: "An error occurred with two-factor authentication data."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let TwoFactorAuthenticationException = class TwoFactorAuthenticationException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getTwoFactorAuthenticationExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=two-factor-authentication.exception.js.map