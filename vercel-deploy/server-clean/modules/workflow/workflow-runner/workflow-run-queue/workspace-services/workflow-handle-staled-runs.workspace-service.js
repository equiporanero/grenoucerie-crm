"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowHandleStaledRunsWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowHandleStaledRunsWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowrunworkspaceentity = require("../../../common/standard-objects/workflow-run.workspace-entity");
const _getstaledrunsfindoptionsutil = require("../utils/get-staled-runs-find-options.util");
const _workflowthrottlingworkspaceservice = require("./workflow-throttling.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowHandleStaledRunsWorkspaceService = class WorkflowHandleStaledRunsWorkspaceService {
    async handleStaledRunsForWorkspace(workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowRunRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, _workflowrunworkspaceentity.WorkflowRunWorkspaceEntity, {
                shouldBypassPermissionChecks: true
            });
            const staledWorkflowRuns = await workflowRunRepository.find({
                where: (0, _getstaledrunsfindoptionsutil.getStaledRunsFindOptions)()
            });
            if (staledWorkflowRuns.length <= 0) {
                return;
            }
            await workflowRunRepository.update(staledWorkflowRuns.map((workflowRun)=>workflowRun.id), {
                enqueuedAt: null,
                status: _workflowrunworkspaceentity.WorkflowRunStatus.NOT_STARTED
            });
            await this.workflowThrottlingWorkspaceService.recomputeWorkflowRunNotStartedCount(workspaceId);
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, workflowThrottlingWorkspaceService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.workflowThrottlingWorkspaceService = workflowThrottlingWorkspaceService;
        this.logger = new _common.Logger(WorkflowHandleStaledRunsWorkspaceService.name);
    }
};
WorkflowHandleStaledRunsWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _workflowthrottlingworkspaceservice.WorkflowThrottlingWorkspaceService === "undefined" ? Object : _workflowthrottlingworkspaceservice.WorkflowThrottlingWorkspaceService
    ])
], WorkflowHandleStaledRunsWorkspaceService);

//# sourceMappingURL=workflow-handle-staled-runs.workspace-service.js.map