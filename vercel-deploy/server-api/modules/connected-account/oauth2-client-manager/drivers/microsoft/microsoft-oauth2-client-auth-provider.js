"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftOAuth2ClientAuthProvider", {
    enumerable: true,
    get: function() {
        return MicrosoftOAuth2ClientAuthProvider;
    }
});
let MicrosoftOAuth2ClientAuthProvider = class MicrosoftOAuth2ClientAuthProvider {
    async getAccessToken() {
        return this.accessToken;
    }
    constructor(accessToken){
        this.accessToken = accessToken;
    }
};

//# sourceMappingURL=microsoft-oauth2-client-auth-provider.js.map