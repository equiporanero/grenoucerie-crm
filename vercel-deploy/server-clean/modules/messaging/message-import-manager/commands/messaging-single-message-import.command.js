"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingSingleMessageImportCommand", {
    enumerable: true,
    get: function() {
        return MessagingSingleMessageImportCommand;
    }
});
const _nestcommander = require("nest-commander");
const _messagequeuedecorator = require("../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../engine/core-modules/message-queue/services/message-queue.service");
const _messagingaddsinglemessagetocacheforimportjob = require("../jobs/messaging-add-single-message-to-cache-for-import.job");
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
let MessagingSingleMessageImportCommand = class MessagingSingleMessageImportCommand extends _nestcommander.CommandRunner {
    async run(_passedParam, options) {
        await this.messageQueueService.add(_messagingaddsinglemessagetocacheforimportjob.MessagingAddSingleMessageToCacheForImportJob.name, {
            messageExternalId: options.messageExternalId,
            messageChannelId: options.messageChannelId,
            workspaceId: options.workspaceId
        });
    }
    parseMessageId(value) {
        return value;
    }
    parseMessageChannelId(value) {
        return value;
    }
    parseWorkspaceId(value) {
        return value;
    }
    constructor(messageQueueService){
        super(), this.messageQueueService = messageQueueService;
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-m, --message-external-id [message_external_id]',
        description: 'Message external ID',
        required: true
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], MessagingSingleMessageImportCommand.prototype, "parseMessageId", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-M, --message-channel-id [message_channel_id]',
        description: 'Message channel ID',
        required: true
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], MessagingSingleMessageImportCommand.prototype, "parseMessageChannelId", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-w, --workspace-id [workspace_id]',
        description: 'Workspace ID',
        required: true
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], MessagingSingleMessageImportCommand.prototype, "parseWorkspaceId", null);
MessagingSingleMessageImportCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'messaging:single-message-import',
        description: 'Enqueue a job to schedule the import of a single message'
    }),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.messagingQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], MessagingSingleMessageImportCommand);

//# sourceMappingURL=messaging-single-message-import.command.js.map