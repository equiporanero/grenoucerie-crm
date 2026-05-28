"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailDriverFactory", {
    enumerable: true,
    get: function() {
        return EmailDriverFactory;
    }
});
const _common = require("@nestjs/common");
const _loggerdriver = require("./drivers/logger.driver");
const _smtpdriver = require("./drivers/smtp.driver");
const _emaildriverenum = require("./enums/email-driver.enum");
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
let EmailDriverFactory = class EmailDriverFactory extends _dynamicfactorybase.DriverFactoryBase {
    buildConfigKey() {
        const driver = this.twentyConfigService.get('EMAIL_DRIVER');
        if (driver === _emaildriverenum.EmailDriver.LOGGER) {
            return 'logger';
        }
        if (driver === _emaildriverenum.EmailDriver.SMTP) {
            const emailConfigHash = this.configGroupHashService.computeHash(_configvariablesgroupenum.ConfigVariablesGroup.EMAIL_SETTINGS);
            return `smtp|${emailConfigHash}`;
        }
        throw new Error(`Unsupported email driver: ${driver}`);
    }
    createDriver() {
        const driver = this.twentyConfigService.get('EMAIL_DRIVER');
        switch(driver){
            case _emaildriverenum.EmailDriver.LOGGER:
                return new _loggerdriver.LoggerDriver();
            case _emaildriverenum.EmailDriver.SMTP:
                {
                    const host = this.twentyConfigService.get('EMAIL_SMTP_HOST');
                    const port = this.twentyConfigService.get('EMAIL_SMTP_PORT');
                    const user = this.twentyConfigService.get('EMAIL_SMTP_USER');
                    const pass = this.twentyConfigService.get('EMAIL_SMTP_PASSWORD');
                    const noTLS = this.twentyConfigService.get('EMAIL_SMTP_NO_TLS');
                    if (!host || !port) {
                        throw new Error('SMTP driver requires host and port to be defined');
                    }
                    const options = {
                        host,
                        port
                    };
                    if (user && pass) {
                        options.auth = {
                            user,
                            pass
                        };
                    }
                    if (noTLS) {
                        options.secure = false;
                        options.ignoreTLS = true;
                    }
                    return new _smtpdriver.SmtpDriver(options);
                }
            default:
                throw new Error(`Invalid email driver: ${driver}`);
        }
    }
    constructor(twentyConfigService, configGroupHashService){
        super(twentyConfigService, configGroupHashService);
    }
};
EmailDriverFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _configgrouphashservice.ConfigGroupHashService === "undefined" ? Object : _configgrouphashservice.ConfigGroupHashService
    ])
], EmailDriverFactory);

//# sourceMappingURL=email-driver.factory.js.map