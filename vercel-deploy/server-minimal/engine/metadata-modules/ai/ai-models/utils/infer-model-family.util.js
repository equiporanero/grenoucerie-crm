"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "inferModelFamily", {
    enumerable: true,
    get: function() {
        return inferModelFamily;
    }
});
const _modelfamilyenum = require("../types/model-family.enum");
// Maps models.dev provider names to model families.
const NAME_TO_MODEL_FAMILY = {
    openai: _modelfamilyenum.ModelFamily.GPT,
    anthropic: _modelfamilyenum.ModelFamily.CLAUDE,
    google: _modelfamilyenum.ModelFamily.GEMINI,
    mistral: _modelfamilyenum.ModelFamily.MISTRAL,
    xai: _modelfamilyenum.ModelFamily.GROK
};
// For aggregator providers (Groq, Bedrock, etc.), detect model family
// from the model's raw ID rather than assuming a fixed mapping.
const MODEL_ID_FAMILY_PATTERNS = [
    [
        /claude/i,
        _modelfamilyenum.ModelFamily.CLAUDE
    ],
    [
        /gpt|o[134]-|chatgpt/i,
        _modelfamilyenum.ModelFamily.GPT
    ],
    [
        /gemini/i,
        _modelfamilyenum.ModelFamily.GEMINI
    ],
    [
        /mistral|mixtral|pixtral/i,
        _modelfamilyenum.ModelFamily.MISTRAL
    ],
    [
        /grok/i,
        _modelfamilyenum.ModelFamily.GROK
    ]
];
const inferModelFamily = (providerName, modelName)=>{
    if (modelName) {
        for (const [pattern, family] of MODEL_ID_FAMILY_PATTERNS){
            if (pattern.test(modelName)) {
                return family;
            }
        }
    }
    return NAME_TO_MODEL_FAMILY[providerName];
};

//# sourceMappingURL=infer-model-family.util.js.map