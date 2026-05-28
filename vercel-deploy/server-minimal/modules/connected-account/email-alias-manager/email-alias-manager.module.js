"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailAliasManagerModule", {
    enumerable: true,
    get: function() {
        return EmailAliasManagerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _connectedaccountentity = require("../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _googleemailaliaserrorhandlerservice = require("./drivers/google/services/google-email-alias-error-handler.service");
const _googleemailaliasmanagerservice = require("./drivers/google/services/google-email-alias-manager.service");
const _microsoftemailaliasmanagerservice = require("./drivers/microsoft/services/microsoft-email-alias-manager.service");
const _emailaliasmanagerservice = require("./services/email-alias-manager.service");
const _oauth2clientmanagermodule = require("../oauth2-client-manager/oauth2-client-manager.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let EmailAliasManagerModule = class EmailAliasManagerModule {
};
EmailAliasManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _oauth2clientmanagermodule.OAuth2ClientManagerModule,
            _typeorm.TypeOrmModule.forFeature([
                _connectedaccountentity.ConnectedAccountEntity
            ])
        ],
        providers: [
            _emailaliasmanagerservice.EmailAliasManagerService,
            _googleemailaliasmanagerservice.GoogleEmailAliasManagerService,
            _googleemailaliaserrorhandlerservice.GmailEmailAliasErrorHandlerService,
            _microsoftemailaliasmanagerservice.MicrosoftEmailAliasManagerService
        ],
        exports: [
            _emailaliasmanagerservice.EmailAliasManagerService
        ]
    })
], EmailAliasManagerModule);

//# sourceMappingURL=email-alias-manager.module.js.map