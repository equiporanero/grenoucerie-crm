"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseNumberValue", {
    enumerable: true,
    get: function() {
        return parseNumberValue;
    }
});
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const parseNumberValue = (value, fieldType)=>{
    if (typeof value !== 'string') {
        return value;
    }
    switch(fieldType){
        case _types.FieldMetadataType.NUMBER:
        case _types.FieldMetadataType.NUMERIC:
        case _types.FieldMetadataType.POSITION:
            return parseFloat(value);
        default:
            (0, _utils.assertUnreachable)(fieldType);
    }
};

//# sourceMappingURL=parse-number-value.util.js.map