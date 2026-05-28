/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "formatBillingDatabaseProductToGraphqlDTO", {
    enumerable: true,
    get: function() {
        return formatBillingDatabaseProductToGraphqlDTO;
    }
});
const _classvalidator = require("class-validator");
const _billingsubscriptionintervalenum = require("../enums/billing-subscription-interval.enum");
const _billingusagetypeenum = require("../enums/billing-usage-type.enum");
const _todisplaycreditsutil = require("../../usage/utils/to-display-credits.util");
const formatBillingDatabaseProductToGraphqlDTO = (plan)=>{
    return {
        planKey: plan.planKey,
        baseProducts: plan.baseProducts.map((product)=>{
            return {
                ...product,
                prices: product.billingPrices.map(formatBillingDatabasePriceToLicensedPriceDTO)
            };
        }),
        resourceCreditProducts: plan.resourceCreditProducts.map((product)=>{
            return {
                ...product,
                prices: product.billingPrices.map(formatBillingDatabasePriceToLicensedPriceDTO)
            };
        }),
        meteredProducts: plan.meteredProducts.map((product)=>{
            return {
                ...product,
                metadata: {
                    ...product.metadata,
                    priceUsageBased: _billingusagetypeenum.BillingUsageType.METERED
                },
                prices: product.billingPrices.map(formatBillingDatabasePriceToMeteredPriceDTO)
            };
        })
    };
};
const formatBillingDatabasePriceToMeteredPriceDTO = (billingPrice)=>{
    return {
        tiers: billingPrice?.tiers?.map((tier)=>({
                upTo: tier.up_to !== null ? (0, _todisplaycreditsutil.toDisplayCredits)(tier.up_to) : tier.up_to,
                flatAmount: tier.flat_amount,
                unitAmount: tier.unit_amount
            })) ?? [],
        recurringInterval: billingPrice?.interval ?? _billingsubscriptionintervalenum.SubscriptionInterval.Month,
        stripePriceId: billingPrice?.stripePriceId,
        priceUsageType: _billingusagetypeenum.BillingUsageType.METERED
    };
};
const formatBillingDatabasePriceToLicensedPriceDTO = (billingPrice)=>{
    return {
        recurringInterval: billingPrice?.interval ?? _billingsubscriptionintervalenum.SubscriptionInterval.Month,
        unitAmount: billingPrice?.unitAmount ?? 0,
        stripePriceId: billingPrice?.stripePriceId,
        priceUsageType: _billingusagetypeenum.BillingUsageType.LICENSED,
        creditAmount: (0, _classvalidator.isDefined)(billingPrice?.metadata?.credit_amount) ? Number(billingPrice?.metadata?.credit_amount) / _todisplaycreditsutil.INTERNAL_CREDITS_PER_DISPLAY_CREDIT : null
    };
};

//# sourceMappingURL=format-database-product-to-graphql-dto.util.js.map