"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftMessageOutboundService", {
    enumerable: true,
    get: function() {
        return MicrosoftMessageOutboundService;
    }
});
const _common = require("@nestjs/common");
const _microsoftoauth2clientprovider = require("../../../../../connected-account/oauth2-client-manager/drivers/microsoft/microsoft-oauth2-client.provider");
const _tomicrosoftrecipientsutil = require("../../../../message-import-manager/utils/to-microsoft-recipients.util");
const _utils = require("twenty-shared/utils");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MicrosoftMessageOutboundService = class MicrosoftMessageOutboundService {
    async sendMessage(sendMessageInput, connectedAccount) {
        const microsoftClient = await this.microsoftOAuth2ClientProvider.getClient(connectedAccount.id);
        const { id: messageId, internetMessageId, conversationId } = await this.createDraftMessage(microsoftClient, sendMessageInput);
        await microsoftClient.api(`/me/messages/${messageId}/send`).post({});
        return {
            headerMessageId: internetMessageId ?? '',
            messageExternalId: messageId,
            threadExternalId: conversationId ?? undefined
        };
    }
    async createDraft(sendMessageInput, connectedAccount) {
        const microsoftClient = await this.microsoftOAuth2ClientProvider.getClient(connectedAccount.id);
        await this.createDraftMessage(microsoftClient, sendMessageInput);
    }
    async createDraftMessage(microsoftClient, sendMessageInput) {
        const parentMessageGraphId = sendMessageInput.inReplyTo ? await this.findMessageByInternetMessageId(microsoftClient, sendMessageInput.inReplyTo) : undefined;
        const message = this.composeMicrosoftMessage(sendMessageInput);
        if ((0, _utils.isDefined)(parentMessageGraphId)) {
            const reply = await microsoftClient.api(`/me/messages/${parentMessageGraphId}/createReply`).post({});
            const patched = await microsoftClient.api(`/me/messages/${reply.id}`).patch(message);
            return {
                id: reply.id,
                internetMessageId: patched?.internetMessageId ?? reply.internetMessageId,
                conversationId: patched?.conversationId ?? reply.conversationId
            };
        }
        const response = await microsoftClient.api('/me/messages').post(message);
        return {
            id: response.id,
            internetMessageId: response.internetMessageId,
            conversationId: response.conversationId
        };
    }
    async findMessageByInternetMessageId(microsoftClient, internetMessageId) {
        const encodedId = encodeURIComponent(internetMessageId);
        const response = await microsoftClient.api(`/me/messages?$filter=internetMessageId eq '${encodedId}'&$select=id&$top=1`).get();
        return response?.value?.[0]?.id;
    }
    composeMicrosoftMessage(sendMessageInput) {
        return {
            subject: sendMessageInput.subject,
            body: {
                contentType: 'HTML',
                content: sendMessageInput.html
            },
            toRecipients: (0, _tomicrosoftrecipientsutil.toMicrosoftRecipients)(sendMessageInput.to),
            ccRecipients: (0, _tomicrosoftrecipientsutil.toMicrosoftRecipients)(sendMessageInput.cc),
            bccRecipients: (0, _tomicrosoftrecipientsutil.toMicrosoftRecipients)(sendMessageInput.bcc),
            ...sendMessageInput.attachments && sendMessageInput.attachments.length > 0 ? {
                attachments: sendMessageInput.attachments.map((attachment)=>({
                        '@odata.type': '#microsoft.graph.fileAttachment',
                        name: attachment.filename,
                        contentType: attachment.contentType,
                        contentBytes: attachment.content.toString('base64')
                    }))
            } : {}
        };
    }
    constructor(microsoftOAuth2ClientProvider){
        this.microsoftOAuth2ClientProvider = microsoftOAuth2ClientProvider;
    }
};
MicrosoftMessageOutboundService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider === "undefined" ? Object : _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider
    ])
], MicrosoftMessageOutboundService);

//# sourceMappingURL=microsoft-message-outbound.service.js.map