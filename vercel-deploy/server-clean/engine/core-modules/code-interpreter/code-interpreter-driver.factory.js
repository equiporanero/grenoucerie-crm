"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CodeInterpreterDriverFactory", {
    enumerable: true,
    get: function() {
        return CodeInterpreterDriverFactory;
    }
});
const _common = require("@nestjs/common");
const _codeinterpreterinterface = require("./code-interpreter.interface");
const _disableddriver = require("./drivers/disabled.driver");
const _e2bdriver = require("./drivers/e2b.driver");
const _localdriver = require("./drivers/local.driver");
const _nodeenvironmentinterface = require("../twenty-config/interfaces/node-environment.interface");
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
let CodeInterpreterDriverFactory = class CodeInterpreterDriverFactory extends _dynamicfactorybase.DriverFactoryBase {
    buildConfigKey() {
        const driverType = this.twentyConfigService.get('CODE_INTERPRETER_TYPE');
        if (driverType === _codeinterpreterinterface.CodeInterpreterDriverType.E_2_B) {
            return `e2b|${this.configGroupHashService.computeHash(_configvariablesgroupenum.ConfigVariablesGroup.CODE_INTERPRETER_CONFIG)}`;
        }
        return driverType;
    }
    createDriver() {
        const driverType = this.twentyConfigService.get('CODE_INTERPRETER_TYPE');
        const timeoutMs = this.twentyConfigService.get('CODE_INTERPRETER_TIMEOUT_MS');
        switch(driverType){
            case _codeinterpreterinterface.CodeInterpreterDriverType.DISABLED:
                return new _disableddriver.DisabledDriver('Code interpreter is disabled. Set CODE_INTERPRETER_TYPE to LOCAL (development only) or E2B to enable it.');
            case _codeinterpreterinterface.CodeInterpreterDriverType.LOCAL:
                {
                    const nodeEnv = this.twentyConfigService.get('NODE_ENV');
                    if (nodeEnv === _nodeenvironmentinterface.NodeEnvironment.PRODUCTION) {
                        return new _disableddriver.DisabledDriver('LOCAL code interpreter driver is not allowed in production. Use E2B driver instead by setting CODE_INTERPRETER_TYPE=E2B and providing E2B_API_KEY.');
                    }
                    return new _localdriver.LocalDriver({
                        timeoutMs
                    });
                }
            case _codeinterpreterinterface.CodeInterpreterDriverType.E_2_B:
                {
                    const apiKey = this.twentyConfigService.get('E2B_API_KEY');
                    if (!apiKey) {
                        throw new Error('E2B_API_KEY is required when CODE_INTERPRETER_TYPE is E2B');
                    }
                    return new _e2bdriver.E2BDriver({
                        apiKey,
                        timeoutMs
                    });
                }
            default:
                throw new Error(`Invalid code interpreter driver type (${driverType}), check your .env file`);
        }
    }
    constructor(twentyConfigService, configGroupHashService){
        super(twentyConfigService, configGroupHashService);
    }
};
CodeInterpreterDriverFactory = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _configgrouphashservice.ConfigGroupHashService === "undefined" ? Object : _configgrouphashservice.ConfigGroupHashService
    ])
], CodeInterpreterDriverFactory);

//# sourceMappingURL=code-interpreter-driver.factory.js.map