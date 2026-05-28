"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "exceptionHandlerModuleFactory", {
    enumerable: true,
    get: function() {
        return exceptionHandlerModuleFactory;
    }
});
const _nodeenvironmentinterface = require("../twenty-config/interfaces/node-environment.interface");
const _interfaces = require("./interfaces");
const exceptionHandlerModuleFactory = async (twentyConfigService, adapterHost)=>{
    const driverType = twentyConfigService.get('EXCEPTION_HANDLER_DRIVER');
    switch(driverType){
        case _interfaces.ExceptionHandlerDriver.CONSOLE:
            {
                return {
                    type: _interfaces.ExceptionHandlerDriver.CONSOLE
                };
            }
        case _interfaces.ExceptionHandlerDriver.SENTRY:
            {
                return {
                    type: _interfaces.ExceptionHandlerDriver.SENTRY,
                    options: {
                        environment: twentyConfigService.get('SENTRY_ENVIRONMENT'),
                        release: twentyConfigService.get('APP_VERSION'),
                        dsn: twentyConfigService.get('SENTRY_DSN') ?? '',
                        serverInstance: adapterHost.httpAdapter?.getInstance(),
                        debug: twentyConfigService.get('NODE_ENV') === _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT
                    }
                };
            }
        default:
            throw new Error(`Invalid exception capturer driver type (${driverType}), check your .env file`);
    }
};

//# sourceMappingURL=exception-handler.module-factory.js.map