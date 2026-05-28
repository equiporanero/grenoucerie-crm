"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isFunctionDefaultValue", {
    enumerable: true,
    get: function() {
        return isFunctionDefaultValue;
    }
});
const _types = require("twenty-shared/types");
const isFunctionDefaultValue = (defaultValue)=>{
    return typeof defaultValue === 'string' && !defaultValue.startsWith("'") && Object.values(_types.fieldMetadataDefaultValueFunctionName).includes(defaultValue);
};

//# sourceMappingURL=is-function-default-value.util.js.map