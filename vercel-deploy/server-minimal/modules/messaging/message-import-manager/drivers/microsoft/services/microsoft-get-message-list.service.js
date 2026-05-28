"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftGetMessageListService", {
    enumerable: true,
    get: function() {
        return MicrosoftGetMessageListService;
    }
});
const _common = require("@nestjs/common");
const _microsoftgraphclient = require("@microsoft/microsoft-graph-client");
const _guards = require("@sniptt/guards");
const _plimit = /*#__PURE__*/ _interop_require_default(require("p-limit"));
const _types = require("twenty-shared/types");
const _microsoftoauth2clientprovider = require("../../../../../connected-account/oauth2-client-manager/drivers/microsoft/microsoft-oauth2-client.provider");
const _microsoftmessagelistfetcherrorhandlerservice = require("./microsoft-message-list-fetch-error-handler.service");
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
// Microsoft API limit is 999 messages per request on this endpoint
const MESSAGING_MICROSOFT_USERS_MESSAGES_LIST_MAX_RESULT = 999;
/* reference: https://learn.microsoft.com/en-us/graph/throttling-limits#limits-per-mailbox */ const FOLDER_PROCESSING_CONCURRENCY = 4;
let MicrosoftGetMessageListService = class MicrosoftGetMessageListService {
    async getMessageLists({ messageChannel, connectedAccount, messageFolders }) {
        const foldersToProcess = messageChannel.messageFolderImportPolicy === _types.MessageFolderImportPolicy.SELECTED_FOLDERS ? messageFolders.filter((folder)=>folder.isSynced) : messageFolders;
        if (foldersToProcess.length === 0) {
            this.logger.warn(`Connected account ${connectedAccount.id}: Message Channel: ${messageChannel.id}: No folders to process`);
            return [];
        }
        const limit = (0, _plimit.default)(FOLDER_PROCESSING_CONCURRENCY);
        const results = await Promise.all(foldersToProcess.map((folder)=>limit(async ()=>{
                const response = await this.getMessageList(connectedAccount, folder);
                return {
                    ...response,
                    folderId: folder.id
                };
            })));
        return results;
    }
    async getMessageList(connectedAccount, messageFolder) {
        const messageExternalIds = [];
        const messageExternalIdsToDelete = [];
        const microsoftClient = await this.microsoftOAuth2ClientProvider.getClient(connectedAccount.id);
        const folderId = messageFolder.externalId || messageFolder.name;
        const apiUrl = (0, _guards.isNonEmptyString)(messageFolder.syncCursor) ? messageFolder.syncCursor : `/me/mailfolders/${folderId}/messages/delta?$select=id`;
        const response = await microsoftClient.api(apiUrl).version('beta').headers({
            Prefer: `odata.maxpagesize=${MESSAGING_MICROSOFT_USERS_MESSAGES_LIST_MAX_RESULT}, IdType="ImmutableId"`
        }).get().catch((error)=>{
            this.logger.error(`Connected account ${connectedAccount.id}: Error fetching message list: ${JSON.stringify(error)}`);
            this.microsoftMessageListFetchErrorHandler.handleError(error);
        });
        const callback = (data)=>{
            if (data['@removed']) {
                messageExternalIdsToDelete.push(data.id);
            } else {
                messageExternalIds.push(data.id);
            }
            return true;
        };
        const pageIterator = new _microsoftgraphclient.PageIterator(microsoftClient, response, callback, {
            headers: {
                Prefer: `odata.maxpagesize=${MESSAGING_MICROSOFT_USERS_MESSAGES_LIST_MAX_RESULT}, IdType="ImmutableId"`
            }
        });
        await pageIterator.iterate().catch((error)=>{
            this.microsoftMessageListFetchErrorHandler.handleError(error);
        });
        return {
            messageExternalIds,
            messageExternalIdsToDelete,
            previousSyncCursor: messageFolder.syncCursor,
            nextSyncCursor: pageIterator.getDeltaLink() || '',
            folderId: undefined
        };
    }
    constructor(microsoftOAuth2ClientProvider, microsoftMessageListFetchErrorHandler){
        this.microsoftOAuth2ClientProvider = microsoftOAuth2ClientProvider;
        this.microsoftMessageListFetchErrorHandler = microsoftMessageListFetchErrorHandler;
        this.logger = new _common.Logger(MicrosoftGetMessageListService.name);
    }
};
MicrosoftGetMessageListService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider === "undefined" ? Object : _microsoftoauth2clientprovider.MicrosoftOAuth2ClientProvider,
        typeof _microsoftmessagelistfetcherrorhandlerservice.MicrosoftMessageListFetchErrorHandler === "undefined" ? Object : _microsoftmessagelistfetcherrorhandlerservice.MicrosoftMessageListFetchErrorHandler
    ])
], MicrosoftGetMessageListService);

//# sourceMappingURL=microsoft-get-message-list.service.js.map