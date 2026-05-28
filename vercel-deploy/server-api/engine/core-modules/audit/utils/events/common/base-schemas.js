"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "baseEventSchema", {
    enumerable: true,
    get: function() {
        return baseEventSchema;
    }
});
const _zod = require("zod");
const baseEventSchema = _zod.z.strictObject({
    timestamp: _zod.z.string(),
    userId: _zod.z.string().nullish(),
    workspaceId: _zod.z.string().nullish(),
    version: _zod.z.string()
});

//# sourceMappingURL=base-schemas.js.map