"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageQueueCoreModule", {
    enumerable: true,
    get: function() {
        return MessageQueueCoreModule;
    }
});
const _common = require("@nestjs/common");
const _bullmqdriver = require("./drivers/bullmq.driver");
const _syncdriver = require("./drivers/sync.driver");
const _interfaces = require("./interfaces");
const _messagequeueconstants = require("./message-queue.constants");
const _messagequeuemoduledefinition = require("./message-queue.module-definition");
const _messagequeueservice = require("./services/message-queue.service");
const _getqueuetokenutil = require("./utils/get-queue-token.util");
const _metricsmodule = require("../metrics/metrics.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessageQueueCoreModule = class MessageQueueCoreModule extends _messagequeuemoduledefinition.ConfigurableModuleClass {
    static register(options) {
        const dynamicModule = super.register(options);
        const driverProvider = {
            provide: _messagequeueconstants.QUEUE_DRIVER,
            useFactory: ()=>{
                return this.createDriver(options);
            }
        };
        const queueProviders = this.createQueueProviders();
        return {
            ...dynamicModule,
            providers: [
                ...dynamicModule.providers ?? [],
                driverProvider,
                ...queueProviders
            ],
            exports: [
                ...dynamicModule.exports ?? [],
                ...Object.values(_messagequeueconstants.MessageQueue).map((queueName)=>(0, _getqueuetokenutil.getQueueToken)(queueName))
            ]
        };
    }
    static registerAsync(options) {
        const dynamicModule = super.registerAsync(options);
        const driverProvider = {
            provide: _messagequeueconstants.QUEUE_DRIVER,
            // oxlint-disable-next-line @typescripttypescript/no-explicit-any
            useFactory: async (...args)=>{
                if (options.useFactory) {
                    const config = await options.useFactory(...args);
                    return this.createDriver(config);
                }
                throw new Error('useFactory is not defined');
            },
            inject: options.inject || []
        };
        const queueProviders = MessageQueueCoreModule.createQueueProviders();
        return {
            ...dynamicModule,
            imports: [
                ...dynamicModule.imports ?? [],
                _metricsmodule.MetricsModule
            ],
            providers: [
                ...dynamicModule.providers ?? [],
                driverProvider,
                ...queueProviders
            ],
            exports: [
                ...dynamicModule.exports ?? [],
                ...Object.values(_messagequeueconstants.MessageQueue).map((queueName)=>(0, _getqueuetokenutil.getQueueToken)(queueName))
            ]
        };
    }
    static async createDriver(config) {
        switch(config.type){
            case _interfaces.MessageQueueDriverType.BullMQ:
                {
                    return new _bullmqdriver.BullMQDriver(config.options, config.metricsService);
                }
            case _interfaces.MessageQueueDriverType.Sync:
                {
                    return new _syncdriver.SyncDriver();
                }
            default:
                {
                    this.logger.warn(`Unsupported message queue driver type: ${config?.type}. Using SyncDriver by default.`);
                    return new _syncdriver.SyncDriver();
                }
        }
    }
    static createQueueProviders() {
        return Object.values(_messagequeueconstants.MessageQueue).map((queueName)=>({
                provide: (0, _getqueuetokenutil.getQueueToken)(queueName),
                useFactory: (driver)=>{
                    return new _messagequeueservice.MessageQueueService(driver, queueName);
                },
                inject: [
                    _messagequeueconstants.QUEUE_DRIVER
                ]
            }));
    }
};
MessageQueueCoreModule.logger = new _common.Logger(MessageQueueCoreModule.name);
MessageQueueCoreModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({})
], MessageQueueCoreModule);

//# sourceMappingURL=message-queue-core.module.js.map