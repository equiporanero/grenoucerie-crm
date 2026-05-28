"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TwoFactorAuthenticationModule", {
    enumerable: true,
    get: function() {
        return TwoFactorAuthenticationModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _tokenmodule = require("../auth/token/token.module");
const _workspacedomainsmodule = require("../domain/workspace-domains/workspace-domains.module");
const _jwtmodule = require("../jwt/jwt.module");
const _metricsmodule = require("../metrics/metrics.module");
const _secretencryptionmodule = require("../secret-encryption/secret-encryption.module");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _userworkspacemodule = require("../user-workspace/user-workspace.module");
const _userentity = require("../user/user.entity");
const _usermodule = require("../user/user.module");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _twofactorauthenticationresolver = require("./two-factor-authentication.resolver");
const _twofactorauthenticationservice = require("./two-factor-authentication.service");
const _twofactorauthenticationmethodentity = require("./entities/two-factor-authentication-method.entity");
const _simplesecretencryptionutil = require("./utils/simple-secret-encryption.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let TwoFactorAuthenticationModule = class TwoFactorAuthenticationModule {
};
TwoFactorAuthenticationModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _userworkspacemodule.UserWorkspaceModule,
            _workspacedomainsmodule.WorkspaceDomainsModule,
            _metricsmodule.MetricsModule,
            _tokenmodule.TokenModule,
            // JwtModule is required by the deprecated SimpleSecretEncryptionUtil; drop
            // it together with the util once the 2.5 cross-upgrade window closes.
            _jwtmodule.JwtModule,
            _secretencryptionmodule.SecretEncryptionModule,
            _typeorm.TypeOrmModule.forFeature([
                _userentity.UserEntity,
                _twofactorauthenticationmethodentity.TwoFactorAuthenticationMethodEntity,
                _userworkspaceentity.UserWorkspaceEntity
            ]),
            _usermodule.UserModule
        ],
        providers: [
            _twofactorauthenticationservice.TwoFactorAuthenticationService,
            _twofactorauthenticationresolver.TwoFactorAuthenticationResolver,
            _simplesecretencryptionutil.SimpleSecretEncryptionUtil,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_twofactorauthenticationmethodentity.TwoFactorAuthenticationMethodEntity)
        ],
        exports: [
            _twofactorauthenticationservice.TwoFactorAuthenticationService
        ]
    })
], TwoFactorAuthenticationModule);

//# sourceMappingURL=two-factor-authentication.module.js.map