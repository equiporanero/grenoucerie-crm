"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateFindToolInputSchema", {
    enumerable: true,
    get: function() {
        return generateFindToolInputSchema;
    }
});
const _zod = require("zod");
const _orderbyzodschema = require("./order-by.zod-schema");
const _recordfilterzodschema = require("./record-filter.zod-schema");
const generateFindToolInputSchema = (objectMetadata, restrictedFields)=>{
    const { filterShape, filterSchema } = (0, _recordfilterzodschema.generateRecordFilterSchema)(objectMetadata, restrictedFields);
    return _zod.z.object({
        limit: _zod.z.number().int().positive().max(100).default(10).describe('Maximum number of records to return (default: 10, max: 100). Start small and increase only if needed.'),
        offset: _zod.z.number().int().nonnegative().default(0).describe('Number of records to skip (default: 0)'),
        orderBy: _orderbyzodschema.ObjectRecordOrderBySchema.describe('Sort records by field(s). CRITICAL for "top N", "largest", "smallest" queries. Each item is an object with exactly ONE property: field name as key, sort direction as value. Example: [{"employees": "DescNullsLast"}] sorts employees descending. Use "DescNullsLast" for top/largest, "AscNullsFirst" for bottom/smallest.'),
        ...filterShape,
        or: _zod.z.array(filterSchema).optional().describe('OR condition - matches if ANY of the filters match'),
        and: _zod.z.array(filterSchema).optional().describe('AND condition - matches if ALL filters match'),
        not: filterSchema.optional().describe('NOT condition - matches if the filter does NOT match')
    });
};

//# sourceMappingURL=find-tool.zod-schema.js.map