/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingWebhookEvent", {
    enumerable: true,
    get: function() {
        return BillingWebhookEvent;
    }
});
var BillingWebhookEvent = /*#__PURE__*/ function(BillingWebhookEvent) {
    BillingWebhookEvent["CUSTOMER_SUBSCRIPTION_CREATED"] = "customer.subscription.created";
    BillingWebhookEvent["CUSTOMER_SUBSCRIPTION_UPDATED"] = "customer.subscription.updated";
    BillingWebhookEvent["CUSTOMER_SUBSCRIPTION_DELETED"] = "customer.subscription.deleted";
    BillingWebhookEvent["CUSTOMER_CREATED"] = "customer.created";
    BillingWebhookEvent["SETUP_INTENT_SUCCEEDED"] = "setup_intent.succeeded";
    BillingWebhookEvent["CUSTOMER_ACTIVE_ENTITLEMENT_SUMMARY_UPDATED"] = "entitlements.active_entitlement_summary.updated";
    BillingWebhookEvent["PRODUCT_CREATED"] = "product.created";
    BillingWebhookEvent["PRODUCT_UPDATED"] = "product.updated";
    BillingWebhookEvent["PRICE_CREATED"] = "price.created";
    BillingWebhookEvent["PRICE_UPDATED"] = "price.updated";
    BillingWebhookEvent["ALERT_TRIGGERED"] = "billing.alert.triggered";
    BillingWebhookEvent["INVOICE_FINALIZED"] = "invoice.finalized";
    BillingWebhookEvent["INVOICE_PAID"] = "invoice.paid";
    BillingWebhookEvent["SUBSCRIPTION_SCHEDULE_UPDATED"] = "subscription_schedule.updated";
    BillingWebhookEvent["CREDIT_GRANT_CREATED"] = "billing.credit_grant.created";
    BillingWebhookEvent["CREDIT_GRANT_UPDATED"] = "billing.credit_grant.updated";
    return BillingWebhookEvent;
}({});

//# sourceMappingURL=billing-webhook-events.enum.js.map