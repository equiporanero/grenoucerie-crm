/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingPlanDTO", {
    enumerable: true,
    get: function() {
        return BillingPlanDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _billingproductdto = require("./billing-product.dto");
const _billingplankeyenum = require("../enums/billing-plan-key.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingPlanDTO = class BillingPlanDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_billingplankeyenum.BillingPlanKey),
    _ts_metadata("design:type", typeof _billingplankeyenum.BillingPlanKey === "undefined" ? Object : _billingplankeyenum.BillingPlanKey)
], BillingPlanDTO.prototype, "planKey", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _billingproductdto.BillingLicensedProduct
        ]),
    _ts_metadata("design:type", Array)
], BillingPlanDTO.prototype, "baseProducts", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _billingproductdto.BillingLicensedProduct
        ]),
    _ts_metadata("design:type", Array)
], BillingPlanDTO.prototype, "resourceCreditProducts", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _billingproductdto.BillingMeteredProduct
        ]),
    _ts_metadata("design:type", Array)
], BillingPlanDTO.prototype, "meteredProducts", void 0);
BillingPlanDTO = _ts_decorate([
    (0, _graphql.ObjectType)('BillingPlan')
], BillingPlanDTO);

//# sourceMappingURL=billing-plan.dto.js.map