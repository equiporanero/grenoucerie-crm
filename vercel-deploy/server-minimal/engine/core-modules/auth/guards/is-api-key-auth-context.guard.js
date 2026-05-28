"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isApiKeyAuthContext", {
    enumerable: true,
    get: function() {
        return isApiKeyAuthContext;
    }
});
const isApiKeyAuthContext = (context)=>{
    return context.type === 'apiKey';
};

//# sourceMappingURL=is-api-key-auth-context.guard.js.map