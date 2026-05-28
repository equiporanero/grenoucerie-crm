"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingResetChannelCommand", {
    enumerable: true,
    get: function() {
        return MessagingResetChannelCommand;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nestcommander = require("nest-commander");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _messagechannelsyncstatusservice = require("../../common/services/message-channel-sync-status.service");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let MessagingResetChannelCommand = class MessagingResetChannelCommand extends _nestcommander.CommandRunner {
    async run(_passedParam, options) {
        const { workspaceId, messageChannelId } = options;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            this.logger.log(`No message channel ID provided, resetting all message channels in workspace ${workspaceId}`);
            const messageChannels = await this.messageChannelRepository.find({
                where: {
                    ...(0, _utils.isDefined)(messageChannelId) ? {
                        id: messageChannelId
                    } : {},
                    workspaceId
                }
            });
            if (messageChannels.length === 0) {
                this.logger.log(`No message channels found in workspace ${workspaceId}`);
                return;
            }
            this.logger.log(`Found ${messageChannels.length} message channels to reset`);
            for (const messageChannel of messageChannels){
                await this.messagingChannelSyncStatusService.resetAndMarkAsMessagesListFetchPending([
                    messageChannel.id
                ], workspaceId);
                await this.messagingMessageCleanerService.cleanOrphanMessagesAndThreads(workspaceId);
            }
            this.logger.log(`Successfully reset all ${messageChannels.length} message channels in workspace ${workspaceId}`);
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
    constructor(globalWorkspaceOrmManager, messageChannelRepository, messagingChannelSyncStatusService, messagingMessageCleanerService){
        super(), this.globalWorkspaceOrmManager = globalWorkspaceOrmManager, this.messageChannelRepository = messageChannelRepository, this.messagingChannelSyncStatusService = messagingChannelSyncStatusService, this.messagingMessageCleanerService = messagingMessageCleanerService, this.logger = new _common.Logger(MessagingResetChannelCommand.name);
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
], MessagingResetChannelCommand.prototype, "parseWorkspaceId", null);
_ts_decorate([
    (0, _nestcommander.Option)({
        flags: '-c, --message-channel-id [message_channel_id]',
        description: 'Message Channel ID (optional - if not provided, all channels will be reset)',
        required: false
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", String)
], MessagingResetChannelCommand.prototype, "parseMessageChannelId", null);
MessagingResetChannelCommand = _ts_decorate([
    (0, _nestcommander.Command)({
        name: 'messaging:reset-channel',
        description: 'Reset message channel(s) for full resync. If no channel ID provided, resets all channels in the workspace.'
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagechannelsyncstatusservice.MessageChannelSyncStatusService === "undefined" ? Object : _messagechannelsyncstatusservice.MessageChannelSyncStatusService,
        typeof _messagingmessagecleanerservice.MessagingMessageCleanerService === "undefined" ? Object : _messagingmessagecleanerservice.MessagingMessageCleanerService
    ])
], MessagingResetChannelCommand);

//# sourceMappingURL=messaging-reset-channel.command.js.map