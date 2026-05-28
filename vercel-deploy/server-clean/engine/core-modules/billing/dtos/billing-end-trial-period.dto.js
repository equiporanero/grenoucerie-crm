/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingEndTrialPeriodDTO", {
    enumerable: true,
    get: function() {
        return BillingEndTrialPeriodDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _billingsubscriptionstatusenum = require("../enums/billing-subscription-status.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingEndTrialPeriodDTO = class BillingEndTrialPeriodDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_billingsubscriptionstatusenum.SubscriptionStatus, {
        description: 'Updated subscription status',
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], BillingEndTrialPeriodDTO.prototype, "status", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean, {
        description: 'Boolean that confirms if a payment method was found'
    }),
    _ts_metadata("design:type", Boolean)
], BillingEndTrialPeriodDTO.prototype, "hasPaymentMethod", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        description: 'Billing portal URL for payment method update (returned when no payment method exists)',
        nullable: true
    }),
    _ts_metadata("design:type", String)
], BillingEndTrialPeriodDTO.prototype, "billingPortalUrl", void 0);
BillingEndTrialPeriodDTO = _ts_decorate([
    (0, _graphql.ObjectType)('BillingEndTrialPeriod')
], BillingEndTrialPeriodDTO);

//# sourceMappingURL=billing-end-trial-period.dto.js.map