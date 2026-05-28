"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TotpStrategy", {
    enumerable: true,
    get: function() {
        return TotpStrategy;
    }
});
const _common = require("@nestjs/common");
const _otplib = require("otplib");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _otpconstants = require("../otp.constants");
const _twofactorauthenticationexception = require("../../../two-factor-authentication.exception");
const _totpstrategyconstants = require("./constants/totp.strategy.constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let TotpStrategy = class TotpStrategy {
    initiate(accountName, issuer) {
        const secret = _otplib.authenticator.generateSecret();
        const uri = _otplib.authenticator.keyuri(accountName, issuer, secret);
        return {
            uri,
            context: {
                status: _otpconstants.OTPStatus.PENDING,
                secret
            }
        };
    }
    validate(token, context) {
        const isValid = _otplib.authenticator.check(token, context.secret);
        return {
            isValid,
            context
        };
    }
    constructor(options){
        this.name = _types.TwoFactorAuthenticationStrategy.TOTP;
        let result;
        if ((0, _utils.isDefined)(options)) {
            result = _totpstrategyconstants.TOTP_STRATEGY_CONFIG_SCHEMA.safeParse(options);
            if (!result.success) {
                const errorMessages = Object.entries(result.error.flatten().fieldErrors).map(([key, messages])=>`${key}: ${messages.join(', ')}`).join('; ');
                throw new _twofactorauthenticationexception.TwoFactorAuthenticationException(`Invalid TOTP configuration: ${errorMessages}`, _twofactorauthenticationexception.TwoFactorAuthenticationExceptionCode.INVALID_CONFIGURATION);
            }
        }
    // otplib will use its defaults: sha1, 6 digits, 30 second step, etc.
    }
};
TotpStrategy = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _totpstrategyconstants.TOTPStrategyConfig === "undefined" ? Object : _totpstrategyconstants.TOTPStrategyConfig
    ])
], TotpStrategy);

//# sourceMappingURL=totp.strategy.js.map