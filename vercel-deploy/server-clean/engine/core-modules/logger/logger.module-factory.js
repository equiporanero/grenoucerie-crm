"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "loggerModuleFactory", {
    enumerable: true,
    get: function() {
        return loggerModuleFactory;
    }
});
const _interfaces = require("./interfaces");
const loggerModuleFactory = async (twentyConfigService)=>{
    const driverType = twentyConfigService.get('LOGGER_DRIVER');
    const logLevels = twentyConfigService.get('LOG_LEVELS');
    switch(driverType){
        case _interfaces.LoggerDriverType.CONSOLE:
            {
                return {
                    type: _interfaces.LoggerDriverType.CONSOLE,
                    logLevels: logLevels
                };
            }
        default:
            throw new Error(`Invalid logger driver type (${driverType}), check your .env file`);
    }
};

//# sourceMappingURL=logger.module-factory.js.map