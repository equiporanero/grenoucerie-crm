"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingOngoingStaleJob", {
    enumerable: true,
    get: function() {
        return MessagingOngoingStaleJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _types = require("twenty-shared/types");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _messagechannelsyncstatusservice = require("../../common/services/message-channel-sync-status.service");
const _issyncstaleutil = require("../utils/is-sync-stale.util");
const _toIsoStringOrNull = require("../../../../utils/date/toIsoStringOrNull");
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
let MessagingOngoingStaleJob = class MessagingOngoingStaleJob {
    async handle(data) {
        const { workspaceId } = data;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageChannels = await this.messageChannelRepository.find({
                where: {
                    syncStage: (0, _typeorm1.In)([
                        _types.MessageChannelSyncStage.MESSAGES_IMPORT_ONGOING,
                        _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_ONGOING,
                        _types.MessageChannelSyncStage.MESSAGES_IMPORT_SCHEDULED,
                        _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_SCHEDULED
                    ]),
                    workspaceId
                }
            });
            for (const messageChannel of messageChannels){
                if ((0, _issyncstaleutil.isSyncStale)((0, _toIsoStringOrNull.toIsoStringOrNull)(messageChannel.syncStageStartedAt))) {
                    await this.messageChannelSyncStatusService.resetSyncStageStartedAt([
                        messageChannel.id
                    ], workspaceId);
                    switch(messageChannel.syncStage){
                        case _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_ONGOING:
                        case _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_SCHEDULED:
                            this.logger.log(`Sync for message channel ${messageChannel.id} and workspace ${workspaceId} is stale. Setting sync stage to MESSAGE_LIST_FETCH_PENDING`);
                            await this.messageChannelSyncStatusService.markAsMessagesListFetchPending([
                                messageChannel.id
                            ], workspaceId);
                            break;
                        case _types.MessageChannelSyncStage.MESSAGES_IMPORT_ONGOING:
                        case _types.MessageChannelSyncStage.MESSAGES_IMPORT_SCHEDULED:
                            this.logger.log(`Sync for message channel ${messageChannel.id} and workspace ${workspaceId} is stale. Setting sync stage to MESSAGES_IMPORT_PENDING`);
                            await this.messageChannelSyncStatusService.markAsMessagesImportPending([
                                messageChannel.id
                            ], workspaceId);
                            break;
                        default:
                            break;
                    }
                }
            }
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, messageChannelRepository, messageChannelSyncStatusService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageChannelRepository = messageChannelRepository;
        this.messageChannelSyncStatusService = messageChannelSyncStatusService;
        this.logger = new _common.Logger(MessagingOngoingStaleJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(MessagingOngoingStaleJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof MessagingOngoingStaleJobData === "undefined" ? Object : MessagingOngoingStaleJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagingOngoingStaleJob.prototype, "handle", null);
MessagingOngoingStaleJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.messagingQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagechannelsyncstatusservice.MessageChannelSyncStatusService === "undefined" ? Object : _messagechannelsyncstatusservice.MessageChannelSyncStatusService
    ])
], MessagingOngoingStaleJob);

//# sourceMappingURL=messaging-ongoing-stale.job.js.map