"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelWorkspaceBillingDTO", {
    enumerable: true,
    get: function() {
        return AdminPanelWorkspaceBillingDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _adminpanelworkspacesubscriptiondto = require("./admin-panel-workspace-subscription.dto");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminPanelWorkspaceBillingDTO = class AdminPanelWorkspaceBillingDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelWorkspaceBillingDTO.prototype, "stripeCustomerId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelWorkspaceBillingDTO.prototype, "creditBalance", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_adminpanelworkspacesubscriptiondto.AdminPanelWorkspaceSubscriptionDTO, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelWorkspaceBillingDTO.prototype, "subscription", void 0);
AdminPanelWorkspaceBillingDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AdminPanelWorkspaceBilling')
], AdminPanelWorkspaceBillingDTO);

//# sourceMappingURL=admin-panel-workspace-billing.dto.js.map