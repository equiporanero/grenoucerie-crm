"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarChannelSyncStatusService", {
    enumerable: true,
    get: function() {
        return CalendarChannelSyncStatusService;
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
const _calendarchannelentity = require("../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
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
let CalendarChannelSyncStatusService = class CalendarChannelSyncStatusService {
    async markAsCalendarEventListFetchPending(calendarChannelIds, workspaceId, preserveSyncStageStartedAt = false) {
        if (!calendarChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.calendarChannelRepository.update({
                id: (0, _typeorm1.In)(calendarChannelIds),
                workspaceId
            }, {
                syncStage: _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_PENDING,
                ...!preserveSyncStageStartedAt ? {
                    syncStageStartedAt: null
                } : {}
            });
        }, authContext, {
            lite: true
        });
    }
    async markAsCalendarEventListFetchOngoing(calendarChannelIds, workspaceId) {
        if (!calendarChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.calendarChannelRepository.update({
                id: (0, _typeorm1.In)(calendarChannelIds),
                workspaceId
            }, {
                syncStage: _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_ONGOING,
                syncStatus: _types.CalendarChannelSyncStatus.ONGOING,
                syncStageStartedAt: new Date().toISOString()
            });
        }, authContext, {
            lite: true
        });
    }
    async resetAndMarkAsCalendarEventListFetchPending(calendarChannelIds, workspaceId) {
        if (!calendarChannelIds.length) {
            return;
        }
        for (const calendarChannelId of calendarChannelIds){
            await this.cacheStorage.del(`calendar-events-to-import:${workspaceId}:${calendarChannelId}`);
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.calendarChannelRepository.update({
                id: (0, _typeorm1.In)(calendarChannelIds),
                workspaceId
            }, {
                syncCursor: '',
                syncStageStartedAt: null,
                throttleFailureCount: 0
            });
        }, authContext, {
            lite: true
        });
        await this.markAsCalendarEventListFetchPending(calendarChannelIds, workspaceId);
    }
    async resetSyncStageStartedAt(calendarChannelIds, workspaceId) {
        if (!calendarChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.calendarChannelRepository.update({
                id: (0, _typeorm1.In)(calendarChannelIds),
                workspaceId
            }, {
                syncStageStartedAt: null
            });
        }, authContext, {
            lite: true
        });
    }
    async markAsCalendarEventsImportPending(calendarChannelIds, workspaceId, preserveSyncStageStartedAt = false) {
        if (!calendarChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.calendarChannelRepository.update({
                id: (0, _typeorm1.In)(calendarChannelIds),
                workspaceId
            }, {
                syncStage: _types.CalendarChannelSyncStage.CALENDAR_EVENTS_IMPORT_PENDING,
                ...!preserveSyncStageStartedAt ? {
                    syncStageStartedAt: null
                } : {}
            });
        }, authContext, {
            lite: true
        });
    }
    async markAsCalendarEventsImportOngoing(calendarChannelIds, workspaceId) {
        if (!calendarChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.calendarChannelRepository.update({
                id: (0, _typeorm1.In)(calendarChannelIds),
                workspaceId
            }, {
                syncStage: _types.CalendarChannelSyncStage.CALENDAR_EVENTS_IMPORT_ONGOING,
                syncStatus: _types.CalendarChannelSyncStatus.ONGOING,
                syncStageStartedAt: new Date().toISOString()
            });
        }, authContext, {
            lite: true
        });
    }
    async markAsCompletedAndMarkAsCalendarEventListFetchPending(calendarChannelIds, workspaceId) {
        if (!calendarChannelIds.length) {
            return;
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.calendarChannelRepository.update({
                id: (0, _typeorm1.In)(calendarChannelIds),
                workspaceId
            }, {
                syncStage: _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_PENDING,
                syncStatus: _types.CalendarChannelSyncStatus.ACTIVE,
                throttleFailureCount: 0,
                syncStageStartedAt: null,
                syncedAt: new Date().toISOString()
            });
        }, authContext, {
            lite: true
        });
        await this.markAsCalendarEventListFetchPending(calendarChannelIds, workspaceId);
        await this.metricsService.incrementCounterForEvents({
            key: _metricskeystype.MetricsKeys.CalendarEventSyncJobActive,
            eventIds: calendarChannelIds
        });
    }
    async markAsFailedUnknownAndFlushCalendarEventsToImport(calendarChannelIds, workspaceId) {
        if (!calendarChannelIds.length) {
            return;
        }
        for (const calendarChannelId of calendarChannelIds){
            await this.cacheStorage.del(`calendar-events-to-import:${workspaceId}:${calendarChannelId}`);
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.calendarChannelRepository.update({
                id: (0, _typeorm1.In)(calendarChannelIds),
                workspaceId
            }, {
                syncStatus: _types.CalendarChannelSyncStatus.FAILED_UNKNOWN,
                syncStage: _types.CalendarChannelSyncStage.FAILED
            });
        }, authContext, {
            lite: true
        });
        await this.metricsService.incrementCounterForEvents({
            key: _metricskeystype.MetricsKeys.CalendarEventSyncJobFailedUnknown,
            eventIds: calendarChannelIds
        });
    }
    async markAsFailedInsufficientPermissionsAndFlushCalendarEventsToImport(calendarChannelIds, workspaceId) {
        if (!calendarChannelIds.length) {
            return;
        }
        for (const calendarChannelId of calendarChannelIds){
            await this.cacheStorage.del(`calendar-events-to-import:${workspaceId}:${calendarChannelId}`);
        }
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            await this.calendarChannelRepository.update({
                id: (0, _typeorm1.In)(calendarChannelIds),
                workspaceId
            }, {
                syncStatus: _types.CalendarChannelSyncStatus.FAILED_INSUFFICIENT_PERMISSIONS,
                syncStage: _types.CalendarChannelSyncStage.FAILED
            });
            const calendarChannels = await this.calendarChannelRepository.find({
                select: [
                    'id',
                    'connectedAccountId'
                ],
                where: {
                    id: (0, _typeorm1.Any)(calendarChannelIds),
                    workspaceId
                }
            });
            const connectedAccountIds = calendarChannels.map((calendarChannel)=>calendarChannel.connectedAccountId);
            await this.connectedAccountRepository.update({
                id: (0, _typeorm1.Any)(connectedAccountIds),
                workspaceId
            }, {
                authFailedAt: new Date()
            });
            await this.addToAccountsToReconnect(calendarChannels.map((calendarChannel)=>calendarChannel.id), workspaceId);
        }, authContext, {
            lite: true
        });
        await this.metricsService.incrementCounterForEvents({
            key: _metricskeystype.MetricsKeys.CalendarEventSyncJobFailedInsufficientPermissions,
            eventIds: calendarChannelIds
        });
    }
    async addToAccountsToReconnect(calendarChannelIds, workspaceId) {
        if (!calendarChannelIds.length) {
            return;
        }
        const calendarChannels = await this.calendarChannelRepository.find({
            select: [
                'id',
                'connectedAccountId'
            ],
            where: {
                id: (0, _typeorm1.Any)(calendarChannelIds),
                workspaceId
            }
        });
        for (const calendarChannel of calendarChannels){
            const connectedAccount = await this.connectedAccountRepository.findOne({
                where: {
                    id: calendarChannel.connectedAccountId,
                    workspaceId
                }
            });
            if (!connectedAccount) {
                continue;
            }
            const userWorkspace = await this.userWorkspaceRepository.findOne({
                where: {
                    id: connectedAccount.userWorkspaceId
                },
                select: [
                    'userId'
                ]
            });
            if (!userWorkspace) {
                continue;
            }
            const userId = userWorkspace.userId;
            const connectedAccountId = connectedAccount.id;
            await this.accountsToReconnectService.addAccountToReconnectByKey(_accountstoreconnectkeyvaluetype.AccountsToReconnectKeys.ACCOUNTS_TO_RECONNECT_INSUFFICIENT_PERMISSIONS, userId, workspaceId, connectedAccountId);
        }
    }
    constructor(globalWorkspaceOrmManager, cacheStorage, calendarChannelRepository, connectedAccountRepository, userWorkspaceRepository, accountsToReconnectService, metricsService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.cacheStorage = cacheStorage;
        this.calendarChannelRepository = calendarChannelRepository;
        this.connectedAccountRepository = connectedAccountRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.accountsToReconnectService = accountsToReconnectService;
        this.metricsService = metricsService;
    }
};
CalendarChannelSyncStatusService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.ModuleCalendar)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _accountstoreconnectservice.AccountsToReconnectService === "undefined" ? Object : _accountstoreconnectservice.AccountsToReconnectService,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService
    ])
], CalendarChannelSyncStatusService);

//# sourceMappingURL=calendar-channel-sync-status.service.js.map