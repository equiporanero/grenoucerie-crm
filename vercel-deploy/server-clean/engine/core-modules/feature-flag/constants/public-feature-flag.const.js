"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PUBLIC_FEATURE_FLAGS", {
    enumerable: true,
    get: function() {
        return PUBLIC_FEATURE_FLAGS;
    }
});
const _types = require("twenty-shared/types");
const PUBLIC_FEATURE_FLAGS = [
    {
        key: _types.FeatureFlagKey.IS_JUNCTION_RELATIONS_ENABLED,
        metadata: {
            label: 'Junction Relations',
            description: 'Enable many-to-many relations through junction tables configuration'
        }
    },
    ...process.env.CLOUDFLARE_API_KEY ? [] : []
];

//# sourceMappingURL=public-feature-flag.const.js.map