/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingCheckoutSessionInput", {
    enumerable: true,
    get: function() {
        return BillingCheckoutSessionInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
const _billingplankeyenum = require("../../enums/billing-plan-key.enum");
const _billingsubscriptionintervalenum = require("../../enums/billing-subscription-interval.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingCheckoutSessionInput = class BillingCheckoutSessionInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_billingsubscriptionintervalenum.SubscriptionInterval),
    (0, _classvalidator.IsEnum)(_billingsubscriptionintervalenum.SubscriptionInterval),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", typeof _billingsubscriptionintervalenum.SubscriptionInterval === "undefined" ? Object : _billingsubscriptionintervalenum.SubscriptionInterval)
], BillingCheckoutSessionInput.prototype, "recurringInterval", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_billingplankeyenum.BillingPlanKey, {
        defaultValue: _billingplankeyenum.BillingPlanKey.PRO
    }),
    (0, _classvalidator.IsEnum)(_billingplankeyenum.BillingPlanKey),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", typeof _billingplankeyenum.BillingPlanKey === "undefined" ? Object : _billingplankeyenum.BillingPlanKey)
], BillingCheckoutSessionInput.prototype, "plan", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        defaultValue: true
    }),
    (0, _classvalidator.IsBoolean)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", Boolean)
], BillingCheckoutSessionInput.prototype, "requirePaymentMethod", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], BillingCheckoutSessionInput.prototype, "successUrlPath", void 0);
BillingCheckoutSessionInput = _ts_decorate([
    (0, _graphql.ArgsType)()
], BillingCheckoutSessionInput);

//# sourceMappingURL=billing-checkout-session.input.js.map