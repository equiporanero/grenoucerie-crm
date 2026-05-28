"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CaptchaDriverFactory", {
    enumerable: true,
    get: function() {
        return CaptchaDriverFactory;
    }
});
const _common = require("@nestjs/common");
const _googlerecaptchadriver = require("./drivers/google-recaptcha.driver");
const _turnstiledriver = require("./drivers/turnstile.driver");
const _interfaces = require("./interfaces");
const _securehttpclientservice = require("../secure-http-client/secure-http-client.service");
const _dynamicfactorybase = require("../twenty-config/dynamic-factory.base");
const _configvariablesgroupenum = require("../twenty-config/enums/config-variables-group.enum");
const _configgrouphashservice = require("../twenty-config/services/config-group-hash.service");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CaptchaDriverFactory = class CaptchaDriverFactory extends _dynamicfactorybase.DriverFactoryBase {
    buildConfigKey() {
        const driver = this.twentyConfigService.get('CAPTCHA_DRIVER');
        if (!driver) {
            return 'disabled';
        }
        return `${driver}|${this.configGroupHashService.computeHash(_configvariablesgroupenum.ConfigVariablesGroup.CAPTCHA_CONFIG)}`;
    }
    createDriver() {
        const driver = this.twentyConfigService.get('CAPTCHA_DRIVER');
        const siteKey = this.twentyConfigService.get('CAPTCHA_SITE_KEY');
        const secretKey = this.twentyConfigService.get('CAPTCHA_SECRET_KEY');
        if (!driver) {
            return null;
        }
        if (!siteKey || !secretKey) {
            throw new Error('Captcha driver requires site key and secret key');
        }
        const captchaOptions = {
            siteKey,
            secretKey
        };
        switch(driver){
            case _interfaces.CaptchaDriverType.GOOGLE_RECAPTCHA:
                return new _googlerecaptchadriver.GoogleRecaptchaDriver(captchaOptions, this.secureHttpClientService.getHttpClient({
                    baseURL: 'https://www.google.com/recaptcha/api/siteverify'
                }));
            case _interfaces.CaptchaDriverType.TURNSTILE:
                return new _turnstiledriver.TurnstileDriver(captchaOptions, this.secureHttpClientService.getHttpClient({
                    baseURL: 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
                }));
            default:
                throw new Error(`Invalid captcha driver type: ${driver}`);
        }
    }
    getCurrentDriver() {
        const driver = this.twentyConfigService.get('CAPTCHA_DRIVER');
        if (!driver) {
            return null;
        }
        return super.getCurrentDriver();
    }
    constructor(twentyConfigService, configGroupHashService, secureHttpClientService){
        super(twentyConfigService, configGroupHashService), this.secureHttpClientService = secureHttpClientService;
    }
};
CaptchaDriverFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _configgrouphashservice.ConfigGroupHashService === "undefined" ? Object : _configgrouphashservice.ConfigGroupHashService,
        typeof _securehttpclientservice.SecureHttpClientService === "undefined" ? Object : _securehttpclientservice.SecureHttpClientService
    ])
], CaptchaDriverFactory);

//# sourceMappingURL=captcha-driver.factory.js.map