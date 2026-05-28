"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelWorkspaceSubscriptionDTO", {
    enumerable: true,
    get: function() {
        return AdminPanelWorkspaceSubscriptionDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _adminpanelworkspacesubscriptionitemdto = require("./admin-panel-workspace-subscription-item.dto");
const _billingsubscriptionintervalenum = require("../../billing/enums/billing-subscription-interval.enum");
const _billingsubscriptionstatusenum = require("../../billing/enums/billing-subscription-status.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminPanelWorkspaceSubscriptionDTO = class AdminPanelWorkspaceSubscriptionDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], AdminPanelWorkspaceSubscriptionDTO.prototype, "stripeSubscriptionId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_billingsubscriptionstatusenum.SubscriptionStatus),
    _ts_metadata("design:type", typeof _billingsubscriptionstatusenum.SubscriptionStatus === "undefined" ? Object : _billingsubscriptionstatusenum.SubscriptionStatus)
], AdminPanelWorkspaceSubscriptionDTO.prototype, "status", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_billingsubscriptionintervalenum.SubscriptionInterval, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelWorkspaceSubscriptionDTO.prototype, "interval", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], AdminPanelWorkspaceSubscriptionDTO.prototype, "currency", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelWorkspaceSubscriptionDTO.prototype, "planKey", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AdminPanelWorkspaceSubscriptionDTO.prototype, "currentPeriodStart", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date),
    _ts_metadata("design:type", typeof Date === "undefined" ? Object : Date)
], AdminPanelWorkspaceSubscriptionDTO.prototype, "currentPeriodEnd", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelWorkspaceSubscriptionDTO.prototype, "trialStart", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelWorkspaceSubscriptionDTO.prototype, "trialEnd", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelWorkspaceSubscriptionDTO.prototype, "cancelAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelWorkspaceSubscriptionDTO.prototype, "canceledAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], AdminPanelWorkspaceSubscriptionDTO.prototype, "cancelAtPeriodEnd", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>[
            _adminpanelworkspacesubscriptionitemdto.AdminPanelWorkspaceSubscriptionItemDTO
        ]),
    _ts_metadata("design:type", Array)
], AdminPanelWorkspaceSubscriptionDTO.prototype, "items", void 0);
AdminPanelWorkspaceSubscriptionDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AdminPanelWorkspaceSubscription')
], AdminPanelWorkspaceSubscriptionDTO);

//# sourceMappingURL=admin-panel-workspace-subscription.dto.js.map