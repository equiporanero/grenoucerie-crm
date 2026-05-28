"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCurrentLicensedBillingSubscriptionItemOrThrow", {
    enumerable: true,
    get: function() {
        return getCurrentLicensedBillingSubscriptionItemOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _billingusagetypeenum = require("../enums/billing-usage-type.enum");
const getCurrentLicensedBillingSubscriptionItemOrThrow = (billingSubscription)=>{
    return (0, _utils.findOrThrow)(billingSubscription.billingSubscriptionItems, ({ billingProduct })=>billingProduct.metadata.priceUsageBased === _billingusagetypeenum.BillingUsageType.LICENSED);
};

//# sourceMappingURL=get-licensed-billing-subscription-item-or-throw.util.js.map