"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingConnectedAccountDeletionCleanupJob", {
    enumerable: true,
    get: function() {
        return MessagingConnectedAccountDeletionCleanupJob;
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
let MessagingConnectedAccountDeletionCleanupJob = class MessagingConnectedAccountDeletionCleanupJob {
    async handle(data) {
        await this.messageCleanerService.cleanOrphanMessagesAndThreads(data.workspaceId);
    }
    constructor(messageCleanerService){
        this.messageCleanerService = messageCleanerService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(MessagingConnectedAccountDeletionCleanupJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof MessagingConnectedAccountDeletionCleanupJobData === "undefined" ? Object : MessagingConnectedAccountDeletionCleanupJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagingConnectedAccountDeletionCleanupJob.prototype, "handle", null);
MessagingConnectedAccountDeletionCleanupJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.messagingQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagingmessagecleanerservice.MessagingMessageCleanerService === "undefined" ? Object : _messagingmessagecleanerservice.MessagingMessageCleanerService
    ])
], MessagingConnectedAccountDeletionCleanupJob);

//# sourceMappingURL=messaging-connected-account-deletion-cleanup.job.js.map