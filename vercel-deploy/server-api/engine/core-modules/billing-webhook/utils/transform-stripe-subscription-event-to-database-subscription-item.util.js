/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformStripeSubscriptionEventToDatabaseSubscriptionItem", {
    enumerable: true,
    get: function() {
        return transformStripeSubscriptionEventToDatabaseSubscriptionItem;
    }
});
const transformStripeSubscriptionEventToDatabaseSubscriptionItem = (billingSubscriptionId, data, workspaceId)=>{
    return data.object.items.data.map((item)=>{
        return {
            billingSubscriptionId,
            workspaceId,
            stripeSubscriptionId: data.object.id,
            stripeProductId: String(item.price.product),
            stripePriceId: item.price.id,
            stripeSubscriptionItemId: item.id,
            quantity: item.quantity,
            metadata: item.metadata,
            billingThresholds: item.billing_thresholds === null ? undefined : item.billing_thresholds
        };
    });
};

//# sourceMappingURL=transform-stripe-subscription-event-to-database-subscription-item.util.js.map