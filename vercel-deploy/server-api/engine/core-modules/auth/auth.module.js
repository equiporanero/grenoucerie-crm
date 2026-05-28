"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthModule", {
    enumerable: true,
    get: function() {
        return AuthModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _apikeyentity = require("../api-key/api-key.entity");
const _apikeymodule = require("../api-key/api-key.module");
const _applicationregistrationmodule = require("../application/application-registration/application-registration.module");
const _apptokenentity = require("../app-token/app-token.entity");
const _apptokenservice = require("../app-token/services/app-token.service");
const _applicationentity = require("../application/application.entity");
const _applicationmodule = require("../application/application.module");
const _connectionprovidermodule = require("../application/connection-provider/connection-provider.module");
const _connectionprovideroauthcontroller = require("../application/connection-provider/connection-provider-oauth.controller");
const _applicationconnectionsmodule = require("../application/connection-provider/connections/application-connections.module");
const _auditmodule = require("../audit/audit.module");
const _googleapisauthcontroller = require("./controllers/google-apis-auth.controller");
const _googleauthcontroller = require("./controllers/google-auth.controller");
const _microsoftapisauthcontroller = require("./controllers/microsoft-apis-auth.controller");
const _microsoftauthcontroller = require("./controllers/microsoft-auth.controller");
const _oauthpropagatorcontroller = require("./controllers/oauth-propagator.controller");
const _ssoauthcontroller = require("./controllers/sso-auth.controller");
const _authssoservice = require("./services/auth-sso.service");
const _createcalendarchannelservice = require("./services/create-calendar-channel.service");
const _createconnectedaccountservice = require("./services/create-connected-account.service");
const _createmessagechannelservice = require("./services/create-message-channel.service");
const _createssoconnectedaccountservice = require("./services/create-sso-connected-account.service");
const _googleapisscopes = require("./services/google-apis-scopes");
const _googleapisserviceavailabilityservice = require("./services/google-apis-service-availability.service");
const _googleapisservice = require("./services/google-apis.service");
const _microsoftapisservice = require("./services/microsoft-apis.service");
const _resetpasswordservice = require("./services/reset-password.service");
const _signinupservice = require("./services/sign-in-up.service");
const _updateconnectedaccountonreconnectservice = require("./services/update-connected-account-on-reconnect.service");
const _samlauthstrategy = require("./strategies/saml.auth.strategy");
const _accesstokenservice = require("./token/services/access-token.service");
const _logintokenservice = require("./token/services/login-token.service");
const _refreshtokenservice = require("./token/services/refresh-token.service");
const _transienttokenservice = require("./token/services/transient-token.service");
const _tokenmodule = require("./token/token.module");
const _domainserverconfigmodule = require("../domain/domain-server-config/domain-server-config.module");
const _subdomainmanagermodule = require("../domain/subdomain-manager/subdomain-manager.module");
const _workspacedomainsmodule = require("../domain/workspace-domains/workspace-domains.module");
const _emailverificationmodule = require("../email-verification/email-verification.module");
const _enterprisemodule = require("../enterprise/enterprise.module");
const _featureflagentity = require("../feature-flag/feature-flag.entity");
const _featureflagmodule = require("../feature-flag/feature-flag.module");
const _filemodule = require("../file/file.module");
const _guardredirectmodule = require("../guard-redirect/guard-redirect.module");
const _jwtmodule = require("../jwt/jwt.module");
const _keyvaluepairentity = require("../key-value-pair/key-value-pair.entity");
const _metricsmodule = require("../metrics/metrics.module");
const _onboardingmodule = require("../onboarding/onboarding.module");
const _securehttpclientmodule = require("../secure-http-client/secure-http-client.module");
const _ssomodule = require("../sso/sso.module");
const _workspacessoidentityproviderentity = require("../sso/workspace-sso-identity-provider.entity");
const _twofactorauthenticationmethodentity = require("../two-factor-authentication/entities/two-factor-authentication-method.entity");
const _twofactorauthenticationmodule = require("../two-factor-authentication/two-factor-authentication.module");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _userworkspacemodule = require("../user-workspace/user-workspace.module");
const _userentity = require("../user/user.entity");
const _usermodule = require("../user/user.module");
const _workspaceinvitationmodule = require("../workspace-invitation/workspace-invitation.module");
const _workspaceentity = require("../workspace/workspace.entity");
const _coreentitycachemodule = require("../../core-entity-cache/core-entity-cache.module");
const _calendarchannelentity = require("../../metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionmodule = require("../../metadata-modules/connected-account/services/connected-account-token-encryption.module");
const _messagechannelentity = require("../../metadata-modules/message-channel/entities/message-channel.entity");
const _objectmetadataentity = require("../../metadata-modules/object-metadata/object-metadata.entity");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _workspacecachemodule = require("../../workspace-cache/workspace-cache.module");
const _calendarchannelsyncstatusservice = require("../../../modules/calendar/common/services/calendar-channel-sync-status.service");
const _emailaliasmanagermodule = require("../../../modules/connected-account/email-alias-manager/email-alias-manager.module");
const _connectedaccountmodule = require("../../../modules/connected-account/connected-account.module");
const _messagingcommonmodule = require("../../../modules/messaging/common/messaging-common.module");
const _messagingfoldersyncmanagermodule = require("../../../modules/messaging/message-folder-manager/messaging-folder-sync-manager.module");
const _authresolver = require("./auth.resolver");
const _authservice = require("./services/auth.service");
const _jwtauthstrategy = require("./strategies/jwt.auth.strategy");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AuthModule = class AuthModule {
};
AuthModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _jwtmodule.JwtModule,
            _workspacedomainsmodule.WorkspaceDomainsModule,
            _tokenmodule.TokenModule,
            _usermodule.UserModule,
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity,
                _userentity.UserEntity,
                _apptokenentity.AppTokenEntity,
                _apikeyentity.ApiKeyEntity,
                _applicationentity.ApplicationEntity,
                _featureflagentity.FeatureFlagEntity,
                _workspacessoidentityproviderentity.WorkspaceSSOIdentityProviderEntity,
                _keyvaluepairentity.KeyValuePairEntity,
                _userworkspaceentity.UserWorkspaceEntity,
                _twofactorauthenticationmethodentity.TwoFactorAuthenticationMethodEntity,
                _objectmetadataentity.ObjectMetadataEntity,
                _connectedaccountentity.ConnectedAccountEntity,
                _messagechannelentity.MessageChannelEntity,
                _calendarchannelentity.CalendarChannelEntity
            ]),
            _userworkspacemodule.UserWorkspaceModule,
            _onboardingmodule.OnboardingModule,
            _connectedaccountmodule.ConnectedAccountModule,
            _messagingcommonmodule.MessagingCommonModule,
            _messagingfoldersyncmanagermodule.MessagingFolderSyncManagerModule,
            _ssomodule.WorkspaceSSOModule,
            _featureflagmodule.FeatureFlagModule,
            _workspaceinvitationmodule.WorkspaceInvitationModule,
            _emailverificationmodule.EmailVerificationModule,
            _guardredirectmodule.GuardRedirectModule,
            _metricsmodule.MetricsModule,
            _permissionsmodule.PermissionsModule,
            _twofactorauthenticationmodule.TwoFactorAuthenticationModule,
            _apikeymodule.ApiKeyModule,
            _auditmodule.AuditModule,
            _subdomainmanagermodule.SubdomainManagerModule,
            _domainserverconfigmodule.DomainServerConfigModule,
            _applicationregistrationmodule.ApplicationRegistrationModule,
            _applicationmodule.ApplicationModule,
            _connectionprovidermodule.ConnectionProviderModule,
            _applicationconnectionsmodule.ApplicationConnectionsModule,
            _workspacecachemodule.WorkspaceCacheModule,
            _coreentitycachemodule.CoreEntityCacheModule,
            _securehttpclientmodule.SecureHttpClientModule,
            _enterprisemodule.EnterpriseModule,
            _filemodule.FileModule,
            _connectedaccounttokenencryptionmodule.ConnectedAccountTokenEncryptionModule,
            _emailaliasmanagermodule.EmailAliasManagerModule
        ],
        controllers: [
            _googleauthcontroller.GoogleAuthController,
            _microsoftauthcontroller.MicrosoftAuthController,
            _googleapisauthcontroller.GoogleAPIsAuthController,
            _microsoftapisauthcontroller.MicrosoftAPIsAuthController,
            _oauthpropagatorcontroller.OAuthPropagatorController,
            _ssoauthcontroller.SSOAuthController,
            _connectionprovideroauthcontroller.ConnectionProviderOAuthController
        ],
        providers: [
            _signinupservice.SignInUpService,
            _authservice.AuthService,
            _jwtauthstrategy.JwtAuthStrategy,
            _samlauthstrategy.SamlAuthStrategy,
            _authresolver.AuthResolver,
            _googleapisservice.GoogleAPIsService,
            _googleapisscopes.GoogleAPIScopesService,
            _googleapisserviceavailabilityservice.GoogleApisServiceAvailabilityService,
            _microsoftapisservice.MicrosoftAPIsService,
            _apptokenservice.AppTokenService,
            _accesstokenservice.AccessTokenService,
            _refreshtokenservice.RefreshTokenService,
            _logintokenservice.LoginTokenService,
            _resetpasswordservice.ResetPasswordService,
            // So far, it's not possible to have controllers in business modules
            // which forces us to have these services in the auth module
            // TODO: Move these calendar, message, and connected account services to the business modules once possible
            _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService,
            _createmessagechannelservice.CreateMessageChannelService,
            _createcalendarchannelservice.CreateCalendarChannelService,
            _createconnectedaccountservice.CreateConnectedAccountService,
            _createssoconnectedaccountservice.CreateSSOConnectedAccountService,
            _updateconnectedaccountonreconnectservice.UpdateConnectedAccountOnReconnectService,
            _transienttokenservice.TransientTokenService,
            _authssoservice.AuthSsoService
        ],
        exports: [
            _accesstokenservice.AccessTokenService,
            _logintokenservice.LoginTokenService,
            _refreshtokenservice.RefreshTokenService,
            _createmessagechannelservice.CreateMessageChannelService,
            _createcalendarchannelservice.CreateCalendarChannelService
        ]
    })
], AuthModule);

//# sourceMappingURL=auth.module.js.map