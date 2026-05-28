"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "messageQueueModuleFactory", {
    enumerable: true,
    get: function() {
        return messageQueueModuleFactory;
    }
});
const _interfaces = require("./interfaces");
const messageQueueModuleFactory = async (_twentyConfigService, redisClientService, metricsService)=>{
    const driverType = _interfaces.MessageQueueDriverType.BullMQ;
    switch(driverType){
        case _interfaces.MessageQueueDriverType.BullMQ:
            {
                return {
                    type: _interfaces.MessageQueueDriverType.BullMQ,
                    options: {
                        connection: redisClientService.getQueueClient()
                    },
                    metricsService
                };
            }
        default:
            throw new Error(`Invalid message queue driver type (${driverType}), check your .env file`);
    }
};

//# sourceMappingURL=message-queue.module-factory.js.map