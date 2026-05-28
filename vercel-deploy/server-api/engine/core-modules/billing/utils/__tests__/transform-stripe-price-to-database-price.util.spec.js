/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _billingpricebillingschemeenum = require("../../enums/billing-price-billing-scheme.enum");
const _billingpricetaxbehaviorenum = require("../../enums/billing-price-tax-behavior.enum");
const _billingpricetypeenum = require("../../enums/billing-price-type.enum");
const _billingsubscriptionintervalenum = require("../../enums/billing-subscription-interval.enum");
const _billingusagetypeenum = require("../../enums/billing-usage-type.enum");
const _transformstripepricetodatabasepriceutil = require("../transform-stripe-price-to-database-price.util");
describe('transformStripePriceToDatabasePrice', ()=>{
    const createMockPrice = (overrides = {})=>({
            id: 'price_123',
            active: true,
            product: 'prod_123',
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
                interval: 'month',
                meter: null
            },
            currency_options: null,
            tiers: null,
            ...overrides
        });
    it('should transform basic price data correctly', ()=>{
        const mockPrice = createMockPrice();
        const result = (0, _transformstripepricetodatabasepriceutil.transformStripePriceToDatabasePrice)(mockPrice);
        expect(result).toEqual({
            stripePriceId: 'price_123',
            active: true,
            stripeProductId: 'prod_123',
            stripeMeterId: null,
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
                interval: 'month',
                meter: null
            }
        });
    });
    describe('tax behavior transformations', ()=>{
        it.each([
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
        ])('should transform tax behavior %s correctly', (stripeTaxBehavior, expected)=>{
            const mockPrice = createMockPrice({
                tax_behavior: stripeTaxBehavior
            });
            const result = (0, _transformstripepricetodatabasepriceutil.transformStripePriceToDatabasePrice)(mockPrice);
            expect(result.taxBehavior).toBe(expected);
        });
    });
    describe('price type transformations', ()=>{
        it.each([
            [
                'one_time',
                _billingpricetypeenum.BillingPriceType.ONE_TIME
            ],
            [
                'recurring',
                _billingpricetypeenum.BillingPriceType.RECURRING
            ]
        ])('should transform price type %s correctly', (stripeType, expected)=>{
            const mockPrice = createMockPrice({
                type: stripeType
            });
            const result = (0, _transformstripepricetodatabasepriceutil.transformStripePriceToDatabasePrice)(mockPrice);
            expect(result.type).toBe(expected);
        });
    });
    describe('billing scheme transformations', ()=>{
        it.each([
            [
                'per_unit',
                _billingpricebillingschemeenum.BillingPriceBillingScheme.PER_UNIT
            ],
            [
                'tiered',
                _billingpricebillingschemeenum.BillingPriceBillingScheme.TIERED
            ]
        ])('should transform billing scheme %s correctly', (stripeScheme, expected)=>{
            const mockPrice = createMockPrice({
                billing_scheme: stripeScheme
            });
            const result = (0, _transformstripepricetodatabasepriceutil.transformStripePriceToDatabasePrice)(mockPrice);
            expect(result.billingScheme).toBe(expected);
        });
    });
    describe('recurring price configurations', ()=>{
        it('should handle metered pricing with meter ID', ()=>{
            const mockPrice = createMockPrice({
                recurring: {
                    usage_type: 'metered',
                    interval: 'month',
                    meter: 'meter_123'
                }
            });
            const result = (0, _transformstripepricetodatabasepriceutil.transformStripePriceToDatabasePrice)(mockPrice);
            expect(result.stripeMeterId).toBe('meter_123');
            expect(result.usageType).toBe(_billingusagetypeenum.BillingUsageType.METERED);
        });
        it.each([
            [
                'month',
                _billingsubscriptionintervalenum.SubscriptionInterval.Month
            ],
            [
                'year',
                _billingsubscriptionintervalenum.SubscriptionInterval.Year
            ]
        ])('should transform interval %s correctly', (stripeInterval, expected)=>{
            const mockPrice = createMockPrice({
                recurring: {
                    usage_type: 'licensed',
                    interval: stripeInterval,
                    meter: null
                }
            });
            const result = (0, _transformstripepricetodatabasepriceutil.transformStripePriceToDatabasePrice)(mockPrice);
            expect(result.interval).toBe(expected);
        });
    });
    describe('optional fields handling', ()=>{
        it('should handle transform quantity configuration', ()=>{
            const transformQuantity = {
                divide_by: 100,
                round: 'up'
            };
            const mockPrice = createMockPrice({
                transform_quantity: transformQuantity
            });
            const result = (0, _transformstripepricetodatabasepriceutil.transformStripePriceToDatabasePrice)(mockPrice);
            expect(result.transformQuantity).toEqual(transformQuantity);
        });
        it('should handle currency options', ()=>{
            const currencyOptions = {
                eur: {
                    unit_amount: 850,
                    unit_amount_decimal: '850'
                }
            };
            const mockPrice = createMockPrice({
                currency_options: currencyOptions
            });
            const result = (0, _transformstripepricetodatabasepriceutil.transformStripePriceToDatabasePrice)(mockPrice);
            expect(result.currencyOptions).toEqual(currencyOptions);
        });
        it('should handle null and undefined fields correctly', ()=>{
            const mockPrice = createMockPrice({
                nickname: null,
                unit_amount: null,
                unit_amount_decimal: null,
                transform_quantity: null,
                tiers: null,
                currency_options: null
            });
            const result = (0, _transformstripepricetodatabasepriceutil.transformStripePriceToDatabasePrice)(mockPrice);
            expect(result.nickname).toBeUndefined();
            expect(result.unitAmount).toBeUndefined();
            expect(result.unitAmountDecimal).toBeUndefined();
            expect(result.transformQuantity).toBeUndefined();
            expect(result.tiers).toBeUndefined();
            expect(result.currencyOptions).toBeUndefined();
        });
    });
});

//# sourceMappingURL=transform-stripe-price-to-database-price.util.spec.js.map