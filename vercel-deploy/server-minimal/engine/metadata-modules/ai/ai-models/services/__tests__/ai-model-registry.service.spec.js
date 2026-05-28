"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _configgrouphashservice = require("../../../../../core-modules/twenty-config/services/config-group-hash.service");
const _twentyconfigservice = require("../../../../../core-modules/twenty-config/twenty-config.service");
const _aimodelpreferencesservice = require("../ai-model-preferences.service");
const _aimodelregistryservice = require("../ai-model-registry.service");
const _providerconfigservice = require("../provider-config.service");
const _sdkproviderfactoryservice = require("../sdk-provider-factory.service");
const _constants = require("twenty-shared/constants");
describe('AiModelRegistryService', ()=>{
    let service;
    let mockConfigService;
    let mockPreferencesService;
    beforeEach(async ()=>{
        mockConfigService = {
            get: jest.fn().mockReturnValue({})
        };
        const mockProviderConfigService = {
            getResolvedProviders: jest.fn().mockReturnValue({})
        };
        mockPreferencesService = {
            getPreferences: jest.fn().mockReturnValue({}),
            getRecommendedModelIds: jest.fn().mockReturnValue(new Set())
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _aimodelregistryservice.AiModelRegistryService,
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: mockConfigService
                },
                {
                    provide: _providerconfigservice.ProviderConfigService,
                    useValue: mockProviderConfigService
                },
                {
                    provide: _sdkproviderfactoryservice.SdkProviderFactoryService,
                    useValue: {
                        clearCache: jest.fn()
                    }
                },
                {
                    provide: _aimodelpreferencesservice.AiModelPreferencesService,
                    useValue: mockPreferencesService
                },
                {
                    provide: _configgrouphashservice.ConfigGroupHashService,
                    useValue: {
                        computeHash: jest.fn().mockReturnValue('')
                    }
                }
            ]
        }).compile();
        service = module.get(_aimodelregistryservice.AiModelRegistryService);
    });
    it('should throw when no models are available for AUTO_SELECT_SMART_MODEL_ID', ()=>{
        expect(()=>service.getEffectiveModelConfig(_constants.AUTO_SELECT_SMART_MODEL_ID)).toThrow('No AI models are available. Configure at least one AI provider.');
    });
    it('should return effective model config for AUTO_SELECT_SMART_MODEL_ID when models are available', ()=>{
        jest.spyOn(service, 'getAvailableModels').mockReturnValue([
            {
                modelId: 'openai/gpt-5.2',
                sdkPackage: '@ai-sdk/openai',
                model: {}
            }
        ]);
        jest.spyOn(service, 'getModel').mockReturnValue({
            modelId: 'openai/gpt-5.2',
            sdkPackage: '@ai-sdk/openai',
            model: {}
        });
        const result = service.getEffectiveModelConfig(_constants.AUTO_SELECT_SMART_MODEL_ID);
        expect(result).toBeDefined();
        expect(result.modelId).toBe('openai/gpt-5.2');
        expect(result.sdkPackage).toBe('@ai-sdk/openai');
    });
    it('should return effective model config for AUTO_SELECT_SMART_MODEL_ID with custom model', ()=>{
        jest.spyOn(service, 'getAvailableModels').mockReturnValue([
            {
                modelId: 'custom/mistral',
                sdkPackage: '@ai-sdk/openai-compatible',
                model: {}
            }
        ]);
        jest.spyOn(service, 'getModel').mockReturnValue({
            modelId: 'custom/mistral',
            sdkPackage: '@ai-sdk/openai-compatible',
            model: {}
        });
        const result = service.getEffectiveModelConfig(_constants.AUTO_SELECT_SMART_MODEL_ID);
        expect(result).toBeDefined();
        expect(result.modelId).toBe('custom/mistral');
        expect(result.sdkPackage).toBe('@ai-sdk/openai-compatible');
        expect(result.label).toBe('custom/mistral');
        expect(result.inputCostPerMillionTokens).toBe(0);
        expect(result.outputCostPerMillionTokens).toBe(0);
    });
    it('should return effective model config for custom model', ()=>{
        jest.spyOn(service, 'getModel').mockReturnValue({
            modelId: 'custom/mistral',
            sdkPackage: '@ai-sdk/openai-compatible',
            model: {}
        });
        const result = service.getEffectiveModelConfig('custom/mistral');
        expect(result).toBeDefined();
        expect(result.modelId).toBe('custom/mistral');
        expect(result.sdkPackage).toBe('@ai-sdk/openai-compatible');
        expect(result.label).toBe('custom/mistral');
        expect(result.inputCostPerMillionTokens).toBe(0);
        expect(result.outputCostPerMillionTokens).toBe(0);
    });
    it('should throw error for non-existent model', ()=>{
        jest.spyOn(service, 'getModel').mockReturnValue(undefined);
        expect(()=>service.getEffectiveModelConfig('non-existent-model')).toThrow('Model with ID non-existent-model not found');
    });
    it('should find first available model from preferences list', ()=>{
        mockPreferencesService.getPreferences.mockReturnValue({
            defaultFastModels: [
                'openai/gpt-5-mini',
                'anthropic/claude-haiku-4-5-20251001',
                'google/gemini-3-flash-preview'
            ]
        });
        const getModelSpy = jest.spyOn(service, 'getModel').mockImplementation((modelId)=>{
            if (modelId === 'anthropic/claude-haiku-4-5-20251001') {
                return {
                    modelId: 'anthropic/claude-haiku-4-5-20251001',
                    sdkPackage: '@ai-sdk/anthropic',
                    model: {}
                };
            }
            return undefined;
        });
        const result = service.getDefaultSpeedModel();
        expect(result).toBeDefined();
        expect(result.modelId).toBe('anthropic/claude-haiku-4-5-20251001');
        expect(getModelSpy).toHaveBeenCalledWith('openai/gpt-5-mini');
        expect(getModelSpy).toHaveBeenCalledWith('anthropic/claude-haiku-4-5-20251001');
    });
    it('should fall back to any available model if none in list are available', ()=>{
        mockPreferencesService.getPreferences.mockReturnValue({
            defaultFastModels: [
                'model-a',
                'model-b',
                'model-c'
            ]
        });
        jest.spyOn(service, 'getModel').mockReturnValue(undefined);
        jest.spyOn(service, 'getAvailableModels').mockReturnValue([
            {
                modelId: 'fallback-model',
                sdkPackage: '@ai-sdk/openai-compatible',
                model: {}
            }
        ]);
        const result = service.getDefaultSpeedModel();
        expect(result).toBeDefined();
        expect(result.modelId).toBe('fallback-model');
    });
});

//# sourceMappingURL=ai-model-registry.service.spec.js.map