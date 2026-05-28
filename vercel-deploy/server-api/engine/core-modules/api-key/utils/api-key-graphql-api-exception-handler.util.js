"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "apiKeyGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return apiKeyGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _apikeyexception = require("../exceptions/api-key.exception");
const _graphqlerrorsutil = require("../../graphql/utils/graphql-errors.util");
const apiKeyGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _apikeyexception.ApiKeyException) {
        switch(error.code){
            case _apikeyexception.ApiKeyExceptionCode.API_KEY_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error.message);
            case _apikeyexception.ApiKeyExceptionCode.API_KEY_REVOKED:
                throw new _graphqlerrorsutil.ForbiddenError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            case _apikeyexception.ApiKeyExceptionCode.API_KEY_EXPIRED:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            case _apikeyexception.ApiKeyExceptionCode.API_KEY_NO_ROLE_ASSIGNED:
                throw new _graphqlerrorsutil.ForbiddenError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            case _apikeyexception.ApiKeyExceptionCode.ROLE_CANNOT_BE_ASSIGNED_TO_API_KEYS:
                throw new _graphqlerrorsutil.UserInputError(error.message, {
                    userFriendlyMessage: error.userFriendlyMessage
                });
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=api-key-graphql-api-exception-handler.util.js.map