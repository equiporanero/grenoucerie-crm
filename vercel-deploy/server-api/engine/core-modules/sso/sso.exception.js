/* @license Enterprise */ "use strict";
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
    get SSOException () {
        return SSOException;
    },
    get SSOExceptionCode () {
        return SSOExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var SSOExceptionCode = /*#__PURE__*/ function(SSOExceptionCode) {
    SSOExceptionCode["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    SSOExceptionCode["IDENTITY_PROVIDER_NOT_FOUND"] = "IDENTITY_PROVIDER_NOT_FOUND";
    SSOExceptionCode["INVALID_ISSUER_URL"] = "INVALID_ISSUER_URL";
    SSOExceptionCode["INVALID_IDP_TYPE"] = "INVALID_IDP_TYPE";
    SSOExceptionCode["UNKNOWN_SSO_CONFIGURATION_ERROR"] = "UNKNOWN_SSO_CONFIGURATION_ERROR";
    SSOExceptionCode["SSO_DISABLE"] = "SSO_DISABLE";
    return SSOExceptionCode;
}({});
const getSSOExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "USER_NOT_FOUND":
            return /*i18n*/ {
                id: "siJgSI",
                message: "User not found."
            };
        case "IDENTITY_PROVIDER_NOT_FOUND":
            return /*i18n*/ {
                id: "6cVc+b",
                message: "Identity provider not found."
            };
        case "INVALID_ISSUER_URL":
            return /*i18n*/ {
                id: "4MWDA2",
                message: "Invalid issuer URL."
            };
        case "INVALID_IDP_TYPE":
            return /*i18n*/ {
                id: "6WLJFQ",
                message: "Invalid identity provider type."
            };
        case "UNKNOWN_SSO_CONFIGURATION_ERROR":
            return /*i18n*/ {
                id: "IP+RN5",
                message: "SSO configuration error."
            };
        case "SSO_DISABLE":
            return /*i18n*/ {
                id: "NflMcG",
                message: "SSO is disabled."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let SSOException = class SSOException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getSSOExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=sso.exception.js.map