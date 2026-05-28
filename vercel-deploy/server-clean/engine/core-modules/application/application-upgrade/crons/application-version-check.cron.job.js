"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationVersionCheckCronJob", {
    enumerable: true,
    get: function() {
        return ApplicationVersionCheckCronJob;
    }
});
const _common = require("@nestjs/common");
const _sentrycronmonitordecorator = require("../../../cron/sentry-cron-monitor.decorator");
const _applicationupgradeservice = require("../application-upgrade.service");
const _applicationversioncheckcronpatternconstant = require("./constants/application-version-check-cron-pattern.constant");
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
let ApplicationVersionCheckCronJob = class ApplicationVersionCheckCronJob {
    async handle() {
        this.logger.log('Starting application version check...');
        try {
            await this.applicationUpgradeService.checkAllForUpdates();
            this.logger.log('Application version check completed successfully');
        } catch (error) {
            this.logger.error(`Application version check failed: ${error instanceof Error ? error.message : String(error)}`);
            throw error;
        }
    }
    constructor(applicationUpgradeService){
        this.applicationUpgradeService = applicationUpgradeService;
        this.logger = new _common.Logger(ApplicationVersionCheckCronJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(ApplicationVersionCheckCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(ApplicationVersionCheckCronJob.name, _applicationversioncheckcronpatternconstant.APPLICATION_VERSION_CHECK_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], ApplicationVersionCheckCronJob.prototype, "handle", null);
ApplicationVersionCheckCronJob = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationupgradeservice.ApplicationUpgradeService === "undefined" ? Object : _applicationupgradeservice.ApplicationUpgradeService
    ])
], ApplicationVersionCheckCronJob);

//# sourceMappingURL=application-version-check.cron.job.js.map