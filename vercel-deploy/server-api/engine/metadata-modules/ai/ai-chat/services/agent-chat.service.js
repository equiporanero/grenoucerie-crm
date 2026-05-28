"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentChatService", {
    enumerable: true,
    get: function() {
        return AgentChatService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("typeorm");
const _fileentity = require("../../../../core-modules/file/entities/file.entity");
const _agentmessagepartentity = require("../../ai-agent-execution/entities/agent-message-part.entity");
const _agentmessageentity = require("../../ai-agent-execution/entities/agent-message.entity");
const _agentturnentity = require("../../ai-agent-execution/entities/agent-turn.entity");
const _mapUIMessagePartsToDBParts = require("../../ai-agent-execution/utils/mapUIMessagePartsToDBParts");
const _agentchatthreadentity = require("../entities/agent-chat-thread.entity");
const _aiexception = require("../../ai.exception");
const _workspaceeventbroadcasterservice = require("../../../../subscriptions/workspace-event-broadcaster/workspace-event-broadcaster.service");
const _injectworkspacescopedrepositorydecorator = require("../../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _todisplaycreditsutil = require("../../../../core-modules/usage/utils/to-display-credits.util");
const _agenttitlegenerationservice = require("./agent-title-generation.service");
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
const serializeThreadForBroadcast = (thread, lastMessageAt)=>({
        id: thread.id,
        title: thread.title,
        totalInputTokens: thread.totalInputTokens,
        totalOutputTokens: thread.totalOutputTokens,
        totalCacheReadTokens: thread.totalCacheReadTokens,
        totalCacheCreationTokens: thread.totalCacheCreationTokens,
        contextWindowTokens: thread.contextWindowTokens,
        conversationSize: thread.conversationSize,
        totalInputCredits: (0, _todisplaycreditsutil.toDisplayCredits)(thread.totalInputCredits),
        totalOutputCredits: (0, _todisplaycreditsutil.toDisplayCredits)(thread.totalOutputCredits),
        deletedAt: thread.deletedAt,
        lastMessageAt,
        createdAt: thread.createdAt,
        updatedAt: thread.updatedAt
    });
let AgentChatService = class AgentChatService {
    async createThread({ userWorkspaceId, workspaceId }) {
        const savedThread = await this.threadRepository.save(workspaceId, {
            userWorkspaceId
        });
        await this.workspaceEventBroadcaster.broadcast({
            workspaceId,
            events: [
                {
                    type: 'created',
                    entityName: 'agentChatThread',
                    recordId: savedThread.id,
                    recipientUserWorkspaceIds: [
                        userWorkspaceId
                    ],
                    properties: {
                        after: serializeThreadForBroadcast(savedThread, null)
                    }
                }
            ]
        });
        return savedThread;
    }
    async getThreadById({ threadId, userWorkspaceId, workspaceId }) {
        const thread = await this.threadRepository.findOne(workspaceId, {
            where: {
                id: threadId,
                userWorkspaceId
            }
        });
        if (!thread) {
            throw new _aiexception.AiException('Thread not found', _aiexception.AiExceptionCode.THREAD_NOT_FOUND);
        }
        return thread;
    }
    async getThreadsForUser({ userWorkspaceId, workspaceId }) {
        // Query builder uses the scoped wrapper's escape hatch; we add the
        // workspaceId predicate manually below.
        const rankedThreads = await this.threadRepository.createQueryBuilder('thread').select('thread.id', 'id').addSelect('MAX(message.createdAt)', 'last_message_at').leftJoin('thread.messages', 'message').where('thread.userWorkspaceId = :userWorkspaceId AND thread.workspaceId = :workspaceId', {
            userWorkspaceId,
            workspaceId
        }).groupBy('thread.id').orderBy('last_message_at', 'DESC', 'NULLS LAST').addOrderBy('thread.updatedAt', 'DESC').getRawMany();
        if (rankedThreads.length === 0) {
            return [];
        }
        const rankedThreadIds = rankedThreads.map((rankedThread)=>rankedThread.id);
        const threads = await this.threadRepository.find(workspaceId, {
            where: {
                id: (0, _typeorm.In)(rankedThreadIds),
                userWorkspaceId
            }
        });
        const threadById = new Map(threads.map((thread)=>[
                thread.id,
                thread
            ]));
        return rankedThreads.flatMap((rankedThread)=>{
            const thread = threadById.get(rankedThread.id);
            return thread ? [
                {
                    ...thread,
                    lastMessageAt: rankedThread.last_message_at ?? null
                }
            ] : [];
        });
    }
    async getLastMessageAtForThread({ threadId, workspaceId }) {
        const result = await this.messageRepository.createQueryBuilder('message').select('MAX(message.createdAt)', 'last_message_at').where('message.threadId = :threadId AND message.workspaceId = :workspaceId', {
            threadId,
            workspaceId
        }).getRawOne();
        return result?.last_message_at ?? null;
    }
    async addMessage({ threadId, uiMessage, agentId, turnId, id, workspaceId }) {
        let actualTurnId = turnId;
        if (!actualTurnId) {
            const turnInsertResult = await this.turnRepository.insert(workspaceId, {
                threadId,
                agentId: agentId ?? null
            });
            actualTurnId = turnInsertResult.identifiers[0].id;
        }
        const messageValues = {
            ...id ? {
                id
            } : {},
            threadId,
            turnId: actualTurnId,
            role: uiMessage.role,
            agentId: agentId ?? null,
            processedAt: new Date()
        };
        const insertResult = await this.messageRepository.insert(workspaceId, messageValues);
        const savedMessageId = id ?? insertResult.identifiers[0].id;
        if (uiMessage.parts && uiMessage.parts.length > 0) {
            const dbParts = (0, _mapUIMessagePartsToDBParts.mapUIMessagePartsToDBParts)(uiMessage.parts, savedMessageId, workspaceId);
            await this.messagePartRepository.insert(workspaceId, dbParts);
        }
        return {
            id: savedMessageId,
            threadId,
            turnId: actualTurnId,
            role: uiMessage.role,
            agentId: agentId ?? null,
            processedAt: new Date(),
            workspaceId
        };
    }
    async getMessagesForThread({ threadId, userWorkspaceId, workspaceId }) {
        // getThreadById enforces ownership; messages then scoped by both
        // threadId and workspaceId.
        await this.getThreadById({
            threadId,
            userWorkspaceId,
            workspaceId
        });
        return this.messageRepository.find(workspaceId, {
            where: {
                threadId
            },
            order: {
                processedAt: {
                    direction: 'ASC',
                    nulls: 'LAST'
                }
            },
            relations: [
                'parts',
                'parts.file'
            ]
        });
    }
    async queueMessage({ threadId, text, id, fileAttachments, workspaceId, userWorkspaceId }) {
        const messageValues = {
            ...id ? {
                id
            } : {},
            threadId,
            turnId: null,
            role: _agentmessageentity.AgentMessageRole.USER,
            agentId: null,
            status: _agentmessageentity.AgentMessageStatus.QUEUED
        };
        const insertResult = await this.messageRepository.insert(workspaceId, messageValues);
        const savedMessageId = id ?? insertResult.identifiers[0].id;
        const validFiles = fileAttachments && fileAttachments.length > 0 ? await this.fileRepository.find(workspaceId, {
            where: {
                id: (0, _typeorm.In)(fileAttachments.map((attachment)=>attachment.id))
            },
            select: [
                'id'
            ]
        }) : [];
        const validFileIds = new Set(validFiles.map((file)=>file.id));
        const parts = [
            {
                messageId: savedMessageId,
                orderIndex: 0,
                type: 'text',
                textContent: text
            },
            ...(fileAttachments ?? []).filter((attachment)=>validFileIds.has(attachment.id)).map((attachment, index)=>({
                    messageId: savedMessageId,
                    orderIndex: index + 1,
                    type: 'file',
                    fileId: attachment.id,
                    fileFilename: attachment.filename
                }))
        ];
        await this.messagePartRepository.insert(workspaceId, parts);
        await this.notifyThreadActivityUpdated({
            threadId,
            userWorkspaceId,
            workspaceId
        });
        return {
            id: savedMessageId,
            ...messageValues,
            workspaceId
        };
    }
    async getQueuedMessages({ threadId, workspaceId }) {
        return this.messageRepository.find(workspaceId, {
            where: {
                threadId,
                status: _agentmessageentity.AgentMessageStatus.QUEUED
            },
            order: {
                createdAt: 'ASC'
            },
            relations: [
                'parts',
                'parts.file'
            ]
        });
    }
    async findQueuedMessage({ messageId, workspaceId }) {
        return this.messageRepository.findOne(workspaceId, {
            where: {
                id: messageId,
                status: _agentmessageentity.AgentMessageStatus.QUEUED
            }
        });
    }
    async deleteQueuedMessage({ messageId, workspaceId }) {
        const result = await this.messageRepository.delete(workspaceId, {
            id: messageId,
            status: _agentmessageentity.AgentMessageStatus.QUEUED
        });
        return (result.affected ?? 0) > 0;
    }
    async promoteQueuedMessage({ messageId, threadId, workspaceId }) {
        const turnInsertResult = await this.turnRepository.insert(workspaceId, {
            threadId,
            agentId: null
        });
        const savedTurnId = turnInsertResult.identifiers[0].id;
        const result = await this.messageRepository.update(workspaceId, {
            id: messageId,
            threadId,
            status: _agentmessageentity.AgentMessageStatus.QUEUED
        }, {
            status: _agentmessageentity.AgentMessageStatus.SENT,
            processedAt: new Date(),
            turnId: savedTurnId
        });
        if ((result.affected ?? 0) === 0) {
            await this.turnRepository.delete(workspaceId, {
                id: savedTurnId
            });
            return null;
        }
        return savedTurnId;
    }
    async updateThreadTitle({ threadId, userWorkspaceId, workspaceId, title }) {
        const trimmed = title.trim();
        if (trimmed.length === 0) {
            throw new _aiexception.AiException('Chat thread title cannot be empty', _aiexception.AiExceptionCode.INVALID_CHAT_THREAD_TITLE);
        }
        const result = await this.threadRepository.update(workspaceId, {
            id: threadId,
            userWorkspaceId
        }, {
            title: trimmed
        });
        if (result.affected === 0) {
            throw new _aiexception.AiException('Thread not found', _aiexception.AiExceptionCode.THREAD_NOT_FOUND);
        }
        const updated = await this.getThreadById({
            threadId,
            userWorkspaceId,
            workspaceId
        });
        await this.broadcastThreadUpdated(updated, [
            'title'
        ], userWorkspaceId);
        return updated;
    }
    async archiveThread({ threadId, userWorkspaceId, workspaceId }) {
        const thread = await this.getThreadById({
            threadId,
            userWorkspaceId,
            workspaceId
        });
        if (thread.deletedAt) {
            return thread;
        }
        const deletedAt = new Date();
        const result = await this.threadRepository.update(workspaceId, {
            id: threadId,
            userWorkspaceId,
            deletedAt: (0, _typeorm.IsNull)()
        }, {
            deletedAt,
            activeStreamId: null
        });
        if ((result.affected ?? 0) === 0) {
            return thread;
        }
        thread.deletedAt = deletedAt;
        thread.activeStreamId = null;
        await this.broadcastThreadUpdated(thread, [
            'deletedAt'
        ], userWorkspaceId);
        return thread;
    }
    async unarchiveThread({ threadId, userWorkspaceId, workspaceId }) {
        const thread = await this.getThreadById({
            threadId,
            userWorkspaceId,
            workspaceId
        });
        if (!thread.deletedAt) {
            return thread;
        }
        const result = await this.threadRepository.update(workspaceId, {
            id: threadId,
            userWorkspaceId,
            deletedAt: (0, _typeorm.Not)((0, _typeorm.IsNull)())
        }, {
            deletedAt: null
        });
        if ((result.affected ?? 0) === 0) {
            return thread;
        }
        thread.deletedAt = null;
        await this.broadcastThreadUpdated(thread, [
            'deletedAt'
        ], userWorkspaceId);
        return thread;
    }
    async hardDeleteThread({ threadId, userWorkspaceId, workspaceId }) {
        const thread = await this.threadRepository.findOne(workspaceId, {
            where: {
                id: threadId,
                userWorkspaceId
            }
        });
        if (!thread) {
            throw new _aiexception.AiException('Thread not found', _aiexception.AiExceptionCode.THREAD_NOT_FOUND);
        }
        const result = await this.threadRepository.delete(workspaceId, {
            id: threadId,
            userWorkspaceId
        });
        if ((result.affected ?? 0) === 0) {
            this.logger.warn(`hardDeleteThread: thread ${threadId} vanished between fetch and delete`);
            return;
        }
        await this.workspaceEventBroadcaster.broadcast({
            workspaceId: thread.workspaceId,
            events: [
                {
                    type: 'deleted',
                    entityName: 'agentChatThread',
                    recordId: threadId,
                    recipientUserWorkspaceIds: [
                        userWorkspaceId
                    ],
                    properties: {
                        before: serializeThreadForBroadcast(thread, null)
                    }
                }
            ]
        });
    }
    async notifyThreadActivityUpdated({ threadId, userWorkspaceId, workspaceId }) {
        const thread = await this.getThreadById({
            threadId,
            userWorkspaceId,
            workspaceId
        });
        await this.broadcastThreadUpdated(thread, [
            'lastMessageAt'
        ], userWorkspaceId);
    }
    async notifyThreadUsageUpdated({ threadId, userWorkspaceId, workspaceId }) {
        const thread = await this.getThreadById({
            threadId,
            userWorkspaceId,
            workspaceId
        });
        await this.broadcastThreadUpdated(thread, [
            'totalInputTokens',
            'totalOutputTokens',
            'totalInputCredits',
            'totalOutputCredits',
            'conversationSize',
            'contextWindowTokens'
        ], userWorkspaceId);
    }
    async broadcastThreadUpdated(thread, updatedFields, userWorkspaceId) {
        const lastMessageAt = await this.getLastMessageAtForThread({
            threadId: thread.id,
            workspaceId: thread.workspaceId
        });
        await this.workspaceEventBroadcaster.broadcast({
            workspaceId: thread.workspaceId,
            events: [
                {
                    type: 'updated',
                    entityName: 'agentChatThread',
                    recordId: thread.id,
                    recipientUserWorkspaceIds: [
                        userWorkspaceId
                    ],
                    properties: {
                        updatedFields,
                        after: serializeThreadForBroadcast(thread, lastMessageAt)
                    }
                }
            ]
        });
    }
    async generateTitleIfNeeded({ threadId, messageContent, workspaceId }) {
        const thread = await this.threadRepository.findOne(workspaceId, {
            where: {
                id: threadId
            }
        });
        if (!thread || thread.title || !messageContent) {
            return null;
        }
        const title = await this.titleGenerationService.generateThreadTitle(messageContent, workspaceId, thread.userWorkspaceId);
        await this.threadRepository.update(workspaceId, {
            id: threadId
        }, {
            title
        });
        await this.broadcastThreadUpdated({
            ...thread,
            title
        }, [
            'title'
        ], thread.userWorkspaceId);
        return title;
    }
    constructor(threadRepository, turnRepository, messageRepository, messagePartRepository, fileRepository, titleGenerationService, workspaceEventBroadcaster){
        this.threadRepository = threadRepository;
        this.turnRepository = turnRepository;
        this.messageRepository = messageRepository;
        this.messagePartRepository = messagePartRepository;
        this.fileRepository = fileRepository;
        this.titleGenerationService = titleGenerationService;
        this.workspaceEventBroadcaster = workspaceEventBroadcaster;
        this.logger = new _common.Logger(AgentChatService.name);
    }
};
AgentChatService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agentchatthreadentity.AgentChatThreadEntity)),
    _ts_param(1, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agentturnentity.AgentTurnEntity)),
    _ts_param(2, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agentmessageentity.AgentMessageEntity)),
    _ts_param(3, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agentmessagepartentity.AgentMessagePartEntity)),
    _ts_param(4, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_fileentity.FileEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _agenttitlegenerationservice.AgentTitleGenerationService === "undefined" ? Object : _agenttitlegenerationservice.AgentTitleGenerationService,
        typeof _workspaceeventbroadcasterservice.WorkspaceEventBroadcaster === "undefined" ? Object : _workspaceeventbroadcasterservice.WorkspaceEventBroadcaster
    ])
], AgentChatService);

//# sourceMappingURL=agent-chat.service.js.map