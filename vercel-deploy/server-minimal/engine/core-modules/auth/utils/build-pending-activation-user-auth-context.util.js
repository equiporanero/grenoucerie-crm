"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildPendingActivationUserAuthContext", {
    enumerable: true,
    get: function() {
        return buildPendingActivationUserAuthContext;
    }
});
const buildPendingActivationUserAuthContext = (input)=>{
    return {
        type: 'pendingActivationUser',
        workspace: input.workspace,
        userWorkspaceId: input.userWorkspaceId,
        user: input.user,
        workspaceMetadataVersion: input.workspaceMetadataVersion
    };
};

//# sourceMappingURL=build-pending-activation-user-auth-context.util.js.map