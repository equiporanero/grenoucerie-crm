"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isCompositeFieldMetadataType", {
    enumerable: true,
    get: function() {
        return isCompositeFieldMetadataType;
    }
});
const _types = require("twenty-shared/types");
const isCompositeFieldMetadataType = (type)=>{
    return [
        _types.FieldMetadataType.CURRENCY,
        _types.FieldMetadataType.FULL_NAME,
        _types.FieldMetadataType.ADDRESS,
        _types.FieldMetadataType.LINKS,
        _types.FieldMetadataType.ACTOR,
        _types.FieldMetadataType.EMAILS,
        _types.FieldMetadataType.PHONES,
        _types.FieldMetadataType.RICH_TEXT
    ].includes(type);
};

//# sourceMappingURL=is-composite-field-metadata-type.util.js.map