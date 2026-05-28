"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentChatResolver", {
    enumerable: true,
    get: function() {
        return AgentChatResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _graphqltypejson = /*#__PURE__*/ _interop_require_default(require("graphql-type-json"));
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _metadataresolverdecorator = require("../../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _billingusageservice = require("../../../../core-modules/billing/services/billing-usage.service");
const _redisclientservice = require("../../../../core-modules/redis-client/redis-client.service");
const _todisplaycreditsutil = require("../../../../core-modules/usage/utils/to-display-credits.util");
const _authuserworkspaceiddecorator = require("../../../../decorators/auth/auth-user-workspace-id.decorator");
const _authworkspacedecorator = require("../../../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../../guards/workspace-auth.guard");
const _agentmessagedto = require("../../ai-agent-execution/dtos/agent-message.dto");
const _agentchatthreaddto = require("../dtos/agent-chat-thread.dto");
const _fileattachmentinput = require("../dtos/file-attachment.input");
const _aisystempromptpreviewdto = require("../dtos/ai-system-prompt-preview.dto");
const _chatstreamcatchupchunksdto = require("../dtos/chat-stream-catchup-chunks.dto");
const _sendchatmessageresultdto = require("../dtos/send-chat-message-result.dto");
const _agentchatthreadentity = require("../entities/agent-chat-thread.entity");
const _agentchateventpublisherservice = require("../services/agent-chat-event-publisher.service");
const _agentchatstreamingservice = require("../services/agent-chat-streaming.service");
const _agentchatservice = require("../services/agent-chat.service");
const _systempromptbuilderservice = require("../services/system-prompt-builder.service");
const _getcancelchannelutil = require("../utils/get-cancel-channel.util");
const _aimodelregistryservice = require("../../ai-models/services/ai-model-registry.service");
const _aiexception = require("../../ai.exception");
const _aigraphqlapiexceptioninterceptor = require("../../interceptors/ai-graphql-api-exception.interceptor");
const _injectworkspacescopedrepositorydecorator = require("../../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let AgentChatResolver = class AgentChatResolver {
    async chatThreads(userWorkspaceId, { id: workspaceId }) {
        return this.agentChatService.getThreadsForUser({
            userWorkspaceId,
            workspaceId
        });
    }
    async chatThread(id, userWorkspaceId, { id: workspaceId }) {
        return this.agentChatService.getThreadById({
            threadId: id,
            userWorkspaceId,
            workspaceId
        });
    }
    async chatMessages(threadId, userWorkspaceId, { id: workspaceId }) {
        return this.agentChatService.getMessagesForThread({
            threadId,
            userWorkspaceId,
            workspaceId
        });
    }
    async chatStreamCatchupChunks(threadId, userWorkspaceId, { id: workspaceId }) {
        await this.agentChatService.getThreadById({
            threadId,
            userWorkspaceId,
            workspaceId
        });
        return this.eventPublisherService.getAccumulatedChunks(threadId);
    }
    async createChatThread(userWorkspaceId, workspace) {
        return this.agentChatService.createThread({
            userWorkspaceId,
            workspaceId: workspace.id
        });
    }
    async sendChatMessage(threadId, text, messageId, browsingContext, modelId, fileAttachments, userWorkspaceId, workspace) {
        if (this.aiModelRegistryService.getAvailableModels().length === 0) {
            throw new _aiexception.AiException('No AI models are available. Configure at least one AI provider.', _aiexception.AiExceptionCode.API_KEY_NOT_CONFIGURED);
        }
        const resolvedModelId = modelId ?? workspace.smartModel;
        this.aiModelRegistryService.validateModelAvailability(resolvedModelId, workspace);
        await this.billingUsageService.hasAvailableCreditsOrThrow(workspace.id);
        const thread = await this.threadRepository.findOne(workspace.id, {
            where: {
                id: threadId,
                userWorkspaceId
            }
        });
        if (!(0, _utils.isDefined)(thread)) {
            throw new _aiexception.AiException('Thread not found', _aiexception.AiExceptionCode.THREAD_NOT_FOUND);
        }
        if ((0, _utils.isDefined)(thread.deletedAt)) {
            await this.agentChatService.unarchiveThread({
                threadId,
                userWorkspaceId,
                workspaceId: workspace.id
            });
        }
        if ((0, _utils.isDefined)(thread.activeStreamId)) {
            const queuedMessage = await this.agentChatService.queueMessage({
                threadId,
                text,
                id: messageId,
                fileAttachments: fileAttachments ?? undefined,
                workspaceId: workspace.id,
                userWorkspaceId
            });
            await this.eventPublisherService.publish({
                threadId,
                workspaceId: workspace.id,
                event: {
                    type: 'queue-updated'
                }
            });
            return {
                messageId: queuedMessage.id,
                queued: true
            };
        }
        const result = await this.agentChatStreamingService.streamAgentChat({
            threadId,
            browsingContext: browsingContext ?? null,
            modelId,
            userWorkspaceId,
            workspace,
            text,
            messageId,
            fileAttachments: fileAttachments ?? undefined
        });
        return {
            messageId: result.messageId,
            queued: false,
            streamId: result.streamId
        };
    }
    async stopAgentChatStream(threadId, userWorkspaceId, { id: workspaceId }) {
        const thread = await this.threadRepository.findOne(workspaceId, {
            where: {
                id: threadId,
                userWorkspaceId
            }
        });
        if (!(0, _utils.isDefined)(thread) || !(0, _utils.isDefined)(thread.activeStreamId)) {
            return true;
        }
        const redis = this.redisClientService.getClient();
        await redis.publish((0, _getcancelchannelutil.getCancelChannel)(threadId), 'cancel');
        await this.threadRepository.update(workspaceId, {
            id: threadId,
            userWorkspaceId
        }, {
            activeStreamId: null
        });
        return true;
    }
    async renameChatThread(id, title, userWorkspaceId, { id: workspaceId }) {
        return this.agentChatService.updateThreadTitle({
            threadId: id,
            userWorkspaceId,
            workspaceId,
            title
        });
    }
    async archiveChatThread(id, userWorkspaceId, { id: workspaceId }) {
        await this.cancelActiveStreamIfAny(id, userWorkspaceId, workspaceId);
        return this.agentChatService.archiveThread({
            threadId: id,
            userWorkspaceId,
            workspaceId
        });
    }
    async unarchiveChatThread(id, userWorkspaceId, { id: workspaceId }) {
        return this.agentChatService.unarchiveThread({
            threadId: id,
            userWorkspaceId,
            workspaceId
        });
    }
    async deleteChatThread(id, userWorkspaceId, { id: workspaceId }) {
        await this.cancelActiveStreamIfAny(id, userWorkspaceId, workspaceId);
        await this.agentChatService.hardDeleteThread({
            threadId: id,
            userWorkspaceId,
            workspaceId
        });
        return true;
    }
    async cancelActiveStreamIfAny(threadId, userWorkspaceId, workspaceId) {
        const thread = await this.threadRepository.findOne(workspaceId, {
            where: {
                id: threadId,
                userWorkspaceId
            }
        });
        if (!(0, _utils.isDefined)(thread) || !(0, _utils.isDefined)(thread.activeStreamId)) {
            return;
        }
        const redis = this.redisClientService.getClient();
        await redis.publish((0, _getcancelchannelutil.getCancelChannel)(threadId), 'cancel');
    }
    async deleteQueuedChatMessage(messageId, userWorkspaceId, workspace) {
        const message = await this.agentChatService.findQueuedMessage({
            messageId,
            workspaceId: workspace.id
        });
        if (!(0, _utils.isDefined)(message)) {
            throw new _aiexception.AiException('Queued message not found', _aiexception.AiExceptionCode.MESSAGE_NOT_FOUND);
        }
        const thread = await this.threadRepository.findOne(workspace.id, {
            where: {
                id: message.threadId,
                userWorkspaceId
            }
        });
        if (!(0, _utils.isDefined)(thread)) {
            throw new _aiexception.AiException('Thread not found', _aiexception.AiExceptionCode.THREAD_NOT_FOUND);
        }
        const deleted = await this.agentChatService.deleteQueuedMessage({
            messageId,
            workspaceId: workspace.id
        });
        if (deleted) {
            await this.eventPublisherService.publish({
                threadId: message.threadId,
                workspaceId: workspace.id,
                event: {
                    type: 'queue-updated'
                }
            });
        }
        return deleted;
    }
    async getAiSystemPromptPreview(workspace, userWorkspaceId) {
        return this.systemPromptBuilderService.buildPreview(workspace.id, userWorkspaceId, workspace.aiAdditionalInstructions ?? undefined);
    }
    totalInputCredits(thread) {
        return (0, _todisplaycreditsutil.toDisplayCredits)(thread.totalInputCredits);
    }
    totalOutputCredits(thread) {
        return (0, _todisplaycreditsutil.toDisplayCredits)(thread.totalOutputCredits);
    }
    async lastMessageAt(thread) {
        if (thread.lastMessageAt !== undefined) {
            return thread.lastMessageAt;
        }
        return this.agentChatService.getLastMessageAtForThread({
            threadId: thread.id,
            workspaceId: thread.workspaceId
        });
    }
    constructor(agentChatService, agentChatStreamingService, eventPublisherService, systemPromptBuilderService, billingUsageService, aiModelRegistryService, redisClientService, threadRepository){
        this.agentChatService = agentChatService;
        this.agentChatStreamingService = agentChatStreamingService;
        this.eventPublisherService = eventPublisherService;
        this.systemPromptBuilderService = systemPromptBuilderService;
        this.billingUsageService = billingUsageService;
        this.aiModelRegistryService = aiModelRegistryService;
        this.redisClientService = redisClientService;
        this.threadRepository = threadRepository;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _agentchatthreaddto.AgentChatThreadDTO
        ]),
    _ts_param(0, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "chatThreads", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_agentchatthreaddto.AgentChatThreadDTO),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "chatThread", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _agentmessagedto.AgentMessageDTO
        ]),
    _ts_param(0, (0, _graphql.Args)('threadId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "chatMessages", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_chatstreamcatchupchunksdto.ChatStreamCatchupChunksDTO),
    _ts_param(0, (0, _graphql.Args)('threadId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "chatStreamCatchupChunks", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_agentchatthreaddto.AgentChatThreadDTO),
    _ts_param(0, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "createChatThread", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_sendchatmessageresultdto.SendChatMessageResultDTO),
    _ts_param(0, (0, _graphql.Args)('threadId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _graphql.Args)('text')),
    _ts_param(2, (0, _graphql.Args)('messageId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(3, (0, _graphql.Args)('browsingContext', {
        type: ()=>_graphqltypejson.default,
        nullable: true
    })),
    _ts_param(4, (0, _graphql.Args)('modelId', {
        type: ()=>String,
        nullable: true
    })),
    _ts_param(5, (0, _graphql.Args)('fileAttachments', {
        type: ()=>[
                _fileattachmentinput.FileAttachmentInput
            ],
        nullable: true
    })),
    _ts_param(6, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(7, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        String,
        Object,
        Object,
        Object,
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "sendChatMessage", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _graphql.Args)('threadId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "stopAgentChatStream", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_agentchatthreaddto.AgentChatThreadDTO),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _graphql.Args)('title')),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(3, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "renameChatThread", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_agentchatthreaddto.AgentChatThreadDTO),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "archiveChatThread", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_agentchatthreaddto.AgentChatThreadDTO),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "unarchiveChatThread", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _graphql.Args)('id', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "deleteChatThread", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _graphql.Args)('messageId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "deleteQueuedChatMessage", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_aisystempromptpreviewdto.AiSystemPromptPreviewDTO),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(1, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "getAiSystemPromptPreview", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_graphql.Float),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _agentchatthreadentity.AgentChatThreadEntity === "undefined" ? Object : _agentchatthreadentity.AgentChatThreadEntity
    ]),
    _ts_metadata("design:returntype", Number)
], AgentChatResolver.prototype, "totalInputCredits", null);
_ts_decorate([
    (0, _graphql.ResolveField)(()=>_graphql.Float),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _agentchatthreadentity.AgentChatThreadEntity === "undefined" ? Object : _agentchatthreadentity.AgentChatThreadEntity
    ]),
    _ts_metadata("design:returntype", Number)
], AgentChatResolver.prototype, "totalOutputCredits", null);
_ts_decorate([
    (0, _graphql.ResolveField)('lastMessageAt', ()=>Date, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Parent)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatResolver.prototype, "lastMessageAt", null);
AgentChatResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.AI)),
    (0, _common.UseInterceptors)(_aigraphqlapiexceptioninterceptor.AiGraphqlApiExceptionInterceptor),
    (0, _metadataresolverdecorator.MetadataResolver)(()=>_agentchatthreaddto.AgentChatThreadDTO),
    _ts_param(7, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agentchatthreadentity.AgentChatThreadEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _agentchatservice.AgentChatService === "undefined" ? Object : _agentchatservice.AgentChatService,
        typeof _agentchatstreamingservice.AgentChatStreamingService === "undefined" ? Object : _agentchatstreamingservice.AgentChatStreamingService,
        typeof _agentchateventpublisherservice.AgentChatEventPublisherService === "undefined" ? Object : _agentchateventpublisherservice.AgentChatEventPublisherService,
        typeof _systempromptbuilderservice.SystemPromptBuilderService === "undefined" ? Object : _systempromptbuilderservice.SystemPromptBuilderService,
        typeof _billingusageservice.BillingUsageService === "undefined" ? Object : _billingusageservice.BillingUsageService,
        typeof _aimodelregistryservice.AiModelRegistryService === "undefined" ? Object : _aimodelregistryservice.AiModelRegistryService,
        typeof _redisclientservice.RedisClientService === "undefined" ? Object : _redisclientservice.RedisClientService,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository
    ])
], AgentChatResolver);

//# sourceMappingURL=agent-chat.resolver.js.map