"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getAuthProvidersByWorkspace", {
    enumerable: true,
    get: function() {
        return getAuthProvidersByWorkspace;
    }
});
const _utils = require("twenty-shared/utils");
const _workspacessoidentityproviderentity = require("../../sso/workspace-sso-identity-provider.entity");
const getAuthProvidersByWorkspace = ({ workspace, systemEnabledProviders })=>{
    return {
        google: workspace.isGoogleAuthEnabled && systemEnabledProviders.google,
        magicLink: false,
        password: workspace.isPasswordAuthEnabled && systemEnabledProviders.password,
        microsoft: workspace.isMicrosoftAuthEnabled && systemEnabledProviders.microsoft,
        sso: workspace.workspaceSSOIdentityProviders.map((identityProvider)=>identityProvider.status === _workspacessoidentityproviderentity.SSOIdentityProviderStatus.Active ? {
                id: identityProvider.id,
                name: identityProvider.name,
                type: identityProvider.type,
                status: identityProvider.status,
                issuer: identityProvider.issuer
            } : undefined).filter(_utils.isDefined)
    };
};

//# sourceMappingURL=get-auth-providers-by-workspace.util.js.map