"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CoreEntityCacheService", {
    enumerable: true,
    get: function() {
        return CoreEntityCacheService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _utils = require("twenty-shared/utils");
const _coreentitycacheproviderservice = require("../interfaces/core-entity-cache-provider.service");
const _coreentitycachedecorator = require("../decorators/core-entity-cache.decorator");
const _coreentitycachekeytype = require("../types/core-entity-cache-key.type");
const _cachestoragedecorator = require("../../core-modules/cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../../core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../core-modules/cache-storage/types/cache-storage-namespace.enum");
const _promisememoizerstorage = require("../../twenty-orm/storage/promise-memoizer.storage");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
const LOCAL_TTL_MS = 100; // 100ms
const LOCAL_ENTRY_TTL_MS = 30 * 60 * 1000; // 30 minutes
const MEMOIZER_TTL_MS = 10_000; // 10 seconds
const STALE_VERSION_TTL_MS = 5_000; // 5 seconds
const MAX_LOCAL_STALE_VERSIONS = 5;
const MAX_LOCAL_CACHE_ENTRIES = 5_000;
const MIN_EVICT_KEYS = 100;
const NOT_FOUND_SENTINEL = '__CORE_ENTITY_NOT_FOUND__';
let CoreEntityCacheService = class CoreEntityCacheService {
    async onModuleInit() {
        const providers = this.discoveryService.getProviders();
        for (const wrapper of providers){
            const { instance } = wrapper;
            if (!(0, _utils.isDefined)(instance) || typeof instance !== 'object') {
                continue;
            }
            const coreEntityCacheKeyName = this.reflector.get(_coreentitycachedecorator.CORE_ENTITY_CACHE_KEY, instance.constructor);
            if ((0, _utils.isDefined)(coreEntityCacheKeyName) && instance instanceof _coreentitycacheproviderservice.CoreEntityCacheProvider) {
                this.coreEntityCacheProviders.set(coreEntityCacheKeyName, instance);
            }
        }
    }
    async get(cacheKeyName, entityId) {
        this.evictExpiredLocalEntries();
        if (!(0, _utils.isDefined)(entityId) || !(0, _utils.isValidUuid)(entityId)) {
            return null;
        }
        const memoKey = `${cacheKeyName}-${entityId}`;
        const result = await this.memoizer.memoizePromiseAndExecute(memoKey, async ()=>{
            const localKey = this.buildCacheKey(entityId, cacheKeyName);
            const localEntry = this.localCache.get(localKey);
            const now = Date.now();
            // Stage 1: Check local TTL
            if ((0, _utils.isDefined)(localEntry) && now - localEntry.lastHashCheckedAt < LOCAL_TTL_MS) {
                const version = localEntry.versions.get(localEntry.latestHash);
                if ((0, _utils.isDefined)(version)) {
                    version.lastReadAt = now;
                    return version.data;
                }
            }
            // Stage 2: Validate against Redis hash
            const hashKey = `${localKey}:hash`;
            const redisHash = await this.cacheStorage.get(hashKey);
            if ((0, _utils.isDefined)(localEntry) && (0, _utils.isDefined)(redisHash) && localEntry.latestHash === redisHash) {
                localEntry.lastHashCheckedAt = now;
                const version = localEntry.versions.get(localEntry.latestHash);
                if ((0, _utils.isDefined)(version)) {
                    version.lastReadAt = now;
                    return version.data;
                }
            }
            // Stage 3: Fetch from Redis
            const [redisData, redisDataHash] = await this.cacheStorage.mget([
                `${localKey}:data`,
                hashKey
            ]);
            if ((0, _utils.isDefined)(redisData) && (0, _utils.isDefined)(redisDataHash)) {
                this.setInLocalCache(entityId, cacheKeyName, redisData, redisDataHash);
                return redisData;
            }
            // Stage 4: Recompute from provider
            return this.recomputeFromProvider(entityId, cacheKeyName);
        });
        if (result === NOT_FOUND_SENTINEL || result === null) {
            return null;
        }
        return result;
    }
    async invalidate(cacheKeyName, entityId) {
        await this.memoizer.clearKeys(`${cacheKeyName}-${entityId}`);
        await this.flush(entityId, cacheKeyName);
        await this.memoizer.clearKeys(`${cacheKeyName}-${entityId}`);
    }
    async invalidateAndRecompute(cacheKeyName, entityId) {
        await this.memoizer.clearKeys(`${cacheKeyName}-${entityId}`);
        await this.flush(entityId, cacheKeyName);
        await this.recomputeFromProvider(entityId, cacheKeyName);
        await this.memoizer.clearKeys(`${cacheKeyName}-${entityId}`);
    }
    async recomputeFromProvider(entityId, cacheKeyName) {
        const provider = this.getProviderOrThrow(cacheKeyName);
        const data = await provider.computeForCache(entityId);
        const hash = _crypto.default.randomUUID();
        const valueToCache = data === null ? NOT_FOUND_SENTINEL : data;
        const localKey = this.buildCacheKey(entityId, cacheKeyName);
        await this.cacheStorage.mset([
            {
                key: `${localKey}:hash`,
                value: hash
            },
            {
                key: `${localKey}:data`,
                value: valueToCache
            }
        ]);
        this.setInLocalCache(entityId, cacheKeyName, valueToCache, hash);
        return valueToCache;
    }
    async flush(entityId, cacheKeyName) {
        const localKey = this.buildCacheKey(entityId, cacheKeyName);
        await this.cacheStorage.mdel([
            `${localKey}:data`,
            `${localKey}:hash`
        ]);
        const entry = this.localCache.get(localKey);
        if ((0, _utils.isDefined)(entry)) {
            entry.lastHashCheckedAt = 0;
        }
    }
    setInLocalCache(entityId, keyName, data, hash) {
        const localKey = this.buildCacheKey(entityId, keyName);
        let entry = this.localCache.get(localKey);
        if (!(0, _utils.isDefined)(entry)) {
            entry = {
                versions: new Map(),
                latestHash: '',
                lastHashCheckedAt: 0
            };
            this.localCache.set(localKey, entry);
        }
        entry.versions.set(hash, {
            data,
            lastReadAt: Date.now()
        });
        entry.latestHash = hash;
        entry.lastHashCheckedAt = Date.now();
        this.cleanupStaleVersions(entry);
        this.evictLRUEntriesIfNeeded();
    }
    evictLRUEntriesIfNeeded() {
        if (this.localCache.size <= MAX_LOCAL_CACHE_ENTRIES) {
            return;
        }
        const entries = [
            ...this.localCache.entries()
        ].sort((a, b)=>a[1].lastHashCheckedAt - b[1].lastHashCheckedAt);
        const toEvict = entries.slice(0, Math.max(MIN_EVICT_KEYS, this.localCache.size - MAX_LOCAL_CACHE_ENTRIES));
        for (const [key] of toEvict){
            this.localCache.delete(key);
        }
    }
    cleanupStaleVersions(entry) {
        const now = Date.now();
        for (const [hash, version] of entry.versions){
            if (hash !== entry.latestHash && now - version.lastReadAt > STALE_VERSION_TTL_MS) {
                entry.versions.delete(hash);
            }
        }
        if (entry.versions.size >= MAX_LOCAL_STALE_VERSIONS) {
            const sorted = [
                ...entry.versions.entries()
            ].filter(([hash])=>hash !== entry.latestHash).sort((entryA, entryB)=>entryA[1].lastReadAt - entryB[1].lastReadAt);
            while(entry.versions.size >= MAX_LOCAL_STALE_VERSIONS && sorted.length > 0){
                const oldestEntry = sorted.shift();
                if ((0, _utils.isDefined)(oldestEntry)) {
                    entry.versions.delete(oldestEntry[0]);
                }
            }
        }
    }
    evictExpiredLocalEntries() {
        const now = Date.now();
        for (const [localKey, entry] of this.localCache){
            for (const [hash, version] of entry.versions){
                if (now - version.lastReadAt > LOCAL_ENTRY_TTL_MS) {
                    entry.versions.delete(hash);
                }
            }
            if (entry.versions.size === 0) {
                this.localCache.delete(localKey);
                continue;
            }
            if (!entry.versions.has(entry.latestHash)) {
                this.localCache.delete(localKey);
            }
        }
    }
    getProviderOrThrow(keyName) {
        const provider = this.coreEntityCacheProviders.get(keyName);
        if (!(0, _utils.isDefined)(provider)) {
            throw new Error(`Core entity cache provider with key name "${keyName}" not found`);
        }
        return provider;
    }
    buildCacheKey(entityId, keyName) {
        return `${_coreentitycachekeytype.CORE_ENTITY_CACHE_KEYS[keyName]}:${entityId}`;
    }
    constructor(cacheStorage, discoveryService, reflector){
        this.cacheStorage = cacheStorage;
        this.discoveryService = discoveryService;
        this.reflector = reflector;
        this.localCache = new Map();
        this.coreEntityCacheProviders = new Map();
        this.memoizer = new _promisememoizerstorage.PromiseMemoizer(MEMOIZER_TTL_MS);
        this.logger = new _common.Logger(CoreEntityCacheService.name);
    }
};
CoreEntityCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.EngineCoreEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService,
        typeof _core.DiscoveryService === "undefined" ? Object : _core.DiscoveryService,
        typeof _core.Reflector === "undefined" ? Object : _core.Reflector
    ])
], CoreEntityCacheService);

//# sourceMappingURL=core-entity-cache.service.js.map