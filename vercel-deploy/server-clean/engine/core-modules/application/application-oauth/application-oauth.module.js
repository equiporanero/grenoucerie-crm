"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationOAuthModule", {
    enumerable: true,
    get: function() {
        return ApplicationOAuthModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _apptokenentity = require("../../app-token/app-token.entity");
const _applicationinstallmodule = require("../application-install/application-install.module");
const _applicationregistrationentity = require("../application-registration/application-registration.entity");
const _applicationentity = require("../application.entity");
const _applicationmodule = require("../application.module");
const _applicationoauthresolver = require("./application-oauth.resolver");
const _oauthdiscoverycontroller = require("./controllers/oauth-discovery.controller");
const _oauthregistrationcontroller = require("./controllers/oauth-registration.controller");
const _oauthtokencontroller = require("./controllers/oauth-token.controller");
const _oauthservice = require("./oauth.service");
const _applicationregistrationmodule = require("../application-registration/application-registration.module");
const _tokenmodule = require("../../auth/token/token.module");
const _featureflagmodule = require("../../feature-flag/feature-flag.module");
const _throttlermodule = require("../../throttler/throttler.module");
const _twentyconfigmodule = require("../../twenty-config/twenty-config.module");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
const _permissionsmodule = require("../../../metadata-modules/permissions/permissions.module");
const _workspacecachestoragemodule = require("../../../workspace-cache-storage/workspace-cache-storage.module");
const _domainserverconfigmodule = require("../../domain/domain-server-config/domain-server-config.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ApplicationOAuthModule = class ApplicationOAuthModule {
};
ApplicationOAuthModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _apptokenentity.AppTokenEntity,
                _applicationentity.ApplicationEntity,
                _applicationregistrationentity.ApplicationRegistrationEntity,
                _userworkspaceentity.UserWorkspaceEntity
            ]),
            _applicationregistrationmodule.ApplicationRegistrationModule,
            _applicationmodule.ApplicationModule,
            _applicationinstallmodule.ApplicationInstallModule,
            _tokenmodule.TokenModule,
            _domainserverconfigmodule.DomainServerConfigModule,
            _featureflagmodule.FeatureFlagModule,
            _permissionsmodule.PermissionsModule,
            _throttlermodule.ThrottlerModule,
            _twentyconfigmodule.TwentyConfigModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule
        ],
        controllers: [
            _oauthtokencontroller.OAuthTokenController,
            _oauthdiscoverycontroller.OAuthDiscoveryController,
            _oauthregistrationcontroller.OAuthRegistrationController
        ],
        providers: [
            _oauthservice.OAuthService,
            _applicationoauthresolver.ApplicationOAuthResolver
        ],
        exports: [
            _oauthservice.OAuthService
        ]
    })
], ApplicationOAuthModule);

//# sourceMappingURL=application-oauth.module.js.map