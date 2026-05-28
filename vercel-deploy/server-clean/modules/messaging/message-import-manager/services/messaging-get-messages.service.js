"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingGetMessagesService", {
    enumerable: true,
    get: function() {
        return MessagingGetMessagesService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _messageimportdriverexception = require("../drivers/exceptions/message-import-driver.exception");
const _gmailgetmessagesservice = require("../drivers/gmail/services/gmail-get-messages.service");
const _imapgetmessagesservice = require("../drivers/imap/services/imap-get-messages.service");
const _microsoftgetmessagesservice = require("../drivers/microsoft/services/microsoft-get-messages.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MessagingGetMessagesService = class MessagingGetMessagesService {
    async getMessages(messageIds, connectedAccount, messageChannel) {
        switch(connectedAccount.provider){
            case _types.ConnectedAccountProvider.GOOGLE:
                return this.gmailGetMessagesService.getMessages(messageIds, connectedAccount, messageChannel);
            case _types.ConnectedAccountProvider.MICROSOFT:
                return this.microsoftGetMessagesService.getMessages(messageIds, connectedAccount);
            case _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV:
                return this.imapGetMessagesService.getMessages(messageIds, connectedAccount);
            default:
                throw new _messageimportdriverexception.MessageImportDriverException(`Provider ${connectedAccount.provider} is not supported`, _messageimportdriverexception.MessageImportDriverExceptionCode.PROVIDER_NOT_SUPPORTED);
        }
    }
    constructor(gmailGetMessagesService, microsoftGetMessagesService, imapGetMessagesService){
        this.gmailGetMessagesService = gmailGetMessagesService;
        this.microsoftGetMessagesService = microsoftGetMessagesService;
        this.imapGetMessagesService = imapGetMessagesService;
    }
};
MessagingGetMessagesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gmailgetmessagesservice.GmailGetMessagesService === "undefined" ? Object : _gmailgetmessagesservice.GmailGetMessagesService,
        typeof _microsoftgetmessagesservice.MicrosoftGetMessagesService === "undefined" ? Object : _microsoftgetmessagesservice.MicrosoftGetMessagesService,
        typeof _imapgetmessagesservice.ImapGetMessagesService === "undefined" ? Object : _imapgetmessagesservice.ImapGetMessagesService
    ])
], MessagingGetMessagesService);

//# sourceMappingURL=messaging-get-messages.service.js.map