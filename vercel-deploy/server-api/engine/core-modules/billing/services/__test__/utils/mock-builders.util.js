"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get arrangeBillingPriceRepositoryFindOneOrFail () {
        return arrangeBillingPriceRepositoryFindOneOrFail;
    },
    get arrangeBillingProductServiceGetProductPrices () {
        return arrangeBillingProductServiceGetProductPrices;
    },
    get arrangeBillingSubscriptionPhaseServiceToPhaseUpdateParams () {
        return arrangeBillingSubscriptionPhaseServiceToPhaseUpdateParams;
    },
    get arrangeBillingSubscriptionRepositoryFindOneOrFail () {
        return arrangeBillingSubscriptionRepositoryFindOneOrFail;
    },
    get arrangeStripeSubscriptionScheduleServiceCreateSubscriptionSchedule () {
        return arrangeStripeSubscriptionScheduleServiceCreateSubscriptionSchedule;
    },
    get arrangeStripeSubscriptionScheduleServiceLoadSubscriptionSchedule () {
        return arrangeStripeSubscriptionScheduleServiceLoadSubscriptionSchedule;
    },
    get buildBillingPriceEntity () {
        return buildBillingPriceEntity;
    },
    get buildDefaultMeteredTiers () {
        return buildDefaultMeteredTiers;
    },
    get buildSchedulePhase () {
        return buildSchedulePhase;
    },
    get repoMock () {
        return repoMock;
    }
});
const _billingproductkeyenum = require("../../../enums/billing-product-key.enum");
const _billingusagetypeenum = require("../../../enums/billing-usage-type.enum");
const _buildsubscriptionutil = require("./build-subscription.util");
const repoMock = ()=>({
        find: jest.fn(),
        findOne: jest.fn(),
        findOneOrFail: jest.fn(),
        upsert: jest.fn(),
        update: jest.fn(),
        delete: jest.fn()
    });
const buildBillingPriceEntity = ({ stripePriceId, planKey, interval, isMetered, tiers })=>({
        stripePriceId,
        interval,
        billingProduct: {
            metadata: {
                planKey,
                productKey: isMetered ? _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT : _billingproductkeyenum.BillingProductKey.BASE_PRODUCT,
                priceUsageBased: isMetered ? _billingusagetypeenum.BillingUsageType.METERED : _billingusagetypeenum.BillingUsageType.LICENSED
            }
        },
        ...isMetered ? {
            metadata: {
                credit_amount: '1000'
            },
            ...tiers ? {
                tiers
            } : {}
        } : {}
    });
const buildDefaultMeteredTiers = (upTo = 1000)=>[
        {
            up_to: upTo,
            flat_amount: upTo,
            unit_amount: null,
            flat_amount_decimal: String(upTo * 100),
            unit_amount_decimal: null
        },
        {
            up_to: null,
            flat_amount: null,
            unit_amount: null,
            flat_amount_decimal: null,
            unit_amount_decimal: '100'
        }
    ];
const arrangeBillingSubscriptionRepositoryFindOneOrFail = (billingSubscriptionRepository, params = {})=>jest.spyOn(billingSubscriptionRepository, 'findOneOrFail').mockResolvedValue((0, _buildsubscriptionutil.buildSubscription)(params));
const arrangeBillingPriceRepositoryFindOneOrFail = (billingPriceRepository, priceIdToPriceMap)=>{
    jest.spyOn(billingPriceRepository, 'findOneOrFail').mockImplementation(async (criteria)=>{
        const where = criteria?.where;
        const priceId = where?.stripePriceId;
        if (priceId && priceIdToPriceMap[priceId]) {
            return priceIdToPriceMap[priceId];
        }
        return {};
    });
    jest.spyOn(billingPriceRepository, 'find').mockImplementation(async (criteria)=>{
        const where = criteria?.where;
        const stripePriceIdCondition = where?.stripePriceId;
        const resolveStripePriceIds = (cond)=>{
            if (typeof cond === 'string') {
                return [
                    cond
                ];
            }
            if (cond && typeof cond === 'object' && 'value' in cond && cond.value !== undefined) {
                const value = cond.value;
                return Array.isArray(value) ? value : [
                    value
                ];
            }
            return [];
        };
        const stripePriceIds = resolveStripePriceIds(stripePriceIdCondition);
        return stripePriceIds.map((stripePriceId)=>priceIdToPriceMap[stripePriceId]).filter((entity)=>entity !== null && entity !== undefined);
    });
};
const arrangeStripeSubscriptionScheduleServiceLoadSubscriptionSchedule = (stripeSubscriptionScheduleService, result = {})=>jest.spyOn(stripeSubscriptionScheduleService, 'loadSubscriptionSchedule').mockResolvedValue(result);
const arrangeStripeSubscriptionScheduleServiceCreateSubscriptionSchedule = (stripeSubscriptionScheduleService, currentPhase = {})=>jest.spyOn(stripeSubscriptionScheduleService, 'createSubscriptionSchedule').mockResolvedValue({
        schedule: {
            id: 'schedule_1'
        },
        currentPhase
    });
const arrangeBillingProductServiceGetProductPrices = (billingProductService, prices)=>jest.spyOn(billingProductService, 'getProductPrices').mockResolvedValue(prices);
const arrangeBillingSubscriptionPhaseServiceToPhaseUpdateParams = (billingSubscriptionPhaseService, result = {})=>jest.spyOn(billingSubscriptionPhaseService, 'toPhaseUpdateParams').mockReturnValue(result);
const buildSchedulePhase = ({ licensedPriceId, resourceCreditPriceId, seats = 1, startDate = Math.floor(Date.now() / 1000), endDate = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60 })=>({
        start_date: startDate,
        end_date: endDate,
        items: [
            {
                price: licensedPriceId,
                quantity: seats
            },
            {
                price: resourceCreditPriceId,
                quantity: 1
            }
        ]
    });

//# sourceMappingURL=mock-builders.util.js.map