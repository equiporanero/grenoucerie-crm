/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformStripePriceEventToDatabasePrice", {
    enumerable: true,
    get: function() {
        return transformStripePriceEventToDatabasePrice;
    }
});
const _billingpricebillingschemeenum = require("../../billing/enums/billing-price-billing-scheme.enum");
const _billingpricetaxbehaviorenum = require("../../billing/enums/billing-price-tax-behavior.enum");
const _billingpricetypeenum = require("../../billing/enums/billing-price-type.enum");
const _billingsubscriptionintervalenum = require("../../billing/enums/billing-subscription-interval.enum");
const _billingusagetypeenum = require("../../billing/enums/billing-usage-type.enum");
const transformStripePriceEventToDatabasePrice = (data)=>{
    return {
        stripePriceId: data.id,
        active: data.active,
        stripeProductId: String(data.product),
        stripeMeterId: data.recurring?.meter,
        currency: data.currency.toUpperCase(),
        nickname: data.nickname === null ? undefined : data.nickname,
        taxBehavior: data.tax_behavior ? getTaxBehavior(data.tax_behavior) : undefined,
        type: getBillingPriceType(data.type),
        billingScheme: getBillingPriceBillingScheme(data.billing_scheme),
        unitAmountDecimal: data.unit_amount_decimal === null ? undefined : data.unit_amount_decimal,
        unitAmount: data.unit_amount ? Number(data.unit_amount) : undefined,
        transformQuantity: data.transform_quantity === null ? undefined : data.transform_quantity,
        usageType: data.recurring?.usage_type ? getBillingPriceUsageType(data.recurring.usage_type) : undefined,
        interval: data.recurring?.interval ? getBillingPriceInterval(data.recurring.interval) : undefined,
        currencyOptions: data.currency_options === null ? undefined : data.currency_options,
        tiers: data.tiers === null ? undefined : data.tiers,
        recurring: data.recurring === null ? undefined : data.recurring,
        metadata: data.metadata ?? {}
    };
};
const getTaxBehavior = (data)=>{
    switch(data){
        case 'exclusive':
            return _billingpricetaxbehaviorenum.BillingPriceTaxBehavior.EXCLUSIVE;
        case 'inclusive':
            return _billingpricetaxbehaviorenum.BillingPriceTaxBehavior.INCLUSIVE;
        case 'unspecified':
            return _billingpricetaxbehaviorenum.BillingPriceTaxBehavior.UNSPECIFIED;
    }
};
const getBillingPriceType = (data)=>{
    switch(data){
        case 'one_time':
            return _billingpricetypeenum.BillingPriceType.ONE_TIME;
        case 'recurring':
            return _billingpricetypeenum.BillingPriceType.RECURRING;
    }
};
const getBillingPriceBillingScheme = (data)=>{
    switch(data){
        case 'per_unit':
            return _billingpricebillingschemeenum.BillingPriceBillingScheme.PER_UNIT;
        case 'tiered':
            return _billingpricebillingschemeenum.BillingPriceBillingScheme.TIERED;
    }
};
const getBillingPriceUsageType = (data)=>{
    switch(data){
        case 'licensed':
            return _billingusagetypeenum.BillingUsageType.LICENSED;
        case 'metered':
            return _billingusagetypeenum.BillingUsageType.METERED;
    }
};
const getBillingPriceInterval = (data)=>{
    switch(data){
        case 'month':
            return _billingsubscriptionintervalenum.SubscriptionInterval.Month;
        case 'year':
            return _billingsubscriptionintervalenum.SubscriptionInterval.Year;
    }
};

//# sourceMappingURL=transform-stripe-price-event-to-database-price.util.js.map