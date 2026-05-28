"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isInvalidSyncTokenResponse", {
    enumerable: true,
    get: function() {
        return isInvalidSyncTokenResponse;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const isInvalidSyncTokenResponse = (responses)=>{
    const DAVResponse = responses[0];
    if (!(0, _utils.isDefined)(DAVResponse) || DAVResponse.status !== 403) return false;
    const body = (0, _guards.isNonEmptyString)(DAVResponse.raw) ? DAVResponse.raw : JSON.stringify(DAVResponse.raw ?? {});
    return body.includes('valid-sync-token') || body.includes('validSyncToken');
};

//# sourceMappingURL=is-invalid-sync-token-response.util.js.map