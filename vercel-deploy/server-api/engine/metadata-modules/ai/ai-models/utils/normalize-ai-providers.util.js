"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "normalizeAiProviders", {
    enumerable: true,
    get: function() {
        return normalizeAiProviders;
    }
});
const normalizeAiProviders = (raw)=>{
    const result = {};
    for (const [key, config] of Object.entries(raw)){
        result[key] = {
            ...config,
            name: key,
            models: (config.models ?? []).map((model)=>({
                    ...model,
                    source: 'catalog'
                }))
        };
    }
    return result;
};

//# sourceMappingURL=normalize-ai-providers.util.js.map