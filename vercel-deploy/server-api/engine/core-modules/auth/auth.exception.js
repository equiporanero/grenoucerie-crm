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
    get AuthException () {
        return AuthException;
    },
    get AuthExceptionCode () {
        return AuthExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _standarderrormessageconstant = require("../../api/common/common-query-runners/errors/standard-error-message.constant");
const _customexception = require("../../../utils/custom-exception");
const AuthExceptionCode = (0, _customexception.appendCommonExceptionCode)({
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    USER_WORKSPACE_NOT_FOUND: 'USER_WORKSPACE_NOT_FOUND',
    EMAIL_NOT_VERIFIED: 'EMAIL_NOT_VERIFIED',
    CLIENT_NOT_FOUND: 'CLIENT_NOT_FOUND',
    WORKSPACE_NOT_FOUND: 'WORKSPACE_NOT_FOUND',
    APPLICATION_NOT_FOUND: 'APPLICATION_NOT_FOUND',
    INVALID_INPUT: 'INVALID_INPUT',
    FORBIDDEN_EXCEPTION: 'FORBIDDEN_EXCEPTION',
    INSUFFICIENT_SCOPES: 'INSUFFICIENT_SCOPES',
    UNAUTHENTICATED: 'UNAUTHENTICATED',
    APPLICATION_REFRESH_TOKEN_INVALID_OR_EXPIRED: 'APPLICATION_REFRESH_TOKEN_INVALID_OR_EXPIRED',
    INVALID_DATA: 'INVALID_DATA',
    OAUTH_ACCESS_DENIED: 'OAUTH_ACCESS_DENIED',
    SSO_AUTH_FAILED: 'SSO_AUTH_FAILED',
    USE_SSO_AUTH: 'USE_SSO_AUTH',
    SIGNUP_DISABLED: 'SIGNUP_DISABLED',
    GOOGLE_API_AUTH_DISABLED: 'GOOGLE_API_AUTH_DISABLED',
    MICROSOFT_API_AUTH_DISABLED: 'MICROSOFT_API_AUTH_DISABLED',
    MISSING_ENVIRONMENT_VARIABLE: 'MISSING_ENVIRONMENT_VARIABLE',
    ENTERPRISE_VALIDITY_TOKEN_NOT_VALID: 'ENTERPRISE_VALIDITY_TOKEN_NOT_VALID',
    INVALID_JWT_TOKEN_TYPE: 'INVALID_JWT_TOKEN_TYPE',
    TWO_FACTOR_AUTHENTICATION_PROVISION_REQUIRED: 'TWO_FACTOR_AUTHENTICATION_PROVISION_REQUIRED',
    TWO_FACTOR_AUTHENTICATION_VERIFICATION_REQUIRED: 'TWO_FACTOR_AUTHENTICATION_VERIFICATION_REQUIRED',
    USER_ALREADY_EXISTS: 'USER_ALREADY_EXISTS'
});
const getAuthExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case AuthExceptionCode.USER_NOT_FOUND:
            return /*i18n*/ {
                id: "siJgSI",
                message: "User not found."
            };
        case AuthExceptionCode.USER_WORKSPACE_NOT_FOUND:
            return /*i18n*/ {
                id: "lUEEso",
                message: "User workspace not found."
            };
        case AuthExceptionCode.EMAIL_NOT_VERIFIED:
            return /*i18n*/ {
                id: "xw6iqb",
                message: "Email is not verified."
            };
        case AuthExceptionCode.WORKSPACE_NOT_FOUND:
            return /*i18n*/ {
                id: "EhVOPs",
                message: "Workspace not found."
            };
        case AuthExceptionCode.APPLICATION_NOT_FOUND:
            return /*i18n*/ {
                id: "ltvmAF",
                message: "Application not found."
            };
        case AuthExceptionCode.INVALID_INPUT:
            return /*i18n*/ {
                id: "t7SpQO",
                message: "Invalid input provided."
            };
        case AuthExceptionCode.FORBIDDEN_EXCEPTION:
            return /*i18n*/ {
                id: "q5OVn+",
                message: "You do not have permission to perform this action."
            };
        case AuthExceptionCode.INSUFFICIENT_SCOPES:
            return /*i18n*/ {
                id: "J1UlII",
                message: "Insufficient permissions."
            };
        case AuthExceptionCode.UNAUTHENTICATED:
        case AuthExceptionCode.APPLICATION_REFRESH_TOKEN_INVALID_OR_EXPIRED:
            return /*i18n*/ {
                id: "z+7x/s",
                message: "You must be authenticated to perform this action."
            };
        case AuthExceptionCode.OAUTH_ACCESS_DENIED:
            return /*i18n*/ {
                id: "08qKzD",
                message: "OAuth access was denied."
            };
        case AuthExceptionCode.SSO_AUTH_FAILED:
            return /*i18n*/ {
                id: "4AomZC",
                message: "Single sign-on authentication failed."
            };
        case AuthExceptionCode.USE_SSO_AUTH:
            return /*i18n*/ {
                id: "f8ypJ4",
                message: "Please use single sign-on to authenticate."
            };
        case AuthExceptionCode.SIGNUP_DISABLED:
            return /*i18n*/ {
                id: "e1k+No",
                message: "Sign up is disabled."
            };
        case AuthExceptionCode.GOOGLE_API_AUTH_DISABLED:
            return /*i18n*/ {
                id: "cvJ2e6",
                message: "Google API authentication is disabled."
            };
        case AuthExceptionCode.MICROSOFT_API_AUTH_DISABLED:
            return /*i18n*/ {
                id: "WFVrzW",
                message: "Microsoft API authentication is disabled."
            };
        case AuthExceptionCode.MISSING_ENVIRONMENT_VARIABLE:
            return /*i18n*/ {
                id: "bx1He3",
                message: "A required configuration is missing."
            };
        case AuthExceptionCode.TWO_FACTOR_AUTHENTICATION_PROVISION_REQUIRED:
            return /*i18n*/ {
                id: "7Z7wx7",
                message: "Two-factor authentication setup is required."
            };
        case AuthExceptionCode.TWO_FACTOR_AUTHENTICATION_VERIFICATION_REQUIRED:
            return /*i18n*/ {
                id: "VT9cmj",
                message: "Two-factor authentication verification is required."
            };
        case AuthExceptionCode.USER_ALREADY_EXISTS:
            return /*i18n*/ {
                id: "WBtp3/",
                message: "A user with this email already exists."
            };
        case AuthExceptionCode.ENTERPRISE_VALIDITY_TOKEN_NOT_VALID:
            return /*i18n*/ {
                id: "ArAFBo",
                message: "Enterprise validity token is not valid."
            };
        case AuthExceptionCode.INTERNAL_SERVER_ERROR:
        case AuthExceptionCode.INVALID_DATA:
        case AuthExceptionCode.CLIENT_NOT_FOUND:
        case AuthExceptionCode.INVALID_JWT_TOKEN_TYPE:
            return _standarderrormessageconstant.STANDARD_ERROR_MESSAGE;
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let AuthException = class AuthException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getAuthExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=auth.exception.js.map