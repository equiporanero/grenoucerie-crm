"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "castAppTokenToWorkspaceInvitationUtil", {
    enumerable: true,
    get: function() {
        return castAppTokenToWorkspaceInvitationUtil;
    }
});
const _apptokenentity = require("../../app-token/app-token.entity");
const _workspaceinvitationexception = require("../workspace-invitation.exception");
const castAppTokenToWorkspaceInvitationUtil = (appToken)=>{
    if (appToken.type !== _apptokenentity.AppTokenType.InvitationToken) {
        throw new _workspaceinvitationexception.WorkspaceInvitationException(`Token type must be "${_apptokenentity.AppTokenType.InvitationToken}"`, _workspaceinvitationexception.WorkspaceInvitationExceptionCode.INVALID_APP_TOKEN_TYPE);
    }
    if (!appToken.context?.email) {
        throw new _workspaceinvitationexception.WorkspaceInvitationException(`Invitation corrupted: Missing email in context`, _workspaceinvitationexception.WorkspaceInvitationExceptionCode.INVITATION_CORRUPTED);
    }
    return {
        id: appToken.id,
        email: appToken.context.email,
        roleId: appToken.context.roleId ?? null,
        expiresAt: appToken.expiresAt
    };
};

//# sourceMappingURL=cast-app-token-to-workspace-invitation.util.js.map