"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "encodeOAuthBody", {
    enumerable: true,
    get: function() {
        return encodeOAuthBody;
    }
});
const encodeOAuthBody = (contentType, params)=>contentType === 'json' ? {
        body: JSON.stringify(params),
        contentTypeHeader: 'application/json'
    } : {
        body: new URLSearchParams(params).toString(),
        contentTypeHeader: 'application/x-www-form-urlencoded'
    };

//# sourceMappingURL=encode-oauth-body.util.js.map