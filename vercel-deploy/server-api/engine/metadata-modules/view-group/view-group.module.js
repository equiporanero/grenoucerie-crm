"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewGroupModule", {
    enumerable: true,
    get: function() {
        return ViewGroupModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _featureflagmodule = require("../../core-modules/feature-flag/feature-flag.module");
const _i18nmodule = require("../../core-modules/i18n/i18n.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _permissionsmodule = require("../permissions/permissions.module");
const _viewgroupcontroller = require("./controllers/view-group.controller");
const _viewgroupentity = require("./entities/view-group.entity");
const _viewgroupresolver = require("./resolvers/view-group.resolver");
const _viewgroupservice = require("./services/view-group.service");
const _viewpermissionsmodule = require("../view-permissions/view-permissions.module");
const _viewentity = require("../view/entities/view.entity");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ViewGroupModule = class ViewGroupModule {
};
ViewGroupModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _viewgroupentity.ViewGroupEntity,
                _viewentity.ViewEntity
            ]),
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _applicationmodule.ApplicationModule,
            _featureflagmodule.FeatureFlagModule,
            _i18nmodule.I18nModule,
            _permissionsmodule.PermissionsModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _viewpermissionsmodule.ViewPermissionsModule
        ],
        controllers: [
            _viewgroupcontroller.ViewGroupController
        ],
        providers: [
            _viewgroupservice.ViewGroupService,
            _viewgroupresolver.ViewGroupResolver
        ],
        exports: [
            _viewgroupservice.ViewGroupService
        ]
    })
], ViewGroupModule);

//# sourceMappingURL=view-group.module.js.map