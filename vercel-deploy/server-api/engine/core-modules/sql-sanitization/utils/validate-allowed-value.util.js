// Runtime validation that a string value is one of the allowed values.
// Use for values that will be interpolated into SQL to ensure they
// match a known-safe set (e.g. enum values, action keywords).
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateAllowedValue", {
    enumerable: true,
    get: function() {
        return validateAllowedValue;
    }
});
const validateAllowedValue = (value, allowedValues, label)=>{
    if (!allowedValues.includes(value)) {
        throw new Error(`Invalid ${label}: ${value}`);
    }
};

//# sourceMappingURL=validate-allowed-value.util.js.map