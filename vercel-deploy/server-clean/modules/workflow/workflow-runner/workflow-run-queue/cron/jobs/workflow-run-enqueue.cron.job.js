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
    get WORKFLOW_RUN_ENQUEUE_CRON_PATTERN () {
        return WORKFLOW_RUN_ENQUEUE_CRON_PATTERN;
    },
    get WorkflowRunEnqueueCronJob () {
        return WorkflowRunEnqueueCronJob;
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
const _getworkspaceschemanameutil = require("../../../../../../engine/workspace-datasource/utils/get-workspace-schema-name.util");
const _workflowrunworkspaceentity = require("../../../../common/standard-objects/workflow-run.workspace-entity");
const _workflowrunenqueuejob = require("../../jobs/workflow-run-enqueue.job");
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
const WORKFLOW_RUN_ENQUEUE_CRON_PATTERN = '* * * * *';
const LAST_PARTITION_CACHE_KEY = 'workflow-run-enqueue:last-partition';
const NUMBER_OF_PARTITIONS = 10;
const WORKSPACE_BATCH_SIZE = 10;
let WorkflowRunEnqueueCronJob = class WorkflowRunEnqueueCronJob {
    async handle() {
        this.logger.log('Starting WorkflowRunEnqueueCronJob cron');
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
        this.logger.log(`Completed WorkflowRunEnqueueCronJob cron (partition ${partition}/${NUMBER_OF_PARTITIONS}), enqueued ${enqueuedCount} jobs`);
    }
    async checkAndEnqueue(workspaceId) {
        const hasNotStartedRuns = await this.hasNotStartedRuns(workspaceId);
        if (hasNotStartedRuns) {
            await this.messageQueueService.add(_workflowrunenqueuejob.WorkflowRunEnqueueJob.name, {
                workspaceId,
                isCacheMode: false
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
    async hasNotStartedRuns(workspaceId) {
        const schemaName = (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspaceId);
        const result = await this.coreDataSource.query(`SELECT 1 FROM ${schemaName}."workflowRun" WHERE "status" = $1 LIMIT 1`, [
            _workflowrunworkspaceentity.WorkflowRunStatus.NOT_STARTED
        ]);
        return result.length > 0;
    }
    constructor(coreDataSource, workspaceRepository, messageQueueService, exceptionHandlerService, cacheStorageService){
        this.coreDataSource = coreDataSource;
        this.workspaceRepository = workspaceRepository;
        this.messageQueueService = messageQueueService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.cacheStorageService = cacheStorageService;
        this.logger = new _common.Logger(WorkflowRunEnqueueCronJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(WorkflowRunEnqueueCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(WorkflowRunEnqueueCronJob.name, WORKFLOW_RUN_ENQUEUE_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], WorkflowRunEnqueueCronJob.prototype, "handle", null);
WorkflowRunEnqueueCronJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_param(0, (0, _typeorm.InjectDataSource)()),
    _ts_param(1, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(2, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.workflowQueue)),
    _ts_param(4, (0, _cachestoragedecorator.InjectCacheStorage)(_cachestoragenamespaceenum.CacheStorageNamespace.ModuleWorkflow)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.DataSource === "undefined" ? Object : _typeorm1.DataSource,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService,
        typeof _cachestorageservice.CacheStorageService === "undefined" ? Object : _cachestorageservice.CacheStorageService
    ])
], WorkflowRunEnqueueCronJob);

//# sourceMappingURL=workflow-run-enqueue.cron.job.js.map