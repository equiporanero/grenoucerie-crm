"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GetDataFromCacheWithRecomputeService", {
    enumerable: true,
    get: function() {
        return GetDataFromCacheWithRecomputeService;
    }
});
const _common = require("@nestjs/common");
const _node = require("@sentry/node");
const _utils = require("twenty-shared/utils");
const _twentyormexception = require("../../twenty-orm/exceptions/twenty-orm.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GetDataFromCacheWithRecomputeService = class GetDataFromCacheWithRecomputeService {
    constructor(){
        this.cache = new Map();
        this.logger = new _common.Logger(GetDataFromCacheWithRecomputeService.name);
        this.getFromCacheWithRecompute = async ({ workspaceId, getCacheData, getCacheVersion, recomputeCache, cachedEntityName, exceptionCode })=>{
            let cachedVersion;
            let cachedData;
            cachedVersion = await getCacheVersion(workspaceId);
            if ((0, _utils.isDefined)(cachedVersion)) {
                const cacheKey = `${workspaceId}-${cachedVersion}`;
                const cachedValue = this.cache.get(cacheKey);
                if (cachedValue) {
                    return cachedValue;
                }
            }
            cachedData = await getCacheData(workspaceId);
            if (!(0, _utils.isDefined)(cachedData) || !(0, _utils.isDefined)(cachedVersion)) {
                _node.logger.warn(`Triggering cache recompute for ${cachedEntityName} (workspace ${workspaceId})`, {
                    cachedVersion,
                    cachedData
                });
                await recomputeCache({
                    workspaceId
                });
                cachedData = await getCacheData(workspaceId);
                cachedVersion = await getCacheVersion(workspaceId);
                if (!(0, _utils.isDefined)(cachedData) || !(0, _utils.isDefined)(cachedVersion)) {
                    _node.logger.warn(`Data still missing after recompute for ${cachedEntityName} (workspace ${workspaceId})`, {
                        cachedVersion,
                        cachedData
                    });
                    throw new _twentyormexception.TwentyORMException(`${cachedEntityName} not found after recompute for workspace ${workspaceId} (missingData: ${!(0, _utils.isDefined)(cachedData)}, missingVersion: ${!(0, _utils.isDefined)(cachedVersion)})`, exceptionCode);
                }
            }
            const cacheKey = `${workspaceId}-${cachedVersion}`;
            this.cache.set(cacheKey, {
                version: cachedVersion,
                data: cachedData
            });
            return {
                version: cachedVersion,
                data: cachedData
            };
        };
    }
};
GetDataFromCacheWithRecomputeService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [])
], GetDataFromCacheWithRecomputeService);

//# sourceMappingURL=get-data-from-cache-with-recompute.service.js.map