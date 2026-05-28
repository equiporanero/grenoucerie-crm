"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GmailGetHistoryService", {
    enumerable: true,
    get: function() {
        return GmailGetHistoryService;
    }
});
const _common = require("@nestjs/common");
const _guards = require("@sniptt/guards");
const _messaginggmailusershistorymaxresultconstant = require("../constants/messaging-gmail-users-history-max-result.constant");
const _gmailmessagelistfetcherrorhandlerservice = require("./gmail-message-list-fetch-error-handler.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let GmailGetHistoryService = class GmailGetHistoryService {
    async getHistory(gmailClient, lastSyncHistoryId) {
        const fullHistory = [];
        let pageToken;
        let hasMoreMessages = true;
        let nextHistoryId;
        while(hasMoreMessages){
            const response = await gmailClient.users.history.list({
                userId: 'me',
                maxResults: _messaginggmailusershistorymaxresultconstant.MESSAGING_GMAIL_USERS_HISTORY_MAX_RESULT,
                pageToken,
                startHistoryId: lastSyncHistoryId,
                historyTypes: [
                    'messageAdded',
                    'messageDeleted',
                    'labelAdded',
                    'labelRemoved'
                ]
            }).catch((error)=>{
                this.gmailMessageListFetchErrorHandler.handleError(error);
                return {
                    data: {
                        history: [],
                        historyId: lastSyncHistoryId,
                        nextPageToken: undefined
                    }
                };
            });
            nextHistoryId = response?.data?.historyId ?? undefined;
            if (response?.data?.history) {
                fullHistory.push(...response.data.history);
            }
            pageToken = response?.data?.nextPageToken ?? undefined;
            hasMoreMessages = !!pageToken;
        }
        return {
            history: fullHistory,
            historyId: nextHistoryId
        };
    }
    async getMessageIdsFromHistory(history) {
        const { messagesAdded, messagesDeleted } = history.reduce((acc, history)=>{
            const messagesAdded = history.messagesAdded?.map((messageAdded)=>messageAdded.message?.id || '');
            const labelsAdded = history.labelsAdded?.map((labelAdded)=>labelAdded.message?.id || '');
            const messagesDeleted = history.messagesDeleted?.map((messageDeleted)=>messageDeleted.message?.id || '');
            if (messagesAdded) acc.messagesAdded.push(...messagesAdded);
            if (labelsAdded) acc.messagesAdded.push(...labelsAdded);
            if (messagesDeleted) acc.messagesDeleted.push(...messagesDeleted);
            return acc;
        }, {
            messagesAdded: [],
            messagesDeleted: []
        });
        const uniqueMessagesAdded = messagesAdded.filter((messageId)=>(0, _guards.isNonEmptyString)(messageId) && !messagesDeleted.includes(messageId));
        const uniqueMessagesDeleted = messagesDeleted.filter((messageId)=>(0, _guards.isNonEmptyString)(messageId) && !messagesAdded.includes(messageId));
        return {
            messagesAdded: [
                ...new Set(uniqueMessagesAdded)
            ],
            messagesDeleted: [
                ...new Set(uniqueMessagesDeleted)
            ]
        };
    }
    constructor(gmailMessageListFetchErrorHandler){
        this.gmailMessageListFetchErrorHandler = gmailMessageListFetchErrorHandler;
    }
};
GmailGetHistoryService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _gmailmessagelistfetcherrorhandlerservice.GmailMessageListFetchErrorHandler === "undefined" ? Object : _gmailmessagelistfetcherrorhandlerservice.GmailMessageListFetchErrorHandler
    ])
], GmailGetHistoryService);

//# sourceMappingURL=gmail-get-history.service.js.map