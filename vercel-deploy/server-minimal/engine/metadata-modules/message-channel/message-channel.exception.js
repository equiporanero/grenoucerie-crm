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
    get MessageChannelException () {
        return MessageChannelException;
    },
    get MessageChannelExceptionCode () {
        return MessageChannelExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var MessageChannelExceptionCode = /*#__PURE__*/ function(MessageChannelExceptionCode) {
    MessageChannelExceptionCode["MESSAGE_CHANNEL_NOT_FOUND"] = "MESSAGE_CHANNEL_NOT_FOUND";
    MessageChannelExceptionCode["INVALID_MESSAGE_CHANNEL_INPUT"] = "INVALID_MESSAGE_CHANNEL_INPUT";
    MessageChannelExceptionCode["MESSAGE_CHANNEL_OWNERSHIP_VIOLATION"] = "MESSAGE_CHANNEL_OWNERSHIP_VIOLATION";
    MessageChannelExceptionCode["EMAIL_GROUP_NOT_CONFIGURED"] = "EMAIL_GROUP_NOT_CONFIGURED";
    return MessageChannelExceptionCode;
}({});
const getMessageChannelExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "MESSAGE_CHANNEL_NOT_FOUND":
            return /*i18n*/ {
                id: "vjIbbe",
                message: "Message channel not found."
            };
        case "INVALID_MESSAGE_CHANNEL_INPUT":
            return /*i18n*/ {
                id: "fNaXqL",
                message: "Invalid message channel input."
            };
        case "MESSAGE_CHANNEL_OWNERSHIP_VIOLATION":
            return /*i18n*/ {
                id: "R5GUVK",
                message: "You do not have access to this message channel."
            };
        case "EMAIL_GROUP_NOT_CONFIGURED":
            return /*i18n*/ {
                id: "MhPwKU",
                message: "Email group is not configured on this server."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let MessageChannelException = class MessageChannelException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getMessageChannelExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=message-channel.exception.js.map