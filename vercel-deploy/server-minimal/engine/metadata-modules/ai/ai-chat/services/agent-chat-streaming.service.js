"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentChatStreamingService", {
    enumerable: true,
    get: function() {
        return AgentChatStreamingService;
    }
});
const _common = require("@nestjs/common");
const _ai = require("ai");
const _ai1 = require("twenty-shared/ai");
const _types = require("twenty-shared/types");
const _typeorm = require("typeorm");
const _fileentity = require("../../../../core-modules/file/entities/file.entity");
const _fileurlservice = require("../../../../core-modules/file/file-url/file-url.service");
const _messagequeuedecorator = require("../../../../core-modules/message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../../../core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../core-modules/message-queue/services/message-queue.service");
const _agentmessageentity = require("../../ai-agent-execution/entities/agent-message.entity");
const _mapDBPartsToUIMessageParts = require("../../ai-agent-execution/utils/mapDBPartsToUIMessageParts");
const _agentchatthreadentity = require("../entities/agent-chat-thread.entity");
const _streamagentchatjobnameconstant = require("../jobs/stream-agent-chat-job-name.constant");
const _agentchateventpublisherservice = require("./agent-chat-event-publisher.service");
const _agentchatservice = require("./agent-chat.service");
const _aiexception = require("../../ai.exception");
const _injectworkspacescopedrepositorydecorator = require("../../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
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
let AgentChatStreamingService = class AgentChatStreamingService {
    async streamAgentChat({ threadId, userWorkspaceId, workspace, text, browsingContext, modelId, messageId, fileAttachments }) {
        const thread = await this.threadRepository.findOne(workspace.id, {
            where: {
                id: threadId,
                userWorkspaceId
            }
        });
        if (!thread) {
            throw new _aiexception.AiException('Thread not found', _aiexception.AiExceptionCode.THREAD_NOT_FOUND);
        }
        const fileParts = await this.buildFilePartsFromAttachments(fileAttachments, workspace.id);
        const userMessageParts = [
            {
                type: 'text',
                text
            },
            ...fileParts
        ];
        const savedUserMessage = await this.agentChatService.addMessage({
            threadId,
            id: messageId,
            uiMessage: {
                role: _agentmessageentity.AgentMessageRole.USER,
                parts: userMessageParts
            },
            workspaceId: workspace.id
        });
        await this.agentChatService.notifyThreadActivityUpdated({
            threadId,
            userWorkspaceId,
            workspaceId: workspace.id
        });
        const previousMessages = await this.loadMessagesFromDB(threadId, userWorkspaceId, workspace.id);
        const streamId = (0, _ai.generateId)();
        await this.messageQueueService.add(_streamagentchatjobnameconstant.STREAM_AGENT_CHAT_JOB_NAME, {
            threadId: thread.id,
            streamId,
            userWorkspaceId,
            workspaceId: workspace.id,
            messages: previousMessages,
            browsingContext,
            modelId,
            lastUserMessageText: text,
            lastUserMessageParts: userMessageParts,
            hasTitle: !!thread.title,
            conversationSizeTokens: thread.conversationSize,
            existingTurnId: savedUserMessage.turnId ?? undefined
        });
        await this.threadRepository.update(workspace.id, {
            id: thread.id
        }, {
            activeStreamId: streamId
        });
        return {
            streamId,
            messageId: savedUserMessage.id
        };
    }
    async flushNextQueuedMessage(threadId, userWorkspaceId, workspaceId, hasTitle) {
        const threadStatus = await this.threadRepository.findOne(workspaceId, {
            where: {
                id: threadId
            },
            select: [
                'id',
                'deletedAt'
            ]
        });
        if (!threadStatus || threadStatus.deletedAt) {
            return;
        }
        const queuedMessages = await this.agentChatService.getQueuedMessages({
            threadId,
            workspaceId
        });
        const nextQueued = queuedMessages[0];
        if (!nextQueued) {
            return;
        }
        const textPart = nextQueued.parts?.find((part)=>part.type === 'text');
        const messageText = textPart?.textContent ?? '';
        const fileParts = (nextQueued.parts ?? []).filter((part)=>part.type === 'file').map((part)=>({
                type: 'file',
                mediaType: part.file?.mimeType ?? 'application/octet-stream',
                filename: part.fileFilename ?? '',
                url: '',
                fileId: part.fileId ?? ''
            }));
        if (messageText === '' && fileParts.length === 0) {
            await this.agentChatService.deleteQueuedMessage({
                messageId: nextQueued.id,
                workspaceId
            });
            return;
        }
        const turnId = await this.agentChatService.promoteQueuedMessage({
            messageId: nextQueued.id,
            threadId,
            workspaceId
        });
        if (turnId === null) {
            return;
        }
        await this.eventPublisherService.publish({
            threadId,
            workspaceId,
            event: {
                type: 'queue-updated'
            }
        });
        await this.eventPublisherService.publish({
            threadId,
            workspaceId,
            event: {
                type: 'message-persisted',
                messageId: nextQueued.id
            }
        });
        const [uiMessages, thread] = await Promise.all([
            this.loadMessagesFromDB(threadId, userWorkspaceId, workspaceId),
            this.threadRepository.findOneOrFail(workspaceId, {
                where: {
                    id: threadId
                }
            })
        ]);
        const streamId = (0, _ai.generateId)();
        const lastUserMessageParts = [
            ...messageText !== '' ? [
                {
                    type: 'text',
                    text: messageText
                }
            ] : [],
            ...fileParts
        ];
        await this.messageQueueService.add(_streamagentchatjobnameconstant.STREAM_AGENT_CHAT_JOB_NAME, {
            threadId,
            streamId,
            userWorkspaceId,
            workspaceId,
            messages: uiMessages,
            browsingContext: null,
            lastUserMessageText: messageText,
            lastUserMessageParts,
            hasTitle,
            conversationSizeTokens: thread.conversationSize,
            existingTurnId: turnId
        });
        await this.threadRepository.update(workspaceId, {
            id: threadId
        }, {
            activeStreamId: streamId
        });
    }
    async loadMessagesFromDB(threadId, userWorkspaceId, workspaceId) {
        const allMessages = await this.agentChatService.getMessagesForThread({
            threadId,
            userWorkspaceId,
            workspaceId
        });
        const filteredMessages = allMessages.filter((message)=>message.status !== _agentmessageentity.AgentMessageStatus.QUEUED);
        return Promise.all(filteredMessages.map(async (message)=>({
                id: message.id,
                role: message.role,
                parts: await Promise.all((0, _mapDBPartsToUIMessageParts.mapDBPartsToUIMessageParts)(message.parts ?? []).map(async (part)=>{
                    if ((0, _ai1.isExtendedFileUIPart)(part)) {
                        const filePart = part;
                        return {
                            ...filePart,
                            url: await this.fileUrlService.signFileByIdUrl({
                                fileId: filePart.fileId,
                                workspaceId,
                                fileFolder: _types.FileFolder.AgentChat
                            })
                        };
                    }
                    return part;
                })),
                createdAt: message.createdAt
            })));
    }
    async buildFilePartsFromAttachments(fileAttachments, workspaceId) {
        if (!fileAttachments || fileAttachments.length === 0) {
            return [];
        }
        const fileIds = fileAttachments.map((attachment)=>attachment.id);
        const validFiles = await this.fileRepository.find(workspaceId, {
            where: {
                id: (0, _typeorm.In)(fileIds),
                path: (0, _typeorm.Like)(`${_types.FileFolder.AgentChat}/%`)
            }
        });
        const validFileIds = new Set(validFiles.map((file)=>file.id));
        return fileAttachments.filter((attachment)=>validFileIds.has(attachment.id)).map((attachment)=>{
            const file = validFiles.find((validFile)=>validFile.id === attachment.id);
            return {
                type: 'file',
                mediaType: file?.mimeType ?? 'application/octet-stream',
                filename: attachment.filename,
                url: '',
                fileId: attachment.id
            };
        });
    }
    constructor(threadRepository, fileRepository, messageQueueService, agentChatService, eventPublisherService, fileUrlService){
        this.threadRepository = threadRepository;
        this.fileRepository = fileRepository;
        this.messageQueueService = messageQueueService;
        this.agentChatService = agentChatService;
        this.eventPublisherService = eventPublisherService;
        this.fileUrlService = fileUrlService;
        this.logger = new _common.Logger(AgentChatStreamingService.name);
    }
};
AgentChatStreamingService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agentchatthreadentity.AgentChatThreadEntity)),
    _ts_param(1, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_fileentity.FileEntity)),
    _ts_param(2, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.aiStreamQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService,
        typeof _agentchatservice.AgentChatService === "undefined" ? Object : _agentchatservice.AgentChatService,
        typeof _agentchateventpublisherservice.AgentChatEventPublisherService === "undefined" ? Object : _agentchateventpublisherservice.AgentChatEventPublisherService,
        typeof _fileurlservice.FileUrlService === "undefined" ? Object : _fileurlservice.FileUrlService
    ])
], AgentChatStreamingService);

//# sourceMappingURL=agent-chat-streaming.service.js.map