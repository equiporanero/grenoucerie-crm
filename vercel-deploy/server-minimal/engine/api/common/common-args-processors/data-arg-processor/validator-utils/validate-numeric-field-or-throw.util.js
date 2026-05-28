"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateNumericFieldOrThrow", {
    enumerable: true,
    get: function() {
        return validateNumericFieldOrThrow;
    }
});
const _guards = require("@sniptt/guards");
const _validatenumberfieldorthrowutil = require("./validate-number-field-or-throw.util");
const validateNumericFieldOrThrow = (value, fieldName)=>{
    if (value === '' || (0, _guards.isNull)(value)) return null;
    const numberValue = Number(value);
    (0, _validatenumberfieldorthrowutil.validateNumberFieldOrThrow)(numberValue, fieldName);
    return value;
};

//# sourceMappingURL=validate-numeric-field-or-throw.util.js.map