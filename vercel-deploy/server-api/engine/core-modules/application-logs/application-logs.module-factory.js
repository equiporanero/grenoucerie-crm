"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "applicationLogsModuleFactory", {
    enumerable: true,
    get: function() {
        return applicationLogsModuleFactory;
    }
});
const applicationLogsModuleFactory = async (twentyConfigService)=>{
    const driverType = twentyConfigService.get('APPLICATION_LOG_DRIVER');
    return {
        type: driverType
    };
};

//# sourceMappingURL=application-logs.module-factory.js.map