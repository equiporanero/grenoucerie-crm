"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "longContextCostSchema", {
    enumerable: true,
    get: function() {
        return longContextCostSchema;
    }
});
const _zod = require("zod");
const longContextCostSchema = _zod.z.object({
    inputCostPerMillionTokens: _zod.z.number(),
    outputCostPerMillionTokens: _zod.z.number(),
    cachedInputCostPerMillionTokens: _zod.z.number().optional(),
    cacheCreationCostPerMillionTokens: _zod.z.number().optional(),
    thresholdTokens: _zod.z.number()
});

//# sourceMappingURL=long-context-cost.schema.js.map