"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _cachelockservice = require("../cache-lock.service");
const _cachestorageservice = require("../../cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../cache-storage/types/cache-storage-namespace.enum");
describe('CacheLockService', ()=>{
    let service;
    let cacheStorageService;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _cachelockservice.CacheLockService,
                {
                    provide: _cachestoragenamespaceenum.CacheStorageNamespace.EngineLock,
                    useValue: {
                        acquireLock: jest.fn(),
                        releaseLock: jest.fn()
                    }
                },
                {
                    provide: _cachestorageservice.CacheStorageService,
                    useValue: {
                        acquireLock: jest.fn(),
                        releaseLock: jest.fn()
                    }
                }
            ]
        }).compile();
        service = module.get(_cachelockservice.CacheLockService);
        cacheStorageService = module.get(_cachestoragenamespaceenum.CacheStorageNamespace.EngineLock);
        jest.spyOn(service, 'delay').mockResolvedValue(undefined);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    it('should acquire the lock and execute the function', async ()=>{
        cacheStorageService.acquireLock.mockResolvedValue(true);
        cacheStorageService.releaseLock.mockResolvedValue(undefined);
        const fn = jest.fn().mockResolvedValue('success');
        const ttl = 100;
        const result = await service.withLock(fn, 'key', {
            ttl
        });
        expect(result).toBe('success');
        expect(fn).toHaveBeenCalled();
        expect(cacheStorageService.acquireLock).toHaveBeenCalledTimes(1);
        expect(cacheStorageService.acquireLock).toHaveBeenCalledWith('key', ttl);
        expect(cacheStorageService.releaseLock).toHaveBeenCalledTimes(1);
        expect(cacheStorageService.releaseLock).toHaveBeenCalledWith('key');
    });
    it('should throw an error if lock cannot be acquired after max retries', async ()=>{
        cacheStorageService.acquireLock.mockResolvedValue(false);
        const fn = jest.fn();
        const ms = 1;
        const maxRetries = 3;
        await expect(service.withLock(fn, 'key', {
            ms,
            maxRetries
        })).rejects.toThrow('Failed to acquire lock for key: key');
        expect(cacheStorageService.acquireLock).toHaveBeenCalledTimes(maxRetries);
        expect(fn).not.toHaveBeenCalled();
    });
    it('should retry before acquiring the lock', async ()=>{
        const mockAcquireLock = cacheStorageService.acquireLock;
        mockAcquireLock.mockResolvedValueOnce(false).mockResolvedValueOnce(false).mockResolvedValueOnce(true);
        const fn = jest.fn().mockResolvedValue('retried success');
        const result = await service.withLock(fn, 'key', {
            maxRetries: 5,
            ms: 1
        });
        expect(result).toBe('retried success');
        expect(fn).toHaveBeenCalledTimes(1);
        expect(mockAcquireLock).toHaveBeenCalledTimes(3);
        expect(cacheStorageService.releaseLock).toHaveBeenCalledWith('key');
    });
    it('should release the lock even if the function throws', async ()=>{
        cacheStorageService.acquireLock.mockResolvedValue(true);
        cacheStorageService.releaseLock.mockResolvedValue(undefined);
        const fn = jest.fn().mockRejectedValue(new Error('fail'));
        await expect(service.withLock(fn, 'key')).rejects.toThrow('fail');
        expect(fn).toHaveBeenCalled();
        expect(cacheStorageService.releaseLock).toHaveBeenCalledWith('key');
    });
});

//# sourceMappingURL=cache-lock.service.spec.js.map