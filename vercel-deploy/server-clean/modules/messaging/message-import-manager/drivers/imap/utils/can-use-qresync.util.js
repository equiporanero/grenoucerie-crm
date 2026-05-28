"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "canUseQresync", {
    enumerable: true,
    get: function() {
        return canUseQresync;
    }
});
const canUseQresync = (client, previousCursor, mailboxState)=>{
    const supportsQresync = client.capabilities.has('QRESYNC');
    const hasModSeq = previousCursor?.modSeq !== undefined;
    const hasServerModSeq = mailboxState.highestModSeq !== undefined;
    const uidValidityMatches = (previousCursor?.uidValidity ?? 0) === mailboxState.uidValidity || previousCursor?.uidValidity === 0;
    return supportsQresync && hasModSeq && hasServerModSeq && uidValidityMatches;
};

//# sourceMappingURL=can-use-qresync.util.js.map