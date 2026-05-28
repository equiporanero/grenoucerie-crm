"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingSmtpDriverModule", {
    enumerable: true,
    get: function() {
        return MessagingSmtpDriverModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _securehttpclientmodule = require("../../../../../engine/core-modules/secure-http-client/secure-http-client.module");
const _connectedaccountentity = require("../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionmodule = require("../../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.module");
const _smtpclientprovider = require("./providers/smtp-client.provider");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessagingSmtpDriverModule = class MessagingSmtpDriverModule {
};
MessagingSmtpDriverModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _securehttpclientmodule.SecureHttpClientModule,
            _connectedaccounttokenencryptionmodule.ConnectedAccountTokenEncryptionModule,
            _typeorm.TypeOrmModule.forFeature([
                _connectedaccountentity.ConnectedAccountEntity
            ])
        ],
        providers: [
            _smtpclientprovider.SmtpClientProvider
        ],
        exports: [
            _smtpclientprovider.SmtpClientProvider
        ]
    })
], MessagingSmtpDriverModule);

//# sourceMappingURL=messaging-smtp-driver.module.js.map