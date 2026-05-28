"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "applyWorkspaceSentryContext", {
    enumerable: true,
    get: function() {
        return applyWorkspaceSentryContext;
    }
});
const _applyworkspacesentryfieldsutil = require("./apply-workspace-sentry-fields.util");
const applyWorkspaceSentryContext = (authContext)=>{
    const workspaceId = authContext.workspace?.id;
    if (!workspaceId) {
        return;
    }
    switch(authContext.type){
        case 'user':
        case 'pendingActivationUser':
            (0, _applyworkspacesentryfieldsutil.applyWorkspaceSentryFields)({
                workspaceId,
                userWorkspaceId: authContext.userWorkspaceId
            });
            return;
        case 'apiKey':
        case 'application':
        case 'system':
            (0, _applyworkspacesentryfieldsutil.applyWorkspaceSentryFields)({
                workspaceId
            });
            return;
    }
};

//# sourceMappingURL=apply-workspace-sentry-context.util.js.map