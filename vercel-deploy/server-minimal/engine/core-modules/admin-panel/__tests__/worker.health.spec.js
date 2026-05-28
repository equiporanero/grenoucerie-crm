"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _terminus = require("@nestjs/terminus");
const _testing = require("@nestjs/testing");
const _healtherrormessagesconstants = require("../constants/health-error-messages.constants");
const _healthindicatorstimeoutconts = require("../constants/health-indicators-timeout.conts");
const _workerhealth = require("../indicators/worker.health");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _redisclientservice = require("../../redis-client/redis-client.service");
const mockQueueInstance = {
    getWorkers: jest.fn().mockResolvedValue([]),
    close: jest.fn().mockResolvedValue(undefined),
    getMetrics: jest.fn().mockResolvedValue({
        count: 0,
        data: []
    }),
    getWaitingCount: jest.fn().mockResolvedValue(0),
    getActiveCount: jest.fn().mockResolvedValue(0),
    getDelayedCount: jest.fn().mockResolvedValue(0)
};
jest.mock('bullmq', ()=>({
        Queue: jest.fn(()=>mockQueueInstance)
    }));
describe('WorkerHealthIndicator', ()=>{
    let service;
    let mockRedis;
    let healthIndicatorService;
    let loggerSpy;
    beforeEach(async ()=>{
        mockRedis = {
            ping: jest.fn()
        };
        const mockRedisService = {
            getClient: ()=>mockRedis,
            getQueueClient: ()=>mockRedis
        };
        healthIndicatorService = {
            check: jest.fn().mockReturnValue({
                up: jest.fn().mockImplementation((data)=>({
                        worker: {
                            status: 'up',
                            ...data
                        }
                    })),
                down: jest.fn().mockImplementation((error)=>({
                        worker: {
                            status: 'down',
                            error
                        }
                    }))
            })
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _workerhealth.WorkerHealthIndicator,
                {
                    provide: _redisclientservice.RedisClientService,
                    useValue: mockRedisService
                },
                {
                    provide: _terminus.HealthIndicatorService,
                    useValue: healthIndicatorService
                }
            ]
        }).compile();
        service = module.get(_workerhealth.WorkerHealthIndicator);
        loggerSpy = jest.spyOn(service['logger'], 'error').mockImplementation(()=>{});
        jest.useFakeTimers();
        // Reset mocks to their default success state before each test
        mockQueueInstance.getWorkers.mockResolvedValue([]);
        mockQueueInstance.getMetrics.mockResolvedValue({
            count: 0,
            data: []
        });
        mockQueueInstance.getWaitingCount.mockResolvedValue(0);
        mockQueueInstance.getActiveCount.mockResolvedValue(0);
        mockQueueInstance.getDelayedCount.mockResolvedValue(0);
    });
    afterEach(()=>{
        jest.useRealTimers();
        jest.clearAllMocks();
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    it('should return up status when workers are active', async ()=>{
        mockQueueInstance.getWorkers.mockResolvedValue([
            {
                id: 'worker1'
            }
        ]);
        const result = await service.isHealthy();
        expect(result.worker.status).toBe('up');
        expect('queues' in result.worker).toBe(true);
        if ('queues' in result.worker) {
            expect(result.worker.queues.length).toBeGreaterThan(0);
        }
    });
    it('should return down status when no workers are active', async ()=>{
        mockQueueInstance.getWorkers.mockResolvedValue([]);
        const result = await service.isHealthy();
        expect(result.worker.status).toBe('down');
        expect('error' in result.worker).toBe(true);
        if ('error' in result.worker) {
            expect(result.worker.error).toBe(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.NO_ACTIVE_WORKERS);
        }
    });
    it('should timeout after specified duration', async ()=>{
        jest.useFakeTimers();
        mockQueueInstance.getWorkers.mockImplementationOnce(()=>new Promise((resolve)=>setTimeout(resolve, _healthindicatorstimeoutconts.HEALTH_INDICATORS_TIMEOUT + 100)));
        const resultPromise = service.isHealthy();
        jest.advanceTimersByTime(_healthindicatorstimeoutconts.HEALTH_INDICATORS_TIMEOUT + 200);
        const result = await resultPromise;
        expect(result.worker.status).toBe('down');
        expect('error' in result.worker).toBe(true);
        if ('error' in result.worker) {
            expect(result.worker.error).toBe(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.WORKER_TIMEOUT);
        }
        jest.useRealTimers();
    });
    it('should check all message queues', async ()=>{
        mockQueueInstance.getWorkers.mockResolvedValue([
            {
                id: 'worker1'
            }
        ]);
        await service.isHealthy();
        expect(mockQueueInstance.getWorkers).toHaveBeenCalledTimes(Object.keys(_messagequeueconstants.MessageQueue).length);
        expect(mockQueueInstance.close).toHaveBeenCalledTimes(Object.keys(_messagequeueconstants.MessageQueue).length);
    });
    it('should return down status when failure rate exceeds threshold', async ()=>{
        mockQueueInstance.getWorkers.mockResolvedValue([
            {
                id: 'worker1'
            }
        ]);
        mockQueueInstance.getMetrics.mockImplementation((type)=>{
            if (type === 'failed') {
                return Promise.resolve({
                    count: 600
                });
            }
            if (type === 'completed') {
                return Promise.resolve({
                    count: 400
                });
            }
            return Promise.resolve({
                count: 0
            });
        });
        const result = await service.isHealthy();
        expect(result.worker.status).toBe('up');
        expect('queues' in result.worker).toBe(true);
        if ('queues' in result.worker) {
            expect(result.worker.queues[0].status).toBe('down');
            expect(result.worker.queues[0].metrics).toEqual({
                failed: 600,
                completed: 400,
                waiting: 0,
                active: 0,
                delayed: 0,
                failureRate: 60
            });
        }
    });
    it('should return complete metrics for active workers', async ()=>{
        mockQueueInstance.getWorkers.mockResolvedValue([
            {
                id: 'worker1'
            }
        ]);
        mockQueueInstance.getMetrics.mockImplementation((type)=>{
            if (type === 'failed') {
                return Promise.resolve({
                    count: 10
                });
            }
            if (type === 'completed') {
                return Promise.resolve({
                    count: 90
                });
            }
            return Promise.resolve({
                count: 0
            });
        });
        mockQueueInstance.getWaitingCount.mockResolvedValue(5);
        mockQueueInstance.getActiveCount.mockResolvedValue(2);
        mockQueueInstance.getDelayedCount.mockResolvedValue(1);
        const result = await service.isHealthy();
        expect(result.worker.status).toBe('up');
        expect('queues' in result.worker).toBe(true);
        if ('queues' in result.worker) {
            expect(result.worker.queues[0].metrics).toEqual({
                failed: 10,
                completed: 90,
                waiting: 5,
                active: 2,
                delayed: 1,
                failureRate: 10
            });
        }
    });
    it('should handle queue errors gracefully', async ()=>{
        mockQueueInstance.getWorkers.mockRejectedValue(new Error('Queue error'));
        mockQueueInstance.getMetrics.mockRejectedValue(new Error('Queue error'));
        mockQueueInstance.getWaitingCount.mockRejectedValue(new Error('Queue error'));
        mockQueueInstance.getActiveCount.mockRejectedValue(new Error('Queue error'));
        mockQueueInstance.getDelayedCount.mockRejectedValue(new Error('Queue error'));
        const result = await service.isHealthy();
        expect(result.worker.status).toBe('down');
        expect('error' in result.worker).toBe(true);
        if ('error' in result.worker) {
            expect(result.worker.error).toBe(_healtherrormessagesconstants.HEALTH_ERROR_MESSAGES.NO_ACTIVE_WORKERS);
        }
        expect(loggerSpy).toHaveBeenCalled();
        Object.values(_messagequeueconstants.MessageQueue).forEach((queueName)=>{
            expect(loggerSpy).toHaveBeenCalledWith(`Error getting queue details for ${queueName}: Queue error`);
            expect(loggerSpy).toHaveBeenCalledWith(`Error checking worker for queue ${queueName}: Queue error`);
        });
    });
    describe('getQueueDetails', ()=>{
        beforeEach(()=>{
            // Reset mocks to clean state before each test in this describe block
            mockQueueInstance.getWorkers.mockResolvedValue([
                {
                    id: 'worker1'
                }
            ]);
            mockQueueInstance.getMetrics.mockResolvedValue({
                count: 0,
                data: []
            });
        });
        it('should return metrics with time series data when pointsNeeded is provided', async ()=>{
            const pointsNeeded = 60;
            mockQueueInstance.getMetrics.mockImplementation((type)=>{
                if (type === 'failed') {
                    return Promise.resolve({
                        count: 10,
                        data: Array(pointsNeeded).fill(10 / pointsNeeded)
                    });
                }
                if (type === 'completed') {
                    return Promise.resolve({
                        count: 90,
                        data: Array(pointsNeeded).fill(90 / pointsNeeded)
                    });
                }
                return Promise.resolve({
                    count: 0,
                    data: []
                });
            });
            const result = await service.getQueueDetails(_messagequeueconstants.MessageQueue.messagingQueue, {
                pointsNeeded
            });
            expect(result).toBeDefined();
            expect(result?.metrics).toMatchObject({
                failed: 10,
                completed: 90,
                failedData: expect.any(Array),
                completedData: expect.any(Array)
            });
            expect(result?.metrics.failedData).toHaveLength(pointsNeeded);
            expect(result?.metrics.completedData).toHaveLength(pointsNeeded);
        });
        it('should handle invalid metrics data gracefully', async ()=>{
            const invalidData = [
                'invalid',
                null,
                undefined,
                '1',
                2
            ];
            mockQueueInstance.getMetrics.mockResolvedValue({
                count: 0,
                data: invalidData
            });
            const result = await service.getQueueDetails(_messagequeueconstants.MessageQueue.messagingQueue, {
                pointsNeeded: 5
            });
            expect(result).toBeDefined();
            expect(result?.metrics.failedData).toEqual([
                NaN,
                0,
                NaN,
                1,
                2
            ]);
            expect(result?.metrics.completedData).toEqual([
                NaN,
                0,
                NaN,
                1,
                2
            ]);
        });
        it('should calculate correct failure rate with time series data', async ()=>{
            mockQueueInstance.getMetrics.mockImplementation((type)=>{
                if (type === 'failed') {
                    return Promise.resolve({
                        count: 600,
                        data: Array(10).fill(60)
                    });
                }
                if (type === 'completed') {
                    return Promise.resolve({
                        count: 400,
                        data: Array(10).fill(40)
                    });
                }
                return Promise.resolve({
                    count: 0,
                    data: []
                });
            });
            const result = await service.getQueueDetails(_messagequeueconstants.MessageQueue.messagingQueue, {
                pointsNeeded: 10
            });
            expect(result).toBeDefined();
            expect(result?.metrics).toMatchObject({
                failed: 600,
                completed: 400,
                failureRate: 60
            });
        });
        it('should handle queue errors gracefully', async ()=>{
            mockQueueInstance.getWorkers.mockRejectedValue(new Error('Queue error'));
            mockQueueInstance.getMetrics.mockRejectedValue(new Error('Queue error'));
            await expect(service.getQueueDetails(_messagequeueconstants.MessageQueue.messagingQueue)).rejects.toThrow('Queue error');
            expect(loggerSpy).toHaveBeenCalledWith(`Error getting queue details for ${_messagequeueconstants.MessageQueue.messagingQueue}: Queue error`);
        });
    });
});

//# sourceMappingURL=worker.health.spec.js.map