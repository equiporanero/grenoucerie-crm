"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarEventListFetchJob", {
    enumerable: true,
    get: function() {
        return CalendarEventListFetchJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _calendarfetcheventsservice = require("../services/calendar-fetch-events.service");
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
let CalendarEventListFetchJob = class CalendarEventListFetchJob {
    async handle(data) {
        const { workspaceId, calendarChannelId } = data;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const calendarChannel = await this.calendarChannelRepository.findOne({
                where: {
                    id: calendarChannelId,
                    isSyncEnabled: true,
                    workspaceId
                },
                relations: [
                    'connectedAccount'
                ]
            });
            if (!calendarChannel) {
                return;
            }
            if (calendarChannel.syncStage !== _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_SCHEDULED) {
                return;
            }
            await this.calendarFetchEventsService.fetchCalendarEvents(calendarChannel, calendarChannel.connectedAccount, workspaceId);
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, calendarChannelRepository, calendarFetchEventsService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.calendarChannelRepository = calendarChannelRepository;
        this.calendarFetchEventsService = calendarFetchEventsService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CalendarEventListFetchJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CalendarEventListFetchJobData === "undefined" ? Object : CalendarEventListFetchJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], CalendarEventListFetchJob.prototype, "handle", null);
CalendarEventListFetchJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.calendarQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _calendarfetcheventsservice.CalendarFetchEventsService === "undefined" ? Object : _calendarfetcheventsservice.CalendarFetchEventsService
    ])
], CalendarEventListFetchJob);

//# sourceMappingURL=calendar-event-list-fetch.job.js.map