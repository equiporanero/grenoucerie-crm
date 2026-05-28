"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AiAgentMonitorModule", {
    enumerable: true,
    get: function() {
        return AiAgentMonitorModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _aiagentexecutionmodule = require("../ai-agent-execution/ai-agent-execution.module");
const _agentturnentity = require("../ai-agent-execution/entities/agent-turn.entity");
const _aiagentmodule = require("../ai-agent/ai-agent.module");
const _agententity = require("../ai-agent/entities/agent.entity");
const _aichatmodule = require("../ai-chat/ai-chat.module");
const _agentchatthreadentity = require("../ai-chat/entities/agent-chat-thread.entity");
const _aimodelsmodule = require("../ai-models/ai-models.module");
const _permissionsmodule = require("../../permissions/permissions.module");
const _provideworkspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _agentturnevaluationentity = require("./entities/agent-turn-evaluation.entity");
const _evaluateagentturnjob = require("./jobs/evaluate-agent-turn.job");
const _runevaluationinputjob = require("./jobs/run-evaluation-input.job");
const _agentturnresolver = require("./resolvers/agent-turn.resolver");
const _agentturngraderservice = require("./services/agent-turn-grader.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AiAgentMonitorModule = class AiAgentMonitorModule {
};
AiAgentMonitorModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _agentturnevaluationentity.AgentTurnEvaluationEntity,
                _agentturnentity.AgentTurnEntity,
                _agentchatthreadentity.AgentChatThreadEntity,
                _agententity.AgentEntity
            ]),
            _aiagentmodule.AiAgentModule,
            _aiagentexecutionmodule.AiAgentExecutionModule,
            _aichatmodule.AiChatModule,
            _aimodelsmodule.AiModelsModule,
            _permissionsmodule.PermissionsModule
        ],
        providers: [
            _agentturngraderservice.AgentTurnGraderService,
            _agentturnresolver.AgentTurnResolver,
            _evaluateagentturnjob.EvaluateAgentTurnJob,
            _runevaluationinputjob.RunEvaluationInputJob,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_agentturnevaluationentity.AgentTurnEvaluationEntity),
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_agentturnentity.AgentTurnEntity),
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_agentchatthreadentity.AgentChatThreadEntity),
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_agententity.AgentEntity)
        ],
        exports: [
            _agentturngraderservice.AgentTurnGraderService
        ]
    })
], AiAgentMonitorModule);

//# sourceMappingURL=ai-agent-monitor.module.js.map