"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingMessagesImportService", {
    enumerable: true,
    get: function() {
        return MessagingMessagesImportService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _cachestoragedecorator = require("../../../../engine/core-modules/cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../../../../engine/core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../../../engine/core-modules/cache-storage/types/cache-storage-namespace.enum");
const _twentyconfigservice = require("../../../../engine/core-modules/twenty-config/twenty-config.service");
const _userworkspaceentity = require("../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _workspaceentity = require("../../../../engine/core-modules/workspace/workspace.entity");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _objectmetadatarepositorydecorator = require("../../../../engine/object-metadata-repository/object-metadata-repository.decorator");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _blocklistrepository = require("../../../blocklist/repositories/blocklist.repository");
const _blocklistworkspaceentity = require("../../../blocklist/standard-objects/blocklist.workspace-entity");
const _emailaliasmanagerservice = require("../../../connected-account/email-alias-manager/services/email-alias-manager.service");
const _messagechannelsyncstatusservice = require("../../common/services/message-channel-sync-status.service");
const _messageimportdriverexception = require("../drivers/exceptions/message-import-driver.exception");
const _messaginggetmessagesservice = require("./messaging-get-messages.service");
const _messagingimportexceptionhandlerservice = require("./messaging-import-exception-handler.service");
const _messagingsavemessagesandenqueuecontactcreationservice = require("./messaging-save-messages-and-enqueue-contact-creation.service");
const _filteremailsutil = require("../utils/filter-emails.util");
const _messagingmonitoringservice = require("../../monitoring/services/messaging-monitoring.service");
const _types = require("twenty-shared/types");
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
let MessagingMessagesImportService = class MessagingMessagesImportService {
    async processMessageBatchImport(messageChannel, connectedAccount, workspaceId) {
        let messageIdsToFetch = [];
        const messagesGetBatchSize = this.twentyConfigService.get('MESSAGING_MESSAGES_GET_BATCH_SIZE');
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            try {
                if (messageChannel.syncStage !== _types.MessageChannelSyncStage.MESSAGES_IMPORT_SCHEDULED) {
                    return;
                }
                await this.messagingMonitoringService.track({
                    eventName: 'messages_import.started',
                    workspaceId,
                    connectedAccountId: messageChannel.connectedAccountId,
                    messageChannelId: messageChannel.id
                });
                await this.messageChannelSyncStatusService.markAsMessagesImportOngoing([
                    messageChannel.id
                ], workspaceId);
                if (!(0, _utils.isDefined)(connectedAccount.handleAliases)) {
                    connectedAccount.handleAliases = await this.emailAliasManagerService.refreshHandleAliases(connectedAccount, workspaceId);
                }
                messageIdsToFetch = await this.cacheStorage.setPop(`messages-to-import:${workspaceId}:${messageChannel.id}`, messagesGetBatchSize);
                if (!messageIdsToFetch?.length) {
                    await this.messageChannelSyncStatusService.markAsCompletedAndMarkAsMessagesListFetchPending([
                        messageChannel.id
                    ], workspaceId);
                    return await this.trackMessageImportCompleted(messageChannel, workspaceId);
                }
                const allMessages = await this.messagingGetMessagesService.getMessages(messageIdsToFetch, connectedAccount, messageChannel);
                // Map external folder IDs to internal folder IDs
                const messageFolders = messageChannel.messageFolders ?? [];
                const foldersWithExternalId = messageFolders.filter((folder)=>(0, _utils.isDefined)(folder.externalId));
                const folderExternalToInternalMap = new Map(foldersWithExternalId.map((folder)=>[
                        folder.externalId,
                        folder.id
                    ]));
                for (const message of allMessages){
                    const externalFolderIds = message.messageFolderExternalIds ?? [];
                    message.messageFolderIds = externalFolderIds.map((externalId)=>folderExternalToInternalMap.get(externalId)).filter(_utils.isDefined);
                }
                const userWorkspace = await this.userWorkspaceRepository.findOne({
                    where: {
                        id: connectedAccount.userWorkspaceId
                    }
                });
                const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                    shouldBypassPermissionChecks: true
                });
                const workspaceMember = userWorkspace ? await workspaceMemberRepository.findOne({
                    where: {
                        userId: userWorkspace.userId
                    }
                }) : null;
                const blocklist = workspaceMember ? await this.blocklistRepository.getByWorkspaceMemberId(workspaceMember.id, workspaceId) : [];
                if (!(0, _utils.isDefined)(messageChannel.handle)) {
                    throw new _messageimportdriverexception.MessageImportDriverException('Message channel handle is required', _messageimportdriverexception.MessageImportDriverExceptionCode.CHANNEL_MISCONFIGURED);
                }
                if (!(0, _utils.isDefined)(connectedAccount.handleAliases)) {
                    throw new _messageimportdriverexception.MessageImportDriverException('Message channel handle is required', _messageimportdriverexception.MessageImportDriverExceptionCode.CHANNEL_MISCONFIGURED);
                }
                const workspace = await this.workspaceRepository.findOne({
                    where: {
                        id: workspaceId
                    },
                    select: [
                        'id',
                        'isInternalMessagesImportEnabled'
                    ]
                });
                const messagesToSave = (0, _filteremailsutil.filterEmails)(messageChannel.handle, [
                    ...connectedAccount.handleAliases
                ], allMessages, blocklist.map((blocklistItem)=>blocklistItem.handle).filter(_utils.isDefined), messageChannel.excludeGroupEmails, workspace?.isInternalMessagesImportEnabled ?? false);
                if (messagesToSave.length > 0) {
                    await this.saveMessagesAndEnqueueContactCreationService.saveMessagesAndEnqueueContactCreation(messagesToSave, messageChannel, connectedAccount, workspaceId);
                }
                if (messageIdsToFetch.length < messagesGetBatchSize) {
                    await this.messageChannelSyncStatusService.markAsCompletedAndMarkAsMessagesListFetchPending([
                        messageChannel.id
                    ], workspaceId);
                } else {
                    await this.messageChannelSyncStatusService.markAsMessagesImportPending([
                        messageChannel.id
                    ], workspaceId);
                }
                await this.messageChannelRepository.update({
                    id: messageChannel.id,
                    workspaceId
                }, {
                    throttleFailureCount: 0,
                    throttleRetryAfter: null,
                    syncStageStartedAt: null
                });
                return await this.trackMessageImportCompleted(messageChannel, workspaceId);
            } catch (error) {
                this.logger.error(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannel.id} - Error (${error.code}) importing messages: ${error.message}`);
                await this.cacheStorage.setAdd(`messages-to-import:${workspaceId}:${messageChannel.id}`, messageIdsToFetch);
                await this.messageImportErrorHandlerService.handleDriverException(error, _messagingimportexceptionhandlerservice.MessageImportSyncStep.MESSAGES_IMPORT_ONGOING, messageChannel, workspaceId);
                return await this.trackMessageImportCompleted(messageChannel, workspaceId);
            }
        }, authContext, {
            lite: true
        });
    }
    async trackMessageImportCompleted(messageChannel, workspaceId) {
        await this.messagingMonitoringService.track({
            eventName: 'messages_import.completed',
            workspaceId,
            connectedAccountId: messageChannel.connectedAccountId,
            messageChannelId: messageChannel.id
        });
    }
    constructor(cacheStorage, messageChannelSyncStatusService, saveMessagesAndEnqueueContactCreationService, messagingMonitoringService, blocklistRepository, emailAliasManagerService, globalWorkspaceOrmManager, messageChannelRepository, messagingGetMessagesService, messageImportErrorHandlerService, userWorkspaceRepository, workspaceRepository, twentyConfigService){
        this.cacheStorage = cacheStorage;
        this.messageChannelSyncStatusService = messageChannelSyncStatusService;
        this.saveMessagesAndEnqueueContactCreationService = saveMessagesAndEnqueueContactCreationService;
        this.messagingMonitoringService = messagingMonitoringService;
        this.blocklistRepository = blocklistRepository;
        this.emailAliasManagerService = emailAliasManagerService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageChannelRepository = messageChannelRepository;
        this.messagingGetMessagesService = messagingGetMessagesService;
        this.messageImportErrorHandlerService = messageImportErrorHandlerService;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.workspaceRepository = workspaceRepository;
        this.twentyConfigService = twentyConfigService;
        this.logger = new _common.Logger(MessagingMessagesImportService.name);
    }
};
MessagingMessagesImportService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.ModuleMessaging)),
    _ts_param(4, (0, _objectmetadatarepositorydecorator.InjectObjectMetadataRepository)(_blocklistworkspaceentity.BlocklistWorkspaceEntity)),
    _ts_param(7, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(10, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_param(11, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService,
        typeof _messagechannelsyncstatusservice.MessageChannelSyncStatusService === "undefined" ? Object : _messagechannelsyncstatusservice.MessageChannelSyncStatusService,
        typeof _messagingsavemessagesandenqueuecontactcreationservice.MessagingSaveMessagesAndEnqueueContactCreationService === "undefined" ? Object : _messagingsavemessagesandenqueuecontactcreationservice.MessagingSaveMessagesAndEnqueueContactCreationService,
        typeof _messagingmonitoringservice.MessagingMonitoringService === "undefined" ? Object : _messagingmonitoringservice.MessagingMonitoringService,
        typeof _blocklistrepository.BlocklistRepository === "undefined" ? Object : _blocklistrepository.BlocklistRepository,
        typeof _emailaliasmanagerservice.EmailAliasManagerService === "undefined" ? Object : _emailaliasmanagerservice.EmailAliasManagerService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messaginggetmessagesservice.MessagingGetMessagesService === "undefined" ? Object : _messaginggetmessagesservice.MessagingGetMessagesService,
        typeof _messagingimportexceptionhandlerservice.MessageImportExceptionHandlerService === "undefined" ? Object : _messagingimportexceptionhandlerservice.MessageImportExceptionHandlerService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], MessagingMessagesImportService);

//# sourceMappingURL=messaging-messages-import.service.js.map