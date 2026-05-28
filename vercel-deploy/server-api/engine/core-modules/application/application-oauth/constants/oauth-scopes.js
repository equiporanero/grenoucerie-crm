// Scopes are a thin consent boundary shown to the user during OAuth authorization.
// Actual permissions are enforced by the role assigned to the application at the
// workspace level (object, field, and row-level permissions).
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get ALL_OAUTH_SCOPES () {
        return ALL_OAUTH_SCOPES;
    },
    get OAUTH_SCOPES () {
        return OAUTH_SCOPES;
    },
    get OAUTH_SCOPE_DESCRIPTIONS () {
        return OAUTH_SCOPE_DESCRIPTIONS;
    }
});
const OAUTH_SCOPES = {
    API: 'api',
    PROFILE: 'profile'
};
const ALL_OAUTH_SCOPES = Object.values(OAUTH_SCOPES);
const OAUTH_SCOPE_DESCRIPTIONS = {
    [OAUTH_SCOPES.API]: 'Access workspace data according to the assigned role',
    [OAUTH_SCOPES.PROFILE]: "Read the authenticated user's profile"
};

//# sourceMappingURL=oauth-scopes.js.map