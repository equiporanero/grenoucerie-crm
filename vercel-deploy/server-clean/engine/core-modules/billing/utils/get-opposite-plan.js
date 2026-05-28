"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getOppositePlan", {
    enumerable: true,
    get: function() {
        return getOppositePlan;
    }
});
const _billingexception = require("../billing.exception");
const _billingplankeyenum = require("../enums/billing-plan-key.enum");
const getOppositePlan = (plan)=>{
    if (plan === _billingplankeyenum.BillingPlanKey.PRO) return _billingplankeyenum.BillingPlanKey.ENTERPRISE;
    if (plan === _billingplankeyenum.BillingPlanKey.ENTERPRISE) return _billingplankeyenum.BillingPlanKey.PRO;
    throw new _billingexception.BillingException(`Plan invalid`, _billingexception.BillingExceptionCode.BILLING_PLAN_NOT_FOUND);
};

//# sourceMappingURL=get-opposite-plan.js.map