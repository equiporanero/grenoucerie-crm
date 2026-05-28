// Workspace-agnostic by design: the workspace identity travels in the
// signed `state` parameter, so a single redirect URL configured at the
// OAuth provider serves every workspace.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildAppOAuthCallbackUrl", {
    enumerable: true,
    get: function() {
        return buildAppOAuthCallbackUrl;
    }
});
const buildAppOAuthCallbackUrl = (serverUrl)=>new URL('/apps/oauth/callback', serverUrl).toString();

//# sourceMappingURL=build-callback-url.util.js.map