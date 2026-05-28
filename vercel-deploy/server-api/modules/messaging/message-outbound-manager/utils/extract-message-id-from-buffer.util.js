// Extracts the RFC 2822 Message-ID header from a raw email buffer.
// Handles folded headers (continuation lines starting with whitespace).
// MailComposer always generates this header; if missing, falls back to empty string.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractMessageIdFromBuffer", {
    enumerable: true,
    get: function() {
        return extractMessageIdFromBuffer;
    }
});
const extractMessageIdFromBuffer = (messageBuffer)=>{
    const headerSection = messageBuffer.toString('utf-8').split('\r\n\r\n')[0];
    if (!headerSection) {
        return '';
    }
    // Unfold continuation lines (RFC 2822: lines starting with whitespace are continuations)
    const unfolded = headerSection.replace(/\r\n([ \t])/g, '$1');
    const match = unfolded.match(/^Message-ID:\s*(.+)$/im);
    return match?.[1]?.trim() ?? '';
};

//# sourceMappingURL=extract-message-id-from-buffer.util.js.map