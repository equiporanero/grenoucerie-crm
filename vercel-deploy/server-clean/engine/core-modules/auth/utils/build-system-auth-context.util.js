"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildSystemAuthContext", {
    enumerable: true,
    get: function() {
        return buildSystemAuthContext;
    }
});
const buildSystemAuthContext = (input)=>{
    return {
        type: 'system',
        workspace: input.workspace,
        workspaceMetadataVersion: input.workspaceMetadataVersion
    };
};

//# sourceMappingURL=build-system-auth-context.util.js.map