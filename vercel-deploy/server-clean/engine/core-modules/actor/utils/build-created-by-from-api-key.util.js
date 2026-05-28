"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildCreatedByFromApiKey", {
    enumerable: true,
    get: function() {
        return buildCreatedByFromApiKey;
    }
});
const _types = require("twenty-shared/types");
const buildCreatedByFromApiKey = ({ apiKey })=>({
        source: _types.FieldActorSource.API,
        name: apiKey.name,
        workspaceMemberId: null,
        context: {}
    });

//# sourceMappingURL=build-created-by-from-api-key.util.js.map