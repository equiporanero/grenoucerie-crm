"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return authGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _authexception = require("../auth.exception");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const authGraphqlApiExceptionHandler = (exception)=>{
    switch(exception.code){
        case _authexception.AuthExceptionCode.CLIENT_NOT_FOUND:
            throw new _graphqlerrorsutil.NotFoundError(exception);
        case _authexception.AuthExceptionCode.INVALID_INPUT:
            throw new _graphqlerrorsutil.UserInputError(exception);
        case _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION:
        case _authexception.AuthExceptionCode.INSUFFICIENT_SCOPES:
        case _authexception.AuthExceptionCode.OAUTH_ACCESS_DENIED:
        case _authexception.AuthExceptionCode.SSO_AUTH_FAILED:
        case _authexception.AuthExceptionCode.USE_SSO_AUTH:
        case _authexception.AuthExceptionCode.SIGNUP_DISABLED:
        case _authexception.AuthExceptionCode.MISSING_ENVIRONMENT_VARIABLE:
        case _authexception.AuthExceptionCode.INVALID_JWT_TOKEN_TYPE:
        case _authexception.AuthExceptionCode.USER_ALREADY_EXISTS:
        case _authexception.AuthExceptionCode.ENTERPRISE_VALIDITY_TOKEN_NOT_VALID:
            throw new _graphqlerrorsutil.ForbiddenError(exception);
        case _authexception.AuthExceptionCode.GOOGLE_API_AUTH_DISABLED:
        case _authexception.AuthExceptionCode.MICROSOFT_API_AUTH_DISABLED:
            throw new _graphqlerrorsutil.ForbiddenError(exception.message, {
                userFriendlyMessage: /*i18n*/ {
                    id: "LB4qX/",
                    message: "Authentication is not enabled with this provider."
                },
                subCode: exception.code
            });
        case _authexception.AuthExceptionCode.EMAIL_NOT_VERIFIED:
        case _authexception.AuthExceptionCode.INVALID_DATA:
            throw new _graphqlerrorsutil.ForbiddenError(exception.message, {
                subCode: _authexception.AuthExceptionCode.EMAIL_NOT_VERIFIED,
                userFriendlyMessage: /*i18n*/ {
                    id: "xw6iqb",
                    message: "Email is not verified."
                }
            });
        case _authexception.AuthExceptionCode.TWO_FACTOR_AUTHENTICATION_PROVISION_REQUIRED:
        case _authexception.AuthExceptionCode.TWO_FACTOR_AUTHENTICATION_VERIFICATION_REQUIRED:
            throw new _graphqlerrorsutil.ForbiddenError(exception.message, {
                subCode: exception.code
            });
        case _authexception.AuthExceptionCode.UNAUTHENTICATED:
        case _authexception.AuthExceptionCode.APPLICATION_REFRESH_TOKEN_INVALID_OR_EXPIRED:
            throw new _graphqlerrorsutil.AuthenticationError(exception.message, {
                userFriendlyMessage: /*i18n*/ {
                    id: "z+7x/s",
                    message: "You must be authenticated to perform this action."
                },
                subCode: exception.code
            });
        case _authexception.AuthExceptionCode.USER_NOT_FOUND:
        case _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND:
        case _authexception.AuthExceptionCode.APPLICATION_NOT_FOUND:
        case _authexception.AuthExceptionCode.USER_WORKSPACE_NOT_FOUND:
            throw new _graphqlerrorsutil.AuthenticationError(exception);
        case _authexception.AuthExceptionCode.INTERNAL_SERVER_ERROR:
            throw exception;
        default:
            {
                (0, _utils.assertUnreachable)(exception.code);
            }
    }
};

//# sourceMappingURL=auth-graphql-api-exception-handler.util.js.map