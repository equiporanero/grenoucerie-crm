"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "aiProviderConfigSchema", {
    enumerable: true,
    get: function() {
        return aiProviderConfigSchema;
    }
});
const _zod = require("zod");
const _ai = require("twenty-shared/ai");
const _aiproviderauthtypeschema = require("./ai-provider-auth-type.schema");
const _aiprovidermodelconfigschema = require("./ai-provider-model-config.schema");
const aiProviderConfigSchema = _zod.z.object({
    npm: _zod.z.enum(_ai.AI_SDK_PACKAGES),
    name: _zod.z.string().optional(),
    label: _zod.z.string().optional(),
    authType: _aiproviderauthtypeschema.aiProviderAuthTypeSchema.optional(),
    apiKey: _zod.z.string().optional(),
    baseUrl: _zod.z.string().optional(),
    region: _zod.z.string().optional(),
    dataResidency: _zod.z.enum(_ai.DATA_RESIDENCY_KEYS).optional(),
    accessKeyId: _zod.z.string().optional(),
    secretAccessKey: _zod.z.string().optional(),
    sessionToken: _zod.z.string().optional(),
    models: _zod.z.array(_aiprovidermodelconfigschema.aiProviderModelConfigSchema).optional()
});

//# sourceMappingURL=ai-provider-config.schema.js.map