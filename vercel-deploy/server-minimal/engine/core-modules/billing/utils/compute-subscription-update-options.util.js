"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeSubscriptionUpdateOptions", {
    enumerable: true,
    get: function() {
        return computeSubscriptionUpdateOptions;
    }
});
const _utils = require("twenty-shared/utils");
const _billingsubscriptionupdatetype = require("../types/billing-subscription-update.type");
const computeSubscriptionUpdateOptions = (subscriptionUpdate)=>{
    switch(subscriptionUpdate.type){
        case _billingsubscriptionupdatetype.SubscriptionUpdateType.PLAN:
            return {
                proration: 'always_invoice',
                metadata: {
                    plan: subscriptionUpdate.newPlan
                }
            };
        case _billingsubscriptionupdatetype.SubscriptionUpdateType.RESOURCE_CREDIT_PRICE:
            return {
                proration: 'none'
            };
        case _billingsubscriptionupdatetype.SubscriptionUpdateType.INTERVAL:
            return {
                proration: 'create_prorations',
                anchor: 'now'
            };
        case _billingsubscriptionupdatetype.SubscriptionUpdateType.SEATS:
            return {
                proration: 'create_prorations'
            };
        default:
            return (0, _utils.assertUnreachable)(subscriptionUpdate, 'Should never occur, add validator for new subscription update type');
    }
};

//# sourceMappingURL=compute-subscription-update-options.util.js.map