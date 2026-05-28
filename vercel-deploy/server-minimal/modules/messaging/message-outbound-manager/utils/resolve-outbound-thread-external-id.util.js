"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "resolveOutboundThreadExternalId", {
    enumerable: true,
    get: function() {
        return resolveOutboundThreadExternalId;
    }
});
const _guards = require("@sniptt/guards");
const resolveOutboundThreadExternalId = ({ sendResult, parentThreadExternalId, inReplyTo })=>{
    if ((0, _guards.isNonEmptyString)(sendResult.threadExternalId)) {
        return sendResult.threadExternalId;
    }
    // IMAP/SMTP: anchor on parent's thread id so replies stay in the original thread.
    if ((0, _guards.isNonEmptyString)(parentThreadExternalId)) {
        return parentThreadExternalId;
    }
    if ((0, _guards.isNonEmptyString)(inReplyTo)) {
        return inReplyTo;
    }
    // New IMAP/SMTP send: own Message-ID is unique per RFC822, so unrelated
    // sends never collide on a shared empty thread key.
    return sendResult.headerMessageId;
};

//# sourceMappingURL=resolve-outbound-thread-external-id.util.js.map