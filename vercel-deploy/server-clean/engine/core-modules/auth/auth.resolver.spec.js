"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _testing = require("@nestjs/testing");
const _typeorm = require("@nestjs/typeorm");
const _apikeyservice = require("../api-key/services/api-key.service");
const _apptokenentity = require("../app-token/app-token.entity");
const _auditservice = require("../audit/services/audit.service");
const _signinupservice = require("./services/sign-in-up.service");
const _refreshtokenservice = require("./token/services/refresh-token.service");
const _workspaceagnostictokenservice = require("./token/services/workspace-agnostic-token.service");
const _captchaguard = require("../captcha/captcha.guard");
const _workspacedomainsservice = require("../domain/workspace-domains/services/workspace-domains.service");
const _emailverificationservice = require("../email-verification/services/email-verification.service");
const _featureflagservice = require("../feature-flag/services/feature-flag.service");
const _ssoservice = require("../sso/services/sso.service");
const _twentyconfigservice = require("../twenty-config/twenty-config.service");
const _twofactorauthenticationservice = require("../two-factor-authentication/two-factor-authentication.service");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _userworkspaceservice = require("../user-workspace/user-workspace.service");
const _userservice = require("../user/services/user.service");
const _userentity = require("../user/user.entity");
const _permissionsservice = require("../../metadata-modules/permissions/permissions.service");
const _authresolver = require("./auth.resolver");
const _authservice = require("./services/auth.service");
const _resetpasswordservice = require("./services/reset-password.service");
const _emailverificationtokenservice = require("./token/services/email-verification-token.service");
const _logintokenservice = require("./token/services/login-token.service");
const _renewtokenservice = require("./token/services/renew-token.service");
const _transienttokenservice = require("./token/services/transient-token.service");
describe('AuthResolver', ()=>{
    let resolver;
    const mock_CaptchaGuard = {
        canActivate: jest.fn(()=>true)
    };
    beforeEach(async ()=>{
        const module = await _testing.Test.createTestingModule({
            providers: [
                _authresolver.AuthResolver,
                {
                    provide: (0, _typeorm.getRepositoryToken)(_apptokenentity.AppTokenEntity),
                    useValue: {}
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userentity.UserEntity),
                    useValue: {}
                },
                {
                    provide: (0, _typeorm.getRepositoryToken)(_userworkspaceentity.UserWorkspaceEntity),
                    useValue: {}
                },
                {
                    provide: _authservice.AuthService,
                    useValue: {}
                },
                {
                    provide: _refreshtokenservice.RefreshTokenService,
                    useValue: {}
                },
                {
                    provide: _userservice.UserService,
                    useValue: {}
                },
                {
                    provide: _workspacedomainsservice.WorkspaceDomainsService,
                    useValue: {
                        buildWorkspaceURL: jest.fn().mockResolvedValue(new URL('http://localhost:3001'))
                    }
                },
                {
                    provide: _userworkspaceservice.UserWorkspaceService,
                    useValue: {}
                },
                {
                    provide: _renewtokenservice.RenewTokenService,
                    useValue: {}
                },
                {
                    provide: _signinupservice.SignInUpService,
                    useValue: {}
                },
                {
                    provide: _apikeyservice.ApiKeyService,
                    useValue: {}
                },
                {
                    provide: _resetpasswordservice.ResetPasswordService,
                    useValue: {}
                },
                {
                    provide: _logintokenservice.LoginTokenService,
                    useValue: {}
                },
                {
                    provide: _workspaceagnostictokenservice.WorkspaceAgnosticTokenService,
                    useValue: {}
                },
                {
                    provide: _transienttokenservice.TransientTokenService,
                    useValue: {}
                },
                {
                    provide: _emailverificationservice.EmailVerificationService,
                    useValue: {}
                },
                {
                    provide: _emailverificationtokenservice.EmailVerificationTokenService,
                    useValue: {}
                },
                {
                    provide: _permissionsservice.PermissionsService,
                    useValue: {}
                },
                {
                    provide: _featureflagservice.FeatureFlagService,
                    useValue: {}
                },
                {
                    provide: _ssoservice.SSOService,
                    useValue: {}
                },
                {
                    provide: _twofactorauthenticationservice.TwoFactorAuthenticationService,
                    useValue: {}
                },
                {
                    provide: _twentyconfigservice.TwentyConfigService,
                    useValue: {}
                },
                {
                    provide: _auditservice.AuditService,
                    useValue: {
                        createContext: jest.fn().mockReturnValue({
                            insertWorkspaceEvent: jest.fn()
                        })
                    }
                }
            ]
        }).overrideGuard(_captchaguard.CaptchaGuard).useValue(mock_CaptchaGuard).compile();
        resolver = module.get(_authresolver.AuthResolver);
    });
    it('should be defined', ()=>{
        expect(resolver).toBeDefined();
    });
});

//# sourceMappingURL=auth.resolver.spec.js.map