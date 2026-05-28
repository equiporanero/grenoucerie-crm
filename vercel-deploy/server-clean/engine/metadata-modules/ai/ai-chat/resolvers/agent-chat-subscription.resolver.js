"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentChatSubscriptionResolver", {
    enumerable: true,
    get: function() {
        return AgentChatSubscriptionResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _metadataresolverdecorator = require("../../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _scalars = require("../../../../api/graphql/workspace-schema-builder/graphql-types/scalars");
const _authuserworkspaceiddecorator = require("../../../../decorators/auth/auth-user-workspace-id.decorator");
const _authworkspacedecorator = require("../../../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../../../guards/settings-permission.guard");
const _userauthguard = require("../../../../guards/user-auth.guard");
const _workspaceauthguard = require("../../../../guards/workspace-auth.guard");
const _aiexception = require("../../ai.exception");
const _aigraphqlapiexceptioninterceptor = require("../../interceptors/ai-graphql-api-exception.interceptor");
const _agentchateventdto = require("../dtos/agent-chat-event.dto");
const _agentchatthreadentity = require("../entities/agent-chat-thread.entity");
const _subscriptionservice = require("../../../../subscriptions/subscription.service");
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
let AgentChatSubscriptionResolver = class AgentChatSubscriptionResolver {
    async onAgentChatEvent(threadId, workspace, userWorkspaceId) {
        const thread = await this.threadRepository.findOne(workspace.id, {
            where: {
                id: threadId,
                userWorkspaceId
            },
            select: [
                'id'
            ]
        });
        if (!(0, _utils.isDefined)(thread)) {
            throw new _aiexception.AiException('Thread not found', _aiexception.AiExceptionCode.THREAD_NOT_FOUND);
        }
        return this.subscriptionService.subscribeToAgentChat({
            workspaceId: workspace.id,
            threadId
        });
    }
    constructor(subscriptionService, threadRepository){
        this.subscriptionService = subscriptionService;
        this.threadRepository = threadRepository;
    }
};
_ts_decorate([
    (0, _graphql.Subscription)(()=>_agentchateventdto.AgentChatEventDTO, {
        filter: (payload, variables)=>{
            return payload.onAgentChatEvent.threadId === variables.threadId;
        }
    }),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.AI)),
    _ts_param(0, (0, _graphql.Args)('threadId', {
        type: ()=>_scalars.UUIDScalarType
    })),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserworkspaceiddecorator.AuthUserWorkspaceId)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity,
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], AgentChatSubscriptionResolver.prototype, "onAgentChatEvent", null);
AgentChatSubscriptionResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _userauthguard.UserAuthGuard),
    (0, _common.UseInterceptors)(_aigraphqlapiexceptioninterceptor.AiGraphqlApiExceptionInterceptor),
    _ts_param(1, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agentchatthreadentity.AgentChatThreadEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _subscriptionservice.SubscriptionService === "undefined" ? Object : _subscriptionservice.SubscriptionService,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository
    ])
], AgentChatSubscriptionResolver);

//# sourceMappingURL=agent-chat-subscription.resolver.js.map