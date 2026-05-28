"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "buildUserAuthContext", {
    enumerable: true,
    get: function() {
        return buildUserAuthContext;
    }
});
const buildUserAuthContext = (input)=>{
    return {
        type: 'user',
        workspace: input.workspace,
        userWorkspaceId: input.userWorkspaceId,
        user: input.user,
        workspaceMemberId: input.workspaceMemberId,
        workspaceMember: input.workspaceMember,
        workspaceMetadataVersion: input.workspaceMetadataVersion
    };
};

//# sourceMappingURL=build-user-auth-context.util.js.map