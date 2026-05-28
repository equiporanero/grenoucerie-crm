/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingSubscriptionPhaseService", {
    enumerable: true,
    get: function() {
        return BillingSubscriptionPhaseService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _billingpriceentity = require("../entities/billing-price.entity");
const _billingplanservice = require("./billing-plan.service");
const _billingpriceservice = require("./billing-price.service");
const _normalizepricerefutils = require("../utils/normalize-price-ref.utils");
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
let BillingSubscriptionPhaseService = class BillingSubscriptionPhaseService {
    async getDetailsFromPhase(phase) {
        const meteredPrice = await this.billingPriceRepository.findOneOrFail({
            where: {
                stripePriceId: (0, _utils.findOrThrow)(phase.items, ({ quantity })=>!(0, _utils.isDefined)(quantity)).price
            }
        });
        const { quantity, price: licensedItemPriceId } = (0, _utils.findOrThrow)(phase.items, ({ quantity })=>(0, _utils.isDefined)(quantity));
        const licensedPrice = await this.billingPriceRepository.findOneOrFail({
            where: {
                stripePriceId: licensedItemPriceId
            }
        });
        const plan = await this.billingPlanService.getPlanByPriceId(meteredPrice.stripePriceId);
        if (!(0, _utils.isDefined)(quantity)) {
            throw new Error('Quantity is not defined');
        }
        return {
            plan,
            meteredPrice,
            licensedPrice,
            quantity,
            interval: meteredPrice.interval
        };
    }
    toPhaseUpdateParams(phase) {
        return {
            start_date: phase.start_date,
            end_date: phase.end_date ?? undefined,
            items: (phase.items || []).map((it)=>({
                    price: (0, _normalizepricerefutils.normalizePriceRef)(it.price),
                    quantity: it.quantity ?? undefined
                })),
            ...phase.billing_thresholds ? {
                billing_thresholds: phase.billing_thresholds
            } : {},
            proration_behavior: 'none'
        };
    }
    buildPhaseUpdateParams({ toUpdatePrices, startDate, endDate }) {
        return {
            start_date: startDate,
            ...endDate ? {
                end_date: endDate
            } : {},
            proration_behavior: 'none',
            items: [
                {
                    price: toUpdatePrices.licensedPriceId,
                    quantity: toUpdatePrices.seats
                },
                {
                    price: toUpdatePrices.resourceCreditPriceId,
                    quantity: 1
                }
            ]
        };
    }
    getLicensedPriceIdAndQuantityFromPhaseUpdateParams(phase) {
        const licensedItem = (0, _utils.findOrThrow)(phase.items, (i)=>i.quantity != null);
        (0, _utils.assertIsDefinedOrThrow)(licensedItem.price);
        (0, _utils.assertIsDefinedOrThrow)(licensedItem.quantity);
        return {
            price: licensedItem.price,
            quantity: licensedItem.quantity
        };
    }
    async isSamePhaseSignature(a, b) {
        try {
            const phaseALicensedPriceIdAndQuantity = this.getLicensedPriceIdAndQuantityFromPhaseUpdateParams(a);
            const phaseBLicensedPriceIdAndQuantity = this.getLicensedPriceIdAndQuantityFromPhaseUpdateParams(b);
            const phaseAResourceCreditPriceId = this.getResourceCreditPriceIdFromPhaseUpdateParams(a);
            const phaseBResourceCreditPriceId = this.getResourceCreditPriceIdFromPhaseUpdateParams(b);
            return phaseALicensedPriceIdAndQuantity.price === phaseBLicensedPriceIdAndQuantity.price && phaseALicensedPriceIdAndQuantity.quantity === phaseBLicensedPriceIdAndQuantity.quantity && phaseAResourceCreditPriceId === phaseBResourceCreditPriceId;
        } catch  {
            return false;
        }
    }
    async buildResourceCreditPhaseUpdateParams({ basePlanStripePriceId, seats, resourceCreditStripePriceId, startDate, endDate }) {
        return {
            start_date: startDate,
            ...endDate ? {
                end_date: endDate
            } : {},
            proration_behavior: 'none',
            items: [
                {
                    price: basePlanStripePriceId,
                    quantity: seats
                },
                {
                    price: resourceCreditStripePriceId,
                    quantity: 1
                }
            ]
        };
    }
    // Billing V2: compares resource credit Stripe price id between phases
    async isSameResourceCreditPhaseSignature(a, b) {
        try {
            const phaseALicensedPriceIdAndQuantity = this.getLicensedPriceIdAndQuantityFromPhaseUpdateParams(a);
            const phaseBLicensedPriceIdAndQuantity = this.getLicensedPriceIdAndQuantityFromPhaseUpdateParams(b);
            const phaseAResourceCreditPriceId = this.getResourceCreditPriceIdFromPhaseUpdateParams(a);
            const phaseBResourceCreditPriceId = this.getResourceCreditPriceIdFromPhaseUpdateParams(b);
            return phaseALicensedPriceIdAndQuantity.price === phaseBLicensedPriceIdAndQuantity.price && phaseALicensedPriceIdAndQuantity.quantity === phaseBLicensedPriceIdAndQuantity.quantity && phaseAResourceCreditPriceId === phaseBResourceCreditPriceId;
        } catch  {
            return false;
        }
    }
    getResourceCreditPriceIdFromPhaseUpdateParams(phase) {
        const items = phase.items ?? [];
        const licensedPriceIdAndQuantity = this.getLicensedPriceIdAndQuantityFromPhaseUpdateParams(phase);
        const resourceCreditItem = items.find((item)=>item.price !== licensedPriceIdAndQuantity.price && item.quantity === 1);
        if (!resourceCreditItem?.price) {
            throw new Error('Resource credit item not found in V2 phase params');
        }
        return resourceCreditItem.price;
    }
    constructor(billingPriceRepository, billingPlanService, billingPriceService){
        this.billingPriceRepository = billingPriceRepository;
        this.billingPlanService = billingPlanService;
        this.billingPriceService = billingPriceService;
    }
};
BillingSubscriptionPhaseService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_billingpriceentity.BillingPriceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Repository === "undefined" ? Object : Repository,
        typeof _billingplanservice.BillingPlanService === "undefined" ? Object : _billingplanservice.BillingPlanService,
        typeof _billingpriceservice.BillingPriceService === "undefined" ? Object : _billingpriceservice.BillingPriceService
    ])
], BillingSubscriptionPhaseService);

//# sourceMappingURL=billing-subscription-phase.service.js.map