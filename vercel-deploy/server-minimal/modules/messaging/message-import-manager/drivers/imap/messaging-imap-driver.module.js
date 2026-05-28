"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingIMAPDriverModule", {
    enumerable: true,
    get: function() {
        return MessagingIMAPDriverModule;
    }
});
const _axios = require("@nestjs/axios");
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _featureflagentity = require("../../../../../engine/core-modules/feature-flag/feature-flag.entity");
const _featureflagmodule = require("../../../../../engine/core-modules/feature-flag/feature-flag.module");
const _securehttpclientmodule = require("../../../../../engine/core-modules/secure-http-client/secure-http-client.module");
const _connectedaccountentity = require("../../../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionmodule = require("../../../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.module");
const _objectmetadatarepositorymodule = require("../../../../../engine/object-metadata-repository/object-metadata-repository.module");
const _workspacedatasourcemodule = require("../../../../../engine/workspace-datasource/workspace-datasource.module");
const _blocklistworkspaceentity = require("../../../../blocklist/standard-objects/blocklist.workspace-entity");
const _emailaliasmanagermodule = require("../../../../connected-account/email-alias-manager/email-alias-manager.module");
const _messagingcommonmodule = require("../../../common/messaging-common.module");
const _imapclientprovider = require("./providers/imap-client.provider");
const _imapfinddraftsfolderservice = require("./services/imap-find-drafts-folder.service");
const _imapfindsentfolderservice = require("./services/imap-find-sent-folder.service");
const _imapgetmessagelistservice = require("./services/imap-get-message-list.service");
const _imapgetmessagesservice = require("./services/imap-get-messages.service");
const _imapmessagelistfetcherrorhandlerservice = require("./services/imap-message-list-fetch-error-handler.service");
const _imapmessageparserservice = require("./services/imap-message-parser.service");
const _imapmessagetextextractorservice = require("./services/imap-message-text-extractor.service");
const _imapmessagesimporterrorhandlerservice = require("./services/imap-messages-import-error-handler.service");
const _imapsyncservice = require("./services/imap-sync.service");
const _messageparticipantmanagermodule = require("../../../message-participant-manager/message-participant-manager.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessagingIMAPDriverModule = class MessagingIMAPDriverModule {
};
MessagingIMAPDriverModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _axios.HttpModule,
            _objectmetadatarepositorymodule.ObjectMetadataRepositoryModule.forFeature([
                _blocklistworkspaceentity.BlocklistWorkspaceEntity
            ]),
            _messagingcommonmodule.MessagingCommonModule,
            _typeorm.TypeOrmModule.forFeature([
                _featureflagentity.FeatureFlagEntity,
                _connectedaccountentity.ConnectedAccountEntity
            ]),
            _emailaliasmanagermodule.EmailAliasManagerModule,
            _featureflagmodule.FeatureFlagModule,
            _securehttpclientmodule.SecureHttpClientModule,
            _connectedaccounttokenencryptionmodule.ConnectedAccountTokenEncryptionModule,
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _messageparticipantmanagermodule.MessageParticipantManagerModule
        ],
        providers: [
            _imapclientprovider.ImapClientProvider,
            _imapgetmessagesservice.ImapGetMessagesService,
            _imapgetmessagelistservice.ImapGetMessageListService,
            _imapmessagelistfetcherrorhandlerservice.ImapMessageListFetchErrorHandler,
            _imapmessagesimporterrorhandlerservice.ImapMessagesImportErrorHandler,
            _imapsyncservice.ImapSyncService,
            _imapmessageparserservice.ImapMessageParserService,
            _imapfinddraftsfolderservice.ImapFindDraftsFolderService,
            _imapfindsentfolderservice.ImapFindSentFolderService,
            _imapmessagetextextractorservice.ImapMessageTextExtractorService
        ],
        exports: [
            _imapgetmessagesservice.ImapGetMessagesService,
            _imapgetmessagelistservice.ImapGetMessageListService,
            _imapclientprovider.ImapClientProvider,
            _imapfinddraftsfolderservice.ImapFindDraftsFolderService,
            _imapfindsentfolderservice.ImapFindSentFolderService
        ]
    })
], MessagingIMAPDriverModule);

//# sourceMappingURL=messaging-imap-driver.module.js.map