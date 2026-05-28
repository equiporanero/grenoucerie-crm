"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isFieldMetadataTypeRelation", {
    enumerable: true,
    get: function() {
        return isFieldMetadataTypeRelation;
    }
});
const _types = require("twenty-shared/types");
const isFieldMetadataTypeRelation = (fieldMetadata)=>{
    return fieldMetadata.type === _types.FieldMetadataType.RELATION;
};

//# sourceMappingURL=is-field-metadata-type-relation.util.js.map