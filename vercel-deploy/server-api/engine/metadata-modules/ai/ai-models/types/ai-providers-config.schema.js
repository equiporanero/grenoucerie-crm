"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "aiProvidersConfigSchema", {
    enumerable: true,
    get: function() {
        return aiProvidersConfigSchema;
    }
});
const _zod = require("zod");
const _aiproviderconfigschema = require("./ai-provider-config.schema");
const aiProvidersConfigSchema = _zod.z.record(_zod.z.string(), _aiproviderconfigschema.aiProviderConfigSchema);

//# sourceMappingURL=ai-providers-config.schema.js.map