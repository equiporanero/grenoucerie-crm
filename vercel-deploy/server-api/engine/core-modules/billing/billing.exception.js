/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get BillingException () {
        return BillingException;
    },
    get BillingExceptionCode () {
        return BillingExceptionCode;
    }
});
const _utils = require("twenty-shared/utils");
const _customexception = require("../../../utils/custom-exception");
var BillingExceptionCode = /*#__PURE__*/ function(BillingExceptionCode) {
    BillingExceptionCode["BILLING_CUSTOMER_NOT_FOUND"] = "BILLING_CUSTOMER_NOT_FOUND";
    BillingExceptionCode["BILLING_PLAN_NOT_FOUND"] = "BILLING_PLAN_NOT_FOUND";
    BillingExceptionCode["BILLING_PRODUCT_NOT_FOUND"] = "BILLING_PRODUCT_NOT_FOUND";
    BillingExceptionCode["BILLING_PRICE_NOT_FOUND"] = "BILLING_PRICE_NOT_FOUND";
    BillingExceptionCode["BILLING_METER_NOT_FOUND"] = "BILLING_METER_NOT_FOUND";
    BillingExceptionCode["BILLING_SUBSCRIPTION_NOT_FOUND"] = "BILLING_SUBSCRIPTION_NOT_FOUND";
    BillingExceptionCode["BILLING_SUBSCRIPTION_ITEM_NOT_FOUND"] = "BILLING_SUBSCRIPTION_ITEM_NOT_FOUND";
    BillingExceptionCode["BILLING_SUBSCRIPTION_INVALID"] = "BILLING_SUBSCRIPTION_INVALID";
    BillingExceptionCode["BILLING_SUBSCRIPTION_EVENT_WORKSPACE_NOT_FOUND"] = "BILLING_SUBSCRIPTION_EVENT_WORKSPACE_NOT_FOUND";
    BillingExceptionCode["BILLING_CUSTOMER_EVENT_WORKSPACE_NOT_FOUND"] = "BILLING_CUSTOMER_EVENT_WORKSPACE_NOT_FOUND";
    BillingExceptionCode["BILLING_ACTIVE_SUBSCRIPTION_NOT_FOUND"] = "BILLING_ACTIVE_SUBSCRIPTION_NOT_FOUND";
    BillingExceptionCode["BILLING_METER_EVENT_FAILED"] = "BILLING_METER_EVENT_FAILED";
    BillingExceptionCode["BILLING_MISSING_REQUEST_BODY"] = "BILLING_MISSING_REQUEST_BODY";
    BillingExceptionCode["BILLING_UNHANDLED_ERROR"] = "BILLING_UNHANDLED_ERROR";
    BillingExceptionCode["BILLING_STRIPE_ERROR"] = "BILLING_STRIPE_ERROR";
    BillingExceptionCode["BILLING_SUBSCRIPTION_NOT_IN_TRIAL_PERIOD"] = "BILLING_SUBSCRIPTION_NOT_IN_TRIAL_PERIOD";
    BillingExceptionCode["BILLING_SUBSCRIPTION_INTERVAL_NOT_SWITCHABLE"] = "BILLING_SUBSCRIPTION_INTERVAL_NOT_SWITCHABLE";
    BillingExceptionCode["BILLING_SUBSCRIPTION_INTERVAL_INVALID"] = "BILLING_SUBSCRIPTION_INTERVAL_INVALID";
    BillingExceptionCode["BILLING_SUBSCRIPTION_PLAN_NOT_SWITCHABLE"] = "BILLING_SUBSCRIPTION_PLAN_NOT_SWITCHABLE";
    BillingExceptionCode["BILLING_SUBSCRIPTION_ITEM_INVALID"] = "BILLING_SUBSCRIPTION_ITEM_INVALID";
    BillingExceptionCode["BILLING_PRICE_INVALID_TIERS"] = "BILLING_PRICE_INVALID_TIERS";
    BillingExceptionCode["BILLING_PRICE_INVALID"] = "BILLING_PRICE_INVALID";
    BillingExceptionCode["BILLING_SUBSCRIPTION_PHASE_NOT_FOUND"] = "BILLING_SUBSCRIPTION_PHASE_NOT_FOUND";
    BillingExceptionCode["BILLING_TOO_MUCH_SUBSCRIPTIONS_FOUND"] = "BILLING_TOO_MUCH_SUBSCRIPTIONS_FOUND";
    BillingExceptionCode["BILLING_CREDITS_EXHAUSTED"] = "BILLING_CREDITS_EXHAUSTED";
    BillingExceptionCode["BILLING_SUBSCRIPTION_NOT_CANCELED"] = "BILLING_SUBSCRIPTION_NOT_CANCELED";
    return BillingExceptionCode;
}({});
const getBillingExceptionUserFriendlyMessage = (code)=>{
    switch(code){
        case "BILLING_CUSTOMER_NOT_FOUND":
            return /*i18n*/ {
                id: "rkIGWa",
                message: "Billing customer not found."
            };
        case "BILLING_PLAN_NOT_FOUND":
            return /*i18n*/ {
                id: "FNftTK",
                message: "Billing plan not found."
            };
        case "BILLING_PRODUCT_NOT_FOUND":
            return /*i18n*/ {
                id: "DDKhmc",
                message: "Billing product not found."
            };
        case "BILLING_PRICE_NOT_FOUND":
            return /*i18n*/ {
                id: "LI7tcn",
                message: "Billing price not found."
            };
        case "BILLING_METER_NOT_FOUND":
            return /*i18n*/ {
                id: "HVTHL6",
                message: "Billing meter not found."
            };
        case "BILLING_SUBSCRIPTION_NOT_FOUND":
            return /*i18n*/ {
                id: "uo7UmH",
                message: "Subscription not found."
            };
        case "BILLING_SUBSCRIPTION_ITEM_NOT_FOUND":
            return /*i18n*/ {
                id: "nnWIIb",
                message: "Subscription item not found."
            };
        case "BILLING_SUBSCRIPTION_INVALID":
            return /*i18n*/ {
                id: "mDAXg+",
                message: "Invalid subscription."
            };
        case "BILLING_SUBSCRIPTION_EVENT_WORKSPACE_NOT_FOUND":
            return /*i18n*/ {
                id: "5Io9Sh",
                message: "Workspace not found for subscription event."
            };
        case "BILLING_CUSTOMER_EVENT_WORKSPACE_NOT_FOUND":
            return /*i18n*/ {
                id: "eQwIyW",
                message: "Workspace not found for customer event."
            };
        case "BILLING_ACTIVE_SUBSCRIPTION_NOT_FOUND":
            return /*i18n*/ {
                id: "LnV8zi",
                message: "No active subscription found."
            };
        case "BILLING_METER_EVENT_FAILED":
            return /*i18n*/ {
                id: "/E7MoD",
                message: "Failed to record billing event."
            };
        case "BILLING_MISSING_REQUEST_BODY":
            return /*i18n*/ {
                id: "W5hpOP",
                message: "Missing request body."
            };
        case "BILLING_UNHANDLED_ERROR":
            return /*i18n*/ {
                id: "Tstlpf",
                message: "An unexpected billing error occurred."
            };
        case "BILLING_STRIPE_ERROR":
            return /*i18n*/ {
                id: "W6LTzL",
                message: "A payment processing error occurred."
            };
        case "BILLING_SUBSCRIPTION_NOT_IN_TRIAL_PERIOD":
            return /*i18n*/ {
                id: "x0Vn7k",
                message: "Subscription is not in trial period."
            };
        case "BILLING_SUBSCRIPTION_INTERVAL_NOT_SWITCHABLE":
            return /*i18n*/ {
                id: "wNJvot",
                message: "Cannot switch subscription interval."
            };
        case "BILLING_SUBSCRIPTION_INTERVAL_INVALID":
            return /*i18n*/ {
                id: "SFQl8b",
                message: "Invalid subscription interval."
            };
        case "BILLING_SUBSCRIPTION_PLAN_NOT_SWITCHABLE":
            return /*i18n*/ {
                id: "U/P/gT",
                message: "Cannot switch subscription plan."
            };
        case "BILLING_SUBSCRIPTION_ITEM_INVALID":
            return /*i18n*/ {
                id: "Do5gvp",
                message: "Invalid subscription item."
            };
        case "BILLING_PRICE_INVALID_TIERS":
            return /*i18n*/ {
                id: "tkzFzG",
                message: "Invalid pricing tiers."
            };
        case "BILLING_PRICE_INVALID":
            return /*i18n*/ {
                id: "r+9b/a",
                message: "Invalid price."
            };
        case "BILLING_SUBSCRIPTION_PHASE_NOT_FOUND":
            return /*i18n*/ {
                id: "VNohoc",
                message: "Subscription phase not found."
            };
        case "BILLING_TOO_MUCH_SUBSCRIPTIONS_FOUND":
            return /*i18n*/ {
                id: "B9dbXq",
                message: "Multiple subscriptions found where one was expected."
            };
        case "BILLING_CREDITS_EXHAUSTED":
            return /*i18n*/ {
                id: "hMX1AE",
                message: "You have exhausted your credits. Please upgrade your plan to continue."
            };
        case "BILLING_SUBSCRIPTION_NOT_CANCELED":
            return /*i18n*/ {
                id: "lNgTSN",
                message: "Workspace cannot be deleted: subscription is not yet canceled."
            };
        default:
            (0, _utils.assertUnreachable)(code);
    }
};
let BillingException = class BillingException extends _customexception.CustomException {
    constructor(message, code, { userFriendlyMessage } = {}){
        super(message, code, {
            userFriendlyMessage: userFriendlyMessage ?? getBillingExceptionUserFriendlyMessage(code)
        });
    }
};

//# sourceMappingURL=billing.exception.js.map