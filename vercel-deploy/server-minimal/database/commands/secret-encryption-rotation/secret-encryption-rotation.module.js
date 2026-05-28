"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SecretEncryptionRotationModule", {
    enumerable: true,
    get: function() {
        return SecretEncryptionRotationModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _connectionparametersrotationhandler = require("./handlers/connection-parameters-rotation.handler");
const _sensitiveconfigstoragerotationhandler = require("./handlers/sensitive-config-storage-rotation.handler");
const _rotatesecretencryptioncommand = require("./rotate-secret-encryption.command");
const _secretencryptionrotationrunnerservice = require("./services/secret-encryption-rotation-runner.service");
const _applicationregistrationvariableentity = require("../../../engine/core-modules/application/application-registration-variable/application-registration-variable.entity");
const _applicationvariableentity = require("../../../engine/core-modules/application/application-variable/application-variable.entity");
const _signingkeyentity = require("../../../engine/core-modules/jwt/entities/signing-key.entity");
const _keyvaluepairentity = require("../../../engine/core-modules/key-value-pair/key-value-pair.entity");
const _secretencryptionmodule = require("../../../engine/core-modules/secret-encryption/secret-encryption.module");
const _twofactorauthenticationmethodentity = require("../../../engine/core-modules/two-factor-authentication/entities/two-factor-authentication-method.entity");
const _twentyconfigmodule = require("../../../engine/core-modules/twenty-config/twenty-config.module");
const _connectedaccountentity = require("../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let SecretEncryptionRotationModule = class SecretEncryptionRotationModule {
};
SecretEncryptionRotationModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _secretencryptionmodule.SecretEncryptionModule,
            _twentyconfigmodule.TwentyConfigModule,
            _typeorm.TypeOrmModule.forFeature([
                _applicationregistrationvariableentity.ApplicationRegistrationVariableEntity,
                _applicationvariableentity.ApplicationVariableEntity,
                _connectedaccountentity.ConnectedAccountEntity,
                _keyvaluepairentity.KeyValuePairEntity,
                _signingkeyentity.SigningKeyEntity,
                _twofactorauthenticationmethodentity.TwoFactorAuthenticationMethodEntity
            ])
        ],
        providers: [
            _connectionparametersrotationhandler.ConnectionParametersRotationHandler,
            _sensitiveconfigstoragerotationhandler.SensitiveConfigStorageRotationHandler,
            _secretencryptionrotationrunnerservice.SecretEncryptionRotationRunnerService,
            _rotatesecretencryptioncommand.RotateSecretEncryptionCommand
        ],
        exports: [
            _secretencryptionrotationrunnerservice.SecretEncryptionRotationRunnerService,
            _rotatesecretencryptioncommand.RotateSecretEncryptionCommand
        ]
    })
], SecretEncryptionRotationModule);

//# sourceMappingURL=secret-encryption-rotation.module.js.map