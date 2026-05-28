/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceBillingSubscriptionCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceBillingSubscriptionCacheService;
    }
});
const _common = require("@nestjs/common");
const _billingsubscriptionservice = require("./billing-subscription.service");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceBillingSubscriptionCacheService = class WorkspaceBillingSubscriptionCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const subscription = await this.billingSubscriptionService.getCurrentBillingSubscriptionOrThrow({
            workspaceId
        });
        return {
            id: subscription.id,
            workspaceId: subscription.workspaceId,
            stripeCustomerId: subscription.stripeCustomerId,
            stripeSubscriptionId: subscription.stripeSubscriptionId,
            status: subscription.status,
            interval: subscription.interval,
            currency: subscription.currency,
            currentPeriodStart: subscription.currentPeriodStart,
            currentPeriodEnd: subscription.currentPeriodEnd,
            cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
            cancelAt: subscription.cancelAt,
            canceledAt: subscription.canceledAt,
            endedAt: subscription.endedAt,
            trialStart: subscription.trialStart,
            trialEnd: subscription.trialEnd,
            collectionMethod: subscription.collectionMethod
        };
    }
    constructor(billingSubscriptionService){
        super(), this.billingSubscriptionService = billingSubscriptionService;
    }
};
WorkspaceBillingSubscriptionCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('billingSubscription'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _billingsubscriptionservice.BillingSubscriptionService === "undefined" ? Object : _billingsubscriptionservice.BillingSubscriptionService
    ])
], WorkspaceBillingSubscriptionCacheService);

//# sourceMappingURL=workspace-billing-subscription-cache.service.js.map