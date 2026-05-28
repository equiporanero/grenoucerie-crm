"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutModule", {
    enumerable: true,
    get: function() {
        return PageLayoutModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationmodule = require("../../core-modules/application/application.module");
const _featureflagmodule = require("../../core-modules/feature-flag/feature-flag.module");
const _i18nmodule = require("../../core-modules/i18n/i18n.module");
const _workspaceentity = require("../../core-modules/workspace/workspace.entity");
const _workspacemanyorallflatentitymapscachemodule = require("../flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _flatpagelayouttabmodule = require("../flat-page-layout-tab/flat-page-layout-tab.module");
const _flatpagelayoutwidgetmodule = require("../flat-page-layout-widget/flat-page-layout-widget.module");
const _flatpagelayoutmodule = require("../flat-page-layout/flat-page-layout.module");
const _pagelayoutcontroller = require("./controllers/page-layout.controller");
const _pagelayoutentity = require("./entities/page-layout.entity");
const _pagelayoutresolver = require("./resolvers/page-layout.resolver");
const _pagelayoutduplicationservice = require("./services/page-layout-duplication.service");
const _pagelayoutresetservice = require("./services/page-layout-reset.service");
const _pagelayoutupdateservice = require("./services/page-layout-update.service");
const _pagelayoutservice = require("./services/page-layout.service");
const _permissionsmodule = require("../permissions/permissions.module");
const _viewmodule = require("../view/view.module");
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
let PageLayoutModule = class PageLayoutModule {
};
PageLayoutModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _pagelayoutentity.PageLayoutEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _twentyormmodule.TwentyORMModule,
            _permissionsmodule.PermissionsModule,
            _featureflagmodule.FeatureFlagModule,
            _i18nmodule.I18nModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspacemigrationmodule.WorkspaceMigrationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
            _flatpagelayoutmodule.FlatPageLayoutModule,
            _flatpagelayouttabmodule.FlatPageLayoutTabModule,
            _flatpagelayoutwidgetmodule.FlatPageLayoutWidgetModule,
            _applicationmodule.ApplicationModule,
            _dashboardsyncmodule.DashboardSyncModule,
            _viewmodule.ViewModule
        ],
        controllers: [
            _pagelayoutcontroller.PageLayoutController
        ],
        providers: [
            _pagelayoutservice.PageLayoutService,
            _pagelayoutduplicationservice.PageLayoutDuplicationService,
            _pagelayoutresolver.PageLayoutResolver,
            _pagelayoutresetservice.PageLayoutResetService,
            _pagelayoutupdateservice.PageLayoutUpdateService,
            _workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor
        ],
        exports: [
            _pagelayoutservice.PageLayoutService,
            _pagelayoutduplicationservice.PageLayoutDuplicationService
        ]
    })
], PageLayoutModule);

//# sourceMappingURL=page-layout.module.js.map