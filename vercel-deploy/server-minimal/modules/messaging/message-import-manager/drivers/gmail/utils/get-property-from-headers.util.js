"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPropertyFromHeaders", {
    enumerable: true,
    get: function() {
        return getPropertyFromHeaders;
    }
});
const getPropertyFromHeaders = (message, property)=>{
    const header = message.payload?.headers?.find((header)=>header.name?.toLowerCase() === property.toLowerCase());
    return header?.value;
};

//# sourceMappingURL=get-property-from-headers.util.js.map