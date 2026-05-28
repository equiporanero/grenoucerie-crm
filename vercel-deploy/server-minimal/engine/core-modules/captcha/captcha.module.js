"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CaptchaModule", {
    enumerable: true,
    get: function() {
        return CaptchaModule;
    }
});
const _common = require("@nestjs/common");
const _captchadriverfactory = require("./captcha-driver.factory");
const _captchaservice = require("./captcha.service");
const _securehttpclientmodule = require("../secure-http-client/secure-http-client.module");
const _twentyconfigmodule = require("../twenty-config/twenty-config.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CaptchaModule = class CaptchaModule {
    static forRoot() {
        return {
            module: CaptchaModule,
            imports: [
                _twentyconfigmodule.TwentyConfigModule,
                _securehttpclientmodule.SecureHttpClientModule
            ],
            providers: [
                _captchadriverfactory.CaptchaDriverFactory,
                _captchaservice.CaptchaService
            ],
            exports: [
                _captchaservice.CaptchaService
            ]
        };
    }
};
CaptchaModule = _ts_decorate([
    (0, _common.Global)()
], CaptchaModule);

//# sourceMappingURL=captcha.module.js.map