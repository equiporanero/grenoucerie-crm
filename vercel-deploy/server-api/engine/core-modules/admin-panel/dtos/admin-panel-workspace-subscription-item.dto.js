"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelWorkspaceSubscriptionItemDTO", {
    enumerable: true,
    get: function() {
        return AdminPanelWorkspaceSubscriptionItemDTO;
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
let AdminPanelWorkspaceSubscriptionItemDTO = class AdminPanelWorkspaceSubscriptionItemDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], AdminPanelWorkspaceSubscriptionItemDTO.prototype, "productName", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelWorkspaceSubscriptionItemDTO.prototype, "productKey", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], AdminPanelWorkspaceSubscriptionItemDTO.prototype, "stripePriceId", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelWorkspaceSubscriptionItemDTO.prototype, "quantity", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelWorkspaceSubscriptionItemDTO.prototype, "unitAmount", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>_graphql.Float, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], AdminPanelWorkspaceSubscriptionItemDTO.prototype, "includedCredits", void 0);
AdminPanelWorkspaceSubscriptionItemDTO = _ts_decorate([
    (0, _graphql.ObjectType)('AdminPanelWorkspaceSubscriptionItem')
], AdminPanelWorkspaceSubscriptionItemDTO);

//# sourceMappingURL=admin-panel-workspace-subscription-item.dto.js.map