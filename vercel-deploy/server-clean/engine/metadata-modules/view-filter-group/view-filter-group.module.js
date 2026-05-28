"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFilterGroupModule", {
    enumerable: true,
    get: function() {
        return ViewFilterGroupModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _permissionsmodule = require("../permissions/permissions.module");
const _viewfiltergroupcontroller = require("./controllers/view-filter-group.controller");
const _viewfiltergroupentity = require("./entities/view-filter-group.entity");
const _viewfiltergroupresolver = require("./resolvers/view-filter-group.resolver");
const _viewfiltergroupservice = require("./services/view-filter-group.service");
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
let ViewFilterGroupModule = class ViewFilterGroupModule {
};
ViewFilterGroupModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _viewfiltergroupentity.ViewFilterGroupEntity,
                _viewentity.ViewEntity
            ]),
            _permissionsmodule.PermissionsModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _applicationmodule.ApplicationModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _viewpermissionsmodule.ViewPermissionsModule
        ],
        controllers: [
            _viewfiltergroupcontroller.ViewFilterGroupController
        ],
        providers: [
            _viewfiltergroupservice.ViewFilterGroupService,
            _viewfiltergroupresolver.ViewFilterGroupResolver
        ],
        exports: [
            _viewfiltergroupservice.ViewFilterGroupService
        ]
    })
], ViewFilterGroupModule);

//# sourceMappingURL=view-filter-group.module.js.map