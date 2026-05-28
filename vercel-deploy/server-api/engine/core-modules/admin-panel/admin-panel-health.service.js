"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelHealthService", {
    enumerable: true,
    get: function() {
        return AdminPanelHealthService;
    }
});
const _common = require("@nestjs/common");
const _bullmq = require("bullmq");
const _healthindicatorsconstants = require("./constants/health-indicators.constants");
const _adminpanelhealthservicestatusenum = require("./enums/admin-panel-health-service-status.enum");
const _queuemetricstimerangeenum = require("./enums/queue-metrics-time-range.enum");
const _healthindicatoridenum = require("./enums/health-indicator-id.enum");
const _apphealth = require("./indicators/app.health");
const _connectedaccounthealth = require("./indicators/connected-account.health");
const _databasehealth = require("./indicators/database.health");
const _redishealth = require("./indicators/redis.health");
const _workerhealth = require("./indicators/worker.health");
const _redisclientservice = require("../redis-client/redis-client.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AdminPanelHealthService = class AdminPanelHealthService {
    transformStatus(status) {
        return status === 'up' ? _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OPERATIONAL : _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OUTAGE;
    }
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    transformServiceDetails(details) {
        if (!details) return details;
        if (details.details) {
            if (details.details.messageSync) {
                details.details.messageSync.status = this.transformStatus(details.details.messageSync.status);
            }
            if (details.details.calendarSync) {
                details.details.calendarSync.status = this.transformStatus(details.details.calendarSync.status);
            }
        }
        return details;
    }
    getServiceStatus(result, indicatorId) {
        if (result.status === 'fulfilled') {
            const keys = Object.keys(result.value);
            if (keys.length === 0) {
                return {
                    ..._healthindicatorsconstants.HEALTH_INDICATORS[indicatorId],
                    status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OUTAGE,
                    errorMessage: 'No health check result available'
                };
            }
            const key = keys[0];
            const serviceResult = result.value[key];
            const { status, message, ...detailsWithoutStatus } = serviceResult;
            const indicator = _healthindicatorsconstants.HEALTH_INDICATORS[indicatorId];
            const transformedDetails = this.transformServiceDetails(detailsWithoutStatus);
            return {
                id: indicatorId,
                label: indicator.label,
                description: indicator.description,
                status: this.transformStatus(status),
                errorMessage: message,
                details: Object.keys(transformedDetails).length > 0 ? JSON.stringify(transformedDetails) : undefined,
                queues: serviceResult.queues
            };
        }
        return {
            ..._healthindicatorsconstants.HEALTH_INDICATORS[indicatorId],
            status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OUTAGE,
            errorMessage: result.reason?.message?.toString(),
            details: result.reason?.details ? JSON.stringify(result.reason.details) : undefined
        };
    }
    async getIndicatorHealthStatus(indicatorId) {
        const healthIndicator = this.healthIndicators[indicatorId];
        if (!healthIndicator) {
            throw new Error(`Health indicator not found: ${indicatorId}`);
        }
        const result = await Promise.allSettled([
            healthIndicator.isHealthy()
        ]);
        const indicatorStatus = this.getServiceStatus(result[0], indicatorId);
        if (indicatorId === _healthindicatoridenum.HealthIndicatorId.worker) {
            return {
                ...indicatorStatus,
                // @ts-expect-error legacy noImplicitAny
                queues: (indicatorStatus?.queues ?? []).map((queue)=>({
                        id: `${indicatorId}-${queue.queueName}`,
                        queueName: queue.queueName,
                        status: queue.workers > 0 ? _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OPERATIONAL : _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OUTAGE
                    }))
            };
        }
        return indicatorStatus;
    }
    async getSystemHealthStatus() {
        const [databaseResult, redisResult, workerResult, accountSyncResult, appResult] = await Promise.allSettled([
            this.databaseHealth.isHealthy(),
            this.redisHealth.isHealthy(),
            this.workerHealth.isHealthy(),
            this.connectedAccountHealth.isHealthy(),
            this.appHealth.isHealthy()
        ]);
        return {
            services: [
                {
                    ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.database],
                    status: this.getServiceStatus(databaseResult, _healthindicatoridenum.HealthIndicatorId.database).status
                },
                {
                    ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.redis],
                    status: this.getServiceStatus(redisResult, _healthindicatoridenum.HealthIndicatorId.redis).status
                },
                {
                    ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.worker],
                    status: this.getServiceStatus(workerResult, _healthindicatoridenum.HealthIndicatorId.worker).status
                },
                {
                    ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.connectedAccount],
                    status: this.getServiceStatus(accountSyncResult, _healthindicatoridenum.HealthIndicatorId.connectedAccount).status
                },
                {
                    ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.app],
                    status: this.getServiceStatus(appResult, _healthindicatoridenum.HealthIndicatorId.app).status
                }
            ]
        };
    }
    async getQueueMetrics(queueName, timeRange = _queuemetricstimerangeenum.QueueMetricsTimeRange.OneDay) {
        const redis = this.redisClient.getQueueClient();
        const queue = new _bullmq.Queue(queueName, {
            connection: redis
        });
        try {
            const { pointsNeeded, samplingFactor } = this.getPointsConfiguration(timeRange);
            const queueDetails = await this.workerHealth.getQueueDetails(queueName, {
                pointsNeeded
            });
            const completedMetricsArray = queueDetails?.metrics?.completedData;
            const failedMetricsArray = queueDetails?.metrics?.failedData;
            const completedMetrics = this.extractMetricsData(completedMetricsArray, pointsNeeded, samplingFactor);
            const failedMetrics = this.extractMetricsData(failedMetricsArray, pointsNeeded, samplingFactor);
            return this.transformMetricsForGraph(completedMetrics, failedMetrics, timeRange, queueName, queueDetails);
        } catch (error) {
            this.logger.error(`Error getting metrics for ${queueName}: ${error.message}`);
            throw error;
        } finally{
            await queue.close();
        }
    }
    getPointsConfiguration(timeRange) {
        const targetVisualizationPoints = 240;
        let pointsNeeded;
        switch(timeRange){
            case _queuemetricstimerangeenum.QueueMetricsTimeRange.OneHour:
                pointsNeeded = 60; // 60 points (1 hour)
                break;
            case _queuemetricstimerangeenum.QueueMetricsTimeRange.FourHours:
                pointsNeeded = 4 * 60; // 240 points (4 hours)
                break;
            case _queuemetricstimerangeenum.QueueMetricsTimeRange.TwelveHours:
                pointsNeeded = 12 * 60; // 720 points (12 hours)
                break;
            case _queuemetricstimerangeenum.QueueMetricsTimeRange.OneDay:
                pointsNeeded = 24 * 60; // 1440 points (24 hours)
                break;
            case _queuemetricstimerangeenum.QueueMetricsTimeRange.SevenDays:
                pointsNeeded = 7 * 24 * 60; // 10080 points (7 days)
                break;
            default:
                pointsNeeded = 24 * 60; // Default to 1 day
        }
        const samplingFactor = pointsNeeded <= targetVisualizationPoints ? 1 : Math.ceil(pointsNeeded / targetVisualizationPoints);
        return {
            pointsNeeded,
            samplingFactor,
            targetVisualizationPoints
        };
    }
    extractMetricsData(metrics, pointsNeeded, samplingFactor = 1) {
        if (!metrics || !Array.isArray(metrics)) {
            return Array(Math.ceil(pointsNeeded / samplingFactor)).fill(0);
        }
        try {
            const targetPoints = Math.ceil(pointsNeeded / samplingFactor);
            const relevantData = metrics.slice(-pointsNeeded);
            const result = [];
            const backfillCount = Math.max(0, targetPoints - Math.ceil(relevantData.length / samplingFactor));
            result.push(...Array(backfillCount).fill(0));
            for(let i = 0; i < relevantData.length; i += samplingFactor){
                const chunk = relevantData.slice(i, i + samplingFactor);
                result.push(Math.max(...chunk));
            }
            return result.slice(0, targetPoints);
        } catch (error) {
            this.logger.error(`Error extracting metrics data: ${error.message}`);
            throw error;
        }
    }
    transformMetricsForGraph(completedMetrics, failedMetrics, timeRange, queueName, queueDetails) {
        try {
            return {
                queueName,
                timeRange,
                details: queueDetails?.metrics ?? null,
                workers: queueDetails?.workers ?? 0,
                data: [
                    {
                        id: 'Completed Jobs',
                        data: completedMetrics.map((count, index)=>({
                                x: index,
                                y: count
                            }))
                    },
                    {
                        id: 'Failed Jobs',
                        data: failedMetrics.map((count, index)=>({
                                x: index,
                                y: count
                            }))
                    }
                ]
            };
        } catch (error) {
            this.logger.error(`Error transforming metrics for graph: ${error.message}`);
            throw error;
        }
    }
    constructor(databaseHealth, redisHealth, workerHealth, connectedAccountHealth, appHealth, redisClient){
        this.databaseHealth = databaseHealth;
        this.redisHealth = redisHealth;
        this.workerHealth = workerHealth;
        this.connectedAccountHealth = connectedAccountHealth;
        this.appHealth = appHealth;
        this.redisClient = redisClient;
        this.logger = new _common.Logger(AdminPanelHealthService.name);
        this.healthIndicators = {
            [_healthindicatoridenum.HealthIndicatorId.database]: this.databaseHealth,
            [_healthindicatoridenum.HealthIndicatorId.redis]: this.redisHealth,
            [_healthindicatoridenum.HealthIndicatorId.worker]: this.workerHealth,
            [_healthindicatoridenum.HealthIndicatorId.connectedAccount]: this.connectedAccountHealth,
            [_healthindicatoridenum.HealthIndicatorId.app]: this.appHealth
        };
    }
};
AdminPanelHealthService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _databasehealth.DatabaseHealthIndicator === "undefined" ? Object : _databasehealth.DatabaseHealthIndicator,
        typeof _redishealth.RedisHealthIndicator === "undefined" ? Object : _redishealth.RedisHealthIndicator,
        typeof _workerhealth.WorkerHealthIndicator === "undefined" ? Object : _workerhealth.WorkerHealthIndicator,
        typeof _connectedaccounthealth.ConnectedAccountHealth === "undefined" ? Object : _connectedaccounthealth.ConnectedAccountHealth,
        typeof _apphealth.AppHealthIndicator === "undefined" ? Object : _apphealth.AppHealthIndicator,
        typeof _redisclientservice.RedisClientService === "undefined" ? Object : _redisclientservice.RedisClientService
    ])
], AdminPanelHealthService);

//# sourceMappingURL=admin-panel-health.service.js.map