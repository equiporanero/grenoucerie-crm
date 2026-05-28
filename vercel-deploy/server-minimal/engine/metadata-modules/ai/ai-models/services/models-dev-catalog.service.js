"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModelsDevCatalogService", {
    enumerable: true,
    get: function() {
        return ModelsDevCatalogService;
    }
});
const _common = require("@nestjs/common");
const _ai = require("twenty-shared/ai");
const _modelsdevconst = require("../constants/models-dev.const");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const NON_LANGUAGE_PATTERNS = [
    'embed',
    'tts',
    'whisper',
    'dall-e',
    'moderation',
    'text-to-speech',
    'speech-to-text',
    'imagen',
    'aqa'
];
let ModelsDevCatalogService = class ModelsDevCatalogService {
    async getProviderSuggestions() {
        const data = await this.getCachedData();
        if (!data) {
            return [];
        }
        return Object.entries(data).filter(([, provider])=>{
            const models = Object.keys(provider.models ?? {});
            return models.some((modelId)=>this.isLanguageModel(modelId));
        }).map(([id, provider])=>({
                id,
                modelCount: Object.keys(provider.models ?? {}).filter((modelId)=>this.isLanguageModel(modelId)).length,
                npm: (0, _ai.inferAiSdkPackage)(id)
            })).sort((a, b)=>b.modelCount - a.modelCount);
    }
    async getModelSuggestions(providerType) {
        const data = await this.getCachedData();
        if (!data) {
            return [];
        }
        const providerData = data[providerType];
        if (!providerData?.models) {
            return [];
        }
        return Object.entries(providerData.models).filter(([modelId])=>this.isLanguageModel(modelId)).map(([modelId, model])=>({
                modelId,
                name: model.name ?? modelId,
                inputCostPerMillionTokens: model.cost?.input ?? 0,
                outputCostPerMillionTokens: model.cost?.output ?? 0,
                cachedInputCostPerMillionTokens: model.cost?.cache_read,
                cacheCreationCostPerMillionTokens: model.cost?.cache_write,
                contextWindowTokens: model.limit?.context ?? 0,
                maxOutputTokens: model.limit?.output ?? 0,
                modalities: (model.modalities?.input ?? []).filter((modality)=>modality !== 'text'),
                supportsReasoning: model.reasoning ?? false
            }));
    }
    async getCachedData() {
        const now = Date.now();
        if (this.cache && now - this.cacheTimestamp < CACHE_TTL_MS) {
            return this.cache;
        }
        try {
            const response = await fetch(_modelsdevconst.MODELS_DEV_API_URL, {
                signal: AbortSignal.timeout(15000)
            });
            if (!response.ok) {
                this.logger.warn(`models.dev API returned ${response.status}, using cached data`);
                return this.cache;
            }
            this.cache = await response.json();
            this.cacheTimestamp = now;
            return this.cache;
        } catch (error) {
            this.logger.warn(`Failed to fetch models.dev: ${error instanceof Error ? error.message : String(error)}`);
            return this.cache;
        }
    }
    isLanguageModel(modelId) {
        const id = modelId.toLowerCase();
        return !NON_LANGUAGE_PATTERNS.some((pattern)=>id.includes(pattern));
    }
    constructor(){
        this.logger = new _common.Logger(ModelsDevCatalogService.name);
        this.cache = null;
        this.cacheTimestamp = 0;
    }
};
ModelsDevCatalogService = _ts_decorate([
    (0, _common.Injectable)()
], ModelsDevCatalogService);

//# sourceMappingURL=models-dev-catalog.service.js.map