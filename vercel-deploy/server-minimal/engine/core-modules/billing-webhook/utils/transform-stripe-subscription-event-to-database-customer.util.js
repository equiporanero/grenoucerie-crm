/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformStripeSubscriptionEventToDatabaseCustomer", {
    enumerable: true,
    get: function() {
        return transformStripeSubscriptionEventToDatabaseCustomer;
    }
});
const transformStripeSubscriptionEventToDatabaseCustomer = (workspaceId, data)=>{
    return {
        workspaceId,
        stripeCustomerId: String(data.object.customer)
    };
};

//# sourceMappingURL=transform-stripe-subscription-event-to-database-customer.util.js.map