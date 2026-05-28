"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "exchangeRefreshTokenForToken", {
    enumerable: true,
    get: function() {
        return exchangeRefreshTokenForToken;
    }
});
const _postoauthtokenrequestutil = require("./post-oauth-token-request.util");
const exchangeRefreshTokenForToken = (args)=>(0, _postoauthtokenrequestutil.postOAuthTokenRequest)({
        fetchFn: args.fetchFn,
        tokenEndpoint: args.tokenEndpoint,
        contentType: args.contentType,
        params: {
            grant_type: 'refresh_token',
            refresh_token: args.refreshToken,
            client_id: args.clientId,
            client_secret: args.clientSecret
        }
    });

//# sourceMappingURL=exchange-refresh-token-for-token.util.js.map