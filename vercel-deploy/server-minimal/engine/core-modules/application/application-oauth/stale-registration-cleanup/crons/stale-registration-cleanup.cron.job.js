"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "StaleRegistrationCleanupCronJob", {
    enumerable: true,
    get: function() {
        return StaleRegistrationCleanupCronJob;
    }
});
const _common = require("@nestjs/common");
const _sentrycronmonitordecorator = require("../../../../cron/sentry-cron-monitor.decorator");
const _exceptionhandlerservice = require("../../../../exception-handler/exception-handler.service");
const _processdecorator = require("../../../../message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../message-queue/message-queue.constants");
const _staleregistrationcleanupcronpatternconstant = require("../constants/stale-registration-cleanup-cron-pattern.constant");
const _staleregistrationcleanupservice = require("../services/stale-registration-cleanup.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let StaleRegistrationCleanupCronJob = class StaleRegistrationCleanupCronJob {
    async handle() {
        this.logger.log('Starting stale OAuth registration cleanup');
        try {
            const deletedCount = await this.staleRegistrationCleanupService.cleanupStaleRegistrations();
            this.logger.log(`Stale OAuth registration cleanup completed: ${deletedCount} registration(s) deleted`);
        } catch (error) {
            this.exceptionHandlerService.captureExceptions([
                error
            ]);
            throw error;
        }
    }
    constructor(staleRegistrationCleanupService, exceptionHandlerService){
        this.staleRegistrationCleanupService = staleRegistrationCleanupService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.logger = new _common.Logger(StaleRegistrationCleanupCronJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(StaleRegistrationCleanupCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(StaleRegistrationCleanupCronJob.name, _staleregistrationcleanupcronpatternconstant.STALE_REGISTRATION_CLEANUP_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], StaleRegistrationCleanupCronJob.prototype, "handle", null);
StaleRegistrationCleanupCronJob = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _staleregistrationcleanupservice.StaleRegistrationCleanupService === "undefined" ? Object : _staleregistrationcleanupservice.StaleRegistrationCleanupService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService
    ])
], StaleRegistrationCleanupCronJob);

//# sourceMappingURL=stale-registration-cleanup.cron.job.js.map