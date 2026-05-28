"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LoggerModule", {
    enumerable: true,
    get: function() {
        return LoggerModule;
    }
});
const _common = require("@nestjs/common");
const _interfaces = require("./interfaces");
const _loggerconstants = require("./logger.constants");
const _loggermoduledefinition = require("./logger.module-definition");
const _loggerservice = require("./logger.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let LoggerModule = class LoggerModule extends _loggermoduledefinition.ConfigurableModuleClass {
    static forRoot(options) {
        const provider = {
            provide: _loggerconstants.LOGGER_DRIVER,
            useValue: options.type === _interfaces.LoggerDriverType.CONSOLE ? new _common.ConsoleLogger() : undefined
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
            provide: _loggerconstants.LOGGER_DRIVER,
            // oxlint-disable-next-line @typescripttypescript/no-explicit-any
            useFactory: async (...args)=>{
                const config = await options?.useFactory?.(...args);
                if (!config) {
                    return null;
                }
                const logLevels = config.logLevels ?? [];
                const logger = config?.type === _interfaces.LoggerDriverType.CONSOLE ? new _common.ConsoleLogger() : undefined;
                logger?.setLogLevels(logLevels);
                return logger;
            },
            inject: options.inject || []
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
};
LoggerModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        providers: [
            _loggerservice.LoggerService
        ],
        exports: [
            _loggerservice.LoggerService
        ]
    })
], LoggerModule);

//# sourceMappingURL=logger.module.js.map