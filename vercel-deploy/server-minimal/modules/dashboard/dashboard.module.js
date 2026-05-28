"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardModule", {
    enumerable: true,
    get: function() {
        return DashboardModule;
    }
});
const _common = require("@nestjs/common");
const _actormodule = require("../../engine/core-modules/actor/actor.module");
const _authmodule = require("../../engine/core-modules/auth/auth.module");
const _pagelayoutmodule = require("../../engine/metadata-modules/page-layout/page-layout.module");
const _twentyormmodule = require("../../engine/twenty-orm/twenty-orm.module");
const _workspacecachestoragemodule = require("../../engine/workspace-cache-storage/workspace-cache-storage.module");
const _chartdatamodule = require("./chart-data/chart-data.module");
const _dashboardcontroller = require("./controllers/dashboard.controller");
const _dashboardresolver = require("./resolvers/dashboard.resolver");
const _dashboardduplicationservice = require("./services/dashboard-duplication.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DashboardModule = class DashboardModule {
};
DashboardModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _actormodule.ActorModule,
            _authmodule.AuthModule,
            _chartdatamodule.ChartDataModule,
            _pagelayoutmodule.PageLayoutModule,
            _twentyormmodule.TwentyORMModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule
        ],
        controllers: [
            _dashboardcontroller.DashboardController
        ],
        providers: [
            _dashboardduplicationservice.DashboardDuplicationService,
            _dashboardresolver.DashboardResolver
        ],
        exports: [
            _dashboardduplicationservice.DashboardDuplicationService
        ]
    })
], DashboardModule);

//# sourceMappingURL=dashboard.module.js.map