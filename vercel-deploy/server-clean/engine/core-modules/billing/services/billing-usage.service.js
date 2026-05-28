/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingUsageService", {
    enumerable: true,
    get: function() {
        return BillingUsageService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _datefns = require("date-fns");
const _clickHouseservice = require("../../../../database/clickHouse/clickHouse.service");
const _clickHouseutil = require("../../../../database/clickHouse/clickHouse.util");
const _billingexception = require("../billing.exception");
const _billingcustomerentity = require("../entities/billing-customer.entity");
const _billingsubscriptionentity = require("../entities/billing-subscription.entity");
const _billingproductkeyenum = require("../enums/billing-product-key.enum");
const _billingsubscriptionstatusenum = require("../enums/billing-subscription-status.enum");
const _billingsubscriptionitemservice = require("./billing-subscription-item.service");
const _billingsubscriptionservice = require("./billing-subscription.service");
const _billingusagecapservice = require("./billing-usage-cap.service");
const _buildbillingusageavailablecreditscachekeyutil = require("../utils/build-billing-usage-available-credits-cache-key.util");
const _cachestoragedecorator = require("../../cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../../cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../cache-storage/types/cache-storage-namespace.enum");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _injectworkspacescopedrepositorydecorator = require("../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
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
let BillingUsageService = class BillingUsageService {
    async canFeatureBeUsed(workspaceId) {
        if (!this.twentyConfigService.get('IS_BILLING_ENABLED')) {
            return true;
        }
        const { billingSubscription } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'billingSubscription'
        ]);
        return (0, _utils.isDefined)(billingSubscription) && billingSubscription.status !== _billingsubscriptionstatusenum.SubscriptionStatus.Canceled;
    }
    async getResourceCreditProductUsage(workspace) {
        const subscription = await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
            workspaceId: workspace.id
        });
        const resourceCreditItemDetail = await this.billingSubscriptionItemService.getResourceCreditSubscriptionItemDetails(subscription);
        if (!(0, _utils.isDefined)(resourceCreditItemDetail)) {
            throw new _billingexception.BillingException(`Resource credit item not found for workspace ${workspace.id}`, _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_ITEM_NOT_FOUND);
        }
        const { periodStart, periodEnd } = this.getSubscriptionPeriod(subscription);
        return [
            await this.buildResourceCreditUsage(workspace.id, subscription, resourceCreditItemDetail, periodStart, periodEnd)
        ];
    }
    async buildResourceCreditUsage(workspaceId, subscription, item, periodStart, periodEnd) {
        const usedCredits = await this.getCurrentPeriodCreditsUsed(workspaceId, periodStart);
        const grantedCredits = subscription.status === _billingsubscriptionstatusenum.SubscriptionStatus.Trialing ? item.freeTrialQuantity : item.creditAmount;
        const billingCustomer = await this.billingCustomerRepository.findOne(workspaceId, {
            where: {}
        });
        const rolloverCredits = billingCustomer?.creditBalanceMicro ?? 0;
        return {
            productKey: item.productKey,
            periodStart,
            periodEnd,
            usedCredits,
            grantedCredits,
            rolloverCredits,
            totalGrantedCredits: grantedCredits + rolloverCredits,
            unitPriceCents: item.unitPriceCents
        };
    }
    getSubscriptionPeriod(subscription) {
        const isTrialing = subscription.status === _billingsubscriptionstatusenum.SubscriptionStatus.Trialing && (0, _utils.isDefined)(subscription.trialStart) && (0, _utils.isDefined)(subscription.trialEnd);
        if (isTrialing) {
            return {
                periodStart: subscription.trialStart,
                periodEnd: subscription.trialEnd
            };
        }
        return {
            periodStart: subscription.currentPeriodStart,
            periodEnd: subscription.currentPeriodEnd
        };
    }
    async flushAvailableCreditsFromCache(workspaceId) {
        await this.billingUsageCacheStorage.flushByPattern(`available-credits:${workspaceId}:*`);
    }
    async warmAvailableCreditsInCache(workspaceId, periodStart, periodEnd, availableCredits) {
        const ttlMs = Math.max(new Date(periodEnd).getTime() - Date.now(), 0);
        await this.billingUsageCacheStorage.set((0, _buildbillingusageavailablecreditscachekeyutil.buildBillingUsageAvailableCreditsCacheKey)(workspaceId, periodStart), availableCredits, ttlMs);
    }
    async getAvailableCreditsFromCache(workspaceId, periodStart) {
        return this.billingUsageCacheStorage.get((0, _buildbillingusageavailablecreditscachekeyutil.buildBillingUsageAvailableCreditsCacheKey)(workspaceId, periodStart));
    }
    async getAvailableCreditsFromClickHouse({ workspaceId, currentPeriodStart }) {
        const subscription = await this.billingSubscriptionRepository.findOne(workspaceId, {
            where: {
                currentPeriodStart: new Date(currentPeriodStart)
            },
            relations: [
                'billingSubscriptionItems',
                'billingSubscriptionItems.billingProduct',
                'billingSubscriptionItems.billingProduct.billingPrices'
            ]
        });
        if (!(0, _utils.isDefined)(subscription)) {
            throw new _billingexception.BillingException(`Subscription not found for workspace ${workspaceId}`, _billingexception.BillingExceptionCode.BILLING_SUBSCRIPTION_NOT_FOUND);
        }
        const resourceUsageCap = this.getResourceUsageCap(subscription);
        const { creditBalanceMicro: creditBalance } = await this.billingCustomerRepository.findOneOrFail(workspaceId, {
            select: {
                creditBalanceMicro: true
            },
            where: {}
        });
        const usage = await this.getCurrentPeriodCreditsUsed(subscription.workspaceId, subscription.currentPeriodStart);
        return resourceUsageCap + creditBalance - usage;
    }
    getResourceUsageCap(subscription) {
        const isInFreeTrial = subscription.status === _billingsubscriptionstatusenum.SubscriptionStatus.Trialing;
        if (isInFreeTrial) {
            const trialDuration = (0, _utils.isDefined)(subscription.trialEnd) && (0, _utils.isDefined)(subscription.trialStart) ? (0, _datefns.differenceInDays)(subscription.trialEnd, subscription.trialStart) : 0;
            const trialWithCreditCardDuration = this.twentyConfigService.get('BILLING_FREE_TRIAL_WITH_CREDIT_CARD_DURATION_IN_DAYS');
            return trialDuration === trialWithCreditCardDuration ? this.twentyConfigService.get('BILLING_FREE_WORKFLOW_CREDITS_FOR_TRIAL_PERIOD_WITH_CREDIT_CARD') : this.twentyConfigService.get('BILLING_FREE_WORKFLOW_CREDITS_FOR_TRIAL_PERIOD_WITHOUT_CREDIT_CARD');
        }
        const resourceCreditItem = subscription.billingSubscriptionItems.find((item)=>item.billingProduct.metadata?.productKey === _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT);
        const resourceCreditPrice = resourceCreditItem?.billingProduct.billingPrices.find((price)=>price.stripePriceId === resourceCreditItem.stripePriceId);
        if (!(0, _utils.isDefined)(resourceCreditPrice)) {
            throw new _billingexception.BillingException(`Resource credit price not found for workspace ${subscription.workspaceId}`, _billingexception.BillingExceptionCode.BILLING_PRICE_NOT_FOUND);
        }
        return Number(resourceCreditPrice.metadata?.credit_amount ?? 0);
    }
    async decrementAvailableCreditsInCache({ workspaceId, usedCredits }) {
        const { billingSubscription: { currentPeriodStart, currentPeriodEnd } } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'billingSubscription'
        ]);
        const cachedAvailableCredits = await this.getAvailableCreditsFromCache(workspaceId, currentPeriodStart);
        const availableCredits = (0, _utils.isDefined)(cachedAvailableCredits) ? cachedAvailableCredits : await this.getAvailableCreditsFromClickHouse({
            workspaceId,
            currentPeriodStart
        });
        if (!(0, _utils.isDefined)(cachedAvailableCredits)) {
            await this.warmAvailableCreditsInCache(workspaceId, currentPeriodStart, currentPeriodEnd, availableCredits);
        }
        const decrementedAvailableCredits = await this.billingUsageCacheStorage.incrBy((0, _buildbillingusageavailablecreditscachekeyutil.buildBillingUsageAvailableCreditsCacheKey)(workspaceId, currentPeriodStart), -usedCredits);
        const hasJustReachedCap = availableCredits > 0 && decrementedAvailableCredits <= 0;
        if (hasJustReachedCap) {
            await this.billingUsageCapService.setSubscriptionItemHasReachedCap(workspaceId, true);
        }
        return decrementedAvailableCredits;
    }
    async invalidateAvailableCreditsInCache(workspaceId, periodStart) {
        await this.billingUsageCacheStorage.del((0, _buildbillingusageavailablecreditscachekeyutil.buildBillingUsageAvailableCreditsCacheKey)(workspaceId, periodStart));
    }
    async hasAvailableCredits(workspaceId) {
        if (!this.twentyConfigService.get('IS_BILLING_ENABLED')) {
            return true;
        }
        const { billingSubscription: subscription } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'billingSubscription'
        ]);
        const cached = await this.getAvailableCreditsFromCache(subscription.workspaceId, subscription.currentPeriodStart);
        if ((0, _utils.isDefined)(cached)) {
            return cached > 0;
        }
        const availableCredits = await this.getAvailableCreditsFromClickHouse({
            workspaceId: subscription.workspaceId,
            currentPeriodStart: subscription.currentPeriodStart
        });
        await this.warmAvailableCreditsInCache(subscription.workspaceId, subscription.currentPeriodStart, subscription.currentPeriodEnd, availableCredits);
        return availableCredits > 0;
    }
    async hasAvailableCreditsOrThrow(workspaceId) {
        const hasCredits = await this.hasAvailableCredits(workspaceId);
        if (!hasCredits) {
            throw new _billingexception.BillingException('Credits exhausted', _billingexception.BillingExceptionCode.BILLING_CREDITS_EXHAUSTED);
        }
    }
    async getCurrentPeriodCreditsUsed(workspaceId, periodStart) {
        const query = `
      SELECT sum(creditsUsedMicro) AS total
      FROM usageEvent
      WHERE workspaceId = {workspaceId:String}
        AND periodStart = {periodStart:DateTime64(3)}
    `;
        const rows = await this.clickHouseService.select(query, {
            workspaceId,
            periodStart: (0, _clickHouseutil.formatDateTimeForClickHouse)(periodStart)
        });
        const rawTotal = rows[0]?.total ?? 0;
        const total = typeof rawTotal === 'string' ? Number(rawTotal) : rawTotal;
        return Number.isFinite(total) ? total : 0;
    }
    constructor(billingCustomerRepository, billingSubscriptionService, twentyConfigService, billingSubscriptionItemService, billingUsageCacheStorage, billingSubscriptionRepository, workspaceCacheService, clickHouseService, billingUsageCapService){
        this.billingCustomerRepository = billingCustomerRepository;
        this.billingSubscriptionService = billingSubscriptionService;
        this.twentyConfigService = twentyConfigService;
        this.billingSubscriptionItemService = billingSubscriptionItemService;
        this.billingUsageCacheStorage = billingUsageCacheStorage;
        this.billingSubscriptionRepository = billingSubscriptionRepository;
        this.workspaceCacheService = workspaceCacheService;
        this.clickHouseService = clickHouseService;
        this.billingUsageCapService = billingUsageCapService;
        this.logger = new _common.Logger(BillingUsageService.name);
    }
};
BillingUsageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_billingcustomerentity.BillingCustomerEntity)),
    _ts_param(4, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.EngineBillingUsage)),
    _ts_param(5, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_billingsubscriptionentity.BillingSubscriptionEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _billingsubscriptionservice.BillingSubscriptionService === "undefined" ? Object : _billingsubscriptionservice.BillingSubscriptionService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _billingsubscriptionitemservice.BillingSubscriptionItemService === "undefined" ? Object : _billingsubscriptionitemservice.BillingSubscriptionItemService,
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _clickHouseservice.ClickHouseService === "undefined" ? Object : _clickHouseservice.ClickHouseService,
        typeof _billingusagecapservice.BillingUsageCapService === "undefined" ? Object : _billingusagecapservice.BillingUsageCapService
    ])
], BillingUsageService);

//# sourceMappingURL=billing-usage.service.js.map