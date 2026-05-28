"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AgentTitleGenerationService", {
    enumerable: true,
    get: function() {
        return AgentTitleGenerationService;
    }
});
const _common = require("@nestjs/common");
const _ai = require("ai");
const _billingusageservice = require("../../../../core-modules/billing/services/billing-usage.service");
const _usageoperationtypeenum = require("../../../../core-modules/usage/enums/usage-operation-type.enum");
const _aibillingservice = require("../../ai-billing/services/ai-billing.service");
const _extractcachecreationtokensutil = require("../../ai-billing/utils/extract-cache-creation-tokens.util");
const _aitelemetryconst = require("../../ai-models/constants/ai-telemetry.const");
const _aimodelregistryservice = require("../../ai-models/services/ai-model-registry.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AgentTitleGenerationService = class AgentTitleGenerationService {
    async generateThreadTitle(messageContent, workspaceId, userWorkspaceId) {
        await this.billingUsageService.hasAvailableCreditsOrThrow(workspaceId);
        const defaultModel = this.aiModelRegistryService.getDefaultSpeedModel();
        if (!defaultModel) {
            this.logger.warn('No default AI model available for title generation');
            return this.generateFallbackTitle(messageContent);
        }
        let usage;
        let steps;
        try {
            const result = await (0, _ai.generateText)({
                model: defaultModel.model,
                prompt: `Generate a concise, descriptive title (maximum 60 characters) for a chat thread based on the following message. The title should capture the main topic or purpose of the conversation. Return only the title, nothing else. Message: "${messageContent}"`,
                experimental_telemetry: _aitelemetryconst.AI_TELEMETRY_CONFIG
            });
            usage = result.usage;
            steps = result.steps;
            return this.cleanTitle(result.text);
        } catch (error) {
            this.logger.error('Failed to generate title with AI:', error);
            return this.generateFallbackTitle(messageContent);
        } finally{
            if (usage) {
                const cacheCreationTokens = steps ? (0, _extractcachecreationtokensutil.extractCacheCreationTokensFromSteps)(steps) : 0;
                void this.aiBillingService.calculateAndBillUsage(defaultModel.modelId, {
                    usage,
                    cacheCreationTokens
                }, workspaceId, _usageoperationtypeenum.UsageOperationType.AI_CHAT_TOKEN, null, userWorkspaceId);
            }
        }
    }
    generateFallbackTitle(messageContent) {
        const cleanContent = messageContent.trim().replace(/\s+/g, ' ');
        const title = cleanContent.substring(0, 50);
        return cleanContent.length > 50 ? `${title}...` : title;
    }
    cleanTitle(title) {
        return title.replace(/^["']|["']$/g, '').trim().replace(/\s+/g, ' ');
    }
    constructor(aiModelRegistryService, aiBillingService, billingUsageService){
        this.aiModelRegistryService = aiModelRegistryService;
        this.aiBillingService = aiBillingService;
        this.billingUsageService = billingUsageService;
        this.logger = new _common.Logger(AgentTitleGenerationService.name);
    }
};
AgentTitleGenerationService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _aimodelregistryservice.AiModelRegistryService === "undefined" ? Object : _aimodelregistryservice.AiModelRegistryService,
        typeof _aibillingservice.AiBillingService === "undefined" ? Object : _aibillingservice.AiBillingService,
        typeof _billingusageservice.BillingUsageService === "undefined" ? Object : _billingusageservice.BillingUsageService
    ])
], AgentTitleGenerationService);

//# sourceMappingURL=agent-title-generation.service.js.map