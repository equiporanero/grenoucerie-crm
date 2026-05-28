"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CallWebhookJobsJob", {
    enumerable: true,
    get: function() {
        return CallWebhookJobsJob;
    }
});
const _common = require("@nestjs/common");
const _lodashchunk = /*#__PURE__*/ _interop_require_default(require("lodash.chunk"));
const _utils = require("twenty-shared/utils");
const _messagequeuedecorator = require("../../../core-modules/message-queue/decorators/message-queue.decorator");
const _processdecorator = require("../../../core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../core-modules/message-queue/services/message-queue.service");
const _callwebhookjob = require("./call-webhook.job");
const _transformeventbatchtowebhookevents = require("../utils/transform-event-batch-to-webhook-events");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
const _workspaceeventbatchtype = require("../../../workspace-event-emitter/types/workspace-event-batch.type");
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
const WEBHOOK_JOBS_CHUNK_SIZE = 20;
let CallWebhookJobsJob = class CallWebhookJobsJob {
    async handle(workspaceEventBatch) {
        // If you change that function, double check it does not break Zapier
        // trigger in packages/twenty-zapier/src/triggers/trigger_record.ts
        // Also change the openApi schema for webhooks
        // packages/twenty-server/src/engine/core-modules/open-api/utils/computeWebhooks.utils.ts
        const [nameSingular, operation] = workspaceEventBatch.name.split('.');
        const operationsToMatch = [
            `${nameSingular}.${operation}`,
            `*.${operation}`,
            `${nameSingular}.*`,
            '*.*'
        ];
        const { flatWebhookMaps } = await this.workspaceCacheService.getOrRecompute(workspaceEventBatch.workspaceId, [
            'flatWebhookMaps'
        ]);
        const webhooks = Object.values(flatWebhookMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((webhook)=>operationsToMatch.some((operationToMatch)=>webhook.operations.includes(operationToMatch)));
        const webhookEvents = (0, _transformeventbatchtowebhookevents.transformEventBatchToWebhookEvents)({
            workspaceEventBatch,
            webhooks
        });
        const webhookEventsChunks = (0, _lodashchunk.default)(webhookEvents, WEBHOOK_JOBS_CHUNK_SIZE);
        for (const webhookEventsChunk of webhookEventsChunks){
            await this.messageQueueService.add(_callwebhookjob.CallWebhookJob.name, webhookEventsChunk, {
                retryLimit: 3
            });
        }
    }
    constructor(messageQueueService, workspaceCacheService){
        this.messageQueueService = messageQueueService;
        this.workspaceCacheService = workspaceCacheService;
        this.logger = new _common.Logger(CallWebhookJobsJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CallWebhookJobsJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], CallWebhookJobsJob.prototype, "handle", null);
CallWebhookJobsJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.webhookQueue),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.webhookQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], CallWebhookJobsJob);

//# sourceMappingURL=call-webhook-jobs.job.js.map