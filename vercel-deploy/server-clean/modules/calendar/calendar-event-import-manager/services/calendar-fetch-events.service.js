"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarFetchEventsService", {
    enumerable: true,
    get: function() {
        return CalendarFetchEventsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _cachestoragedecorator = require("../../../../engine/core-modules/cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../../../../engine/core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../../../engine/core-modules/cache-storage/types/cache-storage-namespace.enum");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _calendareventimportdriverexception = require("../drivers/exceptions/calendar-event-import-driver.exception");
const _calendareventimportexceptionhandlerservice = require("./calendar-event-import-exception-handler.service");
const _calendareventsimportservice = require("./calendar-events-import.service");
const _calendargeteventsservice = require("./calendar-get-events.service");
const _calendarchannelsyncstatusservice = require("../../common/services/calendar-channel-sync-status.service");
const _calendarchannelentity = require("../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
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
let CalendarFetchEventsService = class CalendarFetchEventsService {
    async fetchCalendarEvents(calendarChannel, connectedAccount, workspaceId) {
        this.logger.log(`WorkspaceId: ${workspaceId}, CalendarChannelId: ${calendarChannel.id} - Fetching calendar events`);
        await this.calendarChannelSyncStatusService.markAsCalendarEventListFetchOngoing([
            calendarChannel.id
        ], workspaceId);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            try {
                const getCalendarEventsResponse = await this.getCalendarEventsService.getCalendarEvents(connectedAccount, calendarChannel.syncCursor || undefined);
                const hasFullEvents = getCalendarEventsResponse.fullEvents;
                const calendarEvents = hasFullEvents ? getCalendarEventsResponse.calendarEvents : null;
                const calendarEventIds = getCalendarEventsResponse.calendarEventIds;
                const nextSyncCursor = getCalendarEventsResponse.nextSyncCursor;
                if (!calendarEvents || calendarEvents?.length === 0) {
                    await this.calendarChannelRepository.update({
                        id: calendarChannel.id,
                        workspaceId
                    }, {
                        syncCursor: nextSyncCursor
                    });
                    await this.calendarChannelSyncStatusService.markAsCalendarEventListFetchPending([
                        calendarChannel.id
                    ], workspaceId);
                }
                await this.calendarChannelRepository.update({
                    id: calendarChannel.id,
                    workspaceId
                }, {
                    syncCursor: nextSyncCursor
                });
                if (hasFullEvents && calendarEvents) {
                    await this.calendarEventsImportService.processCalendarEventsImport(calendarChannel, connectedAccount, workspaceId, calendarEvents);
                } else if (!hasFullEvents && calendarEventIds) {
                    await this.cacheStorage.setAdd(`calendar-events-to-import:${workspaceId}:${calendarChannel.id}`, calendarEventIds);
                    await this.calendarChannelSyncStatusService.markAsCalendarEventsImportPending([
                        calendarChannel.id
                    ], workspaceId);
                } else {
                    throw new _calendareventimportdriverexception.CalendarEventImportDriverException("Expected 'calendarEvents' or 'calendarEventIds' to be present", _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.UNKNOWN);
                }
            } catch (error) {
                this.logger.error(`WorkspaceId: ${workspaceId}, CalendarChannelId: ${calendarChannel.id} - Calendar event fetch error: ${error.message}`);
                await this.calendarEventImportErrorHandlerService.handleDriverException(error, _calendareventimportexceptionhandlerservice.CalendarEventImportSyncStep.CALENDAR_EVENT_LIST_FETCH, calendarChannel, workspaceId);
            }
        }, authContext, {
            lite: true
        });
    }
    constructor(cacheStorage, globalWorkspaceOrmManager, calendarChannelRepository, calendarChannelSyncStatusService, getCalendarEventsService, calendarEventImportErrorHandlerService, calendarEventsImportService){
        this.cacheStorage = cacheStorage;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.calendarChannelRepository = calendarChannelRepository;
        this.calendarChannelSyncStatusService = calendarChannelSyncStatusService;
        this.getCalendarEventsService = getCalendarEventsService;
        this.calendarEventImportErrorHandlerService = calendarEventImportErrorHandlerService;
        this.calendarEventsImportService = calendarEventsImportService;
        this.logger = new _common.Logger(CalendarFetchEventsService.name);
    }
};
CalendarFetchEventsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.ModuleCalendar)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService === "undefined" ? Object : _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService,
        typeof _calendargeteventsservice.CalendarGetCalendarEventsService === "undefined" ? Object : _calendargeteventsservice.CalendarGetCalendarEventsService,
        typeof _calendareventimportexceptionhandlerservice.CalendarEventImportErrorHandlerService === "undefined" ? Object : _calendareventimportexceptionhandlerservice.CalendarEventImportErrorHandlerService,
        typeof _calendareventsimportservice.CalendarEventsImportService === "undefined" ? Object : _calendareventsimportservice.CalendarEventsImportService
    ])
], CalendarFetchEventsService);

//# sourceMappingURL=calendar-fetch-events.service.js.map