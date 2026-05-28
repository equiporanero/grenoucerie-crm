"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapSmtpCalDavAPIService", {
    enumerable: true,
    get: function() {
        return ImapSmtpCalDavAPIService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _uuid = require("uuid");
const _createcalendarchannelservice = require("../../../engine/core-modules/auth/services/create-calendar-channel.service");
const _createmessagechannelservice = require("../../../engine/core-modules/auth/services/create-message-channel.service");
const _graphqlerrorsutil = require("../../../engine/core-modules/graphql/utils/graphql-errors.util");
const _messagequeuedecorator = require("../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../engine/core-modules/message-queue/services/message-queue.service");
const _userworkspaceentity = require("../../../engine/core-modules/user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionservice = require("../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.service");
const _messagechannelentity = require("../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _calendareventlistfetchjob = require("../../calendar/calendar-event-import-manager/jobs/calendar-event-list-fetch.job");
const _calendarchannelsyncstatusservice = require("../../calendar/common/services/calendar-channel-sync-status.service");
const _accountstoreconnectservice = require("./accounts-to-reconnect.service");
const _messagechannelsyncstatusservice = require("../../messaging/common/services/message-channel-sync-status.service");
const _syncmessagefoldersservice = require("../../messaging/message-folder-manager/services/sync-message-folders.service");
const _messagingmessagelistfetchjob = require("../../messaging/message-import-manager/jobs/messaging-message-list-fetch.job");
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
let ImapSmtpCalDavAPIService = class ImapSmtpCalDavAPIService {
    async upsertConnectedAccount(input) {
        const { handle, workspaceId, userWorkspaceId } = input;
        const userWorkspace = await this.userWorkspaceRepository.findOne({
            where: {
                id: userWorkspaceId,
                workspaceId
            }
        });
        if (!(0, _utils.isDefined)(userWorkspace)) {
            throw new _graphqlerrorsutil.NotFoundError(`UserWorkspace with id ${userWorkspaceId} not found in workspace ${workspaceId}`);
        }
        const existingAccount = input.existingAccount ?? await this.connectedAccountRepository.findOne({
            where: {
                handle,
                userWorkspaceId,
                workspaceId
            }
        });
        const newOrExistingAccountId = existingAccount?.id ?? (0, _uuid.v4)();
        const existingMessageChannel = existingAccount ? await this.messageChannelRepository.findOne({
            where: {
                connectedAccountId: existingAccount.id,
                workspaceId
            }
        }) : null;
        const existingCalendarChannel = existingAccount ? await this.calendarChannelRepository.findOne({
            where: {
                connectedAccountId: existingAccount.id,
                workspaceId
            }
        }) : null;
        const shouldCreateMessageChannel = !(0, _utils.isDefined)(existingMessageChannel) && Boolean(input.connectionParameters.IMAP);
        const shouldCreateCalendarChannel = !(0, _utils.isDefined)(existingCalendarChannel) && Boolean(input.connectionParameters.CALDAV);
        await this.connectedAccountRepository.manager.transaction(async (transactionManager)=>{
            const encryptedConnectionParameters = this.connectedAccountTokenEncryptionService.encryptConnectionParameters({
                connectionParameters: input.connectionParameters,
                workspaceId
            });
            await transactionManager.getRepository(_connectedaccountentity.ConnectedAccountEntity).save({
                id: newOrExistingAccountId,
                handle,
                provider: _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV,
                connectionParameters: encryptedConnectionParameters,
                userWorkspaceId,
                workspaceId,
                authFailedAt: null
            });
            if (shouldCreateMessageChannel) {
                await this.createMessageChannelService.createMessageChannel({
                    workspaceId,
                    connectedAccountId: newOrExistingAccountId,
                    handle,
                    transactionManager
                });
            }
            if (shouldCreateCalendarChannel) {
                await this.createCalendarChannelService.createCalendarChannel({
                    workspaceId,
                    connectedAccountId: newOrExistingAccountId,
                    handle,
                    transactionManager
                });
            }
        });
        if ((0, _utils.isDefined)(existingAccount)) {
            await this.accountsToReconnectService.removeAccountToReconnect(userWorkspace.userId, workspaceId, newOrExistingAccountId);
        }
        if (shouldCreateMessageChannel) {
            const newMessageChannel = await this.messageChannelRepository.findOne({
                where: {
                    connectedAccountId: newOrExistingAccountId,
                    workspaceId
                },
                relations: [
                    'connectedAccount',
                    'messageFolders'
                ]
            });
            if ((0, _utils.isDefined)(newMessageChannel)) {
                try {
                    await this.syncMessageFoldersService.syncMessageFolders({
                        messageChannel: newMessageChannel,
                        workspaceId
                    });
                } catch (error) {
                    this.logger.warn(`Initial folder sync failed for account ${newOrExistingAccountId}, will retry on next scheduled sync: ${error?.message}`);
                }
            }
        }
        if ((0, _utils.isDefined)(existingMessageChannel) && (0, _utils.isDefined)(input.connectionParameters.IMAP) && existingMessageChannel.syncStage !== _types.MessageChannelSyncStage.PENDING_CONFIGURATION) {
            await this.messagingChannelSyncStatusService.resetAndMarkAsMessagesListFetchPending([
                existingMessageChannel.id
            ], workspaceId);
            await this.messageQueueService.add(_messagingmessagelistfetchjob.MessagingMessageListFetchJob.name, {
                workspaceId,
                messageChannelId: existingMessageChannel.id
            });
        }
        if ((0, _utils.isDefined)(existingCalendarChannel) && (0, _utils.isDefined)(input.connectionParameters.CALDAV) && existingCalendarChannel.syncStage !== _types.CalendarChannelSyncStage.PENDING_CONFIGURATION) {
            await this.calendarChannelSyncStatusService.resetAndMarkAsCalendarEventListFetchPending([
                existingCalendarChannel.id
            ], workspaceId);
            await this.calendarQueueService.add(_calendareventlistfetchjob.CalendarEventListFetchJob.name, {
                workspaceId,
                calendarChannelId: existingCalendarChannel.id
            });
        }
        return newOrExistingAccountId;
    }
    constructor(calendarChannelRepository, connectedAccountRepository, messageChannelRepository, userWorkspaceRepository, messageQueueService, calendarQueueService, createMessageChannelService, createCalendarChannelService, syncMessageFoldersService, accountsToReconnectService, messagingChannelSyncStatusService, calendarChannelSyncStatusService, connectedAccountTokenEncryptionService){
        this.calendarChannelRepository = calendarChannelRepository;
        this.connectedAccountRepository = connectedAccountRepository;
        this.messageChannelRepository = messageChannelRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.messageQueueService = messageQueueService;
        this.calendarQueueService = calendarQueueService;
        this.createMessageChannelService = createMessageChannelService;
        this.createCalendarChannelService = createCalendarChannelService;
        this.syncMessageFoldersService = syncMessageFoldersService;
        this.accountsToReconnectService = accountsToReconnectService;
        this.messagingChannelSyncStatusService = messagingChannelSyncStatusService;
        this.calendarChannelSyncStatusService = calendarChannelSyncStatusService;
        this.connectedAccountTokenEncryptionService = connectedAccountTokenEncryptionService;
        this.logger = new _common.Logger(ImapSmtpCalDavAPIService.name);
    }
};
ImapSmtpCalDavAPIService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_param(4, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.messagingQueue)),
    _ts_param(5, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.calendarQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _createmessagechannelservice.CreateMessageChannelService === "undefined" ? Object : _createmessagechannelservice.CreateMessageChannelService,
        typeof _createcalendarchannelservice.CreateCalendarChannelService === "undefined" ? Object : _createcalendarchannelservice.CreateCalendarChannelService,
        typeof _syncmessagefoldersservice.SyncMessageFoldersService === "undefined" ? Object : _syncmessagefoldersservice.SyncMessageFoldersService,
        typeof _accountstoreconnectservice.AccountsToReconnectService === "undefined" ? Object : _accountstoreconnectservice.AccountsToReconnectService,
        typeof _messagechannelsyncstatusservice.MessageChannelSyncStatusService === "undefined" ? Object : _messagechannelsyncstatusservice.MessageChannelSyncStatusService,
        typeof _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService === "undefined" ? Object : _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService,
        typeof _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService === "undefined" ? Object : _connectedaccounttokenencryptionservice.ConnectedAccountTokenEncryptionService
    ])
], ImapSmtpCalDavAPIService);

//# sourceMappingURL=imap-smtp-caldav-apis.service.js.map