"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isMorphRelationFieldMetadataType", {
    enumerable: true,
    get: function() {
        return isMorphRelationFieldMetadataType;
    }
});
const _types = require("twenty-shared/types");
const isMorphRelationFieldMetadataType = (type)=>{
    return type === _types.FieldMetadataType.MORPH_RELATION;
};

//# sourceMappingURL=is-morph-relation-field-metadata-type.util.js.map