/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StripeSubscriptionService", {
    enumerable: true,
    get: function() {
        return StripeSubscriptionService;
    }
});
const _common = require("@nestjs/common");
const _stripesdkservice = require("../stripe-sdk/services/stripe-sdk.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let StripeSubscriptionService = class StripeSubscriptionService {
    async cancelSubscription(stripeSubscriptionId) {
        await this.stripe.subscriptions.cancel(stripeSubscriptionId);
    }
    async getStripeCustomerIdFromWorkspaceId(workspaceId) {
        const subscription = await this.stripe.subscriptions.search({
            query: `metadata['workspaceId']:'${workspaceId}'`,
            limit: 1
        });
        return subscription.data[0].customer ? subscription.data[0].customer : undefined;
    }
    async collectLastInvoice(stripeSubscriptionId) {
        const subscription = await this.stripe.subscriptions.retrieve(stripeSubscriptionId, {
            expand: [
                'latest_invoice'
            ]
        });
        const latestInvoice = subscription.latest_invoice;
        if (!(latestInvoice && typeof latestInvoice !== 'string' && latestInvoice.status === 'draft')) {
            return;
        }
        await this.stripe.invoices.pay(latestInvoice.id);
    }
    async updateSubscription(stripeSubscriptionId, updateData) {
        return this.stripe.subscriptions.update(stripeSubscriptionId, updateData);
    }
    getBillingThresholds(meterPriceFlatAmount) {
        return {
            amount_gte: Math.max(meterPriceFlatAmount * 2, 10000),
            reset_billing_cycle_anchor: false
        };
    }
    constructor(twentyConfigService, stripeSDKService){
        this.twentyConfigService = twentyConfigService;
        this.stripeSDKService = stripeSDKService;
        this.logger = new _common.Logger(StripeSubscriptionService.name);
        if (!this.twentyConfigService.get('IS_BILLING_ENABLED')) {
            return;
        }
        this.stripe = this.stripeSDKService.getStripe(this.twentyConfigService.get('BILLING_STRIPE_API_KEY'));
    }
};
StripeSubscriptionService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _stripesdkservice.StripeSDKService === "undefined" ? Object : _stripesdkservice.StripeSDKService
    ])
], StripeSubscriptionService);

//# sourceMappingURL=stripe-subscription.service.js.map