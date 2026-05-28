"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InstanceCommandProviderModule", {
    enumerable: true,
    get: function() {
        return InstanceCommandProviderModule;
    }
});
const _common = require("@nestjs/common");
const _instancecommandsconstant = require("./instance-commands.constant");
const _jwtmodule = require("../../../engine/core-modules/jwt/jwt.module");
const _secretencryptionmodule = require("../../../engine/core-modules/secret-encryption/secret-encryption.module");
const _simplesecretencryptionutil = require("../../../engine/core-modules/two-factor-authentication/utils/simple-secret-encryption.util");
const _connectedaccounttokenencryptionmodule = require("../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let InstanceCommandProviderModule = class InstanceCommandProviderModule {
};
InstanceCommandProviderModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _connectedaccounttokenencryptionmodule.ConnectedAccountTokenEncryptionModule,
            _secretencryptionmodule.SecretEncryptionModule,
            // JwtModule is required by SimpleSecretEncryptionUtil. Drop both once the
            // 2.5 cross-upgrade window closes and the encrypt-totp-secrets slow command
            // is retired.
            _jwtmodule.JwtModule
        ],
        providers: [
            ..._instancecommandsconstant.INSTANCE_COMMANDS,
            _simplesecretencryptionutil.SimpleSecretEncryptionUtil
        ]
    })
], InstanceCommandProviderModule);

//# sourceMappingURL=instance-command-provider.module.js.map