"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isMessageSenderMatchingHandles", {
    enumerable: true,
    get: function() {
        return isMessageSenderMatchingHandles;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const isMessageSenderMatchingHandles = (message, userHandles)=>{
    const fromParticipant = message.participants?.find((participant)=>participant.role === _types.MessageParticipantRole.FROM);
    if (!(0, _utils.isDefined)(fromParticipant?.handle)) {
        return false;
    }
    const normalizedUserHandles = userHandles.map((handle)=>handle.toLowerCase());
    return normalizedUserHandles.includes(fromParticipant.handle.toLowerCase());
};

//# sourceMappingURL=is-message-sender-matching-handles.util.js.map