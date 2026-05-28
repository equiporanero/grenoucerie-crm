"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateUpdateRecordInputSchema", {
    enumerable: true,
    get: function() {
        return generateUpdateRecordInputSchema;
    }
});
const _zod = require("zod");
const _recordpropertieszodschema = require("../zod-schemas/record-properties.zod-schema");
const generateUpdateRecordInputSchema = (objectMetadata, restrictedFields)=>{
    const recordPropertiesSchema = (0, _recordpropertieszodschema.generateRecordPropertiesZodSchema)(objectMetadata, false, restrictedFields);
    return recordPropertiesSchema.partial().extend({
        id: _zod.z.string().uuid({
            message: 'The unique identifier (UUID) of the record to update. This is required to identify which record should be modified.'
        })
    });
};

//# sourceMappingURL=generate-update-record-input-schema.util.js.map