"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowExecutorWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowExecutorWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const _workflow = require("twenty-shared/workflow");
const _billingusageservice = require("../../../../engine/core-modules/billing/services/billing-usage.service");
const _billingservice = require("../../../../engine/core-modules/billing/services/billing.service");
const _exceptionhandlerservice = require("../../../../engine/core-modules/exception-handler/exception-handler.service");
const _messagequeuedecorator = require("../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../engine/core-modules/message-queue/services/message-queue.service");
const _metricsservice = require("../../../../engine/core-modules/metrics/metrics.service");
const _metricskeystype = require("../../../../engine/core-modules/metrics/types/metrics-keys.type");
const _usagerecordedconstant = require("../../../../engine/core-modules/usage/constants/usage-recorded.constant");
const _usageoperationtypeenum = require("../../../../engine/core-modules/usage/enums/usage-operation-type.enum");
const _usageresourcetypeenum = require("../../../../engine/core-modules/usage/enums/usage-resource-type.enum");
const _usageunitenum = require("../../../../engine/core-modules/usage/enums/usage-unit.enum");
const _workspacecacheservice = require("../../../../engine/workspace-cache/services/workspace-cache.service");
const _workspaceeventemitter = require("../../../../engine/workspace-event-emitter/workspace-event-emitter");
const _workflowrunworkspaceentity = require("../../common/standard-objects/workflow-run.workspace-entity");
const _workflowhasrunningstepsutil = require("../../common/utils/workflow-has-running-steps.util");
const _workflowstepexecutorexception = require("../exceptions/workflow-step-executor.exception");
const _workflowactionfactory = require("../factories/workflow-action.factory");
const _shouldexecutesteputil = require("../utils/should-execute-step.util");
const _shouldfailsafelyutil = require("../utils/should-fail-safely.util");
const _shouldskipstepexecutionutil = require("../utils/should-skip-step-execution.util");
const _workflowshouldfailutil = require("../utils/workflow-should-fail.util");
const _workflowshouldkeeprunningutil = require("../utils/workflow-should-keep-running.util");
const _isworkflowifelseactionguard = require("../workflow-actions/if-else/guards/is-workflow-if-else-action.guard");
const _isworkflowiteratoractionguard = require("../workflow-actions/iterator/guards/is-workflow-iterator-action.guard");
const _findenclosingiteratorwithcontinueonfailureutil = require("../workflow-actions/iterator/utils/find-enclosing-iterator-with-continue-on-failure.util");
const _runworkflowjobname = require("../../workflow-runner/constants/run-workflow-job-name");
const _workflowrunworkspaceservice = require("../../workflow-runner/workflow-run/workflow-run.workspace-service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
const MAX_EXECUTED_STEPS_COUNT = 20;
let WorkflowExecutorWorkspaceService = class WorkflowExecutorWorkspaceService {
    async executeFromSteps({ stepIds, workflowRunId, workspaceId, shouldComputeWorkflowRunStatus = true, executedStepsCount = 0 }) {
        await Promise.all(stepIds.map(async (stepIdToExecute)=>{
            return this.executeFromStep({
                stepId: stepIdToExecute,
                workflowRunId,
                workspaceId,
                executedStepsCount
            });
        }));
        if (shouldComputeWorkflowRunStatus) {
            await this.computeWorkflowRunStatus({
                workflowRunId,
                workspaceId
            });
        }
    }
    async executeFromStep({ stepId, workflowRunId, workspaceId, executedStepsCount }) {
        const workflowRun = await this.workflowRunWorkspaceService.getWorkflowRunOrFail({
            workflowRunId,
            workspaceId
        });
        const stepInfos = workflowRun.state.stepInfos;
        const steps = workflowRun.state.flow.steps;
        const stepToExecute = steps.find((step)=>step.id === stepId);
        if (!stepToExecute) {
            await this.workflowRunWorkspaceService.endWorkflowRun({
                workflowRunId,
                workspaceId,
                status: _workflowrunworkspaceentity.WorkflowRunStatus.FAILED,
                error: 'Step not found',
                isSystemError: true
            });
            return;
        }
        let actionOutput;
        if ((0, _shouldexecutesteputil.shouldExecuteStep)({
            step: stepToExecute,
            steps,
            stepInfos,
            workflowRunStatus: workflowRun.status
        })) {
            actionOutput = await this.executeStep({
                step: stepToExecute,
                steps,
                stepInfos,
                workflowRunId,
                workspaceId
            });
            if ((0, _utils.isDefined)(actionOutput.error)) {
                const enclosingIterator = (0, _findenclosingiteratorwithcontinueonfailureutil.findEnclosingIteratorWithContinueOnFailure)({
                    failedStepId: stepId,
                    steps
                });
                if ((0, _utils.isDefined)(enclosingIterator)) {
                    actionOutput.shouldFailSafely = true;
                }
            }
        } else if ((0, _shouldfailsafelyutil.shouldFailSafely)({
            step: stepToExecute,
            steps,
            stepInfos
        })) {
            actionOutput = {
                shouldFailSafely: true
            };
        } else if ((0, _shouldskipstepexecutionutil.shouldSkipStepExecution)({
            step: stepToExecute,
            steps,
            stepInfos
        })) {
            actionOutput = {
                shouldSkipStepExecution: true
            };
        } else {
            return;
        }
        const isError = (0, _utils.isDefined)(actionOutput.error) && !actionOutput.shouldFailSafely;
        if (!isError && !actionOutput.shouldFailSafely && !actionOutput.shouldSkipStepExecution) {
            await this.sendWorkflowNodeRunEvent(workspaceId, workflowRun.workflowId);
        }
        const { shouldProcessNextSteps } = await this.processStepExecutionResult({
            actionOutput,
            stepId,
            workflowRunId,
            workspaceId
        });
        if (!shouldProcessNextSteps) {
            return;
        }
        const shouldRunAnotherJob = executedStepsCount && executedStepsCount > MAX_EXECUTED_STEPS_COUNT;
        if (shouldRunAnotherJob) {
            await this.continueExecutionFromStepInAnotherJob({
                lastExecutedStepId: stepId,
                workflowRunId,
                workspaceId
            });
            return;
        }
        const { nextStepIdsToExecute, nextStepIdsToSkip, nextStepIdsToFailSafely } = await this.getNextStepIdsToExecute({
            executedStep: stepToExecute,
            executedStepOutput: actionOutput
        });
        if ((0, _utils.isDefined)(nextStepIdsToSkip) || (0, _utils.isDefined)(nextStepIdsToFailSafely)) {
            await this.skipAndFailSafelyStepsThenContinue({
                stepIdsToSkip: nextStepIdsToSkip ?? [],
                stepIdsToFailSafely: nextStepIdsToFailSafely ?? [],
                steps,
                workflowRunId,
                workspaceId,
                executedStepsCount: (executedStepsCount ?? 0) + 1
            });
        }
        if ((0, _utils.isDefined)(nextStepIdsToExecute) && nextStepIdsToExecute.length > 0) {
            await this.executeFromSteps({
                stepIds: nextStepIdsToExecute,
                workflowRunId,
                workspaceId,
                shouldComputeWorkflowRunStatus: false,
                executedStepsCount: (executedStepsCount ?? 0) + 1
            });
        }
    }
    async getNextStepIdsToExecute({ executedStep, executedStepOutput }) {
        const isIteratorStep = (0, _isworkflowiteratoractionguard.isWorkflowIteratorAction)(executedStep);
        if (isIteratorStep) {
            const iteratorStepResult = executedStepOutput.result;
            if (!iteratorStepResult?.hasProcessedAllItems && !executedStepOutput.shouldFailSafely && !executedStepOutput.shouldSkipStepExecution) {
                const nextStepIdsToExecute = (0, _guards.isString)(executedStep.settings.input.initialLoopStepIds) ? JSON.parse(executedStep.settings.input.initialLoopStepIds) : executedStep.settings.input.initialLoopStepIds;
                return {
                    nextStepIdsToExecute
                };
            }
        }
        if ((0, _isworkflowifelseactionguard.isWorkflowIfElseAction)(executedStep)) {
            const ifElseResult = executedStepOutput.result;
            const branches = executedStep.settings.input.branches;
            if (ifElseResult?.matchingBranchId) {
                const matchingBranch = branches.find((branch)=>branch.id === ifElseResult.matchingBranchId);
                const nonMatchingBranches = branches.filter((branch)=>branch.id !== ifElseResult.matchingBranchId);
                return {
                    nextStepIdsToExecute: matchingBranch?.nextStepIds,
                    nextStepIdsToSkip: nonMatchingBranches.flatMap((branch)=>branch.nextStepIds)
                };
            } else if (executedStepOutput.shouldFailSafely) {
                return {
                    nextStepIdsToFailSafely: branches.flatMap((branch)=>branch.nextStepIds)
                };
            } else {
                return {
                    nextStepIdsToSkip: branches.flatMap((branch)=>branch.nextStepIds)
                };
            }
        }
        return {
            nextStepIdsToExecute: executedStep.nextStepIds
        };
    }
    async computeWorkflowRunStatus({ workflowRunId, workspaceId }) {
        const workflowRun = await this.workflowRunWorkspaceService.getWorkflowRunOrFail({
            workflowRunId,
            workspaceId
        });
        const stepInfos = workflowRun.state.stepInfos;
        const steps = workflowRun.state.flow.steps;
        if (workflowRun.status === _workflowrunworkspaceentity.WorkflowRunStatus.STOPPING) {
            if (!(0, _workflowhasrunningstepsutil.workflowHasRunningSteps)({
                stepInfos,
                steps
            })) {
                await this.workflowRunWorkspaceService.endWorkflowRun({
                    workflowRunId,
                    workspaceId,
                    status: _workflowrunworkspaceentity.WorkflowRunStatus.STOPPED
                });
            }
            return;
        }
        if ((0, _workflowshouldfailutil.workflowShouldFail)({
            stepInfos,
            steps
        })) {
            await this.workflowRunWorkspaceService.endWorkflowRun({
                workflowRunId,
                workspaceId,
                status: _workflowrunworkspaceentity.WorkflowRunStatus.FAILED,
                error: 'WorkflowRun failed'
            });
            return;
        }
        if ((0, _workflowshouldkeeprunningutil.workflowShouldKeepRunning)({
            stepInfos,
            steps
        })) {
            return;
        }
        await this.workflowRunWorkspaceService.endWorkflowRun({
            workflowRunId,
            workspaceId,
            status: _workflowrunworkspaceentity.WorkflowRunStatus.COMPLETED
        });
    }
    async sendWorkflowNodeRunEvent(workspaceId, workflowId) {
        let periodStart;
        if (this.billingService.isBillingEnabled()) {
            const { billingSubscription: { currentPeriodStart } } = await this.workspaceCacheService.getOrRecompute(workspaceId, [
                'billingSubscription'
            ]);
            periodStart = currentPeriodStart;
            await this.billingUsageService.decrementAvailableCreditsInCache({
                workspaceId,
                usedCredits: 100
            });
        }
        this.workspaceEventEmitter.emitCustomBatchEvent(_usagerecordedconstant.USAGE_RECORDED, [
            {
                resourceType: _usageresourcetypeenum.UsageResourceType.WORKFLOW,
                operationType: _usageoperationtypeenum.UsageOperationType.WORKFLOW_EXECUTION,
                creditsUsedMicro: 100,
                quantity: 1,
                unit: _usageunitenum.UsageUnit.INVOCATION,
                resourceId: workflowId,
                periodStart
            }
        ], workspaceId);
    }
    async processStepExecutionResult({ actionOutput, stepId, workflowRunId, workspaceId }) {
        const isPendingEvent = actionOutput.pendingEvent;
        const isSuccess = (0, _utils.isDefined)(actionOutput.result);
        const isStopped = actionOutput.shouldEndWorkflowRun ?? false;
        const isNotFinished = actionOutput.shouldRemainRunning ?? false;
        const isSkipped = actionOutput.shouldSkipStepExecution ?? false;
        const isFailedSafely = actionOutput.shouldFailSafely ?? false;
        let stepInfo;
        if (isPendingEvent) {
            stepInfo = {
                status: _workflow.StepStatus.PENDING
            };
        } else if (isStopped) {
            stepInfo = {
                status: _workflow.StepStatus.STOPPED,
                result: actionOutput?.result
            };
        } else if (isNotFinished) {
            stepInfo = {
                status: _workflow.StepStatus.RUNNING,
                result: actionOutput?.result
            };
        } else if (isFailedSafely) {
            stepInfo = {
                status: _workflow.StepStatus.FAILED_SAFELY,
                error: actionOutput?.error
            };
        } else if (isSuccess) {
            stepInfo = {
                status: _workflow.StepStatus.SUCCESS,
                result: actionOutput?.result
            };
        } else if (isSkipped) {
            stepInfo = {
                status: _workflow.StepStatus.SKIPPED
            };
        } else {
            stepInfo = {
                status: _workflow.StepStatus.FAILED,
                error: actionOutput?.error
            };
        }
        await this.workflowRunWorkspaceService.updateWorkflowRunStepInfo({
            stepId,
            stepInfo,
            workflowRunId,
            workspaceId
        });
        return {
            shouldProcessNextSteps: isSuccess || isStopped || isSkipped || isFailedSafely
        };
    }
    async executeStep({ step, steps, stepInfos, workflowRunId, workspaceId }) {
        // Credit-cap enforcement lives at the AI entry points (chat resolver,
        // executeAgent, generate-text controller, title generation). Cheap
        // workflow steps (DB CRUD, branching, actions) are not gated here so a
        // chat-driven cap exhaustion does not block non-AI automations.
        const stepId = step.id;
        const workflowAction = this.workflowActionFactory.get(step.type);
        await this.workflowRunWorkspaceService.updateWorkflowRunStepInfo({
            stepId,
            stepInfo: {
                ...stepInfos[stepId],
                status: _workflow.StepStatus.RUNNING
            },
            workflowRunId,
            workspaceId
        });
        try {
            return await workflowAction.execute({
                currentStepId: stepId,
                steps,
                context: (0, _workflow.getWorkflowRunContext)(stepInfos),
                runInfo: {
                    workflowRunId,
                    workspaceId
                }
            });
        } catch (error) {
            const isUserError = error instanceof _workflowstepexecutorexception.WorkflowStepExecutorException && (error.code === _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE || error.code === _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_INPUT || error.code === _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.STEP_NOT_FOUND);
            if (!isUserError) {
                this.exceptionHandlerService.captureExceptions([
                    error
                ], {
                    workspace: {
                        id: workspaceId
                    }
                });
                await this.metricsService.incrementCounterForEvent({
                    key: _metricskeystype.MetricsKeys.WorkflowRunSystemError,
                    eventId: workflowRunId,
                    debugLog: `[Workflow Run System Error] Workflow run ${workflowRunId} in workspace ${workspaceId} ended with system error`
                });
            }
            return {
                error: error.message ?? 'Execution result error, no data or error'
            };
        }
    }
    async skipAndFailSafelyStepsThenContinue({ stepIdsToSkip, stepIdsToFailSafely, steps, workflowRunId, workspaceId, executedStepsCount }) {
        const stepInfos = {};
        for (const stepId of stepIdsToSkip){
            stepInfos[stepId] = {
                status: _workflow.StepStatus.SKIPPED
            };
        }
        for (const stepId of stepIdsToFailSafely){
            stepInfos[stepId] = {
                status: _workflow.StepStatus.FAILED_SAFELY
            };
        }
        await this.workflowRunWorkspaceService.updateWorkflowRunStepInfos({
            stepInfos,
            workflowRunId,
            workspaceId
        });
        const nextStepIds = new Set();
        for (const stepId of [
            ...stepIdsToSkip,
            ...stepIdsToFailSafely
        ]){
            const step = steps.find((step)=>step.id === stepId);
            for (const nextStepId of step?.nextStepIds ?? []){
                nextStepIds.add(nextStepId);
            }
        }
        if (nextStepIds.size > 0) {
            await this.executeFromSteps({
                stepIds: Array.from(nextStepIds),
                workflowRunId,
                workspaceId,
                shouldComputeWorkflowRunStatus: false,
                executedStepsCount
            });
        }
    }
    async continueExecutionFromStepInAnotherJob({ lastExecutedStepId, workflowRunId, workspaceId }) {
        await this.messageQueueService.add(_runworkflowjobname.RUN_WORKFLOW_JOB_NAME, {
            workspaceId,
            workflowRunId,
            lastExecutedStepId
        });
    }
    constructor(workflowActionFactory, workspaceEventEmitter, workflowRunWorkspaceService, billingService, billingUsageService, workspaceCacheService, exceptionHandlerService, metricsService, messageQueueService){
        this.workflowActionFactory = workflowActionFactory;
        this.workspaceEventEmitter = workspaceEventEmitter;
        this.workflowRunWorkspaceService = workflowRunWorkspaceService;
        this.billingService = billingService;
        this.billingUsageService = billingUsageService;
        this.workspaceCacheService = workspaceCacheService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.metricsService = metricsService;
        this.messageQueueService = messageQueueService;
    }
};
WorkflowExecutorWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(8, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.workflowQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowactionfactory.WorkflowActionFactory === "undefined" ? Object : _workflowactionfactory.WorkflowActionFactory,
        typeof _workspaceeventemitter.WorkspaceEventEmitter === "undefined" ? Object : _workspaceeventemitter.WorkspaceEventEmitter,
        typeof _workflowrunworkspaceservice.WorkflowRunWorkspaceService === "undefined" ? Object : _workflowrunworkspaceservice.WorkflowRunWorkspaceService,
        typeof _billingservice.BillingService === "undefined" ? Object : _billingservice.BillingService,
        typeof _billingusageservice.BillingUsageService === "undefined" ? Object : _billingusageservice.BillingUsageService,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], WorkflowExecutorWorkspaceService);

//# sourceMappingURL=workflow-executor.workspace-service.js.map