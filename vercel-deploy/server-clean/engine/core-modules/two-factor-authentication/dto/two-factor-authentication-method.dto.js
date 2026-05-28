"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TwoFactorAuthenticationMethodSummaryDTO", {
    enumerable: true,
    get: function() {
        return TwoFactorAuthenticationMethodSummaryDTO;
    }
});
const _graphql = require("@nestjs/graphql");
const _scalars = require("../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TwoFactorAuthenticationMethodSummaryDTO = class TwoFactorAuthenticationMethodSummaryDTO {
};
_ts_decorate([
    (0, _graphql.Field)(()=>_scalars.UUIDScalarType, {
        nullable: false
    }),
    _ts_metadata("design:type", String)
], TwoFactorAuthenticationMethodSummaryDTO.prototype, "twoFactorAuthenticationMethodId", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], TwoFactorAuthenticationMethodSummaryDTO.prototype, "status", void 0);
_ts_decorate([
    (0, _graphql.Field)({
        nullable: false
    }),
    _ts_metadata("design:type", String)
], TwoFactorAuthenticationMethodSummaryDTO.prototype, "strategy", void 0);
TwoFactorAuthenticationMethodSummaryDTO = _ts_decorate([
    (0, _graphql.ObjectType)('TwoFactorAuthenticationMethodSummary')
], TwoFactorAuthenticationMethodSummaryDTO);

//# sourceMappingURL=two-factor-authentication-method.dto.js.map