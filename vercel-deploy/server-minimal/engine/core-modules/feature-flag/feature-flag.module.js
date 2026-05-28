"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FeatureFlagModule", {
    enumerable: true,
    get: function() {
        return FeatureFlagModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeormmodule = require("../../../database/typeorm/typeorm.module");
const _featureflagentity = require("./feature-flag.entity");
const _featureflagservice = require("./services/feature-flag.service");
const _workspacefeatureflagsmapcachemodule = require("../../metadata-modules/workspace-feature-flags-map-cache/workspace-feature-flags-map-cache.module");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let FeatureFlagModule = class FeatureFlagModule {
};
FeatureFlagModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeormmodule.TypeORMModule,
            _typeorm.TypeOrmModule.forFeature([
                _featureflagentity.FeatureFlagEntity
            ]),
            _workspacefeatureflagsmapcachemodule.WorkspaceFeatureFlagsMapCacheModule,
            _workspacecachemodule.WorkspaceCacheModule
        ],
        exports: [
            _featureflagservice.FeatureFlagService
        ],
        providers: [
            _featureflagservice.FeatureFlagService,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_featureflagentity.FeatureFlagEntity)
        ]
    })
], FeatureFlagModule);

//# sourceMappingURL=feature-flag.module.js.map