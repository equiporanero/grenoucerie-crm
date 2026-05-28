"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateCreateManyRecordInputSchema", {
    enumerable: true,
    get: function() {
        return generateCreateManyRecordInputSchema;
    }
});
const _zod = require("zod");
const _recordpropertieszodschema = require("../zod-schemas/record-properties.zod-schema");
const generateCreateManyRecordInputSchema = (objectMetadata, restrictedFields)=>{
    const recordSchema = (0, _recordpropertieszodschema.generateRecordPropertiesZodSchema)(objectMetadata, false, restrictedFields);
    return _zod.z.object({
        records: _zod.z.array(recordSchema).min(1).max(20).describe('Array of records to create. Each record should contain the required fields. Maximum 20 records per call.')
    });
};

//# sourceMappingURL=generate-create-many-record-input-schema.util.js.map