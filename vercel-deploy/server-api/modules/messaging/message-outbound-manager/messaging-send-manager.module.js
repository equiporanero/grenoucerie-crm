"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingSendManagerModule", {
    enumerable: true,
    get: function() {
        return MessagingSendManagerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _emailingdomainmodule = require("../../../engine/core-modules/emailing-domain/emailing-domain.module");
const _emailingdomainentity = require("../../../engine/core-modules/emailing-domain/emailing-domain.entity");
const _messagechannelentity = require("../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _messagefolderentity = require("../../../engine/metadata-modules/message-folder/entities/message-folder.entity");
const _provideworkspacescopedrepository = require("../../../engine/twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
const _oauth2clientmanagermodule = require("../../connected-account/oauth2-client-manager/oauth2-client-manager.module");
const _messagingimapdrivermodule = require("../message-import-manager/drivers/imap/messaging-imap-driver.module");
const _messagingsmtpdrivermodule = require("../message-import-manager/drivers/smtp/messaging-smtp-driver.module");
const _messagingimportmanagermodule = require("../message-import-manager/messaging-import-manager.module");
const _emailgroupmessageoutboundservice = require("./drivers/email-group/services/email-group-message-outbound.service");
const _gmailmessageoutboundservice = require("./drivers/gmail/services/gmail-message-outbound.service");
const _imapsmtpmessageoutboundservice = require("./drivers/imap/services/imap-smtp-message-outbound.service");
const _microsoftmessageoutboundservice = require("./drivers/microsoft/services/microsoft-message-outbound.service");
const _messagingmessageoutboundservice = require("./services/messaging-message-outbound.service");
const _sendemailservice = require("./services/send-email.service");
const _sentmessagepersistenceservice = require("./services/sent-message-persistence.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessagingSendManagerModule = class MessagingSendManagerModule {
};
MessagingSendManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _oauth2clientmanagermodule.OAuth2ClientManagerModule,
            _messagingimapdrivermodule.MessagingIMAPDriverModule,
            _messagingsmtpdrivermodule.MessagingSmtpDriverModule,
            _messagingimportmanagermodule.MessagingImportManagerModule,
            _emailingdomainmodule.EmailingDomainModule,
            _typeorm.TypeOrmModule.forFeature([
                _messagechannelentity.MessageChannelEntity,
                _messagefolderentity.MessageFolderEntity,
                _emailingdomainentity.EmailingDomainEntity
            ])
        ],
        providers: [
            _gmailmessageoutboundservice.GmailMessageOutboundService,
            _microsoftmessageoutboundservice.MicrosoftMessageOutboundService,
            _imapsmtpmessageoutboundservice.ImapSmtpMessageOutboundService,
            _emailgroupmessageoutboundservice.EmailGroupMessageOutboundService,
            _messagingmessageoutboundservice.MessagingMessageOutboundService,
            _sendemailservice.SendEmailService,
            _sentmessagepersistenceservice.SentMessagePersistenceService,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_emailingdomainentity.EmailingDomainEntity)
        ],
        exports: [
            _messagingmessageoutboundservice.MessagingMessageOutboundService,
            _sendemailservice.SendEmailService,
            _sentmessagepersistenceservice.SentMessagePersistenceService
        ]
    })
], MessagingSendManagerModule);

//# sourceMappingURL=messaging-send-manager.module.js.map