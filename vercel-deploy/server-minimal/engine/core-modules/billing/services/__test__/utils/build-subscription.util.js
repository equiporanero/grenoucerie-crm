"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildSubscription", {
    enumerable: true,
    get: function() {
        return buildSubscription;
    }
});
const _billingplankeyenum = require("../../../enums/billing-plan-key.enum");
const _billingproductkeyenum = require("../../../enums/billing-product-key.enum");
const _billingsubscriptionintervalenum = require("../../../enums/billing-subscription-interval.enum");
const _billingsubscriptionstatusenum = require("../../../enums/billing-subscription-status.enum");
const _billingusagetypeenum = require("../../../enums/billing-usage-type.enum");
const _priceconstants = require("./price.constants");
const buildSubscription = ({ planKey = _billingplankeyenum.BillingPlanKey.PRO, interval = _billingsubscriptionintervalenum.SubscriptionInterval.Month, licensedPriceId = _priceconstants.LICENSE_PRICE_PRO_MONTH_ID, resourceCreditPriceId = _priceconstants.METER_PRICE_PRO_MONTH_ID, seats = 1, workspaceId = 'ws_1', stripeSubscriptionId = 'sub_1', currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } = {})=>({
        id: 'sub_db_1',
        workspaceId,
        stripeSubscriptionId,
        status: _billingsubscriptionstatusenum.SubscriptionStatus.Active,
        interval,
        currentPeriodEnd,
        billingSubscriptionItems: [
            {
                stripeSubscriptionItemId: 'si_licensed',
                stripeProductId: 'prod_base',
                stripePriceId: licensedPriceId,
                quantity: seats,
                billingProduct: {
                    metadata: {
                        planKey,
                        productKey: _billingproductkeyenum.BillingProductKey.BASE_PRODUCT,
                        priceUsageBased: _billingusagetypeenum.BillingUsageType.LICENSED
                    }
                }
            },
            {
                stripeSubscriptionItemId: 'si_resource_credit',
                stripeProductId: 'prod_resource_credit',
                stripePriceId: resourceCreditPriceId,
                billingProduct: {
                    metadata: {
                        planKey,
                        productKey: _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT,
                        priceUsageBased: _billingusagetypeenum.BillingUsageType.METERED
                    }
                }
            }
        ]
    });

//# sourceMappingURL=build-subscription.util.js.map