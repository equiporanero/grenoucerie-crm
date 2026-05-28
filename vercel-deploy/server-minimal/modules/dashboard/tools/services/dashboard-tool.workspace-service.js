"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardToolWorkspaceService", {
    enumerable: true,
    get: function() {
        return DashboardToolWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _applicationservice = require("../../../../engine/core-modules/application/application.service");
const _recordpositionservice = require("../../../../engine/core-modules/record-position/services/record-position.service");
const _workspacemanyorallflatentitymapscacheservice = require("../../../../engine/metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.service");
const _pagelayouttabservice = require("../../../../engine/metadata-modules/page-layout-tab/services/page-layout-tab.service");
const _pagelayoutwidgetservice = require("../../../../engine/metadata-modules/page-layout-widget/services/page-layout-widget.service");
const _pagelayoutservice = require("../../../../engine/metadata-modules/page-layout/services/page-layout.service");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _adddashboardtabtool = require("../add-dashboard-tab.tool");
const _adddashboardwidgettool = require("../add-dashboard-widget.tool");
const _createcompletedashboardtool = require("../create-complete-dashboard.tool");
const _deletedashboardwidgettool = require("../delete-dashboard-widget.tool");
const _getdashboardtool = require("../get-dashboard.tool");
const _listdashboardstool = require("../list-dashboards.tool");
const _updatedashboardwidgettool = require("../update-dashboard-widget.tool");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DashboardToolWorkspaceService = class DashboardToolWorkspaceService {
    generateDashboardTools(workspaceId, _rolePermissionConfig) {
        const context = {
            workspaceId
        };
        const createCompleteDashboard = (0, _createcompletedashboardtool.createCreateCompleteDashboardTool)(this.deps, context);
        const listDashboards = (0, _listdashboardstool.createListDashboardsTool)(this.deps, context);
        const getDashboard = (0, _getdashboardtool.createGetDashboardTool)(this.deps, context);
        const addDashboardTab = (0, _adddashboardtabtool.createAddDashboardTabTool)(this.deps, context);
        const addDashboardWidget = (0, _adddashboardwidgettool.createAddDashboardWidgetTool)(this.deps, context);
        const updateDashboardWidget = (0, _updatedashboardwidgettool.createUpdateDashboardWidgetTool)(this.deps, context);
        const deleteDashboardWidget = (0, _deletedashboardwidgettool.createDeleteDashboardWidgetTool)(this.deps, context);
        return {
            [createCompleteDashboard.name]: createCompleteDashboard,
            [listDashboards.name]: listDashboards,
            [getDashboard.name]: getDashboard,
            [addDashboardTab.name]: addDashboardTab,
            [addDashboardWidget.name]: addDashboardWidget,
            [updateDashboardWidget.name]: updateDashboardWidget,
            [deleteDashboardWidget.name]: deleteDashboardWidget
        };
    }
    constructor(pageLayoutService, pageLayoutTabService, pageLayoutWidgetService, globalWorkspaceOrmManager, recordPositionService, applicationService, flatEntityMapsCacheService){
        this.deps = {
            pageLayoutService,
            pageLayoutTabService,
            pageLayoutWidgetService,
            globalWorkspaceOrmManager,
            recordPositionService,
            applicationService,
            flatEntityMapsCacheService
        };
    }
};
DashboardToolWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _pagelayoutservice.PageLayoutService === "undefined" ? Object : _pagelayoutservice.PageLayoutService,
        typeof _pagelayouttabservice.PageLayoutTabService === "undefined" ? Object : _pagelayouttabservice.PageLayoutTabService,
        typeof _pagelayoutwidgetservice.PageLayoutWidgetService === "undefined" ? Object : _pagelayoutwidgetservice.PageLayoutWidgetService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _recordpositionservice.RecordPositionService === "undefined" ? Object : _recordpositionservice.RecordPositionService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService === "undefined" ? Object : _workspacemanyorallflatentitymapscacheservice.WorkspaceManyOrAllFlatEntityMapsCacheService
    ])
], DashboardToolWorkspaceService);

//# sourceMappingURL=dashboard-tool.workspace-service.js.map