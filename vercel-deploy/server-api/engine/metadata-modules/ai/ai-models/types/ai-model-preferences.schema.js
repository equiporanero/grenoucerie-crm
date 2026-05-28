"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "aiModelPreferencesSchema", {
    enumerable: true,
    get: function() {
        return aiModelPreferencesSchema;
    }
});
const _zod = require("zod");
const aiModelPreferencesSchema = _zod.z.object({
    disabledModels: _zod.z.array(_zod.z.string()).optional(),
    recommendedModels: _zod.z.array(_zod.z.string()).optional(),
    defaultFastModels: _zod.z.array(_zod.z.string()).optional(),
    defaultSmartModels: _zod.z.array(_zod.z.string()).optional()
});

//# sourceMappingURL=ai-model-preferences.schema.js.map