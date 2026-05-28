"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImapSmtpCaldavModule", {
    enumerable: true,
    get: function() {
        return ImapSmtpCaldavModule;
    }
});
const _common = require("@nestjs/common");
const _featureflagmodule = require("../feature-flag/feature-flag.module");
const _imapsmtpcaldavconnectionvalidatormodule = require("./services/imap-smtp-caldav-connection-validator.module");
const _securehttpclientmodule = require("../secure-http-client/secure-http-client.module");
const _messagequeuemodule = require("../message-queue/message-queue.module");
const _connectedaccountmetadatamodule = require("../../metadata-modules/connected-account/connected-account-metadata.module");
const _connectedaccounttokenencryptionmodule = require("../../metadata-modules/connected-account/services/connected-account-token-encryption.module");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _twentyormmodule = require("../../twenty-orm/twenty-orm.module");
const _caldavdrivermodule = require("../../../modules/calendar/calendar-event-import-manager/drivers/caldav/caldav-driver.module");
const _connectedaccountmodule = require("../../../modules/connected-account/connected-account.module");
const _imapapismodule = require("../../../modules/connected-account/imap-api/imap-apis.module");
const _messagingimapdrivermodule = require("../../../modules/messaging/message-import-manager/drivers/imap/messaging-imap-driver.module");
const _messagingimportmanagermodule = require("../../../modules/messaging/message-import-manager/messaging-import-manager.module");
const _imapsmtpcaldavconnectionresolver = require("./imap-smtp-caldav-connection.resolver");
const _imapsmtpcaldavconnectionservice = require("./services/imap-smtp-caldav-connection.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ImapSmtpCaldavModule = class ImapSmtpCaldavModule {
};
ImapSmtpCaldavModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _connectedaccountmodule.ConnectedAccountModule,
            _connectedaccountmetadatamodule.ConnectedAccountMetadataModule,
            _connectedaccounttokenencryptionmodule.ConnectedAccountTokenEncryptionModule,
            _messagingimapdrivermodule.MessagingIMAPDriverModule,
            _imapapismodule.IMAPAPIsModule,
            _messagingimportmanagermodule.MessagingImportManagerModule,
            _messagequeuemodule.MessageQueueModule,
            _twentyormmodule.TwentyORMModule,
            _featureflagmodule.FeatureFlagModule,
            _imapsmtpcaldavconnectionvalidatormodule.ImapSmtpCaldavValidatorModule,
            _permissionsmodule.PermissionsModule,
            _securehttpclientmodule.SecureHttpClientModule,
            _caldavdrivermodule.CalDavDriverModule
        ],
        providers: [
            _imapsmtpcaldavconnectionresolver.ImapSmtpCaldavResolver,
            _imapsmtpcaldavconnectionservice.ImapSmtpCaldavService
        ],
        exports: [
            _imapsmtpcaldavconnectionservice.ImapSmtpCaldavService
        ]
    })
], ImapSmtpCaldavModule);

//# sourceMappingURL=imap-smtp-caldav-connection.module.js.map