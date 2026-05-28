"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "transformCurrencyField", {
    enumerable: true,
    get: function() {
        return transformCurrencyField;
    }
});
const _guards = require("@sniptt/guards");
const _transformnumericfieldutil = require("./transform-numeric-field.util");
const _transformtextfieldutil = require("./transform-text-field.util");
const transformCurrencyField = (value)=>{
    if ((0, _guards.isNull)(value)) return null;
    return {
        amountMicros: (0, _guards.isUndefined)(value.amountMicros) ? undefined : (0, _transformnumericfieldutil.transformNumericField)(value.amountMicros),
        currencyCode: (0, _guards.isUndefined)(value.currencyCode) ? undefined : (0, _transformtextfieldutil.transformTextField)(value.currencyCode)
    };
};

//# sourceMappingURL=transform-currency-field.util.js.map