"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _workspacessoidentityproviderentity = require("../../../sso/workspace-sso-identity-provider.entity");
const _getauthprovidersbyworkspaceutil = require("../get-auth-providers-by-workspace.util");
describe('getAuthProvidersByWorkspace', ()=>{
    const mockWorkspace = {
        isGoogleAuthEnabled: true,
        isPasswordAuthEnabled: true,
        isMicrosoftAuthEnabled: false,
        workspaceSSOIdentityProviders: [
            {
                id: 'sso1',
                name: 'SSO Provider 1',
                type: _workspacessoidentityproviderentity.IdentityProviderType.SAML,
                status: _workspacessoidentityproviderentity.SSOIdentityProviderStatus.Active,
                issuer: 'sso1.example.com'
            }
        ]
    };
    it('should return correct auth providers for given workspace', ()=>{
        const result = (0, _getauthprovidersbyworkspaceutil.getAuthProvidersByWorkspace)({
            workspace: mockWorkspace,
            systemEnabledProviders: {
                google: true,
                magicLink: false,
                password: true,
                microsoft: true,
                sso: []
            }
        });
        expect(result).toEqual({
            google: true,
            magicLink: false,
            password: true,
            microsoft: false,
            sso: [
                {
                    id: 'sso1',
                    name: 'SSO Provider 1',
                    type: _workspacessoidentityproviderentity.IdentityProviderType.SAML,
                    status: _workspacessoidentityproviderentity.SSOIdentityProviderStatus.Active,
                    issuer: 'sso1.example.com'
                }
            ]
        });
    });
    it('should handle workspace with no SSO providers', ()=>{
        const result = (0, _getauthprovidersbyworkspaceutil.getAuthProvidersByWorkspace)({
            workspace: {
                ...mockWorkspace,
                workspaceSSOIdentityProviders: []
            },
            systemEnabledProviders: {
                google: true,
                magicLink: false,
                password: true,
                microsoft: true,
                sso: []
            }
        });
        expect(result).toEqual({
            google: true,
            magicLink: false,
            password: true,
            microsoft: false,
            sso: []
        });
    });
    it('should handle workspace with SSO providers inactive', ()=>{
        const result = (0, _getauthprovidersbyworkspaceutil.getAuthProvidersByWorkspace)({
            workspace: {
                ...mockWorkspace,
                workspaceSSOIdentityProviders: [
                    {
                        id: 'sso1',
                        name: 'SSO Provider 1',
                        type: _workspacessoidentityproviderentity.IdentityProviderType.SAML,
                        status: _workspacessoidentityproviderentity.SSOIdentityProviderStatus.Inactive,
                        issuer: 'sso1.example.com'
                    }
                ]
            },
            systemEnabledProviders: {
                google: true,
                magicLink: false,
                password: true,
                microsoft: true,
                sso: []
            }
        });
        expect(result).toEqual({
            google: true,
            magicLink: false,
            password: true,
            microsoft: false,
            sso: []
        });
    });
    it('should disable Microsoft auth if isMicrosoftAuthEnabled is false', ()=>{
        const result = (0, _getauthprovidersbyworkspaceutil.getAuthProvidersByWorkspace)({
            workspace: {
                ...mockWorkspace,
                isMicrosoftAuthEnabled: false
            },
            systemEnabledProviders: {
                google: true,
                magicLink: false,
                password: true,
                microsoft: true,
                sso: []
            }
        });
        expect(result).toEqual({
            google: true,
            magicLink: false,
            password: true,
            microsoft: false,
            sso: [
                {
                    id: 'sso1',
                    name: 'SSO Provider 1',
                    type: _workspacessoidentityproviderentity.IdentityProviderType.SAML,
                    status: _workspacessoidentityproviderentity.SSOIdentityProviderStatus.Active,
                    issuer: 'sso1.example.com'
                }
            ]
        });
    });
});

//# sourceMappingURL=get-auth-providers-by-workspace.util.spec.js.map