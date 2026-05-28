"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseGmailErrorRetryAfter", {
    enumerable: true,
    get: function() {
        return parseGmailErrorRetryAfter;
    }
});
const RETRY_AFTER_REGEX = /Retry after (\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)/i;
const parseGmailErrorRetryAfter = (message)=>{
    const match = message.match(RETRY_AFTER_REGEX);
    if (!match) {
        return undefined;
    }
    const retryAfter = new Date(match[1]);
    if (isNaN(retryAfter.getTime())) {
        return undefined;
    }
    if (retryAfter <= new Date()) {
        return undefined;
    }
    return retryAfter;
};

//# sourceMappingURL=parse-gmail-error-retry-after.util.js.map