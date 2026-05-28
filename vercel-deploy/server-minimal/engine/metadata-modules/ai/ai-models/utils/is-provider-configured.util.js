"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isProviderConfigured", {
    enumerable: true,
    get: function() {
        return isProviderConfigured;
    }
});
const isProviderConfigured = (config)=>!!(config.apiKey || config.accessKeyId || config.authType);

//# sourceMappingURL=is-provider-configured.util.js.map