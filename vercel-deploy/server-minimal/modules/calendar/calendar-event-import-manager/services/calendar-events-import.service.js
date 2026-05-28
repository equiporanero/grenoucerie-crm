"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarEventsImportService", {
    enumerable: true,
    get: function() {
        return CalendarEventsImportService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _cachestoragedecorator = require("../../../../engine/core-modules/cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../../../../engine/core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../../../engine/core-modules/cache-storage/types/cache-storage-namespace.enum");
const _userworkspaceentity = require("../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _objectmetadatarepositorydecorator = require("../../../../engine/object-metadata-repository/object-metadata-repository.decorator");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _blocklistrepository = require("../../../blocklist/repositories/blocklist.repository");
const _blocklistworkspaceentity = require("../../../blocklist/standard-objects/blocklist.workspace-entity");
const _calendareventcleanerservice = require("../../calendar-event-cleaner/services/calendar-event-cleaner.service");
const _calendareventimportbatchsize = require("../constants/calendar-event-import-batch-size");
const _calendareventimportdriverexception = require("../drivers/exceptions/calendar-event-import-driver.exception");
const _microsoftcalendarimporteventsservice = require("../drivers/microsoft-calendar/services/microsoft-calendar-import-events.service");
const _calendareventimportexceptionhandlerservice = require("./calendar-event-import-exception-handler.service");
const _calendarsaveeventsservice = require("./calendar-save-events.service");
const _filtereventsutil = require("../utils/filter-events.util");
const _calendarchannelsyncstatusservice = require("../../common/services/calendar-channel-sync-status.service");
const _emailaliasmanagerservice = require("../../../connected-account/email-alias-manager/services/email-alias-manager.service");
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
let CalendarEventsImportService = class CalendarEventsImportService {
    async processCalendarEventsImport(calendarChannel, connectedAccount, workspaceId, fetchedCalendarEvents) {
        await this.calendarChannelSyncStatusService.markAsCalendarEventsImportOngoing([
            calendarChannel.id
        ], workspaceId);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            let calendarEvents = [];
            try {
                if (fetchedCalendarEvents) {
                    calendarEvents = fetchedCalendarEvents;
                } else {
                    const eventIdsToFetch = await this.cacheStorage.setPop(`calendar-events-to-import:${workspaceId}:${calendarChannel.id}`, _calendareventimportbatchsize.CALENDAR_EVENT_IMPORT_BATCH_SIZE);
                    if (!eventIdsToFetch || eventIdsToFetch.length === 0) {
                        await this.calendarChannelSyncStatusService.markAsCompletedAndMarkAsCalendarEventListFetchPending([
                            calendarChannel.id
                        ], workspaceId);
                        return;
                    }
                    switch(connectedAccount.provider){
                        case 'microsoft':
                            calendarEvents = await this.microsoftCalendarImportEventService.getCalendarEvents(connectedAccount, eventIdsToFetch);
                            break;
                        default:
                            break;
                    }
                }
                if (!calendarEvents || calendarEvents?.length === 0) {
                    await this.calendarChannelSyncStatusService.markAsCalendarEventListFetchPending([
                        calendarChannel.id
                    ], workspaceId);
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
                if (!(0, _utils.isDefined)(connectedAccount.handleAliases)) {
                    connectedAccount.handleAliases = await this.emailAliasManagerService.refreshHandleAliases(connectedAccount, workspaceId);
                }
                if (!(0, _utils.isDefined)(connectedAccount.handleAliases) || !(0, _utils.isDefined)(calendarChannel.handle)) {
                    throw new _calendareventimportdriverexception.CalendarEventImportDriverException('Calendar channel handle or Handle aliases are required', _calendareventimportdriverexception.CalendarEventImportDriverExceptionCode.CHANNEL_MISCONFIGURED);
                }
                const { filteredEvents, cancelledEvents } = (0, _filtereventsutil.filterEventsAndReturnCancelledEvents)([
                    calendarChannel.handle,
                    ...connectedAccount.handleAliases
                ], calendarEvents, blocklist.map((blocklist)=>blocklist.handle ?? ''));
                const cancelledEventExternalIds = cancelledEvents.map((event)=>event.id);
                const BATCH_SIZE = 1000;
                for(let i = 0; i < filteredEvents.length; i = i + BATCH_SIZE){
                    const eventsBatch = filteredEvents.slice(i, i + BATCH_SIZE);
                    await this.calendarSaveEventsService.saveCalendarEventsAndEnqueueContactCreationJob(eventsBatch, calendarChannel, connectedAccount, workspaceId);
                }
                const calendarChannelEventAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'calendarChannelEventAssociation');
                await calendarChannelEventAssociationRepository.delete({
                    eventExternalId: (0, _typeorm1.Any)(cancelledEventExternalIds),
                    calendarChannelId: calendarChannel.id
                });
                await this.calendarEventCleanerService.cleanWorkspaceCalendarEvents(workspaceId);
                await this.calendarChannelSyncStatusService.markAsCompletedAndMarkAsCalendarEventListFetchPending([
                    calendarChannel.id
                ], workspaceId);
            } catch (error) {
                await this.calendarEventImportErrorHandlerService.handleDriverException(error, _calendareventimportexceptionhandlerservice.CalendarEventImportSyncStep.CALENDAR_EVENTS_IMPORT, calendarChannel, workspaceId);
            }
        }, authContext, {
            lite: true
        });
    }
    constructor(cacheStorage, globalWorkspaceOrmManager, blocklistRepository, calendarEventCleanerService, calendarChannelSyncStatusService, calendarSaveEventsService, calendarEventImportErrorHandlerService, microsoftCalendarImportEventService, emailAliasManagerService, userWorkspaceRepository){
        this.cacheStorage = cacheStorage;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.blocklistRepository = blocklistRepository;
        this.calendarEventCleanerService = calendarEventCleanerService;
        this.calendarChannelSyncStatusService = calendarChannelSyncStatusService;
        this.calendarSaveEventsService = calendarSaveEventsService;
        this.calendarEventImportErrorHandlerService = calendarEventImportErrorHandlerService;
        this.microsoftCalendarImportEventService = microsoftCalendarImportEventService;
        this.emailAliasManagerService = emailAliasManagerService;
        this.userWorkspaceRepository = userWorkspaceRepository;
    }
};
CalendarEventsImportService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.ModuleCalendar)),
    _ts_param(2, (0, _objectmetadatarepositorydecorator.InjectObjectMetadataRepository)(_blocklistworkspaceentity.BlocklistWorkspaceEntity)),
    _ts_param(9, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _blocklistrepository.BlocklistRepository === "undefined" ? Object : _blocklistrepository.BlocklistRepository,
        typeof _calendareventcleanerservice.CalendarEventCleanerService === "undefined" ? Object : _calendareventcleanerservice.CalendarEventCleanerService,
        typeof _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService === "undefined" ? Object : _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService,
        typeof _calendarsaveeventsservice.CalendarSaveEventsService === "undefined" ? Object : _calendarsaveeventsservice.CalendarSaveEventsService,
        typeof _calendareventimportexceptionhandlerservice.CalendarEventImportErrorHandlerService === "undefined" ? Object : _calendareventimportexceptionhandlerservice.CalendarEventImportErrorHandlerService,
        typeof _microsoftcalendarimporteventsservice.MicrosoftCalendarImportEventsService === "undefined" ? Object : _microsoftcalendarimporteventsservice.MicrosoftCalendarImportEventsService,
        typeof _emailaliasmanagerservice.EmailAliasManagerService === "undefined" ? Object : _emailaliasmanagerservice.EmailAliasManagerService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CalendarEventsImportService);

//# sourceMappingURL=calendar-events-import.service.js.map