/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _transformstripepriceeventtodatabasepriceutil = require("../transform-stripe-price-event-to-database-price.util");
const _billingpricebillingschemeenum = require("../../../billing/enums/billing-price-billing-scheme.enum");
const _billingpricetaxbehaviorenum = require("../../../billing/enums/billing-price-tax-behavior.enum");
const _billingpricetypeenum = require("../../../billing/enums/billing-price-type.enum");
const _billingsubscriptionintervalenum = require("../../../billing/enums/billing-subscription-interval.enum");
const _billingusagetypeenum = require("../../../billing/enums/billing-usage-type.enum");
describe('transformStripePriceEventToDatabasePrice', ()=>{
    const createMockPriceData = (overrides = {})=>({
            id: 'price_123',
            active: true,
            product: 'prod_123',
            meter: null,
            currency: 'usd',
            nickname: null,
            tax_behavior: null,
            type: 'recurring',
            billing_scheme: 'per_unit',
            unit_amount_decimal: '1000',
            unit_amount: 1000,
            transform_quantity: null,
            recurring: {
                usage_type: 'licensed',
                interval: 'month'
            },
            currency_options: null,
            tiers: null,
            tiers_mode: null,
            ...overrides
        });
    it('should transform basic price data correctly', ()=>{
        const mockData = createMockPriceData();
        const result = (0, _transformstripepriceeventtodatabasepriceutil.transformStripePriceEventToDatabasePrice)(mockData);
        expect(result).toEqual({
            stripePriceId: 'price_123',
            active: true,
            stripeProductId: 'prod_123',
            stripeMeterId: undefined,
            currency: 'USD',
            nickname: undefined,
            taxBehavior: undefined,
            type: _billingpricetypeenum.BillingPriceType.RECURRING,
            billingScheme: _billingpricebillingschemeenum.BillingPriceBillingScheme.PER_UNIT,
            unitAmountDecimal: '1000',
            unitAmount: 1000,
            transformQuantity: undefined,
            usageType: _billingusagetypeenum.BillingUsageType.LICENSED,
            interval: _billingsubscriptionintervalenum.SubscriptionInterval.Month,
            metadata: {},
            currencyOptions: undefined,
            tiers: undefined,
            recurring: {
                usage_type: 'licensed',
                interval: 'month'
            }
        });
    });
    it('should handle all tax behaviors correctly', ()=>{
        const taxBehaviors = [
            [
                'exclusive',
                _billingpricetaxbehaviorenum.BillingPriceTaxBehavior.EXCLUSIVE
            ],
            [
                'inclusive',
                _billingpricetaxbehaviorenum.BillingPriceTaxBehavior.INCLUSIVE
            ],
            [
                'unspecified',
                _billingpricetaxbehaviorenum.BillingPriceTaxBehavior.UNSPECIFIED
            ]
        ];
        taxBehaviors.forEach(([stripeTaxBehavior, expectedTaxBehavior])=>{
            const mockData = createMockPriceData({
                tax_behavior: stripeTaxBehavior
            });
            const result = (0, _transformstripepriceeventtodatabasepriceutil.transformStripePriceEventToDatabasePrice)(mockData);
            expect(result.taxBehavior).toBe(expectedTaxBehavior);
        });
    });
    it('should handle all price types correctly', ()=>{
        const priceTypes = [
            [
                'one_time',
                _billingpricetypeenum.BillingPriceType.ONE_TIME
            ],
            [
                'recurring',
                _billingpricetypeenum.BillingPriceType.RECURRING
            ]
        ];
        priceTypes.forEach(([stripeType, expectedType])=>{
            const mockData = createMockPriceData({
                type: stripeType
            });
            const result = (0, _transformstripepriceeventtodatabasepriceutil.transformStripePriceEventToDatabasePrice)(mockData);
            expect(result.type).toBe(expectedType);
        });
    });
    it('should handle all billing schemes correctly', ()=>{
        const billingSchemes = [
            [
                'per_unit',
                _billingpricebillingschemeenum.BillingPriceBillingScheme.PER_UNIT
            ],
            [
                'tiered',
                _billingpricebillingschemeenum.BillingPriceBillingScheme.TIERED
            ]
        ];
        billingSchemes.forEach(([stripeScheme, expectedScheme])=>{
            const mockData = createMockPriceData({
                billing_scheme: stripeScheme
            });
            const result = (0, _transformstripepriceeventtodatabasepriceutil.transformStripePriceEventToDatabasePrice)(mockData);
            expect(result.billingScheme).toBe(expectedScheme);
        });
    });
    it('should handle all usage types correctly', ()=>{
        const usageTypes = [
            [
                'licensed',
                _billingusagetypeenum.BillingUsageType.LICENSED
            ],
            [
                'metered',
                _billingusagetypeenum.BillingUsageType.METERED
            ]
        ];
        usageTypes.forEach(([stripeUsageType, expectedUsageType])=>{
            const mockData = createMockPriceData({
                recurring: {
                    usage_type: stripeUsageType,
                    interval: 'month'
                }
            });
            const result = (0, _transformstripepriceeventtodatabasepriceutil.transformStripePriceEventToDatabasePrice)(mockData);
            expect(result.usageType).toBe(expectedUsageType);
        });
    });
    it('should handle all intervals correctly', ()=>{
        const intervals = [
            [
                'month',
                _billingsubscriptionintervalenum.SubscriptionInterval.Month
            ],
            [
                'year',
                _billingsubscriptionintervalenum.SubscriptionInterval.Year
            ]
        ];
        intervals.forEach(([stripeInterval, expectedInterval])=>{
            const mockData = createMockPriceData({
                recurring: {
                    usage_type: 'licensed',
                    interval: stripeInterval
                }
            });
            const result = (0, _transformstripepriceeventtodatabasepriceutil.transformStripePriceEventToDatabasePrice)(mockData);
            expect(result.interval).toBe(expectedInterval);
        });
    });
    it('should handle tiered pricing configuration', ()=>{
        const mockTiers = [
            {
                up_to: 10,
                unit_amount: 1000
            },
            {
                up_to: 20,
                unit_amount: 800
            }
        ];
        const mockData = createMockPriceData({
            billing_scheme: 'tiered',
            tiers: mockTiers,
            tiers_mode: 'graduated'
        });
        const result = (0, _transformstripepriceeventtodatabasepriceutil.transformStripePriceEventToDatabasePrice)(mockData);
        expect(result.billingScheme).toBe(_billingpricebillingschemeenum.BillingPriceBillingScheme.TIERED);
        expect(result.tiers).toEqual(mockTiers);
    });
    it('should handle metered pricing with transform quantity', ()=>{
        const mockTransformQuantity = {
            divide_by: 100,
            round: 'up'
        };
        const mockData = createMockPriceData({
            recurring: {
                usage_type: 'metered',
                interval: 'month',
                meter: 'meter_123'
            },
            transform_quantity: mockTransformQuantity
        });
        const result = (0, _transformstripepriceeventtodatabasepriceutil.transformStripePriceEventToDatabasePrice)(mockData);
        expect(result.stripeMeterId).toBe('meter_123');
        expect(result.usageType).toBe(_billingusagetypeenum.BillingUsageType.METERED);
        expect(result.transformQuantity).toEqual(mockTransformQuantity);
    });
    it('should handle currency options', ()=>{
        const mockCurrencyOptions = {
            eur: {
                unit_amount: 850,
                unit_amount_decimal: '850'
            }
        };
        const mockData = createMockPriceData({
            currency_options: mockCurrencyOptions
        });
        const result = (0, _transformstripepriceeventtodatabasepriceutil.transformStripePriceEventToDatabasePrice)(mockData);
        expect(result.currencyOptions).toEqual(mockCurrencyOptions);
    });
});

//# sourceMappingURL=transform-stripe-price-event-to-database-price.util.spec.js.map