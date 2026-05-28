"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AiAgentExecutionModule", {
    enumerable: true,
    get: function() {
        return AiAgentExecutionModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _billingmodule = require("../../../core-modules/billing/billing.module");
const _workspacedomainsmodule = require("../../../core-modules/domain/workspace-domains/workspace-domains.module");
const _fileurlmodule = require("../../../core-modules/file/file-url/file-url.module");
const _toolprovidermodule = require("../../../core-modules/tool-provider/tool-provider.module");
const _userworkspacemodule = require("../../../core-modules/user-workspace/user-workspace.module");
const _workspaceentity = require("../../../core-modules/workspace/workspace.entity");
const _aiagentmodule = require("../ai-agent/ai-agent.module");
const _agententity = require("../ai-agent/entities/agent.entity");
const _aibillingmodule = require("../ai-billing/ai-billing.module");
const _aimodelsmodule = require("../ai-models/ai-models.module");
const _permissionsmodule = require("../../permissions/permissions.module");
const _roletargetentity = require("../../role-target/role-target.entity");
const _userrolemodule = require("../../user-role/user-role.module");
const _workspacecachemodule = require("../../../workspace-cache/workspace-cache.module");
const _agentmessagepartentity = require("./entities/agent-message-part.entity");
const _agentmessageentity = require("./entities/agent-message.entity");
const _agentturnentity = require("./entities/agent-turn.entity");
const _agentmessagepartresolver = require("./resolvers/agent-message-part.resolver");
const _agentactorcontextservice = require("./services/agent-actor-context.service");
const _agentasyncexecutorservice = require("./services/agent-async-executor.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AiAgentExecutionModule = class AiAgentExecutionModule {
};
AiAgentExecutionModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _aibillingmodule.AiBillingModule,
            _aimodelsmodule.AiModelsModule,
            _aiagentmodule.AiAgentModule,
            _billingmodule.BillingModule,
            _fileurlmodule.FileUrlModule,
            _workspacedomainsmodule.WorkspaceDomainsModule,
            _userworkspacemodule.UserWorkspaceModule,
            _userrolemodule.UserRoleModule,
            _permissionsmodule.PermissionsModule,
            _workspacecachemodule.WorkspaceCacheModule,
            (0, _common.forwardRef)(()=>_toolprovidermodule.ToolProviderModule),
            _typeorm.TypeOrmModule.forFeature([
                _agententity.AgentEntity,
                _agentmessageentity.AgentMessageEntity,
                _agentmessagepartentity.AgentMessagePartEntity,
                _agentturnentity.AgentTurnEntity,
                _roletargetentity.RoleTargetEntity,
                _workspaceentity.WorkspaceEntity
            ])
        ],
        providers: [
            _agentasyncexecutorservice.AgentAsyncExecutorService,
            _agentactorcontextservice.AgentActorContextService,
            _agentmessagepartresolver.AgentMessagePartResolver
        ],
        exports: [
            _agentasyncexecutorservice.AgentAsyncExecutorService,
            _agentactorcontextservice.AgentActorContextService,
            _typeorm.TypeOrmModule.forFeature([
                _agentmessageentity.AgentMessageEntity,
                _agentmessagepartentity.AgentMessagePartEntity,
                _agentturnentity.AgentTurnEntity
            ])
        ]
    })
], AiAgentExecutionModule);

//# sourceMappingURL=ai-agent-execution.module.js.map