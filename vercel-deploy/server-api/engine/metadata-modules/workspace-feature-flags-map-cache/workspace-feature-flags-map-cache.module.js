"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceFeatureFlagsMapCacheModule", {
    enumerable: true,
    get: function() {
        return WorkspaceFeatureFlagsMapCacheModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _featureflagentity = require("../../core-modules/feature-flag/feature-flag.entity");
const _workspacefeatureflagsmapcacheservice = require("./workspace-feature-flags-map-cache.service");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceFeatureFlagsMapCacheModule = class WorkspaceFeatureFlagsMapCacheModule {
};
WorkspaceFeatureFlagsMapCacheModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _featureflagentity.FeatureFlagEntity
            ])
        ],
        providers: [
            _workspacefeatureflagsmapcacheservice.WorkspaceFeatureFlagsMapCacheService,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_featureflagentity.FeatureFlagEntity)
        ],
        exports: [
            _workspacefeatureflagsmapcacheservice.WorkspaceFeatureFlagsMapCacheService
        ]
    })
], WorkspaceFeatureFlagsMapCacheModule);

//# sourceMappingURL=workspace-feature-flags-map-cache.module.js.map