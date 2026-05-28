/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingPriceLicensedDTO", {
    enumerable: true,
    get: function() {
        return BillingPriceLicensedDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _billingsubscriptionintervalenum = require("../enums/billing-subscription-interval.enum");
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
let BillingPriceLicensedDTO = class BillingPriceLicensedDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_billingsubscriptionintervalenum.SubscriptionInterval),
    _ts_metadata("design:type", typeof _billingsubscriptionintervalenum.SubscriptionInterval === "undefined" ? Object : _billingsubscriptionintervalenum.SubscriptionInterval)
], BillingPriceLicensedDTO.prototype, "recurringInterval", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], BillingPriceLicensedDTO.prototype, "unitAmount", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], BillingPriceLicensedDTO.prototype, "stripePriceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_billingusagetypeenum.BillingUsageType),
    _ts_metadata("design:type", typeof _billingusagetypeenum.BillingUsageType === "undefined" || typeof _billingusagetypeenum.BillingUsageType.LICENSED === "undefined" ? Object : _billingusagetypeenum.BillingUsageType.LICENSED)
], BillingPriceLicensedDTO.prototype, "priceUsageType", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], BillingPriceLicensedDTO.prototype, "creditAmount", void 0);
BillingPriceLicensedDTO = _ts_decorate([
    (0, _graphql.ObjectType)('BillingPriceLicensed')
], BillingPriceLicensedDTO);

//# sourceMappingURL=billing-price-licensed.dto.js.map