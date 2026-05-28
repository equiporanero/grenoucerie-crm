"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OAuth2ClientManagerModule", {
    enumerable: true,
    get: function() {
        return OAuth2ClientManagerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _connectedaccountentity = require("../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionmodule = require("../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.module");
const _googleoauth2clientprovider = require("./drivers/google/google-oauth2-client.provider");
const _microsoftoauth2clientprovider = require("./drivers/microsoft/microsoft-oauth2-client.provider");
const _connectedaccountrefreshtokensmanagermodule = require("../refresh-tokens-manager/connected-account-refresh-tokens-manager.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let OAuth2ClientManagerModule = class OAuth2ClientManagerModule {
};
OAuth2ClientManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _connectedaccounttokenencryptionmodule.ConnectedAccountTokenEncryptionModule,
            _connectedaccountrefreshtokensmanagermodule.RefreshTokensManagerModule,
            _typeorm.TypeOrmModule.forFeature([
                _connectedaccountentity.ConnectedAccountEntity
            ])
        ],
        providers: [
            _googleoauth2clientprovider.GoogleOAuth2ClientProvider,
            _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider,
            _common.Logger
        ],
        exports: [
            _googleoauth2clientprovider.GoogleOAuth2ClientProvider,
            _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider
        ]
    })
], OAuth2ClientManagerModule);

//# sourceMappingURL=oauth2-client-manager.module.js.map