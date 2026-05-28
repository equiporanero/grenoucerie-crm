"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CacheStorageService", {
    enumerable: true,
    get: function() {
        return CacheStorageService;
    }
});
const _cachemanager = require("@nestjs/cache-manager");
const _common = require("@nestjs/common");
const _cachestoragenamespaceenum = require("../types/cache-storage-namespace.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let CacheStorageService = class CacheStorageService {
    async get(key) {
        const value = await this.cache.get(this.getKey(key));
        return value;
    }
    async set(key, value, ttl) {
        return this.cache.set(this.getKey(key), value, ttl);
    }
    async del(key) {
        return this.cache.del(this.getKey(key));
    }
    async mdel(keys) {
        if (keys.length === 0) {
            return;
        }
        if (this.isRedisCache()) {
            const prefixedKeys = keys.map((k)=>this.getKey(k));
            await this.cache.store.client.del(prefixedKeys);
            return;
        }
        await Promise.all(keys.map((k)=>this.del(k)));
    }
    async mget(keys) {
        if (this.isRedisCache()) {
            const prefixedKeys = keys.map((k)=>this.getKey(k));
            const values = await this.cache.store.client.mGet(prefixedKeys);
            return values.map((v)=>{
                if (v === null || v === undefined) return undefined;
                try {
                    return JSON.parse(v);
                } catch  {
                    return v;
                }
            });
        }
        return Promise.all(keys.map((k)=>this.get(k)));
    }
    async mset(entries) {
        if (entries.length === 0) {
            return;
        }
        await Promise.all(entries.map(({ key, value, ttl })=>this.set(key, value, ttl)));
    }
    async setAdd(key, value, ttl) {
        if (value.length === 0) {
            return;
        }
        if (this.isRedisCache()) {
            await this.cache.store.client.sAdd(this.getKey(key), value);
            if (ttl) {
                await this.cache.store.client.expire(this.getKey(key), ttl / 1000);
            }
            return;
        }
        const res = await this.get(key);
        if (res) {
            await this.set(key, [
                ...res,
                ...value
            ], ttl);
        } else {
            await this.set(key, value, ttl);
        }
    }
    async setRemove(key, values) {
        if (values.length === 0) {
            return 0;
        }
        if (this.isRedisCache()) {
            return this.cache.store.client.sRem(this.getKey(key), values);
        }
        const existing = await this.get(key);
        if (!existing) {
            return 0;
        }
        const filtered = existing.filter((v)=>!values.includes(v));
        const removed = existing.length - filtered.length;
        await this.set(key, filtered);
        return removed;
    }
    async countAllSetMembers(cacheKeys) {
        return (await Promise.all(cacheKeys.map((key)=>this.getSetLength(key)))).reduce((acc, setLength)=>acc + setLength, 0);
    }
    async setPop(key, size = 1) {
        if (this.isRedisCache()) {
            return this.cache.store.client.sPop(this.getKey(key), size);
        }
        const res = await this.get(key);
        if (res) {
            await this.set(key, res.slice(0, -size));
            return res.slice(-size);
        }
        return [];
    }
    async getSetLength(key) {
        if (this.isRedisCache()) {
            return await this.cache.store.client.sCard(this.getKey(key));
        }
        const res = await this.get(key);
        return res?.length ?? 0;
    }
    async setMembers(key) {
        if (this.isRedisCache()) {
            return this.cache.store.client.sMembers(this.getKey(key));
        }
        return await this.get(key) ?? [];
    }
    async flush() {
        return this.cache.reset();
    }
    async flushByPattern(scanPattern) {
        if (!this.isRedisCache()) {
            throw new Error('flushByPattern is only supported with Redis cache');
        }
        const redisClient = this.cache.store.client;
        let cursor = 0;
        do {
            const result = await redisClient.scan(cursor, {
                MATCH: `${this.namespace}:${scanPattern}`,
                COUNT: 100
            });
            const nextCursor = result.cursor;
            const keys = result.keys;
            if (keys.length > 0) {
                await redisClient.del(keys);
            }
            cursor = nextCursor;
        }while (cursor !== 0)
    }
    async scanAndCountSetMembers(scanPattern) {
        if (!this.isRedisCache()) {
            throw new Error('scanAndCountSetMembers is only supported with Redis cache');
        }
        const redisClient = this.cache.store.client;
        let cursor = 0;
        let totalCount = 0;
        do {
            const result = await redisClient.scan(cursor, {
                MATCH: `${this.namespace}:${scanPattern}`,
                COUNT: 100
            });
            cursor = result.cursor;
            const keys = result.keys;
            if (keys.length > 0) {
                const pipeline = redisClient.multi();
                for (const key of keys){
                    pipeline.sCard(key);
                }
                const results = await pipeline.exec();
                for (const result of results){
                    if (result instanceof Error) {
                        throw result;
                    }
                    totalCount += result;
                }
            }
        }while (cursor !== 0)
        return totalCount;
    }
    async acquireLock(key, ttl = 1000) {
        if (!this.isRedisCache()) {
            throw new Error('acquireLock is only supported with Redis cache');
        }
        const redisClient = this.cache.store.client;
        const result = await redisClient.set(this.getKey(key), 'lock', {
            NX: true,
            PX: ttl
        });
        return result === 'OK';
    }
    async releaseLock(key) {
        if (!this.isRedisCache()) {
            throw new Error('releaseLock is only supported with Redis cache');
        }
        await this.del(key);
    }
    async incrBy(key, increment) {
        if (this.isRedisCache()) {
            return this.cache.store.client.incrBy(this.getKey(key), increment);
        }
        const current = await this.get(key) ?? 0;
        const newValue = current + increment;
        await this.set(key, newValue);
        return newValue;
    }
    async hashGetValues(key) {
        if (!this.isRedisCache()) {
            throw new Error('hashGetValues is only supported with Redis cache');
        }
        const redisClient = this.cache.store.client;
        return redisClient.hVals(this.getKey(key));
    }
    async hashSet({ key, field, value }) {
        if (!this.isRedisCache()) {
            throw new Error('hashSet is only supported with Redis cache');
        }
        const redisClient = this.cache.store.client;
        return redisClient.hSet(this.getKey(key), field, value);
    }
    async hashSetIfExists({ key, field, value }) {
        if (!this.isRedisCache()) {
            throw new Error('hashSetIfExists is only supported with Redis cache');
        }
        const redisClient = this.cache.store.client;
        const script = `
if redis.call('EXISTS', KEYS[1]) == 1 then
  return redis.call('HSET', KEYS[1], ARGV[1], ARGV[2])
else
  return 0
end`;
        return redisClient.eval(script, {
            keys: [
                this.getKey(key)
            ],
            arguments: [
                field,
                value
            ]
        });
    }
    async hashSetWithExpire({ key, field, value, ttlMs }) {
        if (!this.isRedisCache()) {
            throw new Error('hashSetWithExpire is only supported with Redis cache');
        }
        const redisClient = this.cache.store.client;
        const prefixedKey = this.getKey(key);
        await redisClient.multi().hSet(prefixedKey, field, value).pExpire(prefixedKey, ttlMs).exec();
    }
    async hashDelete({ key, field }) {
        if (!this.isRedisCache()) {
            throw new Error('hashDelete is only supported with Redis cache');
        }
        const redisClient = this.cache.store.client;
        return redisClient.hDel(this.getKey(key), field);
    }
    async expire(key, ttlMs) {
        if (this.isRedisCache()) {
            return this.cache.store.client.expire(this.getKey(key), ttlMs / 1000);
        }
        const existing = await this.get(key);
        if (existing !== undefined) {
            await this.set(key, existing, ttlMs);
            return true;
        }
        return false;
    }
    isRedisCache() {
        // oxlint-disable-next-line @typescripttypescript/no-explicit-any
        return this.cache.store?.name === 'redis';
    }
    getKey(key) {
        const formattedKey = `${this.namespace}:${key}`;
        if (process.env.NODE_ENV === 'test') {
            return `${_cachestoragenamespaceenum.CacheStorageNamespace.IntegrationTests}:${formattedKey}`;
        }
        return formattedKey;
    }
    constructor(cache, namespace){
        this.cache = cache;
        this.namespace = namespace;
    }
};
CacheStorageService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _common.Inject)(_cachemanager.CACHE_MANAGER)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachemanager.Cache === "undefined" ? Object : _cachemanager.Cache,
        typeof _cachestoragenamespaceenum.CacheStorageNamespace === "undefined" ? Object : _cachestoragenamespaceenum.CacheStorageNamespace
    ])
], CacheStorageService);

//# sourceMappingURL=cache-storage.service.js.map