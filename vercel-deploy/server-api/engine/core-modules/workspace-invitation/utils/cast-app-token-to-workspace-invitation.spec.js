"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _apptokenentity = require("../../app-token/app-token.entity");
const _workspaceinvitationexception = require("../workspace-invitation.exception");
const _castapptokentoworkspaceinvitationutil = require("./cast-app-token-to-workspace-invitation.util");
describe('castAppTokenToWorkspaceInvitation', ()=>{
    it('should throw an error if token type is not InvitationToken', ()=>{
        const appToken = {
            id: '1',
            type: _apptokenentity.AppTokenType.RefreshToken,
            context: {
                email: 'test@example.com'
            },
            expiresAt: new Date()
        };
        expect(()=>(0, _castapptokentoworkspaceinvitationutil.castAppTokenToWorkspaceInvitationUtil)(appToken)).toThrowError(new _workspaceinvitationexception.WorkspaceInvitationException(`Token type must be "${_apptokenentity.AppTokenType.InvitationToken}"`, _workspaceinvitationexception.WorkspaceInvitationExceptionCode.INVALID_APP_TOKEN_TYPE));
    });
    it('should throw an error if context email is missing', ()=>{
        const appToken = {
            id: '1',
            type: _apptokenentity.AppTokenType.InvitationToken,
            context: null,
            expiresAt: new Date()
        };
        expect(()=>(0, _castapptokentoworkspaceinvitationutil.castAppTokenToWorkspaceInvitationUtil)(appToken)).toThrowError(new _workspaceinvitationexception.WorkspaceInvitationException(`Invitation corrupted: Missing email in context`, _workspaceinvitationexception.WorkspaceInvitationExceptionCode.INVITATION_CORRUPTED));
    });
    it('should return the correct invitation object for valid inputs', ()=>{
        const appToken = {
            id: '1',
            type: _apptokenentity.AppTokenType.InvitationToken,
            context: {
                email: 'test@example.com'
            },
            expiresAt: new Date()
        };
        const invitation = (0, _castapptokentoworkspaceinvitationutil.castAppTokenToWorkspaceInvitationUtil)(appToken);
        expect(invitation).toEqual({
            id: '1',
            email: 'test@example.com',
            roleId: null,
            expiresAt: appToken.expiresAt
        });
    });
});

//# sourceMappingURL=cast-app-token-to-workspace-invitation.spec.js.map