"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceResolverNameMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceResolverNameMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _workspacecacheproviderservice = require("../../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _buildresolvernamemaputil = require("../utils/build-resolver-name-map.util");
const _workspacecachedecorator = require("../../../../workspace-cache/decorators/workspace-cache.decorator");
const _workspacecacheservice = require("../../../../workspace-cache/services/workspace-cache.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkspaceResolverNameMapCacheService = class WorkspaceResolverNameMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const { flatObjectMetadataMaps } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
            'flatObjectMetadataMaps'
        ]);
        return (0, _buildresolvernamemaputil.buildResolverNameMap)(flatObjectMetadataMaps);
    }
    constructor(workspaceCacheService){
        super(), this.workspaceCacheService = workspaceCacheService;
    }
};
WorkspaceResolverNameMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('graphQLResolverNameMap'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService
    ])
], WorkspaceResolverNameMapCacheService);

//# sourceMappingURL=workspace-resolver-name-map-cache.service.js.map