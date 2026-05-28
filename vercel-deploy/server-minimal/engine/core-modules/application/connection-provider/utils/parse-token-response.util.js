"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parseTokenResponse", {
    enumerable: true,
    get: function() {
        return parseTokenResponse;
    }
});
const parseTokenResponse = (json)=>{
    const accessToken = typeof json.access_token === 'string' ? json.access_token : null;
    if (!accessToken) {
        throw new Error(`Token endpoint did not return an access_token. Response keys: ${Object.keys(json).join(', ')}`);
    }
    return {
        accessToken,
        refreshToken: typeof json.refresh_token === 'string' ? json.refresh_token : null,
        scopes: typeof json.scope === 'string' ? json.scope.split(/[\s,]+/).filter(Boolean) : null
    };
};

//# sourceMappingURL=parse-token-response.util.js.map