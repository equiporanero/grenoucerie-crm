"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _billingusagetypeenum = require("../../enums/billing-usage-type.enum");
const _getmeteredbillingsubscriptionitemorthrowutil = require("../get-metered-billing-subscription-item-or-throw.util");
describe('getCurrentMeteredBillingSubscriptionItemOrThrow', ()=>{
    it('returns the metered billing subscription item when found', ()=>{
        const licensedItem = {
            id: 'item_licensed',
            quantity: 5,
            billingProduct: {
                metadata: {
                    priceUsageBased: _billingusagetypeenum.BillingUsageType.LICENSED
                }
            }
        };
        const meteredItem = {
            id: 'item_metered',
            quantity: null,
            billingProduct: {
                metadata: {
                    priceUsageBased: _billingusagetypeenum.BillingUsageType.METERED
                }
            }
        };
        const billingSubscription = {
            billingSubscriptionItems: [
                licensedItem,
                meteredItem
            ]
        };
        const result = (0, _getmeteredbillingsubscriptionitemorthrowutil.getCurrentMeteredBillingSubscriptionItemOrThrow)(billingSubscription);
        expect(result).toBe(meteredItem);
    });
    it('throws when no metered billing subscription item is found', ()=>{
        const licensedItem = {
            id: 'item_licensed',
            quantity: 5,
            billingProduct: {
                metadata: {
                    priceUsageBased: _billingusagetypeenum.BillingUsageType.LICENSED
                }
            }
        };
        const billingSubscription = {
            billingSubscriptionItems: [
                licensedItem
            ]
        };
        expect(()=>(0, _getmeteredbillingsubscriptionitemorthrowutil.getCurrentMeteredBillingSubscriptionItemOrThrow)(billingSubscription)).toThrow();
    });
});

//# sourceMappingURL=get-metered-billing-subscription-item-or-throw.util.spec.js.map