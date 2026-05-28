"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get BillingSubscriptionSchedulePhaseDTO () {
        return BillingSubscriptionSchedulePhaseDTO;
    },
    get BillingSubscriptionSchedulePhaseItemDTO () {
        return BillingSubscriptionSchedulePhaseItemDTO;
    }
});
const _graphql = require("@nestjs/graphql");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let BillingSubscriptionSchedulePhaseItemDTO = class BillingSubscriptionSchedulePhaseItemDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], BillingSubscriptionSchedulePhaseItemDTO.prototype, "price", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number, {
        nullable: true
    }),
    _ts_metadata("design:type", Number)
], BillingSubscriptionSchedulePhaseItemDTO.prototype, "quantity", void 0);
BillingSubscriptionSchedulePhaseItemDTO = _ts_decorate([
    (0, _graphql.ObjectType)('BillingSubscriptionSchedulePhaseItem')
], BillingSubscriptionSchedulePhaseItemDTO);
let BillingSubscriptionSchedulePhaseDTO = class BillingSubscriptionSchedulePhaseDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], BillingSubscriptionSchedulePhaseDTO.prototype, "start_date", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Number),
    _ts_metadata("design:type", Number)
], BillingSubscriptionSchedulePhaseDTO.prototype, "end_date", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            BillingSubscriptionSchedulePhaseItemDTO
        ]),
    _ts_metadata("design:type", typeof Array === "undefined" ? Object : Array)
], BillingSubscriptionSchedulePhaseDTO.prototype, "items", void 0);
BillingSubscriptionSchedulePhaseDTO = _ts_decorate([
    (0, _graphql.ObjectType)('BillingSubscriptionSchedulePhase')
], BillingSubscriptionSchedulePhaseDTO);

//# sourceMappingURL=billing-subscription-schedule-phase.dto.js.map