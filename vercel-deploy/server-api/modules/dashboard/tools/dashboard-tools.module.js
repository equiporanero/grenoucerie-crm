"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardToolsModule", {
    enumerable: true,
    get: function() {
        return DashboardToolsModule;
    }
});
const _common = require("@nestjs/common");
const _applicationmodule = require("../../../engine/core-modules/application/application.module");
const _recordpositionmodule = require("../../../engine/core-modules/record-position/record-position.module");
const _dashboardtoolservicetoken = require("../../../engine/core-modules/tool-provider/constants/dashboard-tool-service.token");
const _workspacemanyorallflatentitymapscachemodule = require("../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _pagelayouttabmodule = require("../../../engine/metadata-modules/page-layout-tab/page-layout-tab.module");
const _pagelayoutwidgetmodule = require("../../../engine/metadata-modules/page-layout-widget/page-layout-widget.module");
const _pagelayoutmodule = require("../../../engine/metadata-modules/page-layout/page-layout.module");
const _twentyormmodule = require("../../../engine/twenty-orm/twenty-orm.module");
const _dashboardtoolworkspaceservice = require("./services/dashboard-tool.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DashboardToolsModule = class DashboardToolsModule {
};
DashboardToolsModule = _ts_decorate([
    (0, _common.Global)(),
    (0, _common.Module)({
        imports: [
            _pagelayoutmodule.PageLayoutModule,
            _pagelayouttabmodule.PageLayoutTabModule,
            _pagelayoutwidgetmodule.PageLayoutWidgetModule,
            _recordpositionmodule.RecordPositionModule,
            _twentyormmodule.TwentyORMModule,
            _applicationmodule.ApplicationModule,
            _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule
        ],
        providers: [
            _dashboardtoolworkspaceservice.DashboardToolWorkspaceService,
            {
                provide: _dashboardtoolservicetoken.DASHBOARD_TOOL_SERVICE_TOKEN,
                useExisting: _dashboardtoolworkspaceservice.DashboardToolWorkspaceService
            }
        ],
        exports: [
            _dashboardtoolworkspaceservice.DashboardToolWorkspaceService,
            _dashboardtoolservicetoken.DASHBOARD_TOOL_SERVICE_TOKEN
        ]
    })
], DashboardToolsModule);

//# sourceMappingURL=dashboard-tools.module.js.map