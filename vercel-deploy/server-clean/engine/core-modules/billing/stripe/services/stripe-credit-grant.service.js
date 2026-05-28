/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StripeCreditGrantService", {
    enumerable: true,
    get: function() {
        return StripeCreditGrantService;
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
let StripeCreditGrantService = class StripeCreditGrantService {
    async createCreditGrant({ customerId, creditUnits, unitPriceCents, expiresAt, metadata }) {
        const monetaryAmount = this.convertCreditsToMonetary(creditUnits, unitPriceCents);
        // Add 60 seconds buffer to ensure effective_at is in the future when Stripe processes it
        const effectiveAt = Math.floor(Date.now() / 1000) + 60;
        return this.stripe.billing.creditGrants.create({
            customer: customerId,
            amount: {
                type: 'monetary',
                monetary: {
                    currency: 'usd',
                    value: monetaryAmount
                }
            },
            applicability_config: {
                scope: {
                    price_type: 'metered'
                }
            },
            category: 'promotional',
            effective_at: effectiveAt,
            expires_at: Math.floor(expiresAt.getTime() / 1000),
            name: 'Rollover credits',
            metadata
        });
    }
    async getCustomerCreditBalance(customerId, unitPriceCents) {
        const balance = await this.stripe.billing.creditBalanceSummary.retrieve({
            customer: customerId,
            filter: {
                type: 'applicability_scope',
                applicability_scope: {
                    price_type: 'metered'
                }
            }
        });
        const availableAmount = balance.balances?.[0]?.available_balance?.monetary?.value;
        if (!availableAmount) {
            return 0;
        }
        return this.convertMonetaryToCredits(availableAmount, unitPriceCents);
    }
    async voidCreditGrant(creditGrantId) {
        await this.stripe.billing.creditGrants.voidGrant(creditGrantId);
    }
    async listCreditGrants(customerId) {
        const grants = await this.stripe.billing.creditGrants.list({
            customer: customerId
        });
        return grants.data;
    }
    convertCreditsToMonetary(creditUnits, unitPriceCents) {
        return Math.round(creditUnits * unitPriceCents);
    }
    convertMonetaryToCredits(monetaryAmountCents, unitPriceCents) {
        if (unitPriceCents === 0) {
            return 0;
        }
        return Math.round(monetaryAmountCents / unitPriceCents);
    }
    constructor(twentyConfigService, stripeSDKService){
        this.twentyConfigService = twentyConfigService;
        this.stripeSDKService = stripeSDKService;
        if (!this.twentyConfigService.get('IS_BILLING_ENABLED')) {
            return;
        }
        this.stripe = this.stripeSDKService.getStripe(this.twentyConfigService.get('BILLING_STRIPE_API_KEY'));
    }
};
StripeCreditGrantService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _stripesdkservice.StripeSDKService === "undefined" ? Object : _stripesdkservice.StripeSDKService
    ])
], StripeCreditGrantService);

//# sourceMappingURL=stripe-credit-grant.service.js.map