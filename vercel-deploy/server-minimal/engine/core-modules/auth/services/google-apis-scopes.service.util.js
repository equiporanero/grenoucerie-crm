"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "includesExpectedScopes", {
    enumerable: true,
    get: function() {
        return includesExpectedScopes;
    }
});
const includesExpectedScopes = (scopes, expectedScopes)=>{
    return expectedScopes.every((expectedScope)=>scopes.includes(expectedScope) || scopes.includes(`https://www.googleapis.com/auth/userinfo.${expectedScope}`));
};

//# sourceMappingURL=google-apis-scopes.service.util.js.map