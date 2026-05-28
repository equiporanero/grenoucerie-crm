"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TimelineMessagingService", {
    enumerable: true,
    get: function() {
        return TimelineMessagingService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _types = require("twenty-shared/types");
const _typeorm1 = require("typeorm");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
const _connectedaccountentity = require("../../../metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../metadata-modules/message-channel/entities/message-channel.entity");
const _globalworkspaceormmanager = require("../../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../../twenty-orm/utils/build-system-auth-context.util");
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
let TimelineMessagingService = class TimelineMessagingService {
    async getAndCountMessageThreads(personIds, workspaceId, offset, pageSize) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageThreadRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageThread');
            const totalNumberOfThreads = await messageThreadRepository.createQueryBuilder('messageThread').innerJoin('messageThread.messages', 'messages').innerJoin('messages.messageParticipants', 'messageParticipants').where('messageParticipants.personId IN(:...personIds)', {
                personIds
            }).groupBy('messageThread.id').getCount();
            const threadIdsQuery = await messageThreadRepository.createQueryBuilder('messageThread').select('messageThread.id', 'id').addSelect('MAX(messages.receivedAt)', 'max_received_at').innerJoin('messageThread.messages', 'messages').innerJoin('messages.messageParticipants', 'messageParticipants').where('messageParticipants.personId IN (:...personIds)', {
                personIds
            }).groupBy('messageThread.id').orderBy('max_received_at', 'DESC').offset(offset).limit(pageSize).getRawMany();
            const messageThreadIds = threadIdsQuery.map((thread)=>thread.id);
            const messageThreads = await messageThreadRepository.find({
                where: {
                    id: (0, _typeorm1.In)(messageThreadIds)
                },
                order: {
                    messages: {
                        receivedAt: 'DESC'
                    }
                },
                relations: [
                    'messages'
                ]
            });
            return {
                messageThreads: messageThreads.map((messageThread)=>{
                    const lastMessage = messageThread.messages[0];
                    const firstMessage = messageThread.messages[messageThread.messages.length - 1];
                    return {
                        id: messageThread.id,
                        subject: firstMessage.subject ?? '',
                        lastMessageBody: lastMessage.text ?? '',
                        lastMessageReceivedAt: lastMessage.receivedAt ?? new Date(),
                        numberOfMessagesInThread: messageThread.messages.length
                    };
                }),
                totalNumberOfThreads
            };
        }, authContext);
    }
    async getThreadParticipantsByThreadId(messageThreadIds, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const messageParticipantRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageParticipant');
            const threadParticipants = await messageParticipantRepository.createQueryBuilder().select('messageParticipant').addSelect('message.messageThreadId').addSelect('message.receivedAt').leftJoinAndSelect('messageParticipant.person', 'person').leftJoinAndSelect('messageParticipant.workspaceMember', 'workspaceMember').leftJoin('messageParticipant.message', 'message').where('message.messageThreadId = ANY(:messageThreadIds)', {
                messageThreadIds
            }).andWhere('messageParticipant.role = :role', {
                role: _types.MessageParticipantRole.FROM
            }).orderBy('message.messageThreadId').distinctOn([
                'message.messageThreadId',
                'messageParticipant.handle'
            ]).getMany();
            const orderedThreadParticipants = threadParticipants.sort((a, b)=>(a.message.receivedAt ?? new Date()).getTime() - (b.message.receivedAt ?? new Date()).getTime());
            const threadParticipantsWithCompositeFields = orderedThreadParticipants.map((threadParticipant)=>({
                    ...threadParticipant,
                    person: {
                        id: threadParticipant.person?.id,
                        name: {
                            //oxlint-disable-next-line
                            //@ts-ignore
                            firstName: threadParticipant.person?.nameFirstName,
                            //oxlint-disable-next-line
                            //@ts-ignore
                            lastName: threadParticipant.person?.nameLastName
                        },
                        avatarUrl: threadParticipant.person?.avatarUrl
                    },
                    workspaceMember: {
                        id: threadParticipant.workspaceMember?.id,
                        name: {
                            //oxlint-disable-next-line
                            //@ts-ignore
                            firstName: threadParticipant.workspaceMember?.nameFirstName,
                            //oxlint-disable-next-line
                            //@ts-ignore
                            lastName: threadParticipant.workspaceMember?.nameLastName
                        },
                        avatarUrl: threadParticipant.workspaceMember?.avatarUrl
                    }
                }));
            return threadParticipantsWithCompositeFields.reduce((threadParticipantsAcc, threadParticipant)=>{
                if (!threadParticipant.message.messageThreadId) return threadParticipantsAcc;
                if (// @ts-expect-error legacy noImplicitAny
                !threadParticipantsAcc[threadParticipant.message.messageThreadId]) // @ts-expect-error legacy noImplicitAny
                threadParticipantsAcc[threadParticipant.message.messageThreadId] = [];
                // @ts-expect-error legacy noImplicitAny
                threadParticipantsAcc[threadParticipant.message.messageThreadId].push(threadParticipant);
                return threadParticipantsAcc;
            }, {});
        }, authContext);
    }
    async getThreadVisibilityByThreadId(messageThreadIds, workspaceMemberId, workspaceId) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(workspaceId);
        return this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            const currentMember = await workspaceMemberRepository.findOne({
                where: {
                    id: workspaceMemberId
                },
                select: {
                    userId: true
                }
            });
            if (!currentMember) {
                return {};
            }
            const currentUserWorkspace = await this.userWorkspaceRepository.findOne({
                where: {
                    userId: currentMember.userId,
                    workspaceId
                },
                select: {
                    id: true
                }
            });
            if (!currentUserWorkspace) {
                return {};
            }
            const currentUserWorkspaceId = currentUserWorkspace.id;
            const messageThreadRepository = await this.globalWorkspaceOrmManager.getRepository(workspaceId, 'messageThread');
            const threadChannelRows = await messageThreadRepository.createQueryBuilder().select('messageThread.id', 'id').addSelect('messageChannelMessageAssociation.messageChannelId', 'messageChannelId').leftJoin('messageThread.messages', 'message').leftJoin('message.messageChannelMessageAssociations', 'messageChannelMessageAssociation').where('messageThread.id = ANY(:messageThreadIds)', {
                messageThreadIds
            }).getRawMany();
            const allMessageChannelIds = [
                ...new Set(threadChannelRows.map((row)=>row.messageChannelId).filter((id)=>id !== null && id !== undefined))
            ];
            if (allMessageChannelIds.length === 0) {
                return {};
            }
            const messageChannels = await this.messageChannelRepository.find({
                where: {
                    id: (0, _typeorm1.In)(allMessageChannelIds),
                    workspaceId
                },
                select: {
                    id: true,
                    visibility: true,
                    connectedAccountId: true
                }
            });
            const allConnectedAccountIds = [
                ...new Set(messageChannels.map((channel)=>channel.connectedAccountId))
            ];
            const ownedAccountIds = new Set((await this.connectedAccountRepository.find({
                where: {
                    id: (0, _typeorm1.In)(allConnectedAccountIds),
                    userWorkspaceId: currentUserWorkspaceId
                },
                select: {
                    id: true
                }
            })).map((account)=>account.id));
            const channelVisibilityMap = new Map(messageChannels.map((channel)=>[
                    channel.id,
                    ownedAccountIds.has(channel.connectedAccountId) ? _types.MessageChannelVisibility.SHARE_EVERYTHING : channel.visibility
                ]));
            const visibilityValues = Object.values(_types.MessageChannelVisibility);
            const threadVisibilityByThreadId = {};
            for (const { id: threadId, messageChannelId } of threadChannelRows){
                if (!messageChannelId) continue;
                const channelVisibility = channelVisibilityMap.get(messageChannelId);
                if (!channelVisibility) continue;
                threadVisibilityByThreadId[threadId] = visibilityValues[Math.max(visibilityValues.indexOf(channelVisibility), visibilityValues.indexOf(threadVisibilityByThreadId[threadId] ?? _types.MessageChannelVisibility.METADATA))];
            }
            return threadVisibilityByThreadId;
        }, authContext);
    }
    constructor(globalWorkspaceOrmManager, messageChannelRepository, connectedAccountRepository, userWorkspaceRepository){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.messageChannelRepository = messageChannelRepository;
        this.connectedAccountRepository = connectedAccountRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
    }
};
TimelineMessagingService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_messagechannelentity.MessageChannelEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_connectedaccountentity.ConnectedAccountEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository
    ])
], TimelineMessagingService);

//# sourceMappingURL=timeline-messaging.service.js.map