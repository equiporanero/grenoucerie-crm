"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "wrapJsonRpcResponse", {
    enumerable: true,
    get: function() {
        return wrapJsonRpcResponse;
    }
});
const wrapJsonRpcResponse = (id, payload)=>{
    return {
        id,
        jsonrpc: '2.0',
        ...payload
    };
};

//# sourceMappingURL=wrap-jsonrpc-response.util.js.map