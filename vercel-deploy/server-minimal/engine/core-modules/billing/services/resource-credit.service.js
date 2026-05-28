/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ResourceCreditService", {
    enumerable: true,
    get: function() {
        return ResourceCreditService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _billingsubscriptionentity = require("../entities/billing-subscription.entity");
const _billingproductkeyenum = require("../enums/billing-product-key.enum");
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
let ResourceCreditService = class ResourceCreditService {
    extractResourceCreditPricingInfo(subscription) {
        const resourceCreditItem = subscription.billingSubscriptionItems?.find((item)=>item.billingProduct?.metadata?.productKey === _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT);
        if (!(0, _utils.isDefined)(resourceCreditItem)) {
            return null;
        }
        const matchingPrice = resourceCreditItem.billingProduct?.billingPrices?.find((price)=>price.stripePriceId === resourceCreditItem.stripePriceId);
        if (!(0, _utils.isDefined)(matchingPrice)) {
            return null;
        }
        const tierCap = Number(matchingPrice.metadata?.credit_amount ?? 0);
        if (!Number.isFinite(tierCap) || tierCap <= 0) {
            return null;
        }
        return {
            tierCap,
            unitPriceCents: matchingPrice.unitAmount ?? 0
        };
    }
    async getResourceCreditRolloverParameters(workspaceId, subscriptionId) {
        const subscription = await this.billingSubscriptionRepository.findOne(workspaceId, {
            where: {
                id: subscriptionId
            },
            relations: [
                'billingSubscriptionItems',
                'billingSubscriptionItems.billingProduct',
                'billingSubscriptionItems.billingProduct.billingPrices'
            ]
        });
        if (!(0, _utils.isDefined)(subscription)) {
            return null;
        }
        const pricingInfo = this.extractResourceCreditPricingInfo(subscription);
        if (!(0, _utils.isDefined)(pricingInfo)) {
            return null;
        }
        return {
            tierQuantity: pricingInfo.tierCap,
            unitPriceCents: pricingInfo.unitPriceCents
        };
    }
    constructor(billingSubscriptionRepository){
        this.billingSubscriptionRepository = billingSubscriptionRepository;
        this.logger = new _common.Logger(ResourceCreditService.name);
    }
};
ResourceCreditService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_billingsubscriptionentity.BillingSubscriptionEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository
    ])
], ResourceCreditService);

//# sourceMappingURL=resource-credit.service.js.map