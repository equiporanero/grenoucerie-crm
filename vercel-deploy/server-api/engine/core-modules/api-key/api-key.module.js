"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApiKeyModule", {
    enumerable: true,
    get: function() {
        return ApiKeyModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _apikeyentity = require("./api-key.entity");
const _apikeyresolver = require("./api-key.resolver");
const _generateapikeycommand = require("./commands/generate-api-key.command");
const _apikeyroleservice = require("./services/api-key-role.service");
const _apikeyservice = require("./services/api-key.service");
const _workspaceapikeymapcacheservice = require("./services/workspace-api-key-map-cache.service");
const _tokenmodule = require("../auth/token/token.module");
const _featureflagmodule = require("../feature-flag/feature-flag.module");
const _jwtmodule = require("../jwt/jwt.module");
const _workspaceentity = require("../workspace/workspace.entity");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _roletargetentity = require("../../metadata-modules/role-target/role-target.entity");
const _roletargetmodule = require("../../metadata-modules/role-target/role-target.module");
const _roleentity = require("../../metadata-modules/role/role.entity");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
const _apikeycontroller = require("./controllers/api-key.controller");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApiKeyModule = class ApiKeyModule {
};
ApiKeyModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _apikeyentity.ApiKeyEntity,
                _roletargetentity.RoleTargetEntity,
                _roleentity.RoleEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _jwtmodule.JwtModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _featureflagmodule.FeatureFlagModule,
            _roletargetmodule.RoleTargetModule,
            _tokenmodule.TokenModule,
            _permissionsmodule.PermissionsModule
        ],
        providers: [
            _apikeyservice.ApiKeyService,
            _apikeyresolver.ApiKeyResolver,
            _apikeyroleservice.ApiKeyRoleService,
            _workspaceapikeymapcacheservice.WorkspaceApiKeyMapCacheService,
            _generateapikeycommand.GenerateApiKeyCommand,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_apikeyentity.ApiKeyEntity)
        ],
        controllers: [
            _apikeycontroller.ApiKeyController
        ],
        exports: [
            _apikeyservice.ApiKeyService,
            _apikeyroleservice.ApiKeyRoleService,
            _typeorm.TypeOrmModule,
            _generateapikeycommand.GenerateApiKeyCommand
        ]
    })
], ApiKeyModule);

//# sourceMappingURL=api-key.module.js.map