"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectedAccountHealth", {
    enumerable: true,
    get: function() {
        return ConnectedAccountHealth;
    }
});
const _common = require("@nestjs/common");
const _terminus = require("@nestjs/terminus");
const _healtherrormessagesconstants = require("../constants/health-error-messages.constants");
const _metricsfailureratethresholdconst = require("../constants/metrics-failure-rate-threshold.const");
const _healthchecktimeoututil = require("../utils/health-check-timeout.util");
const _accountsyncmetricsbystatusconstant = require("../../metrics/constants/account-sync-metrics-by-status.constant");
const _metricsservice = require("../../metrics/metrics.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ConnectedAccountHealth = class ConnectedAccountHealth {
    async checkMessageSyncHealth() {
        const indicator = this.healthIndicatorService.check('messageSync');
        try {
            const counters = await (0, _healthchecktimeoututil.withHealthCheckTimeout)(this.metricsService.groupMetrics(_accountsyncmetricsbystatusconstant.MESSAGE_SYNC_METRICS_BY_STATUS), _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.MESSAGE_SYNC_TIMEOUT);
            const totalJobs = Object.values(counters).reduce((sum, count)=>sum + (count || 0), 0);
            const failedJobs = counters.FAILED_UNKNOWN || 0;
            //    +    (counters.FAILED_INSUFFICIENT_PERMISSIONS || 0)
            const failureRate = totalJobs > 0 ? Math.round(failedJobs / totalJobs * 100 * 100) / 100 : 0;
            const details = {
                counters,
                totalJobs,
                failedJobs,
                failureRate
            };
            if (totalJobs === 0 || failureRate < _metricsfailureratethresholdconst.METRICS_FAILURE_RATE_THRESHOLD) {
                return indicator.up({
                    details
                });
            }
            return indicator.down({
                error: _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.MESSAGE_SYNC_HIGH_FAILURE_RATE,
                details
            });
        } catch (error) {
            const errorMessage = error.message === _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.MESSAGE_SYNC_TIMEOUT ? _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.MESSAGE_SYNC_TIMEOUT : _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.MESSAGE_SYNC_CHECK_FAILED;
            return indicator.down({
                error: errorMessage,
                details: {}
            });
        }
    }
    async checkCalendarSyncHealth() {
        const indicator = this.healthIndicatorService.check('calendarSync');
        try {
            const counters = await (0, _healthchecktimeoututil.withHealthCheckTimeout)(this.metricsService.groupMetrics(_accountsyncmetricsbystatusconstant.CALENDAR_SYNC_METRICS_BY_STATUS), _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.CALENDAR_SYNC_TIMEOUT);
            const totalJobs = Object.values(counters).reduce((sum, count)=>sum + (count || 0), 0);
            const failedJobs = counters.FAILED_UNKNOWN || 0;
            //    +    (counters.FAILED_INSUFFICIENT_PERMISSIONS || 0)
            const failureRate = totalJobs > 0 ? Math.round(failedJobs / totalJobs * 100 * 100) / 100 : 0;
            const details = {
                counters,
                totalJobs,
                failedJobs,
                failureRate
            };
            if (totalJobs === 0 || failureRate < _metricsfailureratethresholdconst.METRICS_FAILURE_RATE_THRESHOLD) {
                return indicator.up({
                    details
                });
            }
            return indicator.down({
                error: _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.CALENDAR_SYNC_HIGH_FAILURE_RATE,
                details
            });
        } catch (error) {
            const errorMessage = error.message === _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.CALENDAR_SYNC_TIMEOUT ? _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.CALENDAR_SYNC_TIMEOUT : _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.CALENDAR_SYNC_CHECK_FAILED;
            return indicator.down({
                error: errorMessage,
                details: {}
            });
        }
    }
    async isHealthy() {
        const indicator = this.healthIndicatorService.check('connectedAccount');
        const [messageResult, calendarResult] = await Promise.all([
            this.checkMessageSyncHealth(),
            this.checkCalendarSyncHealth()
        ]);
        const isMessageSyncDown = messageResult.messageSync.status === 'down';
        const isCalendarSyncDown = calendarResult.calendarSync.status === 'down';
        if (isMessageSyncDown || isCalendarSyncDown) {
            let error;
            if (isMessageSyncDown && isCalendarSyncDown) {
                error = `${messageResult.messageSync.error} and ${calendarResult.calendarSync.error}`;
            } else if (isMessageSyncDown) {
                error = messageResult.messageSync.error;
            } else {
                error = calendarResult.calendarSync.error;
            }
            return indicator.down({
                error,
                details: {
                    messageSync: messageResult.messageSync,
                    calendarSync: calendarResult.calendarSync
                }
            });
        }
        return indicator.up({
            details: {
                messageSync: messageResult.messageSync,
                calendarSync: calendarResult.calendarSync
            }
        });
    }
    constructor(healthIndicatorService, metricsService){
        this.healthIndicatorService = healthIndicatorService;
        this.metricsService = metricsService;
    }
};
ConnectedAccountHealth = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _terminus.HealthIndicatorService === "undefined" ? Object : _terminus.HealthIndicatorService,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService
    ])
], ConnectedAccountHealth);

//# sourceMappingURL=connected-account.health.js.map