"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "extractMailboxState", {
    enumerable: true,
    get: function() {
        return extractMailboxState;
    }
});
const extractMailboxState = (mailbox)=>{
    if (typeof mailbox === 'boolean') {
        throw new Error('Invalid mailbox state');
    }
    const uidNext = Number(mailbox.uidNext ?? 1);
    return {
        uidValidity: Number(mailbox.uidValidity ?? 0),
        uidNext,
        maxUid: Math.max(0, uidNext - 1),
        highestModSeq: mailbox.highestModseq
    };
};

//# sourceMappingURL=extract-mailbox-state.util.js.map