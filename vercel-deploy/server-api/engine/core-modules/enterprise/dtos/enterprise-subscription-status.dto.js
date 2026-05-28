/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EnterpriseSubscriptionStatusDTO", {
    enumerable: true,
    get: function() {
        return EnterpriseSubscriptionStatusDTO;
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
let EnterpriseSubscriptionStatusDTO = class EnterpriseSubscriptionStatusDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    _ts_metadata("design:type", String)
], EnterpriseSubscriptionStatusDTO.prototype, "status", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], EnterpriseSubscriptionStatusDTO.prototype, "licensee", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], EnterpriseSubscriptionStatusDTO.prototype, "expiresAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], EnterpriseSubscriptionStatusDTO.prototype, "cancelAt", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Date, {
        nullable: true
    }),
    _ts_metadata("design:type", Object)
], EnterpriseSubscriptionStatusDTO.prototype, "currentPeriodEnd", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>Boolean),
    _ts_metadata("design:type", Boolean)
], EnterpriseSubscriptionStatusDTO.prototype, "isCancellationScheduled", void 0);
EnterpriseSubscriptionStatusDTO = _ts_decorate([
    (0, _graphql.ObjectType)()
], EnterpriseSubscriptionStatusDTO);

//# sourceMappingURL=enterprise-subscription-status.dto.js.map