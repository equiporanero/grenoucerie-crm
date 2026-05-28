"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createSyncCursor", {
    enumerable: true,
    get: function() {
        return createSyncCursor;
    }
});
const createSyncCursor = (messageUids, previousCursor, mailboxState)=>{
    const { uidValidity, highestModSeq } = mailboxState;
    const lastSeenUid = previousCursor?.highestUid ?? 0;
    let highestUid = lastSeenUid;
    for(let i = 0; i < messageUids.length; i++){
        if (messageUids[i] > highestUid) {
            highestUid = messageUids[i];
        }
    }
    return {
        highestUid,
        uidValidity,
        ...highestModSeq ? {
            modSeq: highestModSeq.toString()
        } : {}
    };
};

//# sourceMappingURL=create-sync-cursor.util.js.map