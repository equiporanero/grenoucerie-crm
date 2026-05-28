"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isNullEquivalentRawJsonFieldValue", {
    enumerable: true,
    get: function() {
        return isNullEquivalentRawJsonFieldValue;
    }
});
const _guards = require("@sniptt/guards");
const _utils = require("twenty-shared/utils");
const isNullEquivalentRawJsonFieldValue = (value)=>{
    if ((0, _guards.isNull)(value)) return true;
    return (0, _utils.isEmptyObject)(value);
};

//# sourceMappingURL=is-null-equivalent-raw-json-field-value.util.js.map