"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "exchangeCodeForToken", {
    enumerable: true,
    get: function() {
        return exchangeCodeForToken;
    }
});
const _postoauthtokenrequestutil = require("./post-oauth-token-request.util");
const exchangeCodeForToken = (args)=>{
    const params = {
        grant_type: 'authorization_code',
        code: args.code,
        redirect_uri: args.redirectUri,
        client_id: args.clientId,
        client_secret: args.clientSecret
    };
    if (args.codeVerifier) {
        params.code_verifier = args.codeVerifier;
    }
    return (0, _postoauthtokenrequestutil.postOAuthTokenRequest)({
        fetchFn: args.fetchFn,
        tokenEndpoint: args.tokenEndpoint,
        contentType: args.contentType,
        params
    });
};

//# sourceMappingURL=exchange-code-for-token.util.js.map