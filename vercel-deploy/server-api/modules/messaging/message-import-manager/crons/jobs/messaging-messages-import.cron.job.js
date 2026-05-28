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
    get MESSAGING_MESSAGES_IMPORT_CRON_PATTERN () {
        return MESSAGING_MESSAGES_IMPORT_CRON_PATTERN;
    },
    get MessagingMessagesImportCronJob () {
        return MessagingMessagesImportCronJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _workspace = require("twenty-shared/workspace");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _sentrycronmonitordecorator = require("../../../../../engine/core-modules/cron/sentry-cron-monitor.decorator");
const _exceptionhandlerservice = require("../../../../../engine/core-modules/exception-handler/exception-handler.service");
const _messagequeuedecorator = require("../../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _processdecorator = require("../../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../../engine/core-modules/message-queue/services/message-queue.service");
const _workspaceentity = require("../../../../../engine/core-modules/workspace/workspace.entity");
const _messagingmessagesimportjob = require("../../jobs/messaging-messages-import.job");
const _isthrottled = require("../../../../connected-account/utils/is-throttled");
const _messagechannelentity = require("../../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _toIsoStringOrNull = require("../../../../../utils/date/toIsoStringOrNull");
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
const MESSAGING_MESSAGES_IMPORT_CRON_PATTERN = '*/1 * * * *';
let MessagingMessagesImportCronJob = class MessagingMessagesImportCronJob {
    async handle() {
        const activeWorkspaces = await this.workspaceRepository.find({
            where: {
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
            }
        });
        for (const activeWorkspace of activeWorkspaces){
            try {
                const pendingMessageChannels = await this.messageChannelRepository.find({
                    where: {
                        workspaceId: activeWorkspace.id,
                        isSyncEnabled: true,
                        syncStage: _types.MessageChannelSyncStage.MESSAGES_IMPORT_PENDING,
                        type: (0, _typeorm1.Not)(_types.MessageChannelType.EMAIL_GROUP)
                    }
                });
                const messageChannelsToSchedule = pendingMessageChannels.filter((messageChannel)=>!(0, _isthrottled.isThrottled)((0, _toIsoStringOrNull.toIsoStringOrNull)(messageChannel.syncStageStartedAt), messageChannel.throttleFailureCount, (0, _toIsoStringOrNull.toIsoStringOrNull)(messageChannel.throttleRetryAfter)));
                const throttledCount = pendingMessageChannels.length - messageChannelsToSchedule.length;
                if (throttledCount > 0) {
                    this.logger.log(`Skipped ${throttledCount} throttled message channels for workspace ${activeWorkspace.id}`);
                }
                if (messageChannelsToSchedule.length === 0) {
                    continue;
                }
                const messageChannelIdsToSchedule = messageChannelsToSchedule.map((messageChannel)=>messageChannel.id);
                const updateResult = await this.messageChannelRepository.createQueryBuilder().update().set({
                    syncStage: _types.MessageChannelSyncStage.MESSAGES_IMPORT_SCHEDULED,
                    syncStageStartedAt: new Date()
                }).where({
                    id: (0, _typeorm1.In)(messageChannelIdsToSchedule),
                    workspaceId: activeWorkspace.id,
                    isSyncEnabled: true,
                    syncStage: _types.MessageChannelSyncStage.MESSAGES_IMPORT_PENDING
                }).returning('id').execute();
                const updatedIds = updateResult.raw.map((row)=>row.id);
                for (const messageChannelId of updatedIds){
                    await this.messageQueueService.add(_messagingmessagesimportjob.MessagingMessagesImportJob.name, {
                        workspaceId: activeWorkspace.id,
                        messageChannelId
                    });
                }
            } catch (error) {
                if (error.code === '42P01' && error.message.includes('messageChannel" does not exist')) {
                    const refetchedWorkspace = await this.workspaceRepository.findOneBy({
                        id: activeWorkspace.id
                    });
                    if ((0, _utils.isDefined)(refetchedWorkspace)) {
                        this.exceptionHandlerService.captureExceptions([
                            error
                        ], {
                            workspace: {
                                id: activeWorkspace.id
                            }
                        });
                        throw new Error('Workspace schema not found while the workspace is still active');
                    }
                } else {
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
    }
    constructor(workspaceRepository, messageQueueService, exceptionHandlerService, messageChannelRepository){
        this.workspaceRepository = workspaceRepository;
        this.messageQueueService = messageQueueService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.messageChannelRepository = messageChannelRepository;
        this.logger = new _common.Logger(MessagingMessagesImportCronJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(MessagingMessagesImportCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(MessagingMessagesImportCronJob.name, MESSAGING_MESSAGES_IMPORT_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], MessagingMessagesImportCronJob.prototype, "handle", null);
MessagingMessagesImportCronJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(1, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.messagingQueue)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], MessagingMessagesImportCronJob);

//# sourceMappingURL=messaging-messages-import.cron.job.js.map