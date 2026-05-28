"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CallWebhookJobsForMetadataJob", {
    enumerable: true,
    get: function() {
        return CallWebhookJobsForMetadataJob;
    }
});
const _lodashchunk = /*#__PURE__*/ _interop_require_default(require("lodash.chunk"));
const _utils = require("twenty-shared/utils");
const _messagequeuedecorator = require("../../../core-modules/message-queue/decorators/message-queue.decorator");
const _processdecorator = require("../../../core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../core-modules/message-queue/services/message-queue.service");
const _callwebhookjob = require("./call-webhook.job");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
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
let CallWebhookJobsForMetadataJob = class CallWebhookJobsForMetadataJob {
    async handle(metadataEventBatch) {
        const eventName = metadataEventBatch.name;
        const metadataName = metadataEventBatch.metadataName;
        const operation = metadataEventBatch.type;
        const operationsToMatch = [
            eventName,
            `metadata.${metadataName}.*`,
            `metadata.*.${operation}`,
            `metadata.*.*`,
            '*.*'
        ];
        const { flatWebhookMaps } = await this.workspaceCacheService.getOrRecompute(metadataEventBatch.workspaceId, [
            'flatWebhookMaps'
        ]);
        const webhooks = Object.values(flatWebhookMaps.byUniversalIdentifier).filter(_utils.isDefined).filter((webhook)=>operationsToMatch.some((operationToMatch)=>webhook.operations.includes(operationToMatch)));
        if (webhooks.length === 0) {
            return;
        }
        const webhookEvents = this.transformMetadataEventBatchToWebhookEvents({
            metadataEventBatch,
            webhooks
        });
        const webhookEventsChunks = (0, _lodashchunk.default)(webhookEvents, WEBHOOK_JOBS_CHUNK_SIZE);
        for (const webhookEventsChunk of webhookEventsChunks){
            await this.messageQueueService.add(_callwebhookjob.CallWebhookJob.name, webhookEventsChunk, {
                retryLimit: 3
            });
        }
    }
    transformMetadataEventBatchToWebhookEvents({ metadataEventBatch, webhooks }) {
        const result = [];
        for (const webhook of webhooks){
            for (const event of metadataEventBatch.events){
                result.push({
                    targetUrl: webhook.targetUrl,
                    eventName: metadataEventBatch.name,
                    workspaceId: metadataEventBatch.workspaceId,
                    webhookId: webhook.id,
                    eventDate: new Date(),
                    userId: metadataEventBatch.userId,
                    apiKeyId: metadataEventBatch.apiKeyId,
                    secret: webhook.secret,
                    event
                });
            }
        }
        return result;
    }
    constructor(messageQueueService, workspaceCacheService){
        this.messageQueueService = messageQueueService;
        this.workspaceCacheService = workspaceCacheService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CallWebhookJobsForMetadataJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof MetadataEventBatch === "undefined" ? Object : MetadataEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], CallWebhookJobsForMetadataJob.prototype, "handle", null);
CallWebhookJobsForMetadataJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.webhookQueue),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.webhookQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], CallWebhookJobsForMetadataJob);

//# sourceMappingURL=call-webhook-jobs-for-metadata.job.js.map