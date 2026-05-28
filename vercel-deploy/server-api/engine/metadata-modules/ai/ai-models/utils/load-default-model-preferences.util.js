// TODO: derive default model preferences dynamically from the catalog
// instead of hardcoding model IDs that become stale as models evolve
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
    get DEFAULT_DISABLED_MODELS () {
        return DEFAULT_DISABLED_MODELS;
    },
    get DEFAULT_FAST_MODELS () {
        return DEFAULT_FAST_MODELS;
    },
    get DEFAULT_MODEL_PREFERENCES () {
        return DEFAULT_MODEL_PREFERENCES;
    },
    get DEFAULT_RECOMMENDED_MODELS () {
        return DEFAULT_RECOMMENDED_MODELS;
    },
    get DEFAULT_SMART_MODELS () {
        return DEFAULT_SMART_MODELS;
    }
});
const DEFAULT_FAST_MODELS = [
    'openai/gpt-5-mini',
    'anthropic/claude-haiku-4-5-20251001',
    'google/gemini-3-flash-preview',
    'xai/grok-4-1-fast',
    'mistral/mistral-large-latest'
];
const DEFAULT_SMART_MODELS = [
    'openai/gpt-5.2',
    'anthropic/claude-sonnet-4-6',
    'google/gemini-3.1-pro-preview',
    'xai/grok-4',
    'mistral/mistral-large-latest'
];
const DEFAULT_RECOMMENDED_MODELS = [
    'openai/gpt-5.2',
    'openai/gpt-4.1',
    'anthropic/claude-opus-4-6',
    'anthropic/claude-sonnet-4-6',
    'google/gemini-3.1-pro-preview',
    'xai/grok-4'
];
const DEFAULT_DISABLED_MODELS = [];
const DEFAULT_MODEL_PREFERENCES = {
    disabledModels: [],
    recommendedModels: DEFAULT_RECOMMENDED_MODELS,
    defaultFastModels: DEFAULT_FAST_MODELS,
    defaultSmartModels: DEFAULT_SMART_MODELS
};

//# sourceMappingURL=load-default-model-preferences.util.js.map