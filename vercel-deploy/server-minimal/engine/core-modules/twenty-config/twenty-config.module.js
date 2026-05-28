"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TwentyConfigModule", {
    enumerable: true,
    get: function() {
        return TwentyConfigModule;
    }
});
const _common = require("@nestjs/common");
const _configvariables = require("./config-variables");
const _configvariablesinstancetokensconstants = require("./constants/config-variables-instance-tokens.constants");
const _databaseconfigmodule = require("./drivers/database-config.module");
const _configgrouphashservice = require("./services/config-group-hash.service");
const _twentyconfigmoduledefinition = require("./twenty-config.module-definition");
const _twentyconfigservice = require("./twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TwentyConfigModule = class TwentyConfigModule extends _twentyconfigmoduledefinition.ConfigurableModuleClass {
    static forRoot() {
        const isConfigVariablesInDbEnabled = process.env.IS_CONFIG_VARIABLES_IN_DB_ENABLED !== 'false';
        const imports = isConfigVariablesInDbEnabled ? [
            _databaseconfigmodule.DatabaseConfigModule.forRoot()
        ] : [];
        return {
            module: TwentyConfigModule,
            imports,
            providers: [
                _twentyconfigservice.TwentyConfigService,
                _configgrouphashservice.ConfigGroupHashService,
                {
                    provide: _configvariablesinstancetokensconstants.CONFIG_VARIABLES_INSTANCE_TOKEN,
                    useValue: new _configvariables.ConfigVariables()
                }
            ],
            exports: [
                _twentyconfigservice.TwentyConfigService,
                _configgrouphashservice.ConfigGroupHashService
            ]
        };
    }
};
TwentyConfigModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({})
], TwentyConfigModule);

//# sourceMappingURL=twenty-config.module.js.map