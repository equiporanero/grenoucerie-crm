"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SendEmailService", {
    enumerable: true,
    get: function() {
        return SendEmailService;
    }
});
const _common = require("@nestjs/common");
const _messagingmessageoutboundservice = require("./messaging-message-outbound.service");
const _sentmessagepersistenceservice = require("./sent-message-persistence.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let SendEmailService = class SendEmailService {
    async sendComposedEmail(data) {
        return this.messageOutboundService.sendMessage({
            to: data.recipients.to,
            cc: data.recipients.cc.length > 0 ? data.recipients.cc : undefined,
            bcc: data.recipients.bcc.length > 0 ? data.recipients.bcc : undefined,
            subject: data.sanitizedSubject,
            body: data.plainTextBody,
            html: data.sanitizedHtmlBody,
            attachments: data.attachments,
            inReplyTo: data.inReplyTo,
            threadExternalId: data.threadExternalId,
            references: data.references
        }, data.connectedAccount);
    }
    async persistSentMessage(sendResult, data, workspaceId) {
        try {
            await this.sentMessagePersistenceService.persistSentMessage({
                sendResult,
                subject: data.sanitizedSubject,
                body: data.plainTextBody,
                recipients: data.recipients,
                connectedAccount: data.connectedAccount,
                messageChannelId: data.messageChannelId,
                inReplyTo: data.inReplyTo,
                parentThreadExternalId: data.threadExternalId,
                workspaceId
            });
        } catch (persistenceError) {
            this.logger.warn(`Failed to persist sent message (sync will recover): ${persistenceError}`);
        }
    }
    constructor(messageOutboundService, sentMessagePersistenceService){
        this.messageOutboundService = messageOutboundService;
        this.sentMessagePersistenceService = sentMessagePersistenceService;
        this.logger = new _common.Logger(SendEmailService.name);
    }
};
SendEmailService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _messagingmessageoutboundservice.MessagingMessageOutboundService === "undefined" ? Object : _messagingmessageoutboundservice.MessagingMessageOutboundService,
        typeof _sentmessagepersistenceservice.SentMessagePersistenceService === "undefined" ? Object : _sentmessagepersistenceservice.SentMessagePersistenceService
    ])
], SendEmailService);

//# sourceMappingURL=send-email.service.js.map