"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppOAuthRefreshModule", {
    enumerable: true,
    get: function() {
        return AppOAuthRefreshModule;
    }
});
const _common = require("@nestjs/common");
const _connectionprovidermodule = require("../connection-provider.module");
const _appoauthrefreshtokensservice = require("./services/app-oauth-refresh-tokens.service");
const _appoauthrevokeservice = require("./services/app-oauth-revoke.service");
const _applicationvariablemodule = require("../../application-variable/application-variable.module");
const _securehttpclientmodule = require("../../../secure-http-client/secure-http-client.module");
const _connectedaccounttokenencryptionmodule = require("../../../../metadata-modules/connected-account/services/connected-account-token-encryption.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AppOAuthRefreshModule = class AppOAuthRefreshModule {
};
AppOAuthRefreshModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _connectionprovidermodule.ConnectionProviderModule,
            _applicationvariablemodule.ApplicationVariableEntityModule,
            _securehttpclientmodule.SecureHttpClientModule,
            _connectedaccounttokenencryptionmodule.ConnectedAccountTokenEncryptionModule
        ],
        providers: [
            _appoauthrefreshtokensservice.AppOAuthRefreshAccessTokenService,
            _appoauthrevokeservice.AppOAuthRevokeService
        ],
        exports: [
            _appoauthrefreshtokensservice.AppOAuthRefreshAccessTokenService,
            _appoauthrevokeservice.AppOAuthRevokeService
        ]
    })
], AppOAuthRefreshModule);

//# sourceMappingURL=app-oauth-refresh.module.js.map