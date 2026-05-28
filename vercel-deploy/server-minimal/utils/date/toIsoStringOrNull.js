"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "toIsoStringOrNull", {
    enumerable: true,
    get: function() {
        return toIsoStringOrNull;
    }
});
const toIsoStringOrNull = (value)=>{
    if (value == null) {
        return null;
    }
    return value instanceof Date ? value.toISOString() : value;
};

//# sourceMappingURL=toIsoStringOrNull.js.map