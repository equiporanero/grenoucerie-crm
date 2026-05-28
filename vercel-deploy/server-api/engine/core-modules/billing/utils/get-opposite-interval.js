"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getOppositeInterval", {
    enumerable: true,
    get: function() {
        return getOppositeInterval;
    }
});
const _billingsubscriptionintervalenum = require("../enums/billing-subscription-interval.enum");
const _billingexception = require("../billing.exception");
const getOppositeInterval = (interval)=>{
    if (interval === _billingsubscriptionintervalenum.SubscriptionInterval.Month) return _billingsubscriptionintervalenum.SubscriptionInterval.Year;
    if (interval === _billingsubscriptionintervalenum.SubscriptionInterval.Year) return _billingsubscriptionintervalenum.SubscriptionInterval.Month;
    throw new _billingexception.BillingException(`Interval invalid`, _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_INTERVAL_INVALID);
};

//# sourceMappingURL=get-opposite-interval.js.map