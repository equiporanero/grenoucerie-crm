"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessageChannelSyncStatusService", {
    enumerable: true,
    get: function() {
        return MessageChannelSyncStatusService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _cachestoragedecorator = require("../../../../engine/core-modules/cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../../../../engine/core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../../../engine/core-modules/cache-storage/types/cache-storage-namespace.enum");
const _metricsservice = require("../../../../engine/core-modules/metrics/metrics.service");
const _metricskeystype = require("../../../../engine/core-modules/metrics/types/metrics-keys.type");
const _userworkspaceentity = require("../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _connectedaccountentity = require("../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _messagefolderentity = require("../../../../engine/metadata-modules/message-folder/entities/message-folder.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _accountstoreconnectservice = require("../../../connected-account/services/accounts-to-reconnect.service");
const _accountstoreconnectkeyvaluetype = require("../../../connected-account/types/accounts-to-reconnect-key-value.type");
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
let MessageChannelSyncStatusService = class MessageChannelSyncStatusService {
    async markAsMessagesListFetchPending(messageChannelIds, workspaceId, preserveSyncStageStartedAt = false) {
        if (!messageChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.messageChannelRepository.update({
                id: (0, _typeorm1.In)(messageChannelIds),
                workspaceId
            }, {
                syncStage: _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_PENDING,
                ...!preserveSyncStageStartedAt ? {
                    syncStageStartedAt: null
                } : {}
            });
        }, authContext, {
            lite: true
        });
    }
    async markAsMessagesImportPending(messageChannelIds, workspaceId, preserveSyncStageStartedAt = false) {
        if (!messageChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.messageChannelRepository.update({
                id: (0, _typeorm1.In)(messageChannelIds),
                workspaceId
            }, {
                syncStage: _types.MessageChannelSyncStage.MESSAGES_IMPORT_PENDING,
                ...!preserveSyncStageStartedAt ? {
                    syncStageStartedAt: null
                } : {}
            });
        }, authContext, {
            lite: true
        });
    }
    async resetAndMarkAsMessagesListFetchPending(messageChannelIds, workspaceId) {
        if (!messageChannelIds.length) {
            return;
        }
        for (const messageChannelId of messageChannelIds){
            await this.cacheStorage.del(`messages-to-import:${workspaceId}:${messageChannelId}`);
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.messageChannelRepository.update({
                id: (0, _typeorm1.In)(messageChannelIds),
                workspaceId
            }, {
                syncCursor: '',
                syncStageStartedAt: null,
                throttleFailureCount: 0,
                throttleRetryAfter: null,
                pendingGroupEmailsAction: _types.MessageChannelPendingGroupEmailsAction.NONE
            });
            await this.messageFolderRepository.update({
                messageChannelId: (0, _typeorm1.In)(messageChannelIds),
                workspaceId
            }, {
                syncCursor: '',
                pendingSyncAction: _types.MessageFolderPendingSyncAction.NONE
            });
        }, authContext, {
            lite: true
        });
        await this.markAsMessagesListFetchPending(messageChannelIds, workspaceId);
    }
    async resetSyncStageStartedAt(messageChannelIds, workspaceId) {
        if (!messageChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.messageChannelRepository.update({
                id: (0, _typeorm1.In)(messageChannelIds),
                workspaceId
            }, {
                syncStageStartedAt: null
            });
        }, authContext, {
            lite: true
        });
    }
    async markAsMessagesListFetchScheduled(messageChannelIds, workspaceId) {
        if (!messageChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.messageChannelRepository.update({
                id: (0, _typeorm1.In)(messageChannelIds),
                workspaceId
            }, {
                syncStage: _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_SCHEDULED,
                syncStatus: _types.MessageChannelSyncStatus.ONGOING,
                syncStageStartedAt: new Date().toISOString()
            });
        }, authContext, {
            lite: true
        });
    }
    async markAsMessagesListFetchOngoing(messageChannelIds, workspaceId) {
        if (!messageChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.messageChannelRepository.update({
                id: (0, _typeorm1.In)(messageChannelIds),
                workspaceId
            }, {
                syncStage: _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_ONGOING,
                syncStatus: _types.MessageChannelSyncStatus.ONGOING,
                syncStageStartedAt: new Date().toISOString()
            });
        }, authContext, {
            lite: true
        });
    }
    async markAsCompletedAndMarkAsMessagesListFetchPending(messageChannelIds, workspaceId) {
        if (!messageChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.messageChannelRepository.update({
                id: (0, _typeorm1.In)(messageChannelIds),
                workspaceId
            }, {
                syncStatus: _types.MessageChannelSyncStatus.ACTIVE,
                syncStage: _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_PENDING,
                throttleFailureCount: 0,
                throttleRetryAfter: null,
                syncStageStartedAt: null,
                syncedAt: new Date().toISOString()
            });
        }, authContext, {
            lite: true
        });
        await this.metricsService.incrementCounterForEvents({
            key: _metricskeystype.MetricsKeys.MessageChannelSyncJobActive,
            eventIds: messageChannelIds
        });
    }
    async markAsMessagesImportScheduled(messageChannelIds, workspaceId) {
        if (!messageChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.messageChannelRepository.update({
                id: (0, _typeorm1.In)(messageChannelIds),
                workspaceId
            }, {
                syncStage: _types.MessageChannelSyncStage.MESSAGES_IMPORT_SCHEDULED
            });
        }, authContext, {
            lite: true
        });
    }
    async markAsMessagesImportOngoing(messageChannelIds, workspaceId) {
        if (!messageChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.messageChannelRepository.update({
                id: (0, _typeorm1.In)(messageChannelIds),
                workspaceId
            }, {
                syncStage: _types.MessageChannelSyncStage.MESSAGES_IMPORT_ONGOING,
                syncStatus: _types.MessageChannelSyncStatus.ONGOING,
                syncStageStartedAt: new Date().toISOString()
            });
        }, authContext, {
            lite: true
        });
    }
    async markAsFailed(messageChannelIds, workspaceId, syncStatus) {
        if (!messageChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.messageChannelRepository.update({
                id: (0, _typeorm1.In)(messageChannelIds),
                workspaceId
            }, {
                syncStage: _types.MessageChannelSyncStage.FAILED,
                syncStatus: syncStatus,
                throttleRetryAfter: null
            });
            const metricsKey = syncStatus === _types.MessageChannelSyncStatus.FAILED_INSUFFICIENT_PERMISSIONS ? _metricskeystype.MetricsKeys.MessageChannelSyncJobFailedInsufficientPermissions : _metricskeystype.MetricsKeys.MessageChannelSyncJobFailedUnknown;
            await this.metricsService.incrementCounterForEvents({
                key: metricsKey,
                eventIds: messageChannelIds
            });
            if (syncStatus === _types.MessageChannelSyncStatus.FAILED_INSUFFICIENT_PERMISSIONS) {
                const messageChannels = await this.messageChannelRepository.find({
                    where: {
                        id: (0, _typeorm1.In)(messageChannelIds),
                        workspaceId
                    }
                });
                const connectedAccountIds = messageChannels.map((messageChannel)=>messageChannel.connectedAccountId);
                await this.connectedAccountRepository.update({
                    id: (0, _typeorm1.Any)(connectedAccountIds),
                    workspaceId
                }, {
                    authFailedAt: new Date()
                });
                await this.addToAccountsToReconnect(messageChannels.map((messageChannel)=>messageChannel.id), workspaceId);
            }
        }, authContext, {
            lite: true
        });
    }
    async addToAccountsToReconnect(messageChannelIds, workspaceId) {
        if (!messageChannelIds.length) {
            return;
        }
        const messageChannels = await this.messageChannelRepository.find({
            where: {
                id: (0, _typeorm1.In)(messageChannelIds),
                workspaceId
            }
        });
        const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
            shouldBypassPermissionChecks: true
        });
        for (const messageChannel of messageChannels){
            const connectedAccount = await this.connectedAccountRepository.findOne({
                where: {
                    id: messageChannel.connectedAccountId,
                    workspaceId
                }
            });
            if (!connectedAccount) {
                continue;
            }
            const userWorkspace = await this.userWorkspaceRepository.findOne({
                where: {
                    id: connectedAccount.userWorkspaceId
                }
            });
            if (!userWorkspace) {
                continue;
            }
            const workspaceMember = await workspaceMemberRepository.findOne({
                where: {
                    userId: userWorkspace.userId
                }
            });
            if (!workspaceMember) {
                continue;
            }
            await this.accountsToReconnectService.addAccountToReconnectByKey(_accountstoreconnectkeyvaluetype.AccountsToReconnectKeys.ACCOUNTS_TO_RECONNECT_INSUFFICIENT_PERMISSIONS, workspaceMember.userId, workspaceId, connectedAccount.id);
        }
    }
    constructor(cacheStorage, globalWorkspaceOrmManager, messageChannelRepository, messageFolderRepository, connectedAccountRepository, userWorkspaceRepository, accountsToReconnectService, metricsService){
        this.cacheStorage = cacheStorage;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageChannelRepository = messageChannelRepository;
        this.messageFolderRepository = messageFolderRepository;
        this.connectedAccountRepository = connectedAccountRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.accountsToReconnectService = accountsToReconnectService;
        this.metricsService = metricsService;
    }
};
MessageChannelSyncStatusService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.ModuleMessaging)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_messagefolderentity.MessageFolderEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _accountstoreconnectservice.AccountsToReconnectService === "undefined" ? Object : _accountstoreconnectservice.AccountsToReconnectService,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService
    ])
], MessageChannelSyncStatusService);

//# sourceMappingURL=message-channel-sync-status.service.js.map