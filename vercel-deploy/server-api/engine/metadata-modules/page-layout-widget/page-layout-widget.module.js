"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutWidgetModule", {
    enumerable: true,
    get: function() {
        return PageLayoutWidgetModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _featureflagmodule = require("../../core-modules/feature-flag/feature-flag.module");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _flatpagelayoutwidgetmodule = require("../flat-page-layout-widget/flat-page-layout-widget.module");
const _pagelayoutwidgetcontroller = require("./controllers/page-layout-widget.controller");
const _pagelayoutwidgetentity = require("./entities/page-layout-widget.entity");
const _pagelayoutwidgetresolver = require("./resolvers/page-layout-widget.resolver");
const _pagelayoutwidgetservice = require("./services/page-layout-widget.service");
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
let PageLayoutWidgetModule = class PageLayoutWidgetModule {
};
PageLayoutWidgetModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _pagelayoutwidgetentity.PageLayoutWidgetEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _twentyormmodule.TwentyORMModule,
            _permissionsmodule.PermissionsModule,
            _featureflagmodule.FeatureFlagModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _flatpagelayoutwidgetmodule.FlatPageLayoutWidgetModule,
            _applicationmodule.ApplicationModule,
            _dashboardsyncmodule.DashboardSyncModule
        ],
        controllers: [
            _pagelayoutwidgetcontroller.PageLayoutWidgetController
        ],
        providers: [
            _pagelayoutwidgetservice.PageLayoutWidgetService,
            _pagelayoutwidgetresolver.PageLayoutWidgetResolver,
            _workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor
        ],
        exports: [
            _pagelayoutwidgetservice.PageLayoutWidgetService
        ]
    })
], PageLayoutWidgetModule);

//# sourceMappingURL=page-layout-widget.module.js.map