"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "nullifyEmptyFullNameDefaultValue", {
    enumerable: true,
    get: function() {
        return nullifyEmptyFullNameDefaultValue;
    }
});
const _utils = require("twenty-shared/utils");
const _isnullequivalenttextdefaultvalueutil = require("./is-null-equivalent-text-default-value.util");
const nullifyEmptyFullNameDefaultValue = (defaultValue)=>{
    if (!(0, _utils.isDefined)(defaultValue)) {
        return null;
    }
    const v = defaultValue;
    const firstName = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.firstName) ? null : v.firstName ?? null;
    const lastName = (0, _isnullequivalenttextdefaultvalueutil.isNullEquivalentTextDefaultValue)(v.lastName) ? null : v.lastName ?? null;
    if (firstName === null && lastName === null) {
        return null;
    }
    return {
        firstName,
        lastName
    };
};

//# sourceMappingURL=nullify-empty-full-name-default-value.util.js.map