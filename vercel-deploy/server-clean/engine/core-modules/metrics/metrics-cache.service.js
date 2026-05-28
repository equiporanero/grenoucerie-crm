"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MetricsCacheService", {
    enumerable: true,
    get: function() {
        return MetricsCacheService;
    }
});
const _common = require("@nestjs/common");
const _cachestoragedecorator = require("../cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../cache-storage/types/cache-storage-namespace.enum");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
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
const CACHE_BUCKET_DURATION_MS = 15000; // 15 seconds window for each cache bucket
let MetricsCacheService = class MetricsCacheService {
    getCacheBucketStartTimestamp(timestamp) {
        return Math.floor(timestamp / CACHE_BUCKET_DURATION_MS) * CACHE_BUCKET_DURATION_MS;
    }
    getCacheKeyWithTimestamp(key, timestamp) {
        const currentIntervalTimestamp = timestamp ?? this.getCacheBucketStartTimestamp(Date.now());
        return `${key}:${currentIntervalTimestamp}`;
    }
    getLastCacheBucketStartTimestampsFromDate(cacheBucketsCount, date) {
        const currentIntervalTimestamp = this.getCacheBucketStartTimestamp(date);
        return Array.from({
            length: cacheBucketsCount
        }, (_, i)=>currentIntervalTimestamp - i * CACHE_BUCKET_DURATION_MS);
    }
    async updateCounter(key, items) {
        return await this.cacheStorage.setAdd(this.getCacheKeyWithTimestamp(key), items, this.healthCacheTtl);
    }
    async computeCount({ key, timeWindowInSeconds = this.healthMetricsTimeWindowInMinutes * 60, date = Date.now() }) {
        if (timeWindowInSeconds * 1000 % CACHE_BUCKET_DURATION_MS !== 0) {
            throw new Error(`Time window must be divisible by ${CACHE_BUCKET_DURATION_MS}`);
        }
        const cacheBuckets = timeWindowInSeconds / (CACHE_BUCKET_DURATION_MS / 1000);
        const cacheKeys = this.computeTimeStampedCacheKeys(key, cacheBuckets, date);
        return await this.cacheStorage.countAllSetMembers(cacheKeys);
    }
    computeTimeStampedCacheKeys(key, cacheBucketsCount, date) {
        return this.getLastCacheBucketStartTimestampsFromDate(cacheBucketsCount, date).map((timestamp)=>this.getCacheKeyWithTimestamp(key, timestamp));
    }
    constructor(cacheStorage, twentyConfigService){
        this.cacheStorage = cacheStorage;
        this.twentyConfigService = twentyConfigService;
        this.healthMetricsTimeWindowInMinutes = this.twentyConfigService.get('HEALTH_METRICS_TIME_WINDOW_IN_MINUTES');
        this.healthCacheTtl = this.healthMetricsTimeWindowInMinutes * 60000 * 2;
    }
};
MetricsCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.EngineMetrics)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], MetricsCacheService);

//# sourceMappingURL=metrics-cache.service.js.map