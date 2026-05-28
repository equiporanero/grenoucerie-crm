"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ViewModule", {
    enumerable: true,
    get: function() {
        return ViewModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _i18nmodule = require("../../core-modules/i18n/i18n.module");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _flatviewmodule = require("../flat-view/flat-view.module");
const _permissionsmodule = require("../permissions/permissions.module");
const _userrolemodule = require("../user-role/user-role.module");
const _viewfieldgroupmodule = require("../view-field-group/view-field-group.module");
const _viewfieldmodule = require("../view-field/view-field.module");
const _viewfiltermodule = require("../view-filter/view-filter.module");
const _viewpermissionsmodule = require("../view-permissions/view-permissions.module");
const _viewsortmodule = require("../view-sort/view-sort.module");
const _viewwidgetupsertservice = require("./services/view-widget-upsert.service");
const _viewcontroller = require("./controllers/view.controller");
const _viewentity = require("./entities/view.entity");
const _viewresolver = require("./resolvers/view.resolver");
const _viewqueryparamsservice = require("./services/view-query-params.service");
const _viewservice = require("./services/view.service");
const _viewtoolsfactory = require("./tools/view-tools.factory");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ViewModule = class ViewModule {
};
ViewModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _viewentity.ViewEntity
            ]),
            _viewpermissionsmodule.ViewPermissionsModule,
            _viewfieldgroupmodule.ViewFieldGroupModule,
            _viewfieldmodule.ViewFieldModule,
            _viewfiltermodule.ViewFilterModule,
            _viewsortmodule.ViewSortModule,
            _i18nmodule.I18nModule,
            _applicationmodule.ApplicationModule,
            _permissionsmodule.PermissionsModule,
            _userrolemodule.UserRoleModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _flatviewmodule.FlatViewModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        controllers: [
            _viewcontroller.ViewController
        ],
        providers: [
            _viewservice.ViewService,
            _viewresolver.ViewResolver,
            _viewqueryparamsservice.ViewQueryParamsService,
            _viewtoolsfactory.ViewToolsFactory,
            _viewwidgetupsertservice.ViewWidgetUpsertService
        ],
        exports: [
            _viewservice.ViewService,
            _viewqueryparamsservice.ViewQueryParamsService,
            _viewtoolsfactory.ViewToolsFactory,
            _typeorm.TypeOrmModule.forFeature([
                _viewentity.ViewEntity
            ])
        ]
    })
], ViewModule);

//# sourceMappingURL=view.module.js.map