"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AiAgentWorkflowAction", {
    enumerable: true,
    get: function() {
        return AiAgentWorkflowAction;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _usageoperationtypeenum = require("../../../../../engine/core-modules/usage/enums/usage-operation-type.enum");
const _agentasyncexecutorservice = require("../../../../../engine/metadata-modules/ai/ai-agent-execution/services/agent-async-executor.service");
const _agententity = require("../../../../../engine/metadata-modules/ai/ai-agent/entities/agent.entity");
const _injectworkspacescopedrepositorydecorator = require("../../../../../engine/twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../../../engine/twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _workflowstepexecutorexception = require("../../exceptions/workflow-step-executor.exception");
const _workflowexecutioncontextservice = require("../../services/workflow-execution-context.service");
const _findsteporthrowutil = require("../../utils/find-step-or-throw.util");
const _isworkflowaiagentactionguard = require("./guards/is-workflow-ai-agent-action.guard");
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
let AiAgentWorkflowAction = class AiAgentWorkflowAction {
    async execute({ currentStepId, steps, context, runInfo }) {
        const step = (0, _findsteporthrowutil.findStepOrThrow)({
            stepId: currentStepId,
            steps
        });
        if (!(0, _isworkflowaiagentactionguard.isWorkflowAiAgentAction)(step)) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException('Step is not an AI Agent action', _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_TYPE);
        }
        const { agentId, prompt } = step.settings.input;
        const workspaceId = runInfo.workspaceId;
        let agent = null;
        if (agentId) {
            agent = await this.agentRepository.findOne(workspaceId, {
                where: {
                    id: agentId
                }
            });
        }
        if (agentId && !agent) {
            throw new _workflowstepexecutorexception.WorkflowStepExecutorException(`Agent with id ${agentId} not found`, _workflowstepexecutorexception.WorkflowStepExecutorExceptionCode.INVALID_STEP_INPUT);
        }
        const executionContext = await this.workflowExecutionContextService.getExecutionContext(runInfo);
        const userWorkspaceId = executionContext.authContext.type === 'user' ? executionContext.authContext.userWorkspaceId : null;
        const { result, hasNoMoreAvailableCredits } = await this.aiAgentExecutionService.executeAgent({
            agent,
            userPrompt: (0, _utils.resolveInput)(prompt, context),
            actorContext: executionContext.isActingOnBehalfOfUser ? executionContext.initiator : undefined,
            rolePermissionConfig: executionContext.rolePermissionConfig,
            authContext: executionContext.authContext,
            workspaceId,
            userWorkspaceId,
            operationType: _usageoperationtypeenum.UsageOperationType.AI_WORKFLOW_TOKEN
        });
        if (hasNoMoreAvailableCredits) {
            return {
                error: 'AI agent stopped: no more available credits.'
            };
        }
        return {
            result
        };
    }
    constructor(aiAgentExecutionService, workflowExecutionContextService, agentRepository){
        this.aiAgentExecutionService = aiAgentExecutionService;
        this.workflowExecutionContextService = workflowExecutionContextService;
        this.agentRepository = agentRepository;
    }
};
AiAgentWorkflowAction = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_agententity.AgentEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _agentasyncexecutorservice.AgentAsyncExecutorService === "undefined" ? Object : _agentasyncexecutorservice.AgentAsyncExecutorService,
        typeof _workflowexecutioncontextservice.WorkflowExecutionContextService === "undefined" ? Object : _workflowexecutioncontextservice.WorkflowExecutionContextService,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository
    ])
], AiAgentWorkflowAction);

//# sourceMappingURL=ai-agent.workflow-action.js.map