"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CallDatabaseEventTriggerJobsJob", {
    enumerable: true,
    get: function() {
        return CallDatabaseEventTriggerJobsJob;
    }
});
const _lodashchunk = /*#__PURE__*/ _interop_require_default(require("lodash.chunk"));
const _utils = require("twenty-shared/utils");
const _messagequeuedecorator = require("../../../../message-queue/decorators/message-queue.decorator");
const _processdecorator = require("../../../../message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../message-queue/services/message-queue.service");
const _transformeventbatchtoeventpayloads = require("./utils/transform-event-batch-to-event-payloads");
const _logicfunctiontriggerjob = require("../../jobs/logic-function-trigger.job");
const _workspacecacheservice = require("../../../../../workspace-cache/services/workspace-cache.service");
const _workspaceeventbatchtype = require("../../../../../workspace-event-emitter/types/workspace-event-batch.type");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
const DATABASE_EVENT_JOBS_CHUNK_SIZE = 20;
let CallDatabaseEventTriggerJobsJob = class CallDatabaseEventTriggerJobsJob {
    async handle(workspaceEventBatch) {
        const { flatLogicFunctionMaps } = await this.workspaceCacheService.getOrRecompute(workspaceEventBatch.workspaceId, [
            'flatLogicFunctionMaps'
        ]);
        const logicFunctionsWithDatabaseEventTrigger = Object.values(flatLogicFunctionMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((logicFunction)=>!(0, _utils.isDefined)(logicFunction.deletedAt) && (0, _utils.isDefined)(logicFunction.databaseEventTriggerSettings));
        const logicFunctionsToTrigger = logicFunctionsWithDatabaseEventTrigger.filter((logicFunction)=>this.shouldTriggerJob({
                workspaceEventBatch,
                eventName: (0, _utils.isDefined)(logicFunction.databaseEventTriggerSettings) ? logicFunction.databaseEventTriggerSettings.eventName : ''
            }));
        const logicFunctionPayloads = (0, _transformeventbatchtoeventpayloads.transformEventBatchToEventPayloads)({
            logicFunctions: logicFunctionsToTrigger,
            workspaceEventBatch
        });
        if (logicFunctionPayloads.length === 0) {
            return;
        }
        const logicFunctionPayloadsChunks = (0, _lodashchunk.default)(logicFunctionPayloads, DATABASE_EVENT_JOBS_CHUNK_SIZE);
        for (const logicFunctionPayloadsChunk of logicFunctionPayloadsChunks){
            await this.messageQueueService.add(_logicfunctiontriggerjob.LogicFunctionTriggerJob.name, logicFunctionPayloadsChunk, {
                retryLimit: 3
            });
        }
    }
    shouldTriggerJob({ workspaceEventBatch, eventName }) {
        const [nameSingular, operation] = workspaceEventBatch.name.split('.');
        const validEventNames = [
            `${nameSingular}.${operation}`,
            `*.${operation}`,
            `${nameSingular}.*`,
            '*.*'
        ];
        return validEventNames.includes(eventName);
    }
    constructor(messageQueueService, workspaceCacheService){
        this.messageQueueService = messageQueueService;
        this.workspaceCacheService = workspaceCacheService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CallDatabaseEventTriggerJobsJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], CallDatabaseEventTriggerJobsJob.prototype, "handle", null);
CallDatabaseEventTriggerJobsJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.triggerQueue),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.logicFunctionQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], CallDatabaseEventTriggerJobsJob);

//# sourceMappingURL=call-database-event-trigger-jobs.job.js.map