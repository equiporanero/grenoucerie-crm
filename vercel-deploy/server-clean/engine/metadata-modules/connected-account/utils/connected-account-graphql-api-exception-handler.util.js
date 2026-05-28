"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "connectedAccountGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return connectedAccountGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _connectedaccountexception = require("../connected-account.exception");
const connectedAccountGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _connectedaccountexception.ConnectedAccountException) {
        switch(error.code){
            case _connectedaccountexception.ConnectedAccountExceptionCode.CONNECTED_ACCOUNT_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case _connectedaccountexception.ConnectedAccountExceptionCode.INVALID_CONNECTED_ACCOUNT_INPUT:
                throw new _graphqlerrorsutil.UserInputError(error);
            case _connectedaccountexception.ConnectedAccountExceptionCode.CONNECTED_ACCOUNT_OWNERSHIP_VIOLATION:
                throw new _graphqlerrorsutil.ForbiddenError(error);
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    throw error;
};

//# sourceMappingURL=connected-account-graphql-api-exception-handler.util.js.map