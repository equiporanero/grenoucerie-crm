"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isQueryTimeoutError", {
    enumerable: true,
    get: function() {
        return isQueryTimeoutError;
    }
});
const isQueryTimeoutError = (error)=>{
    return error.message.includes('Query read timeout');
};

//# sourceMappingURL=query-timeout.util.js.map