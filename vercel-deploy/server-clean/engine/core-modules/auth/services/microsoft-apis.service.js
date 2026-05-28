"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftAPIsService", {
    enumerable: true,
    get: function() {
        return MicrosoftAPIsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _uuid = require("uuid");
const _typeorm1 = require("typeorm");
const _authexception = require("../auth.exception");
const _createcalendarchannelservice = require("./create-calendar-channel.service");
const _createconnectedaccountservice = require("./create-connected-account.service");
const _createmessagechannelservice = require("./create-message-channel.service");
const _updateconnectedaccountonreconnectservice = require("./update-connected-account-on-reconnect.service");
const _getmicrosoftapisoauthscopes = require("../utils/get-microsoft-apis-oauth-scopes");
const _syncmessagefoldersservice = require("../../../../modules/messaging/message-folder-manager/services/sync-message-folders.service");
const _messagequeuedecorator = require("../../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../message-queue/services/message-queue.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../../metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../../metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../metadata-modules/message-channel/entities/message-channel.entity");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../twenty-orm/utils/build-system-auth-context.util");
const _calendareventlistfetchjob = require("../../../../modules/calendar/calendar-event-import-manager/jobs/calendar-event-list-fetch.job");
const _calendarchannelsyncstatusservice = require("../../../../modules/calendar/common/services/calendar-channel-sync-status.service");
const _emailaliasmanagerservice = require("../../../../modules/connected-account/email-alias-manager/services/email-alias-manager.service");
const _accountstoreconnectservice = require("../../../../modules/connected-account/services/accounts-to-reconnect.service");
const _messagechannelsyncstatusservice = require("../../../../modules/messaging/common/services/message-channel-sync-status.service");
const _messagingmessagelistfetchjob = require("../../../../modules/messaging/message-import-manager/jobs/messaging-message-list-fetch.job");
const _utils = require("twenty-shared/utils");
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
let MicrosoftAPIsService = class MicrosoftAPIsService {
    async refreshMicrosoftRefreshToken(input) {
        const { handle, workspaceId, userId, workspaceMemberId, calendarVisibility, messageVisibility, skipMessageChannelConfiguration } = input;
        const scopes = (0, _getmicrosoftapisoauthscopes.getMicrosoftApisOauthScopes)();
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const userWorkspace = await this.userWorkspaceRepository.findOne({
                where: {
                    userId,
                    workspaceId
                }
            });
            if (!(0, _utils.isDefined)(userWorkspace)) {
                throw new _authexception.AuthException(`User workspace not found for user ${userId} in workspace ${workspaceId}`, _authexception.AuthExceptionCode.INVALID_INPUT);
            }
            const userWorkspaceId = userWorkspace.id;
            const connectedAccount = await this.connectedAccountRepository.findOne({
                where: {
                    handle,
                    userWorkspaceId: userWorkspaceId,
                    workspaceId
                }
            });
            const existingAccountId = connectedAccount?.id;
            const newOrExistingConnectedAccountId = existingAccountId ?? (0, _uuid.v4)();
            const existingMessageChannels = await this.messageChannelRepository.find({
                where: {
                    connectedAccountId: newOrExistingConnectedAccountId,
                    workspaceId
                }
            });
            const existingCalendarChannels = await this.calendarChannelRepository.find({
                where: {
                    connectedAccountId: newOrExistingConnectedAccountId,
                    workspaceId
                }
            });
            await this.messageChannelRepository.manager.transaction(async (transactionManager)=>{
                await this.createConnectedAccountService.createConnectedAccount({
                    workspaceId,
                    connectedAccountId: newOrExistingConnectedAccountId,
                    handle,
                    provider: _types.ConnectedAccountProvider.MICROSOFT,
                    accessToken: input.accessToken,
                    refreshToken: input.refreshToken,
                    accountOwnerId: workspaceMemberId,
                    scopes,
                    transactionManager
                });
                if (existingAccountId) {
                    await this.updateConnectedAccountOnReconnectService.updateConnectedAccountOnReconnect({
                        workspaceId,
                        connectedAccountId: newOrExistingConnectedAccountId,
                        accessToken: input.accessToken,
                        refreshToken: input.refreshToken,
                        scopes,
                        transactionManager
                    });
                    await this.accountsToReconnectService.removeAccountToReconnect(userId, workspaceId, newOrExistingConnectedAccountId);
                    await this.messagingChannelSyncStatusService.resetAndMarkAsMessagesListFetchPending([
                        newOrExistingConnectedAccountId
                    ], workspaceId);
                    await this.calendarChannelSyncStatusService.resetAndMarkAsCalendarEventListFetchPending([
                        newOrExistingConnectedAccountId
                    ], workspaceId);
                }
                if (this.twentyConfigService.get('MESSAGING_PROVIDER_MICROSOFT_ENABLED') && existingMessageChannels.length === 0) {
                    await this.createMessageChannelService.createMessageChannel({
                        workspaceId,
                        connectedAccountId: newOrExistingConnectedAccountId,
                        handle,
                        messageVisibility,
                        skipMessageChannelConfiguration,
                        transactionManager
                    });
                }
                if (this.twentyConfigService.get('CALENDAR_PROVIDER_MICROSOFT_ENABLED') && existingCalendarChannels.length === 0) {
                    await this.createCalendarChannelService.createCalendarChannel({
                        workspaceId,
                        connectedAccountId: newOrExistingConnectedAccountId,
                        handle,
                        calendarVisibility,
                        skipMessageChannelConfiguration,
                        transactionManager
                    });
                }
            });
            if (this.twentyConfigService.get('MESSAGING_PROVIDER_MICROSOFT_ENABLED')) {
                const connectedAccountForAliases = await this.connectedAccountRepository.findOne({
                    where: {
                        id: newOrExistingConnectedAccountId,
                        workspaceId
                    }
                });
                if ((0, _utils.isDefined)(connectedAccountForAliases)) {
                    await this.emailAliasManagerService.refreshHandleAliases(connectedAccountForAliases, workspaceId);
                }
            }
            if (this.twentyConfigService.get('MESSAGING_PROVIDER_MICROSOFT_ENABLED') && existingMessageChannels.length === 0) {
                const newMessageChannel = await this.messageChannelRepository.findOne({
                    where: {
                        connectedAccountId: newOrExistingConnectedAccountId,
                        workspaceId
                    },
                    relations: [
                        'connectedAccount',
                        'messageFolders'
                    ]
                });
                if ((0, _utils.isDefined)(newMessageChannel)) {
                    await this.syncMessageFoldersService.syncMessageFolders({
                        messageChannel: newMessageChannel,
                        workspaceId
                    });
                }
            }
            if (this.twentyConfigService.get('MESSAGING_PROVIDER_MICROSOFT_ENABLED')) {
                const messageChannels = await this.messageChannelRepository.find({
                    where: {
                        connectedAccountId: newOrExistingConnectedAccountId,
                        workspaceId
                    }
                });
                for (const messageChannel of messageChannels){
                    if (messageChannel.syncStage !== _types.MessageChannelSyncStage.PENDING_CONFIGURATION) {
                        await this.messageQueueService.add(_messagingmessagelistfetchjob.MessagingMessageListFetchJob.name, {
                            workspaceId,
                            messageChannelId: messageChannel.id
                        });
                    }
                }
            }
            if (this.twentyConfigService.get('CALENDAR_PROVIDER_MICROSOFT_ENABLED')) {
                const calendarChannels = await this.calendarChannelRepository.find({
                    where: {
                        connectedAccountId: newOrExistingConnectedAccountId,
                        workspaceId
                    }
                });
                for (const calendarChannel of calendarChannels){
                    if (calendarChannel.syncStage !== _types.CalendarChannelSyncStage.PENDING_CONFIGURATION) {
                        await this.calendarQueueService.add(_calendareventlistfetchjob.CalendarEventListFetchJob.name, {
                            calendarChannelId: calendarChannel.id,
                            workspaceId
                        });
                    }
                }
            }
            return newOrExistingConnectedAccountId;
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, messageQueueService, calendarQueueService, accountsToReconnectService, messagingChannelSyncStatusService, calendarChannelSyncStatusService, createMessageChannelService, createCalendarChannelService, createConnectedAccountService, updateConnectedAccountOnReconnectService, twentyConfigService, syncMessageFoldersService, emailAliasManagerService, connectedAccountRepository, userWorkspaceRepository, messageChannelRepository, calendarChannelRepository){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageQueueService = messageQueueService;
        this.calendarQueueService = calendarQueueService;
        this.accountsToReconnectService = accountsToReconnectService;
        this.messagingChannelSyncStatusService = messagingChannelSyncStatusService;
        this.calendarChannelSyncStatusService = calendarChannelSyncStatusService;
        this.createMessageChannelService = createMessageChannelService;
        this.createCalendarChannelService = createCalendarChannelService;
        this.createConnectedAccountService = createConnectedAccountService;
        this.updateConnectedAccountOnReconnectService = updateConnectedAccountOnReconnectService;
        this.twentyConfigService = twentyConfigService;
        this.syncMessageFoldersService = syncMessageFoldersService;
        this.emailAliasManagerService = emailAliasManagerService;
        this.connectedAccountRepository = connectedAccountRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.messageChannelRepository = messageChannelRepository;
        this.calendarChannelRepository = calendarChannelRepository;
    }
};
MicrosoftAPIsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.messagingQueue)),
    _ts_param(2, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.calendarQueue)),
    _ts_param(13, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(14, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_param(15, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(16, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _accountstoreconnectservice.AccountsToReconnectService === "undefined" ? Object : _accountstoreconnectservice.AccountsToReconnectService,
        typeof _messagechannelsyncstatusservice.MessageChannelSyncStatusService === "undefined" ? Object : _messagechannelsyncstatusservice.MessageChannelSyncStatusService,
        typeof _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService === "undefined" ? Object : _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService,
        typeof _createmessagechannelservice.CreateMessageChannelService === "undefined" ? Object : _createmessagechannelservice.CreateMessageChannelService,
        typeof _createcalendarchannelservice.CreateCalendarChannelService === "undefined" ? Object : _createcalendarchannelservice.CreateCalendarChannelService,
        typeof _createconnectedaccountservice.CreateConnectedAccountService === "undefined" ? Object : _createconnectedaccountservice.CreateConnectedAccountService,
        typeof _updateconnectedaccountonreconnectservice.UpdateConnectedAccountOnReconnectService === "undefined" ? Object : _updateconnectedaccountonreconnectservice.UpdateConnectedAccountOnReconnectService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _syncmessagefoldersservice.SyncMessageFoldersService === "undefined" ? Object : _syncmessagefoldersservice.SyncMessageFoldersService,
        typeof _emailaliasmanagerservice.EmailAliasManagerService === "undefined" ? Object : _emailaliasmanagerservice.EmailAliasManagerService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], MicrosoftAPIsService);

//# sourceMappingURL=microsoft-apis.service.js.map