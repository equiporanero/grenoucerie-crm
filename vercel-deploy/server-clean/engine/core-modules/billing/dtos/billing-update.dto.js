/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingUpdateDTO", {
    enumerable: true,
    get: function() {
        return BillingUpdateDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _billingsubscriptionentity = require("../entities/billing-subscription.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingUpdateDTO = class BillingUpdateDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_billingsubscriptionentity.BillingSubscriptionEntity, {
        description: 'Current billing subscription'
    }),
    _ts_metadata("design:type", typeof _billingsubscriptionentity.BillingSubscriptionEntity === "undefined" ? Object : _billingsubscriptionentity.BillingSubscriptionEntity)
], BillingUpdateDTO.prototype, "currentBillingSubscription", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _billingsubscriptionentity.BillingSubscriptionEntity
        ], {
        description: 'All billing subscriptions'
    }),
    _ts_metadata("design:type", Array)
], BillingUpdateDTO.prototype, "billingSubscriptions", void 0);
BillingUpdateDTO = _ts_decorate([
    (0, _graphql.ObjectType)('BillingUpdate')
], BillingUpdateDTO);

//# sourceMappingURL=billing-update.dto.js.map