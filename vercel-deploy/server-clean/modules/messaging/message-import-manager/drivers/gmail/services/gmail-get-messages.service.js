"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GmailGetMessagesService", {
    enumerable: true,
    get: function() {
        return GmailGetMessagesService;
    }
});
const _common = require("@nestjs/common");
const _googleapisbatcher = require("@jrmdayn/googleapis-batcher");
const _guards = require("@sniptt/guards");
const _googleapis = require("googleapis");
const _utils = require("twenty-shared/utils");
const _types = require("twenty-shared/types");
const _googleoauth2clientprovider = require("../../../../../connected-account/oauth2-client-manager/drivers/google/google-oauth2-client.provider");
const _gmailmessagesimporterrorhandlerservice = require("./gmail-messages-import-error-handler.service");
const _filtergmailmessagesbyfolderpolicyutil = require("../utils/filter-gmail-messages-by-folder-policy.util");
const _parseandformatgmailmessageutil = require("../utils/parse-and-format-gmail-message.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
const GMAIL_BATCH_REQUEST_MAX_SIZE = 50;
let GmailGetMessagesService = class GmailGetMessagesService {
    async getMessages(messageIds, connectedAccount, messageChannel) {
        const oAuth2Client = await this.googleOAuth2ClientProvider.getClient(connectedAccount.id);
        const batchedFetchImplementation = (0, _googleapisbatcher.batchFetchImplementation)({
            maxBatchSize: GMAIL_BATCH_REQUEST_MAX_SIZE
        });
        const batchedGmailClient = _googleapis.google.gmail({
            version: 'v1',
            auth: oAuth2Client,
            fetchImplementation: batchedFetchImplementation
        });
        const fetchedMessages = await this.fetchMessages(batchedGmailClient, messageIds, connectedAccount);
        const filteredMessages = (0, _filtergmailmessagesbyfolderpolicyutil.filterGmailMessagesByFolderPolicy)(fetchedMessages, messageChannel);
        if (messageChannel.messageFolderImportPolicy !== _types.MessageFolderImportPolicy.SELECTED_FOLDERS) {
            return filteredMessages;
        }
        const syncedLabelIds = (messageChannel.messageFolders ?? []).filter((folder)=>folder.isSynced && (0, _guards.isNonEmptyString)(folder.externalId)).map((folder)=>folder.externalId);
        if (syncedLabelIds.length === 0) {
            return filteredMessages;
        }
        const fetchedMessageIds = new Set(fetchedMessages.map((message)=>message.externalId));
        const filteredMessageIds = new Set(filteredMessages.map((message)=>message.externalId));
        const excludedMessageIds = new Set(fetchedMessages.filter((message)=>!filteredMessageIds.has(message.externalId)).map((message)=>message.externalId));
        const threadIds = [
            ...new Set(fetchedMessages.map((message)=>message.messageThreadExternalId).filter(_guards.isNonEmptyString))
        ];
        const matchingThreadIds = new Set();
        const missingMessageIds = [];
        await Promise.all(threadIds.map((threadId)=>batchedGmailClient.users.threads.get({
                userId: 'me',
                id: threadId,
                format: 'metadata',
                metadataHeaders: []
            }).then((response)=>{
                const threadMessages = response.data.messages ?? [];
                const threadHasSyncedLabel = threadMessages.some((threadMessage)=>!excludedMessageIds.has(threadMessage.id ?? '') && (threadMessage.labelIds ?? []).some((labelId)=>syncedLabelIds.includes(labelId)));
                if (!threadHasSyncedLabel) {
                    return;
                }
                matchingThreadIds.add(threadId);
                for (const threadMessage of threadMessages){
                    if ((0, _guards.isNonEmptyString)(threadMessage.id) && !fetchedMessageIds.has(threadMessage.id)) {
                        missingMessageIds.push(threadMessage.id);
                    }
                }
            }).catch((error)=>{
                this.gmailMessagesImportErrorHandler.handleError(error, threadId);
            })));
        const threadSiblings = missingMessageIds.length > 0 ? await this.fetchMessages(batchedGmailClient, missingMessageIds, connectedAccount) : [];
        const includedMessages = fetchedMessages.filter((message)=>filteredMessageIds.has(message.externalId) || matchingThreadIds.has(message.messageThreadExternalId));
        return [
            ...includedMessages,
            ...threadSiblings
        ];
    }
    async fetchMessages(gmailClient, messageIds, connectedAccount) {
        const results = await Promise.all(messageIds.map((messageId)=>gmailClient.users.messages.get({
                userId: 'me',
                id: messageId
            }).then((response)=>({
                    messageId,
                    data: response.data,
                    error: null
                })).catch((error)=>({
                    messageId,
                    data: null,
                    error
                }))));
        return results.map(({ messageId, data, error })=>{
            if (error) {
                this.gmailMessagesImportErrorHandler.handleError(error, messageId);
                return undefined;
            }
            return (0, _parseandformatgmailmessageutil.parseAndFormatGmailMessage)(data, connectedAccount);
        }).filter(_utils.isDefined);
    }
    constructor(googleOAuth2ClientProvider, gmailMessagesImportErrorHandler){
        this.googleOAuth2ClientProvider = googleOAuth2ClientProvider;
        this.gmailMessagesImportErrorHandler = gmailMessagesImportErrorHandler;
    }
};
GmailGetMessagesService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _googleoauth2clientprovider.GoogleOAuth2ClientProvider === "undefined" ? Object : _googleoauth2clientprovider.GoogleOAuth2ClientProvider,
        typeof _gmailmessagesimporterrorhandlerservice.GmailMessagesImportErrorHandler === "undefined" ? Object : _gmailmessagesimporterrorhandlerservice.GmailMessagesImportErrorHandler
    ])
], GmailGetMessagesService);

//# sourceMappingURL=gmail-get-messages.service.js.map