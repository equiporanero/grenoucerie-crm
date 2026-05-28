"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _terminus = require("@nestjs/terminus");
const _testing = require("@nestjs/testing");
const _types = require("twenty-shared/types");
const _healtherrormessagesconstants = require("../constants/health-error-messages.constants");
const _healthindicatorstimeoutconts = require("../constants/health-indicators-timeout.conts");
const _metricsfailureratethresholdconst = require("../constants/metrics-failure-rate-threshold.const");
const _connectedaccounthealth = require("../indicators/connected-account.health");
const _metricsservice = require("../../metrics/metrics.service");
describe('ConnectedAccountHealth', ()=>{
    let service;
    let metricsService;
    let healthIndicatorService;
    beforeEach(async ()=>{
        metricsService = {
            groupMetrics: jest.fn()
        };
        healthIndicatorService = {
            check: jest.fn().mockImplementation((key)=>({
                    up: jest.fn().mockImplementation((data)=>({
                            [key]: {
                                status: 'up',
                                details: data.details
                            }
                        })),
                    down: jest.fn().mockImplementation((data)=>({
                            [key]: {
                                status: 'down',
                                error: data.error,
                                details: data.details
                            }
                        }))
                }))
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _connectedaccounthealth.ConnectedAccountHealth,
                {
                    provide: _metricsservice.MetricsService,
                    useValue: metricsService
                },
                {
                    provide: _terminus.HealthIndicatorService,
                    useValue: healthIndicatorService
                }
            ]
        }).compile();
        service = module.get(_connectedaccounthealth.ConnectedAccountHealth);
        jest.useFakeTimers();
    });
    afterEach(()=>{
        jest.useRealTimers();
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('message sync health', ()=>{
        it('should return up status when no message sync jobs are present', async ()=>{
            metricsService.groupMetrics.mockResolvedValueOnce({
                [_types.MessageChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.MessageChannelSyncStatus.ACTIVE]: 0,
                [_types.MessageChannelSyncStatus.FAILED_INSUFFICIENT_PERMISSIONS]: 0,
                [_types.MessageChannelSyncStatus.FAILED_UNKNOWN]: 0
            }).mockResolvedValueOnce({
                [_types.CalendarChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.CalendarChannelSyncStatus.ACTIVE]: 0
            });
            const result = await service.isHealthy();
            expect(result.connectedAccount.status).toBe('up');
            expect(result.connectedAccount.details.messageSync.status).toBe('up');
            expect(result.connectedAccount.details.messageSync.details.totalJobs).toBe(0);
            expect(result.connectedAccount.details.messageSync.details.failedJobs).toBe(0);
            expect(result.connectedAccount.details.messageSync.details.failureRate).toBe(0);
        });
        it(`should return down status when message sync failure rate is above ${_metricsfailureratethresholdconst.METRICS_FAILURE_RATE_THRESHOLD}%`, async ()=>{
            metricsService.groupMetrics.mockResolvedValueOnce({
                [_types.MessageChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.MessageChannelSyncStatus.ACTIVE]: 1,
                [_types.MessageChannelSyncStatus.FAILED_INSUFFICIENT_PERMISSIONS]: 2,
                [_types.MessageChannelSyncStatus.FAILED_UNKNOWN]: 2
            }).mockResolvedValueOnce({
                [_types.CalendarChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.CalendarChannelSyncStatus.ACTIVE]: 1
            });
            const result = await service.isHealthy();
            expect(result.connectedAccount.status).toBe('down');
            expect(result.connectedAccount.error).toBe(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.MESSAGE_SYNC_HIGH_FAILURE_RATE);
            expect(result.connectedAccount.details.messageSync.status).toBe('down');
            expect(result.connectedAccount.details.messageSync.error).toBe(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.MESSAGE_SYNC_HIGH_FAILURE_RATE);
            expect(result.connectedAccount.details.messageSync.details.failureRate).toBe(40);
        });
    });
    describe('calendar sync health', ()=>{
        it('should return up status when no calendar sync jobs are present', async ()=>{
            metricsService.groupMetrics.mockResolvedValueOnce({
                [_types.MessageChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.MessageChannelSyncStatus.ACTIVE]: 0
            }).mockResolvedValueOnce({
                [_types.CalendarChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.CalendarChannelSyncStatus.ACTIVE]: 0,
                [_types.CalendarChannelSyncStatus.FAILED_INSUFFICIENT_PERMISSIONS]: 0,
                [_types.CalendarChannelSyncStatus.FAILED_UNKNOWN]: 0
            });
            const result = await service.isHealthy();
            expect(result.connectedAccount.status).toBe('up');
            expect(result.connectedAccount.details.calendarSync.status).toBe('up');
            expect(result.connectedAccount.details.calendarSync.details.totalJobs).toBe(0);
            expect(result.connectedAccount.details.calendarSync.details.failedJobs).toBe(0);
            expect(result.connectedAccount.details.calendarSync.details.failureRate).toBe(0);
        });
        it(`should return down status when calendar sync failure rate is above ${_metricsfailureratethresholdconst.METRICS_FAILURE_RATE_THRESHOLD}%`, async ()=>{
            metricsService.groupMetrics.mockResolvedValueOnce({
                [_types.MessageChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.MessageChannelSyncStatus.ACTIVE]: 1
            }).mockResolvedValueOnce({
                [_types.CalendarChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.CalendarChannelSyncStatus.ACTIVE]: 1,
                [_types.CalendarChannelSyncStatus.FAILED_INSUFFICIENT_PERMISSIONS]: 2,
                [_types.CalendarChannelSyncStatus.FAILED_UNKNOWN]: 2
            });
            const result = await service.isHealthy();
            expect(result.connectedAccount.status).toBe('down');
            expect(result.connectedAccount.error).toBe(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.CALENDAR_SYNC_HIGH_FAILURE_RATE);
            expect(result.connectedAccount.details.calendarSync.status).toBe('down');
            expect(result.connectedAccount.details.calendarSync.error).toBe(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.CALENDAR_SYNC_HIGH_FAILURE_RATE);
            expect(result.connectedAccount.details.calendarSync.details.failureRate).toBe(40);
        });
    });
    describe('timeout handling', ()=>{
        it('should handle message sync timeout', async ()=>{
            metricsService.groupMetrics.mockResolvedValueOnce(new Promise((resolve)=>setTimeout(resolve, _healthindicatorstimeoutconts.HEALTH_INDICATORS_TIMEOUT + 100))).mockResolvedValueOnce({
                [_types.CalendarChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.CalendarChannelSyncStatus.ACTIVE]: 1
            });
            const healthCheckPromise = service.isHealthy();
            jest.advanceTimersByTime(_healthindicatorstimeoutconts.HEALTH_INDICATORS_TIMEOUT + 1);
            const result = await healthCheckPromise;
            expect(result.connectedAccount.status).toBe('down');
            expect(result.connectedAccount.error).toBe(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.MESSAGE_SYNC_TIMEOUT);
            expect(result.connectedAccount.details.messageSync.status).toBe('down');
            expect(result.connectedAccount.details.messageSync.error).toBe(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.MESSAGE_SYNC_TIMEOUT);
        });
        it('should handle calendar sync timeout', async ()=>{
            metricsService.groupMetrics.mockResolvedValueOnce({
                [_types.MessageChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.MessageChannelSyncStatus.ACTIVE]: 1
            }).mockResolvedValueOnce(new Promise((resolve)=>setTimeout(resolve, _healthindicatorstimeoutconts.HEALTH_INDICATORS_TIMEOUT + 100)));
            const healthCheckPromise = service.isHealthy();
            jest.advanceTimersByTime(_healthindicatorstimeoutconts.HEALTH_INDICATORS_TIMEOUT + 1);
            const result = await healthCheckPromise;
            expect(result.connectedAccount.status).toBe('down');
            expect(result.connectedAccount.error).toBe(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.CALENDAR_SYNC_TIMEOUT);
            expect(result.connectedAccount.details.calendarSync.status).toBe('down');
            expect(result.connectedAccount.details.calendarSync.error).toBe(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.CALENDAR_SYNC_TIMEOUT);
        });
    });
    describe('combined health check', ()=>{
        it('should return combined status with both checks healthy', async ()=>{
            metricsService.groupMetrics.mockResolvedValueOnce({
                [_types.MessageChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.MessageChannelSyncStatus.ACTIVE]: 8,
                [_types.MessageChannelSyncStatus.FAILED_UNKNOWN]: 1
            }).mockResolvedValueOnce({
                [_types.CalendarChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.CalendarChannelSyncStatus.ACTIVE]: 8,
                [_types.CalendarChannelSyncStatus.FAILED_UNKNOWN]: 1
            });
            const result = await service.isHealthy();
            expect(result.connectedAccount.status).toBe('up');
            expect(result.connectedAccount.details.messageSync.status).toBe('up');
            expect(result.connectedAccount.details.calendarSync.status).toBe('up');
        });
        it('should return down status when both syncs fail', async ()=>{
            metricsService.groupMetrics.mockResolvedValueOnce({
                [_types.MessageChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.MessageChannelSyncStatus.ACTIVE]: 1,
                [_types.MessageChannelSyncStatus.FAILED_UNKNOWN]: 2
            }).mockResolvedValueOnce({
                [_types.CalendarChannelSyncStatus.NOT_SYNCED]: 0,
                [_types.CalendarChannelSyncStatus.ACTIVE]: 1,
                [_types.CalendarChannelSyncStatus.FAILED_UNKNOWN]: 2
            });
            const result = await service.isHealthy();
            expect(result.connectedAccount.status).toBe('down');
            expect(result.connectedAccount.error).toBe(`${_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.MESSAGE_SYNC_HIGH_FAILURE_RATE} and ${_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.CALENDAR_SYNC_HIGH_FAILURE_RATE}`);
            expect(result.connectedAccount.details.messageSync.status).toBe('down');
            expect(result.connectedAccount.details.calendarSync.status).toBe('down');
        });
    });
});

//# sourceMappingURL=connected-account.health.spec.js.map