/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isStripeValidProductMetadata", {
    enumerable: true,
    get: function() {
        return isStripeValidProductMetadata;
    }
});
const _billingplankeyenum = require("../enums/billing-plan-key.enum");
const _billingproductkeyenum = require("../enums/billing-product-key.enum");
const _billingusagetypeenum = require("../enums/billing-usage-type.enum");
function isStripeValidProductMetadata(metadata) {
    if (Object.keys(metadata).length === 0) {
        return true;
    }
    const hasBillingPlanKey = isValidEnumValue(metadata.planKey, _billingplankeyenum.BillingPlanKey);
    const hasPriceUsageBased = isValidEnumValue(metadata.priceUsageBased, _billingusagetypeenum.BillingUsageType);
    const hasProductKey = isValidEnumValue(metadata.productKey, _billingproductkeyenum.BillingProductKey);
    return hasBillingPlanKey && hasPriceUsageBased && hasProductKey;
}
const isValidEnumValue = (value, enumObject)=>{
    return Object.values(enumObject).includes(value);
};

//# sourceMappingURL=is-stripe-valid-product-metadata.util.js.map