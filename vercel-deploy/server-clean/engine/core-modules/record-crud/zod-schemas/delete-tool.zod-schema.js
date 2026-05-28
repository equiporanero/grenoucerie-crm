"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DeleteToolInputSchema", {
    enumerable: true,
    get: function() {
        return DeleteToolInputSchema;
    }
});
const _zod = require("zod");
const DeleteToolInputSchema = _zod.z.object({
    id: _zod.z.string().uuid().describe('The unique UUID of the record to delete')
});

//# sourceMappingURL=delete-tool.zod-schema.js.map