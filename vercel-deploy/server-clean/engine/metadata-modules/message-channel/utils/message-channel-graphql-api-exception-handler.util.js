"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "messageChannelGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return messageChannelGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _connectedaccountexception = require("../../connected-account/connected-account.exception");
const _messagechannelexception = require("../message-channel.exception");
const messageChannelGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _messagechannelexception.MessageChannelException) {
        switch(error.code){
            case _messagechannelexception.MessageChannelExceptionCode.MESSAGE_CHANNEL_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case _messagechannelexception.MessageChannelExceptionCode.INVALID_MESSAGE_CHANNEL_INPUT:
                throw new _graphqlerrorsutil.UserInputError(error);
            case _messagechannelexception.MessageChannelExceptionCode.MESSAGE_CHANNEL_OWNERSHIP_VIOLATION:
                throw new _graphqlerrorsutil.ForbiddenError(error);
            case _messagechannelexception.MessageChannelExceptionCode.EMAIL_GROUP_NOT_CONFIGURED:
                throw new _graphqlerrorsutil.InternalServerError(error);
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    if (error instanceof _connectedaccountexception.ConnectedAccountException) {
        switch(error.code){
            case _connectedaccountexception.ConnectedAccountExceptionCode.CONNECTED_ACCOUNT_OWNERSHIP_VIOLATION:
            case _connectedaccountexception.ConnectedAccountExceptionCode.CONNECTED_ACCOUNT_NOT_FOUND:
                throw new _graphqlerrorsutil.ForbiddenError(error);
            default:
                break;
        }
    }
    throw error;
};

//# sourceMappingURL=message-channel-graphql-api-exception-handler.util.js.map