"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionStepHelpersWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowVersionStepHelpersWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _assertworkflowversionisdraftutil = require("../../common/utils/assert-workflow-version-is-draft.util");
const _workflowcommonworkspaceservice = require("../../common/workspace-services/workflow-common.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowVersionStepHelpersWorkspaceService = class WorkflowVersionStepHelpersWorkspaceService {
    async getValidatedDraftWorkflowVersion({ workflowVersionId, workspaceId }) {
        const workflowVersion = await this.workflowCommonWorkspaceService.getWorkflowVersionOrFail({
            workflowVersionId,
            workspaceId
        });
        (0, _assertworkflowversionisdraftutil.assertWorkflowVersionIsDraft)(workflowVersion);
        return workflowVersion;
    }
    async updateWorkflowVersionStepsAndTrigger({ workspaceId, workflowVersionId, steps, trigger }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            const updateData = {};
            if (steps !== undefined) {
                updateData.steps = steps;
            }
            if (trigger !== undefined) {
                updateData.trigger = trigger;
            }
            await workflowVersionRepository.update(workflowVersionId, updateData);
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, workflowCommonWorkspaceService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
    }
};
WorkflowVersionStepHelpersWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService
    ])
], WorkflowVersionStepHelpersWorkspaceService);

//# sourceMappingURL=workflow-version-step-helpers.workspace-service.js.map