"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _bullmq = require("bullmq");
const _adminpanelhealthservice = require("../admin-panel-health.service");
const _healthindicatorsconstants = require("../constants/health-indicators.constants");
const _adminpanelhealthservicestatusenum = require("../enums/admin-panel-health-service-status.enum");
const _queuemetricstimerangeenum = require("../enums/queue-metrics-time-range.enum");
const _healtherrormessagesconstants = require("../constants/health-error-messages.constants");
const _healthindicatoridenum = require("../enums/health-indicator-id.enum");
const _apphealth = require("../indicators/app.health");
const _connectedaccounthealth = require("../indicators/connected-account.health");
const _databasehealth = require("../indicators/database.health");
const _redishealth = require("../indicators/redis.health");
const _workerhealth = require("../indicators/worker.health");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _redisclientservice = require("../../redis-client/redis-client.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
jest.mock('bullmq');
describe('AdminPanelHealthService', ()=>{
    let service;
    let databaseHealth;
    let redisHealth;
    let workerHealth;
    let connectedAccountHealth;
    let appHealth;
    let redisClient;
    let twentyConfigService;
    let loggerSpy;
    beforeEach(async ()=>{
        databaseHealth = {
            isHealthy: jest.fn()
        };
        redisHealth = {
            isHealthy: jest.fn()
        };
        workerHealth = {
            isHealthy: jest.fn(),
            getQueueDetails: jest.fn()
        };
        connectedAccountHealth = {
            isHealthy: jest.fn()
        };
        appHealth = {
            isHealthy: jest.fn()
        };
        redisClient = {
            getClient: jest.fn().mockReturnValue({}),
            getQueueClient: jest.fn().mockReturnValue({})
        };
        twentyConfigService = {
            get: jest.fn()
        };
        Queue = jest.fn().mockImplementation(()=>({
                getMetrics: jest.fn(),
                getWorkers: jest.fn(),
                close: jest.fn()
            }));
        const module = await _testing.Test.createTestingModule({
            providers: [
                _adminpanelhealthservice.AdminPanelHealthService,
                {
                    provide: _databasehealth.DatabaseHealthIndicator,
                    useValue: databaseHealth
                },
                {
                    provide: _redishealth.RedisHealthIndicator,
                    useValue: redisHealth
                },
                {
                    provide: _workerhealth.WorkerHealthIndicator,
                    useValue: workerHealth
                },
                {
                    provide: _connectedaccounthealth.ConnectedAccountHealth,
                    useValue: connectedAccountHealth
                },
                {
                    provide: _apphealth.AppHealthIndicator,
                    useValue: appHealth
                },
                {
                    provide: _redisclientservice.RedisClientService,
                    useValue: redisClient
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: twentyConfigService
                }
            ]
        }).compile();
        service = module.get(_adminpanelhealthservice.AdminPanelHealthService);
        // Override the healthIndicators mapping with our mocked instances
        service['healthIndicators'] = {
            [_healthindicatoridenum.HealthIndicatorId.database]: databaseHealth,
            [_healthindicatoridenum.HealthIndicatorId.redis]: redisHealth,
            [_healthindicatoridenum.HealthIndicatorId.worker]: workerHealth,
            [_healthindicatoridenum.HealthIndicatorId.connectedAccount]: connectedAccountHealth,
            [_healthindicatoridenum.HealthIndicatorId.app]: appHealth
        };
        loggerSpy = jest.spyOn(service['logger'], 'error').mockImplementation(()=>{});
    });
    afterEach(()=>{
        jest.clearAllMocks();
        loggerSpy.mockRestore();
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('getSystemHealthStatus', ()=>{
        it('should transform health check response to SystemHealth format', async ()=>{
            databaseHealth.isHealthy.mockResolvedValue({
                database: {
                    status: 'up',
                    details: 'Database is healthy'
                }
            });
            redisHealth.isHealthy.mockResolvedValue({
                redis: {
                    status: 'up',
                    details: 'Redis is connected'
                }
            });
            workerHealth.isHealthy.mockResolvedValue({
                worker: {
                    status: 'up',
                    queues: [
                        {
                            queueName: 'test',
                            workers: 1,
                            metrics: {
                                active: 1,
                                completed: 0,
                                delayed: 4,
                                failed: 3,
                                waiting: 0,
                                failureRate: 0.3
                            },
                            status: 'up'
                        }
                    ]
                }
            });
            connectedAccountHealth.isHealthy.mockResolvedValue({
                connectedAccount: {
                    status: 'up',
                    details: 'Account sync is operational'
                }
            });
            appHealth.isHealthy.mockResolvedValue({
                app: {
                    status: 'up',
                    details: {
                        system: {
                            nodeVersion: '16.0'
                        },
                        workspaces: {
                            totalWorkspaces: 1,
                            healthStatus: [
                                {
                                    workspaceId: '1',
                                    summary: {
                                        structuralIssues: 0,
                                        dataIssues: 0,
                                        relationshipIssues: 0,
                                        pendingMigrations: 0
                                    },
                                    severity: 'healthy',
                                    details: {}
                                }
                            ]
                        }
                    }
                }
            });
            const result = await service.getSystemHealthStatus();
            const expected = {
                services: [
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.database],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OPERATIONAL
                    },
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.redis],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OPERATIONAL
                    },
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.worker],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OPERATIONAL
                    },
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.connectedAccount],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OPERATIONAL
                    },
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.app],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OPERATIONAL
                    }
                ]
            };
            expect(result).toStrictEqual(expected);
        });
        it('should handle mixed health statuses', async ()=>{
            databaseHealth.isHealthy.mockResolvedValue({
                database: {
                    status: 'up'
                }
            });
            redisHealth.isHealthy.mockRejectedValue(new Error(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.REDIS_CONNECTION_FAILED));
            workerHealth.isHealthy.mockResolvedValue({
                worker: {
                    status: 'up',
                    queues: []
                }
            });
            connectedAccountHealth.isHealthy.mockResolvedValue({
                connectedAccount: {
                    status: 'up'
                }
            });
            appHealth.isHealthy.mockResolvedValue({
                app: {
                    status: 'down',
                    details: {}
                }
            });
            const result = await service.getSystemHealthStatus();
            expect(result).toStrictEqual({
                services: [
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.database],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OPERATIONAL
                    },
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.redis],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OUTAGE
                    },
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.worker],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OPERATIONAL
                    },
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.connectedAccount],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OPERATIONAL
                    },
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.app],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OUTAGE
                    }
                ]
            });
        });
        it('should handle all services down', async ()=>{
            databaseHealth.isHealthy.mockRejectedValue(new Error(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.DATABASE_CONNECTION_FAILED));
            redisHealth.isHealthy.mockRejectedValue(new Error(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.REDIS_CONNECTION_FAILED));
            workerHealth.isHealthy.mockRejectedValue(new Error(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.NO_ACTIVE_WORKERS));
            connectedAccountHealth.isHealthy.mockRejectedValue(new Error(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.MESSAGE_SYNC_CHECK_FAILED));
            appHealth.isHealthy.mockRejectedValue(new Error(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.APP_HEALTH_CHECK_FAILED));
            const result = await service.getSystemHealthStatus();
            expect(result).toStrictEqual({
                services: [
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.database],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OUTAGE
                    },
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.redis],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OUTAGE
                    },
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.worker],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OUTAGE
                    },
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.connectedAccount],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OUTAGE
                    },
                    {
                        ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.app],
                        status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OUTAGE
                    }
                ]
            });
        });
    });
    describe('getIndicatorHealthStatus', ()=>{
        it('should return health status for database indicator', async ()=>{
            const details = {
                version: '15.0',
                connections: {
                    active: 5,
                    max: 100
                }
            };
            databaseHealth.isHealthy.mockResolvedValue({
                database: {
                    status: 'up',
                    details
                }
            });
            const result = await service.getIndicatorHealthStatus(_healthindicatoridenum.HealthIndicatorId.database);
            expect(result).toStrictEqual({
                ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.database],
                status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OPERATIONAL,
                details: JSON.stringify({
                    details
                }),
                errorMessage: undefined,
                queues: undefined
            });
        });
        it('should return health status with queues for worker indicator', async ()=>{
            const mockQueues = [
                {
                    queueName: 'queue1',
                    workers: 2,
                    status: 'up'
                },
                {
                    queueName: 'queue2',
                    workers: 0,
                    status: 'up'
                }
            ];
            workerHealth.isHealthy.mockResolvedValue({
                worker: {
                    status: 'up',
                    queues: mockQueues
                }
            });
            const result = await service.getIndicatorHealthStatus(_healthindicatoridenum.HealthIndicatorId.worker);
            expect(result).toStrictEqual({
                ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.worker],
                status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OPERATIONAL,
                details: JSON.stringify({
                    queues: mockQueues
                }),
                errorMessage: undefined,
                queues: mockQueues.map((queue)=>({
                        id: `worker-${queue.queueName}`,
                        queueName: queue.queueName,
                        status: queue.workers > 0 ? _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OPERATIONAL : _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OUTAGE
                    }))
            });
        });
        it('should handle failed indicator health check', async ()=>{
            redisHealth.isHealthy.mockRejectedValue(new Error(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.REDIS_CONNECTION_FAILED));
            const result = await service.getIndicatorHealthStatus(_healthindicatoridenum.HealthIndicatorId.redis);
            expect(result).toStrictEqual({
                ..._healthindicatorsconstants.HEALTH_INDICATORS[_healthindicatoridenum.HealthIndicatorId.redis],
                status: _adminpanelhealthservicestatusenum.AdminPanelHealthServiceStatus.OUTAGE,
                details: undefined,
                errorMessage: _healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.REDIS_CONNECTION_FAILED
            });
        });
        it('should throw error for invalid indicator', async ()=>{
            await expect(// @ts-expect-error Testing invalid input
            service.getIndicatorHealthStatus('invalid')).rejects.toThrow('Health indicator not found: invalid');
        });
    });
    describe('getQueueMetrics', ()=>{
        const mockQueue = {
            getMetrics: jest.fn(),
            getWorkers: jest.fn(),
            close: jest.fn()
        };
        beforeEach(()=>{
            jest.clearAllMocks();
            redisClient.getClient.mockReturnValue({});
            redisClient.getQueueClient.mockReturnValue({});
            _bullmq.Queue.mockImplementation(()=>mockQueue);
        });
        it('should return metrics data for a queue with correct data transformation', async ()=>{
            const mockCompletedData = Array(240).fill(0).map((_, i)=>i);
            const mockFailedData = Array(240).fill(0).map((_, i)=>i * 0.1);
            workerHealth.getQueueDetails.mockResolvedValue({
                queueName: 'test-queue',
                workers: 1,
                status: 'up',
                metrics: {
                    active: 1,
                    completed: 30,
                    failed: 3,
                    waiting: 0,
                    delayed: 0,
                    failureRate: 9.1,
                    completedData: mockCompletedData,
                    failedData: mockFailedData
                }
            });
            const result = await service.getQueueMetrics(_messagequeueconstants.MessageQueue.messagingQueue, _queuemetricstimerangeenum.QueueMetricsTimeRange.FourHours);
            expect(result).toMatchObject({
                queueName: _messagequeueconstants.MessageQueue.messagingQueue,
                timeRange: _queuemetricstimerangeenum.QueueMetricsTimeRange.FourHours,
                workers: 1,
                details: expect.any(Object),
                data: expect.arrayContaining([
                    expect.objectContaining({
                        id: 'Completed Jobs',
                        data: expect.arrayContaining([
                            expect.objectContaining({
                                x: expect.any(Number),
                                y: expect.any(Number)
                            })
                        ])
                    }),
                    expect.objectContaining({
                        id: 'Failed Jobs',
                        data: expect.arrayContaining([
                            expect.objectContaining({
                                x: expect.any(Number),
                                y: expect.any(Number)
                            })
                        ])
                    })
                ])
            });
        });
        it('should handle empty metrics data', async ()=>{
            workerHealth.getQueueDetails.mockResolvedValue(null);
            const result = await service.getQueueMetrics(_messagequeueconstants.MessageQueue.messagingQueue, _queuemetricstimerangeenum.QueueMetricsTimeRange.FourHours);
            expect(result.data).toHaveLength(2);
            expect(result.data[0].data).toHaveLength(240);
            expect(result.data[1].data).toHaveLength(240);
        });
        it('should handle metrics service errors', async ()=>{
            workerHealth.getQueueDetails.mockRejectedValue(new Error('Metrics error'));
            await expect(service.getQueueMetrics(_messagequeueconstants.MessageQueue.messagingQueue, _queuemetricstimerangeenum.QueueMetricsTimeRange.FourHours)).rejects.toThrow('Metrics error');
            expect(loggerSpy).toHaveBeenCalledWith('Error getting metrics for messaging-queue: Metrics error');
        });
        describe('backfilling behavior', ()=>{
            it('should handle partial data with correct historical backfilling', async ()=>{
                // Test with 40 recent points for 4-hour range (needs 240 points)
                const partialData = Array(40).fill(0).map((_, i)=>i + 1);
                workerHealth.getQueueDetails.mockResolvedValue({
                    queueName: 'test-queue',
                    workers: 1,
                    status: 'up',
                    metrics: {
                        failed: 0,
                        completed: 0,
                        waiting: 0,
                        active: 0,
                        delayed: 0,
                        failureRate: 0,
                        completedData: partialData,
                        failedData: partialData
                    }
                });
                const result = await service.getQueueMetrics(_messagequeueconstants.MessageQueue.messagingQueue, _queuemetricstimerangeenum.QueueMetricsTimeRange.FourHours);
                // Should have 240 total points
                expect(result.data[0].data).toHaveLength(240);
                // First 200 points should be zero (historical backfill)
                const historicalPoints = result.data[0].data.slice(0, 200);
                expect(historicalPoints.every((point)=>point.y === 0)).toBe(true);
                // Last 40 points should be actual data
                const actualDataPoints = result.data[0].data.slice(200);
                expect(actualDataPoints.every((point)=>point.y > 0)).toBe(true);
                // Verify chronological order (increasing values)
                const nonZeroValues = actualDataPoints.map((point)=>point.y);
                for(let i = 1; i < nonZeroValues.length; i++){
                    expect(nonZeroValues[i]).toBeGreaterThan(nonZeroValues[i - 1]);
                }
            });
            it('should handle completely empty data with full backfilling', async ()=>{
                workerHealth.getQueueDetails.mockResolvedValue({
                    queueName: 'test-queue',
                    workers: 1,
                    status: 'up',
                    metrics: {
                        failed: 0,
                        completed: 0,
                        waiting: 0,
                        active: 0,
                        delayed: 0,
                        failureRate: 0,
                        completedData: [],
                        failedData: []
                    }
                });
                const result = await service.getQueueMetrics(_messagequeueconstants.MessageQueue.messagingQueue, _queuemetricstimerangeenum.QueueMetricsTimeRange.OneHour);
                // Should have 60 points for one hour
                expect(result.data[0].data).toHaveLength(60);
                // All points should be zero
                expect(result.data[0].data.every((point)=>point.y === 0)).toBe(true);
            });
        });
        describe('sampling behavior', ()=>{
            it('should correctly sample data for different time ranges', async ()=>{
                const testCases = [
                    {
                        timeRange: _queuemetricstimerangeenum.QueueMetricsTimeRange.OneHour,
                        expectedPoints: 60,
                        samplingFactor: 1
                    },
                    {
                        timeRange: _queuemetricstimerangeenum.QueueMetricsTimeRange.FourHours,
                        expectedPoints: 240,
                        samplingFactor: 1
                    },
                    {
                        timeRange: _queuemetricstimerangeenum.QueueMetricsTimeRange.OneDay,
                        expectedPoints: 240,
                        samplingFactor: 6
                    }
                ];
                for (const testCase of testCases){
                    // Create test data with non-zero values
                    const testData = Array(testCase.expectedPoints * 2).fill(0).map((_, i)=>i + 1); // Start from 1 to avoid zero values
                    workerHealth.getQueueDetails.mockResolvedValue({
                        queueName: 'test-queue',
                        workers: 1,
                        status: 'up',
                        metrics: {
                            failed: 0,
                            completed: 0,
                            waiting: 0,
                            active: 0,
                            delayed: 0,
                            failureRate: 0,
                            completedData: testData,
                            failedData: testData
                        }
                    });
                    const result = await service.getQueueMetrics(_messagequeueconstants.MessageQueue.messagingQueue, testCase.timeRange);
                    expect(result.data[0].data).toHaveLength(testCase.expectedPoints);
                    if (testCase.samplingFactor > 1) {
                        const sampledData = result.data[0].data;
                        for(let i = 0; i < sampledData.length; i++){
                            const start = i * testCase.samplingFactor;
                            const end = start + testCase.samplingFactor;
                            const originalDataSlice = testData.slice(start, end);
                            if (originalDataSlice.length > 0) {
                                // Add this check
                                const maxInSlice = Math.max(...originalDataSlice);
                                expect(sampledData[i].y).toBeLessThanOrEqual(maxInSlice);
                            }
                        }
                    }
                }
            });
        });
    });
    describe('getPointsConfiguration', ()=>{
        const testCases = [
            {
                timeRange: _queuemetricstimerangeenum.QueueMetricsTimeRange.OneHour,
                expected: {
                    pointsNeeded: 60,
                    samplingFactor: 1,
                    targetVisualizationPoints: 240
                }
            },
            {
                timeRange: _queuemetricstimerangeenum.QueueMetricsTimeRange.FourHours,
                expected: {
                    pointsNeeded: 240,
                    samplingFactor: 1,
                    targetVisualizationPoints: 240
                }
            },
            {
                timeRange: _queuemetricstimerangeenum.QueueMetricsTimeRange.TwelveHours,
                expected: {
                    pointsNeeded: 720,
                    samplingFactor: 3,
                    targetVisualizationPoints: 240
                }
            },
            {
                timeRange: _queuemetricstimerangeenum.QueueMetricsTimeRange.OneDay,
                expected: {
                    pointsNeeded: 1440,
                    samplingFactor: 6,
                    targetVisualizationPoints: 240
                }
            },
            {
                timeRange: _queuemetricstimerangeenum.QueueMetricsTimeRange.SevenDays,
                expected: {
                    pointsNeeded: 10080,
                    samplingFactor: 42,
                    targetVisualizationPoints: 240
                }
            }
        ];
        testCases.forEach(({ timeRange, expected })=>{
            it(`should return correct parameters for ${timeRange}`, ()=>{
                const result = service['getPointsConfiguration'](timeRange);
                expect(result).toEqual(expected);
            });
        });
    });
});

//# sourceMappingURL=admin-panel-health.service.spec.js.map