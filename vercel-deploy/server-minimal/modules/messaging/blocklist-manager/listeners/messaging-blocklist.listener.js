"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingBlocklistListener", {
    enumerable: true,
    get: function() {
        return MessagingBlocklistListener;
    }
});
const _common = require("@nestjs/common");
const _messagequeuedecorator = require("../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../engine/core-modules/message-queue/services/message-queue.service");
const _workspaceeventbatchtype = require("../../../../engine/workspace-event-emitter/types/workspace-event-batch.type");
const _messagingblocklistitemdeletemessagesjob = require("../jobs/messaging-blocklist-item-delete-messages.job");
const _messagingblocklistreimportmessagesjob = require("../jobs/messaging-blocklist-reimport-messages.job");
const _ondatabasebatcheventdecorator = require("../../../../engine/api/graphql/graphql-query-runner/decorators/on-database-batch-event.decorator");
const _databaseeventaction = require("../../../../engine/api/graphql/graphql-query-runner/enums/database-event-action");
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
let MessagingBlocklistListener = class MessagingBlocklistListener {
    async handleCreatedEvent(payload) {
        await this.messageQueueService.add(_messagingblocklistitemdeletemessagesjob.BlocklistItemDeleteMessagesJob.name, payload);
    }
    async handleDeletedEvent(payload) {
        await this.messageQueueService.add(_messagingblocklistreimportmessagesjob.BlocklistReimportMessagesJob.name, payload);
    }
    async handleUpdatedEvent(payload) {
        await this.messageQueueService.add(_messagingblocklistitemdeletemessagesjob.BlocklistItemDeleteMessagesJob.name, payload);
        await this.messageQueueService.add(_messagingblocklistreimportmessagesjob.BlocklistReimportMessagesJob.name, payload);
    }
    constructor(messageQueueService){
        this.messageQueueService = messageQueueService;
    }
};
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('blocklist', _databaseeventaction.DatabaseEventAction.CREATED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagingBlocklistListener.prototype, "handleCreatedEvent", null);
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('blocklist', _databaseeventaction.DatabaseEventAction.CREATED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagingBlocklistListener.prototype, "handleDeletedEvent", null);
_ts_decorate([
    (0, _ondatabasebatcheventdecorator.OnDatabaseBatchEvent)('blocklist', _databaseeventaction.DatabaseEventAction.UPDATED),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceeventbatchtype.WorkspaceEventBatch === "undefined" ? Object : _workspaceeventbatchtype.WorkspaceEventBatch
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagingBlocklistListener.prototype, "handleUpdatedEvent", null);
MessagingBlocklistListener = _ts_decorate([
    (0, _common.Injectable)({
        scope: _common.Scope.REQUEST
    }),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.messagingQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], MessagingBlocklistListener);

//# sourceMappingURL=messaging-blocklist.listener.js.map