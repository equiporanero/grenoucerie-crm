"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetadataEventsToDbListener", {
    enumerable: true,
    get: function() {
        return MetadataEventsToDbListener;
    }
});
const _common = require("@nestjs/common");
const _eventemitter = require("@nestjs/event-emitter");
const _messagequeuedecorator = require("../../core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../core-modules/message-queue/services/message-queue.service");
const _getmetadataflatentitymapskeyutil = require("../../metadata-modules/flat-entity/utils/get-metadata-flat-entity-maps-key.util");
const _callwebhookjobsformetadatajob = require("../../metadata-modules/webhook/jobs/call-webhook-jobs-for-metadata.job");
const _workspacecacheservice = require("../../workspace-cache/services/workspace-cache.service");
const _metadataeventpublisher = require("./metadata-event-publisher");
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
let MetadataEventsToDbListener = class MetadataEventsToDbListener {
    async handleCreate(metadataEventBatch) {
        return this.handleEvent(metadataEventBatch);
    }
    async handleUpdate(metadataEventBatch) {
        return this.handleEvent(metadataEventBatch);
    }
    async handleDelete(metadataEventBatch) {
        return this.handleEvent(metadataEventBatch);
    }
    async handleEvent(metadataEventBatch) {
        await this.webhookQueueService.add(_callwebhookjobsformetadatajob.CallWebhookJobsForMetadataJob.name, metadataEventBatch, {
            retryLimit: 3
        });
        if (metadataEventBatch.events.length > 0) {
            const cacheKeyName = (0, _getmetadataflatentitymapskeyutil.getMetadataFlatEntityMapsKey)(metadataEventBatch.metadataName);
            const cacheHashes = await this.workspaceCacheService.getCacheHashes(metadataEventBatch.workspaceId, [
                cacheKeyName
            ]);
            const updatedCollectionHash = cacheHashes[cacheKeyName];
            await this.metadataEventPublisher.publish({
                ...metadataEventBatch,
                updatedCollectionHash
            });
        }
    }
    constructor(webhookQueueService, metadataEventPublisher, workspaceCacheService){
        this.webhookQueueService = webhookQueueService;
        this.metadataEventPublisher = metadataEventPublisher;
        this.workspaceCacheService = workspaceCacheService;
    }
};
_ts_decorate([
    (0, _eventemitter.OnEvent)('metadata.*.created'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof MetadataEventBatch === "undefined" ? Object : MetadataEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], MetadataEventsToDbListener.prototype, "handleCreate", null);
_ts_decorate([
    (0, _eventemitter.OnEvent)('metadata.*.updated'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof MetadataEventBatch === "undefined" ? Object : MetadataEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], MetadataEventsToDbListener.prototype, "handleUpdate", null);
_ts_decorate([
    (0, _eventemitter.OnEvent)('metadata.*.deleted'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof MetadataEventBatch === "undefined" ? Object : MetadataEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], MetadataEventsToDbListener.prototype, "handleDelete", null);
MetadataEventsToDbListener = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.webhookQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _metadataeventpublisher.MetadataEventPublisher === "undefined" ? Object : _metadataeventpublisher.MetadataEventPublisher,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], MetadataEventsToDbListener);

//# sourceMappingURL=metadata-events-to-db.listener.js.map