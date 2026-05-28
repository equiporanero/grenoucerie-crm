/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EventLogCleanupJob", {
    enumerable: true,
    get: function() {
        return EventLogCleanupJob;
    }
});
const _common = require("@nestjs/common");
const _eventlogcleanupservice = require("../services/event-log-cleanup.service");
const _processdecorator = require("../../../message-queue/decorators/process.decorator");
const _processordecorator = require("../../../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../message-queue/message-queue.constants");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let EventLogCleanupJob = class EventLogCleanupJob {
    async handle(data) {
        const { workspaceId, eventLogRetentionDays } = data;
        try {
            await this.eventLogCleanupService.cleanupWorkspaceEventLogs({
                workspaceId,
                retentionDays: eventLogRetentionDays
            });
        } catch (error) {
            this.logger.error(`Event log cleanup failed for workspace ${workspaceId}`, error instanceof Error ? error.stack : String(error));
            throw error;
        }
    }
    constructor(eventLogCleanupService){
        this.eventLogCleanupService = eventLogCleanupService;
        this.logger = new _common.Logger(EventLogCleanupJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(EventLogCleanupJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof EventLogCleanupJobData === "undefined" ? Object : EventLogCleanupJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], EventLogCleanupJob.prototype, "handle", null);
EventLogCleanupJob = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.workspaceQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _eventlogcleanupservice.EventLogCleanupService === "undefined" ? Object : _eventlogcleanupservice.EventLogCleanupService
    ])
], EventLogCleanupJob);

//# sourceMappingURL=event-log-cleanup.job.js.map