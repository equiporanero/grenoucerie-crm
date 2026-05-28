/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingSubscriptionItemDTO", {
    enumerable: true,
    get: function() {
        return BillingSubscriptionItemDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _billingproductdto = require("./billing-product.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingSubscriptionItemDTO = class BillingSubscriptionItemDTO {
};
_ts_decorate([
    (0, _nestjsquerygraphql.IDField)(()=>_scalars.UUIDScalarType),
    _ts_metadata("design:type", String)
], BillingSubscriptionItemDTO.prototype, "id", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], BillingSubscriptionItemDTO.prototype, "hasReachedCurrentPeriodCap", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], BillingSubscriptionItemDTO.prototype, "quantity", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], BillingSubscriptionItemDTO.prototype, "stripePriceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_billingproductdto.BillingProductDTO),
    _ts_metadata("design:type", typeof _billingproductdto.BillingProductDTO === "undefined" ? Object : _billingproductdto.BillingProductDTO)
], BillingSubscriptionItemDTO.prototype, "billingProduct", void 0);
BillingSubscriptionItemDTO = _ts_decorate([
    (0, _graphql.ObjectType)('BillingSubscriptionItem')
], BillingSubscriptionItemDTO);

//# sourceMappingURL=billing-subscription-item.dto.js.map