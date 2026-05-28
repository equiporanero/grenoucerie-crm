"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DevSeederModule", {
    enumerable: true,
    get: function() {
        return DevSeederModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeormmodule = require("../../../database/typeorm/typeorm.module");
const _apikeymodule = require("../../core-modules/api-key/api-key.module");
const _applicationregistrationmodule = require("../../core-modules/application/application-registration/application-registration.module");
const _applicationmodule = require("../../core-modules/application/application.module");
const _featureflagmodule = require("../../core-modules/feature-flag/feature-flag.module");
const _sdkclientmodule = require("../../core-modules/sdk-client/sdk-client.module");
const _filestoragemodule = require("../../core-modules/file-storage/file-storage.module");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _fieldmetadatamodule = require("../../metadata-modules/field-metadata/field-metadata.module");
const _workspacemanyorallflatentitymapscachemodule = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _objectmetadataentity = require("../../metadata-modules/object-metadata/object-metadata.entity");
const _objectmetadatamodule = require("../../metadata-modules/object-metadata/object-metadata.module");
const _objectpermissionmodule = require("../../metadata-modules/object-permission/object-permission.module");
const _roletargetmodule = require("../../metadata-modules/role-target/role-target.module");
const _rolemodule = require("../../metadata-modules/role/role.module");
const _userrolemodule = require("../../metadata-modules/user-role/user-role.module");
const _upgrademodule = require("../../core-modules/upgrade/upgrade.module");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
const _workspacedatasourcemodule = require("../../workspace-datasource/workspace-datasource.module");
const _devseederpermissionsservice = require("./core/services/dev-seeder-permissions.service");
const _devseederdataservice = require("./data/services/dev-seeder-data.service");
const _timelineactivityseederservice = require("./data/services/timeline-activity-seeder.service");
const _devseedermetadataservice = require("./metadata/services/dev-seeder-metadata.service");
const _devseederservice = require("./services/dev-seeder.service");
const _standardobjectsprefillmodule = require("../standard-objects-prefill-data/standard-objects-prefill.module");
const _twentystandardapplicationmodule = require("../twenty-standard-application/twenty-standard-application.module");
const _workspacemigrationmodule = require("../workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DevSeederModule = class DevSeederModule {
};
DevSeederModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _objectmetadatamodule.ObjectMetadataModule,
            _fieldmetadatamodule.FieldMetadataModule,
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _typeormmodule.TypeORMModule,
            _rolemodule.RoleModule,
            _roletargetmodule.RoleTargetModule,
            _userrolemodule.UserRoleModule,
            _apikeymodule.ApiKeyModule,
            _applicationmodule.ApplicationModule,
            _applicationregistrationmodule.ApplicationRegistrationModule,
            _featureflagmodule.FeatureFlagModule,
            _filestoragemodule.FileStorageModule,
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity,
                _objectmetadataentity.ObjectMetadataEntity
            ]),
            _objectpermissionmodule.ObjectPermissionModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _standardobjectsprefillmodule.StandardObjectsPrefillModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _twentystandardapplicationmodule.TwentyStandardApplicationModule,
            _sdkclientmodule.SdkClientModule,
            _upgrademodule.UpgradeModule
        ],
        exports: [
            _devseederservice.DevSeederService
        ],
        providers: [
            _devseederservice.DevSeederService,
            _devseedermetadataservice.DevSeederMetadataService,
            _devseederpermissionsservice.DevSeederPermissionsService,
            _devseederdataservice.DevSeederDataService,
            _timelineactivityseederservice.TimelineActivitySeederService
        ]
    })
], DevSeederModule);

//# sourceMappingURL=dev-seeder.module.js.map