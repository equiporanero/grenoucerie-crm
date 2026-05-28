/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getBaseProductSubscriptionItemOrThrow", {
    enumerable: true,
    get: function() {
        return getBaseProductSubscriptionItemOrThrow;
    }
});
const _utils = require("twenty-shared/utils");
const _billingproductkeyenum = require("../enums/billing-product-key.enum");
const getBaseProductSubscriptionItemOrThrow = (billingSubscription)=>{
    return (0, _utils.findOrThrow)(billingSubscription.billingSubscriptionItems, ({ billingProduct })=>billingProduct.metadata.productKey === _billingproductkeyenum.BillingProductKey.BASE_PRODUCT);
};

//# sourceMappingURL=get-base-product-subscription-item-or-throw.util.js.map