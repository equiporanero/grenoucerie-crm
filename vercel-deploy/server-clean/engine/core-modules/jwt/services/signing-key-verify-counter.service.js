"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SigningKeyVerifyCounterService", {
    enumerable: true,
    get: function() {
        return SigningKeyVerifyCounterService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _cachestoragedecorator = require("../../cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../../cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../cache-storage/types/cache-storage-namespace.enum");
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
const WINDOW_DAYS = 7;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const BUCKET_TTL_MS = (WINDOW_DAYS + 1) * ONE_DAY_MS;
const FLUSH_INTERVAL_MS = 30 * 1000;
const REDIS_KEY_PREFIX = 'signing-key-verifies';
const LEGACY_BUCKET_ID = 'legacy';
let SigningKeyVerifyCounterService = class SigningKeyVerifyCounterService {
    onModuleInit() {
        this.flushIntervalHandle = setInterval(()=>{
            void this.flush();
        }, FLUSH_INTERVAL_MS);
        if ((0, _utils.isDefined)(this.flushIntervalHandle.unref)) {
            this.flushIntervalHandle.unref();
        }
    }
    async onModuleDestroy() {
        if ((0, _utils.isDefined)(this.flushIntervalHandle)) {
            clearInterval(this.flushIntervalHandle);
            this.flushIntervalHandle = null;
        }
        await this.flush();
    }
    recordKidVerify(kid) {
        this.increment(kid);
    }
    recordLegacyVerify() {
        this.increment(LEGACY_BUCKET_ID);
    }
    async getUsageInWindow(kids) {
        await this.flush();
        const bucketIds = [
            ...kids,
            LEGACY_BUCKET_ID
        ];
        const keysByBucket = bucketIds.map((bucketId)=>this.buildBucketKeysInWindow(bucketId));
        let valuesByBucket;
        try {
            const flatValues = await this.cacheStorage.mget(keysByBucket.flat());
            valuesByBucket = bucketIds.map((_, bucketIndex)=>flatValues.slice(bucketIndex * WINDOW_DAYS, (bucketIndex + 1) * WINDOW_DAYS));
        } catch (error) {
            this.logger.warn(`Failed to read signing key verify counts: ${error instanceof Error ? error.message : String(error)}`);
            valuesByBucket = bucketIds.map(()=>[]);
        }
        const sumWindow = (windowValues)=>windowValues.reduce((total, value)=>(0, _utils.isDefined)(value) && Number.isFinite(value) ? total + value : total, 0);
        return {
            byKid: Object.fromEntries(kids.map((kid, kidIndex)=>[
                    kid,
                    sumWindow(valuesByBucket[kidIndex])
                ])),
            legacyCount: sumWindow(valuesByBucket[bucketIds.length - 1]),
            windowDays: WINDOW_DAYS
        };
    }
    increment(bucketId) {
        const key = this.buildBucketKey(bucketId, Date.now());
        this.pendingCounts.set(key, (this.pendingCounts.get(key) ?? 0) + 1);
    }
    async flush() {
        if (this.pendingCounts.size === 0) {
            return;
        }
        const snapshot = this.pendingCounts;
        this.pendingCounts = new Map();
        const entries = Array.from(snapshot.entries());
        const incrResults = await Promise.allSettled(entries.map(([key, increment])=>this.cacheStorage.incrBy(key, increment)));
        const incrementedKeys = [];
        let failedCount = 0;
        for(let index = 0; index < entries.length; index++){
            const [key, increment] = entries[index];
            if (incrResults[index].status === 'rejected') {
                this.pendingCounts.set(key, (this.pendingCounts.get(key) ?? 0) + increment);
                failedCount++;
                continue;
            }
            incrementedKeys.push(key);
        }
        await Promise.allSettled(incrementedKeys.map((key)=>this.cacheStorage.expire(key, BUCKET_TTL_MS)));
        if (failedCount > 0) {
            this.logger.warn(`Failed to flush ${failedCount}/${entries.length} signing key verify bucket(s); re-buffered for next flush`);
        }
    }
    buildBucketKey(bucketId, timestamp) {
        const bucketStart = Math.floor(timestamp / ONE_DAY_MS) * ONE_DAY_MS;
        return `${REDIS_KEY_PREFIX}:${bucketId}:${bucketStart}`;
    }
    buildBucketKeysInWindow(bucketId) {
        const currentBucketStart = Math.floor(Date.now() / ONE_DAY_MS) * ONE_DAY_MS;
        return Array.from({
            length: WINDOW_DAYS
        }, (_, index)=>`${REDIS_KEY_PREFIX}:${bucketId}:${currentBucketStart - index * ONE_DAY_MS}`);
    }
    constructor(cacheStorage){
        this.cacheStorage = cacheStorage;
        this.logger = new _common.Logger(SigningKeyVerifyCounterService.name);
        this.pendingCounts = new Map();
        this.flushIntervalHandle = null;
    }
};
SigningKeyVerifyCounterService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.EngineMetrics)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService
    ])
], SigningKeyVerifyCounterService);

//# sourceMappingURL=signing-key-verify-counter.service.js.map