"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TwoFactorAuthenticationVerificationInput", {
    enumerable: true,
    get: function() {
        return TwoFactorAuthenticationVerificationInput;
    }
});
const _graphql = require("@nestjs/graphql");
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TwoFactorAuthenticationVerificationInput = class TwoFactorAuthenticationVerificationInput {
};
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsNotEmpty)(),
    _ts_metadata("design:type", String)
], TwoFactorAuthenticationVerificationInput.prototype, "otp", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String),
    (0, _classvalidator.IsNotEmpty)(),
    (0, _classvalidator.IsString)(),
    _ts_metadata("design:type", String)
], TwoFactorAuthenticationVerificationInput.prototype, "loginToken", void 0);
_ts_decorate([
    (0, _graphql.Field)(()=>String, {
        nullable: true
    }),
    (0, _classvalidator.IsString)(),
    (0, _classvalidator.IsOptional)(),
    _ts_metadata("design:type", String)
], TwoFactorAuthenticationVerificationInput.prototype, "captchaToken", void 0);
TwoFactorAuthenticationVerificationInput = _ts_decorate([
    (0, _graphql.ArgsType)()
], TwoFactorAuthenticationVerificationInput);

//# sourceMappingURL=two-factor-authentication-verification.input.js.map