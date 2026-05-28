"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMicrosoftApisOauthScopes", {
    enumerable: true,
    get: function() {
        return getMicrosoftApisOauthScopes;
    }
});
const getMicrosoftApisOauthScopes = ()=>{
    const scopes = [
        'openid',
        'email',
        'profile',
        'offline_access',
        'Mail.ReadWrite',
        'Mail.Send',
        'Calendars.Read',
        'User.Read'
    ];
    return scopes;
};

//# sourceMappingURL=get-microsoft-apis-oauth-scopes.js.map