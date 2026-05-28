/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getBillingExceptionStatusCode", {
    enumerable: true,
    get: function() {
        return getBillingExceptionStatusCode;
    }
});
const _utils = require("twenty-shared/utils");
const _billingexception = require("../billing.exception");
const getBillingExceptionStatusCode = (exception)=>{
    switch(exception.code){
        case _billingexception.BillingExceptionCode.BILLING_CUSTOMER_NOT_FOUND:
        case _billingexception.BillingExceptionCode.BILLING_ACTIVE_SUBSCRIPTION_NOT_FOUND:
        case _billingexception.BillingExceptionCode.BILLING_PRODUCT_NOT_FOUND:
        case _billingexception.BillingExceptionCode.BILLING_PLAN_NOT_FOUND:
        case _billingexception.BillingExceptionCode.BILLING_METER_NOT_FOUND:
        case _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_ITEM_NOT_FOUND:
        case _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_NOT_FOUND:
            return 404;
        case _billingexception.BillingExceptionCode.BILLING_METER_EVENT_FAILED:
        case _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_NOT_IN_TRIAL_PERIOD:
        case _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_INTERVAL_NOT_SWITCHABLE:
        case _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_PLAN_NOT_SWITCHABLE:
        case _billingexception.BillingExceptionCode.BILLING_MISSING_REQUEST_BODY:
            return 400;
        case _billingexception.BillingExceptionCode.BILLING_CREDITS_EXHAUSTED:
            return 402;
        case _billingexception.BillingExceptionCode.BILLING_CUSTOMER_EVENT_WORKSPACE_NOT_FOUND:
        case _billingexception.BillingExceptionCode.BILLING_PRICE_NOT_FOUND:
        case _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_INVALID:
        case _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_EVENT_WORKSPACE_NOT_FOUND:
        case _billingexception.BillingExceptionCode.BILLING_UNHANDLED_ERROR:
        case _billingexception.BillingExceptionCode.BILLING_STRIPE_ERROR:
        case _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_INTERVAL_INVALID:
        case _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_ITEM_INVALID:
        case _billingexception.BillingExceptionCode.BILLING_PRICE_INVALID_TIERS:
        case _billingexception.BillingExceptionCode.BILLING_PRICE_INVALID:
        case _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_PHASE_NOT_FOUND:
        case _billingexception.BillingExceptionCode.BILLING_TOO_MUCH_SUBSCRIPTIONS_FOUND:
        case _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_NOT_CANCELED:
            return 500;
        default:
            {
                return (0, _utils.assertUnreachable)(exception.code);
            }
    }
};

//# sourceMappingURL=get-billing-exception-status-code.util.js.map