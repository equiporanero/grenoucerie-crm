"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingRelaunchFailedMessageChannelJob", {
    enumerable: true,
    get: function() {
        return MessagingRelaunchFailedMessageChannelJob;
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
let MessagingRelaunchFailedMessageChannelJob = class MessagingRelaunchFailedMessageChannelJob {
    async handle(data) {
        const { workspaceId, messageChannelId } = data;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageChannel = await this.messageChannelRepository.findOne({
                where: {
                    id: messageChannelId,
                    workspaceId
                }
            });
            if (!messageChannel || messageChannel.syncStage !== _types.MessageChannelSyncStage.FAILED || messageChannel.syncStatus !== _types.MessageChannelSyncStatus.FAILED_UNKNOWN) {
                return;
            }
            await this.messageChannelRepository.update({
                id: messageChannelId,
                workspaceId
            }, {
                syncStage: _types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_PENDING,
                syncStatus: _types.MessageChannelSyncStatus.ACTIVE,
                throttleFailureCount: 0,
                throttleRetryAfter: null,
                syncStageStartedAt: null
            });
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, messageChannelRepository){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageChannelRepository = messageChannelRepository;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(MessagingRelaunchFailedMessageChannelJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof MessagingRelaunchFailedMessageChannelJobData === "undefined" ? Object : MessagingRelaunchFailedMessageChannelJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], MessagingRelaunchFailedMessageChannelJob.prototype, "handle", null);
MessagingRelaunchFailedMessageChannelJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.messagingQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], MessagingRelaunchFailedMessageChannelJob);

//# sourceMappingURL=messaging-relaunch-failed-message-channel.job.js.map