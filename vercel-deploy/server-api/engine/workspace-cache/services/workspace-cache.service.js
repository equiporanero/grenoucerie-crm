"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceCacheService;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _utils = require("twenty-shared/utils");
const _workspacecacheproviderservice = require("../interfaces/workspace-cache-provider.service");
const _cachestoragedecorator = require("../../core-modules/cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../../core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../core-modules/cache-storage/types/cache-storage-namespace.enum");
const _promisememoizerstorage = require("../../twenty-orm/storage/promise-memoizer.storage");
const _workspacecachedecorator = require("../decorators/workspace-cache.decorator");
const _workspacecacheexception = require("../exceptions/workspace-cache.exception");
const _workspacecachekeytype = require("../types/workspace-cache-key.type");
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
const MAX_LOCAL_STALE_VERSIONS = 5; // 5 stale versions
const MAX_LOCAL_CACHE_ENTRIES = 1_000;
const MIN_EVICT_KEYS = 100;
let WorkspaceCacheService = class WorkspaceCacheService {
    async onModuleInit() {
        const providers = this.discoveryService.getProviders();
        for (const wrapper of providers){
            const { instance } = wrapper;
            if (!(0, _utils.isDefined)(instance) || typeof instance !== 'object') {
                continue;
            }
            const workspaceCacheKeyName = this.reflector.get(_workspacecachedecorator.WORKSPACE_CACHE_KEY, instance.constructor);
            if ((0, _utils.isDefined)(workspaceCacheKeyName) && instance instanceof _workspacecacheproviderservice.WorkspaceCacheProvider) {
                this.workspaceCacheProviders.set(workspaceCacheKeyName, instance);
                const options = this.reflector.get(_workspacecachedecorator.WORKSPACE_CACHE_OPTIONS, instance.constructor);
                if (options?.localDataOnly) {
                    this.localDataOnlyKeys.add(workspaceCacheKeyName);
                }
            }
        }
    }
    async getOrRecompute(workspaceId, cacheKeyNames) {
        this.evictExpiredLocalEntries();
        if (!(0, _utils.isDefined)(workspaceId) || cacheKeyNames.length === 0 || !(0, _utils.isValidUuid)(workspaceId)) {
            throw new _workspacecacheexception.WorkspaceCacheException('Invalid parameters: workspace ID and cache key names are required', _workspacecacheexception.WorkspaceCacheExceptionCode.INVALID_PARAMETERS);
        }
        const memoKey = `${workspaceId}-${[
            ...cacheKeyNames
        ].sort().join(',')}`;
        const result = await this.memoizer.memoizePromiseAndExecute(memoKey, async ()=>{
            // Stage 1: Check local TTL
            const { freshKeys, staleKeys } = this.checkLocalTTL(workspaceId, cacheKeyNames);
            const freshData = this.getFromLocalCache(workspaceId, freshKeys);
            if (staleKeys.length === 0) {
                return freshData;
            }
            // Stage 2: Validate ttl stale keys against Redis hash
            const { validKeys, keysNeedingDataFromRedis, keysNeedingRecompute } = await this.validateLocalHashAgainstRedisHash(workspaceId, staleKeys);
            const validatedData = this.getFromLocalCache(workspaceId, validKeys);
            // Stage 3: Fetch data from Redis
            const { redisData, missingInRedis } = await this.fetchDataFromRedis(workspaceId, keysNeedingDataFromRedis);
            // Stage 4: Recompute remaining
            const keysToRecompute = [
                ...keysNeedingRecompute,
                ...missingInRedis
            ];
            const recomputedData = await this.recomputeDataFromProvider(workspaceId, keysToRecompute);
            return {
                ...freshData,
                ...validatedData,
                ...redisData,
                ...recomputedData
            };
        });
        return result;
    }
    async invalidateAndRecompute(workspaceId, cacheKeyNames) {
        await this.memoizer.clearKeys(`${workspaceId}-`);
        await this.flush(workspaceId, cacheKeyNames);
        await this.recomputeDataFromProvider(workspaceId, cacheKeyNames);
        // Clear memoizer again after recomputation to evict any stale entries
        // cached by concurrent getOrRecompute calls during the flush window.
        await this.memoizer.clearKeys(`${workspaceId}-`);
    }
    async getCacheHashes(workspaceId, cacheKeyNames) {
        if (cacheKeyNames.length === 0) {
            return {};
        }
        const hashKeys = cacheKeyNames.map((keyName)=>`${this.buildCacheKey(workspaceId, keyName)}:hash`);
        const hashes = await this.cacheStorage.mget(hashKeys);
        const result = {};
        for (const [index, keyName] of cacheKeyNames.entries()){
            if ((0, _utils.isDefined)(hashes[index])) {
                result[keyName] = hashes[index];
            }
        }
        return result;
    }
    async flush(workspaceId, cacheKeyNames) {
        await this.deleteFromRedis(workspaceId, cacheKeyNames);
        this.deleteFromLocalCache(workspaceId, cacheKeyNames);
    }
    checkLocalTTL(workspaceId, cacheKeyNames) {
        const freshKeys = [];
        const staleKeys = [];
        const now = Date.now();
        for (const keyName of cacheKeyNames){
            const localKey = this.buildCacheKey(workspaceId, keyName);
            const cached = this.localCache.get(localKey);
            if ((0, _utils.isDefined)(cached) && now - cached.lastHashCheckedAt < LOCAL_TTL_MS) {
                freshKeys.push(keyName);
            } else {
                staleKeys.push(keyName);
            }
        }
        return {
            freshKeys,
            staleKeys
        };
    }
    async validateLocalHashAgainstRedisHash(workspaceId, cacheKeyNames) {
        const validKeys = [];
        const keysNeedingDataFromRedis = [];
        const keysNeedingRecompute = [];
        if (cacheKeyNames.length === 0) {
            return {
                validKeys,
                keysNeedingDataFromRedis,
                keysNeedingRecompute
            };
        }
        const hashKeys = cacheKeyNames.map((keyName)=>`${this.buildCacheKey(workspaceId, keyName)}:hash`);
        const redisHashes = await this.cacheStorage.mget(hashKeys);
        for (const [index, keyName] of cacheKeyNames.entries()){
            const redisHash = redisHashes[index];
            const localKey = this.buildCacheKey(workspaceId, keyName);
            const localEntry = this.localCache.get(localKey);
            if ((0, _utils.isDefined)(localEntry) && (0, _utils.isDefined)(redisHash) && localEntry.latestHash === redisHash) {
                localEntry.lastHashCheckedAt = Date.now();
                validKeys.push(keyName);
            } else if (this.localDataOnlyKeys.has(keyName)) {
                keysNeedingRecompute.push(keyName);
            } else {
                keysNeedingDataFromRedis.push(keyName);
            }
        }
        return {
            validKeys,
            keysNeedingDataFromRedis,
            keysNeedingRecompute
        };
    }
    async fetchDataFromRedis(workspaceId, cacheKeyNames) {
        const redisData = {};
        const missingInRedis = [];
        if (cacheKeyNames.length === 0) {
            return {
                redisData,
                missingInRedis
            };
        }
        // Interleave data and hash keys for atomic fetch: [data1, hash1, data2, hash2, ...]
        const allKeys = cacheKeyNames.flatMap((keyName)=>{
            const baseKey = this.buildCacheKey(workspaceId, keyName);
            return [
                `${baseKey}:data`,
                `${baseKey}:hash`
            ];
        });
        const allValues = await this.cacheStorage.mget(allKeys);
        for (const [index, keyName] of cacheKeyNames.entries()){
            const data = allValues[index * 2];
            const hash = allValues[index * 2 + 1];
            if ((0, _utils.isDefined)(data) && (0, _utils.isDefined)(hash)) {
                Object.assign(redisData, {
                    [keyName]: data
                });
                this.setInLocalCache(workspaceId, keyName, data, hash);
            } else {
                missingInRedis.push(keyName);
            }
        }
        return {
            redisData,
            missingInRedis
        };
    }
    async recomputeDataFromProvider(workspaceId, cacheKeyNames) {
        const result = {};
        if (cacheKeyNames.length === 0) {
            return result;
        }
        const computePromises = cacheKeyNames.map(async (keyName)=>{
            const provider = this.getProviderOrThrow(keyName);
            const data = await provider.computeForCache(workspaceId);
            const hash = _crypto.default.randomUUID();
            return {
                keyName,
                data,
                hash
            };
        });
        const computed = await Promise.all(computePromises);
        const redisEntries = [];
        for (const { keyName, data, hash } of computed){
            Object.assign(result, {
                [keyName]: data
            });
            const baseKey = this.buildCacheKey(workspaceId, keyName);
            redisEntries.push({
                key: `${baseKey}:hash`,
                value: hash
            });
            if (!this.localDataOnlyKeys.has(keyName)) {
                redisEntries.push({
                    key: `${baseKey}:data`,
                    value: data
                });
            }
            this.setInLocalCache(workspaceId, keyName, data, hash);
        }
        if (redisEntries.length > 0) {
            await this.cacheStorage.mset(redisEntries);
        }
        return result;
    }
    getFromLocalCache(workspaceId, workspaceCacheKeyNames) {
        const result = {};
        for (const keyName of workspaceCacheKeyNames){
            const localKey = this.buildCacheKey(workspaceId, keyName);
            const entry = this.localCache.get(localKey);
            const version = entry?.versions.get(entry.latestHash);
            if ((0, _utils.isDefined)(entry) && (0, _utils.isDefined)(version)) {
                version.lastReadAt = Date.now();
                Object.assign(result, {
                    [keyName]: version.data
                });
                this.cleanupStaleVersions(entry);
            }
        }
        return result;
    }
    deleteFromLocalCache(workspaceId, cacheKeyNames) {
        for (const keyName of cacheKeyNames){
            const localKey = this.buildCacheKey(workspaceId, keyName);
            const entry = this.localCache.get(localKey);
            if ((0, _utils.isDefined)(entry)) {
                entry.lastHashCheckedAt = 0;
            }
        }
    }
    async deleteFromRedis(workspaceId, cacheKeyNames) {
        const keysToDelete = cacheKeyNames.flatMap((keyName)=>{
            const baseKey = this.buildCacheKey(workspaceId, keyName);
            return [
                `${baseKey}:data`,
                `${baseKey}:hash`
            ];
        });
        await this.cacheStorage.mdel(keysToDelete);
    }
    setInLocalCache(workspaceId, keyName, data, hash) {
        const localKey = this.buildCacheKey(workspaceId, keyName);
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
                // Latest was evicted; drop the entire entry to avoid serving stale data.
                this.localCache.delete(localKey);
            }
        }
    }
    getProviderOrThrow(keyName) {
        const provider = this.workspaceCacheProviders.get(keyName);
        if (!(0, _utils.isDefined)(provider)) {
            throw new Error(`Cache provider with key name "${keyName}" not found`);
        }
        return provider;
    }
    buildCacheKey(workspaceId, keyName) {
        return `${_workspacecachekeytype.WORKSPACE_CACHE_KEYS_V2[keyName]}:${workspaceId}`;
    }
    constructor(cacheStorage, discoveryService, reflector){
        this.cacheStorage = cacheStorage;
        this.discoveryService = discoveryService;
        this.reflector = reflector;
        this.localCache = new Map();
        this.workspaceCacheProviders = new Map();
        this.localDataOnlyKeys = new Set();
        this.memoizer = new _promisememoizerstorage.PromiseMemoizer(MEMOIZER_TTL_MS);
        this.logger = new _common.Logger(WorkspaceCacheService.name);
    }
};
WorkspaceCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.EngineWorkspace)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService,
        typeof _core.DiscoveryService === "undefined" ? Object : _core.DiscoveryService,
        typeof _core.Reflector === "undefined" ? Object : _core.Reflector
    ])
], WorkspaceCacheService);

//# sourceMappingURL=workspace-cache.service.js.map