"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isCompositePropertySupportedInGroupBy", {
    enumerable: true,
    get: function() {
        return isCompositePropertySupportedInGroupBy;
    }
});
const _types = require("twenty-shared/types");
const isCompositePropertySupportedInGroupBy = (property)=>{
    return property.hidden !== true && property.type !== _types.FieldMetadataType.RAW_JSON;
};

//# sourceMappingURL=is-composite-property-supported-in-group-by.util.js.map