"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateCreateRecordInputSchema", {
    enumerable: true,
    get: function() {
        return generateCreateRecordInputSchema;
    }
});
const _recordpropertieszodschema = require("../zod-schemas/record-properties.zod-schema");
const generateCreateRecordInputSchema = (objectMetadata, restrictedFields)=>{
    return (0, _recordpropertieszodschema.generateRecordPropertiesZodSchema)(objectMetadata, false, restrictedFields);
};

//# sourceMappingURL=generate-create-record-input-schema.util.js.map