"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardToPageLayoutSyncService", {
    enumerable: true,
    get: function() {
        return DashboardToPageLayoutSyncService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _typeorm = require("typeorm");
const _pagelayouttabservice = require("../../../engine/metadata-modules/page-layout-tab/services/page-layout-tab.service");
const _pagelayouttypeenum = require("../../../engine/metadata-modules/page-layout/enums/page-layout-type.enum");
const _pagelayoutservice = require("../../../engine/metadata-modules/page-layout/services/page-layout.service");
const _globalworkspaceormmanager = require("../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../engine/twenty-orm/utils/build-system-auth-context.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DashboardToPageLayoutSyncService = class DashboardToPageLayoutSyncService {
    async createPageLayoutForDashboard({ workspaceId }) {
        const pageLayout = await this.pageLayoutService.create({
            createPageLayoutInput: {
                type: _pagelayouttypeenum.PageLayoutType.DASHBOARD,
                objectMetadataId: null,
                name: 'Dashboard Layout'
            },
            workspaceId
        });
        await this.pageLayoutTabService.create({
            createPageLayoutTabInput: {
                title: 'Tab 1',
                pageLayoutId: pageLayout.id
            },
            workspaceId
        });
        return pageLayout.id;
    }
    async destroyPageLayoutsForDashboards({ dashboardIds, workspaceId }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const dashboardRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'dashboard', {
                shouldBypassPermissionChecks: true
            });
            const dashboards = await dashboardRepository.find({
                where: {
                    id: (0, _typeorm.In)(dashboardIds)
                },
                withDeleted: true
            });
            const pageLayoutIds = dashboards.map((dashboard)=>dashboard.pageLayoutId).filter(_utils.isDefined);
            await this.pageLayoutService.destroyMany({
                ids: pageLayoutIds,
                workspaceId
            });
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, pageLayoutService, pageLayoutTabService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.pageLayoutService = pageLayoutService;
        this.pageLayoutTabService = pageLayoutTabService;
    }
};
DashboardToPageLayoutSyncService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _pagelayoutservice.PageLayoutService === "undefined" ? Object : _pagelayoutservice.PageLayoutService,
        typeof _pagelayouttabservice.PageLayoutTabService === "undefined" ? Object : _pagelayouttabservice.PageLayoutTabService
    ])
], DashboardToPageLayoutSyncService);

//# sourceMappingURL=dashboard-to-page-layout-sync.service.js.map