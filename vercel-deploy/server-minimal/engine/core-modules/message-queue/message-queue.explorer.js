"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageQueueExplorer", {
    enumerable: true,
    get: function() {
        return MessageQueueExplorer;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _injector = require("@nestjs/core/injector/injector");
const _exceptionhandlerservice = require("../exception-handler/exception-handler.service");
const _messagequeuemetadataaccessor = require("./message-queue-metadata.accessor");
const _messagequeueworkeroptionsconstant = require("./message-queue-worker-options.constant");
const _getqueuetokenutil = require("./utils/get-queue-token.util");
const _globalexceptionhandlerutil = require("../../utils/global-exception-handler.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MessageQueueExplorer = class MessageQueueExplorer {
    onModuleInit() {
        this.explore();
    }
    explore() {
        const processors = this.discoveryService.getProviders().filter((wrapper)=>this.metadataAccessor.isProcessor(!wrapper.metatype || wrapper.inject ? wrapper.instance?.constructor : wrapper.metatype));
        const groupedProcessors = this.groupProcessorsByQueueName(processors);
        for (const [queueName, processorGroupCollection] of Object.entries(groupedProcessors)){
            const queueToken = (0, _getqueuetokenutil.getQueueToken)(queueName);
            const messageQueueService = this.getQueueService(queueToken);
            this.handleProcessorGroupCollection(processorGroupCollection, messageQueueService, _messagequeueworkeroptionsconstant.QUEUE_WORKER_OPTIONS[queueName]);
        }
    }
    groupProcessorsByQueueName(processors) {
        return processors.reduce((acc, wrapper)=>{
            const { instance, metatype } = wrapper;
            const methodNames = this.metadataScanner.getAllMethodNames(instance);
            const { queueName } = this.metadataAccessor.getProcessorMetadata(instance.constructor || metatype) ?? {};
            const processMethodNames = methodNames.filter((name)=>this.metadataAccessor.isProcess(instance[name]));
            if (!queueName) {
                this.logger.error(`Processor ${wrapper.name} is missing queue name metadata`);
                return acc;
            }
            if (!wrapper.host) {
                this.logger.error(`Processor ${wrapper.name} is missing host metadata`);
                return acc;
            }
            if (!acc[queueName]) {
                acc[queueName] = [];
            }
            acc[queueName].push({
                instance,
                host: wrapper.host,
                processMethodNames,
                isRequestScoped: !wrapper.isDependencyTreeStatic()
            });
            return acc;
        }, {});
    }
    getQueueService(queueToken) {
        try {
            return this.moduleRef.get(queueToken, {
                strict: false
            });
        } catch (err) {
            this.logger.error(`No queue found for token ${queueToken}`);
            throw err;
        }
    }
    handleProcessorGroupCollection(processorGroupCollection, queue, options) {
        queue.work(async (job)=>{
            for (const processorGroup of processorGroupCollection){
                await this.handleProcessor(processorGroup, job);
            }
        }, options);
    }
    async handleProcessor({ instance, host, processMethodNames, isRequestScoped }, job) {
        const filteredProcessMethodNames = processMethodNames.filter((processMethodName)=>{
            const metadata = this.metadataAccessor.getProcessMetadata(// @ts-expect-error legacy noImplicitAny
            instance[processMethodName]);
            return metadata && job.name === metadata.jobName;
        });
        // Return early if no matching methods found
        if (filteredProcessMethodNames.length === 0) {
            return;
        }
        if (isRequestScoped) {
            const contextId = (0, _core.createContextId)();
            if (this.moduleRef.registerRequestByContextId) {
                this.moduleRef.registerRequestByContextId({
                    // Add workspaceId to the request object
                    req: {
                        workspaceId: job.data?.workspaceId
                    }
                }, contextId);
            }
            const contextInstance = await this.injector.loadPerContext(instance, host, host.providers, contextId);
            await this.invokeProcessMethods(contextInstance, filteredProcessMethodNames, job);
        } else {
            await this.invokeProcessMethods(instance, filteredProcessMethodNames, job);
        }
    }
    async invokeProcessMethods(instance, processMethodNames, job) {
        for (const processMethodName of processMethodNames){
            try {
                // @ts-expect-error legacy noImplicitAny
                await instance[processMethodName].call(instance, job.data);
            } catch (err) {
                if ((0, _globalexceptionhandlerutil.shouldCaptureException)(err)) {
                    this.exceptionHandlerService.captureExceptions([
                        err
                    ]);
                }
                throw err;
            }
        }
    }
    constructor(moduleRef, discoveryService, metadataAccessor, metadataScanner, exceptionHandlerService){
        this.moduleRef = moduleRef;
        this.discoveryService = discoveryService;
        this.metadataAccessor = metadataAccessor;
        this.metadataScanner = metadataScanner;
        this.exceptionHandlerService = exceptionHandlerService;
        this.logger = new _common.Logger('MessageQueueModule');
        this.injector = new _injector.Injector();
    }
};
MessageQueueExplorer = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _core.ModuleRef === "undefined" ? Object : _core.ModuleRef,
        typeof _core.DiscoveryService === "undefined" ? Object : _core.DiscoveryService,
        typeof _messagequeuemetadataaccessor.MessageQueueMetadataAccessor === "undefined" ? Object : _messagequeuemetadataaccessor.MessageQueueMetadataAccessor,
        typeof _core.MetadataScanner === "undefined" ? Object : _core.MetadataScanner,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService
    ])
], MessageQueueExplorer);

//# sourceMappingURL=message-queue.explorer.js.map