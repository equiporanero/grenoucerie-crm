"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentTurnGraderService", {
    enumerable: true,
    get: function() {
        return AgentTurnGraderService;
    }
});
const _common = require("@nestjs/common");
const _ai = require("ai");
const _graphqlerrorsutil = require("../../../../core-modules/graphql/utils/graphql-errors.util");
const _agentturnentity = require("../../ai-agent-execution/entities/agent-turn.entity");
const _agentturnevaluationentity = require("../entities/agent-turn-evaluation.entity");
const _aitelemetryconst = require("../../ai-models/constants/ai-telemetry.const");
const _aimodelregistryservice = require("../../ai-models/services/ai-model-registry.service");
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
let AgentTurnGraderService = class AgentTurnGraderService {
    async evaluateTurn({ turnId, workspaceId }) {
        const turn = await this.turnRepository.findOne(workspaceId, {
            where: {
                id: turnId
            },
            relations: [
                'messages',
                'messages.parts'
            ]
        });
        if (!turn) {
            throw new _graphqlerrorsutil.NotFoundError(`Turn ${turnId} not found`, {
                userFriendlyMessage: /*i18n*/ {
                    id: "mjE4RD",
                    message: "This evaluation target could not be found."
                }
            });
        }
        const { score, comment } = await this.evaluateWithAI(turn);
        return this.evaluationRepository.save(workspaceId, {
            turnId,
            score,
            comment
        });
    }
    async evaluateWithAI(turn) {
        try {
            const defaultModel = this.aiModelRegistryService.getDefaultSpeedModel();
            if (!defaultModel) {
                this.logger.warn('No default AI model available for evaluation');
                return this.getFallbackEvaluation(turn);
            }
            const evaluationContext = this.buildEvaluationContext(turn);
            const prompt = `You are evaluating an AI agent's performance on a single turn (user request + agent response).

${evaluationContext}

Evaluate this agent turn based on:
1. **Task Completion**: Did the agent accomplish what the user asked?
2. **Tool Usage**: Were tools used correctly and appropriately?
3. **Response Quality**: Is the response clear, accurate, and helpful?
4. **Error Handling**: Were errors handled gracefully?

Provide:
- A score from 0 to 100 (0 = complete failure, 100 = perfect)
- A brief comment explaining the score (max 200 characters)

Respond ONLY with valid JSON in this exact format:
{"score": <number>, "comment": "<string>"}`;
            const result = await (0, _ai.generateText)({
                model: defaultModel.model,
                prompt,
                temperature: 0.3,
                experimental_telemetry: _aitelemetryconst.AI_TELEMETRY_CONFIG
            });
            const parsed = JSON.parse(result.text);
            return {
                score: Math.max(0, Math.min(100, Math.round(parsed.score))),
                comment: (parsed.comment || 'Evaluation completed').substring(0, 500)
            };
        } catch (error) {
            this.logger.error('Failed to evaluate turn with AI:', error);
            return this.getFallbackEvaluation(turn);
        }
    }
    buildEvaluationContext(turn) {
        const userMessages = turn.messages.filter((m)=>m.role === 'user');
        const assistantMessages = turn.messages.filter((m)=>m.role === 'assistant');
        const userText = userMessages.flatMap((m)=>m.parts || []).filter((p)=>p.textContent).map((p)=>p.textContent).join('\n');
        const assistantParts = assistantMessages.flatMap((m)=>m.parts || []);
        const assistantText = assistantParts.filter((p)=>p.textContent).map((p)=>p.textContent).join('\n');
        const toolCalls = assistantParts.filter((p)=>p.toolName).map((p)=>({
                tool: p.toolName,
                hasError: !!p.errorMessage,
                error: p.errorMessage
            }));
        const errors = assistantParts.filter((p)=>p.errorMessage).map((p)=>p.errorMessage);
        let context = `**User Request:**\n${userText || '(no text)'}\n\n`;
        context += `**Agent Response:**\n${assistantText || '(no text response)'}\n\n`;
        if (toolCalls.length > 0) {
            context += `**Tools Used:**\n${toolCalls.map((t)=>`- ${t.tool}${t.hasError ? ' (FAILED)' : ''}`).join('\n')}\n\n`;
        }
        if (errors.length > 0) {
            context += `**Errors:**\n${errors.map((e)=>`- ${e}`).join('\n')}\n\n`;
        }
        return context;
    }
    getFallbackEvaluation(turn) {
        const parts = turn.messages.flatMap((m)=>m.parts || []);
        const errorCount = parts.filter((p)=>p.errorMessage).length;
        const hasResponse = parts.some((p)=>p.textContent);
        const toolCount = parts.filter((p)=>p.toolName).length;
        let score = 100;
        if (errorCount > 0) {
            score -= errorCount * 30;
        }
        if (!hasResponse) {
            score -= 50;
        }
        const comments = [];
        if (errorCount > 0) {
            comments.push(`${errorCount} error(s)`);
        }
        if (toolCount > 0) {
            comments.push(`${toolCount} tool(s) used`);
        }
        if (!hasResponse) {
            comments.push('No response');
        }
        return {
            score: Math.max(0, score),
            comment: comments.length > 0 ? comments.join('; ') : 'Completed'
        };
    }
    constructor(turnRepository, evaluationRepository, aiModelRegistryService){
        this.turnRepository = turnRepository;
        this.evaluationRepository = evaluationRepository;
        this.aiModelRegistryService = aiModelRegistryService;
        this.logger = new _common.Logger(AgentTurnGraderService.name);
    }
};
AgentTurnGraderService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agentturnentity.AgentTurnEntity)),
    _ts_param(1, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agentturnevaluationentity.AgentTurnEvaluationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _aimodelregistryservice.AiModelRegistryService === "undefined" ? Object : _aimodelregistryservice.AiModelRegistryService
    ])
], AgentTurnGraderService);

//# sourceMappingURL=agent-turn-grader.service.js.map