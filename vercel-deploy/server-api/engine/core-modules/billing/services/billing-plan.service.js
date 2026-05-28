/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingPlanService", {
    enumerable: true,
    get: function() {
        return BillingPlanService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _billingexception = require("../billing.exception");
const _billingproductentity = require("../entities/billing-product.entity");
const _billingplankeyenum = require("../enums/billing-plan-key.enum");
const _billingproductkeyenum = require("../enums/billing-product-key.enum");
const _billingusagetypeenum = require("../enums/billing-usage-type.enum");
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
let BillingPlanService = class BillingPlanService {
    async getProductsByProductMetadata({ planKey, priceUsageBased, productKey }) {
        return await this.billingProductRepository.find({
            where: {
                metadata: (0, _typeorm1.JsonContains)({
                    priceUsageBased,
                    planKey,
                    productKey
                }),
                active: true
            },
            relations: [
                'billingPrices'
            ]
        });
    }
    async getPlanBaseProduct(planKey) {
        const [baseProduct] = await this.getProductsByProductMetadata({
            planKey,
            priceUsageBased: _billingusagetypeenum.BillingUsageType.LICENSED,
            productKey: _billingproductkeyenum.BillingProductKey.BASE_PRODUCT
        });
        return baseProduct;
    }
    async listPlans() {
        const planKeys = Object.values(_billingplankeyenum.BillingPlanKey);
        const products = await this.billingProductRepository.find({
            where: {
                active: true,
                billingPrices: {
                    active: true
                }
            },
            relations: [
                'billingPrices.billingProduct'
            ]
        });
        return planKeys.map((planKey)=>{
            const planProducts = products.filter((product)=>product.metadata.planKey === planKey);
            const meteredProducts = planProducts.filter((product)=>product.metadata.priceUsageBased === _billingusagetypeenum.BillingUsageType.METERED);
            const baseProducts = planProducts.filter((product)=>product.metadata.productKey === _billingproductkeyenum.BillingProductKey.BASE_PRODUCT);
            const resourceCreditProducts = planProducts.filter((product)=>product.metadata.productKey === _billingproductkeyenum.BillingProductKey.RESOURCE_CREDIT);
            return {
                planKey,
                meteredProducts,
                baseProducts,
                resourceCreditProducts
            };
        });
    }
    async getPlanByPriceId(stripePriceId) {
        const plans = await this.listPlans();
        return (0, _utils.findOrThrow)(plans, (plan)=>{
            return plan.meteredProducts.some((product)=>product.billingPrices.some((price)=>price.stripePriceId === stripePriceId)) || plan.baseProducts.some((product)=>product.billingPrices.some((price)=>price.stripePriceId === stripePriceId)) || plan.resourceCreditProducts.some((product)=>product.billingPrices.some((price)=>price.stripePriceId === stripePriceId));
        });
    }
    async getPricesPerPlanByInterval({ planKey, interval }) {
        const plans = await this.listPlans();
        const plan = plans.find((plan)=>plan.planKey === planKey);
        if (!plan) {
            throw new _billingexception.BillingException('Billing plan not found', _billingexception.BillingExceptionCode.BILLING_PLAN_NOT_FOUND);
        }
        const { meteredProducts, baseProducts, resourceCreditProducts } = plan;
        const filterPricesByInterval = (product)=>product.billingPrices.filter((price)=>price.interval === interval);
        const meteredProductPrices = meteredProducts.flatMap(filterPricesByInterval);
        const baseProductPrices = baseProducts.flatMap(filterPricesByInterval);
        const resourceCreditProductPrices = resourceCreditProducts.flatMap(filterPricesByInterval);
        return {
            meteredProductPrices,
            baseProductPrices,
            resourceCreditProductPrices
        };
    }
    constructor(billingProductRepository){
        this.billingProductRepository = billingProductRepository;
        this.logger = new _common.Logger(BillingPlanService.name);
    }
};
BillingPlanService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_billingproductentity.BillingProductEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], BillingPlanService);

//# sourceMappingURL=billing-plan.service.js.map