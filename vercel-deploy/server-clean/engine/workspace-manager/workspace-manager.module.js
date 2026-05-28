"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceManagerModule", {
    enumerable: true,
    get: function() {
        return WorkspaceManagerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../core-modules/application/application.module");
const _featureflagmodule = require("../core-modules/feature-flag/feature-flag.module");
const _userworkspaceentity = require("../core-modules/user-workspace/user-workspace.entity");
const _workspaceentity = require("../core-modules/workspace/workspace.entity");
const _aiagentmodule = require("../metadata-modules/ai/ai-agent/ai-agent.module");
const _fieldmetadataentity = require("../metadata-modules/field-metadata/field-metadata.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _logicfunctionentity = require("../metadata-modules/logic-function/logic-function.entity");
const _objectmetadatamodule = require("../metadata-modules/object-metadata/object-metadata.module");
const _permissionsmodule = require("../metadata-modules/permissions/permissions.module");
const _roletargetentity = require("../metadata-modules/role-target/role-target.entity");
const _roleentity = require("../metadata-modules/role/role.entity");
const _rolemodule = require("../metadata-modules/role/role.module");
const _userrolemodule = require("../metadata-modules/user-role/user-role.module");
const _workspacedatasourcemodule = require("../workspace-datasource/workspace-datasource.module");
const _devseedermodule = require("./dev-seeder/dev-seeder.module");
const _twentystandardapplicationmodule = require("./twenty-standard-application/twenty-standard-application.module");
const _workspacemigrationmodule = require("./workspace-migration/workspace-migration.module");
const _workspacemanagerservice = require("./workspace-manager.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceManagerModule = class WorkspaceManagerModule {
};
WorkspaceManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _objectmetadatamodule.ObjectMetadataModule,
            _devseedermodule.DevSeederModule,
            _featureflagmodule.FeatureFlagModule,
            _permissionsmodule.PermissionsModule,
            _aiagentmodule.AiAgentModule,
            _twentystandardapplicationmodule.TwentyStandardApplicationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _typeorm.TypeOrmModule.forFeature([
                _userworkspaceentity.UserWorkspaceEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _rolemodule.RoleModule,
            _userrolemodule.UserRoleModule,
            _applicationmodule.ApplicationModule,
            _typeorm.TypeOrmModule.forFeature([
                _fieldmetadataentity.FieldMetadataEntity,
                _roletargetentity.RoleTargetEntity,
                _roleentity.RoleEntity,
                _logicfunctionentity.LogicFunctionEntity
            ])
        ],
        exports: [
            _workspacemanagerservice.WorkspaceManagerService
        ],
        providers: [
            _workspacemanagerservice.WorkspaceManagerService
        ]
    })
], WorkspaceManagerModule);

//# sourceMappingURL=workspace-manager.module.js.map