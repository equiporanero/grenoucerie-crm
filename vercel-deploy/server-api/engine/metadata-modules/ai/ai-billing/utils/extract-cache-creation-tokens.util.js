"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get extractCacheCreationTokens () {
        return extractCacheCreationTokens;
    },
    get extractCacheCreationTokensFromSteps () {
        return extractCacheCreationTokensFromSteps;
    }
});
const extractCacheCreationTokensFromSteps = (steps)=>{
    return steps.reduce((sum, step)=>{
        return sum + extractCacheCreationTokens(step.providerMetadata);
    }, 0);
};
const extractCacheCreationTokens = (providerMetadata)=>{
    const anthropicMeta = providerMetadata?.anthropic;
    const bedrockUsage = providerMetadata?.bedrock?.usage;
    return anthropicMeta?.cacheCreationInputTokens ?? bedrockUsage?.cacheWriteInputTokens ?? 0;
};

//# sourceMappingURL=extract-cache-creation-tokens.util.js.map