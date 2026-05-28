"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildCreatedByFromApplication", {
    enumerable: true,
    get: function() {
        return buildCreatedByFromApplication;
    }
});
const _types = require("twenty-shared/types");
const buildCreatedByFromApplication = ({ application })=>({
        source: _types.FieldActorSource.APPLICATION,
        name: application.name,
        workspaceMemberId: null,
        context: {}
    });

//# sourceMappingURL=build-created-by-from-application.util.js.map