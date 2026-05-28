"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PermissionsModule", {
    enumerable: true,
    get: function() {
        return PermissionsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _apikeyentity = require("../../core-modules/api-key/api-key.entity");
const _apikeyroleservice = require("../../core-modules/api-key/services/api-key-role.service");
const _applicationentity = require("../../core-modules/application/application.entity");
const _featureflagmodule = require("../../core-modules/feature-flag/feature-flag.module");
const _userworkspaceentity = require("../../core-modules/user-workspace/user-workspace.entity");
const _permissionsservice = require("./permissions.service");
const _roletargetentity = require("../role-target/role-target.entity");
const _roletargetmodule = require("../role-target/role-target.module");
const _roleentity = require("../role/role.entity");
const _userrolemodule = require("../user-role/user-role.module");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PermissionsModule = class PermissionsModule {
};
PermissionsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _roleentity.RoleEntity,
                _roletargetentity.RoleTargetEntity,
                _apikeyentity.ApiKeyEntity,
                _applicationentity.ApplicationEntity
            ]),
            _featureflagmodule.FeatureFlagModule,
            _typeorm.TypeOrmModule.forFeature([
                _userworkspaceentity.UserWorkspaceEntity
            ]),
            _userrolemodule.UserRoleModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _roletargetmodule.RoleTargetModule
        ],
        providers: [
            _apikeyroleservice.ApiKeyRoleService,
            _permissionsservice.PermissionsService,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_apikeyentity.ApiKeyEntity)
        ],
        exports: [
            _permissionsservice.PermissionsService,
            _apikeyroleservice.ApiKeyRoleService
        ]
    })
], PermissionsModule);

//# sourceMappingURL=permissions.module.js.map