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
    get MESSAGING_RELAUNCH_FAILED_MESSAGE_CHANNELS_CRON_PATTERN () {
        return MESSAGING_RELAUNCH_FAILED_MESSAGE_CHANNELS_CRON_PATTERN;
    },
    get MessagingRelaunchFailedMessageChannelsCronJob () {
        return MessagingRelaunchFailedMessageChannelsCronJob;
    }
});
const _typeorm = require("@nestjs/typeorm");
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
const _messagechannelentity = require("../../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _workspaceentity = require("../../../../../engine/core-modules/workspace/workspace.entity");
const _messagingrelaunchfailedmessagechanneljob = require("../../jobs/messaging-relaunch-failed-message-channel.job");
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
const MESSAGING_RELAUNCH_FAILED_MESSAGE_CHANNELS_CRON_PATTERN = '*/30 * * * *';
let MessagingRelaunchFailedMessageChannelsCronJob = class MessagingRelaunchFailedMessageChannelsCronJob {
    async handle() {
        const activeWorkspaces = await this.workspaceRepository.find({
            where: {
                activationStatus: _workspace.WorkspaceActivationStatus.ACTIVE
            }
        });
        const activeWorkspaceIds = activeWorkspaces.map((workspace)=>workspace.id);
        if (activeWorkspaceIds.length === 0) {
            return;
        }
        const failedMessageChannels = await this.messageChannelRepository.find({
            where: {
                syncStage: _types.MessageChannelSyncStage.FAILED,
                syncStatus: _types.MessageChannelSyncStatus.FAILED_UNKNOWN,
                type: (0, _typeorm1.Not)(_types.MessageChannelType.EMAIL_GROUP),
                workspaceId: (0, _typeorm1.In)(activeWorkspaceIds)
            }
        }).catch((error)=>{
            this.exceptionHandlerService.captureExceptions([
                error
            ]);
            return [];
        });
        for (const messageChannel of failedMessageChannels){
            try {
                await this.messageQueueService.add(_messagingrelaunchfailedmessagechanneljob.MessagingRelaunchFailedMessageChannelJob.name, {
                    workspaceId: messageChannel.workspaceId,
                    messageChannelId: messageChannel.id
                });
            } catch (error) {
                this.exceptionHandlerService.captureExceptions([
                    error
                ], {
                    workspace: {
                        id: messageChannel.workspaceId
                    }
                });
            }
        }
    }
    constructor(workspaceRepository, messageChannelRepository, messageQueueService, exceptionHandlerService){
        this.workspaceRepository = workspaceRepository;
        this.messageChannelRepository = messageChannelRepository;
        this.messageQueueService = messageQueueService;
        this.exceptionHandlerService = exceptionHandlerService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(MessagingRelaunchFailedMessageChannelsCronJob.name),
    (0, _sentrycronmonitordecorator.SentryCronMonitor)(MessagingRelaunchFailedMessageChannelsCronJob.name, MESSAGING_RELAUNCH_FAILED_MESSAGE_CHANNELS_CRON_PATTERN),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], MessagingRelaunchFailedMessageChannelsCronJob.prototype, "handle", null);
MessagingRelaunchFailedMessageChannelsCronJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.cronQueue),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(2, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.messagingQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService
    ])
], MessagingRelaunchFailedMessageChannelsCronJob);

//# sourceMappingURL=messaging-relaunch-failed-message-channels.cron.job.js.map