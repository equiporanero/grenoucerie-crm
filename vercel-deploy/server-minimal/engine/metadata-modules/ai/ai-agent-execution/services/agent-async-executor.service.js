"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentAsyncExecutorService", {
    enumerable: true,
    get: function() {
        return AgentAsyncExecutorService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _ai = require("ai");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _isuserauthcontextguard = require("../../../../core-modules/auth/guards/is-user-auth-context.guard");
const _billingusageservice = require("../../../../core-modules/billing/services/billing-usage.service");
const _nativetoolbinderservice = require("../../../../core-modules/tool-provider/native/native-tool-binder.service");
const _toolregistryservice = require("../../../../core-modules/tool-provider/services/tool-registry.service");
const _usageoperationtypeenum = require("../../../../core-modules/usage/enums/usage-operation-type.enum");
const _workspaceentity = require("../../../../core-modules/workspace/workspace.entity");
const _workflowagentregistrytoolcategoriesconst = require("../constants/workflow-agent-registry-tool-categories.const");
const _agentconfigconst = require("../../ai-agent/constants/agent-config.const");
const _agentsystempromptsconst = require("../../ai-agent/constants/agent-system-prompts.const");
const _repairtoolcallutil = require("../../ai-agent/utils/repair-tool-call.util");
const _aibillingservice = require("../../ai-billing/services/ai-billing.service");
const _convertdollarstobillingcreditsutil = require("../../ai-billing/utils/convert-dollars-to-billing-credits.util");
const _countnativewebsearchcallsfromstepsutil = require("../../ai-billing/utils/count-native-web-search-calls-from-steps.util");
const _extractcachecreationtokensutil = require("../../ai-billing/utils/extract-cache-creation-tokens.util");
const _mergelanguagemodelusageutil = require("../../ai-billing/utils/merge-language-model-usage.util");
const _aitelemetryconst = require("../../ai-models/constants/ai-telemetry.const");
const _aimodelconfigservice = require("../../ai-models/services/ai-model-config.service");
const _aimodelregistryservice = require("../../ai-models/services/ai-model-registry.service");
const _aiexception = require("../../ai.exception");
const _roletargetentity = require("../../../role-target/role-target.entity");
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
const EMPTY_USAGE = {
    inputTokens: 0,
    outputTokens: 0,
    totalTokens: 0,
    inputTokenDetails: {
        noCacheTokens: 0,
        cacheReadTokens: 0,
        cacheWriteTokens: 0
    },
    outputTokenDetails: {
        textTokens: 0,
        reasoningTokens: 0
    }
};
let AgentAsyncExecutorService = class AgentAsyncExecutorService {
    extractRoleIds(rolePermissionConfig) {
        if (!rolePermissionConfig) {
            return [];
        }
        if ('intersectionOf' in rolePermissionConfig) {
            return rolePermissionConfig.intersectionOf;
        }
        if ('unionOf' in rolePermissionConfig) {
            return rolePermissionConfig.unionOf;
        }
        return [];
    }
    async getEffectiveRolePermissionConfig(agentId, workspaceId, rolePermissionConfig) {
        const roleTarget = await this.roleTargetRepository.findOne({
            where: {
                agentId,
                workspaceId
            },
            select: [
                'roleId'
            ]
        });
        const agentRoleId = roleTarget?.roleId;
        const configRoleIds = this.extractRoleIds(rolePermissionConfig);
        const allRoleIds = agentRoleId ? [
            ...new Set([
                ...configRoleIds,
                agentRoleId
            ])
        ] : configRoleIds;
        if (allRoleIds.length === 0) {
            return undefined;
        }
        return {
            intersectionOf: allRoleIds
        };
    }
    async executeAgent({ agent, userPrompt, actorContext, rolePermissionConfig, authContext, workspaceId, userWorkspaceId, operationType = _usageoperationtypeenum.UsageOperationType.AI_WORKFLOW_TOKEN }) {
        await this.billingUsageService.hasAvailableCreditsOrThrow(workspaceId);
        let accumulatedUsage = EMPTY_USAGE;
        let cacheCreationTokens = 0;
        let nativeWebSearchCallCount = 0;
        try {
            if (agent) {
                const workspace = await this.workspaceRepository.findOneBy({
                    id: agent.workspaceId
                });
                if (workspace) {
                    this.aiModelRegistryService.validateModelAvailability(agent.modelId, workspace);
                }
            }
            const registeredModel = await this.aiModelRegistryService.resolveModelForAgent(agent);
            let tools = {};
            let providerOptions = {};
            if (agent) {
                const effectiveRoleConfig = await this.getEffectiveRolePermissionConfig(agent.id, agent.workspaceId, rolePermissionConfig);
                // Workflow context: registry tools come from DATABASE_CRUD and ACTION.
                // Native model tools are bound separately below.
                const roleId = this.extractRoleIds(effectiveRoleConfig)[0] ?? '';
                const toolProviderContext = {
                    workspaceId: agent.workspaceId,
                    roleId,
                    rolePermissionConfig: effectiveRoleConfig ?? {
                        unionOf: []
                    },
                    authContext,
                    actorContext,
                    userId: (0, _utils.isDefined)(authContext) && (0, _isuserauthcontextguard.isUserAuthContext)(authContext) ? authContext.user.id : undefined,
                    userWorkspaceId: (0, _utils.isDefined)(authContext) && (0, _isuserauthcontextguard.isUserAuthContext)(authContext) ? authContext.userWorkspaceId : undefined
                };
                const registryTools = await this.toolRegistry.getToolsByCategories(toolProviderContext, {
                    categories: _workflowagentregistrytoolcategoriesconst.WORKFLOW_AGENT_REGISTRY_TOOL_CATEGORIES,
                    wrapWithErrorContext: false
                });
                const nativeTools = this.nativeToolBinder.bind(registeredModel, {
                    webSearchEnabled: agent.modelConfiguration?.webSearch?.enabled === true
                });
                tools = {
                    ...registryTools,
                    ...nativeTools
                };
                providerOptions = this.aiModelConfigService.getProviderOptions(registeredModel, agent);
            }
            this.logger.log(`Generated ${Object.keys(tools).length} tools for agent`);
            let hasNoMoreAvailableCredits = false;
            const textResponse = await (0, _ai.generateText)({
                system: `${_agentsystempromptsconst.WORKFLOW_SYSTEM_PROMPTS.BASE}\n\n${agent ? agent.prompt : ''}`,
                tools,
                model: registeredModel.model,
                prompt: userPrompt,
                stopWhen: (step)=>(0, _ai.stepCountIs)(_agentconfigconst.AGENT_CONFIG.MAX_STEPS)(step) || hasNoMoreAvailableCredits,
                providerOptions,
                experimental_telemetry: _aitelemetryconst.AI_TELEMETRY_CONFIG,
                onStepFinish: async (step)=>{
                    const { hasNoMoreAvailableCredits: stepHasNoMoreAvailableCredits } = await this.aiBillingService.decrementAndCheckAvailableCredits(registeredModel.modelId, {
                        usage: step.usage,
                        cacheCreationTokens: (0, _extractcachecreationtokensutil.extractCacheCreationTokens)(step.providerMetadata)
                    }, workspaceId);
                    if (stepHasNoMoreAvailableCredits) {
                        hasNoMoreAvailableCredits = true;
                    }
                },
                experimental_repairToolCall: async ({ toolCall, tools: toolsForRepair, inputSchema, error })=>{
                    return (0, _repairtoolcallutil.repairToolCall)({
                        toolCall,
                        tools: toolsForRepair,
                        inputSchema,
                        error,
                        model: registeredModel.model
                    });
                }
            });
            accumulatedUsage = textResponse.usage;
            cacheCreationTokens = (0, _extractcachecreationtokensutil.extractCacheCreationTokensFromSteps)(textResponse.steps);
            nativeWebSearchCallCount = (0, _countnativewebsearchcallsfromstepsutil.countNativeWebSearchCallsFromSteps)(textResponse.steps);
            const agentSchema = agent?.responseFormat?.type === 'json' ? agent.responseFormat.schema : undefined;
            if (!agentSchema) {
                return {
                    result: {
                        response: textResponse.text
                    },
                    usage: textResponse.usage,
                    cacheCreationTokens,
                    nativeWebSearchCallCount,
                    hasNoMoreAvailableCredits
                };
            }
            const structuredResult = await (0, _ai.generateText)({
                system: _agentsystempromptsconst.WORKFLOW_SYSTEM_PROMPTS.OUTPUT_GENERATOR,
                model: registeredModel.model,
                prompt: `Based on the following execution results, generate the structured output according to the schema:

                 Execution Results: ${textResponse.text}

                 Please generate the structured output based on the execution results and context above.`,
                output: _ai.Output.object({
                    schema: (0, _ai.jsonSchema)(agentSchema)
                }),
                experimental_telemetry: _aitelemetryconst.AI_TELEMETRY_CONFIG,
                onStepFinish: async (step)=>{
                    const { hasNoMoreAvailableCredits: stepHasNoMoreAvailableCredits } = await this.aiBillingService.decrementAndCheckAvailableCredits(registeredModel.modelId, {
                        usage: step.usage,
                        cacheCreationTokens: (0, _extractcachecreationtokensutil.extractCacheCreationTokens)(step.providerMetadata)
                    }, workspaceId);
                    if (stepHasNoMoreAvailableCredits) {
                        hasNoMoreAvailableCredits = true;
                    }
                }
            });
            accumulatedUsage = (0, _mergelanguagemodelusageutil.mergeLanguageModelUsage)(textResponse.usage, structuredResult.usage);
            if (structuredResult.output == null) {
                throw new _aiexception.AiException('Failed to generate structured output from execution results', _aiexception.AiExceptionCode.AGENT_EXECUTION_FAILED);
            }
            return {
                result: structuredResult.output,
                usage: accumulatedUsage,
                cacheCreationTokens,
                nativeWebSearchCallCount,
                hasNoMoreAvailableCredits
            };
        } catch (error) {
            if (error instanceof _aiexception.AiException) {
                throw error;
            }
            throw new _aiexception.AiException(error instanceof Error ? error.message : 'Agent execution failed', _aiexception.AiExceptionCode.AGENT_EXECUTION_FAILED);
        } finally{
            const modelId = agent?.modelId ?? _constants.AUTO_SELECT_SMART_MODEL_ID;
            const costInDollars = this.aiBillingService.calculateCost(modelId, {
                usage: accumulatedUsage,
                cacheCreationTokens
            });
            const creditsUsedMicro = Math.round((0, _convertdollarstobillingcreditsutil.convertDollarsToBillingCredits)(costInDollars));
            const totalTokens = (accumulatedUsage.inputTokens ?? 0) + (accumulatedUsage.outputTokens ?? 0) + cacheCreationTokens;
            void this.aiBillingService.emitAiTokenUsageEvent(workspaceId, creditsUsedMicro, totalTokens, modelId, operationType, agent?.id ?? null, userWorkspaceId);
            void this.aiBillingService.billNativeWebSearchUsage(nativeWebSearchCallCount, workspaceId, userWorkspaceId);
        }
    }
    constructor(aiModelRegistryService, aiModelConfigService, toolRegistry, nativeToolBinder, aiBillingService, billingUsageService, roleTargetRepository, workspaceRepository){
        this.aiModelRegistryService = aiModelRegistryService;
        this.aiModelConfigService = aiModelConfigService;
        this.toolRegistry = toolRegistry;
        this.nativeToolBinder = nativeToolBinder;
        this.aiBillingService = aiBillingService;
        this.billingUsageService = billingUsageService;
        this.roleTargetRepository = roleTargetRepository;
        this.workspaceRepository = workspaceRepository;
        this.logger = new _common.Logger(AgentAsyncExecutorService.name);
    }
};
AgentAsyncExecutorService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(6, (0, _typeorm.InjectRepository)(_roletargetentity.RoleTargetEntity)),
    _ts_param(7, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _aimodelregistryservice.AiModelRegistryService === "undefined" ? Object : _aimodelregistryservice.AiModelRegistryService,
        typeof _aimodelconfigservice.AiModelConfigService === "undefined" ? Object : _aimodelconfigservice.AiModelConfigService,
        typeof _toolregistryservice.ToolRegistryService === "undefined" ? Object : _toolregistryservice.ToolRegistryService,
        typeof _nativetoolbinderservice.NativeToolBinderService === "undefined" ? Object : _nativetoolbinderservice.NativeToolBinderService,
        typeof _aibillingservice.AiBillingService === "undefined" ? Object : _aibillingservice.AiBillingService,
        typeof _billingusageservice.BillingUsageService === "undefined" ? Object : _billingusageservice.BillingUsageService,
        typeof Repository === "undefined" ? Object : Repository,
        typeof Repository === "undefined" ? Object : Repository
    ])
], AgentAsyncExecutorService);

//# sourceMappingURL=agent-async-executor.service.js.map