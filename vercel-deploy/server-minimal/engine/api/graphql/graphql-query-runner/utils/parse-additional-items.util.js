"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseArrayOrJsonStringToArray", {
    enumerable: true,
    get: function() {
        return parseArrayOrJsonStringToArray;
    }
});
const parseArrayOrJsonStringToArray = (value)=>{
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value === 'string') {
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : [];
        } catch  {
            return [];
        }
    }
    return [];
};

//# sourceMappingURL=parse-additional-items.util.js.map