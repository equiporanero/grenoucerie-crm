"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isFlatFieldMetadataOfTypes", {
    enumerable: true,
    get: function() {
        return isFlatFieldMetadataOfTypes;
    }
});
function isFlatFieldMetadataOfTypes(fieldMetadata, types) {
    return types.includes(fieldMetadata.type);
}

//# sourceMappingURL=is-flat-field-metadata-of-types.util.js.map