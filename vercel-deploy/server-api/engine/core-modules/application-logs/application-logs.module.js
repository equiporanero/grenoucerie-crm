"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationLogsModule", {
    enumerable: true,
    get: function() {
        return ApplicationLogsModule;
    }
});
const _common = require("@nestjs/common");
const _clickHousemodule = require("../../../database/clickHouse/clickHouse.module");
const _clickHouseservice = require("../../../database/clickHouse/clickHouse.service");
const _applicationlogsconstants = require("./application-logs.constants");
const _applicationlogsmoduledefinition = require("./application-logs.module-definition");
const _applicationlogsservice = require("./application-logs.service");
const _clickhousedriver = require("./drivers/clickhouse.driver");
const _consoledriver = require("./drivers/console.driver");
const _disableddriver = require("./drivers/disabled.driver");
const _applicationlogdriverenum = require("./interfaces/application-log-driver.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApplicationLogsModule = class ApplicationLogsModule extends _applicationlogsmoduledefinition.ConfigurableModuleClass {
    static forRoot(options) {
        const provider = {
            provide: _applicationlogsconstants.APPLICATION_LOG_DRIVER,
            useValue: ApplicationLogsModule.createDriver(options.type)
        };
        const dynamicModule = super.forRoot(options);
        return {
            ...dynamicModule,
            providers: [
                ...dynamicModule.providers ?? [],
                provider
            ]
        };
    }
    static forRootAsync(options) {
        const provider = {
            provide: _applicationlogsconstants.APPLICATION_LOG_DRIVER,
            // oxlint-disable-next-line @typescripttypescript/no-explicit-any
            useFactory: async (clickHouseService, ...args)=>{
                const config = await options?.useFactory?.(...args);
                if (!config) {
                    return new _disableddriver.DisabledApplicationLogDriver();
                }
                return ApplicationLogsModule.createDriver(config.type, clickHouseService);
            },
            inject: [
                _clickHouseservice.ClickHouseService,
                ...options.inject || []
            ]
        };
        const dynamicModule = super.forRootAsync(options);
        return {
            ...dynamicModule,
            providers: [
                ...dynamicModule.providers ?? [],
                provider
            ]
        };
    }
    static createDriver(type, clickHouseService) {
        switch(type){
            case _applicationlogdriverenum.ApplicationLogDriver.CONSOLE:
                return new _consoledriver.ConsoleApplicationLogDriver();
            case _applicationlogdriverenum.ApplicationLogDriver.CLICKHOUSE:
                if (!clickHouseService) {
                    throw new Error('ClickHouseService is required for the ClickHouse application log driver');
                }
                return new _clickhousedriver.ClickHouseApplicationLogDriver(clickHouseService);
            case _applicationlogdriverenum.ApplicationLogDriver.DISABLED:
            default:
                return new _disableddriver.DisabledApplicationLogDriver();
        }
    }
};
ApplicationLogsModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        imports: [
            _clickHousemodule.ClickHouseModule
        ],
        providers: [
            _applicationlogsservice.ApplicationLogsService
        ],
        exports: [
            _applicationlogsservice.ApplicationLogsService
        ]
    })
], ApplicationLogsModule);

//# sourceMappingURL=application-logs.module.js.map