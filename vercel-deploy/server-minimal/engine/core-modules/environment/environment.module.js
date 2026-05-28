"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EnvironmentModule", {
    enumerable: true,
    get: function() {
        return EnvironmentModule;
    }
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _configvariables = require("../twenty-config/config-variables");
const _configvariablesinstancetokensconstants = require("../twenty-config/constants/config-variables-instance-tokens.constants");
const _environmentconfigdriver = require("../twenty-config/drivers/environment-config.driver");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EnvironmentModule = class EnvironmentModule {
};
EnvironmentModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        imports: [
            _config.ConfigModule.forRoot({
                isGlobal: true,
                expandVariables: true,
                validate: _configvariables.validate,
                envFilePath: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
            })
        ],
        providers: [
            _environmentconfigdriver.EnvironmentConfigDriver,
            {
                provide: _configvariablesinstancetokensconstants.CONFIG_VARIABLES_INSTANCE_TOKEN,
                useValue: new _configvariables.ConfigVariables()
            }
        ],
        exports: [
            _environmentconfigdriver.EnvironmentConfigDriver
        ]
    })
], EnvironmentModule);

//# sourceMappingURL=environment.module.js.map