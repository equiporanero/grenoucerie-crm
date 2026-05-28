"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateUpdateManyRecordInputSchema", {
    enumerable: true,
    get: function() {
        return generateUpdateManyRecordInputSchema;
    }
});
const _zod = require("zod");
const _recordfilterzodschema = require("../zod-schemas/record-filter.zod-schema");
const _recordpropertieszodschema = require("../zod-schemas/record-properties.zod-schema");
const generateUpdateManyRecordInputSchema = (objectMetadata, restrictedFields)=>{
    const { filterSchema } = (0, _recordfilterzodschema.generateRecordFilterSchema)(objectMetadata, restrictedFields);
    const dataSchema = (0, _recordpropertieszodschema.generateRecordPropertiesZodSchema)(objectMetadata, false, restrictedFields).partial();
    return _zod.z.object({
        filter: filterSchema.describe('Filter to select which records to update. Supports field-level filters and logical operators (or, and, not). WARNING: A broad filter may update many records at once. Always verify the filter scope with a find query first.'),
        data: dataSchema.describe('The field values to apply to all matching records. Only include fields you want to change.')
    });
};

//# sourceMappingURL=generate-update-many-record-input-schema.util.js.map