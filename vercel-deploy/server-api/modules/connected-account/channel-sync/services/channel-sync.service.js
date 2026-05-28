"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChannelSyncService", {
    enumerable: true,
    get: function() {
        return ChannelSyncService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _messagequeuedecorator = require("../../../../engine/core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../engine/core-modules/message-queue/services/message-queue.service");
const _calendarchannelentity = require("../../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _calendareventlistfetchjob = require("../../../calendar/calendar-event-import-manager/jobs/calendar-event-list-fetch.job");
const _messagechannelsyncstatusservice = require("../../../messaging/common/services/message-channel-sync-status.service");
const _messagingmessagelistfetchjob = require("../../../messaging/message-import-manager/jobs/messaging-message-list-fetch.job");
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
let ChannelSyncService = class ChannelSyncService {
    async startChannelSync(input) {
        const { connectedAccountId, workspaceId } = input;
        await this.startMessageChannelSync(connectedAccountId, workspaceId);
        await this.startCalendarChannelSync(connectedAccountId, workspaceId);
    }
    async startMessageChannelSync(connectedAccountId, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageChannels = await this.messageChannelRepository.find({
                where: {
                    connectedAccountId,
                    syncStage: _types.MessageChannelSyncStage.PENDING_CONFIGURATION,
                    type: (0, _typeorm1.Not)(_types.MessageChannelType.EMAIL_GROUP),
                    workspaceId
                }
            });
            for (const messageChannel of messageChannels){
                await this.messageChannelSyncStatusService.markAsMessagesListFetchScheduled([
                    messageChannel.id
                ], workspaceId);
                await this.messageQueueService.add(_messagingmessagelistfetchjob.MessagingMessageListFetchJob.name, {
                    workspaceId,
                    messageChannelId: messageChannel.id
                });
            }
        }, authContext);
    }
    async startCalendarChannelSync(connectedAccountId, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const calendarChannels = await this.calendarChannelRepository.find({
                where: {
                    connectedAccountId,
                    syncStage: _types.CalendarChannelSyncStage.PENDING_CONFIGURATION,
                    workspaceId
                }
            });
            for (const calendarChannel of calendarChannels){
                await this.calendarChannelRepository.update({
                    id: calendarChannel.id,
                    workspaceId
                }, {
                    syncStage: _types.CalendarChannelSyncStage.CALENDAR_EVENT_LIST_FETCH_SCHEDULED,
                    syncStatus: _types.CalendarChannelSyncStatus.ONGOING
                });
                await this.calendarQueueService.add(_calendareventlistfetchjob.CalendarEventListFetchJob.name, {
                    workspaceId,
                    calendarChannelId: calendarChannel.id
                });
            }
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, messageQueueService, calendarQueueService, messageChannelRepository, messageChannelSyncStatusService, calendarChannelRepository){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageQueueService = messageQueueService;
        this.calendarQueueService = calendarQueueService;
        this.messageChannelRepository = messageChannelRepository;
        this.messageChannelSyncStatusService = messageChannelSyncStatusService;
        this.calendarChannelRepository = calendarChannelRepository;
    }
};
ChannelSyncService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.messagingQueue)),
    _ts_param(2, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.calendarQueue)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(5, (0, _typeorm.InjectRepository)(_calendarchannelentity.CalendarChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagechannelsyncstatusservice.MessageChannelSyncStatusService === "undefined" ? Object : _messagechannelsyncstatusservice.MessageChannelSyncStatusService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], ChannelSyncService);

//# sourceMappingURL=channel-sync.service.js.map