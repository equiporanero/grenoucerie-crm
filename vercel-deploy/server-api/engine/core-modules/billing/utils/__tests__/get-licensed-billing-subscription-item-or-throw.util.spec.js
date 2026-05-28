"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _billingusagetypeenum = require("../../enums/billing-usage-type.enum");
const _getlicensedbillingsubscriptionitemorthrowutil = require("../get-licensed-billing-subscription-item-or-throw.util");
describe('getCurrentLicensedBillingSubscriptionItemOrThrow', ()=>{
    it('returns the licensed billing subscription item when found', ()=>{
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
                meteredItem,
                licensedItem
            ]
        };
        const result = (0, _getlicensedbillingsubscriptionitemorthrowutil.getCurrentLicensedBillingSubscriptionItemOrThrow)(billingSubscription);
        expect(result).toBe(licensedItem);
    });
    it('returns the first licensed item when multiple licensed items exist', ()=>{
        const firstLicensedItem = {
            id: 'item_licensed_1',
            quantity: 5,
            billingProduct: {
                metadata: {
                    priceUsageBased: _billingusagetypeenum.BillingUsageType.LICENSED
                }
            }
        };
        const secondLicensedItem = {
            id: 'item_licensed_2',
            quantity: 10,
            billingProduct: {
                metadata: {
                    priceUsageBased: _billingusagetypeenum.BillingUsageType.LICENSED
                }
            }
        };
        const billingSubscription = {
            billingSubscriptionItems: [
                firstLicensedItem,
                secondLicensedItem
            ]
        };
        const result = (0, _getlicensedbillingsubscriptionitemorthrowutil.getCurrentLicensedBillingSubscriptionItemOrThrow)(billingSubscription);
        expect(result).toBe(firstLicensedItem);
    });
    it('throws when no licensed billing subscription item is found', ()=>{
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
                meteredItem
            ]
        };
        expect(()=>(0, _getlicensedbillingsubscriptionitemorthrowutil.getCurrentLicensedBillingSubscriptionItemOrThrow)(billingSubscription)).toThrow();
    });
    it('throws when subscription has no items', ()=>{
        const billingSubscription = {
            billingSubscriptionItems: []
        };
        expect(()=>(0, _getlicensedbillingsubscriptionitemorthrowutil.getCurrentLicensedBillingSubscriptionItemOrThrow)(billingSubscription)).toThrow();
    });
});

//# sourceMappingURL=get-licensed-billing-subscription-item-or-throw.util.spec.js.map