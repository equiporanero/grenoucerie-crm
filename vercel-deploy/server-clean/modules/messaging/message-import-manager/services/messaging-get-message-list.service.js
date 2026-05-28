"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingGetMessageListService", {
    enumerable: true,
    get: function() {
        return MessagingGetMessageListService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _messageimportdriverexception = require("../drivers/exceptions/message-import-driver.exception");
const _gmailgetmessagelistservice = require("../drivers/gmail/services/gmail-get-message-list.service");
const _imapgetmessagelistservice = require("../drivers/imap/services/imap-get-message-list.service");
const _microsoftgetmessagelistservice = require("../drivers/microsoft/services/microsoft-get-message-list.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MessagingGetMessageListService = class MessagingGetMessageListService {
    async getMessageLists(messageChannel, messageFolders) {
        switch(messageChannel.connectedAccount.provider){
            case _types.ConnectedAccountProvider.GOOGLE:
                return await this.gmailGetMessageListService.getMessageLists({
                    messageChannel,
                    connectedAccount: messageChannel.connectedAccount,
                    messageFolders
                });
            case _types.ConnectedAccountProvider.MICROSOFT:
                return this.microsoftGetMessageListService.getMessageLists({
                    messageChannel,
                    connectedAccount: messageChannel.connectedAccount,
                    messageFolders
                });
            case _types.ConnectedAccountProvider.IMAP_SMTP_CALDAV:
                {
                    return await this.imapGetMessageListService.getMessageLists({
                        messageChannel,
                        connectedAccount: messageChannel.connectedAccount,
                        messageFolders
                    });
                }
            default:
                throw new _messageimportdriverexception.MessageImportDriverException(`Provider ${messageChannel.connectedAccount.provider} is not supported`, _messageimportdriverexception.MessageImportDriverExceptionCode.PROVIDER_NOT_SUPPORTED);
        }
    }
    constructor(gmailGetMessageListService, microsoftGetMessageListService, imapGetMessageListService){
        this.gmailGetMessageListService = gmailGetMessageListService;
        this.microsoftGetMessageListService = microsoftGetMessageListService;
        this.imapGetMessageListService = imapGetMessageListService;
    }
};
MessagingGetMessageListService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gmailgetmessagelistservice.GmailGetMessageListService === "undefined" ? Object : _gmailgetmessagelistservice.GmailGetMessageListService,
        typeof _microsoftgetmessagelistservice.MicrosoftGetMessageListService === "undefined" ? Object : _microsoftgetmessagelistservice.MicrosoftGetMessageListService,
        typeof _imapgetmessagelistservice.ImapGetMessageListService === "undefined" ? Object : _imapgetmessagelistservice.ImapGetMessageListService
    ])
], MessagingGetMessageListService);

//# sourceMappingURL=messaging-get-message-list.service.js.map