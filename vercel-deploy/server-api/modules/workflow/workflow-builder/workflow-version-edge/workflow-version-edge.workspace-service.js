"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowVersionEdgeWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowVersionEdgeWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowversionedgeexception = require("../../common/exceptions/workflow-version-edge.exception");
const _assertworkflowversionisdraftutil = require("../../common/utils/assert-workflow-version-is-draft.util");
const _workflowcommonworkspaceservice = require("../../common/workspace-services/workflow-common.workspace-service");
const _computeworkflowversionstepupdatesutil = require("../utils/compute-workflow-version-step-updates.util");
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
let WorkflowVersionEdgeWorkspaceService = class WorkflowVersionEdgeWorkspaceService {
    async createWorkflowVersionEdge({ source, target, workflowVersionId, workspaceId, sourceConnectionOptions }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            const workflowVersion = await this.workflowCommonWorkspaceService.getWorkflowVersionOrFail({
                workflowVersionId,
                workspaceId
            });
            (0, _assertworkflowversionisdraftutil.assertWorkflowVersionIsDraft)(workflowVersion);
            const trigger = workflowVersion.trigger;
            const steps = workflowVersion.steps || [];
            const targetStep = steps.find((step)=>step.id === target);
            if (!(0, _utils.isDefined)(targetStep)) {
                throw new _workflowversionedgeexception.WorkflowVersionEdgeException(`Target step '${target}' not found in workflowVersion '${workflowVersionId}'`, _workflowversionedgeexception.WorkflowVersionEdgeExceptionCode.NOT_FOUND);
            }
            const isSourceTrigger = source === _workflow.TRIGGER_STEP_ID;
            if (isSourceTrigger) {
                return this.createTriggerEdge({
                    trigger,
                    steps,
                    target,
                    workflowVersion,
                    workflowVersionRepository
                });
            } else {
                return this.createStepEdge({
                    trigger,
                    steps,
                    source,
                    target,
                    sourceConnectionOptions,
                    workflowVersion,
                    workflowVersionRepository
                });
            }
        }, authContext);
    }
    async deleteWorkflowVersionEdge({ source, target, workflowVersionId, workspaceId, sourceConnectionOptions }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowVersionRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowVersion', {
                shouldBypassPermissionChecks: true
            });
            const workflowVersion = await this.workflowCommonWorkspaceService.getWorkflowVersionOrFail({
                workflowVersionId,
                workspaceId
            });
            (0, _assertworkflowversionisdraftutil.assertWorkflowVersionIsDraft)(workflowVersion);
            const trigger = workflowVersion.trigger;
            const steps = workflowVersion.steps || [];
            const targetStep = steps.find((step)=>step.id === target);
            if (!(0, _utils.isDefined)(targetStep)) {
                throw new _workflowversionedgeexception.WorkflowVersionEdgeException(`Target step '${target}' not found in workflowVersion '${workflowVersionId}'`, _workflowversionedgeexception.WorkflowVersionEdgeExceptionCode.NOT_FOUND);
            }
            const isSourceTrigger = source === _workflow.TRIGGER_STEP_ID;
            if (isSourceTrigger) {
                return this.deleteTriggerEdge({
                    trigger,
                    steps,
                    target,
                    workflowVersion,
                    workflowVersionRepository
                });
            } else {
                return this.deleteStepEdge({
                    trigger,
                    steps,
                    source,
                    target,
                    workflowVersion,
                    workflowVersionRepository,
                    sourceConnectionOptions
                });
            }
        }, authContext);
    }
    async createTriggerEdge({ trigger, steps, target, workflowVersion, workflowVersionRepository }) {
        if (!(0, _utils.isDefined)(trigger)) {
            throw new _workflowversionedgeexception.WorkflowVersionEdgeException(`Trigger not found in workflowVersion '${workflowVersion.id}'`, _workflowversionedgeexception.WorkflowVersionEdgeExceptionCode.NOT_FOUND);
        }
        if (trigger.nextStepIds?.includes(target)) {
            return (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
                existingTrigger: trigger,
                existingSteps: steps
            });
        }
        const updatedTrigger = {
            ...trigger,
            nextStepIds: [
                ...trigger.nextStepIds ?? [],
                target
            ]
        };
        await workflowVersionRepository.update(workflowVersion.id, {
            trigger: updatedTrigger
        });
        return (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
            existingTrigger: trigger,
            existingSteps: steps,
            updatedTrigger
        });
    }
    async createStepEdge({ trigger, steps, source, target, workflowVersion, workflowVersionRepository, sourceConnectionOptions }) {
        const sourceStep = steps.find((step)=>step.id === source);
        if (!(0, _utils.isDefined)(sourceStep)) {
            throw new _workflowversionedgeexception.WorkflowVersionEdgeException(`Source step '${source}' not found in workflowVersion '${workflowVersion.id}'`, _workflowversionedgeexception.WorkflowVersionEdgeExceptionCode.NOT_FOUND);
        }
        if (sourceStep.nextStepIds?.includes(target) && !(0, _utils.isDefined)(sourceConnectionOptions)) {
            return (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
                existingTrigger: trigger,
                existingSteps: steps
            });
        }
        const { updatedSourceStep, shouldPersist } = (0, _utils.isDefined)(sourceConnectionOptions) ? this.buildUpdatedSourceStepWithConnectionOptions({
            sourceStep,
            target,
            sourceConnectionOptions
        }) : this.buildUpdatedSourceStep({
            sourceStep,
            target
        });
        const updatedSteps = steps.map((step)=>{
            if (step.id === source) {
                return updatedSourceStep;
            }
            return step;
        });
        if (shouldPersist) {
            await workflowVersionRepository.update(workflowVersion.id, {
                steps: updatedSteps
            });
        }
        return (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
            existingTrigger: trigger,
            existingSteps: steps,
            updatedSteps
        });
    }
    buildUpdatedSourceStepWithConnectionOptions({ sourceStep, target, sourceConnectionOptions }) {
        switch(sourceConnectionOptions.connectedStepType){
            case _workflowactiontype.WorkflowActionType.ITERATOR:
                if (sourceStep.type !== _workflowactiontype.WorkflowActionType.ITERATOR) {
                    throw new _workflowversionedgeexception.WorkflowVersionEdgeException(`Source step '${sourceStep.id}' is not an iterator`, _workflowversionedgeexception.WorkflowVersionEdgeExceptionCode.INVALID_REQUEST);
                }
                if (sourceConnectionOptions.settings.isConnectedToLoop) {
                    const currentInitialLoopStepIds = sourceStep.settings.input.initialLoopStepIds;
                    if (currentInitialLoopStepIds?.includes(target)) {
                        return {
                            updatedSourceStep: sourceStep,
                            shouldPersist: false
                        };
                    }
                    return {
                        updatedSourceStep: {
                            ...sourceStep,
                            settings: {
                                ...sourceStep.settings,
                                input: {
                                    ...sourceStep.settings.input,
                                    initialLoopStepIds: [
                                        ...currentInitialLoopStepIds ?? [],
                                        target
                                    ]
                                }
                            }
                        },
                        shouldPersist: true
                    };
                } else {
                    return this.buildUpdatedSourceStep({
                        sourceStep,
                        target
                    });
                }
            default:
                return this.buildUpdatedSourceStep({
                    sourceStep,
                    target
                });
        }
    }
    buildUpdatedSourceStep({ sourceStep, target }) {
        if (sourceStep.nextStepIds?.includes(target)) {
            return {
                updatedSourceStep: sourceStep,
                shouldPersist: false
            };
        }
        const updatedSourceStep = {
            ...sourceStep,
            nextStepIds: [
                ...sourceStep.nextStepIds ?? [],
                target
            ]
        };
        return {
            updatedSourceStep,
            shouldPersist: true
        };
    }
    async deleteTriggerEdge({ trigger, steps, target, workflowVersion, workflowVersionRepository }) {
        if (!(0, _utils.isDefined)(trigger)) {
            throw new _workflowversionedgeexception.WorkflowVersionEdgeException(`Trigger not found in workflowVersion '${workflowVersion.id}'`, _workflowversionedgeexception.WorkflowVersionEdgeExceptionCode.NOT_FOUND);
        }
        if (!trigger.nextStepIds?.includes(target)) {
            return (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
                existingTrigger: trigger,
                existingSteps: steps
            });
        }
        const updatedTrigger = {
            ...trigger,
            nextStepIds: trigger.nextStepIds?.filter((nextStepId)=>nextStepId !== target)
        };
        await workflowVersionRepository.update(workflowVersion.id, {
            trigger: updatedTrigger
        });
        return (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
            existingTrigger: trigger,
            existingSteps: steps,
            updatedTrigger
        });
    }
    async deleteStepEdge({ trigger, steps, source, target, workflowVersion, workflowVersionRepository, sourceConnectionOptions }) {
        const sourceStep = steps.find((step)=>step.id === source);
        if (!(0, _utils.isDefined)(sourceStep)) {
            throw new _workflowversionedgeexception.WorkflowVersionEdgeException(`Source step '${source}' not found in workflowVersion '${workflowVersion.id}'`, _workflowversionedgeexception.WorkflowVersionEdgeExceptionCode.NOT_FOUND);
        }
        if (!sourceStep.nextStepIds?.includes(target) && !(0, _utils.isDefined)(sourceConnectionOptions)) {
            return (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
                existingTrigger: trigger,
                existingSteps: steps
            });
        }
        const { updatedSourceStep, shouldPersist } = (0, _utils.isDefined)(sourceConnectionOptions) ? this.buildUpdatedSourceStepWithOptions({
            sourceStep,
            target,
            sourceConnectionOptions
        }) : {
            updatedSourceStep: {
                ...sourceStep,
                nextStepIds: sourceStep.nextStepIds?.filter((nextStepId)=>nextStepId !== target)
            },
            shouldPersist: true
        };
        if (!shouldPersist) {
            return (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
                existingTrigger: trigger,
                existingSteps: steps
            });
        }
        const updatedSteps = steps.map((step)=>{
            if (step.id === source) {
                return updatedSourceStep;
            }
            return step;
        });
        await workflowVersionRepository.update(workflowVersion.id, {
            steps: updatedSteps
        });
        return (0, _computeworkflowversionstepupdatesutil.computeWorkflowVersionStepChanges)({
            existingTrigger: trigger,
            existingSteps: steps,
            updatedSteps
        });
    }
    buildUpdatedSourceStepWithOptions({ sourceStep, target, sourceConnectionOptions }) {
        switch(sourceConnectionOptions.connectedStepType){
            case _workflowactiontype.WorkflowActionType.ITERATOR:
                if (sourceStep.type !== _workflowactiontype.WorkflowActionType.ITERATOR) {
                    throw new _workflowversionedgeexception.WorkflowVersionEdgeException(`Source step '${sourceStep.id}' is not an iterator`, _workflowversionedgeexception.WorkflowVersionEdgeExceptionCode.INVALID_REQUEST);
                }
                if (sourceConnectionOptions.settings.isConnectedToLoop) {
                    const currentInitialLoopStepIds = sourceStep.settings.input.initialLoopStepIds;
                    if (!currentInitialLoopStepIds?.includes(target)) {
                        return {
                            updatedSourceStep: sourceStep,
                            shouldPersist: false
                        };
                    }
                    return {
                        updatedSourceStep: {
                            ...sourceStep,
                            settings: {
                                ...sourceStep.settings,
                                input: {
                                    ...sourceStep.settings.input,
                                    initialLoopStepIds: currentInitialLoopStepIds.filter((id)=>id !== target)
                                }
                            }
                        },
                        shouldPersist: true
                    };
                }
                return {
                    updatedSourceStep: {
                        ...sourceStep,
                        nextStepIds: sourceStep.nextStepIds?.filter((id)=>id !== target)
                    },
                    shouldPersist: true
                };
            default:
                return {
                    updatedSourceStep: {
                        ...sourceStep,
                        nextStepIds: sourceStep.nextStepIds?.filter((id)=>id !== target)
                    },
                    shouldPersist: true
                };
        }
    }
    constructor(globalWorkspaceOrmManager, workflowCommonWorkspaceService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
    }
};
WorkflowVersionEdgeWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService
    ])
], WorkflowVersionEdgeWorkspaceService);

//# sourceMappingURL=workflow-version-edge.workspace-service.js.map