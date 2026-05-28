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
    get CALENDAR_RELAUNCH_FAILED_CALENDAR_CHANNELS_CRON_PATTERN () {
        return CALENDAR_RELAUNCH_FAILED_CALENDAR_CHANNELS_CRON_PATTERN;
    },
    get CalendarRelaunchFailedCalendarChannelsCronJob () {
        return CalendarRelaunchFailedCalendarChannelsCronJob;
    }
});
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
const _calendarchannelentity = require("../../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _workspaceentity = require("../../../../../engine/core-modules/workspace/workspace.entity");
const _calendarrelaunchfailedcalendarchanneljob = require("../../jobs/calendar-relaunch-failed-calendar-channel.job");
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
const CALENDAR_RELAUNCH_FAILED_CALENDAR_CHANNELS_CRON_PATTERN = '*/30 * * * *';
let CalendarRelaunchFailedCalendarChannelsCronJob = class CalendarRelaunchFailedCalendarChannelsCronJob {
    async handle() {
        const activeWorkspaces = await this.workspaceRepository.find({
            where: {
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
            }
        });
        const activeWorkspaceIds = activeWorkspaces.map((workspace)=>workspace.id);
        if (activeWorkspaceIds.length === 0) {
            return;
        }
        const failedCalendarChannels = await this.calendarChannelRepository.find({
            where: {
                syncStage: _types.CalendarChannelSyncStage.FAILED,
                syncStatus: _types.CalendarChannelSyncStatus.FAILED_UNKNOWN,
                workspaceId: (0, _typeorm1.In)(activeWorkspaceIds)
            }
        }).catch((error)=>{
            this.exceptionHandlerService.captureExceptions([
                error
            ]);
            return [];
        });
        for (const calendarChannel of failedCalendarChannels){
            try {
                await this.messageQueueService.add(_calendarrelaunchfailedcalendarchanneljob.CalendarRelaunchFailedCalendarChannelJob.name, {
                    workspaceId: calendarChannel.workspaceId,
                    calendarChannelId: calendarChannel.id
                });
            } catch (error) {
                this.exceptionHandlerService.captureExceptions([
                    error
                ], {
                    workspace: {
                        id: calendarChannel.workspaceId
                    }
                });
            }
        }
    }
    constructor(workspaceRepository, calendarChannelRepository, messageQueueService, exceptionHandlerService){
        this.workspaceRepository = workspaceRepository;
        this.calendarChannelRepository = calendarChannelRepository;
        this.messageQueueService = messageQueueService;
        this.exceptionHandlerService = exceptionHandlerService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CalendarRelaunchFailedCalendarChannelsCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(CalendarRelaunchFailedCalendarChannelsCronJob.name, CALENDAR_RELAUNCH_FAILED_CALENDAR_CHANNELS_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CalendarRelaunchFailedCalendarChannelsCronJob.prototype, "handle", null);
CalendarRelaunchFailedCalendarChannelsCronJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_param(2, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.calendarQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService
    ])
], CalendarRelaunchFailedCalendarChannelsCronJob);

//# sourceMappingURL=calendar-relaunch-failed-calendar-channels.cron.job.js.map