"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingResourceCreditUsageDTO", {
    enumerable: true,
    get: function() {
        return BillingResourceCreditUsageDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _billingproductkeyenum = require("../enums/billing-product-key.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingResourceCreditUsageDTO = class BillingResourceCreditUsageDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_billingproductkeyenum.BillingProductKey),
    _ts_metadata("design:type", typeof _billingproductkeyenum.BillingProductKey === "undefined" ? Object : _billingproductkeyenum.BillingProductKey)
], BillingResourceCreditUsageDTO.prototype, "productKey", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingResourceCreditUsageDTO.prototype, "periodStart", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], BillingResourceCreditUsageDTO.prototype, "periodEnd", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float),
    _ts_metadata("design:type", Number)
], BillingResourceCreditUsageDTO.prototype, "usedCredits", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float),
    _ts_metadata("design:type", Number)
], BillingResourceCreditUsageDTO.prototype, "grantedCredits", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float),
    _ts_metadata("design:type", Number)
], BillingResourceCreditUsageDTO.prototype, "rolloverCredits", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float),
    _ts_metadata("design:type", Number)
], BillingResourceCreditUsageDTO.prototype, "totalGrantedCredits", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float),
    _ts_metadata("design:type", Number)
], BillingResourceCreditUsageDTO.prototype, "unitPriceCents", void 0);
BillingResourceCreditUsageDTO = _ts_decorate([
    (0, _graphql.ObjectType)('BillingResourceCreditUsage')
], BillingResourceCreditUsageDTO);

//# sourceMappingURL=billing-resource-credit-usage.dto.js.map