"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAuthExceptionRestStatus", {
    enumerable: true,
    get: function() {
        return getAuthExceptionRestStatus;
    }
});
const _utils = require("twenty-shared/utils");
const _authexception = require("../auth.exception");
const getAuthExceptionRestStatus = (exception)=>{
    switch(exception.code){
        case _authexception.AuthExceptionCode.CLIENT_NOT_FOUND:
            return 404;
        case _authexception.AuthExceptionCode.INVALID_INPUT:
            return 400;
        case _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION:
        case _authexception.AuthExceptionCode.INSUFFICIENT_SCOPES:
        case _authexception.AuthExceptionCode.OAUTH_ACCESS_DENIED:
        case _authexception.AuthExceptionCode.SSO_AUTH_FAILED:
        case _authexception.AuthExceptionCode.USE_SSO_AUTH:
        case _authexception.AuthExceptionCode.SIGNUP_DISABLED:
        case _authexception.AuthExceptionCode.GOOGLE_API_AUTH_DISABLED:
        case _authexception.AuthExceptionCode.MICROSOFT_API_AUTH_DISABLED:
        case _authexception.AuthExceptionCode.MISSING_ENVIRONMENT_VARIABLE:
        case _authexception.AuthExceptionCode.EMAIL_NOT_VERIFIED:
        case _authexception.AuthExceptionCode.INVALID_JWT_TOKEN_TYPE:
        case _authexception.AuthExceptionCode.USER_ALREADY_EXISTS:
        case _authexception.AuthExceptionCode.ENTERPRISE_VALIDITY_TOKEN_NOT_VALID:
            return 403;
        case _authexception.AuthExceptionCode.TWO_FACTOR_AUTHENTICATION_PROVISION_REQUIRED:
        case _authexception.AuthExceptionCode.TWO_FACTOR_AUTHENTICATION_VERIFICATION_REQUIRED:
        case _authexception.AuthExceptionCode.INVALID_DATA:
        case _authexception.AuthExceptionCode.UNAUTHENTICATED:
        case _authexception.AuthExceptionCode.APPLICATION_REFRESH_TOKEN_INVALID_OR_EXPIRED:
        case _authexception.AuthExceptionCode.USER_NOT_FOUND:
        case _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND:
        case _authexception.AuthExceptionCode.APPLICATION_NOT_FOUND:
            return 401;
        case _authexception.AuthExceptionCode.INTERNAL_SERVER_ERROR:
        case _authexception.AuthExceptionCode.USER_WORKSPACE_NOT_FOUND:
            return 500;
        default:
            {
                (0, _utils.assertUnreachable)(exception.code);
            }
    }
};

//# sourceMappingURL=get-auth-exception-rest-status.util.js.map