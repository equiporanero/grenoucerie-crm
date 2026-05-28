"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildApplicationAuthContext", {
    enumerable: true,
    get: function() {
        return buildApplicationAuthContext;
    }
});
const buildApplicationAuthContext = (input)=>{
    return {
        type: 'application',
        workspace: input.workspace,
        application: input.application,
        workspaceMetadataVersion: input.workspaceMetadataVersion
    };
};

//# sourceMappingURL=build-application-auth-context.util.js.map