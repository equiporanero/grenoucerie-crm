"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _passport = require("@nestjs/passport");
const _testing = require("@nestjs/testing");
const _oidcauthguard = require("./oidc-auth.guard");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _guardredirectservice = require("../../guard-redirect/services/guard-redirect.service");
const _ssoservice = require("../../sso/services/sso.service");
const createMockExecutionContext = (mockedRequest)=>{
    return {
        switchToHttp: jest.fn().mockReturnValue({
            getRequest: jest.fn().mockReturnValue(mockedRequest)
        })
    };
};
const createMockedRequest = (params = {}, query = {})=>({
        params,
        query
    });
jest.spyOn((0, _passport.AuthGuard)('openidconnect').prototype, 'canActivate').mockResolvedValue(true);
jest.mock('openid-client', ()=>({
        Strategy: jest.fn(),
        Issuer: {
            discover: jest.fn().mockResolvedValue({})
        }
    }));
describe('OIDCAuthGuard', ()=>{
    let guard;
    let ssoService;
    let guardRedirectService;
    let mockExecutionContext;
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _oidcauthguard.OIDCAuthGuard,
                {
                    provide: _ssoservice.SSOService,
                    useValue: {
                        findSSOIdentityProviderById: jest.fn(),
                        getOIDCClient: jest.fn()
                    }
                },
                {
                    provide: _guardredirectservice.GuardRedirectService,
                    useValue: {
                        dispatchErrorFromGuard: jest.fn(),
                        getSubdomainAndCustomDomainFromWorkspace: jest.fn()
                    }
                },
                {
                    provide: _workspacedomainsservice.WorkspaceDomainsService,
                    useValue: {
                        getSubdomainAndCustomDomainFromWorkspaceFallbackOnDefaultSubdomain: jest.fn()
                    }
                }
            ]
        }).compile();
        guard = module.get(_oidcauthguard.OIDCAuthGuard);
        ssoService = module.get(_ssoservice.SSOService);
        guardRedirectService = module.get(_guardredirectservice.GuardRedirectService);
        mockExecutionContext = {
            switchToHttp: jest.fn().mockReturnValue({
                getRequest: jest.fn()
            })
        };
    });
    it('should activate when identity provider exists and is valid', async ()=>{
        const mockedRequest = createMockedRequest({
            identityProviderId: 'test-id'
        });
        mockExecutionContext = createMockExecutionContext(mockedRequest);
        jest.spyOn(ssoService, 'findSSOIdentityProviderById').mockResolvedValue({
            id: 'test-id',
            issuer: 'https://issuer.example.com',
            workspace: {}
        });
        const result = await guard.canActivate(mockExecutionContext);
        expect(result).toBe(true);
        expect(guardRedirectService.dispatchErrorFromGuard).not.toHaveBeenCalled();
        expect(ssoService.findSSOIdentityProviderById).toHaveBeenCalledWith('test-id');
    });
    it('should throw error when identity provider is not found', async ()=>{
        const mockedRequest = createMockedRequest({
            identityProviderId: 'non-existent-id'
        });
        mockExecutionContext = createMockExecutionContext(mockedRequest);
        jest.spyOn(ssoService, 'findSSOIdentityProviderById').mockResolvedValue(null);
        await expect(guard.canActivate(mockExecutionContext)).resolves.toBe(false);
        expect(ssoService.findSSOIdentityProviderById).toHaveBeenCalledWith('non-existent-id');
        expect(guardRedirectService.dispatchErrorFromGuard).toHaveBeenCalled();
    });
    it('should handle invalid OIDC identity provider params in request', async ()=>{
        const mockedRequest = createMockedRequest({
            identityProviderId: undefined
        });
        mockExecutionContext = createMockExecutionContext(mockedRequest);
        jest.spyOn(ssoService, 'findSSOIdentityProviderById').mockResolvedValue(null);
        await expect(guard.canActivate(mockExecutionContext)).resolves.toBe(false);
        expect(guardRedirectService.dispatchErrorFromGuard).toHaveBeenCalled();
    });
});

//# sourceMappingURL=oidc-auth.spec.js.map