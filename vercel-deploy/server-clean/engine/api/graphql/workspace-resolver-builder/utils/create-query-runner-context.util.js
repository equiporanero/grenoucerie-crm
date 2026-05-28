"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "createQueryRunnerContext", {
    enumerable: true,
    get: function() {
        return createQueryRunnerContext;
    }
});
const _workspaceauthcontextstorage = require("../../../../core-modules/auth/storage/workspace-auth-context.storage");
const createQueryRunnerContext = ({ workspaceSchemaBuilderContext })=>{
    return {
        ...workspaceSchemaBuilderContext,
        authContext: (0, _workspaceauthcontextstorage.getWorkspaceAuthContext)()
    };
};

//# sourceMappingURL=create-query-runner-context.util.js.map