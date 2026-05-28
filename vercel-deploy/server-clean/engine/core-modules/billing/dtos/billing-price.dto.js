/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingPriceDTO", {
    enumerable: true,
    get: function() {
        return BillingPriceDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _billingsubscriptionintervalenum = require("../enums/billing-subscription-interval.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingPriceDTO = class BillingPriceDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], BillingPriceDTO.prototype, "upTo", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], BillingPriceDTO.prototype, "amount", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], BillingPriceDTO.prototype, "stripePriceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_billingsubscriptionintervalenum.SubscriptionInterval),
    _ts_metadata("design:type", typeof _billingsubscriptionintervalenum.SubscriptionInterval === "undefined" ? Object : _billingsubscriptionintervalenum.SubscriptionInterval)
], BillingPriceDTO.prototype, "recurringInterval", void 0);
BillingPriceDTO = _ts_decorate([
    (0, _graphql.ObjectType)('BillingPrice')
], BillingPriceDTO);

//# sourceMappingURL=billing-price.dto.js.map