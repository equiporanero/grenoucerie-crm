"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nullifyEmptyCurrencyDefaultValue", {
    enumerable: true,
    get: function() {
        return nullifyEmptyCurrencyDefaultValue;
    }
});
const _utils = require("twenty-shared/utils");
const _isnullequivalenttextdefaultvalueutil = require("./is-null-equivalent-text-default-value.util");
const nullifyEmptyCurrencyDefaultValue = (defaultValue)=>{
    if (!(0, _utils.isDefined)(defaultValue)) {
        return null;
    }
    const v = defaultValue;
    const amountMicros = v.amountMicros ?? null;
    const currencyCode = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.currencyCode) ? null : v.currencyCode ?? null;
    if (amountMicros === null && currencyCode === null) {
        return null;
    }
    return {
        amountMicros,
        currencyCode
    };
};

//# sourceMappingURL=nullify-empty-currency-default-value.util.js.map