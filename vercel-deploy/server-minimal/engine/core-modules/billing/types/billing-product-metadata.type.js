/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingProductMetadata", {
    enumerable: true,
    get: function() {
        return BillingProductMetadata;
    }
});
const _graphql = require("@nestjs/graphql");
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
let BillingProductMetadata = class BillingProductMetadata {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_billingplankeyenum.BillingPlanKey),
    _ts_metadata("design:type", typeof _billingplankeyenum.BillingPlanKey === "undefined" ? Object : _billingplankeyenum.BillingPlanKey)
], BillingProductMetadata.prototype, "planKey", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_billingusagetypeenum.BillingUsageType),
    _ts_metadata("design:type", typeof _billingusagetypeenum.BillingUsageType === "undefined" ? Object : _billingusagetypeenum.BillingUsageType)
], BillingProductMetadata.prototype, "priceUsageBased", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_billingproductkeyenum.BillingProductKey),
    _ts_metadata("design:type", typeof _billingproductkeyenum.BillingProductKey === "undefined" ? Object : _billingproductkeyenum.BillingProductKey)
], BillingProductMetadata.prototype, "productKey", void 0);
BillingProductMetadata = _ts_decorate([
    (0, _graphql.ObjectType)()
], BillingProductMetadata);

//# sourceMappingURL=billing-product-metadata.type.js.map