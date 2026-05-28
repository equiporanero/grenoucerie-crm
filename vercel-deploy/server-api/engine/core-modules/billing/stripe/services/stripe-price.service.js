/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StripePriceService", {
    enumerable: true,
    get: function() {
        return StripePriceService;
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
let StripePriceService = class StripePriceService {
    async getPriceByPriceId(priceId) {
        return await this.stripe.prices.retrieve(priceId, {
            expand: [
                'data.currency_options',
                'data.tiers'
            ]
        });
    }
    async getPricesByProductId(productId) {
        const prices = await this.stripe.prices.list({
            product: productId,
            type: 'recurring',
            limit: 100,
            expand: [
                'data.currency_options',
                'data.tiers'
            ]
        });
        return prices.data;
    }
    constructor(twentyConfigService, stripeSDKService){
        this.twentyConfigService = twentyConfigService;
        this.stripeSDKService = stripeSDKService;
        this.logger = new _common.Logger(StripePriceService.name);
        if (!this.twentyConfigService.get('IS_BILLING_ENABLED')) {
            return;
        }
        this.stripe = this.stripeSDKService.getStripe(this.twentyConfigService.get('BILLING_STRIPE_API_KEY'));
    }
};
StripePriceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _stripesdkservice.StripeSDKService === "undefined" ? Object : _stripesdkservice.StripeSDKService
    ])
], StripePriceService);

//# sourceMappingURL=stripe-price.service.js.map