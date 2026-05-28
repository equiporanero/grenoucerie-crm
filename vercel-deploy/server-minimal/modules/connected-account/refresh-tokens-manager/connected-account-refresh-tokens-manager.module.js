"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RefreshTokensManagerModule", {
    enumerable: true,
    get: function() {
        return RefreshTokensManagerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _appoauthrefreshmodule = require("../../../engine/core-modules/application/connection-provider/refresh/app-oauth-refresh.module");
const _jwtmodule = require("../../../engine/core-modules/jwt/jwt.module");
const _connectedaccountentity = require("../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionmodule = require("../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.module");
const _googleapirefreshaccesstokenmodule = require("./drivers/google/google-api-refresh-access-token.module");
const _microsoftapirefreshaccesstokenmodule = require("./drivers/microsoft/microsoft-api-refresh-access-token.module");
const _connectedaccountrefreshtokensservice = require("./services/connected-account-refresh-tokens.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let RefreshTokensManagerModule = class RefreshTokensManagerModule {
};
RefreshTokensManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _jwtmodule.JwtModule,
            _typeorm.TypeOrmModule.forFeature([
                _connectedaccountentity.ConnectedAccountEntity
            ]),
            _googleapirefreshaccesstokenmodule.GoogleAPIRefreshAccessTokenModule,
            _microsoftapirefreshaccesstokenmodule.MicrosoftAPIRefreshAccessTokenModule,
            _appoauthrefreshmodule.AppOAuthRefreshModule,
            _connectedaccounttokenencryptionmodule.ConnectedAccountTokenEncryptionModule
        ],
        providers: [
            _connectedaccountrefreshtokensservice.ConnectedAccountRefreshTokensService
        ],
        exports: [
            _connectedaccountrefreshtokensservice.ConnectedAccountRefreshTokensService
        ]
    })
], RefreshTokensManagerModule);

//# sourceMappingURL=connected-account-refresh-tokens-manager.module.js.map