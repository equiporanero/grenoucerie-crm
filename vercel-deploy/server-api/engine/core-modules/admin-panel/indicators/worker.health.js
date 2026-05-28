"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkerHealthIndicator", {
    enumerable: true,
    get: function() {
        return WorkerHealthIndicator;
    }
});
const _common = require("@nestjs/common");
const _terminus = require("@nestjs/terminus");
const _bullmq = require("bullmq");
const _healtherrormessagesconstants = require("../constants/health-error-messages.constants");
const _metricsfailureratethresholdconst = require("../constants/metrics-failure-rate-threshold.const");
const _healthchecktimeoututil = require("../utils/health-check-timeout.util");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _redisclientservice = require("../../redis-client/redis-client.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkerHealthIndicator = class WorkerHealthIndicator {
    async isHealthy() {
        const indicator = this.healthIndicatorService.check('worker');
        try {
            const workerStatus = await (0, _healthchecktimeoututil.withHealthCheckTimeout)(this.checkWorkers(), _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.WORKER_TIMEOUT);
            if (workerStatus.status === 'up') {
                return indicator.up({
                    queues: workerStatus.queues
                });
            }
            return indicator.down(workerStatus.error);
        } catch (error) {
            const errorMessage = error.message === _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.WORKER_TIMEOUT ? _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.WORKER_TIMEOUT : _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.WORKER_CHECK_FAILED;
            return indicator.down(errorMessage);
        }
    }
    async getQueueDetails(queueName, options) {
        const redis = this.redisClient.getQueueClient();
        const queue = new _bullmq.Queue(queueName, {
            connection: redis
        });
        try {
            const workers = await queue.getWorkers();
            if (workers.length > 0) {
                const metricsParams = options?.pointsNeeded ? [
                    0,
                    options.pointsNeeded - 1
                ] : [];
                const [failedMetrics, completedMetrics, waitingCount, activeCount, delayedCount] = await Promise.all([
                    queue.getMetrics('failed', ...metricsParams),
                    queue.getMetrics('completed', ...metricsParams),
                    queue.getWaitingCount(),
                    queue.getActiveCount(),
                    queue.getDelayedCount()
                ]);
                const failedCount = options?.pointsNeeded ? this.calculateMetricsSum(failedMetrics.data) : failedMetrics.count;
                const completedCount = options?.pointsNeeded ? this.calculateMetricsSum(completedMetrics.data) : completedMetrics.count;
                const totalJobs = failedCount + completedCount;
                const failureRate = totalJobs > 0 ? Number((failedCount / totalJobs * 100).toFixed(1)) : 0;
                return {
                    queueName,
                    workers: workers.length,
                    status: failureRate > _metricsfailureratethresholdconst.METRICS_FAILURE_RATE_THRESHOLD ? 'down' : 'up',
                    metrics: {
                        failed: failedCount,
                        completed: completedCount,
                        waiting: waitingCount,
                        active: activeCount,
                        delayed: delayedCount,
                        failureRate,
                        ...options?.pointsNeeded && {
                            failedData: failedMetrics.data.map(Number),
                            completedData: completedMetrics.data.map(Number)
                        }
                    }
                };
            }
            return null;
        } catch (error) {
            this.logger.error(`Error getting queue details for ${queueName}: ${error.message}`);
            throw error;
        } finally{
            await queue.close();
        }
    }
    calculateMetricsSum(data) {
        const sum = data.reduce((sum, value)=>{
            const numericValue = Number(value);
            return sum + (isNaN(numericValue) ? 0 : numericValue);
        }, 0);
        return Math.round(Number(sum));
    }
    async checkWorkers() {
        const queues = Object.values(_messagequeueconstants.MessageQueue);
        const queueStatuses = [];
        for (const queueName of queues){
            try {
                const queueDetails = await this.getQueueDetails(queueName);
                if (queueDetails) {
                    queueStatuses.push(queueDetails);
                }
            } catch (error) {
                this.logger.error(`Error checking worker for queue ${queueName}: ${error.message}`);
            }
        }
        const hasActiveWorkers = queueStatuses.some((q)=>q.workers > 0);
        return {
            status: hasActiveWorkers ? 'up' : 'down',
            error: hasActiveWorkers ? undefined : _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.NO_ACTIVE_WORKERS,
            queues: queueStatuses
        };
    }
    constructor(redisClient, healthIndicatorService){
        this.redisClient = redisClient;
        this.healthIndicatorService = healthIndicatorService;
        this.logger = new _common.Logger(WorkerHealthIndicator.name);
    }
};
WorkerHealthIndicator = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _redisclientservice.RedisClientService === "undefined" ? Object : _redisclientservice.RedisClientService,
        typeof _terminus.HealthIndicatorService === "undefined" ? Object : _terminus.HealthIndicatorService
    ])
], WorkerHealthIndicator);

//# sourceMappingURL=worker.health.js.map