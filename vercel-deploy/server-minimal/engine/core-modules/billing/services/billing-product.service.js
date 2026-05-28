/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingProductService", {
    enumerable: true,
    get: function() {
        return BillingProductService;
    }
});
const _common = require("@nestjs/common");
const _billingexception = require("../billing.exception");
const _billingplanservice = require("./billing-plan.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingProductService = class BillingProductService {
    async getProductPrices({ interval, planKey }) {
        const billingProducts = await this.getProductsByPlan(planKey);
        return this.getProductPricesByInterval({
            interval,
            billingProductsByPlan: billingProducts
        });
    }
    getProductPricesByInterval({ interval, billingProductsByPlan }) {
        return billingProductsByPlan.flatMap((product)=>product.billingPrices.filter((price)=>price.interval === interval && price.active));
    }
    async getProductsByPlan(planKey) {
        const products = await this.billingPlanService.listPlans();
        const plan = products.find((product)=>product.planKey === planKey);
        if (!plan) {
            throw new _billingexception.BillingException(`Plan ${planKey} not found`, _billingexception.BillingExceptionCode.BILLING_PLAN_NOT_FOUND);
        }
        return [
            ...plan.baseProducts,
            ...plan.resourceCreditProducts,
            ...plan.meteredProducts
        ];
    }
    constructor(billingPlanService){
        this.billingPlanService = billingPlanService;
        this.logger = new _common.Logger(BillingProductService.name);
    }
};
BillingProductService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _billingplanservice.BillingPlanService === "undefined" ? Object : _billingplanservice.BillingPlanService
    ])
], BillingProductService);

//# sourceMappingURL=billing-product.service.js.map