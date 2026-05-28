"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "cacheStorageModuleFactory", {
    enumerable: true,
    get: function() {
        return cacheStorageModuleFactory;
    }
});
const _common = require("@nestjs/common");
const _cachemanagerredisyet = require("cache-manager-redis-yet");
const _redis = require("redis");
const _cachestoragetypeenum = require("./types/cache-storage-type.enum");
const cacheStorageLogger = new _common.Logger('CacheStorage');
const REDIS_PING_INTERVAL_MS = 60_000;
const cacheStorageModuleFactory = (twentyConfigService)=>{
    const cacheStorageType = _cachestoragetypeenum.CacheStorageType.Redis;
    const cacheStorageTtl = twentyConfigService.get('CACHE_STORAGE_TTL');
    const cacheModuleOptions = {
        isGlobal: true,
        ttl: cacheStorageTtl * 1000
    };
    switch(cacheStorageType){
        /* case CacheStorageType.Memory: {
      return cacheModuleOptions;
    }*/ case _cachestoragetypeenum.CacheStorageType.Redis:
            {
                const redisUrl = twentyConfigService.get('REDIS_URL');
                if (!redisUrl) {
                    throw new Error(`${cacheStorageType} cache storage requires REDIS_URL to be defined, check your .env file`);
                }
                return {
                    ...cacheModuleOptions,
                    store: async ()=>{
                        const redisClient = (0, _redis.createClient)({
                            url: redisUrl,
                            pingInterval: REDIS_PING_INTERVAL_MS
                        });
                        redisClient.on('error', (err)=>{
                            cacheStorageLogger.error('Redis cache-storage client error', err);
                        });
                        await redisClient.connect();
                        return (0, _cachemanagerredisyet.redisInsStore)(redisClient, {
                            ttl: cacheStorageTtl * 1000
                        });
                    }
                };
            }
        default:
            throw new Error(`Invalid cache-storage (${cacheStorageType}), check your .env file`);
    }
};

//# sourceMappingURL=cache-storage.module-factory.js.map