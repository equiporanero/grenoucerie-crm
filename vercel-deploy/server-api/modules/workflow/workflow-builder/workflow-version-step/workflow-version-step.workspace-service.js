"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionStepWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowVersionStepWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _workflowversionstepcreationworkspaceservice = require("./workflow-version-step-creation.workspace-service");
const _workflowversionstepdeletionworkspaceservice = require("./workflow-version-step-deletion.workspace-service");
const _workflowversionstepupdateworkspaceservice = require("./workflow-version-step-update.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowVersionStepWorkspaceService = class WorkflowVersionStepWorkspaceService {
    async createWorkflowVersionStep({ workspaceId, input }) {
        return this.workflowVersionStepCreationWorkspaceService.createWorkflowVersionStep({
            workspaceId,
            input
        });
    }
    async updateWorkflowVersionStep({ workspaceId, workflowVersionId, step }) {
        return this.workflowVersionStepUpdateWorkspaceService.updateWorkflowVersionStep({
            workspaceId,
            workflowVersionId,
            step
        });
    }
    async deleteWorkflowVersionStep({ workspaceId, workflowVersionId, stepIdToDelete }) {
        return this.workflowVersionStepDeletionWorkspaceService.deleteWorkflowVersionStep({
            workspaceId,
            workflowVersionId,
            stepIdToDelete
        });
    }
    async duplicateWorkflowVersionStep({ workspaceId, workflowVersionId, stepId }) {
        return this.workflowVersionStepCreationWorkspaceService.duplicateWorkflowVersionStep({
            workspaceId,
            workflowVersionId,
            stepId
        });
    }
    async createDraftStep({ step, workspaceId }) {
        return this.workflowVersionStepCreationWorkspaceService.createDraftStep({
            step,
            workspaceId
        });
    }
    constructor(workflowVersionStepCreationWorkspaceService, workflowVersionStepUpdateWorkspaceService, workflowVersionStepDeletionWorkspaceService){
        this.workflowVersionStepCreationWorkspaceService = workflowVersionStepCreationWorkspaceService;
        this.workflowVersionStepUpdateWorkspaceService = workflowVersionStepUpdateWorkspaceService;
        this.workflowVersionStepDeletionWorkspaceService = workflowVersionStepDeletionWorkspaceService;
    }
};
WorkflowVersionStepWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowversionstepcreationworkspaceservice.WorkflowVersionStepCreationWorkspaceService === "undefined" ? Object : _workflowversionstepcreationworkspaceservice.WorkflowVersionStepCreationWorkspaceService,
        typeof _workflowversionstepupdateworkspaceservice.WorkflowVersionStepUpdateWorkspaceService === "undefined" ? Object : _workflowversionstepupdateworkspaceservice.WorkflowVersionStepUpdateWorkspaceService,
        typeof _workflowversionstepdeletionworkspaceservice.WorkflowVersionStepDeletionWorkspaceService === "undefined" ? Object : _workflowversionstepdeletionworkspaceservice.WorkflowVersionStepDeletionWorkspaceService
    ])
], WorkflowVersionStepWorkspaceService);

//# sourceMappingURL=workflow-version-step.workspace-service.js.map