"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GmailGetMessageListService", {
    enumerable: true,
    get: function() {
        return GmailGetMessageListService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _googleapis = require("googleapis");
const _types = require("twenty-shared/types");
const _googleoauth2clientprovider = require("../../../../../connected-account/oauth2-client-manager/drivers/google/google-oauth2-client.provider");
const _messageimportdriverexception = require("../../exceptions/message-import-driver.exception");
const _messaginggmailusersmessageslistmaxresultconstant = require("../constants/messaging-gmail-users-messages-list-max-result.constant");
const _gmailgethistoryservice = require("./gmail-get-history.service");
const _gmailmessagelistfetcherrorhandlerservice = require("./gmail-message-list-fetch-error-handler.service");
const _computegmailexcludesearchfilterutil = require("../utils/compute-gmail-exclude-search-filter.util");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GmailGetMessageListService = class GmailGetMessageListService {
    async getMessageListWithoutCursor(connectedAccount, messageFolders, messageChannel) {
        const oAuth2Client = await this.googleOAuth2ClientProvider.getClient(connectedAccount.id);
        const gmailClient = _googleapis.google.gmail({
            version: 'v1',
            auth: oAuth2Client
        });
        let pageToken;
        let hasMoreMessages = true;
        const messageExternalIds = [];
        const excludedSearchFilter = (0, _computegmailexcludesearchfilterutil.computeGmailExcludeSearchFilter)(messageFolders, messageChannel.messageFolderImportPolicy);
        while(hasMoreMessages){
            const messageList = await gmailClient.users.messages.list({
                userId: 'me',
                maxResults: _messaginggmailusersmessageslistmaxresultconstant.MESSAGING_GMAIL_USERS_MESSAGES_LIST_MAX_RESULT,
                pageToken,
                q: excludedSearchFilter
            }).catch((error)=>{
                this.logger.error(`Connected account ${connectedAccount.id}: Error fetching message list: ${error.message}`);
                this.logger.error(`Connected account ${connectedAccount.id}: Error fetching message list: ${JSON.stringify(error)}`);
                this.gmailMessageListFetchErrorHandler.handleError(error);
                return {
                    data: {
                        messages: [],
                        nextPageToken: undefined
                    }
                };
            });
            const { messages } = messageList.data;
            const hasMessages = messages && messages.length > 0;
            if (!hasMessages) {
                break;
            }
            pageToken = messageList.data.nextPageToken ?? undefined;
            hasMoreMessages = !!pageToken;
            // @ts-expect-error legacy noImplicitAny
            messageExternalIds.push(...messages.map((message)=>message.id));
        }
        if (messageExternalIds.length === 0) {
            return [
                {
                    messageExternalIds,
                    nextSyncCursor: '',
                    previousSyncCursor: '',
                    messageExternalIdsToDelete: [],
                    folderId: undefined
                }
            ];
        }
        const firstMessageExternalId = messageExternalIds[0];
        const firstMessageContent = await gmailClient.users.messages.get({
            userId: 'me',
            id: firstMessageExternalId
        }).catch((error)=>{
            this.gmailMessageListFetchErrorHandler.handleError(error);
        });
        const nextSyncCursor = firstMessageContent?.data?.historyId;
        if (!nextSyncCursor) {
            throw new _messageimportdriverexception.MessageImportDriverException(`No historyId found for message ${firstMessageExternalId} for connected account ${connectedAccount.id}`, _messageimportdriverexception.MessageImportDriverExceptionCode.NO_NEXT_SYNC_CURSOR);
        }
        return [
            {
                messageExternalIds,
                nextSyncCursor,
                previousSyncCursor: '',
                messageExternalIdsToDelete: [],
                folderId: undefined
            }
        ];
    }
    async getMessageLists({ messageChannel, connectedAccount, messageFolders }) {
        if (messageChannel.messageFolderImportPolicy === _types.MessageFolderImportPolicy.SELECTED_FOLDERS) {
            const foldersToSync = messageFolders.filter((folder)=>folder.isSynced);
            if (foldersToSync.length === 0) {
                this.logger.warn(`Connected account ${connectedAccount.id} Message Channel: ${messageChannel.id}: No folders to process`);
                return [];
            }
        }
        const oAuth2Client = await this.googleOAuth2ClientProvider.getClient(connectedAccount.id);
        const gmailClient = _googleapis.google.gmail({
            version: 'v1',
            auth: oAuth2Client
        });
        if (!(0, _guards.isNonEmptyString)(messageChannel.syncCursor)) {
            return this.getMessageListWithoutCursor(connectedAccount, messageFolders, messageChannel);
        }
        const { history, historyId: nextSyncCursor } = await this.gmailGetHistoryService.getHistory(gmailClient, messageChannel.syncCursor);
        const { messagesAdded, messagesDeleted } = await this.gmailGetHistoryService.getMessageIdsFromHistory(history);
        if (!nextSyncCursor) {
            throw new _messageimportdriverexception.MessageImportDriverException(`No nextSyncCursor found for connected account ${connectedAccount.id}`, _messageimportdriverexception.MessageImportDriverExceptionCode.NO_NEXT_SYNC_CURSOR);
        }
        return [
            {
                messageExternalIds: messagesAdded,
                messageExternalIdsToDelete: messagesDeleted,
                previousSyncCursor: messageChannel.syncCursor,
                nextSyncCursor,
                folderId: undefined
            }
        ];
    }
    constructor(gmailGetHistoryService, googleOAuth2ClientProvider, gmailMessageListFetchErrorHandler){
        this.gmailGetHistoryService = gmailGetHistoryService;
        this.googleOAuth2ClientProvider = googleOAuth2ClientProvider;
        this.gmailMessageListFetchErrorHandler = gmailMessageListFetchErrorHandler;
        this.logger = new _common.Logger(GmailGetMessageListService.name);
    }
};
GmailGetMessageListService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gmailgethistoryservice.GmailGetHistoryService === "undefined" ? Object : _gmailgethistoryservice.GmailGetHistoryService,
        typeof _googleoauth2clientprovider.GoogleOAuth2ClientProvider === "undefined" ? Object : _googleoauth2clientprovider.GoogleOAuth2ClientProvider,
        typeof _gmailmessagelistfetcherrorhandlerservice.GmailMessageListFetchErrorHandler === "undefined" ? Object : _gmailmessagelistfetcherrorhandlerservice.GmailMessageListFetchErrorHandler
    ])
], GmailGetMessageListService);

//# sourceMappingURL=gmail-get-message-list.service.js.map