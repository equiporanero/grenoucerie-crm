"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateAndTransformArrayItems", {
    enumerable: true,
    get: function() {
        return validateAndTransformArrayItems;
    }
});
const _validateandtransformvaluebyfieldtypeutil = require("./validate-and-transform-value-by-field-type.util");
const validateAndTransformArrayItems = (values, fieldMetadata, fieldName)=>{
    return values.map((item)=>{
        if (item === null) {
            return item;
        }
        return (0, _validateandtransformvaluebyfieldtypeutil.validateAndTransformValueByFieldType)(item, fieldMetadata, fieldName);
    });
};

//# sourceMappingURL=validate-and-transform-array-items.util.js.map