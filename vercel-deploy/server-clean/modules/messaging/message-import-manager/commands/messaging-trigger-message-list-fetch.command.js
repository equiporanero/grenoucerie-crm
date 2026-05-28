"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingTriggerMessageListFetchCommand", {
    enumerable: true,
    get: function() {
        return MessagingTriggerMessageListFetchCommand;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nestcommander = require("nest-commander");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _messagequeuedecorator = require("../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../engine/core-modules/message-queue/services/message-queue.service");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _messagingmessagelistfetchjob = require("../jobs/messaging-message-list-fetch.job");
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
let MessagingTriggerMessageListFetchCommand = class MessagingTriggerMessageListFetchCommand extends _nestcommander.CommandRunner {
    async run(_passedParam, options) {
        const { workspaceId, messageChannelId } = options;
        this.logger.log(`Triggering message list fetch for workspace ${workspaceId}${messageChannelId ? ` and channel ${messageChannelId}` : ' (all pending channels)'}`);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageChannels = await this.messageChannelRepository.find({
                where: {
                    isSyncEnabled: true,
                    syncStage: _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_PENDING,
                    ...messageChannelId ? {
                        id: messageChannelId
                    } : {},
                    workspaceId
                }
            });
            if (messageChannels.length === 0) {
                this.logger.warn('No message channels found with MESSAGE_LIST_FETCH_PENDING status');
                return;
            }
            this.logger.log(`Found ${messageChannels.length} message channel(s) to process`);
            for (const messageChannel of messageChannels){
                await this.messageChannelRepository.update({
                    id: messageChannel.id,
                    workspaceId
                }, {
                    syncStage: _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_SCHEDULED,
                    syncStageStartedAt: new Date().toISOString()
                });
                await this.messageQueueService.add(_messagingmessagelistfetchjob.MessagingMessageListFetchJob.name, {
                    messageChannelId: messageChannel.id,
                    workspaceId
                });
                this.logger.log(`Triggered fetch for message channel ${messageChannel.id}`);
            }
            this.logger.log(`Successfully triggered ${messageChannels.length} message list fetch job(s)`);
        }, authContext, {
            lite: true
        });
    }
    parseWorkspaceId(value) {
        return value;
    }
    parseMessageChannelId(value) {
        return value;
    }
    constructor(globalWorkspaceOrmManager, messageChannelRepository, messageQueueService){
        super(), this.globalWorkspaceOrmManager = globalWorkspaceOrmManager, this.messageChannelRepository = messageChannelRepository, this.messageQueueService = messageQueueService, this.logger = new _common.Logger(MessagingTriggerMessageListFetchCommand.name);
    }
};
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-w, --workspace-id <workspace_id>',
        description: 'Workspace ID',
        required: true
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], MessagingTriggerMessageListFetchCommand.prototype, "parseWorkspaceId", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-m, --message-channel-id [message_channel_id]',
        description: 'Message Channel ID (optional - if not provided, triggers for all pending channels)',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], MessagingTriggerMessageListFetchCommand.prototype, "parseMessageChannelId", null);
MessagingTriggerMessageListFetchCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'messaging:trigger-message-list-fetch',
        description: 'Trigger message list fetch immediately without waiting for cron'
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(2, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.messagingQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], MessagingTriggerMessageListFetchCommand);

//# sourceMappingURL=messaging-trigger-message-list-fetch.command.js.map