"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarChannelDeletionCleanupJob", {
    enumerable: true,
    get: function() {
        return CalendarChannelDeletionCleanupJob;
    }
});
const _common = require("@nestjs/common");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _calendareventcleanerservice = require("../services/calendar-event-cleaner.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let CalendarChannelDeletionCleanupJob = class CalendarChannelDeletionCleanupJob {
    async handle(data) {
        this.logger.debug(`WorkspaceId: ${data.workspaceId} Cleaning up calendar channel event associations for channel ${data.calendarChannelId}`);
        await this.calendarEventCleanerService.deleteCalendarChannelEventAssociationsByChannelId({
            workspaceId: data.workspaceId,
            calendarChannelId: data.calendarChannelId
        });
        await this.calendarEventCleanerService.cleanWorkspaceCalendarEvents(data.workspaceId);
    }
    constructor(calendarEventCleanerService){
        this.calendarEventCleanerService = calendarEventCleanerService;
        this.logger = new _common.Logger(CalendarChannelDeletionCleanupJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CalendarChannelDeletionCleanupJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof CalendarChannelDeletionCleanupJobData === "undefined" ? Object : CalendarChannelDeletionCleanupJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], CalendarChannelDeletionCleanupJob.prototype, "handle", null);
CalendarChannelDeletionCleanupJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.calendarQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _calendareventcleanerservice.CalendarEventCleanerService === "undefined" ? Object : _calendareventcleanerservice.CalendarEventCleanerService
    ])
], CalendarChannelDeletionCleanupJob);

//# sourceMappingURL=calendar-channel-deletion-cleanup.job.js.map