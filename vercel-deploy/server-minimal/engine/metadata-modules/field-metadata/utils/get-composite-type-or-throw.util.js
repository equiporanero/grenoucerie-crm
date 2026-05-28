"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getCompositeTypeOrThrow", {
    enumerable: true,
    get: function() {
        return getCompositeTypeOrThrow;
    }
});
const _types = require("twenty-shared/types");
const _fieldmetadataexception = require("../field-metadata.exception");
const getCompositeTypeOrThrow = (fieldType)=>{
    const compositeType = _types.compositeTypeDefinitions.get(fieldType);
    if (!compositeType) {
        throw new _fieldmetadataexception.FieldMetadataException(`Composite type not found for field metadata type: ${fieldType}`, _fieldmetadataexception.FieldMetadataExceptionCode.UNCOVERED_FIELD_METADATA_TYPE_VALIDATION);
    }
    return compositeType;
};

//# sourceMappingURL=get-composite-type-or-throw.util.js.map