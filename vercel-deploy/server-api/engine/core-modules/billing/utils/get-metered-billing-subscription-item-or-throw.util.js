"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCurrentMeteredBillingSubscriptionItemOrThrow", {
    enumerable: true,
    get: function() {
        return getCurrentMeteredBillingSubscriptionItemOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _billingusagetypeenum = require("../enums/billing-usage-type.enum");
const getCurrentMeteredBillingSubscriptionItemOrThrow = (billingSubscription)=>{
    return (0, _utils.findOrThrow)(billingSubscription.billingSubscriptionItems, ({ billingProduct })=>billingProduct.metadata.priceUsageBased === _billingusagetypeenum.BillingUsageType.METERED);
};

//# sourceMappingURL=get-metered-billing-subscription-item-or-throw.util.js.map