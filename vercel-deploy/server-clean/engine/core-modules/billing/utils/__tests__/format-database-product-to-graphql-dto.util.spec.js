/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _billingplankeyenum = require("../../enums/billing-plan-key.enum");
const _billingsubscriptionintervalenum = require("../../enums/billing-subscription-interval.enum");
const _billingusagetypeenum = require("../../enums/billing-usage-type.enum");
const _formatdatabaseproducttographqldtoutil = require("../format-database-product-to-graphql-dto.util");
describe('formatBillingDatabaseProductToGraphqlDTO', ()=>{
    it('should correctly format a billing plan with licensed and metered products', ()=>{
        const mockPlan = {
            planKey: _billingplankeyenum.BillingPlanKey.PRO,
            baseProducts: [
                {
                    id: 'product-1',
                    name: 'Test Licensed Product',
                    billingPrices: [
                        {
                            interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                            unitAmount: 1500,
                            stripePriceId: 'price_123',
                            priceUsageType: _billingusagetypeenum.BillingUsageType.LICENSED
                        }
                    ]
                }
            ],
            resourceCreditProducts: [],
            meteredProducts: [
                {
                    id: 'product-2',
                    name: 'Test Metered Product',
                    billingPrices: [
                        {
                            interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                            tiers: [
                                {
                                    up_to: 10000000,
                                    flat_amount: 500,
                                    unit_amount: null
                                },
                                {
                                    up_to: null,
                                    flat_amount: null,
                                    unit_amount: 0.001
                                }
                            ],
                            stripePriceId: 'price_metered1',
                            priceUsageType: _billingusagetypeenum.BillingUsageType.METERED
                        }
                    ]
                }
            ]
        };
        const result = (0, _formatdatabaseproducttographqldtoutil.formatBillingDatabaseProductToGraphqlDTO)(mockPlan);
        expect(result).toEqual({
            planKey: _billingplankeyenum.BillingPlanKey.PRO,
            baseProducts: [
                {
                    id: 'product-1',
                    name: 'Test Licensed Product',
                    billingPrices: [
                        {
                            interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                            unitAmount: 1500,
                            stripePriceId: 'price_123',
                            priceUsageType: _billingusagetypeenum.BillingUsageType.LICENSED
                        }
                    ],
                    prices: [
                        {
                            recurringInterval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                            unitAmount: 1500,
                            stripePriceId: 'price_123',
                            priceUsageType: _billingusagetypeenum.BillingUsageType.LICENSED,
                            creditAmount: null
                        }
                    ]
                }
            ],
            resourceCreditProducts: [],
            meteredProducts: [
                {
                    id: 'product-2',
                    metadata: {
                        priceUsageBased: 'METERED'
                    },
                    name: 'Test Metered Product',
                    billingPrices: [
                        {
                            interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                            tiers: [
                                {
                                    up_to: 10000000,
                                    flat_amount: 500,
                                    unit_amount: null
                                },
                                {
                                    up_to: null,
                                    flat_amount: null,
                                    unit_amount: 0.001
                                }
                            ],
                            stripePriceId: 'price_metered1',
                            priceUsageType: _billingusagetypeenum.BillingUsageType.METERED
                        }
                    ],
                    prices: [
                        {
                            tiers: [
                                {
                                    upTo: 10,
                                    flatAmount: 500,
                                    unitAmount: null
                                },
                                {
                                    upTo: null,
                                    flatAmount: null,
                                    unitAmount: 0.001
                                }
                            ],
                            recurringInterval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                            stripePriceId: 'price_metered1',
                            priceUsageType: _billingusagetypeenum.BillingUsageType.METERED
                        }
                    ]
                }
            ]
        });
    });
    it('should convert internal credits to display credits in metered tier upTo', ()=>{
        const mockPlan = {
            planKey: _billingplankeyenum.BillingPlanKey.PRO,
            baseProducts: [],
            resourceCreditProducts: [],
            meteredProducts: [
                {
                    id: 'product-2',
                    name: 'Test Metered Product',
                    billingPrices: [
                        {
                            interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
                            tiers: [
                                {
                                    up_to: 50000000,
                                    flat_amount: 0,
                                    unit_amount: null
                                },
                                {
                                    up_to: null,
                                    flat_amount: null,
                                    unit_amount: null
                                }
                            ],
                            stripePriceId: 'price_metered1',
                            priceUsageType: _billingusagetypeenum.BillingUsageType.METERED
                        }
                    ]
                }
            ]
        };
        const result = (0, _formatdatabaseproducttographqldtoutil.formatBillingDatabaseProductToGraphqlDTO)(mockPlan);
        const meteredPrices = result.meteredProducts[0].prices;
        expect(meteredPrices[0].tiers[0]).toEqual(expect.objectContaining({
            upTo: 50
        }));
        expect(meteredPrices[0].tiers[1]).toEqual(expect.objectContaining({
            upTo: null
        }));
    });
});

//# sourceMappingURL=format-database-product-to-graphql-dto.util.spec.js.map