"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _cachestoragenamespaceenum = require("../cache-storage/types/cache-storage-namespace.enum");
const _throttlerexception = require("./throttler.exception");
const _throttlerservice = require("./throttler.service");
describe('ThrottlerService', ()=>{
    let service;
    let cacheStorageService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _throttlerservice.ThrottlerService,
                {
                    provide: _cachestoragenamespaceenum.CacheStorageNamespace.EngineWorkspace,
                    useValue: {
                        get: jest.fn(),
                        set: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_throttlerservice.ThrottlerService);
        cacheStorageService = module.get(_cachestoragenamespaceenum.CacheStorageNamespace.EngineWorkspace);
    });
    afterEach(()=>{
        jest.clearAllMocks();
    });
    describe('tokenBucketThrottleOrThrow', ()=>{
        const key = 'test-throttle-key';
        const maxTokens = 100;
        const timeWindow = 1000; // 1 second
        it('should allow request when tokens are available (first request)', async ()=>{
            cacheStorageService.get.mockResolvedValue(null);
            await service.tokenBucketThrottleOrThrow(key, 10, maxTokens, timeWindow);
            expect(cacheStorageService.get).toHaveBeenCalledWith(key);
            expect(cacheStorageService.set).toHaveBeenCalledWith(key, {
                tokens: 90,
                lastRefillAt: expect.any(Number)
            }, timeWindow * 2);
        });
        it('should allow request when sufficient tokens are available', async ()=>{
            const now = Date.now();
            cacheStorageService.get.mockResolvedValue({
                tokens: 50,
                lastRefillAt: now - 100
            });
            await service.tokenBucketThrottleOrThrow(key, 10, maxTokens, timeWindow);
            expect(cacheStorageService.get).toHaveBeenCalledWith(key);
            expect(cacheStorageService.set).toHaveBeenCalledWith(key, {
                tokens: expect.any(Number),
                lastRefillAt: expect.any(Number)
            }, timeWindow * 2);
        });
        it('should throw ThrottlerException when tokens are insufficient', async ()=>{
            const now = Date.now();
            cacheStorageService.get.mockResolvedValue({
                tokens: 5,
                lastRefillAt: now
            });
            await expect(service.tokenBucketThrottleOrThrow(key, 10, maxTokens, timeWindow)).rejects.toThrow(_throttlerexception.ThrottlerException);
            await expect(service.tokenBucketThrottleOrThrow(key, 10, maxTokens, timeWindow)).rejects.toThrow('Limit reached');
            expect(cacheStorageService.set).not.toHaveBeenCalled();
        });
        it('should refill tokens over time', async ()=>{
            const now = Date.now();
            const refillRate = maxTokens / timeWindow; // 100 tokens per 1000ms = 0.1 tokens/ms
            const timePassed = 500; // 500ms
            const expectedRefill = Math.floor(timePassed * refillRate); // 50 tokens
            cacheStorageService.get.mockResolvedValue({
                tokens: 20,
                lastRefillAt: now - timePassed
            });
            jest.spyOn(Date, 'now').mockReturnValue(now);
            await service.tokenBucketThrottleOrThrow(key, 10, maxTokens, timeWindow);
            expect(cacheStorageService.set).toHaveBeenCalledWith(key, {
                tokens: 20 + expectedRefill - 10,
                lastRefillAt: now
            }, timeWindow * 2);
            jest.restoreAllMocks();
        });
        it('should cap tokens at maxTokens', async ()=>{
            const now = Date.now();
            const timePassed = 5000; // Long time passed, would refill beyond max
            cacheStorageService.get.mockResolvedValue({
                tokens: 80,
                lastRefillAt: now - timePassed
            });
            jest.spyOn(Date, 'now').mockReturnValue(now);
            await service.tokenBucketThrottleOrThrow(key, 10, maxTokens, timeWindow);
            // Available tokens should be capped at maxTokens (100)
            expect(cacheStorageService.set).toHaveBeenCalledWith(key, {
                tokens: 90,
                lastRefillAt: now
            }, timeWindow * 2);
            jest.restoreAllMocks();
        });
    });
});

//# sourceMappingURL=throttler.service.spec.js.map