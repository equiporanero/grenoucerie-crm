"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ThrottlerService", {
    enumerable: true,
    get: function() {
        return ThrottlerService;
    }
});
const _common = require("@nestjs/common");
const _cachestoragedecorator = require("../cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../cache-storage/types/cache-storage-namespace.enum");
const _throttlerexception = require("./throttler.exception");
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
let ThrottlerService = class ThrottlerService {
    async tokenBucketThrottleOrThrow(key, tokensToConsume, maxTokens, timeWindow) {
        const now = Date.now();
        const availableTokens = await this.getAvailableTokensCount(key, maxTokens, timeWindow, now);
        if (availableTokens < tokensToConsume) {
            throw new _throttlerexception.ThrottlerException(`Limit reached (${maxTokens} tokens per ${timeWindow} ms)`, _throttlerexception.ThrottlerExceptionCode.LIMIT_REACHED);
        }
        await this.cacheStorage.set(key, {
            tokens: availableTokens - tokensToConsume,
            lastRefillAt: now
        }, timeWindow * 2);
        return availableTokens - tokensToConsume;
    }
    async consumeTokens(key, tokensToConsume, maxTokens, timeWindow) {
        const now = Date.now();
        const availableTokens = await this.getAvailableTokensCount(key, maxTokens, timeWindow, now);
        await this.cacheStorage.set(key, {
            tokens: availableTokens - tokensToConsume,
            lastRefillAt: now
        }, timeWindow * 2);
    }
    async getAvailableTokensCount(key, maxTokens, timeWindow, now = Date.now()) {
        const refillRate = maxTokens / timeWindow;
        const { tokens, lastRefillAt } = await this.cacheStorage.get(key) || {
            tokens: maxTokens,
            lastRefillAt: now
        };
        const refillAmount = Math.floor((now - lastRefillAt) * refillRate);
        return Math.min(tokens + refillAmount, maxTokens);
    }
    constructor(cacheStorage){
        this.cacheStorage = cacheStorage;
    }
};
ThrottlerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.EngineWorkspace)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService
    ])
], ThrottlerService);

//# sourceMappingURL=throttler.service.js.map