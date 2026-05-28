"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isTextColumnType", {
    enumerable: true,
    get: function() {
        return isTextColumnType;
    }
});
const _types = require("twenty-shared/types");
const isTextColumnType = (type)=>{
    return type === _types.FieldMetadataType.TEXT || type === _types.FieldMetadataType.ARRAY || type === 'RICH_TEXT_V2' || type === 'RICH_TEXT';
};

//# sourceMappingURL=is-text-column-type.util.js.map