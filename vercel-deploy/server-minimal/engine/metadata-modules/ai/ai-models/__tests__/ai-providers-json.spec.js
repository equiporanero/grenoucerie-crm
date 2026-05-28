"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _aiprovidersjson = /*#__PURE__*/ _interop_require_default(require("../ai-providers.json"));
const _aiprovidersconfigschema = require("../types/ai-providers-config.schema");
const _compositemodelidutil = require("../utils/composite-model-id.util");
const _normalizeaiprovidersutil = require("../utils/normalize-ai-providers.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const PROVIDERS = (0, _normalizeaiprovidersutil.normalizeAiProviders)(_aiprovidersjson.default);
const EXPECTED_PROVIDER_NAMES = [
    'openai',
    'anthropic',
    'google',
    'xai',
    'mistral'
];
describe('ai-providers.json integrity', ()=>{
    it('should pass Zod schema validation', ()=>{
        expect(()=>_aiprovidersconfigschema.aiProvidersConfigSchema.parse(_aiprovidersjson.default)).not.toThrow();
    });
    it('should have at least one model per expected provider', ()=>{
        EXPECTED_PROVIDER_NAMES.forEach((providerName)=>{
            const config = PROVIDERS[providerName];
            expect(config).toBeDefined();
            expect((config?.models?.length ?? 0) > 0).toBe(true);
        });
    });
    it('should have all required fields for each model', ()=>{
        Object.values(PROVIDERS).forEach((config)=>{
            (config.models ?? []).forEach((model)=>{
                expect(model.name).toBeDefined();
                expect(model.label).toBeDefined();
                expect(model.inputCostPerMillionTokens).toBeDefined();
                expect(model.outputCostPerMillionTokens).toBeDefined();
                expect(model.contextWindowTokens).toBeGreaterThan(0);
                expect(model.maxOutputTokens).toBeGreaterThan(0);
            });
        });
    });
    it('should have unique composite model IDs across all providers', ()=>{
        const allCompositeIds = [];
        Object.entries(PROVIDERS).forEach(([key, config])=>{
            (config.models ?? []).forEach((model)=>{
                allCompositeIds.push((0, _compositemodelidutil.buildCompositeModelId)(key, model.name));
            });
        });
        expect(new Set(allCompositeIds).size).toBe(allCompositeIds.length);
    });
    it('should have at least one non-deprecated model per expected provider', ()=>{
        EXPECTED_PROVIDER_NAMES.forEach((providerName)=>{
            const config = PROVIDERS[providerName];
            const hasActiveModel = (config?.models ?? []).some((model)=>!model.isDeprecated);
            expect(hasActiveModel).toBe(true);
        });
    });
    it('should set source to catalog for all models after normalization', ()=>{
        Object.values(PROVIDERS).forEach((config)=>{
            (config.models ?? []).forEach((model)=>{
                expect(model.source).toBe('catalog');
            });
        });
    });
    it('should have npm field set for all providers', ()=>{
        Object.values(PROVIDERS).forEach((config)=>{
            expect(config.npm).toBeDefined();
            expect(config.npm).toMatch(/^@ai-sdk\//);
        });
    });
});

//# sourceMappingURL=ai-providers-json.spec.js.map