"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPlanKeyFromSubscription", {
    enumerable: true,
    get: function() {
        return getPlanKeyFromSubscription;
    }
});
const _billingplankeyenum = require("../enums/billing-plan-key.enum");
const getPlanKeyFromSubscription = (subscription)=>{
    const plan = subscription.metadata?.plan; //To do : #867  Naming issue decide if we should rename stripe product metadata planKey to plan (+ productKey to product) OR at session checkout creating subscription with metadata planKey (and not plan)
    switch(plan){
        case 'PRO':
            return _billingplankeyenum.BillingPlanKey.PRO;
        case 'ENTERPRISE':
            return _billingplankeyenum.BillingPlanKey.ENTERPRISE;
        default:
            return _billingplankeyenum.BillingPlanKey.PRO;
    }
};

//# sourceMappingURL=get-plan-key-from-subscription.util.js.map