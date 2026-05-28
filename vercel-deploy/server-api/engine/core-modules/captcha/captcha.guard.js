"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CaptchaGuard", {
    enumerable: true,
    get: function() {
        return CaptchaGuard;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _captchaexception = require("./captcha.exception");
const _captchaservice = require("./captcha.service");
const _metricsservice = require("../metrics/metrics.service");
const _metricskeystype = require("../metrics/types/metrics-keys.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CaptchaGuard = class CaptchaGuard {
    async canActivate(context) {
        const ctx = _graphql.GqlExecutionContext.create(context);
        const { captchaToken: token } = ctx.getArgs();
        const result = await this.captchaService.validate(token || '');
        if (result.success) {
            return true;
        } else {
            await this.metricsService.incrementCounterForEvent({
                key: _metricskeystype.MetricsKeys.InvalidCaptcha,
                eventId: token || '',
                ...result.error ? {
                    attributes: {
                        error: result.error
                    }
                } : {}
            });
            throw new _captchaexception.CaptchaException('Invalid Captcha, please try another device', _captchaexception.CaptchaExceptionCode.INVALID_CAPTCHA, {
                userFriendlyMessage: /*i18n*/ {
                    id: "tG/2Q/",
                    message: "Invalid Captcha, please try another device"
                }
            });
        }
    }
    constructor(captchaService, metricsService){
        this.captchaService = captchaService;
        this.metricsService = metricsService;
    }
};
CaptchaGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _captchaservice.CaptchaService === "undefined" ? Object : _captchaservice.CaptchaService,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService
    ])
], CaptchaGuard);

//# sourceMappingURL=captcha.guard.js.map