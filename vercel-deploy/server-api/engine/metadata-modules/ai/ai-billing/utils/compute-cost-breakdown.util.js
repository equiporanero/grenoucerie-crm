"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "computeCostBreakdown", {
    enumerable: true,
    get: function() {
        return computeCostBreakdown;
    }
});
const _modelfamilyenum = require("../../ai-models/types/model-family.enum");
const safeNumber = (value)=>{
    const result = value ?? 0;
    return Number.isFinite(result) ? result : 0;
};
const computeCostBreakdown = (model, usage)=>{
    const rawInputTokens = safeNumber(usage.inputTokens);
    const rawOutputTokens = safeNumber(usage.outputTokens);
    const reasoningTokens = safeNumber(usage.reasoningTokens);
    const cachedInputTokens = safeNumber(usage.cachedInputTokens);
    const cacheCreationTokens = safeNumber(usage.cacheCreationTokens);
    const isAnthropicTokenReporting = model.modelFamily === _modelfamilyenum.ModelFamily.CLAUDE;
    const adjustedInputTokens = isAnthropicTokenReporting ? rawInputTokens : Math.max(0, rawInputTokens - cachedInputTokens);
    const adjustedOutputTokens = isAnthropicTokenReporting ? rawOutputTokens : Math.max(0, rawOutputTokens - reasoningTokens);
    const totalInputTokens = isAnthropicTokenReporting ? rawInputTokens + cachedInputTokens + cacheCreationTokens : rawInputTokens + cacheCreationTokens;
    const costInfo = model.longContextCost && totalInputTokens > model.longContextCost.thresholdTokens ? model.longContextCost : model;
    const inputRate = costInfo.inputCostPerMillionTokens;
    const outputRate = costInfo.outputCostPerMillionTokens;
    const cachedRate = costInfo.cachedInputCostPerMillionTokens ?? inputRate;
    const cacheCreationRate = costInfo.cacheCreationCostPerMillionTokens ?? inputRate;
    const inputCostInDollars = adjustedInputTokens / 1_000_000 * inputRate + cachedInputTokens / 1_000_000 * cachedRate + cacheCreationTokens / 1_000_000 * cacheCreationRate;
    const outputCostInDollars = adjustedOutputTokens / 1_000_000 * outputRate + reasoningTokens / 1_000_000 * outputRate;
    return {
        totalCostInDollars: inputCostInDollars + outputCostInDollars,
        inputCostInDollars,
        outputCostInDollars,
        tokenCounts: {
            adjustedInputTokens,
            adjustedOutputTokens,
            cachedInputTokens,
            cacheCreationTokens,
            reasoningTokens,
            totalInputTokens
        }
    };
};

//# sourceMappingURL=compute-cost-breakdown.util.js.map