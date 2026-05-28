"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FindOneToolInputSchema", {
    enumerable: true,
    get: function() {
        return FindOneToolInputSchema;
    }
});
const _zod = require("zod");
const FindOneToolInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('The unique UUID of the record to retrieve')
});

//# sourceMappingURL=find-one-tool.zod-schema.js.map