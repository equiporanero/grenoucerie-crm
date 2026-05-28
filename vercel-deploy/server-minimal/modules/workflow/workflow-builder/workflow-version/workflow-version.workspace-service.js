"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowVersionWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _withlockdecorator = require("../../../../engine/core-modules/cache-lock/with-lock.decorator");
const _recordpositionservice = require("../../../../engine/core-modules/record-position/services/record-position.service");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowversionstepexception = require("../../common/exceptions/workflow-version-step.exception");
const _workflowversionworkspaceentity = require("../../common/standard-objects/workflow-version.workspace-entity");
const _workflowworkspaceentity = require("../../common/standard-objects/workflow.workspace-entity");
const _assertworkflowversionhassteps = require("../../common/utils/assert-workflow-version-has-steps");
const _assertworkflowversionisdraftutil = require("../../common/utils/assert-workflow-version-is-draft.util");
const _assertworkflowversiontriggerisdefinedutil = require("../../common/utils/assert-workflow-version-trigger-is-defined.util");
const _workflowversionstepoperationsworkspaceservice = require("../workflow-version-step/workflow-version-step-operations.workspace-service");
const _workflowversionstepworkspaceservice = require("../workflow-version-step/workflow-version-step.workspace-service");
const _workflowactiontype = require("../../workflow-executor/workflow-actions/types/workflow-action.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowVersionWorkspaceService = class WorkflowVersionWorkspaceService {
    async createDraftFromWorkflowVersion({ workspaceId, workflowId, workflowVersionIdToCopy }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            const workflowVersionToCopy = await workflowVersionRepository.findOne({
                where: {
                    id: workflowVersionIdToCopy,
                    workflowId
                }
            });
            if (!(0, _utils.isDefined)(workflowVersionToCopy)) {
                throw new _workflowversionstepexception.WorkflowVersionStepException('WorkflowVersion to copy not found', _workflowversionstepexception.WorkflowVersionStepExceptionCode.NOT_FOUND);
            }
            (0, _assertworkflowversiontriggerisdefinedutil.assertWorkflowVersionTriggerIsDefined)(workflowVersionToCopy);
            (0, _assertworkflowversionhassteps.assertWorkflowVersionHasSteps)(workflowVersionToCopy);
            const newWorkflowVersionTrigger = workflowVersionToCopy.trigger;
            const newWorkflowVersionSteps = [];
            for (const step of workflowVersionToCopy.steps){
                const duplicatedStep = await this.workflowVersionStepWorkspaceService.createDraftStep({
                    step,
                    workspaceId
                });
                newWorkflowVersionSteps.push(duplicatedStep);
            }
            const existingDraftVersion = await workflowVersionRepository.findOne({
                where: {
                    workflowId,
                    status: _workflowversionworkspaceentity.WorkflowVersionStatus.DRAFT
                }
            });
            if ((0, _utils.isDefined)(existingDraftVersion)) {
                (0, _assertworkflowversionisdraftutil.assertWorkflowVersionIsDraft)(existingDraftVersion);
                await workflowVersionRepository.update(existingDraftVersion.id, {
                    steps: newWorkflowVersionSteps,
                    trigger: newWorkflowVersionTrigger
                });
                return {
                    ...existingDraftVersion,
                    name: existingDraftVersion.name ?? '',
                    steps: newWorkflowVersionSteps,
                    trigger: newWorkflowVersionTrigger
                };
            }
            const workflowVersionsCount = await workflowVersionRepository.count({
                where: {
                    workflowId
                }
            });
            const position = await this.recordPositionService.buildRecordPosition({
                value: 'first',
                objectMetadata: {
                    isCustom: false,
                    nameSingular: 'workflowVersion'
                },
                workspaceId
            });
            const insertResult = await workflowVersionRepository.insert({
                workflowId,
                name: `v${workflowVersionsCount + 1}`,
                status: _workflowversionworkspaceentity.WorkflowVersionStatus.DRAFT,
                steps: newWorkflowVersionSteps,
                trigger: newWorkflowVersionTrigger,
                position
            });
            const draftWorkflowVersion = insertResult.generatedMaps[0];
            return {
                ...draftWorkflowVersion,
                name: draftWorkflowVersion.name ?? '',
                steps: newWorkflowVersionSteps,
                trigger: newWorkflowVersionTrigger
            };
        }, authContext);
    }
    async duplicateWorkflow({ workspaceId, workflowIdToDuplicate, workflowVersionIdToCopy }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflow', {
                shouldBypassPermissionChecks: true
            });
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            const sourceWorkflow = await workflowRepository.findOne({
                where: {
                    id: workflowIdToDuplicate
                }
            });
            if (!(0, _utils.isDefined)(sourceWorkflow)) {
                throw new _workflowversionstepexception.WorkflowVersionStepException('Source workflow not found', _workflowversionstepexception.WorkflowVersionStepExceptionCode.NOT_FOUND);
            }
            const sourceVersion = await workflowVersionRepository.findOne({
                where: {
                    id: workflowVersionIdToCopy,
                    workflowId: workflowIdToDuplicate
                }
            });
            if (!(0, _utils.isDefined)(sourceVersion)) {
                throw new _workflowversionstepexception.WorkflowVersionStepException('WorkflowVersion to copy not found', _workflowversionstepexception.WorkflowVersionStepExceptionCode.NOT_FOUND);
            }
            (0, _assertworkflowversiontriggerisdefinedutil.assertWorkflowVersionTriggerIsDefined)(sourceVersion);
            (0, _assertworkflowversionhassteps.assertWorkflowVersionHasSteps)(sourceVersion);
            const workflowPosition = await this.recordPositionService.buildRecordPosition({
                value: 'first',
                objectMetadata: {
                    isCustom: false,
                    nameSingular: 'workflow'
                },
                workspaceId
            });
            const insertWorkflowResult = await workflowRepository.insert({
                name: `${sourceWorkflow.name} (Duplicate)`,
                statuses: [
                    _workflowworkspaceentity.WorkflowStatus.DRAFT
                ],
                position: workflowPosition
            });
            const newWorkflowId = insertWorkflowResult.generatedMaps[0].id;
            const versionPosition = await this.recordPositionService.buildRecordPosition({
                value: 'first',
                objectMetadata: {
                    isCustom: false,
                    nameSingular: 'workflowVersion'
                },
                workspaceId
            });
            const insertVersionResult = await workflowVersionRepository.insert({
                workflowId: newWorkflowId,
                name: 'v1',
                status: _workflowversionworkspaceentity.WorkflowVersionStatus.DRAFT,
                position: versionPosition
            });
            const newDraftVersion = insertVersionResult.generatedMaps[0];
            const newTrigger = sourceVersion.trigger;
            const sourceToClonedPairs = [];
            const oldToNewIdMap = new Map();
            for (const step of sourceVersion.steps ?? []){
                const clonedStep = await this.workflowVersionStepOperationsWorkspaceService.cloneStep({
                    step,
                    workspaceId
                });
                sourceToClonedPairs.push({
                    source: step,
                    duplicated: clonedStep
                });
                oldToNewIdMap.set(step.id, clonedStep.id);
            }
            const remappedTrigger = (0, _utils.isDefined)(newTrigger) ? {
                ...newTrigger,
                nextStepIds: (newTrigger.nextStepIds ?? []).map((oldId)=>oldToNewIdMap.get(oldId) ?? oldId)
            } : undefined;
            const remappedSteps = sourceToClonedPairs.map(({ source, duplicated })=>{
                const remappedStep = {
                    ...duplicated,
                    nextStepIds: (source.nextStepIds ?? []).map((oldId)=>oldToNewIdMap.get(oldId) ?? oldId)
                };
                if (source.type === _workflowactiontype.WorkflowActionType.ITERATOR && (0, _utils.isDefined)(source.settings?.input?.initialLoopStepIds)) {
                    remappedStep.settings = {
                        ...remappedStep.settings,
                        input: {
                            ...remappedStep.settings.input,
                            initialLoopStepIds: source.settings.input.initialLoopStepIds.map((oldId)=>oldToNewIdMap.get(oldId) ?? oldId)
                        }
                    };
                }
                return remappedStep;
            });
            await workflowVersionRepository.update(newDraftVersion.id, {
                steps: remappedSteps,
                trigger: remappedTrigger
            });
            return {
                ...newDraftVersion,
                name: newDraftVersion.name ?? '',
                steps: remappedSteps,
                trigger: remappedTrigger ?? null
            };
        }, authContext);
    }
    async updateWorkflowVersionPositions({ workflowVersionId, positions, workspaceId }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            const workflowVersion = await workflowVersionRepository.findOneOrFail({
                where: {
                    id: workflowVersionId
                }
            });
            (0, _assertworkflowversionisdraftutil.assertWorkflowVersionIsDraft)(workflowVersion);
            const triggerPosition = positions.find((position)=>position.id === _workflow.TRIGGER_STEP_ID);
            const updatedTrigger = (0, _utils.isDefined)(triggerPosition) && (0, _utils.isDefined)(workflowVersion.trigger) ? {
                ...workflowVersion.trigger,
                position: triggerPosition.position
            } : undefined;
            const updatedSteps = workflowVersion.steps?.map((step)=>{
                const updatedStep = positions.find((position)=>position.id === step.id);
                if (updatedStep) {
                    return {
                        ...step,
                        position: updatedStep.position
                    };
                }
                return step;
            });
            const updatePayload = {
                ...!(0, _utils.isDefined)(updatedTrigger) ? {} : {
                    trigger: updatedTrigger
                },
                ...!(0, _utils.isDefined)(updatedSteps) ? {} : {
                    steps: updatedSteps
                }
            };
            await workflowVersionRepository.update(workflowVersionId, updatePayload);
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, workflowVersionStepWorkspaceService, workflowVersionStepOperationsWorkspaceService, recordPositionService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.workflowVersionStepWorkspaceService = workflowVersionStepWorkspaceService;
        this.workflowVersionStepOperationsWorkspaceService = workflowVersionStepOperationsWorkspaceService;
        this.recordPositionService = recordPositionService;
    }
};
_ts_decorate([
    (0, _withlockdecorator.WithLock)('workflowId'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowVersionWorkspaceService.prototype, "createDraftFromWorkflowVersion", null);
WorkflowVersionWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _workflowversionstepworkspaceservice.WorkflowVersionStepWorkspaceService === "undefined" ? Object : _workflowversionstepworkspaceservice.WorkflowVersionStepWorkspaceService,
        typeof _workflowversionstepoperationsworkspaceservice.WorkflowVersionStepOperationsWorkspaceService === "undefined" ? Object : _workflowversionstepoperationsworkspaceservice.WorkflowVersionStepOperationsWorkspaceService,
        typeof _recordpositionservice.RecordPositionService === "undefined" ? Object : _recordpositionservice.RecordPositionService
    ])
], WorkflowVersionWorkspaceService);

//# sourceMappingURL=workflow-version.workspace-service.js.map