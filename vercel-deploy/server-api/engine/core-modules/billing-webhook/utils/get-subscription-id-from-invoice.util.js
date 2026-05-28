/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getSubscriptionIdFromInvoice", {
    enumerable: true,
    get: function() {
        return getSubscriptionIdFromInvoice;
    }
});
const getSubscriptionIdFromInvoice = (invoice)=>{
    // New structure (Stripe SDK v19+)
    const subscriptionFromParent = invoice.parent?.subscription_details?.subscription;
    if (subscriptionFromParent) {
        return typeof subscriptionFromParent === 'string' ? subscriptionFromParent : subscriptionFromParent.id;
    }
    // Legacy structure (pre-v19 invoices may still have this field at runtime)
    // The field exists in the API response but was removed from SDK types in v19
    const legacySubscription = invoice.subscription;
    if (legacySubscription) {
        return typeof legacySubscription === 'string' ? legacySubscription : legacySubscription.id;
    }
    return undefined;
};

//# sourceMappingURL=get-subscription-id-from-invoice.util.js.map