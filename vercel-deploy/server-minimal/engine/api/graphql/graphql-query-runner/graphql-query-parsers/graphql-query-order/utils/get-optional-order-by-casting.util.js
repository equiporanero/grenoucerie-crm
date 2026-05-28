"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getOptionalOrderByCasting", {
    enumerable: true,
    get: function() {
        return getOptionalOrderByCasting;
    }
});
const _types = require("twenty-shared/types");
const getOptionalOrderByCasting = (fieldMetadata)=>{
    if (fieldMetadata.type === _types.FieldMetadataType.SELECT || fieldMetadata.type === _types.FieldMetadataType.MULTI_SELECT) {
        return '::text';
    }
    return '';
};

//# sourceMappingURL=get-optional-order-by-casting.util.js.map