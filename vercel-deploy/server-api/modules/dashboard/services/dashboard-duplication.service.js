"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardDuplicationService", {
    enumerable: true,
    get: function() {
        return DashboardDuplicationService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _actorfromauthcontextservice = require("../../../engine/core-modules/actor/services/actor-from-auth-context.service");
const _pagelayoutduplicationservice = require("../../../engine/metadata-modules/page-layout/services/page-layout-duplication.service");
const _globalworkspaceormmanager = require("../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _dashboardexception = require("../exceptions/dashboard.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DashboardDuplicationService = class DashboardDuplicationService {
    async duplicateDashboard(dashboardId, authContext) {
        const workspace = authContext.workspace;
        const workspaceId = workspace.id;
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const dashboardRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'dashboard', {
                shouldBypassPermissionChecks: true
            });
            const originalDashboard = await dashboardRepository.findOne({
                where: {
                    id: dashboardId
                }
            });
            if (!(0, _utils.isDefined)(originalDashboard)) {
                throw new _dashboardexception.DashboardException((0, _dashboardexception.generateDashboardExceptionMessage)(_dashboardexception.DashboardExceptionMessageKey.DASHBOARD_NOT_FOUND, dashboardId), _dashboardexception.DashboardExceptionCode.DASHBOARD_NOT_FOUND);
            }
            if (!(0, _utils.isDefined)(originalDashboard.pageLayoutId)) {
                throw new _dashboardexception.DashboardException((0, _dashboardexception.generateDashboardExceptionMessage)(_dashboardexception.DashboardExceptionMessageKey.PAGE_LAYOUT_NOT_FOUND, dashboardId), _dashboardexception.DashboardExceptionCode.PAGE_LAYOUT_NOT_FOUND);
            }
            try {
                const newPageLayout = await this.pageLayoutDuplicationService.duplicate({
                    pageLayoutId: originalDashboard.pageLayoutId,
                    workspaceId
                });
                const newDashboard = await this.createDuplicatedDashboard(originalDashboard, newPageLayout.id, dashboardRepository, authContext);
                return {
                    id: newDashboard.id,
                    title: newDashboard.title,
                    pageLayoutId: newDashboard.pageLayoutId,
                    position: newDashboard.position,
                    createdAt: newDashboard.createdAt,
                    updatedAt: newDashboard.updatedAt
                };
            } catch (error) {
                this.logger.error(`Failed to duplicate dashboard ${dashboardId}: ${error.message}`, error.stack);
                throw error;
            }
        }, authContext);
    }
    async createDuplicatedDashboard(originalDashboard, newPageLayoutId, dashboardRepository, authContext) {
        const newTitle = (0, _utils.appendCopySuffix)(originalDashboard.title ?? '');
        const [recordWithActor] = await this.actorFromAuthContextService.injectActorFieldsOnCreate({
            records: [
                {
                    title: newTitle,
                    pageLayoutId: newPageLayoutId,
                    position: originalDashboard.position
                }
            ],
            objectMetadataNameSingular: 'dashboard',
            authContext
        });
        const insertResult = await dashboardRepository.insert(recordWithActor);
        const newDashboardId = insertResult.identifiers[0].id;
        const newDashboard = await dashboardRepository.findOne({
            where: {
                id: newDashboardId
            }
        });
        if (!(0, _utils.isDefined)(newDashboard)) {
            throw new _dashboardexception.DashboardException((0, _dashboardexception.generateDashboardExceptionMessage)(_dashboardexception.DashboardExceptionMessageKey.DASHBOARD_DUPLICATION_FAILED, 'Failed to retrieve created dashboard'), _dashboardexception.DashboardExceptionCode.DASHBOARD_DUPLICATION_FAILED);
        }
        return newDashboard;
    }
    constructor(pageLayoutDuplicationService, globalWorkspaceOrmManager, actorFromAuthContextService){
        this.pageLayoutDuplicationService = pageLayoutDuplicationService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.actorFromAuthContextService = actorFromAuthContextService;
        this.logger = new _common.Logger(DashboardDuplicationService.name);
    }
};
DashboardDuplicationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _pagelayoutduplicationservice.PageLayoutDuplicationService === "undefined" ? Object : _pagelayoutduplicationservice.PageLayoutDuplicationService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _actorfromauthcontextservice.ActorFromAuthContextService === "undefined" ? Object : _actorfromauthcontextservice.ActorFromAuthContextService
    ])
], DashboardDuplicationService);

//# sourceMappingURL=dashboard-duplication.service.js.map