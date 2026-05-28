"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isPlainObject", {
    enumerable: true,
    get: function() {
        return isPlainObject;
    }
});
const isPlainObject = (input)=>{
    return typeof input === 'object' && input !== null && !Array.isArray(input);
};

//# sourceMappingURL=is-plain-object.js.map