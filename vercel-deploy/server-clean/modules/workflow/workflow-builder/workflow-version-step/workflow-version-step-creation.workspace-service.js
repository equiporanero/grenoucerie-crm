"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionStepCreationWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowVersionStepCreationWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workflowversionstepexception = require("../../common/exceptions/workflow-version-step.exception");
const _computeworkflowversionstepupdatesutil = require("../utils/compute-workflow-version-step-updates.util");
const _workflowschemaworkspaceservice = require("../workflow-schema/workflow-schema.workspace-service");
const _insertstep = require("./utils/insert-step");
const _workflowversionstephelpersworkspaceservice = require("./workflow-version-step-helpers.workspace-service");
const _workflowversionstepoperationsworkspaceservice = require("./workflow-version-step-operations.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowVersionStepCreationWorkspaceService = class WorkflowVersionStepCreationWorkspaceService {
    async createWorkflowVersionStep({ workspaceId, input }) {
        const { workflowVersionId, stepType, parentStepId, nextStepId, position, parentStepConnectionOptions, id, defaultSettings } = input;
        const workflowVersion = await this.workflowVersionStepHelpersWorkspaceService.getValidatedDraftWorkflowVersion({
            workflowVersionId,
            workspaceId
        });
        const existingSteps = workflowVersion.steps;
        const existingTrigger = workflowVersion.trigger;
        const { builtStep, additionalCreatedSteps } = await this.workflowVersionStepOperationsWorkspaceService.runStepCreationSideEffectsAndBuildStep({
            type: stepType,
            workspaceId,
            position,
            workflowVersionId,
            id,
            defaultSettings
        });
        const enrichedNewStep = await this.workflowSchemaWorkspaceService.enrichOutputSchema({
            step: builtStep,
            workspaceId,
            workflowVersionId
        });
        const { updatedSteps, updatedTrigger } = (0, _insertstep.insertStep)({
            existingSteps: existingSteps ?? [],
            existingTrigger,
            insertedStep: enrichedNewStep,
            parentStepId,
            nextStepId,
            parentStepConnectionOptions
        });
        if ((0, _utils.isDefined)(additionalCreatedSteps)) {
            updatedSteps.push(...additionalCreatedSteps);
        }
        await this.workflowVersionStepHelpersWorkspaceService.updateWorkflowVersionStepsAndTrigger({
            workspaceId,
            workflowVersionId: workflowVersion.id,
            trigger: updatedTrigger,
            steps: updatedSteps
        });
        return (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
            existingTrigger,
            existingSteps,
            updatedTrigger,
            updatedSteps
        });
    }
    async duplicateWorkflowVersionStep({ workspaceId, workflowVersionId, stepId }) {
        const workflowVersion = await this.workflowVersionStepHelpersWorkspaceService.getValidatedDraftWorkflowVersion({
            workflowVersionId,
            workspaceId
        });
        const stepToDuplicate = workflowVersion.steps?.find((step)=>step.id === stepId);
        if (!(0, _utils.isDefined)(stepToDuplicate)) {
            throw new _workflowversionstepexception.WorkflowVersionStepException('Step not found', _workflowversionstepexception.WorkflowVersionStepExceptionCode.NOT_FOUND);
        }
        const clonedStep = await this.workflowVersionStepOperationsWorkspaceService.cloneStep({
            step: stepToDuplicate,
            workspaceId
        });
        const duplicatedStep = this.workflowVersionStepOperationsWorkspaceService.markStepAsDuplicate({
            step: clonedStep
        });
        const { updatedSteps, updatedTrigger } = (0, _insertstep.insertStep)({
            existingSteps: workflowVersion.steps ?? [],
            existingTrigger: workflowVersion.trigger,
            insertedStep: duplicatedStep
        });
        await this.workflowVersionStepHelpersWorkspaceService.updateWorkflowVersionStepsAndTrigger({
            workspaceId,
            workflowVersionId: workflowVersion.id,
            steps: updatedSteps,
            trigger: updatedTrigger
        });
        return (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
            existingTrigger: workflowVersion.trigger,
            existingSteps: workflowVersion.steps,
            updatedTrigger,
            updatedSteps
        });
    }
    async createDraftStep({ step, workspaceId }) {
        return this.workflowVersionStepOperationsWorkspaceService.createDraftStep({
            step,
            workspaceId
        });
    }
    constructor(workflowSchemaWorkspaceService, workflowVersionStepOperationsWorkspaceService, workflowVersionStepHelpersWorkspaceService){
        this.workflowSchemaWorkspaceService = workflowSchemaWorkspaceService;
        this.workflowVersionStepOperationsWorkspaceService = workflowVersionStepOperationsWorkspaceService;
        this.workflowVersionStepHelpersWorkspaceService = workflowVersionStepHelpersWorkspaceService;
    }
};
WorkflowVersionStepCreationWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowschemaworkspaceservice.WorkflowSchemaWorkspaceService === "undefined" ? Object : _workflowschemaworkspaceservice.WorkflowSchemaWorkspaceService,
        typeof _workflowversionstepoperationsworkspaceservice.WorkflowVersionStepOperationsWorkspaceService === "undefined" ? Object : _workflowversionstepoperationsworkspaceservice.WorkflowVersionStepOperationsWorkspaceService,
        typeof _workflowversionstephelpersworkspaceservice.WorkflowVersionStepHelpersWorkspaceService === "undefined" ? Object : _workflowversionstephelpersworkspaceservice.WorkflowVersionStepHelpersWorkspaceService
    ])
], WorkflowVersionStepCreationWorkspaceService);

//# sourceMappingURL=workflow-version-step-creation.workspace-service.js.map