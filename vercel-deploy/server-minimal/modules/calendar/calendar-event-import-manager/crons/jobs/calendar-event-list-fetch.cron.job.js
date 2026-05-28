"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get CALENDAR_EVENT_LIST_FETCH_CRON_PATTERN () {
        return CALENDAR_EVENT_LIST_FETCH_CRON_PATTERN;
    },
    get CalendarEventListFetchCronJob () {
        return CalendarEventListFetchCronJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _sentrycronmonitordecorator = require("../../../../../engine/core-modules/cron/sentry-cron-monitor.decorator");
const _exceptionhandlerservice = require("../../../../../engine/core-modules/exception-handler/exception-handler.service");
const _messagequeuedecorator = require("../../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _processdecorator = require("../../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../../engine/core-modules/message-queue/services/message-queue.service");
const _workspaceentity = require("../../../../../engine/core-modules/workspace/workspace.entity");
const _calendareventlistfetchjob = require("../../jobs/calendar-event-list-fetch.job");
const _calendarchannelentity = require("../../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _isthrottled = require("../../../../connected-account/utils/is-throttled");
const _toIsoStringOrNull = require("../../../../../utils/date/toIsoStringOrNull");
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
const CALENDAR_EVENT_LIST_FETCH_CRON_PATTERN = '*/5 * * * *';
let CalendarEventListFetchCronJob = class CalendarEventListFetchCronJob {
    async handle() {
        const activeWorkspaces = await this.workspaceRepository.find({
            where: {
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
            }
        });
        for (const activeWorkspace of activeWorkspaces){
            try {
                const pendingCalendarChannels = await this.calendarChannelRepository.find({
                    where: {
                        workspaceId: activeWorkspace.id,
                        isSyncEnabled: true,
                        syncStage: _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_PENDING
                    }
                });
                const calendarChannelsToSchedule = pendingCalendarChannels.filter((calendarChannel)=>!(0, _isthrottled.isThrottled)((0, _toIsoStringOrNull.toIsoStringOrNull)(calendarChannel.syncStageStartedAt), calendarChannel.throttleFailureCount));
                const throttledCount = pendingCalendarChannels.length - calendarChannelsToSchedule.length;
                if (throttledCount > 0) {
                    this.logger.log(`Skipped ${throttledCount} throttled calendar channels for workspace ${activeWorkspace.id}`);
                }
                if (calendarChannelsToSchedule.length === 0) {
                    continue;
                }
                const calendarChannelIds = calendarChannelsToSchedule.map((calendarChannel)=>calendarChannel.id);
                const updateResult = await this.calendarChannelRepository.createQueryBuilder().update().set({
                    syncStage: _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_SCHEDULED,
                    syncStageStartedAt: new Date()
                }).where({
                    id: (0, _typeorm1.In)(calendarChannelIds),
                    workspaceId: activeWorkspace.id,
                    isSyncEnabled: true,
                    syncStage: _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_PENDING
                }).returning('id').execute();
                const updatedIds = updateResult.raw.map((row)=>row.id);
                for (const calendarChannelId of updatedIds){
                    await this.messageQueueService.add(_calendareventlistfetchjob.CalendarEventListFetchJob.name, {
                        calendarChannelId,
                        workspaceId: activeWorkspace.id
                    });
                }
            } catch (error) {
                this.exceptionHandlerService.captureExceptions([
                    error
                ], {
                    workspace: {
                        id: activeWorkspace.id
                    }
                });
            }
        }
    }
    constructor(workspaceRepository, messageQueueService, exceptionHandlerService, calendarChannelRepository){
        this.workspaceRepository = workspaceRepository;
        this.messageQueueService = messageQueueService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.calendarChannelRepository = calendarChannelRepository;
        this.logger = new _common.Logger(CalendarEventListFetchCronJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CalendarEventListFetchCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(CalendarEventListFetchCronJob.name, CALENDAR_EVENT_LIST_FETCH_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CalendarEventListFetchCronJob.prototype, "handle", null);
CalendarEventListFetchCronJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.cronQueue
    }),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(1, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.calendarQueue)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], CalendarEventListFetchCronJob);

//# sourceMappingURL=calendar-event-list-fetch.cron.job.js.map