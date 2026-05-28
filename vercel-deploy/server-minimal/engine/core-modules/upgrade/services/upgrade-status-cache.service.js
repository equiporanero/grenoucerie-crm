"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UpgradeStatusCacheService", {
    enumerable: true,
    get: function() {
        return UpgradeStatusCacheService;
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
const BEHIND_IDS_KEY = 'upgrade-status:behind-workspace-ids';
const FAILED_IDS_KEY = 'upgrade-status:failed-workspace-ids';
const UP_TO_DATE_COUNT_KEY = 'upgrade-status:up-to-date-workspace-count';
const COMPUTED_AT_KEY = 'upgrade-status:computed-at';
const CACHE_TTL_MS = 60 * 60 * 1000;
let UpgradeStatusCacheService = class UpgradeStatusCacheService {
    async getComputedAt() {
        const computedAt = await this.cacheStorage.get(COMPUTED_AT_KEY);
        return (0, _utils.isDefined)(computedAt) ? new Date(computedAt) : null;
    }
    async getBehindWorkspaceIds() {
        return this.cacheStorage.setMembers(BEHIND_IDS_KEY);
    }
    async getFailedWorkspaceIds() {
        return this.cacheStorage.setMembers(FAILED_IDS_KEY);
    }
    async getUpToDateWorkspaceCount() {
        const raw = await this.cacheStorage.get(UP_TO_DATE_COUNT_KEY);
        return (0, _utils.isDefined)(raw) ? raw : 0;
    }
    async write({ behindWorkspaceIds, failedWorkspaceIds, upToDateWorkspaceCount, computedAt }) {
        await Promise.all([
            this.cacheStorage.del(BEHIND_IDS_KEY),
            this.cacheStorage.del(FAILED_IDS_KEY)
        ]);
        await Promise.all([
            this.cacheStorage.setAdd(BEHIND_IDS_KEY, behindWorkspaceIds, CACHE_TTL_MS),
            this.cacheStorage.setAdd(FAILED_IDS_KEY, failedWorkspaceIds, CACHE_TTL_MS),
            this.cacheStorage.set(UP_TO_DATE_COUNT_KEY, upToDateWorkspaceCount, CACHE_TTL_MS),
            this.cacheStorage.set(COMPUTED_AT_KEY, computedAt.toISOString(), CACHE_TTL_MS)
        ]);
    }
    async invalidate() {
        await Promise.all([
            this.cacheStorage.del(BEHIND_IDS_KEY),
            this.cacheStorage.del(FAILED_IDS_KEY),
            this.cacheStorage.del(UP_TO_DATE_COUNT_KEY),
            this.cacheStorage.del(COMPUTED_AT_KEY)
        ]);
    }
    constructor(cacheStorage){
        this.cacheStorage = cacheStorage;
    }
};
UpgradeStatusCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.EngineHealth)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService
    ])
], UpgradeStatusCacheService);

//# sourceMappingURL=upgrade-status-cache.service.js.map