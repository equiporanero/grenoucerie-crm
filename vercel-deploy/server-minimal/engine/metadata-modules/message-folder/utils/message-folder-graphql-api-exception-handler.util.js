"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "messageFolderGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return messageFolderGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _connectedaccountexception = require("../../connected-account/connected-account.exception");
const _messagechannelexception = require("../../message-channel/message-channel.exception");
const _messagefolderexception = require("../message-folder.exception");
const messageFolderGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _messagefolderexception.MessageFolderException) {
        switch(error.code){
            case _messagefolderexception.MessageFolderExceptionCode.MESSAGE_FOLDER_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case _messagefolderexception.MessageFolderExceptionCode.INVALID_MESSAGE_FOLDER_INPUT:
                throw new _graphqlerrorsutil.UserInputError(error);
            case _messagefolderexception.MessageFolderExceptionCode.MESSAGE_FOLDER_OWNERSHIP_VIOLATION:
                throw new _graphqlerrorsutil.ForbiddenError(error);
            default:
                {
                    return (0, _utils.assertUnreachable)(error.code);
                }
        }
    }
    if (error instanceof _messagechannelexception.MessageChannelException) {
        switch(error.code){
            case _messagechannelexception.MessageChannelExceptionCode.MESSAGE_CHANNEL_OWNERSHIP_VIOLATION:
            case _messagechannelexception.MessageChannelExceptionCode.MESSAGE_CHANNEL_NOT_FOUND:
                throw new _graphqlerrorsutil.ForbiddenError(error);
            default:
                break;
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

//# sourceMappingURL=message-folder-graphql-api-exception-handler.util.js.map