"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteConnectedAccountAssociatedCalendarDataJob", {
    enumerable: true,
    get: function() {
        return DeleteConnectedAccountAssociatedCalendarDataJob;
    }
});
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
let DeleteConnectedAccountAssociatedCalendarDataJob = class DeleteConnectedAccountAssociatedCalendarDataJob {
    async handle(data) {
        await this.calendarEventCleanerService.cleanWorkspaceCalendarEvents(data.workspaceId);
    }
    constructor(calendarEventCleanerService){
        this.calendarEventCleanerService = calendarEventCleanerService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(DeleteConnectedAccountAssociatedCalendarDataJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof DeleteConnectedAccountAssociatedCalendarDataJobData === "undefined" ? Object : DeleteConnectedAccountAssociatedCalendarDataJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], DeleteConnectedAccountAssociatedCalendarDataJob.prototype, "handle", null);
DeleteConnectedAccountAssociatedCalendarDataJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.calendarQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _calendareventcleanerservice.CalendarEventCleanerService === "undefined" ? Object : _calendareventcleanerservice.CalendarEventCleanerService
    ])
], DeleteConnectedAccountAssociatedCalendarDataJob);

//# sourceMappingURL=delete-connected-account-associated-calendar-data.job.js.map