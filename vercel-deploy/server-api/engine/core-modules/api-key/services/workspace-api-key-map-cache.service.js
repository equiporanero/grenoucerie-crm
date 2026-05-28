"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceApiKeyMapCacheService", {
    enumerable: true,
    get: function() {
        return WorkspaceApiKeyMapCacheService;
    }
});
const _common = require("@nestjs/common");
const _workspacecacheproviderservice = require("../../../workspace-cache/interfaces/workspace-cache-provider.service");
const _fromapikeyentitytoflatutil = require("../utils/from-api-key-entity-to-flat.util");
const _apikeyentity = require("../api-key.entity");
const _injectworkspacescopedrepositorydecorator = require("../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _workspacecachedecorator = require("../../../workspace-cache/decorators/workspace-cache.decorator");
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
let WorkspaceApiKeyMapCacheService = class WorkspaceApiKeyMapCacheService extends _workspacecacheproviderservice.WorkspaceCacheProvider {
    async computeForCache(workspaceId) {
        const apiKeys = await this.apiKeyRepository.find(workspaceId);
        return apiKeys.reduce((map, apiKey)=>{
            map[apiKey.id] = (0, _fromapikeyentitytoflatutil.fromApiKeyEntityToFlat)(apiKey);
            return map;
        }, {});
    }
    constructor(apiKeyRepository){
        super(), this.apiKeyRepository = apiKeyRepository;
    }
};
WorkspaceApiKeyMapCacheService = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _workspacecachedecorator.WorkspaceCache)('apiKeyMap'),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_apikeyentity.ApiKeyEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository
    ])
], WorkspaceApiKeyMapCacheService);

//# sourceMappingURL=workspace-api-key-map-cache.service.js.map