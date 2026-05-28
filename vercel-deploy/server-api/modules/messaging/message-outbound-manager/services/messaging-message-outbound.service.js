"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingMessageOutboundService", {
    enumerable: true,
    get: function() {
        return MessagingMessageOutboundService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _utils = require("twenty-shared/utils");
const _emailgroupmessageoutboundservice = require("../drivers/email-group/services/email-group-message-outbound.service");
const _gmailmessageoutboundservice = require("../drivers/gmail/services/gmail-message-outbound.service");
const _imapsmtpmessageoutboundservice = require("../drivers/imap/services/imap-smtp-message-outbound.service");
const _microsoftmessageoutboundservice = require("../drivers/microsoft/services/microsoft-message-outbound.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MessagingMessageOutboundService = class MessagingMessageOutboundService {
    async sendMessage(sendMessageInput, connectedAccount) {
        switch(connectedAccount.provider){
            case _types.ConnectedAccountProvider.GOOGLE:
                return this.gmailMessageOutboundService.sendMessage(sendMessageInput, connectedAccount);
            case _types.ConnectedAccountProvider.MICROSOFT:
                return this.microsoftMessageOutboundService.sendMessage(sendMessageInput, connectedAccount);
            case _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV:
                return this.imapSmtpMessageOutboundService.sendMessage(sendMessageInput, connectedAccount);
            case _types.ConnectedAccountProvider.EMAIL_GROUP:
                return this.emailGroupMessageOutboundService.sendMessage(sendMessageInput, connectedAccount);
            case _types.ConnectedAccountProvider.OIDC:
            case _types.ConnectedAccountProvider.SAML:
            case _types.ConnectedAccountProvider.APP:
                throw new Error(`Provider ${connectedAccount.provider} does not support sending messages`);
            default:
                (0, _utils.assertUnreachable)(connectedAccount.provider, `Provider ${connectedAccount.provider} not supported for sending messages`);
        }
    }
    async createDraft(sendMessageInput, connectedAccount) {
        switch(connectedAccount.provider){
            case _types.ConnectedAccountProvider.GOOGLE:
                return this.gmailMessageOutboundService.createDraft(sendMessageInput, connectedAccount);
            case _types.ConnectedAccountProvider.MICROSOFT:
                return this.microsoftMessageOutboundService.createDraft(sendMessageInput, connectedAccount);
            case _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV:
                return this.imapSmtpMessageOutboundService.createDraft(sendMessageInput, connectedAccount);
            case _types.ConnectedAccountProvider.EMAIL_GROUP:
            case _types.ConnectedAccountProvider.OIDC:
            case _types.ConnectedAccountProvider.SAML:
            case _types.ConnectedAccountProvider.APP:
                throw new Error(`Provider ${connectedAccount.provider} does not support creating drafts`);
            default:
                (0, _utils.assertUnreachable)(connectedAccount.provider, `Provider ${connectedAccount.provider} not supported for creating drafts`);
        }
    }
    constructor(gmailMessageOutboundService, microsoftMessageOutboundService, imapSmtpMessageOutboundService, emailGroupMessageOutboundService){
        this.gmailMessageOutboundService = gmailMessageOutboundService;
        this.microsoftMessageOutboundService = microsoftMessageOutboundService;
        this.imapSmtpMessageOutboundService = imapSmtpMessageOutboundService;
        this.emailGroupMessageOutboundService = emailGroupMessageOutboundService;
    }
};
MessagingMessageOutboundService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gmailmessageoutboundservice.GmailMessageOutboundService === "undefined" ? Object : _gmailmessageoutboundservice.GmailMessageOutboundService,
        typeof _microsoftmessageoutboundservice.MicrosoftMessageOutboundService === "undefined" ? Object : _microsoftmessageoutboundservice.MicrosoftMessageOutboundService,
        typeof _imapsmtpmessageoutboundservice.ImapSmtpMessageOutboundService === "undefined" ? Object : _imapsmtpmessageoutboundservice.ImapSmtpMessageOutboundService,
        typeof _emailgroupmessageoutboundservice.EmailGroupMessageOutboundService === "undefined" ? Object : _emailgroupmessageoutboundservice.EmailGroupMessageOutboundService
    ])
], MessagingMessageOutboundService);

//# sourceMappingURL=messaging-message-outbound.service.js.map