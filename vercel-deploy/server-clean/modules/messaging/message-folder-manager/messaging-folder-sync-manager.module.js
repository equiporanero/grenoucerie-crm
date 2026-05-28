"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingFolderSyncManagerModule", {
    enumerable: true,
    get: function() {
        return MessagingFolderSyncManagerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _featureflagmodule = require("../../../engine/core-modules/feature-flag/feature-flag.module");
const _workspaceentity = require("../../../engine/core-modules/workspace/workspace.entity");
const _messagefolderentity = require("../../../engine/metadata-modules/message-folder/entities/message-folder.entity");
const _workspacedatasourcemodule = require("../../../engine/workspace-datasource/workspace-datasource.module");
const _oauth2clientmanagermodule = require("../../connected-account/oauth2-client-manager/oauth2-client-manager.module");
const _gmailfolderserrorhandlerservice = require("./drivers/gmail/services/gmail-folders-error-handler.service");
const _gmailgetallfoldersservice = require("./drivers/gmail/services/gmail-get-all-folders.service");
const _imapgetallfoldersservice = require("./drivers/imap/services/imap-get-all-folders.service");
const _microsoftgetallfoldersservice = require("./drivers/microsoft/services/microsoft-get-all-folders.service");
const _syncmessagefoldersservice = require("./services/sync-message-folders.service");
const _messaginggmaildrivermodule = require("../message-import-manager/drivers/gmail/messaging-gmail-driver.module");
const _messagingimapdrivermodule = require("../message-import-manager/drivers/imap/messaging-imap-driver.module");
const _messagingmicrosoftdrivermodule = require("../message-import-manager/drivers/microsoft/messaging-microsoft-driver.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessagingFolderSyncManagerModule = class MessagingFolderSyncManagerModule {
};
MessagingFolderSyncManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _featureflagmodule.FeatureFlagModule,
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity,
                _messagefolderentity.MessageFolderEntity
            ]),
            _oauth2clientmanagermodule.OAuth2ClientManagerModule,
            _messaginggmaildrivermodule.MessagingGmailDriverModule,
            _messagingmicrosoftdrivermodule.MessagingMicrosoftDriverModule,
            _messagingimapdrivermodule.MessagingIMAPDriverModule
        ],
        providers: [
            _syncmessagefoldersservice.SyncMessageFoldersService,
            _gmailgetallfoldersservice.GmailGetAllFoldersService,
            _gmailfolderserrorhandlerservice.GmailFoldersErrorHandlerService,
            _imapgetallfoldersservice.ImapGetAllFoldersService,
            _microsoftgetallfoldersservice.MicrosoftGetAllFoldersService
        ],
        exports: [
            _syncmessagefoldersservice.SyncMessageFoldersService
        ]
    })
], MessagingFolderSyncManagerModule);

//# sourceMappingURL=messaging-folder-sync-manager.module.js.map