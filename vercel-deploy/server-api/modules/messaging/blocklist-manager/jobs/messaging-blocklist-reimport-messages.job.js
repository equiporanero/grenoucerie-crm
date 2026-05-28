"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlocklistReimportMessagesJob", {
    enumerable: true,
    get: function() {
        return BlocklistReimportMessagesJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _userworkspaceentity = require("../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _connectedaccountentity = require("../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _messagechannelsyncstatusservice = require("../../common/services/message-channel-sync-status.service");
const _types = require("twenty-shared/types");
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
let BlocklistReimportMessagesJob = class BlocklistReimportMessagesJob {
    async handle(data) {
        const workspaceId = data.workspaceId;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            for (const eventPayload of data.events){
                const workspaceMemberId = eventPayload.properties.before.workspaceMemberId;
                const workspaceMember = await workspaceMemberRepository.findOne({
                    where: {
                        id: workspaceMemberId
                    }
                });
                if (!workspaceMember) {
                    continue;
                }
                const userWorkspace = await this.userWorkspaceRepository.findOne({
                    where: {
                        userId: workspaceMember.userId,
                        workspaceId
                    }
                });
                if (!userWorkspace) {
                    continue;
                }
                const connectedAccounts = await this.connectedAccountRepository.find({
                    where: {
                        userWorkspaceId: userWorkspace.id,
                        workspaceId
                    }
                });
                const connectedAccountIds = connectedAccounts.map((ca)=>ca.id);
                if (connectedAccountIds.length === 0) {
                    continue;
                }
                const messageChannels = await this.messageChannelRepository.find({
                    where: {
                        connectedAccountId: (0, _typeorm1.In)(connectedAccountIds),
                        syncStage: (0, _typeorm1.Not)(_types.MessageChannelSyncStage.MESSAGE_LIST_FETCH_PENDING),
                        workspaceId
                    }
                });
                await this.messagingChannelSyncStatusService.resetAndMarkAsMessagesListFetchPending(messageChannels.map((messageChannel)=>messageChannel.id), workspaceId);
            }
        }, authContext, {
            lite: true
        });
    }
    constructor(globalWorkspaceOrmManager, messageChannelRepository, connectedAccountRepository, userWorkspaceRepository, messagingChannelSyncStatusService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageChannelRepository = messageChannelRepository;
        this.connectedAccountRepository = connectedAccountRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.messagingChannelSyncStatusService = messagingChannelSyncStatusService;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(BlocklistReimportMessagesJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof BlocklistReimportMessagesJobData === "undefined" ? Object : BlocklistReimportMessagesJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], BlocklistReimportMessagesJob.prototype, "handle", null);
BlocklistReimportMessagesJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.messagingQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(1, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _messagechannelsyncstatusservice.MessageChannelSyncStatusService === "undefined" ? Object : _messagechannelsyncstatusservice.MessageChannelSyncStatusService
    ])
], BlocklistReimportMessagesJob);

//# sourceMappingURL=messaging-blocklist-reimport-messages.job.js.map