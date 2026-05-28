/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SubscriptionStatus", {
    enumerable: true,
    get: function() {
        return SubscriptionStatus;
    }
});
var SubscriptionStatus = /*#__PURE__*/ function(SubscriptionStatus) {
    SubscriptionStatus["Active"] = "active";
    SubscriptionStatus["Canceled"] = "canceled";
    SubscriptionStatus["Incomplete"] = "incomplete";
    SubscriptionStatus["IncompleteExpired"] = "incomplete_expired";
    SubscriptionStatus["PastDue"] = "past_due";
    SubscriptionStatus["Paused"] = "paused";
    SubscriptionStatus["Trialing"] = "trialing";
    SubscriptionStatus["Unpaid"] = "unpaid";
    return SubscriptionStatus;
}({});

//# sourceMappingURL=billing-subscription-status.enum.js.map