"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RoleTargetModule", {
    enumerable: true,
    get: function() {
        return RoleTargetModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _roletargetentity = require("./role-target.entity");
const _workspaceapikeyrolemapcacheservice = require("./services/workspace-api-key-role-map-cache.service");
const _workspaceuserworkspacerolemapcacheservice = require("./services/workspace-user-workspace-role-map-cache.service");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
const _roletargetservice = require("./services/role-target.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RoleTargetModule = class RoleTargetModule {
};
RoleTargetModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _applicationmodule.ApplicationModule,
            _typeorm.TypeOrmModule.forFeature([
                _roletargetentity.RoleTargetEntity
            ])
        ],
        providers: [
            _roletargetservice.RoleTargetService,
            _workspaceuserworkspacerolemapcacheservice.WorkspaceUserWorkspaceRoleMapCacheService,
            _workspaceapikeyrolemapcacheservice.WorkspaceApiKeyRoleMapCacheService
        ],
        exports: [
            _roletargetservice.RoleTargetService
        ]
    })
], RoleTargetModule);

//# sourceMappingURL=role-target.module.js.map