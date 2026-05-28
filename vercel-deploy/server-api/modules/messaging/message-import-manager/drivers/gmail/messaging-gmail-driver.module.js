"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingGmailDriverModule", {
    enumerable: true,
    get: function() {
        return MessagingGmailDriverModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _featureflagentity = require("../../../../../engine/core-modules/feature-flag/feature-flag.entity");
const _featureflagmodule = require("../../../../../engine/core-modules/feature-flag/feature-flag.module");
const _twentyconfigmodule = require("../../../../../engine/core-modules/twenty-config/twenty-config.module");
const _objectmetadatarepositorymodule = require("../../../../../engine/object-metadata-repository/object-metadata-repository.module");
const _workspacedatasourcemodule = require("../../../../../engine/workspace-datasource/workspace-datasource.module");
const _blocklistworkspaceentity = require("../../../../blocklist/standard-objects/blocklist.workspace-entity");
const _emailaliasmanagermodule = require("../../../../connected-account/email-alias-manager/email-alias-manager.module");
const _oauth2clientmanagermodule = require("../../../../connected-account/oauth2-client-manager/oauth2-client-manager.module");
const _messagingcommonmodule = require("../../../common/messaging-common.module");
const _gmailgethistoryservice = require("./services/gmail-get-history.service");
const _gmailgetmessagelistservice = require("./services/gmail-get-message-list.service");
const _gmailgetmessagesservice = require("./services/gmail-get-messages.service");
const _gmailmessagelistfetcherrorhandlerservice = require("./services/gmail-message-list-fetch-error-handler.service");
const _gmailmessagesimporterrorhandlerservice = require("./services/gmail-messages-import-error-handler.service");
const _messageparticipantmanagermodule = require("../../../message-participant-manager/message-participant-manager.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessagingGmailDriverModule = class MessagingGmailDriverModule {
};
MessagingGmailDriverModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _twentyconfigmodule.TwentyConfigModule,
            _objectmetadatarepositorymodule.ObjectMetadataRepositoryModule.forFeature([
                _blocklistworkspaceentity.BlocklistWorkspaceEntity
            ]),
            _messagingcommonmodule.MessagingCommonModule,
            _typeorm.TypeOrmModule.forFeature([
                _featureflagentity.FeatureFlagEntity
            ]),
            _oauth2clientmanagermodule.OAuth2ClientManagerModule,
            _emailaliasmanagermodule.EmailAliasManagerModule,
            _featureflagmodule.FeatureFlagModule,
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _messageparticipantmanagermodule.MessageParticipantManagerModule
        ],
        providers: [
            _gmailgethistoryservice.GmailGetHistoryService,
            _gmailgetmessagesservice.GmailGetMessagesService,
            _gmailgetmessagelistservice.GmailGetMessageListService,
            _gmailmessagelistfetcherrorhandlerservice.GmailMessageListFetchErrorHandler,
            _gmailmessagesimporterrorhandlerservice.GmailMessagesImportErrorHandler
        ],
        exports: [
            _gmailgetmessagesservice.GmailGetMessagesService,
            _gmailgetmessagelistservice.GmailGetMessageListService,
            _gmailmessagelistfetcherrorhandlerservice.GmailMessageListFetchErrorHandler,
            _gmailmessagesimporterrorhandlerservice.GmailMessagesImportErrorHandler
        ]
    })
], MessagingGmailDriverModule);

//# sourceMappingURL=messaging-gmail-driver.module.js.map