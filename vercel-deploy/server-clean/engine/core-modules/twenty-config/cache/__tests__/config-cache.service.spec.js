"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _configcacheservice = require("../config-cache.service");
describe('ConfigCacheService', ()=>{
    let service;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _configcacheservice.ConfigCacheService
            ]
        }).compile();
        service = module.get(_configcacheservice.ConfigCacheService);
    });
    afterEach(()=>{
        service.onModuleDestroy();
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('get and set', ()=>{
        it('should set and get a value from cache', ()=>{
            const key = 'AUTH_PASSWORD_ENABLED';
            const value = true;
            service.set(key, value);
            const result = service.get(key);
            expect(result).toBe(value);
        });
        it('should return undefined for non-existent key', ()=>{
            const result = service.get('AUTH_PASSWORD_ENABLED');
            expect(result).toBeUndefined();
        });
        it('should handle different value types', ()=>{
            const booleanKey = 'AUTH_PASSWORD_ENABLED';
            const stringKey = 'EMAIL_FROM_ADDRESS';
            const numberKey = 'CACHE_STORAGE_TTL';
            service.set(booleanKey, true);
            service.set(stringKey, 'test@example.com');
            service.set(numberKey, 3600 * 24 * 7);
            expect(service.get(booleanKey)).toBe(true);
            expect(service.get(stringKey)).toBe('test@example.com');
            expect(service.get(numberKey)).toBe(3600 * 24 * 7);
        });
    });
    describe('negative lookup cache', ()=>{
        it('should check if a negative cache entry exists', ()=>{
            const key = 'TEST_KEY';
            service.markKeyAsMissing(key);
            const result = service.isKeyKnownMissing(key);
            expect(result).toBe(true);
        });
        it('should return false for negative cache entry check when not in cache', ()=>{
            const key = 'NON_EXISTENT_KEY';
            const result = service.isKeyKnownMissing(key);
            expect(result).toBe(false);
        });
    });
    describe('clear operations', ()=>{
        it('should clear specific key', ()=>{
            const key1 = 'AUTH_PASSWORD_ENABLED';
            const key2 = 'EMAIL_FROM_ADDRESS';
            service.set(key1, true);
            service.set(key2, 'test@example.com');
            service.clear(key1);
            expect(service.get(key1)).toBeUndefined();
            expect(service.get(key2)).toBe('test@example.com');
        });
        it('should clear all entries', ()=>{
            const key1 = 'AUTH_PASSWORD_ENABLED';
            const key2 = 'EMAIL_FROM_ADDRESS';
            service.set(key1, true);
            service.set(key2, 'test@example.com');
            service.clearAll();
            expect(service.get(key1)).toBeUndefined();
            expect(service.get(key2)).toBeUndefined();
        });
    });
    describe('getCacheInfo', ()=>{
        it('should return correct cache information', ()=>{
            const key1 = 'AUTH_PASSWORD_ENABLED';
            const key2 = 'EMAIL_FROM_ADDRESS';
            const key3 = 'CACHE_STORAGE_TTL';
            service.set(key1, true);
            service.set(key2, 'test@example.com');
            service.markKeyAsMissing(key3);
            const info = service.getCacheInfo();
            expect(info.foundConfigValues).toBe(2);
            expect(info.knownMissingKeys).toBe(1);
            expect(info.cacheKeys).toContain(key1);
            expect(info.cacheKeys).toContain(key2);
            expect(info.cacheKeys).not.toContain(key3);
            expect(service.isKeyKnownMissing(key3)).toBe(true);
        });
        it('should properly count cache entries', ()=>{
            const key1 = 'KEY1';
            const key2 = 'KEY2';
            const key3 = 'KEY3';
            // Add some values to the cache
            service.set(key1, 'value1');
            service.set(key2, 'value2');
            service.markKeyAsMissing(key3);
            const cacheInfo = service.getCacheInfo();
            expect(cacheInfo.foundConfigValues).toBe(2);
            expect(cacheInfo.knownMissingKeys).toBe(1);
            expect(cacheInfo.cacheKeys).toContain(key1);
            expect(cacheInfo.cacheKeys).toContain(key2);
            expect(service.isKeyKnownMissing(key3)).toBe(true);
        });
    });
    describe('module lifecycle', ()=>{
        it('should clear cache on module destroy', ()=>{
            const key = 'TEST_KEY';
            service.set(key, 'test');
            service.onModuleDestroy();
            expect(service.get(key)).toBeUndefined();
        });
    });
    describe('getAllKeys', ()=>{
        it('should return all keys from both positive and negative caches', ()=>{
            const positiveKey1 = 'POSITIVE_KEY1';
            const positiveKey2 = 'POSITIVE_KEY2';
            const negativeKey = 'NEGATIVE_KEY';
            // Set up keys
            service.set(positiveKey1, 'value1');
            service.set(positiveKey2, 'value2');
            service.markKeyAsMissing(negativeKey);
            const allKeys = service.getAllKeys();
            expect(allKeys).toContain(positiveKey1);
            expect(allKeys).toContain(positiveKey2);
            expect(allKeys).toContain(negativeKey);
        });
        it('should return empty array when no keys exist', ()=>{
            const allKeys = service.getAllKeys();
            expect(allKeys).toHaveLength(0);
        });
        it('should not have duplicates if a key somehow exists in both caches', ()=>{
            const key = 'DUPLICATE_KEY';
            // First add to positive cache
            service.set(key, 'value');
            // Then force it into negative cache (normally this would remove from positive)
            // We're bypassing normal behavior for testing edge cases
            service.addToMissingKeysForTesting(key);
            const allKeys = service.getAllKeys();
            // Should only appear once in the result
            expect(allKeys.filter((k)=>k === key)).toHaveLength(1);
        });
    });
});

//# sourceMappingURL=config-cache.service.spec.js.map