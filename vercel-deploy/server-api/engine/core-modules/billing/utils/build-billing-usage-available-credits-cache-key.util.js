"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildBillingUsageAvailableCreditsCacheKey", {
    enumerable: true,
    get: function() {
        return buildBillingUsageAvailableCreditsCacheKey;
    }
});
const buildBillingUsageAvailableCreditsCacheKey = (workspaceId, periodStart)=>{
    return `available-credits:${workspaceId}:${new Date(periodStart).getTime()}`;
};

//# sourceMappingURL=build-billing-usage-available-credits-cache-key.util.js.map