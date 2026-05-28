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
    get WORKFLOW_CRON_TRIGGER_CRON_PATTERN () {
        return WORKFLOW_CRON_TRIGGER_CRON_PATTERN;
    },
    get WorkflowCronTriggerCronJob () {
        return WorkflowCronTriggerCronJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
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
const _workflowautomatedtriggerworkspaceentity = require("../../../../common/standard-objects/workflow-automated-trigger.workspace-entity");
const _workflowcrontriggercachekeyconstant = require("../constants/workflow-cron-trigger-cache-key.constant");
const _workflowcrontriggercachettlconstant = require("../constants/workflow-cron-trigger-cache-ttl.constant");
const _workflowtriggerjob = require("../../../jobs/workflow-trigger.job");
const _shouldrunnowutils = require("../../../../../../utils/should-run-now.utils");
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
const WORKFLOW_CRON_TRIGGER_CRON_PATTERN = '* * * * *';
let WorkflowCronTriggerCronJob = class WorkflowCronTriggerCronJob {
    async handle() {
        this.logger.log('WorkflowCronTriggerCronJob started');
        const now = new Date();
        const cachedValues = await this.cacheStorageService.hashGetValues(_workflowcrontriggercachekeyconstant.WORKFLOW_CRON_TRIGGER_CACHE_KEY);
        if (cachedValues.length > 0) {
            this.logger.log(`Cache hit: ${cachedValues.length} cached cron triggers`);
            await this.getAndRunTriggersFromCache(cachedValues, now);
        } else {
            this.logger.log('Cache miss: performing full scan of all workspaces');
            await this.getAndRunTriggersFromDatabase(now);
        }
        this.logger.log('WorkflowCronTriggerCronJob completed');
    }
    async getAndRunTriggersFromCache(cachedValues, now) {
        for (const serialized of cachedValues){
            try {
                const trigger = JSON.parse(serialized);
                if (!(0, _utils.isDefined)(trigger.pattern)) {
                    continue;
                }
                if (!(0, _shouldrunnowutils.shouldRunNow)(trigger.pattern, now)) {
                    continue;
                }
                this.logger.log(`Enqueuing WorkflowTriggerJob for workflow ${trigger.workflowId} in workspace ${trigger.workspaceId}`);
                await this.messageQueueService.add(_workflowtriggerjob.WorkflowTriggerJob.name, {
                    workspaceId: trigger.workspaceId,
                    workflowId: trigger.workflowId,
                    payload: {}
                }, {
                    retryLimit: 3
                });
            } catch (error) {
                this.logger.error(`Error processing cached trigger: ${error}`);
                this.exceptionHandlerService.captureExceptions([
                    error
                ]);
            }
        }
    }
    async getAndRunTriggersFromDatabase(now) {
        const activeWorkspaces = await this.workspaceRepository.find({
            where: {
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
            },
            select: [
                'id'
            ]
        });
        this.logger.log(`Found ${activeWorkspaces.length} active workspaces`);
        let triggerCount = 0;
        for (const workspace of activeWorkspaces){
            const triggersToCache = await this.getAndRunWorkspaceTriggersFromDatabase(workspace.id, now);
            for (const trigger of triggersToCache){
                await this.cacheStorageService.hashSetWithExpire({
                    key: _workflowcrontriggercachekeyconstant.WORKFLOW_CRON_TRIGGER_CACHE_KEY,
                    field: trigger.workflowId,
                    value: JSON.stringify(trigger),
                    ttlMs: _workflowcrontriggercachettlconstant.WORKFLOW_CRON_TRIGGER_CACHE_TTL_MS
                });
                triggerCount++;
            }
        }
        this.logger.log(`Cache rebuilt with ${triggerCount} cron triggers`);
    }
    async getAndRunWorkspaceTriggersFromDatabase(workspaceId, now) {
        try {
            const schemaName = (0, _getworkspaceschemanameutil.getWorkspaceSchemaName)(workspaceId);
            const workflowAutomatedCronTriggers = await this.coreDataSource.query(`SELECT * FROM ${schemaName}."workflowAutomatedTrigger" WHERE type = '${_workflowautomatedtriggerworkspaceentity.AutomatedTriggerType.CRON}'`);
            if (workflowAutomatedCronTriggers.length === 0) {
                return [];
            }
            this.logger.log(`Workspace ${workspaceId}: found ${workflowAutomatedCronTriggers.length} cron triggers`);
            const triggersToCache = [];
            for (const trigger of workflowAutomatedCronTriggers){
                const settings = trigger.settings;
                if (!(0, _utils.isDefined)(settings.pattern)) {
                    this.logger.warn(`Trigger ${trigger.id}: skipping - pattern not defined`);
                    continue;
                }
                const cachedTrigger = {
                    workspaceId,
                    workflowId: trigger.workflowId,
                    pattern: settings.pattern
                };
                triggersToCache.push(cachedTrigger);
                if ((0, _shouldrunnowutils.shouldRunNow)(settings.pattern, now)) {
                    this.logger.log(`Trigger ${trigger.id}: enqueuing WorkflowTriggerJob for workflow ${trigger.workflowId}`);
                    await this.messageQueueService.add(_workflowtriggerjob.WorkflowTriggerJob.name, {
                        workspaceId,
                        workflowId: trigger.workflowId,
                        payload: {}
                    }, {
                        retryLimit: 3
                    });
                }
            }
            return triggersToCache;
        } catch (error) {
            this.logger.error(`Error processing workspace ${workspaceId}: ${error}`);
            this.exceptionHandlerService.captureExceptions([
                error
            ], {
                workspace: {
                    id: workspaceId
                }
            });
            return [];
        }
    }
    constructor(coreDataSource, workspaceRepository, messageQueueService, exceptionHandlerService, cacheStorageService){
        this.coreDataSource = coreDataSource;
        this.workspaceRepository = workspaceRepository;
        this.messageQueueService = messageQueueService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.cacheStorageService = cacheStorageService;
        this.logger = new _common.Logger(WorkflowCronTriggerCronJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(WorkflowCronTriggerCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(WorkflowCronTriggerCronJob.name, WORKFLOW_CRON_TRIGGER_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], WorkflowCronTriggerCronJob.prototype, "handle", null);
WorkflowCronTriggerCronJob = _ts_decorate([
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
], WorkflowCronTriggerCronJob);

//# sourceMappingURL=workflow-cron-trigger-cron.job.js.map