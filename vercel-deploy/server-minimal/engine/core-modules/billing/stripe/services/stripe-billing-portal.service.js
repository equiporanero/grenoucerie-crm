/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StripeBillingPortalService", {
    enumerable: true,
    get: function() {
        return StripeBillingPortalService;
    }
});
const _common = require("@nestjs/common");
const _stripesdkservice = require("../stripe-sdk/services/stripe-sdk.service");
const _domainserverconfigservice = require("../../../domain/domain-server-config/services/domain-server-config.service");
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
let StripeBillingPortalService = class StripeBillingPortalService {
    async createBillingPortalSession(stripeCustomerId, returnUrl) {
        return await this.stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: returnUrl ?? this.domainServerConfigService.getBaseUrl().toString()
        });
    }
    async createBillingPortalSessionForPaymentMethodUpdate(stripeCustomerId, returnUrl) {
        return await this.stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: returnUrl ?? this.domainServerConfigService.getBaseUrl().toString(),
            flow_data: {
                type: 'payment_method_update'
            }
        });
    }
    constructor(twentyConfigService, domainServerConfigService, stripeSDKService){
        this.twentyConfigService = twentyConfigService;
        this.domainServerConfigService = domainServerConfigService;
        this.stripeSDKService = stripeSDKService;
        this.logger = new _common.Logger(StripeBillingPortalService.name);
        if (!this.twentyConfigService.get('IS_BILLING_ENABLED')) {
            return;
        }
        this.stripe = this.stripeSDKService.getStripe(this.twentyConfigService.get('BILLING_STRIPE_API_KEY'));
    }
};
StripeBillingPortalService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _domainserverconfigservice.DomainServerConfigService === "undefined" ? Object : _domainserverconfigservice.DomainServerConfigService,
        typeof _stripesdkservice.StripeSDKService === "undefined" ? Object : _stripesdkservice.StripeSDKService
    ])
], StripeBillingPortalService);

//# sourceMappingURL=stripe-billing-portal.service.js.map