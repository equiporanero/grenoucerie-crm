"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ConnectionProviderModule", {
    enumerable: true,
    get: function() {
        return ConnectionProviderModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _applicationconnectionproviderresolver = require("./application-connection-provider.resolver");
const _connectionproviderentity = require("./connection-provider.entity");
const _connectionprovideroauthflowservice = require("./connection-provider-oauth-flow.service");
const _connectionproviderservice = require("./connection-provider.service");
const _applicationregistrationvariableentity = require("../application-registration-variable/application-registration-variable.entity");
const _applicationentity = require("../application.entity");
const _jwtmodule = require("../../jwt/jwt.module");
const _secretencryptionmodule = require("../../secret-encryption/secret-encryption.module");
const _securehttpclientmodule = require("../../secure-http-client/secure-http-client.module");
const _twentyconfigmodule = require("../../twenty-config/twenty-config.module");
const _connectedaccountentity = require("../../../metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionmodule = require("../../../metadata-modules/connected-account/services/connected-account-token-encryption.module");
const _flatconnectionprovidermodule = require("../../../metadata-modules/flat-connection-provider/flat-connection-provider.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ConnectionProviderModule = class ConnectionProviderModule {
};
ConnectionProviderModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _connectionproviderentity.ConnectionProviderEntity,
                _applicationentity.ApplicationEntity,
                _applicationregistrationvariableentity.ApplicationRegistrationVariableEntity,
                _connectedaccountentity.ConnectedAccountEntity
            ]),
            _jwtmodule.JwtModule,
            _secretencryptionmodule.SecretEncryptionModule,
            _securehttpclientmodule.SecureHttpClientModule,
            _twentyconfigmodule.TwentyConfigModule,
            _flatconnectionprovidermodule.FlatConnectionProviderModule,
            _connectedaccounttokenencryptionmodule.ConnectedAccountTokenEncryptionModule
        ],
        providers: [
            _connectionproviderservice.ConnectionProviderService,
            _connectionprovideroauthflowservice.ConnectionProviderOAuthFlowService,
            _applicationconnectionproviderresolver.ApplicationConnectionProviderResolver
        ],
        exports: [
            _connectionproviderservice.ConnectionProviderService,
            _connectionprovideroauthflowservice.ConnectionProviderOAuthFlowService
        ]
    })
], ConnectionProviderModule);

//# sourceMappingURL=connection-provider.module.js.map