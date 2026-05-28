"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RoleModule", {
    enumerable: true,
    get: function() {
        return RoleModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _apikeymodule = require("../../core-modules/api-key/api-key.module");
const _applicationentity = require("../../core-modules/application/application.entity");
const _applicationmodule = require("../../core-modules/application/application.module");
const _filemodule = require("../../core-modules/file/file.module");
const _userworkspaceentity = require("../../core-modules/user-workspace/user-workspace.entity");
const _userworkspacemodule = require("../../core-modules/user-workspace/user-workspace.module");
const _aiagentrolemodule = require("../ai/ai-agent-role/ai-agent-role.module");
const _flatagentmodule = require("../flat-agent/flat-agent.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _workspaceflatroletargetmapcacheservice = require("../flat-role-target/services/workspace-flat-role-target-map-cache.service");
const _objectmetadataentity = require("../object-metadata/object-metadata.entity");
const _fieldpermissionentity = require("../object-permission/field-permission/field-permission.entity");
const _objectpermissionentity = require("../object-permission/object-permission.entity");
const _objectpermissionmodule = require("../object-permission/object-permission.module");
const _rolepermissionflagentity = require("../role-permission-flag/role-permission-flag.entity");
const _rolepermissionflagmodule = require("../role-permission-flag/role-permission-flag.module");
const _permissionsmodule = require("../permissions/permissions.module");
const _roletargetentity = require("../role-target/role-target.entity");
const _roleentity = require("./role.entity");
const _roleresolver = require("./role.resolver");
const _roleservice = require("./role.service");
const _workspaceflatrolemapcacheservice = require("./services/workspace-flat-role-map-cache.service");
const _workspacerolespermissionscacheservice = require("./services/workspace-roles-permissions-cache.service");
const _rowlevelpermissionpredicategroupentity = require("../row-level-permission-predicate/entities/row-level-permission-predicate-group.entity");
const _rowlevelpermissionpredicateentity = require("../row-level-permission-predicate/entities/row-level-permission-predicate.entity");
const _rowlevelpermissionmodule = require("../row-level-permission-predicate/row-level-permission.module");
const _userrolemodule = require("../user-role/user-role.module");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RoleModule = class RoleModule {
};
RoleModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _applicationentity.ApplicationEntity,
                _roleentity.RoleEntity,
                _roletargetentity.RoleTargetEntity,
                _objectpermissionentity.ObjectPermissionEntity,
                _rolepermissionflagentity.RolePermissionFlagEntity,
                _fieldpermissionentity.FieldPermissionEntity,
                _userworkspaceentity.UserWorkspaceEntity,
                _objectmetadataentity.ObjectMetadataEntity,
                _rowlevelpermissionpredicateentity.RowLevelPermissionPredicateEntity,
                _rowlevelpermissionpredicategroupentity.RowLevelPermissionPredicateGroupEntity
            ]),
            _userrolemodule.UserRoleModule,
            _aiagentrolemodule.AiAgentRoleModule,
            _applicationmodule.ApplicationModule,
            _apikeymodule.ApiKeyModule,
            _permissionsmodule.PermissionsModule,
            _objectpermissionmodule.ObjectPermissionModule,
            _rolepermissionflagmodule.RolePermissionFlagModule,
            _rowlevelpermissionmodule.RowLevelPermissionModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _userworkspacemodule.UserWorkspaceModule,
            _filemodule.FileModule,
            _applicationmodule.ApplicationModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _flatagentmodule.FlatAgentModule
        ],
        providers: [
            _roleservice.RoleService,
            _roleresolver.RoleResolver,
            _workspaceflatrolemapcacheservice.WorkspaceFlatRoleMapCacheService,
            _workspaceflatroletargetmapcacheservice.WorkspaceFlatRoleTargetMapCacheService,
            _workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor,
            _workspacerolespermissionscacheservice.WorkspaceRolesPermissionsCacheService
        ],
        exports: [
            _roleservice.RoleService,
            _workspaceflatrolemapcacheservice.WorkspaceFlatRoleMapCacheService,
            _workspaceflatroletargetmapcacheservice.WorkspaceFlatRoleTargetMapCacheService
        ]
    })
], RoleModule);

//# sourceMappingURL=role.module.js.map