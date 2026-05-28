/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingSubscriptionUpdateService", {
    enumerable: true,
    get: function() {
        return BillingSubscriptionUpdateService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _billingvalidate = require("../billing.validate");
const _billingpriceentity = require("../entities/billing-price.entity");
const _billingsubscriptionitementity = require("../entities/billing-subscription-item.entity");
const _billingsubscriptionentity = require("../entities/billing-subscription.entity");
const _billingplankeyenum = require("../enums/billing-plan-key.enum");
const _billingproductkeyenum = require("../enums/billing-product-key.enum");
const _billingsubscriptionintervalenum = require("../enums/billing-subscription-interval.enum");
const _billingpriceservice = require("./billing-price.service");
const _billingproductservice = require("./billing-product.service");
const _billingsubscriptionphaseservice = require("./billing-subscription-phase.service");
const _billingsubscriptionservice = require("./billing-subscription.service");
const _stripeinvoiceservice = require("../stripe/services/stripe-invoice.service");
const _stripesubscriptionscheduleservice = require("../stripe/services/stripe-subscription-schedule.service");
const _stripesubscriptionservice = require("../stripe/services/stripe-subscription.service");
const _billingsubscriptionupdatetype = require("../types/billing-subscription-update.type");
const _computesubscriptionupdateoptionsutil = require("../utils/compute-subscription-update-options.util");
const _getbaseproductsubscriptionitemorthrowutil = require("../utils/get-base-product-subscription-item-or-throw.util");
const _getlicensedbillingsubscriptionitemorthrowutil = require("../utils/get-licensed-billing-subscription-item-or-throw.util");
const _getresourcecreditsubscriptionitemorthrowutil = require("../utils/get-resource-credit-subscription-item-or-throw.util");
const _normalizepricerefutils = require("../utils/normalize-price-ref.utils");
const _injectworkspacescopedrepositorydecorator = require("../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let BillingSubscriptionUpdateService = class BillingSubscriptionUpdateService {
    async changeResourceCreditPrice(workspaceId, resourceCreditPriceId) {
        const billingSubscription = await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
            workspaceId
        });
        const subscriptionUpdate = {
            type: _billingsubscriptionupdatetype.SubscriptionUpdateType.RESOURCE_CREDIT_PRICE,
            newResourceCreditPriceId: resourceCreditPriceId
        };
        await this.updateSubscription(workspaceId, billingSubscription.id, subscriptionUpdate);
    }
    async cancelSwitchResourceCreditPrice(workspace) {
        const billingSubscription = await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
            workspaceId: workspace.id
        });
        const currentResourceCreditPrice = (0, _getresourcecreditsubscriptionitemorthrowutil.getCurrentResourceCreditSubscriptionItemOrThrow)(billingSubscription);
        const subscriptionUpdate = {
            type: _billingsubscriptionupdatetype.SubscriptionUpdateType.RESOURCE_CREDIT_PRICE,
            newResourceCreditPriceId: currentResourceCreditPrice.stripePriceId
        };
        await this.updateSubscription(workspace.id, billingSubscription.id, subscriptionUpdate);
    }
    async cancelSwitchPlan(workspaceId) {
        const billingSubscription = await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
            workspaceId
        });
        const currentPlan = (0, _getlicensedbillingsubscriptionitemorthrowutil.getCurrentLicensedBillingSubscriptionItemOrThrow)(billingSubscription).billingProduct?.metadata.planKey;
        await this.updateSubscription(workspaceId, billingSubscription.id, {
            type: _billingsubscriptionupdatetype.SubscriptionUpdateType.PLAN,
            newPlan: currentPlan
        });
    }
    async cancelSwitchInterval(workspaceId) {
        const billingSubscription = await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
            workspaceId
        });
        const currentInterval = billingSubscription.interval;
        await this.updateSubscription(workspaceId, billingSubscription.id, {
            type: _billingsubscriptionupdatetype.SubscriptionUpdateType.INTERVAL,
            newInterval: currentInterval
        });
    }
    async changeInterval(workspaceId) {
        const billingSubscription = await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
            workspaceId
        });
        const currentInterval = billingSubscription.interval;
        await this.updateSubscription(workspaceId, billingSubscription.id, {
            type: _billingsubscriptionupdatetype.SubscriptionUpdateType.INTERVAL,
            newInterval: currentInterval === _billingsubscriptionintervalenum.SubscriptionInterval.Month ? _billingsubscriptionintervalenum.SubscriptionInterval.Year : _billingsubscriptionintervalenum.SubscriptionInterval.Month
        });
    }
    async changePlan(workspaceId) {
        const billingSubscription = await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
            workspaceId
        });
        const currentPlan = (0, _getlicensedbillingsubscriptionitemorthrowutil.getCurrentLicensedBillingSubscriptionItemOrThrow)(billingSubscription).billingProduct?.metadata.planKey;
        await this.updateSubscription(workspaceId, billingSubscription.id, {
            type: _billingsubscriptionupdatetype.SubscriptionUpdateType.PLAN,
            newPlan: currentPlan === _billingplankeyenum.BillingPlanKey.ENTERPRISE ? _billingplankeyenum.BillingPlanKey.PRO : _billingplankeyenum.BillingPlanKey.ENTERPRISE
        });
    }
    async changeSeats(workspaceId, newSeats) {
        const billingSubscription = await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
            workspaceId
        });
        await this.updateSubscription(workspaceId, billingSubscription.id, {
            type: _billingsubscriptionupdatetype.SubscriptionUpdateType.SEATS,
            newSeats
        });
    }
    async updateSubscription(workspaceId, subscriptionId, subscriptionUpdate) {
        const subscription = await this.billingSubscriptionRepository.findOneOrFail(workspaceId, {
            where: {
                id: subscriptionId
            },
            relations: [
                'billingSubscriptionItems',
                'billingSubscriptionItems.billingProduct'
            ]
        });
        const licensedItem = (0, _getbaseproductsubscriptionitemorthrowutil.getBaseProductSubscriptionItemOrThrow)(subscription);
        const resourceCreditItem = (0, _getresourcecreditsubscriptionitemorthrowutil.getCurrentResourceCreditSubscriptionItemOrThrow)(subscription);
        const toUpdateCurrentPrices = await this.computeSubscriptionPricesUpdate(subscriptionUpdate, {
            licensedPriceId: licensedItem.stripePriceId,
            resourceCreditPriceId: resourceCreditItem.stripePriceId,
            seats: licensedItem.quantity
        });
        const { schedule, currentPhase, nextPhase } = await this.stripeSubscriptionScheduleService.loadSubscriptionSchedule(subscription.stripeSubscriptionId);
        const shouldUpdateAtPeriodEnd = await this.shouldUpdateAtSubscriptionPeriodEnd(subscription, subscriptionUpdate);
        if (shouldUpdateAtPeriodEnd) {
            if (!(0, _utils.isDefined)(schedule)) {
                const { schedule, currentPhase } = await this.stripeSubscriptionScheduleService.createSubscriptionSchedule(subscription.stripeSubscriptionId);
                await this.runSubscriptionScheduleUpdate({
                    stripeScheduleId: schedule.id,
                    toUpdateCurrentPrices: undefined,
                    toUpdateNextPrices: toUpdateCurrentPrices,
                    currentPhase: this.billingSubscriptionPhaseService.toPhaseUpdateParams(currentPhase),
                    subscriptionCurrentPeriodEnd: Math.floor(subscription.currentPeriodEnd.getTime() / 1000)
                });
            } else {
                (0, _utils.assertIsDefinedOrThrow)(nextPhase);
                (0, _utils.assertIsDefinedOrThrow)(currentPhase);
                const nextPhasePrices = await this.getSubscriptionPricesFromSchedulePhase(nextPhase);
                const toUpdateNextPrices = await this.computeSubscriptionPricesUpdate(subscriptionUpdate, nextPhasePrices);
                await this.runSubscriptionScheduleUpdate({
                    stripeScheduleId: schedule.id,
                    toUpdateNextPrices,
                    toUpdateCurrentPrices: undefined,
                    currentPhase: this.billingSubscriptionPhaseService.toPhaseUpdateParams(currentPhase),
                    subscriptionCurrentPeriodEnd: Math.floor(subscription.currentPeriodEnd.getTime() / 1000)
                });
            }
        } else {
            const subscriptionOptions = (0, _computesubscriptionupdateoptionsutil.computeSubscriptionUpdateOptions)(subscriptionUpdate);
            if (subscriptionUpdate.type === _billingsubscriptionupdatetype.SubscriptionUpdateType.RESOURCE_CREDIT_PRICE) {
                (0, _utils.assertIsDefinedOrThrow)(resourceCreditItem);
                await this.createResourceCreditUpgradeInvoice({
                    subscription,
                    currentResourceCreditPriceId: resourceCreditItem.stripePriceId,
                    newResourceCreditPriceId: subscriptionUpdate.newResourceCreditPriceId
                });
            }
            await this.runSubscriptionUpdate({
                stripeSubscriptionId: subscription.stripeSubscriptionId,
                licensedStripeItemId: licensedItem.stripeSubscriptionItemId,
                resourceCreditStripeItemId: resourceCreditItem.stripeSubscriptionItemId,
                licensedStripePriceId: toUpdateCurrentPrices.licensedPriceId,
                resourceCreditStripePriceId: toUpdateCurrentPrices.resourceCreditPriceId,
                seats: toUpdateCurrentPrices.seats,
                ...subscriptionOptions
            });
            if (subscriptionUpdate.type !== _billingsubscriptionupdatetype.SubscriptionUpdateType.SEATS) {
                await this.billingSubscriptionItemRepository.update({
                    stripeSubscriptionId: subscription.stripeSubscriptionId
                }, {
                    hasReachedCurrentPeriodCap: false
                });
            }
            if ((0, _utils.isDefined)(nextPhase)) {
                (0, _utils.assertIsDefinedOrThrow)(schedule);
                const { currentPhase: refreshedCurrentPhase } = await this.stripeSubscriptionScheduleService.loadSubscriptionSchedule(subscription.stripeSubscriptionId);
                (0, _utils.assertIsDefinedOrThrow)(refreshedCurrentPhase);
                const nextPhasePrices = await this.getSubscriptionPricesFromSchedulePhase(nextPhase);
                const toUpdateNextPrices = await this.computeSubscriptionPricesUpdate(subscriptionUpdate, nextPhasePrices);
                await this.runSubscriptionScheduleUpdate({
                    stripeScheduleId: schedule.id,
                    toUpdateNextPrices,
                    toUpdateCurrentPrices: undefined,
                    currentPhase: this.billingSubscriptionPhaseService.toPhaseUpdateParams(refreshedCurrentPhase),
                    subscriptionCurrentPeriodEnd: Math.floor(subscription.currentPeriodEnd.getTime() / 1000)
                });
            }
        }
        await this.billingSubscriptionService.syncSubscriptionToDatabase(subscription.workspaceId, subscription.stripeSubscriptionId);
    }
    async createResourceCreditUpgradeInvoice({ subscription, currentResourceCreditPriceId, newResourceCreditPriceId }) {
        const prices = await this.billingPriceRepository.find({
            where: {
                stripePriceId: (0, _typeorm1.In)([
                    currentResourceCreditPriceId,
                    newResourceCreditPriceId
                ])
            }
        });
        const currentPrice = prices.find((price)=>price.stripePriceId === currentResourceCreditPriceId);
        const newPrice = prices.find((price)=>price.stripePriceId === newResourceCreditPriceId);
        (0, _utils.assertIsDefinedOrThrow)(currentPrice);
        (0, _utils.assertIsDefinedOrThrow)(newPrice);
        const diffInCents = Number(newPrice.unitAmount) - Number(currentPrice.unitAmount);
        if (diffInCents > 0) {
            await this.stripeInvoiceService.createImmediateUpgradeInvoice({
                stripeCustomerId: subscription.stripeCustomerId,
                stripeSubscriptionId: subscription.stripeSubscriptionId,
                diffAmountInCents: diffInCents,
                description: `Resource usage - Upgrade resource credit price from $${Number(currentPrice.unitAmount) / 100} to $${Number(newPrice.unitAmount) / 100}`,
                currency: newPrice.currency
            });
        }
    }
    async getSubscriptionPricesFromSchedulePhase(phase) {
        const licensedItemPriceIds = phase.items.filter((item)=>item.quantity != null).map((item)=>(0, _normalizepricerefutils.normalizePriceRef)(item.price));
        const licensedItemPrices = await this.billingPriceRepository.find({
            where: {
                stripePriceId: (0, _typeorm1.In)(licensedItemPriceIds)
            },
            relations: [
                'billingProduct'
            ]
        });
        const basePlanPrice = licensedItemPrices.find((price)=>price.billingProduct?.metadata?.productKey === _billingproductkeyenum.BillingProductKey.BASE_PRODUCT);
        (0, _utils.assertIsDefinedOrThrow)(basePlanPrice);
        const basePlanPhaseItem = (0, _utils.findOrThrow)(phase.items, (item)=>(0, _normalizepricerefutils.normalizePriceRef)(item.price) === basePlanPrice.stripePriceId);
        (0, _utils.assertIsDefinedOrThrow)(basePlanPhaseItem.quantity);
        const resourceCreditPrice = licensedItemPrices.find((price)=>price.billingProduct?.metadata?.productKey === _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT);
        (0, _utils.assertIsDefinedOrThrow)(resourceCreditPrice);
        return {
            licensedPriceId: basePlanPrice.stripePriceId,
            seats: basePlanPhaseItem.quantity,
            resourceCreditPriceId: resourceCreditPrice.stripePriceId
        };
    }
    async runSubscriptionUpdate({ stripeSubscriptionId, licensedStripeItemId, resourceCreditStripeItemId, licensedStripePriceId, resourceCreditStripePriceId, seats, anchor, proration, metadata }) {
        return await this.stripeSubscriptionService.updateSubscription(stripeSubscriptionId, {
            items: [
                {
                    id: licensedStripeItemId,
                    price: licensedStripePriceId,
                    quantity: seats
                },
                {
                    id: resourceCreditStripeItemId,
                    price: resourceCreditStripePriceId,
                    quantity: 1
                }
            ],
            ...anchor ? {
                billing_cycle_anchor: anchor
            } : {},
            ...proration ? {
                proration_behavior: proration
            } : {},
            ...metadata ? {
                metadata
            } : {}
        });
    }
    async runSubscriptionScheduleUpdate({ stripeScheduleId, toUpdateNextPrices, toUpdateCurrentPrices, currentPhase, subscriptionCurrentPeriodEnd }) {
        let toUpdateCurrentPhase = {
            ...currentPhase,
            end_date: subscriptionCurrentPeriodEnd
        };
        if ((0, _utils.isDefined)(toUpdateCurrentPrices)) {
            toUpdateCurrentPhase = await this.billingSubscriptionPhaseService.buildPhaseUpdateParams({
                toUpdatePrices: toUpdateCurrentPrices,
                endDate: subscriptionCurrentPeriodEnd,
                startDate: currentPhase.start_date
            });
        }
        const toUpdateNextPhase = await this.billingSubscriptionPhaseService.buildPhaseUpdateParams({
            toUpdatePrices: toUpdateNextPrices,
            startDate: subscriptionCurrentPeriodEnd,
            endDate: undefined
        });
        if (await this.billingSubscriptionPhaseService.isSamePhaseSignature(toUpdateCurrentPhase, toUpdateNextPhase)) {
            return await this.stripeSubscriptionScheduleService.releaseSubscriptionSchedule(stripeScheduleId);
        }
        return await this.stripeSubscriptionScheduleService.updateSchedule(stripeScheduleId, {
            phases: [
                toUpdateCurrentPhase,
                toUpdateNextPhase
            ]
        });
    }
    async shouldUpdateAtSubscriptionPeriodEnd(subscription, update) {
        switch(update.type){
            case _billingsubscriptionupdatetype.SubscriptionUpdateType.PLAN:
                {
                    const currentPlan = subscription.billingSubscriptionItems[0].billingProduct?.metadata.planKey;
                    const isDowngrade = currentPlan !== update.newPlan && update.newPlan === _billingplankeyenum.BillingPlanKey.PRO;
                    return isDowngrade;
                }
            case _billingsubscriptionupdatetype.SubscriptionUpdateType.RESOURCE_CREDIT_PRICE:
                {
                    const currentResourceCreditPriceId = subscription.billingSubscriptionItems.find((item)=>item.billingProduct?.metadata.productKey === _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT)?.stripePriceId;
                    (0, _utils.assertIsDefinedOrThrow)(currentResourceCreditPriceId);
                    const currentResourceCreditPrice = await this.billingPriceRepository.findOneOrFail({
                        where: {
                            stripePriceId: currentResourceCreditPriceId
                        },
                        relations: [
                            'billingProduct'
                        ]
                    });
                    const newResourceCreditPrice = await this.billingPriceRepository.findOneOrFail({
                        where: {
                            stripePriceId: update.newResourceCreditPriceId
                        },
                        relations: [
                            'billingProduct'
                        ]
                    });
                    _billingvalidate.billingValidator.assertIsLicensedResourceCreditPrice(currentResourceCreditPrice);
                    _billingvalidate.billingValidator.assertIsLicensedResourceCreditPrice(newResourceCreditPrice);
                    const currentResourceCreditCap = Number(currentResourceCreditPrice.metadata?.credit_amount);
                    const newResourceCreditCap = Number(newResourceCreditPrice.metadata?.credit_amount);
                    const isDowngrade = currentResourceCreditCap > newResourceCreditCap;
                    return isDowngrade;
                }
            case _billingsubscriptionupdatetype.SubscriptionUpdateType.SEATS:
                return false;
            case _billingsubscriptionupdatetype.SubscriptionUpdateType.INTERVAL:
                {
                    const currentInterval = subscription.interval;
                    const isDowngrade = currentInterval !== update.newInterval && update.newInterval === _billingsubscriptionintervalenum.SubscriptionInterval.Month;
                    return isDowngrade;
                }
            default:
                {
                    return (0, _utils.assertUnreachable)(update, 'Should never occur, add validator for new subscription update type');
                }
        }
    }
    async computeSubscriptionPricesUpdate(update, currentPrices) {
        switch(update.type){
            case _billingsubscriptionupdatetype.SubscriptionUpdateType.PLAN:
                return await this.computeSubscriptionPricesUpdateByPlan(update.newPlan, currentPrices);
            case _billingsubscriptionupdatetype.SubscriptionUpdateType.SEATS:
                return this.computeSubscriptionPricesUpdateBySeats(update.newSeats, currentPrices);
            case _billingsubscriptionupdatetype.SubscriptionUpdateType.INTERVAL:
                return await this.computeSubscriptionPricesUpdateByInterval(update.newInterval, currentPrices);
            case _billingsubscriptionupdatetype.SubscriptionUpdateType.RESOURCE_CREDIT_PRICE:
                return await this.computeSubscriptionPricesUpdateByResourceCreditPrice(update.newResourceCreditPriceId, currentPrices);
        }
    }
    computeSubscriptionPricesUpdateBySeats(newSeats, currentPrices) {
        return {
            ...currentPrices,
            seats: newSeats
        };
    }
    async computeSubscriptionPricesUpdateByResourceCreditPrice(newResourceCreditPriceId, currentPrices) {
        const currentLicensedPrice = await this.billingPriceRepository.findOneOrFail({
            where: {
                stripePriceId: currentPrices.licensedPriceId
            },
            relations: [
                'billingProduct'
            ]
        });
        const currentInterval = currentLicensedPrice.interval;
        const currentPlanKey = currentLicensedPrice.billingProduct?.metadata.planKey;
        (0, _utils.assertIsDefinedOrThrow)(currentPlanKey);
        const newResourceCreditPrice = await this.billingPriceRepository.findOneOrFail({
            where: {
                stripePriceId: newResourceCreditPriceId
            },
            relations: [
                'billingProduct'
            ]
        });
        _billingvalidate.billingValidator.assertIsLicensedResourceCreditPrice(newResourceCreditPrice);
        const newInterval = newResourceCreditPrice.interval;
        const newPlanKey = newResourceCreditPrice.billingProduct?.metadata.planKey;
        if (newInterval === currentInterval && currentPlanKey === newPlanKey) {
            return {
                ...currentPrices,
                resourceCreditPriceId: newResourceCreditPriceId
            };
        }
        const newEquivalentResourceCreditPrice = await this.billingPriceService.findEquivalentResourceCreditPrice({
            referencePrice: newResourceCreditPrice,
            targetInterval: currentInterval,
            targetPlanKey: currentPlanKey,
            hasSameInterval: newInterval === currentInterval,
            hasSamePlanKey: currentPlanKey === newPlanKey
        });
        return {
            ...currentPrices,
            resourceCreditPriceId: newEquivalentResourceCreditPrice.stripePriceId
        };
    }
    async computeSubscriptionPricesUpdateByPlan(newPlan, currentPrices) {
        const currentLicensedPrice = await this.billingPriceRepository.findOneOrFail({
            where: {
                stripePriceId: currentPrices.licensedPriceId
            },
            relations: [
                'billingProduct'
            ]
        });
        const currentInterval = currentLicensedPrice.interval;
        const currentPlanKey = currentLicensedPrice.billingProduct?.metadata.planKey;
        (0, _utils.assertIsDefinedOrThrow)(currentPlanKey);
        if (currentPlanKey === newPlan) {
            return currentPrices;
        }
        const billingPricesPerPlanAndIntervalArray = await this.billingProductService.getProductPrices({
            interval: currentInterval,
            planKey: newPlan
        });
        const targetLicensedPrice = (0, _utils.findOrThrow)(billingPricesPerPlanAndIntervalArray, ({ billingProduct })=>billingProduct?.metadata.productKey === _billingproductkeyenum.BillingProductKey.BASE_PRODUCT);
        const currentResourceCreditPrice = await this.billingPriceRepository.findOneOrFail({
            where: {
                stripePriceId: currentPrices.resourceCreditPriceId
            },
            relations: [
                'billingProduct'
            ]
        });
        _billingvalidate.billingValidator.assertIsLicensedResourceCreditPrice(currentResourceCreditPrice);
        const targetResourceCreditPrice = await this.billingPriceService.findEquivalentResourceCreditPrice({
            referencePrice: currentResourceCreditPrice,
            targetInterval: currentInterval,
            targetPlanKey: newPlan,
            hasSameInterval: true,
            hasSamePlanKey: false
        });
        return {
            ...currentPrices,
            licensedPriceId: targetLicensedPrice.stripePriceId,
            resourceCreditPriceId: targetResourceCreditPrice.stripePriceId
        };
    }
    async computeSubscriptionPricesUpdateByInterval(newInterval, currentPrices) {
        const currentLicensedPrice = await this.billingPriceRepository.findOneOrFail({
            where: {
                stripePriceId: currentPrices.licensedPriceId
            },
            relations: [
                'billingProduct'
            ]
        });
        const currentInterval = currentLicensedPrice.interval;
        const currentPlanKey = currentLicensedPrice.billingProduct?.metadata.planKey;
        (0, _utils.assertIsDefinedOrThrow)(currentPlanKey);
        if (currentInterval === newInterval) {
            return currentPrices;
        }
        const billingPricesPerPlanAndIntervalArray = await this.billingProductService.getProductPrices({
            interval: newInterval,
            planKey: currentPlanKey
        });
        const targetLicensedPrice = (0, _utils.findOrThrow)(billingPricesPerPlanAndIntervalArray, ({ billingProduct })=>billingProduct?.metadata.productKey === _billingproductkeyenum.BillingProductKey.BASE_PRODUCT);
        const currentResourceCreditPrice = await this.billingPriceRepository.findOneOrFail({
            where: {
                stripePriceId: currentPrices.resourceCreditPriceId
            },
            relations: [
                'billingProduct'
            ]
        });
        _billingvalidate.billingValidator.assertIsLicensedResourceCreditPrice(currentResourceCreditPrice);
        const targetResourceCreditPrice = await this.billingPriceService.findEquivalentResourceCreditPrice({
            referencePrice: currentResourceCreditPrice,
            targetInterval: newInterval,
            targetPlanKey: currentPlanKey,
            hasSameInterval: false,
            hasSamePlanKey: true
        });
        return {
            ...currentPrices,
            licensedPriceId: targetLicensedPrice.stripePriceId,
            resourceCreditPriceId: targetResourceCreditPrice.stripePriceId
        };
    }
    constructor(stripeSubscriptionService, stripeInvoiceService, billingPriceService, billingProductService, billingPriceRepository, billingSubscriptionItemRepository, billingSubscriptionRepository, stripeSubscriptionScheduleService, billingSubscriptionPhaseService, billingSubscriptionService){
        this.stripeSubscriptionService = stripeSubscriptionService;
        this.stripeInvoiceService = stripeInvoiceService;
        this.billingPriceService = billingPriceService;
        this.billingProductService = billingProductService;
        this.billingPriceRepository = billingPriceRepository;
        this.billingSubscriptionItemRepository = billingSubscriptionItemRepository;
        this.billingSubscriptionRepository = billingSubscriptionRepository;
        this.stripeSubscriptionScheduleService = stripeSubscriptionScheduleService;
        this.billingSubscriptionPhaseService = billingSubscriptionPhaseService;
        this.billingSubscriptionService = billingSubscriptionService;
        this.logger = new _common.Logger(BillingSubscriptionUpdateService.name);
    }
};
BillingSubscriptionUpdateService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(4, (0, _typeorm.InjectRepository)(_billingpriceentity.BillingPriceEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_billingsubscriptionitementity.BillingSubscriptionItemEntity)),
    _ts_param(6, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_billingsubscriptionentity.BillingSubscriptionEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _stripesubscriptionservice.StripeSubscriptionService === "undefined" ? Object : _stripesubscriptionservice.StripeSubscriptionService,
        typeof _stripeinvoiceservice.StripeInvoiceService === "undefined" ? Object : _stripeinvoiceservice.StripeInvoiceService,
        typeof _billingpriceservice.BillingPriceService === "undefined" ? Object : _billingpriceservice.BillingPriceService,
        typeof _billingproductservice.BillingProductService === "undefined" ? Object : _billingproductservice.BillingProductService,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _stripesubscriptionscheduleservice.StripeSubscriptionScheduleService === "undefined" ? Object : _stripesubscriptionscheduleservice.StripeSubscriptionScheduleService,
        typeof _billingsubscriptionphaseservice.BillingSubscriptionPhaseService === "undefined" ? Object : _billingsubscriptionphaseservice.BillingSubscriptionPhaseService,
        typeof _billingsubscriptionservice.BillingSubscriptionService === "undefined" ? Object : _billingsubscriptionservice.BillingSubscriptionService
    ])
], BillingSubscriptionUpdateService);

//# sourceMappingURL=billing-subscription-update.service.js.map