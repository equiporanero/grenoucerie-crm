//Json.parse() for RawJsonField is done in formatFieldMetadataValue in ORM
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformRawJsonField", {
    enumerable: true,
    get: function() {
        return transformRawJsonField;
    }
});
const _isnullequivalentrawjsonfieldvalueutil = require("../utils/is-null-equivalent-raw-json-field-value.util");
const transformRawJsonField = (value)=>{
    return (0, _isnullequivalentrawjsonfieldvalueutil.isNullEquivalentRawJsonFieldValue)(value) ? null : value;
};

//# sourceMappingURL=transform-raw-json-field.util.js.map