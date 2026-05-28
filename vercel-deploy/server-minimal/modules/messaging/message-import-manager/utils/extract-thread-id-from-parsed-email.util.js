"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractThreadIdFromParsedEmail", {
    enumerable: true,
    get: function() {
        return extractThreadIdFromParsedEmail;
    }
});
const extractThreadIdFromParsedEmail = (parsed)=>{
    const references = parsed.references;
    if (typeof references === 'string' && references.trim()) {
        const first = references.trim().split(/\s+/)[0];
        if (first) {
            return first;
        }
    }
    if (Array.isArray(references) && references.length > 0) {
        const first = String(references[0]).trim();
        if (first) {
            return first;
        }
    }
    if (parsed.inReplyTo) {
        const inReplyTo = String(parsed.inReplyTo).trim();
        if (inReplyTo) {
            return inReplyTo;
        }
    }
    if (parsed.messageId?.trim()) {
        return parsed.messageId.trim();
    }
    return `thread-${crypto.randomUUID()}`;
};

//# sourceMappingURL=extract-thread-id-from-parsed-email.util.js.map