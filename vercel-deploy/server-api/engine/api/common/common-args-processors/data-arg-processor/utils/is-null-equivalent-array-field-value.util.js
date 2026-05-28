"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isNullEquivalentArrayFieldValue", {
    enumerable: true,
    get: function() {
        return isNullEquivalentArrayFieldValue;
    }
});
const isNullEquivalentArrayFieldValue = (value)=>{
    return Array.isArray(value) && value.length === 0 || value === null;
};

//# sourceMappingURL=is-null-equivalent-array-field-value.util.js.map