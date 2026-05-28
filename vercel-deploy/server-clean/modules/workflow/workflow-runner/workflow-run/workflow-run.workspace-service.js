"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowRunWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowRunWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _uuid = require("uuid");
const _withlockdecorator = require("../../../../engine/core-modules/cache-lock/with-lock.decorator");
const _metricsservice = require("../../../../engine/core-modules/metrics/metrics.service");
const _metricskeystype = require("../../../../engine/core-modules/metrics/types/metrics-keys.type");
const _recordpositionservice = require("../../../../engine/core-modules/record-position/services/record-position.service");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowrunworkspaceentity = require("../../common/standard-objects/workflow-run.workspace-entity");
const _workflowcommonworkspaceservice = require("../../common/workspace-services/workflow-common.workspace-service");
const _workflowrunexception = require("../exceptions/workflow-run.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let WorkflowRunWorkspaceService = class WorkflowRunWorkspaceService {
    async createWorkflowRun({ workflowVersionId, createdBy, workflowRunId, status, triggerPayload, error, workspaceId }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowRunRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowRun', {
                shouldBypassPermissionChecks: true
            });
            const workflowVersion = await this.workflowCommonWorkspaceService.getWorkflowVersionOrFail({
                workspaceId,
                workflowVersionId
            });
            const workflowRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflow', {
                shouldBypassPermissionChecks: true
            });
            const workflow = await workflowRepository.findOne({
                where: {
                    id: workflowVersion.workflowId
                }
            });
            if (!workflow) {
                throw new _workflowrunexception.WorkflowRunException('Workflow id is invalid', _workflowrunexception.WorkflowRunExceptionCode.WORKFLOW_RUN_INVALID);
            }
            const position = await this.recordPositionService.buildRecordPosition({
                value: 'first',
                objectMetadata: {
                    isCustom: false,
                    nameSingular: 'workflowRun'
                },
                workspaceId
            });
            const initState = this.getInitState(workflowVersion, triggerPayload, error);
            const lastWorkflowRun = await workflowRunRepository.findOne({
                where: {
                    workflowId: workflow.id
                },
                order: {
                    createdAt: 'desc'
                }
            });
            const workflowRunCountMatch = lastWorkflowRun?.name?.match(/#(\d+)/);
            const workflowRunCount = workflowRunCountMatch ? parseInt(workflowRunCountMatch[1], 10) : 0;
            const workflowRun = {
                id: workflowRunId ?? (0, _uuid.v4)(),
                name: `#${workflowRunCount + 1} - ${workflow.name}`,
                workflowVersionId,
                createdBy,
                workflowId: workflow.id,
                status,
                position,
                state: initState,
                enqueuedAt: status === _workflowrunworkspaceentity.WorkflowRunStatus.ENQUEUED ? new Date() : null
            };
            await workflowRunRepository.insert(workflowRun);
            return workflowRun.id;
        }, authContext);
    }
    async startWorkflowRun({ workflowRunId, workspaceId }) {
        const workflowRunToUpdate = await this.getWorkflowRunOrFail({
            workflowRunId,
            workspaceId
        });
        if (workflowRunToUpdate.status !== _workflowrunworkspaceentity.WorkflowRunStatus.ENQUEUED && workflowRunToUpdate.status !== _workflowrunworkspaceentity.WorkflowRunStatus.NOT_STARTED) {
            throw new _workflowrunexception.WorkflowRunException('Workflow run is not enqueued or not started', _workflowrunexception.WorkflowRunExceptionCode.INVALID_OPERATION);
        }
        const partialUpdate = {
            status: _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING,
            startedAt: new Date().toISOString(),
            state: {
                ...workflowRunToUpdate.state,
                stepInfos: {
                    ...workflowRunToUpdate.state?.stepInfos,
                    trigger: {
                        result: {},
                        ...workflowRunToUpdate.state?.stepInfos.trigger,
                        status: _workflow.StepStatus.SUCCESS
                    }
                }
            }
        };
        await this.updateWorkflowRun({
            workflowRunId,
            workspaceId,
            partialUpdate
        });
    }
    async endWorkflowRun({ workflowRunId, workspaceId, status, error, isSystemError }) {
        const workflowRunToUpdate = await this.getWorkflowRunOrFail({
            workflowRunId,
            workspaceId
        });
        let updatedStepInfos = {};
        updatedStepInfos = this.markRunningStepsAsFailed({
            stepInfosToUpdate: workflowRunToUpdate.state?.stepInfos ?? {}
        });
        const partialUpdate = {
            status,
            endedAt: new Date().toISOString(),
            state: {
                ...workflowRunToUpdate.state,
                workflowRunError: error,
                stepInfos: updatedStepInfos
            }
        };
        await this.updateWorkflowRun({
            workflowRunId,
            workspaceId,
            partialUpdate
        });
        const metricKey = status === _workflowrunworkspaceentity.WorkflowRunStatus.COMPLETED ? _metricskeystype.MetricsKeys.WorkflowRunCompleted : status === _workflowrunworkspaceentity.WorkflowRunStatus.STOPPED ? _metricskeystype.MetricsKeys.WorkflowRunStopped : _metricskeystype.MetricsKeys.WorkflowRunFailed;
        await this.metricsService.incrementCounterForEvent({
            key: metricKey,
            eventId: workflowRunId
        });
        if (isSystemError) {
            await this.metricsService.incrementCounterForEvent({
                key: _metricskeystype.MetricsKeys.WorkflowRunSystemError,
                eventId: workflowRunId,
                debugLog: `[Workflow Run System Error] Workflow run ${workflowRunId} in workspace ${workspaceId} ended with system error`
            });
        }
    }
    async updateWorkflowRunStepInfo({ stepId, stepInfo, workflowRunId, workspaceId }) {
        const workflowRunToUpdate = await this.getWorkflowRunOrFail({
            workflowRunId,
            workspaceId
        });
        const partialUpdate = {
            state: {
                ...workflowRunToUpdate.state,
                stepInfos: {
                    ...workflowRunToUpdate.state?.stepInfos,
                    [stepId]: {
                        ...workflowRunToUpdate.state?.stepInfos[stepId],
                        result: stepInfo?.result,
                        error: stepInfo?.error,
                        status: stepInfo.status
                    }
                }
            }
        };
        await this.updateWorkflowRun({
            workflowRunId,
            workspaceId,
            partialUpdate
        });
    }
    async updateWorkflowRunStepInfos({ stepInfos, workflowRunId, workspaceId }) {
        const workflowRunToUpdate = await this.getWorkflowRunOrFail({
            workflowRunId,
            workspaceId
        });
        const existingStepInfos = workflowRunToUpdate.state?.stepInfos ?? {};
        const mergedStepInfos = {
            ...existingStepInfos
        };
        for (const [stepId, info] of Object.entries(stepInfos)){
            mergedStepInfos[stepId] = {
                ...existingStepInfos[stepId],
                ...info
            };
        }
        const partialUpdate = {
            state: {
                ...workflowRunToUpdate.state,
                stepInfos: mergedStepInfos
            }
        };
        await this.updateWorkflowRun({
            workflowRunId,
            workspaceId,
            partialUpdate
        });
    }
    async updateWorkflowRunStep({ workflowRunId, step, workspaceId }) {
        const workflowRunToUpdate = await this.getWorkflowRunOrFail({
            workflowRunId,
            workspaceId
        });
        if (workflowRunToUpdate.status === _workflowrunworkspaceentity.WorkflowRunStatus.COMPLETED || workflowRunToUpdate.status === _workflowrunworkspaceentity.WorkflowRunStatus.FAILED) {
            throw new _workflowrunexception.WorkflowRunException('Cannot update steps of a completed or failed workflow run', _workflowrunexception.WorkflowRunExceptionCode.INVALID_OPERATION);
        }
        const updatedSteps = workflowRunToUpdate.state?.flow?.steps?.map((existingStep)=>step.id === existingStep.id ? step : existingStep);
        const partialUpdate = {
            state: {
                ...workflowRunToUpdate.state,
                flow: {
                    ...workflowRunToUpdate.state?.flow,
                    steps: updatedSteps
                }
            }
        };
        await this.updateWorkflowRun({
            workflowRunId,
            workspaceId,
            partialUpdate
        });
    }
    async getWorkflowRun({ workflowRunId, workspaceId }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowRunRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowRun', {
                shouldBypassPermissionChecks: true
            });
            return await workflowRunRepository.findOne({
                where: {
                    id: workflowRunId
                }
            });
        }, authContext);
    }
    async getWorkflowRunOrFail({ workflowRunId, workspaceId }) {
        const workflowRun = await this.getWorkflowRun({
            workflowRunId,
            workspaceId
        });
        if (!workflowRun) {
            throw new _workflowrunexception.WorkflowRunException('Workflow run not found', _workflowrunexception.WorkflowRunExceptionCode.WORKFLOW_RUN_NOT_FOUND);
        }
        return workflowRun;
    }
    async updateWorkflowRun({ workflowRunId, workspaceId, partialUpdate }) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowRunRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workflowRun', {
                shouldBypassPermissionChecks: true
            });
            const workflowRunToUpdate = await workflowRunRepository.findOneBy({
                id: workflowRunId
            });
            if (!workflowRunToUpdate) {
                throw new _workflowrunexception.WorkflowRunException(`workflowRun ${workflowRunId} not found`, _workflowrunexception.WorkflowRunExceptionCode.WORKFLOW_RUN_NOT_FOUND);
            }
            await workflowRunRepository.update(workflowRunToUpdate.id, partialUpdate, undefined, [
                'id'
            ]);
        }, authContext);
    }
    getInitState(workflowVersion, triggerPayload, error) {
        if (!(0, _utils.isDefined)(workflowVersion.trigger) || !(0, _utils.isDefined)(workflowVersion.steps)) {
            return undefined;
        }
        return {
            flow: {
                trigger: workflowVersion.trigger,
                steps: workflowVersion.steps
            },
            stepInfos: {
                trigger: {
                    status: _workflow.StepStatus.NOT_STARTED,
                    result: triggerPayload
                },
                ...Object.fromEntries(workflowVersion.steps.map((step)=>[
                        step.id,
                        {
                            status: _workflow.StepStatus.NOT_STARTED
                        }
                    ]))
            },
            workflowRunError: error
        };
    }
    markRunningStepsAsFailed({ stepInfosToUpdate }) {
        return Object.entries(stepInfosToUpdate ?? {}).map(([stepId, step])=>{
            if (step.status === _workflow.StepStatus.RUNNING || step.status === _workflow.StepStatus.PENDING) {
                return {
                    [stepId]: {
                        ...step,
                        status: _workflow.StepStatus.FAILED,
                        error: 'Workflow has been ended before this step was completed'
                    }
                };
            }
            return {
                [stepId]: step
            };
        }).reduce((acc, current)=>{
            return {
                ...acc,
                ...current
            };
        }, {});
    }
    constructor(globalWorkspaceOrmManager, workflowCommonWorkspaceService, recordPositionService, metricsService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
        this.recordPositionService = recordPositionService;
        this.metricsService = metricsService;
    }
};
_ts_decorate([
    (0, _withlockdecorator.WithLock)('workflowRunId'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowRunWorkspaceService.prototype, "startWorkflowRun", null);
_ts_decorate([
    (0, _withlockdecorator.WithLock)('workflowRunId'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowRunWorkspaceService.prototype, "endWorkflowRun", null);
_ts_decorate([
    (0, _withlockdecorator.WithLock)('workflowRunId'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowRunWorkspaceService.prototype, "updateWorkflowRunStepInfo", null);
_ts_decorate([
    (0, _withlockdecorator.WithLock)('workflowRunId'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowRunWorkspaceService.prototype, "updateWorkflowRunStepInfos", null);
_ts_decorate([
    (0, _withlockdecorator.WithLock)('workflowRunId'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], WorkflowRunWorkspaceService.prototype, "updateWorkflowRunStep", null);
WorkflowRunWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService,
        typeof _recordpositionservice.RecordPositionService === "undefined" ? Object : _recordpositionservice.RecordPositionService,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService
    ])
], WorkflowRunWorkspaceService);

//# sourceMappingURL=workflow-run.workspace-service.js.map