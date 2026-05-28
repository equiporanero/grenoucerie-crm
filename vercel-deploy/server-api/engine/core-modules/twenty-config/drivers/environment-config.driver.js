"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EnvironmentConfigDriver", {
    enumerable: true,
    get: function() {
        return EnvironmentConfigDriver;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _configvariables = require("../config-variables");
const _configvariablesinstancetokensconstants = require("../constants/config-variables-instance-tokens.constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let EnvironmentConfigDriver = class EnvironmentConfigDriver {
    get(key) {
        return this.configService.get(key, this.defaultConfigVariables[key]);
    }
    constructor(configService, defaultConfigVariables){
        this.configService = configService;
        this.defaultConfigVariables = defaultConfigVariables;
    }
};
EnvironmentConfigDriver = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _common.Inject)(_configvariablesinstancetokensconstants.CONFIG_VARIABLES_INSTANCE_TOKEN)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _config.ConfigService === "undefined" ? Object : _config.ConfigService,
        typeof _configvariables.ConfigVariables === "undefined" ? Object : _configvariables.ConfigVariables
    ])
], EnvironmentConfigDriver);

//# sourceMappingURL=environment-config.driver.js.map