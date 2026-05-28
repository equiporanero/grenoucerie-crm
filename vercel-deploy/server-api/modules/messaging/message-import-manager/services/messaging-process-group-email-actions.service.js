"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingProcessGroupEmailActionsService", {
    enumerable: true,
    get: function() {
        return MessagingProcessGroupEmailActionsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _messagefolderentity = require("../../../../engine/metadata-modules/message-folder/entities/message-folder.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _messagingdeletegroupemailmessagesservice = require("./messaging-delete-group-email-messages.service");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
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
let MessagingProcessGroupEmailActionsService = class MessagingProcessGroupEmailActionsService {
    async markMessageChannelAsPendingGroupEmailsAction(messageChannel, workspaceId, pendingGroupEmailsAction) {
        await this.messageChannelRepository.update({
            id: messageChannel.id,
            workspaceId
        }, {
            pendingGroupEmailsAction
        });
        this.logger.debug(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannel.id} - Marked message channel as pending group emails action: ${pendingGroupEmailsAction}`);
    }
    async processGroupEmailActions(messageChannel, workspaceId) {
        const { pendingGroupEmailsAction } = messageChannel;
        if (!(0, _utils.isDefined)(pendingGroupEmailsAction) || pendingGroupEmailsAction === _types.MessageChannelPendingGroupEmailsAction.NONE) {
            return;
        }
        this.logger.debug(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannel.id} - Processing group email action: ${pendingGroupEmailsAction}`);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        try {
            await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
                switch(pendingGroupEmailsAction){
                    case _types.MessageChannelPendingGroupEmailsAction.GROUP_EMAILS_DELETION:
                        await this.handleGroupEmailsDeletion(workspaceId, messageChannel.id);
                        break;
                    case _types.MessageChannelPendingGroupEmailsAction.GROUP_EMAILS_IMPORT:
                        await this.handleGroupEmailsImport(workspaceId, messageChannel.id);
                        break;
                }
            }, authContext, {
                lite: true
            });
            await this.messageChannelRepository.update({
                id: messageChannel.id,
                workspaceId
            }, {
                pendingGroupEmailsAction: _types.MessageChannelPendingGroupEmailsAction.NONE
            });
            this.logger.debug(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannel.id} - Reset pendingGroupEmailsAction to NONE`);
        } catch (error) {
            this.logger.error(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannel.id} - Error processing group email action: ${error.message}`, error.stack);
            throw error;
        }
    }
    async handleGroupEmailsDeletion(workspaceId, messageChannelId) {
        await this.messagingDeleteGroupEmailMessagesService.deleteGroupEmailMessages(workspaceId, messageChannelId);
        await this.resetCursors(workspaceId, messageChannelId);
        this.logger.debug(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannelId} - Completed GROUP_EMAILS_DELETION action`);
    }
    async handleGroupEmailsImport(workspaceId, messageChannelId) {
        await this.resetCursors(workspaceId, messageChannelId);
        this.logger.debug(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannelId} - Completed GROUP_EMAILS_IMPORT action`);
    }
    async resetCursors(workspaceId, messageChannelId) {
        await this.messageChannelRepository.update({
            id: messageChannelId,
            workspaceId
        }, {
            syncCursor: ''
        });
        await this.messageFolderRepository.update({
            messageChannelId,
            workspaceId
        }, {
            syncCursor: ''
        });
    }
    constructor(globalWorkspaceOrmManager, messageChannelRepository, messageFolderRepository, messagingDeleteGroupEmailMessagesService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageChannelRepository = messageChannelRepository;
        this.messageFolderRepository = messageFolderRepository;
        this.messagingDeleteGroupEmailMessagesService = messagingDeleteGroupEmailMessagesService;
        this.logger = new _common.Logger(MessagingProcessGroupEmailActionsService.name);
    }
};
MessagingProcessGroupEmailActionsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_messagefolderentity.MessageFolderEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagingdeletegroupemailmessagesservice.MessagingDeleteGroupEmailMessagesService === "undefined" ? Object : _messagingdeletegroupemailmessagesservice.MessagingDeleteGroupEmailMessagesService
    ])
], MessagingProcessGroupEmailActionsService);

//# sourceMappingURL=messaging-process-group-email-actions.service.js.map