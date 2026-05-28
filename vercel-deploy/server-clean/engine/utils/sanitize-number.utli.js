"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sanitizeNumber", {
    enumerable: true,
    get: function() {
        return sanitizeNumber;
    }
});
const _utils = require("twenty-shared/utils");
const sanitizeNumber = (value)=>{
    if (!(0, _utils.isDefined)(value) || Number.isNaN(value)) {
        return null;
    }
    return value;
};

//# sourceMappingURL=sanitize-number.utli.js.map