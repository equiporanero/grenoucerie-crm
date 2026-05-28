"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BlocklistItemDeleteMessagesJob", {
    enumerable: true,
    get: function() {
        return BlocklistItemDeleteMessagesJob;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _processdecorator = require("../../../../engine/core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../engine/core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../engine/core-modules/message-queue/message-queue.constants");
const _userworkspaceentity = require("../../../../engine/core-modules/user-workspace/user-workspace.entity");
const _connectedaccountentity = require("../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _globalworkspaceormmanager = require("../../../../engine/twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../../engine/twenty-orm/utils/build-system-auth-context.util");
const _messagingmessagecleanerservice = require("../../message-cleaner/services/messaging-message-cleaner.service");
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
let BlocklistItemDeleteMessagesJob = class BlocklistItemDeleteMessagesJob {
    async handle(data) {
        const workspaceId = data.workspaceId;
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const blocklistItemIds = data.events.map((eventPayload)=>eventPayload.recordId);
            const blocklistRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'blocklist');
            const blocklist = await blocklistRepository.find({
                where: {
                    id: (0, _typeorm1.Any)(blocklistItemIds)
                }
            });
            const handlesToDeleteByWorkspaceMemberIdMap = blocklist.reduce((acc, blocklistItem)=>{
                const { handle, workspaceMemberId } = blocklistItem;
                if (!acc.has(workspaceMemberId)) {
                    acc.set(workspaceMemberId, []);
                }
                if (!(0, _utils.isDefined)(handle)) {
                    return acc;
                }
                acc.get(workspaceMemberId)?.push(handle);
                return acc;
            }, new Map());
            const messageChannelMessageAssociationRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageChannelMessageAssociation');
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            for (const workspaceMemberId of handlesToDeleteByWorkspaceMemberIdMap.keys()){
                const handles = handlesToDeleteByWorkspaceMemberIdMap.get(workspaceMemberId);
                if (!handles) {
                    continue;
                }
                const rolesToDelete = [
                    _types.MessageParticipantRole.FROM,
                    _types.MessageParticipantRole.TO
                ];
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
                    select: {
                        id: true,
                        handle: true,
                        connectedAccount: {
                            handleAliases: true
                        }
                    },
                    where: {
                        connectedAccountId: (0, _typeorm1.In)(connectedAccountIds),
                        workspaceId
                    },
                    relations: {
                        connectedAccount: true
                    }
                });
                for (const messageChannel of messageChannels){
                    const messageChannelHandles = [
                        messageChannel.handle
                    ];
                    const handleAliases = messageChannel.connectedAccount?.handleAliases;
                    if ((0, _utils.isDefined)(handleAliases)) {
                        const aliasList = Array.isArray(handleAliases) ? handleAliases : handleAliases.split(',');
                        messageChannelHandles.push(...aliasList);
                    }
                    const handleConditions = handles.map((handle)=>{
                        const isHandleDomain = handle.startsWith('@');
                        return isHandleDomain ? {
                            handle: (0, _typeorm1.And)((0, _typeorm1.Or)((0, _typeorm1.ILike)(`%${handle}`), (0, _typeorm1.ILike)(`%.${handle.slice(1)}`)), (0, _typeorm1.Not)((0, _typeorm1.In)(messageChannelHandles))),
                            role: (0, _typeorm1.In)(rolesToDelete)
                        } : {
                            handle,
                            role: (0, _typeorm1.In)(rolesToDelete)
                        };
                    });
                    const messageChannelMessageAssociationsToDelete = await messageChannelMessageAssociationRepository.find({
                        where: {
                            messageChannelId: messageChannel.id,
                            message: {
                                messageParticipants: handleConditions
                            }
                        }
                    });
                    if (messageChannelMessageAssociationsToDelete.length === 0) {
                        continue;
                    }
                    await messageChannelMessageAssociationRepository.delete(messageChannelMessageAssociationsToDelete.map(({ id })=>id));
                }
            }
            await this.threadCleanerService.cleanOrphanMessagesAndThreads(workspaceId);
        }, authContext, {
            lite: true
        });
    }
    constructor(threadCleanerService, globalWorkspaceOrmManager, messageChannelRepository, connectedAccountRepository, userWorkspaceRepository){
        this.threadCleanerService = threadCleanerService;
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageChannelRepository = messageChannelRepository;
        this.connectedAccountRepository = connectedAccountRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(BlocklistItemDeleteMessagesJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof BlocklistItemDeleteMessagesJobData === "undefined" ? Object : BlocklistItemDeleteMessagesJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], BlocklistItemDeleteMessagesJob.prototype, "handle", null);
BlocklistItemDeleteMessagesJob = _ts_decorate([
    (0, _processordecorator.Processor)({
        queueName: _messagequeueconstants.MessageQueue.messagingQueue,
        scope: _common.Scope.REQUEST
    }),
    _ts_param(2, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagingmessagecleanerservice.MessagingMessageCleanerService === "undefined" ? Object : _messagingmessagecleanerservice.MessagingMessageCleanerService,
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], BlocklistItemDeleteMessagesJob);

//# sourceMappingURL=messaging-blocklist-item-delete-messages.job.js.map