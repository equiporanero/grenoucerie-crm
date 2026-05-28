"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkflowRunEnqueueWorkspaceService", {
    enumerable: true,
    get: function() {
        return WorkflowRunEnqueueWorkspaceService;
    }
});
const _common = require("@nestjs/common");
const _constants = require("twenty-shared/constants");
const _messagequeuedecorator = require("../../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../../engine/core-modules/message-queue/services/message-queue.service");
const _metricsservice = require("../../../../../engine/core-modules/metrics/metrics.service");
const _metricskeystype = require("../../../../../engine/core-modules/metrics/types/metrics-keys.type");
const _globalworkspaceormmanager = require("../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowrunworkspaceentity = require("../../../common/standard-objects/workflow-run.workspace-entity");
const _runworkflowjob = require("../../jobs/run-workflow.job");
const _notstartedrunsfindoptions = require("../constants/not-started-runs-find-options");
const _workflowthrottlingworkspaceservice = require("./workflow-throttling.workspace-service");
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
let WorkflowRunEnqueueWorkspaceService = class WorkflowRunEnqueueWorkspaceService {
    async enqueueRunsForWorkspace({ workspaceId, isCacheMode }) {
        const lockAcquired = await this.workflowThrottlingWorkspaceService.acquireWorkflowEnqueueLock(workspaceId);
        if (!lockAcquired) {
            return;
        }
        try {
            const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
            await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
                const workflowRunRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, _workflowrunworkspaceentity.WorkflowRunWorkspaceEntity, {
                    shouldBypassPermissionChecks: true
                });
                const notStartedRunsCount = isCacheMode ? await this.workflowThrottlingWorkspaceService.getNotStartedRunsCountFromCache(workspaceId) : await this.workflowThrottlingWorkspaceService.getNotStartedRunsCountFromDatabase(workspaceId);
                if (notStartedRunsCount <= 0) {
                    await this.workflowThrottlingWorkspaceService.recomputeWorkflowRunNotStartedCount(workspaceId);
                    return;
                }
                let remainingWorkflowRunToEnqueueCount = await this.workflowThrottlingWorkspaceService.getRemainingRunsToEnqueueCount(workspaceId);
                let totalEnqueuedCount = 0;
                while(remainingWorkflowRunToEnqueueCount > 0){
                    const batchSize = Math.min(remainingWorkflowRunToEnqueueCount, _constants.QUERY_MAX_RECORDS);
                    const batchRuns = await workflowRunRepository.find({
                        where: _notstartedrunsfindoptions.NOT_STARTED_RUNS_FIND_OPTIONS,
                        select: {
                            id: true
                        },
                        order: {
                            createdAt: 'ASC'
                        },
                        take: batchSize
                    });
                    if (batchRuns.length === 0) {
                        break;
                    }
                    const batchIds = batchRuns.map((workflowRun)=>workflowRun.id);
                    await workflowRunRepository.update(batchIds, {
                        enqueuedAt: new Date().toISOString(),
                        status: _workflowrunworkspaceentity.WorkflowRunStatus.ENQUEUED
                    });
                    for (const workflowRunId of batchIds){
                        await this.messageQueueService.add(_runworkflowjob.RunWorkflowJob.name, {
                            workflowRunId,
                            workspaceId
                        });
                    }
                    totalEnqueuedCount += batchRuns.length;
                    remainingWorkflowRunToEnqueueCount -= batchRuns.length;
                }
                if (totalEnqueuedCount === 0) {
                    if (!isCacheMode) {
                        await this.workflowThrottlingWorkspaceService.recomputeWorkflowRunNotStartedCount(workspaceId);
                    }
                    return;
                }
                await this.workflowThrottlingWorkspaceService.consumeRemainingRunsToEnqueueCount(workspaceId, totalEnqueuedCount);
                if (isCacheMode) {
                    await this.workflowThrottlingWorkspaceService.decreaseWorkflowRunNotStartedCount(workspaceId, totalEnqueuedCount);
                } else {
                    await this.workflowThrottlingWorkspaceService.recomputeWorkflowRunNotStartedCount(workspaceId);
                }
            }, authContext);
        } catch (error) {
            try {
                await this.metricsService.incrementCounterForEvent({
                    key: _metricskeystype.MetricsKeys.WorkflowRunFailedToEnqueue,
                    eventId: workspaceId
                });
            } catch  {
            // Metrics may fail if Redis is shutting down — safe to ignore
            }
            this.logger.error(`Failed to enqueue workflow runs for workspace: ${workspaceId}`, error);
        } finally{
            try {
                await this.workflowThrottlingWorkspaceService.releaseWorkflowEnqueueLock(workspaceId);
            } catch (releaseError) {
                this.logger.warn(`Failed to release workflow enqueue lock for workspace: ${workspaceId}`, releaseError);
            }
        }
    }
    constructor(workflowThrottlingWorkspaceService, globalWorkspaceOrmManager, messageQueueService, metricsService){
        this.workflowThrottlingWorkspaceService = workflowThrottlingWorkspaceService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageQueueService = messageQueueService;
        this.metricsService = metricsService;
        this.logger = new _common.Logger(WorkflowRunEnqueueWorkspaceService.name);
    }
};
WorkflowRunEnqueueWorkspaceService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.workflowQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workflowthrottlingworkspaceservice.WorkflowThrottlingWorkspaceService === "undefined" ? Object : _workflowthrottlingworkspaceservice.WorkflowThrottlingWorkspaceService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _metricsservice.MetricsService === "undefined" ? Object : _metricsservice.MetricsService
    ])
], WorkflowRunEnqueueWorkspaceService);

//# sourceMappingURL=workflow-run-enqueue.workspace-service.js.map