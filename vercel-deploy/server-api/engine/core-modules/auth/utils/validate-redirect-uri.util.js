"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validateRedirectUri", {
    enumerable: true,
    get: function() {
        return validateRedirectUri;
    }
});
// RFC 6749 redirect URI validation: must be absolute, HTTPS (except localhost), no fragments
// Custom URI schemes (cursor://, vscode://) allowed for desktop app OAuth flows
const ALLOWED_CUSTOM_SCHEMES = [
    'cursor:',
    'vscode:',
    'code:'
];
const validateRedirectUri = (uri)=>{
    let parsed;
    try {
        parsed = new URL(uri);
    } catch  {
        return {
            valid: false,
            reason: `Invalid redirect URI: ${uri}`
        };
    }
    const isLocalhost = parsed.hostname === 'localhost' || parsed.hostname === '127.0.0.1';
    const isAllowedCustomScheme = ALLOWED_CUSTOM_SCHEMES.includes(parsed.protocol);
    if (parsed.protocol !== 'https:' && !isLocalhost && !isAllowedCustomScheme) {
        return {
            valid: false,
            reason: `Redirect URIs must use HTTPS (except localhost) or an allowed custom scheme: ${uri}`
        };
    }
    if (parsed.hash) {
        return {
            valid: false,
            reason: `Redirect URIs must not contain fragments: ${uri}`
        };
    }
    return {
        valid: true,
        parsed
    };
};

//# sourceMappingURL=validate-redirect-uri.util.js.map