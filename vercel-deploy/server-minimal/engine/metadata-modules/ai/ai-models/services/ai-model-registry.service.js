"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AiModelRegistryService", {
    enumerable: true,
    get: function() {
        return AiModelRegistryService;
    }
});
const _common = require("@nestjs/common");
const _configvariablesgroupenum = require("../../../../core-modules/twenty-config/enums/config-variables-group.enum");
const _configgrouphashservice = require("../../../../core-modules/twenty-config/services/config-group-hash.service");
const _aimodelroleenum = require("../types/ai-model-role.enum");
const _aiexception = require("../../ai.exception");
const _aimodelpreferencesservice = require("./ai-model-preferences.service");
const _providerconfigservice = require("./provider-config.service");
const _sdkproviderfactoryservice = require("./sdk-provider-factory.service");
const _defaultcontextwindowtokensconst = require("../types/default-context-window-tokens.const");
const _constants = require("twenty-shared/constants");
const _utils = require("twenty-shared/utils");
const _defaultmaxoutputtokensconst = require("../types/default-max-output-tokens.const");
const _compositemodelidutil = require("../utils/composite-model-id.util");
const _infermodelfamilyutil = require("../utils/infer-model-family.util");
const _isproviderconfiguredutil = require("../utils/is-provider-configured.util");
const _ismodelallowedutil = require("../utils/is-model-allowed.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AiModelRegistryService = class AiModelRegistryService {
    // The registry is rebuilt lazily whenever the LLM-group config hash changes,
    // so any mutation to an LLM-tagged config variable is picked up automatically
    // on the next read — no explicit refresh from callers needed.
    ensureFresh() {
        const configHash = this.configGroupHashService.computeHash(_configvariablesgroupenum.ConfigVariablesGroup.LLM);
        if (configHash === this.currentConfigHash) {
            return;
        }
        this.buildModelRegistry();
        this.currentConfigHash = configHash;
    }
    buildModelRegistry() {
        this.modelRegistry.clear();
        this.sdkProviderFactory.clearCache();
        this.modelConfigCache.clear();
        this.providerModelDefCache.clear();
        const providers = this.providerConfigService.getResolvedProviders();
        this.registerModelsFromProviders(providers);
    }
    registerModelsFromProviders(providers) {
        for (const [providerKey, config] of Object.entries(providers)){
            if (!config.npm) {
                this.logger.warn(`Skipping provider "${providerKey}": missing npm field`);
                continue;
            }
            const models = config.models ?? [];
            if (models.length === 0) {
                continue;
            }
            const sdkInstance = (0, _isproviderconfiguredutil.isProviderConfigured)(config) ? this.sdkProviderFactory.createProvider(providerKey, config) : undefined;
            for (const modelDef of models){
                const compositeId = (0, _compositemodelidutil.buildCompositeModelId)(providerKey, modelDef.name);
                this.modelConfigCache.set(compositeId, this.toAiModelConfig(compositeId, config, modelDef));
                this.providerModelDefCache.set(compositeId, {
                    providerName: providerKey,
                    modelDef
                });
                if (sdkInstance) {
                    this.modelRegistry.set(compositeId, {
                        modelId: compositeId,
                        sdkPackage: config.npm,
                        model: sdkInstance.createModel(modelDef.name),
                        supportsReasoning: modelDef.supportsReasoning,
                        providerName: providerKey,
                        modelsDevName: config.name
                    });
                }
            }
        }
    }
    toAiModelConfig(compositeId, providerConfig, modelDef) {
        return {
            modelId: compositeId,
            label: modelDef.label,
            sdkPackage: providerConfig.npm,
            description: modelDef.description ?? compositeId,
            modelFamily: modelDef.modelFamily ?? (0, _infermodelfamilyutil.inferModelFamily)(providerConfig.name ?? '', modelDef.name),
            dataResidency: providerConfig.dataResidency,
            inputCostPerMillionTokens: modelDef.inputCostPerMillionTokens ?? 0,
            outputCostPerMillionTokens: modelDef.outputCostPerMillionTokens ?? 0,
            cachedInputCostPerMillionTokens: modelDef.cachedInputCostPerMillionTokens,
            cacheCreationCostPerMillionTokens: modelDef.cacheCreationCostPerMillionTokens,
            longContextCost: modelDef.longContextCost,
            contextWindowTokens: modelDef.contextWindowTokens ?? _defaultcontextwindowtokensconst.DEFAULT_CONTEXT_WINDOW_TOKENS,
            maxOutputTokens: modelDef.maxOutputTokens ?? _defaultmaxoutputtokensconst.DEFAULT_MAX_OUTPUT_TOKENS,
            modalities: modelDef.modalities,
            supportsReasoning: modelDef.supportsReasoning,
            isDeprecated: modelDef.isDeprecated
        };
    }
    getModel(modelId) {
        this.ensureFresh();
        return this.modelRegistry.get(modelId);
    }
    getAvailableModels() {
        this.ensureFresh();
        return Array.from(this.modelRegistry.values());
    }
    getModelConfig(modelId) {
        this.ensureFresh();
        return this.modelConfigCache.get(modelId);
    }
    getRecommendedModelIds() {
        return this.preferencesService.getRecommendedModelIds();
    }
    getFirstAvailableModelFromList(modelIds) {
        for (const modelId of modelIds){
            const model = this.getModel(modelId);
            if (model) {
                return model;
            }
        }
        return undefined;
    }
    getDefaultSpeedModel() {
        return this.getDefaultModelForRole(_aimodelroleenum.AiModelRole.FAST);
    }
    getDefaultPerformanceModel() {
        return this.getDefaultModelForRole(_aimodelroleenum.AiModelRole.SMART);
    }
    getDefaultModelForRole(role) {
        const prefs = this.preferencesService.getPreferences();
        const preferenceKey = role === _aimodelroleenum.AiModelRole.FAST ? 'defaultFastModels' : 'defaultSmartModels';
        let model = this.getFirstAvailableModelFromList(prefs[preferenceKey] ?? []);
        if (!model) {
            model = this.getAvailableModels()[0];
        }
        if (!model) {
            throw new _aiexception.AiException('No AI models are available. Configure at least one AI provider.', _aiexception.AiExceptionCode.API_KEY_NOT_CONFIGURED);
        }
        return model;
    }
    getEffectiveModelConfig(modelId) {
        this.ensureFresh();
        if ((0, _utils.isAutoSelectModelId)(modelId)) {
            const defaultModel = modelId === _constants.AUTO_SELECT_FAST_MODEL_ID ? this.getDefaultSpeedModel() : this.getDefaultPerformanceModel();
            return this.modelConfigCache.get(defaultModel.modelId) ?? this.createDefaultConfigForCustomModel(defaultModel);
        }
        const config = this.modelConfigCache.get(modelId);
        if (config) {
            return config;
        }
        const registeredModel = this.getModel(modelId);
        if (registeredModel) {
            return this.createDefaultConfigForCustomModel(registeredModel);
        }
        throw new _aiexception.AiException(`Model with ID ${modelId} not found`, _aiexception.AiExceptionCode.AGENT_EXECUTION_FAILED);
    }
    createDefaultConfigForCustomModel(registeredModel) {
        return {
            modelId: registeredModel.modelId,
            label: registeredModel.modelId,
            description: `Custom model: ${registeredModel.modelId}`,
            modelFamily: (0, _infermodelfamilyutil.inferModelFamily)(registeredModel.modelsDevName ?? '', registeredModel.modelId),
            sdkPackage: registeredModel.sdkPackage,
            inputCostPerMillionTokens: 0,
            outputCostPerMillionTokens: 0,
            contextWindowTokens: _defaultcontextwindowtokensconst.DEFAULT_CONTEXT_WINDOW_TOKENS,
            maxOutputTokens: _defaultmaxoutputtokensconst.DEFAULT_MAX_OUTPUT_TOKENS
        };
    }
    isModelAdminAllowed(modelId) {
        if ((0, _utils.isAutoSelectModelId)(modelId)) {
            return true;
        }
        const prefs = this.preferencesService.getPreferences();
        const disabledModels = prefs.disabledModels ?? [];
        return !disabledModels.includes(modelId);
    }
    validateModelAvailability(modelId, workspace) {
        if (!this.isModelAdminAllowed(modelId)) {
            throw new _aiexception.AiException('The selected model has been disabled by the administrator.', _aiexception.AiExceptionCode.AGENT_EXECUTION_FAILED);
        }
        if (!(0, _ismodelallowedutil.isModelAllowedByWorkspace)(modelId, workspace, this.getRecommendedModelIds())) {
            throw new _aiexception.AiException('The selected model is not available in this workspace.', _aiexception.AiExceptionCode.AGENT_EXECUTION_FAILED);
        }
    }
    getAdminFilteredModels() {
        return this.getAvailableModels().filter((model)=>this.isModelAdminAllowed(model.modelId));
    }
    getAllModelsWithStatus() {
        this.ensureFresh();
        const recommended = this.getRecommendedModelIds();
        return Array.from(this.modelConfigCache.values()).map((modelConfig)=>{
            const registered = this.modelRegistry.get(modelConfig.modelId);
            const cached = this.providerModelDefCache.get(modelConfig.modelId);
            return {
                modelConfig,
                isAvailable: !!registered,
                isAdminEnabled: this.isModelAdminAllowed(modelConfig.modelId),
                isRecommended: recommended.has(modelConfig.modelId),
                providerName: registered?.providerName ?? cached?.providerName,
                name: cached?.modelDef.name
            };
        });
    }
    async setModelAdminEnabled(modelId, enabled) {
        this.validateModelInRegistry(modelId);
        await this.preferencesService.setModelAdminEnabled(modelId, enabled);
    }
    async setModelRecommended(modelId, recommended) {
        this.validateModelInRegistry(modelId);
        await this.preferencesService.setModelRecommended(modelId, recommended);
    }
    async setModelsAdminEnabled(modelIds, enabled) {
        modelIds.forEach((id)=>this.validateModelInRegistry(id));
        await this.preferencesService.setModelsAdminEnabled(modelIds, enabled);
    }
    async setModelsRecommended(modelIds, recommended) {
        modelIds.forEach((id)=>this.validateModelInRegistry(id));
        await this.preferencesService.setModelsRecommended(modelIds, recommended);
    }
    async setDefaultModel(role, modelId) {
        this.validateModelInRegistry(modelId);
        await this.preferencesService.setDefaultModel(role, modelId);
    }
    validateModelInRegistry(modelId) {
        this.ensureFresh();
        if (!this.providerModelDefCache.has(modelId)) {
            throw new _aiexception.AiException(`Cannot update model "${modelId}": not found in registry`, _aiexception.AiExceptionCode.AGENT_EXECUTION_FAILED);
        }
    }
    getResolvedProvidersForAdmin() {
        return this.providerConfigService.getResolvedProviders();
    }
    getCatalogProviderNames() {
        return this.providerConfigService.getCatalogProviderNames();
    }
    resolveModelForAgent(agent) {
        const aiModel = this.getEffectiveModelConfig(agent?.modelId ?? _constants.AUTO_SELECT_SMART_MODEL_ID);
        const registeredModel = this.getModel(aiModel.modelId);
        if (!registeredModel) {
            throw new _aiexception.AiException(`Model ${aiModel.modelId} not found in registry. Check that the corresponding AI provider is configured.`, _aiexception.AiExceptionCode.API_KEY_NOT_CONFIGURED);
        }
        return registeredModel;
    }
    constructor(providerConfigService, sdkProviderFactory, preferencesService, configGroupHashService){
        this.providerConfigService = providerConfigService;
        this.sdkProviderFactory = sdkProviderFactory;
        this.preferencesService = preferencesService;
        this.configGroupHashService = configGroupHashService;
        this.logger = new _common.Logger(AiModelRegistryService.name);
        this.modelRegistry = new Map();
        this.modelConfigCache = new Map();
        this.providerModelDefCache = new Map();
        this.currentConfigHash = null;
    }
};
AiModelRegistryService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _providerconfigservice.ProviderConfigService === "undefined" ? Object : _providerconfigservice.ProviderConfigService,
        typeof _sdkproviderfactoryservice.SdkProviderFactoryService === "undefined" ? Object : _sdkproviderfactoryservice.SdkProviderFactoryService,
        typeof _aimodelpreferencesservice.AiModelPreferencesService === "undefined" ? Object : _aimodelpreferencesservice.AiModelPreferencesService,
        typeof _configgrouphashservice.ConfigGroupHashService === "undefined" ? Object : _configgrouphashservice.ConfigGroupHashService
    ])
], AiModelRegistryService);

//# sourceMappingURL=ai-model-registry.service.js.map