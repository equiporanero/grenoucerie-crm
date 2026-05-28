"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CacheLockService", {
    enumerable: true,
    get: function() {
        return CacheLockService;
    }
});
const _common = require("@nestjs/common");
const _cachestoragedecorator = require("../cache-storage/decorators/cache-storage.decorator");
const _cachestoragenamespaceenum = require("../cache-storage/types/cache-storage-namespace.enum");
const _cachestorageservice = require("../cache-storage/services/cache-storage.service");
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
let CacheLockService = class CacheLockService {
    async delay(ms) {
        return new Promise((res)=>setTimeout(res, ms));
    }
    async withLock(fn, key, options) {
        const { ms = 100, maxRetries = 50, ttl = 5_500 } = options || {};
        for(let attempt = 0; attempt < maxRetries; attempt++){
            const acquired = await this.cacheStorageService.acquireLock(key, ttl);
            if (acquired) {
                try {
                    return await fn();
                } finally{
                    try {
                        await this.cacheStorageService.releaseLock(key);
                    } catch (releaseError) {
                        this.logger.warn(`Failed to release lock for key "${key}": ${releaseError}`);
                    }
                }
            }
            await this.delay(ms);
        }
        throw new Error(`Failed to acquire lock for key: ${key}`);
    }
    constructor(cacheStorageService){
        this.cacheStorageService = cacheStorageService;
        this.logger = new _common.Logger(CacheLockService.name);
    }
};
CacheLockService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.EngineLock)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService
    ])
], CacheLockService);

//# sourceMappingURL=cache-lock.service.js.map