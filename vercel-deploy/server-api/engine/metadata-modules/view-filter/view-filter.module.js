"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewFilterModule", {
    enumerable: true,
    get: function() {
        return ViewFilterModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _permissionsmodule = require("../permissions/permissions.module");
const _viewfiltercontroller = require("./controllers/view-filter.controller");
const _viewfilterentity = require("./entities/view-filter.entity");
const _viewfilterresolver = require("./resolvers/view-filter.resolver");
const _viewfilterservice = require("./services/view-filter.service");
const _viewfiltertoolsfactory = require("./tools/view-filter-tools.factory");
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
let ViewFilterModule = class ViewFilterModule {
};
ViewFilterModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _viewfilterentity.ViewFilterEntity,
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
            _viewfiltercontroller.ViewFilterController
        ],
        providers: [
            _viewfilterservice.ViewFilterService,
            _viewfilterresolver.ViewFilterResolver,
            _viewfiltertoolsfactory.ViewFilterToolsFactory
        ],
        exports: [
            _viewfilterservice.ViewFilterService,
            _viewfiltertoolsfactory.ViewFilterToolsFactory
        ]
    })
], ViewFilterModule);

//# sourceMappingURL=view-filter.module.js.map