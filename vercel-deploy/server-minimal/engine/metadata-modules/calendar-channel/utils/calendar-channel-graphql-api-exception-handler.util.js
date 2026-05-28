"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "calendarChannelGraphqlApiExceptionHandler", {
    enumerable: true,
    get: function() {
        return calendarChannelGraphqlApiExceptionHandler;
    }
});
const _utils = require("twenty-shared/utils");
const _graphqlerrorsutil = require("../../../core-modules/graphql/utils/graphql-errors.util");
const _calendarchannelexception = require("../calendar-channel.exception");
const _connectedaccountexception = require("../../connected-account/connected-account.exception");
const calendarChannelGraphqlApiExceptionHandler = (error)=>{
    if (error instanceof _calendarchannelexception.CalendarChannelException) {
        switch(error.code){
            case _calendarchannelexception.CalendarChannelExceptionCode.CALENDAR_CHANNEL_NOT_FOUND:
                throw new _graphqlerrorsutil.NotFoundError(error);
            case _calendarchannelexception.CalendarChannelExceptionCode.INVALID_CALENDAR_CHANNEL_INPUT:
                throw new _graphqlerrorsutil.UserInputError(error);
            case _calendarchannelexception.CalendarChannelExceptionCode.CALENDAR_CHANNEL_OWNERSHIP_VIOLATION:
                throw new _graphqlerrorsutil.ForbiddenError(error);
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

//# sourceMappingURL=calendar-channel-graphql-api-exception-handler.util.js.map