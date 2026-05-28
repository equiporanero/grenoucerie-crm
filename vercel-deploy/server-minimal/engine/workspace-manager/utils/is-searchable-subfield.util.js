"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isSearchableSubfield", {
    enumerable: true,
    get: function() {
        return isSearchableSubfield;
    }
});
const _types = require("twenty-shared/types");
const isSearchableSubfield = (compositeFieldMetadataType, subFieldMetadataType, subFieldName)=>{
    if (subFieldMetadataType !== _types.FieldMetadataType.TEXT) {
        return false;
    }
    switch(compositeFieldMetadataType){
        case _types.FieldMetadataType.RICH_TEXT:
            return [
                'markdown'
            ].includes(subFieldName);
        case _types.FieldMetadataType.PHONES:
            return [
                'primaryPhoneNumber',
                'primaryPhoneCallingCode'
            ].includes(subFieldName);
        default:
            return true;
    }
};

//# sourceMappingURL=is-searchable-subfield.util.js.map