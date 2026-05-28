"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewSortModule", {
    enumerable: true,
    get: function() {
        return ViewSortModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _permissionsmodule = require("../permissions/permissions.module");
const _viewpermissionsmodule = require("../view-permissions/view-permissions.module");
const _viewsortcontroller = require("./controllers/view-sort.controller");
const _viewsortentity = require("./entities/view-sort.entity");
const _viewsortresolver = require("./resolvers/view-sort.resolver");
const _viewsortservice = require("./services/view-sort.service");
const _viewsorttoolsfactory = require("./tools/view-sort-tools.factory");
const _viewentity = require("../view/entities/view.entity");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ViewSortModule = class ViewSortModule {
};
ViewSortModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _viewsortentity.ViewSortEntity,
                _viewentity.ViewEntity
            ]),
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _applicationmodule.ApplicationModule,
            _permissionsmodule.PermissionsModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _viewpermissionsmodule.ViewPermissionsModule
        ],
        controllers: [
            _viewsortcontroller.ViewSortController
        ],
        providers: [
            _viewsortservice.ViewSortService,
            _viewsortresolver.ViewSortResolver,
            _viewsorttoolsfactory.ViewSortToolsFactory
        ],
        exports: [
            _viewsortservice.ViewSortService,
            _viewsorttoolsfactory.ViewSortToolsFactory
        ]
    })
], ViewSortModule);

//# sourceMappingURL=view-sort.module.js.map