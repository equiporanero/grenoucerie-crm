"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingMessageChannelDeletionCleanupJob", {
    enumerable: true,
    get: function() {
        return MessagingMessageChannelDeletionCleanupJob;
    }
});
const _common = require("@nestjs/common");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagingmessagecleanerservice = require("../services/messaging-message-cleaner.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MessagingMessageChannelDeletionCleanupJob = class MessagingMessageChannelDeletionCleanupJob {
    async handle(data) {
        this.logger.debug(`WorkspaceId: ${data.workspaceId} Cleaning up message channel message associations for channel ${data.messageChannelId}`);
        await this.messageCleanerService.deleteMessageChannelMessageAssociationsByChannelId({
            workspaceId: data.workspaceId,
            messageChannelId: data.messageChannelId
        });
        await this.messageCleanerService.cleanOrphanMessagesAndThreads(data.workspaceId);
    }
    constructor(messageCleanerService){
        this.messageCleanerService = messageCleanerService;
        this.logger = new _common.Logger(MessagingMessageChannelDeletionCleanupJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(MessagingMessageChannelDeletionCleanupJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof MessagingMessageChannelDeletionCleanupJobData === "undefined" ? Object : MessagingMessageChannelDeletionCleanupJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagingMessageChannelDeletionCleanupJob.prototype, "handle", null);
MessagingMessageChannelDeletionCleanupJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.messagingQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagingmessagecleanerservice.MessagingMessageCleanerService === "undefined" ? Object : _messagingmessagecleanerservice.MessagingMessageCleanerService
    ])
], MessagingMessageChannelDeletionCleanupJob);

//# sourceMappingURL=messaging-message-channel-deletion-cleanup.job.js.map