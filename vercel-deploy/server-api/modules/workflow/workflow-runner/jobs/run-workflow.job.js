"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RunWorkflowJob", {
    enumerable: true,
    get: function() {
        return RunWorkflowJob;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _metricsservice = require("../../../../engine/core-modules/metrics/metrics.service");
const _metricskeystype = require("../../../../engine/core-modules/metrics/types/metrics-keys.type");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowrunworkspaceentity = require("../../common/standard-objects/workflow-run.workspace-entity");
const _workflowcommonworkspaceservice = require("../../common/workspace-services/workflow-common.workspace-service");
const _codestepbuildservice = require("../../workflow-builder/workflow-version-step/code-step/services/code-step-build.service");
const _workflowexecutorworkspaceservice = require("../../workflow-executor/workspace-services/workflow-executor.workspace-service");
const _runworkflowjobname = require("../constants/run-workflow-job-name");
const _workflowrunexception = require("../exceptions/workflow-run.exception");
const _workflowrunworkspaceservice = require("../workflow-run/workflow-run.workspace-service");
const _workflowtriggertype = require("../../workflow-trigger/types/workflow-trigger.type");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RunWorkflowJob = class RunWorkflowJob {
    async handle({ workflowRunId, lastExecutedStepId, workspaceId }) {
        this.logger.log(`Running workflow run ${workflowRunId} in workspace ${workspaceId}`);
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            try {
                if (lastExecutedStepId) {
                    await this.resumeWorkflowExecution({
                        workspaceId,
                        workflowRunId,
                        lastExecutedStepId
                    });
                } else {
                    await this.startWorkflowExecution({
                        workflowRunId,
                        workspaceId
                    });
                }
            } catch (error) {
                await this.workflowRunWorkspaceService.endWorkflowRun({
                    workspaceId,
                    workflowRunId,
                    status: _workflowrunworkspaceentity.WorkflowRunStatus.FAILED,
                    error: error.message,
                    isSystemError: true
                });
                throw error;
            }
        }, authContext);
    }
    async startWorkflowExecution({ workflowRunId, workspaceId }) {
        const workflowRun = await this.workflowRunWorkspaceService.getWorkflowRunOrFail({
            workflowRunId,
            workspaceId
        });
        if (workflowRun.status !== _workflowrunworkspaceentity.WorkflowRunStatus.ENQUEUED && workflowRun.status !== _workflowrunworkspaceentity.WorkflowRunStatus.NOT_STARTED) {
            return;
        }
        const workflowVersion = await this.workflowCommonWorkspaceService.getWorkflowVersionOrFail({
            workspaceId,
            workflowVersionId: workflowRun.workflowVersionId
        });
        if (!workflowVersion.trigger || !workflowVersion.steps) {
            throw new _workflowrunexception.WorkflowRunException('Workflow version has no trigger or steps', _workflowrunexception.WorkflowRunExceptionCode.WORKFLOW_RUN_INVALID);
        }
        await this.codeStepBuildService.buildCodeStepsFromSourceForSteps({
            workspaceId,
            steps: workflowVersion.steps
        });
        await this.workflowRunWorkspaceService.startWorkflowRun({
            workflowRunId,
            workspaceId
        });
        await this.incrementTriggerMetrics({
            workflowRunId,
            triggerType: workflowVersion.trigger.type
        });
        const stepIds = workflowVersion.trigger.nextStepIds ?? [];
        await this.workflowExecutorWorkspaceService.executeFromSteps({
            stepIds,
            workflowRunId,
            workspaceId
        });
    }
    async resumeWorkflowExecution({ workflowRunId, lastExecutedStepId, workspaceId }) {
        const workflowRun = await this.workflowRunWorkspaceService.getWorkflowRunOrFail({
            workflowRunId,
            workspaceId
        });
        if (workflowRun.status !== _workflowrunworkspaceentity.WorkflowRunStatus.RUNNING) {
            return;
        }
        const lastExecutedStep = workflowRun.state?.flow?.steps?.find((step)=>step.id === lastExecutedStepId);
        if (!lastExecutedStep) {
            throw new _workflowrunexception.WorkflowRunException('Last executed step not found', _workflowrunexception.WorkflowRunExceptionCode.INVALID_INPUT);
        }
        const lastExecutedStepOutput = workflowRun.state?.stepInfos[lastExecutedStepId];
        const { nextStepIdsToExecute, nextStepIdsToSkip, nextStepIdsToFailSafely } = await this.workflowExecutorWorkspaceService.getNextStepIdsToExecute({
            executedStep: lastExecutedStep,
            executedStepOutput: lastExecutedStepOutput
        });
        const hasStepsToSkipOrFailSafely = (0, _utils.isDefined)(nextStepIdsToSkip) || (0, _utils.isDefined)(nextStepIdsToFailSafely);
        const hasStepsToExecute = (0, _utils.isDefined)(nextStepIdsToExecute) && nextStepIdsToExecute.length > 0;
        if (!hasStepsToSkipOrFailSafely && !hasStepsToExecute) {
            await this.workflowRunWorkspaceService.endWorkflowRun({
                workflowRunId,
                workspaceId,
                status: _workflowrunworkspaceentity.WorkflowRunStatus.COMPLETED
            });
            return;
        }
        const steps = workflowRun.state?.flow?.steps ?? [];
        if (hasStepsToSkipOrFailSafely) {
            await this.workflowExecutorWorkspaceService.skipAndFailSafelyStepsThenContinue({
                stepIdsToSkip: nextStepIdsToSkip ?? [],
                stepIdsToFailSafely: nextStepIdsToFailSafely ?? [],
                steps,
                workflowRunId,
                workspaceId,
                executedStepsCount: 0
            });
        }
        if (hasStepsToExecute) {
            await this.workflowExecutorWorkspaceService.executeFromSteps({
                stepIds: nextStepIdsToExecute,
                workflowRunId,
                workspaceId
            });
        }
    }
    async incrementTriggerMetrics({ workflowRunId, triggerType }) {
        let key;
        switch(triggerType){
            case _workflowtriggertype.WorkflowTriggerType.DATABASE_EVENT:
                key = _metricskeystype.MetricsKeys.WorkflowRunStartedDatabaseEventTrigger;
                break;
            case _workflowtriggertype.WorkflowTriggerType.CRON:
                key = _metricskeystype.MetricsKeys.WorkflowRunStartedCronTrigger;
                break;
            case _workflowtriggertype.WorkflowTriggerType.WEBHOOK:
                key = _metricskeystype.MetricsKeys.WorkflowRunStartedWebhookTrigger;
                break;
            case _workflowtriggertype.WorkflowTriggerType.MANUAL:
                key = _metricskeystype.MetricsKeys.WorkflowRunStartedManualTrigger;
                break;
            default:
                throw new Error('Invalid trigger type');
        }
        await this.metricsService.incrementCounterForEvent({
            key,
            eventId: workflowRunId
        });
    }
    constructor(workflowCommonWorkspaceService, codeStepBuildService, workflowExecutorWorkspaceService, workflowRunWorkspaceService, metricsService, globalWorkspaceOrmManager){
        this.workflowCommonWorkspaceService = workflowCommonWorkspaceService;
        this.codeStepBuildService = codeStepBuildService;
        this.workflowExecutorWorkspaceService = workflowExecutorWorkspaceService;
        this.workflowRunWorkspaceService = workflowRunWorkspaceService;
        this.metricsService = metricsService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.logger = new _common.Logger(RunWorkflowJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(_runworkflowjobname.RUN_WORKFLOW_JOB_NAME),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RunWorkflowJobData === "undefined" ? Object : RunWorkflowJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], RunWorkflowJob.prototype, "handle", null);
RunWorkflowJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.workflowQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService === "undefined" ? Object : _workflowcommonworkspaceservice.WorkflowCommonWorkspaceService,
        typeof _codestepbuildservice.CodeStepBuildService === "undefined" ? Object : _codestepbuildservice.CodeStepBuildService,
        typeof _workflowexecutorworkspaceservice.WorkflowExecutorWorkspaceService === "undefined" ? Object : _workflowexecutorworkspaceservice.WorkflowExecutorWorkspaceService,
        typeof _workflowrunworkspaceservice.WorkflowRunWorkspaceService === "undefined" ? Object : _workflowrunworkspaceservice.WorkflowRunWorkspaceService,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager
    ])
], RunWorkflowJob);

//# sourceMappingURL=run-workflow.job.js.map