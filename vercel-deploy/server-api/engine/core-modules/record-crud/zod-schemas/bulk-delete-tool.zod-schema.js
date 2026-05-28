"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BulkDeleteToolInputSchema", {
    enumerable: true,
    get: function() {
        return BulkDeleteToolInputSchema;
    }
});
const _zod = require("zod");
const BulkDeleteToolInputSchema = _zod.z.object({
    filter: _zod.z.object({
        id: _zod.z.object({
            in: _zod.z.array(_zod.z.string().uuid()).describe('Array of record IDs to delete')
        }).describe('Filter to select records to delete')
    }).describe('Filter criteria to select records for bulk delete')
});

//# sourceMappingURL=bulk-delete-tool.zod-schema.js.map