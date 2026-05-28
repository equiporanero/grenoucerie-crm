"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "aiProviderAuthTypeSchema", {
    enumerable: true,
    get: function() {
        return aiProviderAuthTypeSchema;
    }
});
const _zod = require("zod");
const aiProviderAuthTypeSchema = _zod.z.enum([
    'key',
    'credentials',
    'role'
]);

//# sourceMappingURL=ai-provider-auth-type.schema.js.map