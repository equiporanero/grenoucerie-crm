"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AiModelPreferencesService", {
    enumerable: true,
    get: function() {
        return AiModelPreferencesService;
    }
});
const _common = require("@nestjs/common");
const _twentyconfigservice = require("../../../../core-modules/twenty-config/twenty-config.service");
const _aimodelroleenum = require("../types/ai-model-role.enum");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AiModelPreferencesService = class AiModelPreferencesService {
    getPreferences() {
        return {
            defaultFastModels: this.twentyConfigService.get('AI_MODELS_DEFAULT_FAST'),
            defaultSmartModels: this.twentyConfigService.get('AI_MODELS_DEFAULT_SMART'),
            recommendedModels: this.twentyConfigService.get('AI_MODELS_DEFAULT_RECOMMENDED'),
            disabledModels: this.twentyConfigService.get('AI_MODELS_DEFAULT_DISABLED')
        };
    }
    getRecommendedModelIds() {
        return new Set(this.getPreferences().recommendedModels ?? []);
    }
    async setModelAdminEnabled(modelId, enabled) {
        await this.togglePreferenceList(modelId, 'disabledModels', !enabled);
    }
    async setModelRecommended(modelId, recommended) {
        await this.togglePreferenceList(modelId, 'recommendedModels', recommended);
    }
    async setModelsAdminEnabled(modelIds, enabled) {
        await this.togglePreferenceListBulk(modelIds, 'disabledModels', !enabled);
    }
    async setModelsRecommended(modelIds, recommended) {
        await this.togglePreferenceListBulk(modelIds, 'recommendedModels', recommended);
    }
    async setDefaultModel(role, modelId) {
        const prefs = {
            ...this.getPreferences()
        };
        const key = role === _aimodelroleenum.AiModelRole.FAST ? 'defaultFastModels' : 'defaultSmartModels';
        const current = prefs[key] ?? [];
        prefs[key] = [
            modelId,
            ...current.filter((id)=>id !== modelId)
        ];
        await this.persistPreferences(prefs);
    }
    async togglePreferenceList(modelId, key, add) {
        await this.togglePreferenceListBulk([
            modelId
        ], key, add);
    }
    async togglePreferenceListBulk(modelIds, key, add) {
        const prefs = {
            ...this.getPreferences()
        };
        const current = prefs[key] ?? [];
        const idSet = new Set(modelIds);
        if (add) {
            const existing = new Set(current);
            prefs[key] = [
                ...current,
                ...modelIds.filter((id)=>!existing.has(id))
            ];
        } else {
            prefs[key] = current.filter((id)=>!idSet.has(id));
        }
        await this.persistPreferences(prefs);
    }
    async persistPreferences(prefs) {
        await Promise.all([
            this.twentyConfigService.set('AI_MODELS_DEFAULT_FAST', prefs.defaultFastModels ?? []),
            this.twentyConfigService.set('AI_MODELS_DEFAULT_SMART', prefs.defaultSmartModels ?? []),
            this.twentyConfigService.set('AI_MODELS_DEFAULT_RECOMMENDED', prefs.recommendedModels ?? []),
            this.twentyConfigService.set('AI_MODELS_DEFAULT_DISABLED', prefs.disabledModels ?? [])
        ]);
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
    }
};
AiModelPreferencesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], AiModelPreferencesService);

//# sourceMappingURL=ai-model-preferences.service.js.map