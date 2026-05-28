"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingMessageListFetchJob", {
    enumerable: true,
    get: function() {
        return MessagingMessageListFetchJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _messagingimportexceptionhandlerservice = require("../services/messaging-import-exception-handler.service");
const _messagingmessagelistfetchservice = require("../services/messaging-message-list-fetch.service");
const _messagingmonitoringservice = require("../../monitoring/services/messaging-monitoring.service");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
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
let MessagingMessageListFetchJob = class MessagingMessageListFetchJob {
    async handle(data) {
        const { messageChannelId, workspaceId } = data;
        await this.messagingMonitoringService.track({
            eventName: 'message_list_fetch_job.triggered',
            messageChannelId,
            workspaceId
        });
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageChannel = await this.messageChannelRepository.findOne({
                where: {
                    id: messageChannelId,
                    workspaceId
                },
                relations: {
                    connectedAccount: true,
                    messageFolders: true
                }
            });
            if (!messageChannel) {
                await this.messagingMonitoringService.track({
                    eventName: 'message_list_fetch_job.error.message_channel_not_found',
                    messageChannelId,
                    workspaceId
                });
                return;
            }
            if (messageChannel.syncStage !== _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_SCHEDULED) {
                return;
            }
            try {
                await this.messagingMonitoringService.track({
                    eventName: 'message_list_fetch.started',
                    workspaceId,
                    connectedAccountId: messageChannel.connectedAccount.id,
                    messageChannelId: messageChannel.id
                });
                await this.messagingMessageListFetchService.processMessageListFetch(messageChannel, workspaceId);
                await this.messagingMonitoringService.track({
                    eventName: 'message_list_fetch.completed',
                    workspaceId,
                    connectedAccountId: messageChannel.connectedAccount.id,
                    messageChannelId: messageChannel.id
                });
            } catch (error) {
                await this.messageImportErrorHandlerService.handleDriverException(error, _messagingimportexceptionhandlerservice.MessageImportSyncStep.MESSAGE_LIST_FETCH, messageChannel, workspaceId);
            }
        }, authContext, {
            lite: true
        });
    }
    constructor(messagingMessageListFetchService, messagingMonitoringService, globalWorkspaceOrmManager, messageChannelRepository, messageImportErrorHandlerService){
        this.messagingMessageListFetchService = messagingMessageListFetchService;
        this.messagingMonitoringService = messagingMonitoringService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageChannelRepository = messageChannelRepository;
        this.messageImportErrorHandlerService = messageImportErrorHandlerService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(MessagingMessageListFetchJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof MessagingMessageListFetchJobData === "undefined" ? Object : MessagingMessageListFetchJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagingMessageListFetchJob.prototype, "handle", null);
MessagingMessageListFetchJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.messagingQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(3, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagingmessagelistfetchservice.MessagingMessageListFetchService === "undefined" ? Object : _messagingmessagelistfetchservice.MessagingMessageListFetchService,
        typeof _messagingmonitoringservice.MessagingMonitoringService === "undefined" ? Object : _messagingmonitoringservice.MessagingMonitoringService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagingimportexceptionhandlerservice.MessageImportExceptionHandlerService === "undefined" ? Object : _messagingimportexceptionhandlerservice.MessageImportExceptionHandlerService
    ])
], MessagingMessageListFetchJob);

//# sourceMappingURL=messaging-message-list-fetch.job.js.map