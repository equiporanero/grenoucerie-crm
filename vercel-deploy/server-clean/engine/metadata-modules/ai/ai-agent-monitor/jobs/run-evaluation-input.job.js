"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RunEvaluationInputJob", {
    enumerable: true,
    get: function() {
        return RunEvaluationInputJob;
    }
});
const _common = require("@nestjs/common");
const _messagequeuedecorator = require("../../../../core-modules/message-queue/decorators/message-queue.decorator");
const _processdecorator = require("../../../../core-modules/message-queue/decorators/process.decorator");
const _processordecorator = require("../../../../core-modules/message-queue/decorators/processor.decorator");
const _messagequeueconstants = require("../../../../core-modules/message-queue/message-queue.constants");
const _messagequeueservice = require("../../../../core-modules/message-queue/services/message-queue.service");
const _agentasyncexecutorservice = require("../../ai-agent-execution/services/agent-async-executor.service");
const _agententity = require("../../ai-agent/entities/agent.entity");
const _agentchatservice = require("../../ai-chat/services/agent-chat.service");
const _injectworkspacescopedrepositorydecorator = require("../../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _evaluateagentturnjob = require("./evaluate-agent-turn.job");
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
let RunEvaluationInputJob = class RunEvaluationInputJob {
    async handle(data) {
        await this.agentChatService.addMessage({
            threadId: data.threadId,
            turnId: data.turnId,
            uiMessage: {
                role: 'user',
                parts: [
                    {
                        type: 'text',
                        text: data.input
                    }
                ]
            },
            workspaceId: data.workspaceId
        });
        const agent = await this.agentRepository.findOne(data.workspaceId, {
            where: {
                id: data.agentId
            }
        });
        if (!agent) {
            throw new Error(`Agent ${data.agentId} not found`);
        }
        const executionResult = await this.aiAgentExecutorService.executeAgent({
            agent,
            userPrompt: data.input,
            workspaceId: data.workspaceId,
            userWorkspaceId: null
        });
        await this.agentChatService.addMessage({
            threadId: data.threadId,
            turnId: data.turnId,
            agentId: agent.id,
            uiMessage: {
                role: 'assistant',
                parts: [
                    {
                        type: 'text',
                        text: JSON.stringify(executionResult.result) || ''
                    }
                ]
            },
            workspaceId: data.workspaceId
        });
        await this.messageQueueService.add(_evaluateagentturnjob.EvaluateAgentTurnJob.name, {
            turnId: data.turnId,
            workspaceId: data.workspaceId
        });
    }
    constructor(agentRepository, agentChatService, aiAgentExecutorService, messageQueueService){
        this.agentRepository = agentRepository;
        this.agentChatService = agentChatService;
        this.aiAgentExecutorService = aiAgentExecutorService;
        this.messageQueueService = messageQueueService;
        this.logger = new _common.Logger(RunEvaluationInputJob.name);
    }
};
_ts_decorate([
    (0, _processdecorator.Process)(RunEvaluationInputJob.name),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof RunEvaluationInputJobData === "undefined" ? Object : RunEvaluationInputJobData
    ]),
    _ts_metadata("design:returntype", Promise)
], RunEvaluationInputJob.prototype, "handle", null);
RunEvaluationInputJob = _ts_decorate([
    (0, _processordecorator.Processor)(_messagequeueconstants.MessageQueue.aiQueue),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agententity.AgentEntity)),
    _ts_param(3, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.aiQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _agentchatservice.AgentChatService === "undefined" ? Object : _agentchatservice.AgentChatService,
        typeof _agentasyncexecutorservice.AgentAsyncExecutorService === "undefined" ? Object : _agentasyncexecutorservice.AgentAsyncExecutorService,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], RunEvaluationInputJob);

//# sourceMappingURL=run-evaluation-input.job.js.map