"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformTextField", {
    enumerable: true,
    get: function() {
        return transformTextField;
    }
});
const _isnullequivalenttextfieldvalueutil = require("../utils/is-null-equivalent-text-field-value.util");
const transformTextField = (value)=>{
    return (0, _isnullequivalenttextfieldvalueutil.isNullEquivalentTextFieldValue)(value) ? null : value;
};

//# sourceMappingURL=transform-text-field.util.js.map