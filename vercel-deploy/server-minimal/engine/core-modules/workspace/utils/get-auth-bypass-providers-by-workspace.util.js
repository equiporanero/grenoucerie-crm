"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAuthBypassProvidersByWorkspace", {
    enumerable: true,
    get: function() {
        return getAuthBypassProvidersByWorkspace;
    }
});
const getAuthBypassProvidersByWorkspace = ({ workspace, systemEnabledProviders })=>{
    return {
        google: workspace.isGoogleAuthBypassEnabled && systemEnabledProviders.google,
        password: workspace.isPasswordAuthBypassEnabled && systemEnabledProviders.password,
        microsoft: workspace.isMicrosoftAuthBypassEnabled && systemEnabledProviders.microsoft
    };
};

//# sourceMappingURL=get-auth-bypass-providers-by-workspace.util.js.map