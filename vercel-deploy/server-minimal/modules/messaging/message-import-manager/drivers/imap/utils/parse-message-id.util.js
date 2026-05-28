"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseMessageId", {
    enumerable: true,
    get: function() {
        return parseMessageId;
    }
});
const MESSAGE_ID_REGEX = /^(.+):(\d+)$/;
function parseMessageId(messageId) {
    const match = MESSAGE_ID_REGEX.exec(messageId);
    if (!match) {
        return null;
    }
    const [, folder, uidStr] = match;
    const uid = Number(uidStr);
    if (!Number.isInteger(uid)) {
        return null;
    }
    return {
        folder,
        uid
    };
}

//# sourceMappingURL=parse-message-id.util.js.map