"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionStepUpdateWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowVersionStepUpdateWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workflowversionstepexception = require("../../common/exceptions/workflow-version-step.exception");
const _workflowschemaworkspaceservice = require("../workflow-schema/workflow-schema.workspace-service");
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
let WorkflowVersionStepUpdateWorkspaceService = class WorkflowVersionStepUpdateWorkspaceService {
    async updateWorkflowVersionStep({ workspaceId, workflowVersionId, step }) {
        const workflowVersion = await this.workflowVersionStepHelpersWorkspaceService.getValidatedDraftWorkflowVersion({
            workflowVersionId,
            workspaceId
        });
        if (!(0, _utils.isDefined)(workflowVersion.steps)) {
            throw new _workflowversionstepexception.WorkflowVersionStepException("Can't update step from undefined steps", _workflowversionstepexception.WorkflowVersionStepExceptionCode.INVALID_REQUEST);
        }
        const existingStep = workflowVersion.steps.find((existingStep)=>existingStep.id === step.id);
        if (!(0, _utils.isDefined)(existingStep)) {
            throw new _workflowversionstepexception.WorkflowVersionStepException('Step not found', _workflowversionstepexception.WorkflowVersionStepExceptionCode.NOT_FOUND);
        }
        const isStepTypeChanged = existingStep.type !== step.type;
        const { updatedStep, additionalCreatedSteps } = isStepTypeChanged ? await this.updateWorkflowVersionStepType({
            existingStep,
            newStep: step,
            workspaceId,
            workflowVersionId
        }) : {
            updatedStep: await this.updateWorkflowVersionStepSettings({
                newStep: step,
                workspaceId,
                workflowVersionId
            }),
            additionalCreatedSteps: undefined
        };
        const updatedSteps = workflowVersion.steps.map((existingStep)=>{
            if (existingStep.id === step.id) {
                return updatedStep;
            } else {
                return existingStep;
            }
        });
        if ((0, _utils.isDefined)(additionalCreatedSteps)) {
            updatedSteps.push(...additionalCreatedSteps);
        }
        await this.workflowVersionStepHelpersWorkspaceService.updateWorkflowVersionStepsAndTrigger({
            workspaceId,
            workflowVersionId: workflowVersion.id,
            steps: updatedSteps
        });
        return updatedStep;
    }
    async updateWorkflowVersionStepType({ existingStep, newStep, workspaceId, workflowVersionId }) {
        await this.workflowVersionStepOperationsWorkspaceService.runWorkflowVersionStepDeletionSideEffects({
            step: existingStep,
            workspaceId
        });
        const { builtStep, additionalCreatedSteps } = await this.workflowVersionStepOperationsWorkspaceService.runStepCreationSideEffectsAndBuildStep({
            type: newStep.type,
            workspaceId,
            position: newStep.position,
            workflowVersionId,
            defaultSettings: newStep.settings
        });
        const updatedStep = await this.workflowSchemaWorkspaceService.enrichOutputSchema({
            step: {
                ...builtStep,
                id: existingStep.id,
                nextStepIds: existingStep.nextStepIds,
                position: existingStep.position
            },
            workspaceId,
            workflowVersionId
        });
        return {
            updatedStep,
            additionalCreatedSteps
        };
    }
    async updateWorkflowVersionStepSettings({ newStep, workspaceId, workflowVersionId }) {
        return this.workflowSchemaWorkspaceService.enrichOutputSchema({
            step: newStep,
            workspaceId,
            workflowVersionId
        });
    }
    constructor(workflowSchemaWorkspaceService, workflowVersionStepOperationsWorkspaceService, workflowVersionStepHelpersWorkspaceService){
        this.workflowSchemaWorkspaceService = workflowSchemaWorkspaceService;
        this.workflowVersionStepOperationsWorkspaceService = workflowVersionStepOperationsWorkspaceService;
        this.workflowVersionStepHelpersWorkspaceService = workflowVersionStepHelpersWorkspaceService;
    }
};
WorkflowVersionStepUpdateWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowschemaworkspaceservice.WorkflowSchemaWorkspaceService === "undefined" ? Object : _workflowschemaworkspaceservice.WorkflowSchemaWorkspaceService,
        typeof _workflowversionstepoperationsworkspaceservice.WorkflowVersionStepOperationsWorkspaceService === "undefined" ? Object : _workflowversionstepoperationsworkspaceservice.WorkflowVersionStepOperationsWorkspaceService,
        typeof _workflowversionstephelpersworkspaceservice.WorkflowVersionStepHelpersWorkspaceService === "undefined" ? Object : _workflowversionstephelpersworkspaceservice.WorkflowVersionStepHelpersWorkspaceService
    ])
], WorkflowVersionStepUpdateWorkspaceService);

//# sourceMappingURL=workflow-version-step-update.workspace-service.js.map