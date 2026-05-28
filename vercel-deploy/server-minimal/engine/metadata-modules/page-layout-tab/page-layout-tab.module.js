"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutTabModule", {
    enumerable: true,
    get: function() {
        return PageLayoutTabModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _featureflagmodule = require("../../core-modules/feature-flag/feature-flag.module");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _flatpagelayouttabmodule = require("../flat-page-layout-tab/flat-page-layout-tab.module");
const _flatpagelayoutwidgetmodule = require("../flat-page-layout-widget/flat-page-layout-widget.module");
const _pagelayouttabcontroller = require("./controllers/page-layout-tab.controller");
const _pagelayouttabentity = require("./entities/page-layout-tab.entity");
const _pagelayouttabresolver = require("./resolvers/page-layout-tab.resolver");
const _pagelayouttabservice = require("./services/page-layout-tab.service");
const _permissionsmodule = require("../permissions/permissions.module");
const _twentyormmodule = require("../../twenty-orm/twenty-orm.module");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
const _dashboardsyncmodule = require("../../../modules/dashboard-sync/dashboard-sync.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PageLayoutTabModule = class PageLayoutTabModule {
};
PageLayoutTabModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _pagelayouttabentity.PageLayoutTabEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _twentyormmodule.TwentyORMModule,
            _permissionsmodule.PermissionsModule,
            _featureflagmodule.FeatureFlagModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _flatpagelayouttabmodule.FlatPageLayoutTabModule,
            _flatpagelayoutwidgetmodule.FlatPageLayoutWidgetModule,
            _applicationmodule.ApplicationModule,
            _dashboardsyncmodule.DashboardSyncModule
        ],
        controllers: [
            _pagelayouttabcontroller.PageLayoutTabController
        ],
        providers: [
            _pagelayouttabservice.PageLayoutTabService,
            _pagelayouttabresolver.PageLayoutTabResolver,
            _workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor
        ],
        exports: [
            _pagelayouttabservice.PageLayoutTabService
        ]
    })
], PageLayoutTabModule);

//# sourceMappingURL=page-layout-tab.module.js.map