"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionStepDeletionWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowVersionStepDeletionWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _workflowversionstepexception = require("../../common/exceptions/workflow-version-step.exception");
const _computeworkflowversionstepupdatesutil = require("../utils/compute-workflow-version-step-updates.util");
const _removestep = require("./utils/remove-step");
const _workflowversionstepoperationsworkspaceservice = require("./workflow-version-step-operations.workspace-service");
const _workflowversionstephelpersworkspaceservice = require("./workflow-version-step-helpers.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowVersionStepDeletionWorkspaceService = class WorkflowVersionStepDeletionWorkspaceService {
    async deleteWorkflowVersionStep({ workspaceId, workflowVersionId, stepIdToDelete }) {
        const workflowVersion = await this.workflowVersionStepHelpersWorkspaceService.getValidatedDraftWorkflowVersion({
            workflowVersionId,
            workspaceId
        });
        const existingTrigger = workflowVersion.trigger;
        const isDeletingTrigger = stepIdToDelete === _workflow.TRIGGER_STEP_ID && (0, _utils.isDefined)(existingTrigger);
        if (!isDeletingTrigger && !(0, _utils.isDefined)(workflowVersion.steps)) {
            throw new _workflowversionstepexception.WorkflowVersionStepException("Can't delete step from undefined steps", _workflowversionstepexception.WorkflowVersionStepExceptionCode.INVALID_REQUEST);
        }
        const stepToDelete = workflowVersion.steps?.find((step)=>step.id === stepIdToDelete);
        if (!isDeletingTrigger && !(0, _utils.isDefined)(stepToDelete)) {
            throw new _workflowversionstepexception.WorkflowVersionStepException("Can't delete not existing step", _workflowversionstepexception.WorkflowVersionStepExceptionCode.NOT_FOUND);
        }
        const stepToDeleteChildrenIds = isDeletingTrigger ? existingTrigger?.nextStepIds ?? [] : stepToDelete?.nextStepIds ?? [];
        const { updatedSteps, updatedTrigger, removedStepIds } = (0, _removestep.removeStep)({
            existingTrigger,
            existingSteps: workflowVersion.steps,
            stepIdToDelete,
            stepToDeleteChildrenIds
        });
        await this.workflowVersionStepHelpersWorkspaceService.updateWorkflowVersionStepsAndTrigger({
            workspaceId,
            workflowVersionId: workflowVersion.id,
            steps: updatedSteps,
            trigger: updatedTrigger
        });
        const removedSteps = workflowVersion.steps?.filter((step)=>removedStepIds.includes(step.id)) ?? [];
        await Promise.all(removedSteps.map((step)=>this.workflowVersionStepOperationsWorkspaceService.runWorkflowVersionStepDeletionSideEffects({
                step,
                workspaceId
            })));
        return (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
            existingTrigger,
            existingSteps: workflowVersion.steps,
            updatedTrigger,
            updatedSteps
        });
    }
    constructor(workflowVersionStepOperationsWorkspaceService, workflowVersionStepHelpersWorkspaceService){
        this.workflowVersionStepOperationsWorkspaceService = workflowVersionStepOperationsWorkspaceService;
        this.workflowVersionStepHelpersWorkspaceService = workflowVersionStepHelpersWorkspaceService;
    }
};
WorkflowVersionStepDeletionWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowversionstepoperationsworkspaceservice.WorkflowVersionStepOperationsWorkspaceService === "undefined" ? Object : _workflowversionstepoperationsworkspaceservice.WorkflowVersionStepOperationsWorkspaceService,
        typeof _workflowversionstephelpersworkspaceservice.WorkflowVersionStepHelpersWorkspaceService === "undefined" ? Object : _workflowversionstephelpersworkspaceservice.WorkflowVersionStepHelpersWorkspaceService
    ])
], WorkflowVersionStepDeletionWorkspaceService);

//# sourceMappingURL=workflow-version-step-deletion.workspace-service.js.map