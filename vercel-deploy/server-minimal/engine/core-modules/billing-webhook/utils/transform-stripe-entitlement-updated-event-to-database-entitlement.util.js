/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformStripeEntitlementUpdatedEventToDatabaseEntitlement", {
    enumerable: true,
    get: function() {
        return transformStripeEntitlementUpdatedEventToDatabaseEntitlement;
    }
});
const _billingentitlementkeyenum = require("../../billing/enums/billing-entitlement-key.enum");
const transformStripeEntitlementUpdatedEventToDatabaseEntitlement = (workspaceId, data)=>{
    const stripeCustomerId = data.object.customer;
    const activeEntitlementsKeys = data.object.entitlements.data.map((entitlement)=>entitlement.lookup_key);
    return Object.values(_billingentitlementkeyenum.BillingEntitlementKey).map((key)=>{
        return {
            workspaceId,
            key,
            value: activeEntitlementsKeys.includes(key),
            stripeCustomerId
        };
    });
};

//# sourceMappingURL=transform-stripe-entitlement-updated-event-to-database-entitlement.util.js.map