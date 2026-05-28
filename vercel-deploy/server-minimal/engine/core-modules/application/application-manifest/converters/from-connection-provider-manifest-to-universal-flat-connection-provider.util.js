"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "fromConnectionProviderManifestToUniversalFlatConnectionProvider", {
    enumerable: true,
    get: function() {
        return fromConnectionProviderManifestToUniversalFlatConnectionProvider;
    }
});
const fromConnectionProviderManifestToUniversalFlatConnectionProvider = ({ connectionProviderManifest, applicationUniversalIdentifier, now })=>{
    const oauthConfig = connectionProviderManifest.type === 'oauth' ? {
        authorizationEndpoint: connectionProviderManifest.oauth.authorizationEndpoint,
        tokenEndpoint: connectionProviderManifest.oauth.tokenEndpoint,
        revokeEndpoint: connectionProviderManifest.oauth.revokeEndpoint ?? null,
        scopes: connectionProviderManifest.oauth.scopes,
        clientIdVariable: connectionProviderManifest.oauth.clientIdVariable,
        clientSecretVariable: connectionProviderManifest.oauth.clientSecretVariable,
        authorizationParams: connectionProviderManifest.oauth.authorizationParams ?? null,
        tokenRequestContentType: connectionProviderManifest.oauth.tokenRequestContentType ?? 'json',
        usePkce: connectionProviderManifest.oauth.usePkce ?? true
    } : null;
    return {
        universalIdentifier: connectionProviderManifest.universalIdentifier,
        applicationUniversalIdentifier,
        name: connectionProviderManifest.name,
        displayName: connectionProviderManifest.displayName,
        type: connectionProviderManifest.type,
        oauthConfig,
        createdAt: now,
        updatedAt: now
    };
};

//# sourceMappingURL=from-connection-provider-manifest-to-universal-flat-connection-provider.util.js.map