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
    get CRON_TRIGGER_CRON_PATTERN () {
        return CRON_TRIGGER_CRON_PATTERN;
    },
    get CronTriggerCronJob () {
        return CronTriggerCronJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _sentrycronmonitordecorator = require("../../../../cron/sentry-cron-monitor.decorator");
const _exceptionhandlerservice = require("../../../../exception-handler/exception-handler.service");
const _messagequeuedecorator = require("../../../../message-queue/decorators/message-queue.decorator");
const _processdecorator = require("../../../../message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../message-queue/services/message-queue.service");
const _workspaceentity = require("../../../../workspace/workspace.entity");
const _logicfunctiontriggerjob = require("../../jobs/logic-function-trigger.job");
const _workspacecacheservice = require("../../../../../workspace-cache/services/workspace-cache.service");
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
const CRON_TRIGGER_CRON_PATTERN = '* * * * *';
let CronTriggerCronJob = class CronTriggerCronJob {
    async handle() {
        const activeWorkspaces = await this.workspaceRepository.find({
            where: {
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
            },
            select: [
                'id'
            ]
        });
        const now = new Date();
        for (const activeWorkspace of activeWorkspaces){
            try {
                const { flatLogicFunctionMaps } = await this.workspaceCacheService.getOrRecompute(activeWorkspace.id, [
                    'flatLogicFunctionMaps'
                ]);
                const logicFunctions = Object.values(flatLogicFunctionMaps.byUniversalIdentifier);
                for (const logicFunction of logicFunctions){
                    if (!(0, _utils.isDefined)(logicFunction)) {
                        continue;
                    }
                    const cronSettings = logicFunction.cronTriggerSettings;
                    if (!(0, _utils.isDefined)(cronSettings?.pattern)) {
                        continue;
                    }
                    if ((0, _utils.isDefined)(logicFunction.deletedAt)) {
                        continue;
                    }
                    if (!(0, _shouldrunnowutils.shouldRunNow)(cronSettings.pattern, now)) {
                        continue;
                    }
                    await this.messageQueueService.add(_logicfunctiontriggerjob.LogicFunctionTriggerJob.name, [
                        {
                            logicFunctionId: logicFunction.id,
                            workspaceId: activeWorkspace.id,
                            payload: {}
                        }
                    ], {
                        retryLimit: 3
                    });
                }
            } catch (error) {
                this.logger.error(`Error processing workspace ${activeWorkspace.id}: ${error}`);
                this.exceptionHandlerService.captureExceptions([
                    error
                ], {
                    workspace: {
                        id: activeWorkspace.id
                    }
                });
            }
        }
    }
    constructor(messageQueueService, workspaceRepository, workspaceCacheService, exceptionHandlerService){
        this.messageQueueService = messageQueueService;
        this.workspaceRepository = workspaceRepository;
        this.workspaceCacheService = workspaceCacheService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.logger = new _common.Logger(CronTriggerCronJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(CronTriggerCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(CronTriggerCronJob.name, CRON_TRIGGER_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], CronTriggerCronJob.prototype, "handle", null);
CronTriggerCronJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_param(0, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.logicFunctionQueue)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacecacheservice.WorkspaceCacheService === "undefined" ? Object : _workspacecacheservice.WorkspaceCacheService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService
    ])
], CronTriggerCronJob);

//# sourceMappingURL=cron-trigger.cron.job.js.map