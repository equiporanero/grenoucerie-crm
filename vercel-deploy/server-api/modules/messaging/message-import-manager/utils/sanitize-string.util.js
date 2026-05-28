"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "sanitizeString", {
    enumerable: true,
    get: function() {
        return sanitizeString;
    }
});
const NULL_CHAR_REGEX = /\0/g;
const sanitizeString = (str)=>{
    return str.replace(NULL_CHAR_REGEX, '');
};

//# sourceMappingURL=sanitize-string.util.js.map