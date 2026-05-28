"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "tryParseJsonArray", {
    enumerable: true,
    get: function() {
        return tryParseJsonArray;
    }
});
const tryParseJsonArray = (value)=>{
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : null;
    } catch  {
        return null;
    }
};

//# sourceMappingURL=try-parse-json-array.js.map