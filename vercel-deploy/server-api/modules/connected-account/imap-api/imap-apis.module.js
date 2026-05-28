"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IMAPAPIsModule", {
    enumerable: true,
    get: function() {
        return IMAPAPIsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _authmodule = require("../../../engine/core-modules/auth/auth.module");
const _featureflagmodule = require("../../../engine/core-modules/feature-flag/feature-flag.module");
const _messagequeuemodule = require("../../../engine/core-modules/message-queue/message-queue.module");
const _twentyconfigmodule = require("../../../engine/core-modules/twenty-config/twenty-config.module");
const _userworkspaceentity = require("../../../engine/core-modules/user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _connectedaccounttokenencryptionmodule = require("../../../engine/metadata-modules/connected-account/services/connected-account-token-encryption.module");
const _messagechannelentity = require("../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _objectmetadataentity = require("../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _twentyormmodule = require("../../../engine/twenty-orm/twenty-orm.module");
const _workspaceeventemittermodule = require("../../../engine/workspace-event-emitter/workspace-event-emitter.module");
const _calendarcommonmodule = require("../../calendar/common/calendar-common.module");
const _connectedaccountmodule = require("../connected-account.module");
const _imapsmtpcaldavapisservice = require("../services/imap-smtp-caldav-apis.service");
const _messagingcommonmodule = require("../../messaging/common/messaging-common.module");
const _messagingfoldersyncmanagermodule = require("../../messaging/message-folder-manager/messaging-folder-sync-manager.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let IMAPAPIsModule = class IMAPAPIsModule {
};
IMAPAPIsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _objectmetadataentity.ObjectMetadataEntity,
                _calendarchannelentity.CalendarChannelEntity,
                _connectedaccountentity.ConnectedAccountEntity,
                _messagechannelentity.MessageChannelEntity,
                _userworkspaceentity.UserWorkspaceEntity
            ]),
            _messagequeuemodule.MessageQueueModule,
            _workspaceeventemittermodule.WorkspaceEventEmitterModule,
            _twentyconfigmodule.TwentyConfigModule,
            _twentyormmodule.TwentyORMModule,
            _featureflagmodule.FeatureFlagModule,
            _authmodule.AuthModule,
            _calendarcommonmodule.CalendarCommonModule,
            _connectedaccountmodule.ConnectedAccountModule,
            _connectedaccounttokenencryptionmodule.ConnectedAccountTokenEncryptionModule,
            _messagingcommonmodule.MessagingCommonModule,
            _messagingfoldersyncmanagermodule.MessagingFolderSyncManagerModule
        ],
        providers: [
            _imapsmtpcaldavapisservice.ImapSmtpCalDavAPIService
        ],
        exports: [
            _imapsmtpcaldavapisservice.ImapSmtpCalDavAPIService
        ]
    })
], IMAPAPIsModule);

//# sourceMappingURL=imap-apis.module.js.map