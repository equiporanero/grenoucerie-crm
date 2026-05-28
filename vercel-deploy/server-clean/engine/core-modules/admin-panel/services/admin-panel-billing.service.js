"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelBillingService", {
    enumerable: true,
    get: function() {
        return AdminPanelBillingService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _billingcustomerentity = require("../../billing/entities/billing-customer.entity");
const _billingpriceentity = require("../../billing/entities/billing-price.entity");
const _billingplankeyenum = require("../../billing/enums/billing-plan-key.enum");
const _billingsubscriptionservice = require("../../billing/services/billing-subscription.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
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
const CREDIT_BALANCE_MICRO_UNIT = 1_000_000;
const KNOWN_PLAN_KEYS = new Set(Object.values(_billingplankeyenum.BillingPlanKey));
let AdminPanelBillingService = class AdminPanelBillingService {
    async getWorkspaceBilling(workspaceId) {
        if (!this.twentyConfigService.get('IS_BILLING_ENABLED')) {
            return null;
        }
        const [customer, subscription] = await Promise.all([
            this.billingCustomerRepository.findOne(workspaceId, {
                where: {}
            }),
            this.billingSubscriptionService.getCurrentBillingSubscription({
                workspaceId
            })
        ]);
        if (!customer && !subscription) {
            return null;
        }
        const stripeCustomerId = customer?.stripeCustomerId ?? subscription?.stripeCustomerId ?? null;
        const creditBalance = customer ? customer.creditBalanceMicro / CREDIT_BALANCE_MICRO_UNIT : null;
        if (!subscription) {
            return {
                stripeCustomerId,
                creditBalance,
                subscription: null
            };
        }
        const items = subscription.billingSubscriptionItems ?? [];
        const priceIds = items.map((item)=>item.stripePriceId);
        const prices = priceIds.length ? await this.billingPriceRepository.find({
            where: {
                stripePriceId: (0, _typeorm1.In)(priceIds)
            }
        }) : [];
        const priceByStripeId = new Map(prices.map((price)=>[
                price.stripePriceId,
                price
            ]));
        const planValue = subscription.metadata?.plan;
        const planKey = typeof planValue === 'string' && KNOWN_PLAN_KEYS.has(planValue) ? planValue : null;
        return {
            stripeCustomerId,
            creditBalance,
            subscription: {
                stripeSubscriptionId: subscription.stripeSubscriptionId,
                status: subscription.status,
                interval: subscription.interval ?? null,
                currency: subscription.currency,
                planKey,
                currentPeriodStart: subscription.currentPeriodStart,
                currentPeriodEnd: subscription.currentPeriodEnd,
                trialStart: subscription.trialStart,
                trialEnd: subscription.trialEnd,
                cancelAt: subscription.cancelAt,
                canceledAt: subscription.canceledAt,
                cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
                items: items.map((item)=>{
                    const price = priceByStripeId.get(item.stripePriceId);
                    const firstTier = price?.tiers?.[0];
                    const productKey = item.billingProduct?.metadata?.productKey;
                    return {
                        productName: item.billingProduct?.name ?? '',
                        productKey: typeof productKey === 'string' ? productKey : null,
                        stripePriceId: item.stripePriceId,
                        quantity: item.quantity != null ? Number(item.quantity) : null,
                        unitAmount: price?.unitAmount != null ? Number(price.unitAmount) : null,
                        includedCredits: typeof firstTier?.up_to === 'number' ? firstTier.up_to : null
                    };
                })
            }
        };
    }
    constructor(billingCustomerRepository, billingPriceRepository, billingSubscriptionService, twentyConfigService){
        this.billingCustomerRepository = billingCustomerRepository;
        this.billingPriceRepository = billingPriceRepository;
        this.billingSubscriptionService = billingSubscriptionService;
        this.twentyConfigService = twentyConfigService;
    }
};
AdminPanelBillingService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_billingcustomerentity.BillingCustomerEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_billingpriceentity.BillingPriceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof _billingsubscriptionservice.BillingSubscriptionService === "undefined" ? Object : _billingsubscriptionservice.BillingSubscriptionService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], AdminPanelBillingService);

//# sourceMappingURL=admin-panel-billing.service.js.map