"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarOngoingStaleJob", {
    enumerable: true,
    get: function() {
        return CalendarOngoingStaleJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _calendarchannelentity = require("../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _issyncstaleutil = require("../utils/is-sync-stale.util");
const _calendarchannelsyncstatusservice = require("../../common/services/calendar-channel-sync-status.service");
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
let CalendarOngoingStaleJob = class CalendarOngoingStaleJob {
    async handle(data) {
        const { workspaceId } = data;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const calendarChannels = await this.calendarChannelRepository.find({
                where: {
                    syncStage: (0, _typeorm1.In)([
                        _types.CalendarChannelSyncStage.CALENDAR_EVENTS_IMPORT_ONGOING,
                        _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_ONGOING,
                        _types.CalendarChannelSyncStage.CALENDAR_EVENTS_IMPORT_SCHEDULED,
                        _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_SCHEDULED
                    ]),
                    workspaceId
                }
            });
            for (const calendarChannel of calendarChannels){
                const syncStageStartedAt = calendarChannel.syncStageStartedAt;
                if ((0, _issyncstaleutil.isSyncStale)(syncStageStartedAt?.toISOString() ?? null)) {
                    await this.calendarChannelSyncStatusService.resetSyncStageStartedAt([
                        calendarChannel.id
                    ], workspaceId);
                    switch(calendarChannel.syncStage){
                        case _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_ONGOING:
                        case _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_SCHEDULED:
                            this.logger.log(`Sync for calendar channel ${calendarChannel.id} and workspace ${workspaceId} is stale. Setting sync stage to CALENDAR_EVENT_LIST_FETCH_PENDING`);
                            await this.calendarChannelSyncStatusService.markAsCalendarEventListFetchPending([
                                calendarChannel.id
                            ], workspaceId);
                            break;
                        case _types.CalendarChannelSyncStage.CALENDAR_EVENTS_IMPORT_ONGOING:
                        case _types.CalendarChannelSyncStage.CALENDAR_EVENTS_IMPORT_SCHEDULED:
                            this.logger.log(`Sync for calendar channel ${calendarChannel.id} and workspace ${workspaceId} is stale. Setting sync stage to CALENDAR_EVENTS_IMPORT_PENDING`);
                            await this.calendarChannelSyncStatusService.markAsCalendarEventsImportPending([
                                calendarChannel.id
                            ], workspaceId);
                            break;
                        default:
                            break;
                    }
                }
            }
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, calendarChannelRepository, calendarChannelSyncStatusService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.calendarChannelRepository = calendarChannelRepository;
        this.calendarChannelSyncStatusService = calendarChannelSyncStatusService;
        this.logger = new _common.Logger(CalendarOngoingStaleJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CalendarOngoingStaleJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CalendarOngoingStaleJobData === "undefined" ? Object : CalendarOngoingStaleJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], CalendarOngoingStaleJob.prototype, "handle", null);
CalendarOngoingStaleJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.calendarQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService === "undefined" ? Object : _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService
    ])
], CalendarOngoingStaleJob);

//# sourceMappingURL=calendar-ongoing-stale.job.js.map