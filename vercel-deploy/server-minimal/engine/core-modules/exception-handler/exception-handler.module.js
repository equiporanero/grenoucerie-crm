"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ExceptionHandlerModule", {
    enumerable: true,
    get: function() {
        return ExceptionHandlerModule;
    }
});
const _common = require("@nestjs/common");
const _consoledriver = require("./drivers/console.driver");
const _sentrydriver = require("./drivers/sentry.driver");
const _exceptionhandlerconstants = require("./exception-handler.constants");
const _exceptionhandlermoduledefinition = require("./exception-handler.module-definition");
const _exceptionhandlerservice = require("./exception-handler.service");
const _httpexceptionhandlerservice = require("./http-exception-handler.service");
const _interfaces = require("./interfaces");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ExceptionHandlerModule = class ExceptionHandlerModule extends _exceptionhandlermoduledefinition.ConfigurableModuleClass {
    static forRoot(options) {
        const provider = {
            provide: _exceptionhandlerconstants.EXCEPTION_HANDLER_DRIVER,
            useValue: options.type === _interfaces.ExceptionHandlerDriver.CONSOLE ? new _consoledriver.ExceptionHandlerConsoleDriver() : new _sentrydriver.ExceptionHandlerSentryDriver()
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
            provide: _exceptionhandlerconstants.EXCEPTION_HANDLER_DRIVER,
            // oxlint-disable-next-line @typescripttypescript/no-explicit-any
            useFactory: async (...args)=>{
                const config = await options?.useFactory?.(...args);
                if (!config) {
                    return null;
                }
                return config.type === _interfaces.ExceptionHandlerDriver.CONSOLE ? new _consoledriver.ExceptionHandlerConsoleDriver() : new _sentrydriver.ExceptionHandlerSentryDriver();
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
ExceptionHandlerModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        providers: [
            _exceptionhandlerservice.ExceptionHandlerService,
            _httpexceptionhandlerservice.HttpExceptionHandlerService
        ],
        exports: [
            _exceptionhandlerservice.ExceptionHandlerService,
            _httpexceptionhandlerservice.HttpExceptionHandlerService
        ]
    })
], ExceptionHandlerModule);

//# sourceMappingURL=exception-handler.module.js.map