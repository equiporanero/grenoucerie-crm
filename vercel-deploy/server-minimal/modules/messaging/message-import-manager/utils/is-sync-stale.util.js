"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isSyncStale", {
    enumerable: true,
    get: function() {
        return isSyncStale;
    }
});
const _utils = require("twenty-shared/utils");
const _messagingimportongoingsynctimeoutconstant = require("../constants/messaging-import-ongoing-sync-timeout.constant");
const isSyncStale = (syncStageStartedAt)=>{
    if (!(0, _utils.isDefined)(syncStageStartedAt)) {
        return true;
    }
    const syncStageStartedTime = new Date(syncStageStartedAt).getTime();
    if (isNaN(syncStageStartedTime)) {
        throw new Error('Invalid date format');
    }
    return Date.now() - syncStageStartedTime > _messagingimportongoingsynctimeoutconstant.MESSAGING_IMPORT_ONGOING_SYNC_TIMEOUT;
};

//# sourceMappingURL=is-sync-stale.util.js.map