"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformArrayField", {
    enumerable: true,
    get: function() {
        return transformArrayField;
    }
});
const _guards = require("@sniptt/guards");
const _isnullequivalentarrayfieldvalueutil = require("../utils/is-null-equivalent-array-field-value.util");
const transformArrayField = (value)=>{
    if ((0, _guards.isString)(value)) return [
        value
    ];
    return (0, _isnullequivalentarrayfieldvalueutil.isNullEquivalentArrayFieldValue)(value) ? null : value;
};

//# sourceMappingURL=transform-array-field.util.js.map