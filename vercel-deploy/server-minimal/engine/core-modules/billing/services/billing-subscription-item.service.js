"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingSubscriptionItemService", {
    enumerable: true,
    get: function() {
        return BillingSubscriptionItemService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _datefns = require("date-fns");
const _billingexception = require("../billing.exception");
const _billingsubscriptionitementity = require("../entities/billing-subscription-item.entity");
const _billingproductkeyenum = require("../enums/billing-product-key.enum");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _utils = require("twenty-shared/utils");
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
let BillingSubscriptionItemService = class BillingSubscriptionItemService {
    async getResourceCreditSubscriptionItemDetails(subscription) {
        const item = await this.billingSubscriptionItemRepository.findOne({
            where: {
                billingSubscriptionId: subscription.id,
                billingProduct: {
                    metadata: (0, _typeorm1.Raw)((alias)=>`${alias} @> :metadata::jsonb`, {
                        metadata: JSON.stringify({
                            productKey: _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT
                        })
                    })
                }
            },
            relations: [
                'billingProduct',
                'billingProduct.billingPrices'
            ]
        });
        if (!item) {
            return null;
        }
        const price = this.findMatchingPrice(item);
        const trialDuration = (0, _utils.isDefined)(subscription.trialEnd) && (0, _utils.isDefined)(subscription.trialStart) ? (0, _datefns.differenceInDays)(subscription.trialEnd, subscription.trialStart) : 0;
        const trialWithCreditCardDuration = this.twentyConfigService.get('BILLING_FREE_TRIAL_WITH_CREDIT_CARD_DURATION_IN_DAYS');
        return {
            stripeSubscriptionItemId: item.stripeSubscriptionItemId,
            productKey: _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT,
            creditAmount: Number(price.metadata?.credit_amount ?? 0),
            freeTrialQuantity: this.twentyConfigService.get(trialDuration === trialWithCreditCardDuration ? 'BILLING_FREE_WORKFLOW_CREDITS_FOR_TRIAL_PERIOD_WITH_CREDIT_CARD' : 'BILLING_FREE_WORKFLOW_CREDITS_FOR_TRIAL_PERIOD_WITHOUT_CREDIT_CARD'),
            unitPriceCents: price.unitAmount ?? 0
        };
    }
    findMatchingPrice(item) {
        const matchingPrice = item.billingProduct.billingPrices.find((price)=>price.stripePriceId === item.stripePriceId);
        if (!matchingPrice) {
            throw new _billingexception.BillingException(`Cannot find price for product ${item.stripeProductId}`, _billingexception.BillingExceptionCode.BILLING_PRICE_NOT_FOUND);
        }
        return matchingPrice;
    }
    constructor(billingSubscriptionItemRepository, twentyConfigService){
        this.billingSubscriptionItemRepository = billingSubscriptionItemRepository;
        this.twentyConfigService = twentyConfigService;
    }
};
BillingSubscriptionItemService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_billingsubscriptionitementity.BillingSubscriptionItemEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], BillingSubscriptionItemService);

//# sourceMappingURL=billing-subscription-item.service.js.map