"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AiChatModule", {
    enumerable: true,
    get: function() {
        return AiChatModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _tokenmodule = require("../../../core-modules/auth/token/token.module");
const _billingmodule = require("../../../core-modules/billing/billing.module");
const _workspacedomainsmodule = require("../../../core-modules/domain/workspace-domains/workspace-domains.module");
const _fileentity = require("../../../core-modules/file/entities/file.entity");
const _filemodule = require("../../../core-modules/file/file.module");
const _throttlermodule = require("../../../core-modules/throttler/throttler.module");
const _toolprovidermodule = require("../../../core-modules/tool-provider/tool-provider.module");
const _userworkspaceentity = require("../../../core-modules/user-workspace/user-workspace.entity");
const _userworkspacemodule = require("../../../core-modules/user-workspace/user-workspace.module");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _aiagentexecutionmodule = require("../ai-agent-execution/ai-agent-execution.module");
const _agentmessagepartentity = require("../ai-agent-execution/entities/agent-message-part.entity");
const _agentmessageentity = require("../ai-agent-execution/entities/agent-message.entity");
const _agentturnentity = require("../ai-agent-execution/entities/agent-turn.entity");
const _metricsmodule = require("../../../core-modules/metrics/metrics.module");
const _aibillingmodule = require("../ai-billing/ai-billing.module");
const _aigraphqlapiexceptioninterceptor = require("../interceptors/ai-graphql-api-exception.interceptor");
const _permissionsmodule = require("../../permissions/permissions.module");
const _skillmodule = require("../../skill/skill.module");
const _twentyormmodule = require("../../../twenty-orm/twenty-orm.module");
const _provideworkspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _workspacecachestoragemodule = require("../../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
const _dashboardtoolsmodule = require("../../../../modules/dashboard/tools/dashboard-tools.module");
const _workflowtoolsmodule = require("../../../../modules/workflow/workflow-tools/workflow-tools.module");
const _agentchatthreadentity = require("./entities/agent-chat-thread.entity");
const _streamagentchatjob = require("./jobs/stream-agent-chat.job");
const _agentchatresolver = require("./resolvers/agent-chat.resolver");
const _agentchatsubscriptionresolver = require("./resolvers/agent-chat-subscription.resolver");
const _agentchatcancelsubscriberservice = require("./services/agent-chat-cancel-subscriber.service");
const _agentchateventpublisherservice = require("./services/agent-chat-event-publisher.service");
const _agentchatstreamingservice = require("./services/agent-chat-streaming.service");
const _agentchatservice = require("./services/agent-chat.service");
const _agenttitlegenerationservice = require("./services/agent-title-generation.service");
const _chatexecutionservice = require("./services/chat-execution.service");
const _messagepruningservice = require("./services/message-pruning.service");
const _systempromptbuilderservice = require("./services/system-prompt-builder.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AiChatModule = class AiChatModule {
};
AiChatModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _agentchatthreadentity.AgentChatThreadEntity,
                _fileentity.FileEntity,
                _userworkspaceentity.UserWorkspaceEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _aiagentexecutionmodule.AiAgentExecutionModule,
            _billingmodule.BillingModule,
            _throttlermodule.ThrottlerModule,
            _filemodule.FileModule,
            _permissionsmodule.PermissionsModule,
            _skillmodule.SkillModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _workspacedomainsmodule.WorkspaceDomainsModule,
            _twentyormmodule.TwentyORMModule,
            _tokenmodule.TokenModule,
            _userworkspacemodule.UserWorkspaceModule,
            _aibillingmodule.AiBillingModule,
            _metricsmodule.MetricsModule,
            _toolprovidermodule.ToolProviderModule,
            _dashboardtoolsmodule.DashboardToolsModule,
            _workflowtoolsmodule.WorkflowToolsModule
        ],
        providers: [
            _agentchatcancelsubscriberservice.AgentChatCancelSubscriberService,
            _agentchateventpublisherservice.AgentChatEventPublisherService,
            _agentchatresolver.AgentChatResolver,
            _agentchatsubscriptionresolver.AgentChatSubscriptionResolver,
            _agentchatservice.AgentChatService,
            _agentchatstreamingservice.AgentChatStreamingService,
            _agenttitlegenerationservice.AgentTitleGenerationService,
            _chatexecutionservice.ChatExecutionService,
            _messagepruningservice.MessagePruningService,
            _streamagentchatjob.StreamAgentChatJob,
            _systempromptbuilderservice.SystemPromptBuilderService,
            _aigraphqlapiexceptioninterceptor.AiGraphqlApiExceptionInterceptor,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_agentchatthreadentity.AgentChatThreadEntity),
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_agentturnentity.AgentTurnEntity),
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_agentmessageentity.AgentMessageEntity),
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_agentmessagepartentity.AgentMessagePartEntity),
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_fileentity.FileEntity)
        ],
        exports: [
            _agentchatservice.AgentChatService,
            _agentchatstreamingservice.AgentChatStreamingService,
            _typeorm.TypeOrmModule.forFeature([
                _agentchatthreadentity.AgentChatThreadEntity
            ])
        ]
    })
], AiChatModule);

//# sourceMappingURL=ai-chat.module.js.map