"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GmailMessageOutboundService", {
    enumerable: true,
    get: function() {
        return GmailMessageOutboundService;
    }
});
const _common = require("@nestjs/common");
const _googleapis = require("googleapis");
const _mailcomposer = /*#__PURE__*/ _interop_require_default(require("nodemailer/lib/mail-composer"));
const _utils = require("twenty-shared/utils");
const _googleoauth2clientprovider = require("../../../../../connected-account/oauth2-client-manager/drivers/google/google-oauth2-client.provider");
const _mimeencodeutil = require("../../../../message-import-manager/utils/mime-encode.util");
const _extractmessageidfrombufferutil = require("../../../utils/extract-message-id-from-buffer.util");
const _tomailcomposeroptionsutil = require("../../../utils/to-mail-composer-options.util");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GmailMessageOutboundService = class GmailMessageOutboundService {
    async sendMessage(sendMessageInput, connectedAccount) {
        const { gmailClient, encodedMessage, messageBuffer } = await this.composeGmailMessage(connectedAccount, sendMessageInput);
        const { data } = await gmailClient.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: encodedMessage,
                ...sendMessageInput.threadExternalId ? {
                    threadId: sendMessageInput.threadExternalId
                } : {}
            }
        });
        return {
            headerMessageId: (0, _extractmessageidfrombufferutil.extractMessageIdFromBuffer)(messageBuffer),
            messageExternalId: data.id ?? undefined,
            threadExternalId: data.threadId ?? undefined
        };
    }
    async createDraft(sendMessageInput, connectedAccount) {
        const { gmailClient, encodedMessage } = await this.composeGmailMessage(connectedAccount, sendMessageInput);
        await gmailClient.users.drafts.create({
            userId: 'me',
            requestBody: {
                message: {
                    raw: encodedMessage
                }
            }
        });
    }
    async composeGmailMessage(connectedAccount, sendMessageInput) {
        const oAuth2Client = await this.googleOAuth2ClientProvider.getClient(connectedAccount.id);
        const gmailClient = _googleapis.google.gmail({
            version: 'v1',
            auth: oAuth2Client
        });
        const peopleClient = _googleapis.google.people({
            version: 'v1',
            auth: oAuth2Client
        });
        const { data: gmailData } = await gmailClient.users.getProfile({
            userId: 'me'
        });
        const fromEmail = gmailData.emailAddress;
        const { data: peopleData } = await peopleClient.people.get({
            resourceName: 'people/me',
            personFields: 'names'
        });
        const fromName = peopleData?.names?.[0]?.displayName;
        const from = (0, _utils.isDefined)(fromName) ? `"${(0, _mimeencodeutil.mimeEncode)(fromName)}" <${fromEmail}>` : `${fromEmail}`;
        const mail = new _mailcomposer.default((0, _tomailcomposeroptionsutil.toMailComposerOptions)(from, sendMessageInput));
        const compiledMessage = mail.compile();
        compiledMessage.keepBcc = true;
        const messageBuffer = await compiledMessage.build();
        const encodedMessage = Buffer.from(messageBuffer).toString('base64url');
        return {
            gmailClient,
            encodedMessage,
            messageBuffer
        };
    }
    constructor(googleOAuth2ClientProvider){
        this.googleOAuth2ClientProvider = googleOAuth2ClientProvider;
    }
};
GmailMessageOutboundService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _googleoauth2clientprovider.GoogleOAuth2ClientProvider === "undefined" ? Object : _googleoauth2clientprovider.GoogleOAuth2ClientProvider
    ])
], GmailMessageOutboundService);

//# sourceMappingURL=gmail-message-outbound.service.js.map