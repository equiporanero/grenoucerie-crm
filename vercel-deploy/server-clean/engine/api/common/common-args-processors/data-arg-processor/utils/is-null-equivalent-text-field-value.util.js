"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isNullEquivalentTextFieldValue", {
    enumerable: true,
    get: function() {
        return isNullEquivalentTextFieldValue;
    }
});
const _guards = require("@sniptt/guards");
const _nullequivalentvaluesconstant = require("../constants/null-equivalent-values.constant");
const isNullEquivalentTextFieldValue = (value)=>{
    if ((0, _guards.isNull)(value)) return true;
    return (0, _guards.isString)(value) && value === _nullequivalentvaluesconstant.DEFAULT_TEXT_FIELD_NULL_EQUIVALENT_VALUE;
};

//# sourceMappingURL=is-null-equivalent-text-field-value.util.js.map