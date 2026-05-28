/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCurrentResourceCreditSubscriptionItemOrThrow", {
    enumerable: true,
    get: function() {
        return getCurrentResourceCreditSubscriptionItemOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _billingproductkeyenum = require("../enums/billing-product-key.enum");
const getCurrentResourceCreditSubscriptionItemOrThrow = (billingSubscription)=>{
    return (0, _utils.findOrThrow)(billingSubscription.billingSubscriptionItems, ({ billingProduct })=>billingProduct.metadata.productKey === _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT);
};

//# sourceMappingURL=get-resource-credit-subscription-item-or-throw.util.js.map