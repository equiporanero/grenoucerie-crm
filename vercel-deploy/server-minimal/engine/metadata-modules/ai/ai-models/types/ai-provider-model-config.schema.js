"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "aiProviderModelConfigSchema", {
    enumerable: true,
    get: function() {
        return aiProviderModelConfigSchema;
    }
});
const _zod = require("zod");
const _modelfamilyenum = require("./model-family.enum");
const _longcontextcostschema = require("./long-context-cost.schema");
const aiProviderModelConfigSchema = _zod.z.object({
    name: _zod.z.string(),
    label: _zod.z.string(),
    description: _zod.z.string().optional(),
    modelFamily: _zod.z.nativeEnum(_modelfamilyenum.ModelFamily).optional(),
    inputCostPerMillionTokens: _zod.z.number().optional(),
    outputCostPerMillionTokens: _zod.z.number().optional(),
    cachedInputCostPerMillionTokens: _zod.z.number().optional(),
    cacheCreationCostPerMillionTokens: _zod.z.number().optional(),
    longContextCost: _longcontextcostschema.longContextCostSchema.optional(),
    contextWindowTokens: _zod.z.number().int().positive().optional(),
    maxOutputTokens: _zod.z.number().int().positive().optional(),
    modalities: _zod.z.array(_zod.z.string()).optional(),
    supportsReasoning: _zod.z.boolean().optional(),
    isDeprecated: _zod.z.boolean().optional()
});

//# sourceMappingURL=ai-provider-model-config.schema.js.map