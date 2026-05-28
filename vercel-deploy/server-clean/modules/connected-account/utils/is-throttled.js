"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isThrottled", {
    enumerable: true,
    get: function() {
        return isThrottled;
    }
});
const _utils = require("twenty-shared/utils");
const _messagingthrottleduration = require("../../messaging/message-import-manager/constants/messaging-throttle-duration");
const _isValidDate = require("../../../utils/date/isValidDate");
const isThrottled = (syncStageStartedAt, throttleFailureCount, throttleRetryAfter)=>{
    const now = new Date();
    const retryAfterCandidate = (0, _utils.isDefined)(throttleRetryAfter) ? new Date(throttleRetryAfter) : null;
    const retryAfterDate = (0, _isValidDate.isValidDate)(retryAfterCandidate) ? retryAfterCandidate : null;
    if ((0, _utils.isDefined)(retryAfterDate) && retryAfterDate > now) {
        return true;
    }
    if (!syncStageStartedAt) {
        return false;
    }
    if (throttleFailureCount === 0) {
        return false;
    }
    const exponentialBackoffUntil = computeThrottlePauseUntil(syncStageStartedAt, throttleFailureCount);
    return exponentialBackoffUntil > now;
};
const computeThrottlePauseUntil = (syncStageStartedAt, throttleFailureCount)=>{
    return new Date(new Date(syncStageStartedAt).getTime() + _messagingthrottleduration.MESSAGING_THROTTLE_DURATION * Math.pow(2, throttleFailureCount - 1));
};

//# sourceMappingURL=is-throttled.js.map