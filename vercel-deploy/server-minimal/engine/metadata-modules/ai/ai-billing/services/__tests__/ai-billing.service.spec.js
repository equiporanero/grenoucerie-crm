"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _usagerecordedconstant = require("../../../../../core-modules/usage/constants/usage-recorded.constant");
const _usageoperationtypeenum = require("../../../../../core-modules/usage/enums/usage-operation-type.enum");
const _usageresourcetypeenum = require("../../../../../core-modules/usage/enums/usage-resource-type.enum");
const _usageunitenum = require("../../../../../core-modules/usage/enums/usage-unit.enum");
const _billingservice = require("../../../../../core-modules/billing/services/billing.service");
const _billingusageservice = require("../../../../../core-modules/billing/services/billing-usage.service");
const _aibillingservice = require("../ai-billing.service");
const _modelfamilyenum = require("../../../ai-models/types/model-family.enum");
const _aimodelregistryservice = require("../../../ai-models/services/ai-model-registry.service");
const _workspacecacheservice = require("../../../../../workspace-cache/services/workspace-cache.service");
const _workspaceeventemitter = require("../../../../../workspace-event-emitter/workspace-event-emitter");
describe('AiBillingService', ()=>{
    let service;
    let mockWorkspaceEventEmitter;
    let mockAiModelRegistryService;
    const openaiModelConfig = {
        modelId: 'gpt-4o',
        label: 'GPT-4o',
        modelFamily: _modelfamilyenum.ModelFamily.GPT,
        sdkPackage: '@ai-sdk/openai',
        inputCostPerMillionTokens: 2.5,
        outputCostPerMillionTokens: 10.0,
        cachedInputCostPerMillionTokens: 1.25
    };
    const anthropicModelConfig = {
        modelId: 'claude-sonnet-4-5-20250929',
        label: 'Claude Sonnet 4.5',
        modelFamily: _modelfamilyenum.ModelFamily.CLAUDE,
        sdkPackage: '@ai-sdk/anthropic',
        inputCostPerMillionTokens: 3.0,
        outputCostPerMillionTokens: 15.0,
        cachedInputCostPerMillionTokens: 0.3,
        cacheCreationCostPerMillionTokens: 3.75
    };
    const defaultTokenDetails = {
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
    const mockTokenUsage = {
        inputTokens: 1000,
        outputTokens: 500,
        totalTokens: 1500,
        ...defaultTokenDetails
    };
    beforeEach(async ()=>{
        const mockEventEmitterMethods = {
            emitCustomBatchEvent: jest.fn()
        };
        const mockAiModelRegistryMethods = {
            getEffectiveModelConfig: jest.fn().mockReturnValue(openaiModelConfig)
        };
        const module = await _testing.Test.createTestingModule({
            providers: [
                _aibillingservice.AiBillingService,
                {
                    provide: _workspaceeventemitter.WorkspaceEventEmitter,
                    useValue: mockEventEmitterMethods
                },
                {
                    provide: _aimodelregistryservice.AiModelRegistryService,
                    useValue: mockAiModelRegistryMethods
                },
                {
                    provide: _billingservice.BillingService,
                    useValue: {
                        isBillingEnabled: jest.fn().mockReturnValue(false)
                    }
                },
                {
                    provide: _billingusageservice.BillingUsageService,
                    useValue: {
                        decrementAvailableCreditsInCache: jest.fn().mockResolvedValue(undefined)
                    }
                },
                {
                    provide: _workspacecacheservice.WorkspaceCacheService,
                    useValue: {
                        getOrRecompute: jest.fn().mockResolvedValue({
                            billingSubscription: {
                                currentPeriodStart: new Date('2026-04-01T00:00:00Z')
                            }
                        })
                    }
                }
            ]
        }).compile();
        service = module.get(_aibillingservice.AiBillingService);
        mockWorkspaceEventEmitter = module.get(_workspaceeventemitter.WorkspaceEventEmitter);
        mockAiModelRegistryService = module.get(_aimodelregistryservice.AiModelRegistryService);
    });
    it('should be defined', ()=>{
        expect(service).toBeDefined();
    });
    describe('calculateCost', ()=>{
        it('should calculate cost correctly for basic token usage', ()=>{
            const costInDollars = service.calculateCost('gpt-4o', {
                usage: mockTokenUsage
            });
            // (1000/1M * 2.5) + (500/1M * 10.0) = 0.0025 + 0.005 = 0.0075
            expect(costInDollars).toBeCloseTo(0.0075);
        });
        it('should apply cached rate for OpenAI cached tokens', ()=>{
            const costInDollars = service.calculateCost('gpt-4o', {
                usage: {
                    inputTokens: 1000,
                    outputTokens: 500,
                    totalTokens: 1500,
                    inputTokenDetails: {
                        noCacheTokens: 400,
                        cacheReadTokens: 600,
                        cacheWriteTokens: 0
                    },
                    outputTokenDetails: {
                        textTokens: 500,
                        reasoningTokens: 0
                    }
                }
            });
            // OpenAI: inputTokens includes cached, so adjusted = 1000 - 600 = 400
            // inputCost = (400/1M * 2.5) = 0.001
            // cachedCost = (600/1M * 1.25) = 0.00075
            // outputCost = (500/1M * 10.0) = 0.005
            // total = 0.00675
            expect(costInDollars).toBeCloseTo(0.00675);
        });
        it('should not subtract cached tokens from input for Anthropic', ()=>{
            mockAiModelRegistryService.getEffectiveModelConfig.mockReturnValue(anthropicModelConfig);
            const costInDollars = service.calculateCost('claude-sonnet-4-5-20250929', {
                usage: {
                    inputTokens: 400,
                    outputTokens: 500,
                    totalTokens: 900,
                    inputTokenDetails: {
                        noCacheTokens: 400,
                        cacheReadTokens: 600,
                        cacheWriteTokens: 0
                    },
                    outputTokenDetails: {
                        textTokens: 500,
                        reasoningTokens: 0
                    }
                },
                cacheCreationTokens: 200
            });
            // Anthropic: inputTokens already excludes cached
            // inputCost = (400/1M * 3.0) = 0.0012
            // cachedCost = (600/1M * 0.3) = 0.00018
            // cacheCreationCost = (200/1M * 3.75) = 0.00075
            // outputCost = (500/1M * 15.0) = 0.0075
            // total = 0.00963
            expect(costInDollars).toBeCloseTo(0.00963);
        });
        it('should charge reasoning tokens at the output rate without double-counting for OpenAI', ()=>{
            const costInDollars = service.calculateCost('gpt-4o', {
                usage: {
                    inputTokens: 1000,
                    outputTokens: 500,
                    totalTokens: 2000,
                    inputTokenDetails: {
                        noCacheTokens: 0,
                        cacheReadTokens: 0,
                        cacheWriteTokens: 0
                    },
                    outputTokenDetails: {
                        textTokens: 0,
                        reasoningTokens: 500
                    }
                }
            });
            // OpenAI: outputTokens (500) already includes reasoningTokens (500)
            // adjustedOutput = 500 - 500 = 0
            // inputCost = (1000/1M * 2.5) = 0.0025
            // outputCost = (0/1M * 10.0) = 0.0
            // reasoningCost = (500/1M * 10.0) = 0.005
            // total = 0.0075
            expect(costInDollars).toBeCloseTo(0.0075);
        });
        it('should use outputTokenDetails.reasoningTokens when present (SDK-aligned shape)', ()=>{
            const costInDollars = service.calculateCost('gpt-4o', {
                usage: {
                    inputTokens: 1000,
                    outputTokens: 500,
                    totalTokens: 2000,
                    inputTokenDetails: {
                        noCacheTokens: 0,
                        cacheReadTokens: 0,
                        cacheWriteTokens: 0
                    },
                    outputTokenDetails: {
                        textTokens: 0,
                        reasoningTokens: 500
                    }
                }
            });
            expect(costInDollars).toBeCloseTo(0.0075);
        });
        it('should use inputTokenDetails.cacheReadTokens when present (SDK-aligned shape)', ()=>{
            const costInDollars = service.calculateCost('gpt-4o', {
                usage: {
                    inputTokens: 1000,
                    outputTokens: 500,
                    totalTokens: 1500,
                    inputTokenDetails: {
                        noCacheTokens: 400,
                        cacheReadTokens: 600,
                        cacheWriteTokens: 0
                    },
                    outputTokenDetails: {
                        textTokens: 500,
                        reasoningTokens: 0
                    }
                }
            });
            expect(costInDollars).toBeCloseTo(0.00675);
        });
        it('should fall back to input rate when cachedInputCostPerMillionTokens is undefined', ()=>{
            mockAiModelRegistryService.getEffectiveModelConfig.mockReturnValue({
                ...openaiModelConfig,
                cachedInputCostPerMillionTokens: undefined
            });
            const costInDollars = service.calculateCost('gpt-4o', {
                usage: {
                    inputTokens: 1000,
                    outputTokens: 500,
                    totalTokens: 1500,
                    inputTokenDetails: {
                        noCacheTokens: 400,
                        cacheReadTokens: 600,
                        cacheWriteTokens: 0
                    },
                    outputTokenDetails: {
                        textTokens: 500,
                        reasoningTokens: 0
                    }
                }
            });
            // Falls back to full input rate for cached tokens
            // adjusted = 1000 - 600 = 400
            // inputCost = (400/1M * 2.5) = 0.001
            // cachedCost = (600/1M * 2.5) = 0.0015 (fallback to input rate)
            // outputCost = (500/1M * 10.0) = 0.005
            // total = 0.0075
            expect(costInDollars).toBeCloseTo(0.0075);
        });
        it('should use long context pricing when input exceeds threshold', ()=>{
            const anthropicWithLongContext = {
                ...anthropicModelConfig,
                longContextCost: {
                    inputCostPerMillionTokens: 6.0,
                    outputCostPerMillionTokens: 22.5,
                    cachedInputCostPerMillionTokens: 0.6,
                    cacheCreationCostPerMillionTokens: 7.5,
                    thresholdTokens: 200_000
                }
            };
            mockAiModelRegistryService.getEffectiveModelConfig.mockReturnValue(anthropicWithLongContext);
            const costInDollars = service.calculateCost('claude-sonnet-4-5-20250929', {
                usage: {
                    inputTokens: 150_000,
                    outputTokens: 1000,
                    totalTokens: 251_000,
                    cachedInputTokens: 100_000,
                    inputTokenDetails: {
                        noCacheTokens: 0,
                        cacheReadTokens: 100_000,
                        cacheWriteTokens: 0
                    },
                    outputTokenDetails: {
                        textTokens: 1000,
                        reasoningTokens: 0
                    }
                }
            });
            // Anthropic: total input = 150k + 100k + 0 = 250k > 200k threshold
            // Uses long context rates
            // inputCost = (150_000/1M * 6.0) = 0.9
            // cachedCost = (100_000/1M * 0.6) = 0.06
            // outputCost = (1000/1M * 22.5) = 0.0225
            // total = 0.9825
            expect(costInDollars).toBeCloseTo(0.9825);
        });
        it('should use standard pricing when input is below threshold', ()=>{
            const anthropicWithLongContext = {
                ...anthropicModelConfig,
                longContextCost: {
                    inputCostPerMillionTokens: 6.0,
                    outputCostPerMillionTokens: 22.5,
                    cachedInputCostPerMillionTokens: 0.6,
                    cacheCreationCostPerMillionTokens: 7.5,
                    thresholdTokens: 200_000
                }
            };
            mockAiModelRegistryService.getEffectiveModelConfig.mockReturnValue(anthropicWithLongContext);
            const costInDollars = service.calculateCost('claude-sonnet-4-5-20250929', {
                usage: {
                    inputTokens: 50_000,
                    outputTokens: 1000,
                    totalTokens: 51_000,
                    ...defaultTokenDetails
                }
            });
            // Total input = 50k < 200k threshold -> standard rates
            // inputCost = (50_000/1M * 3.0) = 0.15
            // outputCost = (1000/1M * 15.0) = 0.015
            // total = 0.165
            expect(costInDollars).toBeCloseTo(0.165);
        });
    });
    describe('calculateAndBillUsage', ()=>{
        it('should calculate cost and emit billing event when model exists', async ()=>{
            await service.calculateAndBillUsage('gpt-4o', {
                usage: mockTokenUsage
            }, 'workspace-1', _usageoperationtypeenum.UsageOperationType.AI_CHAT_TOKEN, 'agent-id-123');
            expect(mockWorkspaceEventEmitter.emitCustomBatchEvent).toHaveBeenCalledWith(_usagerecordedconstant.USAGE_RECORDED, [
                {
                    resourceType: _usageresourcetypeenum.UsageResourceType.AI,
                    operationType: _usageoperationtypeenum.UsageOperationType.AI_CHAT_TOKEN,
                    creditsUsedMicro: 7500,
                    quantity: 1500,
                    unit: _usageunitenum.UsageUnit.TOKEN,
                    resourceId: 'agent-id-123',
                    resourceContext: 'gpt-4o',
                    userWorkspaceId: null
                }
            ], 'workspace-1');
        });
    });
});

//# sourceMappingURL=ai-billing.service.spec.js.map