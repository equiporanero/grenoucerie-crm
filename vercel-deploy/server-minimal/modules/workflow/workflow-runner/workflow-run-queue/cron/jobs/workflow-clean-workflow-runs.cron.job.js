"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get CLEAN_WORKFLOW_RUN_CRON_PATTERN () {
        return CLEAN_WORKFLOW_RUN_CRON_PATTERN;
    },
    get WorkflowCleanWorkflowRunsCronJob () {
        return WorkflowCleanWorkflowRunsCronJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _cachestoragedecorator = require("../../../../../../engine/core-modules/cache-storage/decorators/cache-storage.decorator");
const _cachestorageservice = require("../../../../../../engine/core-modules/cache-storage/services/cache-storage.service");
const _cachestoragenamespaceenum = require("../../../../../../engine/core-modules/cache-storage/types/cache-storage-namespace.enum");
const _sentrycronmonitordecorator = require("../../../../../../engine/core-modules/cron/sentry-cron-monitor.decorator");
const _exceptionhandlerservice = require("../../../../../../engine/core-modules/exception-handler/exception-handler.service");
const _messagequeuedecorator = require("../../../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _processdecorator = require("../../../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../../../engine/core-modules/message-queue/services/message-queue.service");
const _workspaceentity = require("../../../../../../engine/core-modules/workspace/workspace.entity");
const _globalworkspaceormmanager = require("../../../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _workflowrunworkspaceentity = require("../../../../common/standard-objects/workflow-run.workspace-entity");
const _numberofworkflowrunstokeep = require("../../constants/number-of-workflow-runs-to-keep");
const _workflowcleanworkflowrunsjob = require("../../jobs/workflow-clean-workflow-runs.job");
const _getrunstocleanfindoptionsutil = require("../../utils/get-runs-to-clean-find-options.util");
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
const CLEAN_WORKFLOW_RUN_CRON_PATTERN = '0 */3 * * *';
const LAST_PARTITION_CACHE_KEY = 'workflow-clean-workflow-runs:last-partition';
const NUMBER_OF_PARTITIONS = 10;
const WORKSPACE_BATCH_SIZE = 10;
let WorkflowCleanWorkflowRunsCronJob = class WorkflowCleanWorkflowRunsCronJob {
    async handle() {
        this.logger.log('Starting WorkflowCleanWorkflowRunsCronJob cron');
        const allActiveWorkspaces = await this.workspaceRepository.find({
            where: {
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
            },
            select: [
                'id'
            ],
            order: {
                id: 'ASC'
            }
        });
        const partition = await this.getAndIncrementPartition();
        const workspacesForThisRun = allActiveWorkspaces.filter((_, index)=>index % NUMBER_OF_PARTITIONS === partition);
        let enqueuedCount = 0;
        for(let workspaceIndex = 0; workspaceIndex < workspacesForThisRun.length; workspaceIndex += WORKSPACE_BATCH_SIZE){
            const batch = workspacesForThisRun.slice(workspaceIndex, workspaceIndex + WORKSPACE_BATCH_SIZE);
            const results = await Promise.allSettled(batch.map((workspace)=>this.checkAndEnqueue(workspace.id)));
            for (const [index, result] of results.entries()){
                if (result.status === 'fulfilled' && result.value) {
                    enqueuedCount++;
                }
                if (result.status === 'rejected') {
                    this.exceptionHandlerService.captureExceptions([
                        result.reason
                    ], {
                        workspace: {
                            id: batch[index].id
                        }
                    });
                }
            }
        }
        this.logger.log(`Completed WorkflowCleanWorkflowRunsCronJob cron (partition ${partition}/${NUMBER_OF_PARTITIONS}), enqueued ${enqueuedCount} jobs`);
    }
    async checkAndEnqueue(workspaceId) {
        const hasRunsToClean = await this.hasRunsToClean(workspaceId);
        if (hasRunsToClean) {
            await this.messageQueueService.add(_workflowcleanworkflowrunsjob.WorkflowCleanWorkflowRunsJob.name, {
                workspaceId
            });
            return true;
        }
        return false;
    }
    async getAndIncrementPartition() {
        const lastPartition = await this.cacheStorageService.get(LAST_PARTITION_CACHE_KEY);
        const partition = lastPartition !== undefined ? (lastPartition + 1) % NUMBER_OF_PARTITIONS : 0;
        await this.cacheStorageService.set(LAST_PARTITION_CACHE_KEY, partition);
        return partition;
    }
    async hasRunsToClean(workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workflowRunRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, _workflowrunworkspaceentity.WorkflowRunWorkspaceEntity, {
                shouldBypassPermissionChecks: true
            });
            const hasOldRuns = await workflowRunRepository.exists({
                where: (0, _getrunstocleanfindoptionsutil.getRunsToCleanFindOptions)()
            });
            if (hasOldRuns) {
                return true;
            }
            const totalCompletedRunsCount = await workflowRunRepository.count({
                where: {
                    status: (0, _typeorm1.In)([
                        _workflowrunworkspaceentity.WorkflowRunStatus.COMPLETED,
                        _workflowrunworkspaceentity.WorkflowRunStatus.FAILED
                    ])
                }
            });
            return totalCompletedRunsCount > _numberofworkflowrunstokeep.NUMBER_OF_WORKFLOW_RUNS_TO_KEEP;
        }, authContext, {
            lite: true
        });
    }
    constructor(workspaceRepository, messageQueueService, globalWorkspaceOrmManager, exceptionHandlerService, cacheStorageService){
        this.workspaceRepository = workspaceRepository;
        this.messageQueueService = messageQueueService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.exceptionHandlerService = exceptionHandlerService;
        this.cacheStorageService = cacheStorageService;
        this.logger = new _common.Logger(WorkflowCleanWorkflowRunsCronJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(WorkflowCleanWorkflowRunsCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(WorkflowCleanWorkflowRunsCronJob.name, CLEAN_WORKFLOW_RUN_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], WorkflowCleanWorkflowRunsCronJob.prototype, "handle", null);
WorkflowCleanWorkflowRunsCronJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(1, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.workflowQueue)),
    _ts_param(4, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.ModuleWorkflow)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService,
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService
    ])
], WorkflowCleanWorkflowRunsCronJob);

//# sourceMappingURL=workflow-clean-workflow-runs.cron.job.js.map