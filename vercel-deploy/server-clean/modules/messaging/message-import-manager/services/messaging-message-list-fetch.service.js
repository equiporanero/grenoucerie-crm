"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingMessageListFetchService", {
    enumerable: true,
    get: function() {
        return MessagingMessageListFetchService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _guards = require("@sniptt/guards");
const _lodashchunk = /*#__PURE__*/ _interop_require_default(require("lodash.chunk"));
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _cachestoragedecorator = require("../../../../engine/core-modules/cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../../../../engine/core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../../../engine/core-modules/cache-storage/types/cache-storage-namespace.enum");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _messagechannelsyncstatusservice = require("../../common/services/message-channel-sync-status.service");
const _messagingmessagecleanerservice = require("../../message-cleaner/services/messaging-message-cleaner.service");
const _syncmessagefoldersservice = require("../../message-folder-manager/services/sync-message-folders.service");
const _messagingcursorservice = require("./messaging-cursor.service");
const _messaginggetmessagelistservice = require("./messaging-get-message-list.service");
const _messagingimportexceptionhandlerservice = require("./messaging-import-exception-handler.service");
const _messagingmessagesimportservice = require("./messaging-messages-import.service");
const _messagingprocessfolderactionsservice = require("./messaging-process-folder-actions.service");
const _messagingprocessgroupemailactionsservice = require("./messaging-process-group-email-actions.service");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
const ONE_WEEK_IN_MILLISECONDS = 7 * 24 * 60 * 60 * 1000;
let MessagingMessageListFetchService = class MessagingMessageListFetchService {
    async processMessageListFetch(messageChannel, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            try {
                const pendingGroupEmailActionsProcessed = await this.processPendingGroupEmailActions(messageChannel, workspaceId);
                const pendingFolderActionsProcessed = await this.processPendingFolderActions(messageChannel, workspaceId);
                await this.messageChannelSyncStatusService.markAsMessagesListFetchOngoing([
                    messageChannel.id
                ], workspaceId);
                this.logger.log(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannel.id} - Processing message list fetch`);
                const freshMessageChannel = pendingGroupEmailActionsProcessed || pendingFolderActionsProcessed ? await this.messageChannelRepository.findOne({
                    where: {
                        id: messageChannel.id,
                        workspaceId
                    },
                    relations: {
                        connectedAccount: true,
                        messageFolders: true
                    }
                }) : messageChannel;
                if (!(0, _utils.isDefined)(freshMessageChannel)) {
                    this.logger.error(`WorkspaceId: ${workspaceId}, MessageChannelId: ${messageChannel.id} - Message channel not found`);
                    return;
                }
                const messageFolders = await this.syncMessageFoldersService.syncMessageFolders({
                    messageChannel: freshMessageChannel,
                    workspaceId
                });
                const messageFoldersToSync = messageFolders.filter((folder)=>folder.pendingSyncAction === _types.MessageFolderPendingSyncAction.NONE);
                const messageLists = await this.messagingGetMessageListService.getMessageLists(freshMessageChannel, messageFoldersToSync);
                await this.cacheStorage.del(`messages-to-import:${workspaceId}:${freshMessageChannel.id}`);
                const messageExternalIds = messageLists.flatMap((messageList)=>messageList.messageExternalIds);
                const messageExternalIdsToDelete = messageLists.flatMap((messageList)=>messageList.messageExternalIdsToDelete);
                const isFullSync = messageLists.every((messageList)=>!(0, _guards.isNonEmptyString)(messageList.previousSyncCursor)) && !(0, _guards.isNonEmptyString)(freshMessageChannel.syncCursor);
                let totalMessagesToImportCount = 0;
                this.logger.log(`WorkspaceId: ${workspaceId}, MessageChannelId: ${freshMessageChannel.id} - Is full sync: ${isFullSync}, toImportCount: ${messageExternalIds.length}, toDeleteCount: ${messageExternalIdsToDelete.length}`);
                const messageChannelMessageAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageChannelMessageAssociation');
                const messageExternalIdsChunks = (0, _lodashchunk.default)(messageExternalIds, 200);
                for (const [index, messageExternalIdsChunk] of messageExternalIdsChunks.entries()){
                    const existingMessageChannelMessageAssociations = await messageChannelMessageAssociationRepository.find({
                        where: {
                            messageChannelId: freshMessageChannel.id,
                            messageExternalId: (0, _typeorm1.In)(messageExternalIdsChunk)
                        }
                    });
                    const existingMessageChannelMessageAssociationsExternalIds = existingMessageChannelMessageAssociations.map((messageChannelMessageAssociation)=>messageChannelMessageAssociation.messageExternalId);
                    const messageExternalIdsToImport = messageExternalIdsChunk.filter((messageExternalId)=>!existingMessageChannelMessageAssociationsExternalIds.includes(messageExternalId));
                    if (messageExternalIdsToImport.length) {
                        this.logger.debug(`messageChannelId: ${freshMessageChannel.id} Adding ${messageExternalIdsToImport.length} message external ids to import in batch ${index + 1}`);
                        totalMessagesToImportCount += messageExternalIdsToImport.length;
                        await this.cacheStorage.setAdd(`messages-to-import:${workspaceId}:${freshMessageChannel.id}`, messageExternalIdsToImport, ONE_WEEK_IN_MILLISECONDS);
                    }
                }
                for (const messageList of messageLists){
                    const { nextSyncCursor, folderId } = messageList;
                    await this.messagingCursorService.updateCursor(freshMessageChannel, nextSyncCursor, workspaceId, folderId);
                }
                const fullSyncMessageChannelMessageAssociationsToDelete = isFullSync ? await this.computeFullSyncMessageChannelMessageAssociationsToDelete(freshMessageChannel, messageExternalIds, workspaceId) : [];
                const allMessageExternalIdsToDelete = [
                    ...messageExternalIdsToDelete,
                    ...fullSyncMessageChannelMessageAssociationsToDelete.map((messageChannelMessageAssociation)=>messageChannelMessageAssociation.messageExternalId)
                ];
                if (allMessageExternalIdsToDelete.length) {
                    this.logger.log(`WorkspaceId: ${workspaceId}, MessageChannelId: ${freshMessageChannel.id} - Deleting ${allMessageExternalIdsToDelete.length} message channel message associations`);
                    const toDeleteChunks = (0, _lodashchunk.default)(allMessageExternalIdsToDelete, 200);
                    for (const [index, toDeleteChunk] of toDeleteChunks.entries()){
                        this.logger.debug(`messageChannelId: ${freshMessageChannel.id} Deleting ${toDeleteChunk.length} message channel message associations in batch ${index + 1}`);
                        await this.messagingMessageCleanerService.deleteMessagesChannelMessageAssociationsAndRelatedOrphans({
                            workspaceId,
                            messageExternalIds: toDeleteChunk.filter((messageExternalId)=>(0, _guards.isNonEmptyString)(messageExternalId)),
                            messageChannelId: freshMessageChannel.id
                        });
                    }
                }
                this.logger.log(`WorkspaceId: ${workspaceId}, MessageChannelId: ${freshMessageChannel.id} - Total messages to import count: ${totalMessagesToImportCount}`);
                if (totalMessagesToImportCount === 0) {
                    await this.messageChannelSyncStatusService.markAsCompletedAndMarkAsMessagesListFetchPending([
                        freshMessageChannel.id
                    ], workspaceId);
                    return;
                }
                this.logger.debug(`messageChannelId: ${freshMessageChannel.id} Scheduling direct messages import`);
                await this.messageChannelSyncStatusService.markAsMessagesImportScheduled([
                    freshMessageChannel.id
                ], workspaceId);
                await this.messagingMessagesImportService.processMessageBatchImport({
                    ...freshMessageChannel,
                    syncStage: _types.MessageChannelSyncStage.MESSAGES_IMPORT_SCHEDULED
                }, freshMessageChannel.connectedAccount, workspaceId);
            } catch (error) {
                await this.messageImportErrorHandlerService.handleDriverException(error, _messagingimportexceptionhandlerservice.MessageImportSyncStep.MESSAGE_LIST_FETCH, messageChannel, workspaceId);
            }
        }, authContext, {
            lite: true
        });
    }
    async processPendingGroupEmailActions(messageChannel, workspaceId) {
        const hasPendingGroupEmailAction = messageChannel.pendingGroupEmailsAction === _types.MessageChannelPendingGroupEmailsAction.GROUP_EMAILS_DELETION || messageChannel.pendingGroupEmailsAction === _types.MessageChannelPendingGroupEmailsAction.GROUP_EMAILS_IMPORT;
        if (!hasPendingGroupEmailAction) {
            return false;
        }
        this.logger.log(`messageChannelId: ${messageChannel.id} Processing pending group emails action before message list fetch: ${messageChannel.pendingGroupEmailsAction}`);
        await this.messagingProcessGroupEmailActionsService.processGroupEmailActions(messageChannel, workspaceId);
        return true;
    }
    async processPendingFolderActions(messageChannel, workspaceId) {
        const foldersWithPendingActions = messageChannel.messageFolders.filter((folder)=>(0, _utils.isDefined)(folder.pendingSyncAction) && folder.pendingSyncAction !== _types.MessageFolderPendingSyncAction.NONE);
        if (foldersWithPendingActions.length === 0) {
            return false;
        }
        this.logger.log(`messageChannelId: ${messageChannel.id} Processing pending folder actions before message list fetch`);
        await this.messagingProcessFolderActionsService.processFolderActions(messageChannel, foldersWithPendingActions, workspaceId);
        return true;
    }
    async computeFullSyncMessageChannelMessageAssociationsToDelete(messageChannel, messageExternalIds, workspaceId) {
        const messageChannelMessageAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageChannelMessageAssociation');
        const fullSyncMessageChannelMessageAssociationsToDelete = [];
        const firstMessageChannelMessageAssociation = await messageChannelMessageAssociationRepository.findOne({
            where: {
                messageChannelId: messageChannel.id
            },
            order: {
                id: 'ASC'
            }
        });
        if (!(0, _utils.isDefined)(firstMessageChannelMessageAssociation)) {
            this.logger.log(`messageChannelId: ${messageChannel.id} Full sync: No message channel message associations found`);
            return [];
        }
        this.logger.log(`messageChannelId: ${messageChannel.id} Full sync: First message channel message association id: ${firstMessageChannelMessageAssociation.id}`);
        let nextFirstBatchMessageChannelMessageAssociationId = firstMessageChannelMessageAssociation.id;
        let batchIndex = 0;
        while((0, _utils.isDefined)(nextFirstBatchMessageChannelMessageAssociationId)){
            const existingMessageChannelMessageAssociations = await messageChannelMessageAssociationRepository.find({
                where: {
                    messageChannelId: messageChannel.id,
                    id: (0, _typeorm1.MoreThanOrEqual)(nextFirstBatchMessageChannelMessageAssociationId)
                },
                order: {
                    id: 'ASC'
                },
                take: 200
            });
            const messageChannelMessageAssociationsToDelete = existingMessageChannelMessageAssociations.filter((existingMessageChannelMessageAssociation)=>(0, _utils.isDefined)(existingMessageChannelMessageAssociation.messageExternalId) && !messageExternalIds.includes(existingMessageChannelMessageAssociation.messageExternalId));
            this.logger.log(`messageChannelId: ${messageChannel.id} Full sync: Message channel message associations to delete in batch ${batchIndex}: ${messageChannelMessageAssociationsToDelete.length}`);
            fullSyncMessageChannelMessageAssociationsToDelete.push(...messageChannelMessageAssociationsToDelete);
            if (existingMessageChannelMessageAssociations.length < 200) {
                nextFirstBatchMessageChannelMessageAssociationId = undefined;
                break;
            }
            nextFirstBatchMessageChannelMessageAssociationId = existingMessageChannelMessageAssociations[existingMessageChannelMessageAssociations.length - 1].id;
            batchIndex++;
        }
        return fullSyncMessageChannelMessageAssociationsToDelete;
    }
    constructor(cacheStorage, messageChannelSyncStatusService, globalWorkspaceOrmManager, messageChannelRepository, messagingGetMessageListService, messageImportErrorHandlerService, messagingMessageCleanerService, messagingCursorService, messagingMessagesImportService, syncMessageFoldersService, messagingProcessGroupEmailActionsService, messagingProcessFolderActionsService){
        this.cacheStorage = cacheStorage;
        this.messageChannelSyncStatusService = messageChannelSyncStatusService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageChannelRepository = messageChannelRepository;
        this.messagingGetMessageListService = messagingGetMessageListService;
        this.messageImportErrorHandlerService = messageImportErrorHandlerService;
        this.messagingMessageCleanerService = messagingMessageCleanerService;
        this.messagingCursorService = messagingCursorService;
        this.messagingMessagesImportService = messagingMessagesImportService;
        this.syncMessageFoldersService = syncMessageFoldersService;
        this.messagingProcessGroupEmailActionsService = messagingProcessGroupEmailActionsService;
        this.messagingProcessFolderActionsService = messagingProcessFolderActionsService;
        this.logger = new _common.Logger(MessagingMessageListFetchService.name);
    }
};
MessagingMessageListFetchService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.ModuleMessaging)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService,
        typeof _messagechannelsyncstatusservice.MessageChannelSyncStatusService === "undefined" ? Object : _messagechannelsyncstatusservice.MessageChannelSyncStatusService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messaginggetmessagelistservice.MessagingGetMessageListService === "undefined" ? Object : _messaginggetmessagelistservice.MessagingGetMessageListService,
        typeof _messagingimportexceptionhandlerservice.MessageImportExceptionHandlerService === "undefined" ? Object : _messagingimportexceptionhandlerservice.MessageImportExceptionHandlerService,
        typeof _messagingmessagecleanerservice.MessagingMessageCleanerService === "undefined" ? Object : _messagingmessagecleanerservice.MessagingMessageCleanerService,
        typeof _messagingcursorservice.MessagingCursorService === "undefined" ? Object : _messagingcursorservice.MessagingCursorService,
        typeof _messagingmessagesimportservice.MessagingMessagesImportService === "undefined" ? Object : _messagingmessagesimportservice.MessagingMessagesImportService,
        typeof _syncmessagefoldersservice.SyncMessageFoldersService === "undefined" ? Object : _syncmessagefoldersservice.SyncMessageFoldersService,
        typeof _messagingprocessgroupemailactionsservice.MessagingProcessGroupEmailActionsService === "undefined" ? Object : _messagingprocessgroupemailactionsservice.MessagingProcessGroupEmailActionsService,
        typeof _messagingprocessfolderactionsservice.MessagingProcessFolderActionsService === "undefined" ? Object : _messagingprocessfolderactionsservice.MessagingProcessFolderActionsService
    ])
], MessagingMessageListFetchService);

//# sourceMappingURL=messaging-message-list-fetch.service.js.map