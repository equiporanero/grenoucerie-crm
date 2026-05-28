"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceManyOrAllFlatEntityMapsCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceManyOrAllFlatEntityMapsCacheService;
    }
});
const _common = require("@nestjs/common");
const _allflatentitymapspropertiesconstant = require("../constant/all-flat-entity-maps-properties.constant");
const _workspacecacheservice = require("../../../workspace-cache/services/workspace-cache.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceManyOrAllFlatEntityMapsCacheService = class WorkspaceManyOrAllFlatEntityMapsCacheService {
    async getOrRecomputeManyOrAllFlatEntityMaps({ flatMapsKeys, workspaceId }) {
        return await this.workspaceCacheService.getOrRecompute(workspaceId, flatMapsKeys ?? _allflatentitymapspropertiesconstant.ALL_FLAT_ENTITY_MAPS_PROPERTIES);
    }
    async invalidateFlatEntityMaps({ flatMapsKeys, workspaceId }) {
        await this.workspaceCacheService.invalidateAndRecompute(workspaceId, flatMapsKeys ?? _allflatentitymapspropertiesconstant.ALL_FLAT_ENTITY_MAPS_PROPERTIES);
    }
    async flushFlatEntityMaps({ flatMapsKeys, workspaceId }) {
        await this.workspaceCacheService.flush(workspaceId, flatMapsKeys ?? _allflatentitymapspropertiesconstant.ALL_FLAT_ENTITY_MAPS_PROPERTIES);
    }
    constructor(workspaceCacheService){
        this.workspaceCacheService = workspaceCacheService;
    }
};
WorkspaceManyOrAllFlatEntityMapsCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], WorkspaceManyOrAllFlatEntityMapsCacheService);

//# sourceMappingURL=workspace-many-or-all-flat-entity-maps-cache.service.js.map