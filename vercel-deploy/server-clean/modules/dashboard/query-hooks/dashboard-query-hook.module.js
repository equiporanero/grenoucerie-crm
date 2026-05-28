"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardQueryHookModule", {
    enumerable: true,
    get: function() {
        return DashboardQueryHookModule;
    }
});
const _common = require("@nestjs/common");
const _pagelayouttabmodule = require("../../../engine/metadata-modules/page-layout-tab/page-layout-tab.module");
const _pagelayoutmodule = require("../../../engine/metadata-modules/page-layout/page-layout.module");
const _twentyormmodule = require("../../../engine/twenty-orm/twenty-orm.module");
const _dashboardcreatemanyprequeryhook = require("./dashboard-create-many.pre-query.hook");
const _dashboardcreateoneprequeryhook = require("./dashboard-create-one.pre-query.hook");
const _dashboarddestroymanyprequeryhook = require("./dashboard-destroy-many.pre-query.hook");
const _dashboarddestroyoneprequeryhook = require("./dashboard-destroy-one.pre-query.hook");
const _dashboardtopagelayoutsyncservice = require("../services/dashboard-to-page-layout-sync.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let DashboardQueryHookModule = class DashboardQueryHookModule {
};
DashboardQueryHookModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _pagelayoutmodule.PageLayoutModule,
            _pagelayouttabmodule.PageLayoutTabModule,
            _twentyormmodule.TwentyORMModule
        ],
        providers: [
            _dashboardtopagelayoutsyncservice.DashboardToPageLayoutSyncService,
            _dashboardcreateoneprequeryhook.DashboardCreateOnePreQueryHook,
            _dashboardcreatemanyprequeryhook.DashboardCreateManyPreQueryHook,
            _dashboarddestroyoneprequeryhook.DashboardDestroyOnePreQueryHook,
            _dashboarddestroymanyprequeryhook.DashboardDestroyManyPreQueryHook
        ]
    })
], DashboardQueryHookModule);

//# sourceMappingURL=dashboard-query-hook.module.js.map