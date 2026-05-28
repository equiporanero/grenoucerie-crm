"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MessagingImportManagerModule", {
    enumerable: true,
    get: function() {
        return MessagingImportManagerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _featureflagmodule = require("../../../engine/core-modules/feature-flag/feature-flag.module");
const _twentyconfigmodule = require("../../../engine/core-modules/twenty-config/twenty-config.module");
const _userworkspaceentity = require("../../../engine/core-modules/user-workspace/user-workspace.entity");
const _workspaceentity = require("../../../engine/core-modules/workspace/workspace.entity");
const _connectedaccountentity = require("../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _messagechannelentity = require("../../../engine/metadata-modules/message-channel/entities/message-channel.entity");
const _messagefolderentity = require("../../../engine/metadata-modules/message-folder/entities/message-folder.entity");
const _objectmetadataentity = require("../../../engine/metadata-modules/object-metadata/object-metadata.entity");
const _workspacedatasourcemodule = require("../../../engine/workspace-datasource/workspace-datasource.module");
const _workspaceeventemittermodule = require("../../../engine/workspace-event-emitter/workspace-event-emitter.module");
const _connectedaccountmodule = require("../../connected-account/connected-account.module");
const _emailaliasmanagermodule = require("../../connected-account/email-alias-manager/email-alias-manager.module");
const _oauth2clientmanagermodule = require("../../connected-account/oauth2-client-manager/oauth2-client-manager.module");
const _connectedaccountrefreshtokensmanagermodule = require("../../connected-account/refresh-tokens-manager/connected-account-refresh-tokens-manager.module");
const _messagingcommonmodule = require("../common/messaging-common.module");
const _messagingmessagecleanermodule = require("../message-cleaner/messaging-message-cleaner.module");
const _messagingfoldersyncmanagermodule = require("../message-folder-manager/messaging-folder-sync-manager.module");
const _messagingsinglemessageimportcommand = require("./commands/messaging-single-message-import.command");
const _messagingtriggermessagelistfetchcommand = require("./commands/messaging-trigger-message-list-fetch.command");
const _messagingmessagelistfetchcroncommand = require("./crons/commands/messaging-message-list-fetch.cron.command");
const _messagingmessagesimportcroncommand = require("./crons/commands/messaging-messages-import.cron.command");
const _messagingongoingstalecroncommand = require("./crons/commands/messaging-ongoing-stale.cron.command");
const _messagingrelaunchfailedmessagechannelscroncommand = require("./crons/commands/messaging-relaunch-failed-message-channels.cron.command");
const _messagingmessagelistfetchcronjob = require("./crons/jobs/messaging-message-list-fetch.cron.job");
const _messagingmessagesimportcronjob = require("./crons/jobs/messaging-messages-import.cron.job");
const _messagingongoingstalecronjob = require("./crons/jobs/messaging-ongoing-stale.cron.job");
const _messagingrelaunchfailedmessagechannelscronjob = require("./crons/jobs/messaging-relaunch-failed-message-channels.cron.job");
const _messaginggmaildrivermodule = require("./drivers/gmail/messaging-gmail-driver.module");
const _messagingimapdrivermodule = require("./drivers/imap/messaging-imap-driver.module");
const _messaginginboundemaildrivermodule = require("./drivers/inbound-email/messaging-inbound-email-driver.module");
const _inboundemailimportservice = require("./drivers/inbound-email/services/inbound-email-import.service");
const _messagingmicrosoftdrivermodule = require("./drivers/microsoft/messaging-microsoft-driver.module");
const _messagingsmtpdrivermodule = require("./drivers/smtp/messaging-smtp-driver.module");
const _messagingaddsinglemessagetocacheforimportjob = require("./jobs/messaging-add-single-message-to-cache-for-import.job");
const _messagingcleancache = require("./jobs/messaging-clean-cache");
const _messaginginboundemailimportjob = require("./jobs/messaging-inbound-email-import.job");
const _messagingmessagelistfetchjob = require("./jobs/messaging-message-list-fetch.job");
const _messagingmessagesimportjob = require("./jobs/messaging-messages-import.job");
const _messagingongoingstalejob = require("./jobs/messaging-ongoing-stale.job");
const _messagingrelaunchfailedmessagechanneljob = require("./jobs/messaging-relaunch-failed-message-channel.job");
const _messagingcursorservice = require("./services/messaging-cursor.service");
const _messagingdeletefoldermessagesservice = require("./services/messaging-delete-folder-messages.service");
const _messagingdeletegroupemailmessagesservice = require("./services/messaging-delete-group-email-messages.service");
const _messaginggetmessagelistservice = require("./services/messaging-get-message-list.service");
const _messaginggetmessagesservice = require("./services/messaging-get-messages.service");
const _messagingimportexceptionhandlerservice = require("./services/messaging-import-exception-handler.service");
const _messagingmessagefolderassociationservice = require("./services/messaging-message-folder-association.service");
const _messagingmessagelistfetchservice = require("./services/messaging-message-list-fetch.service");
const _messagingmessageservice = require("./services/messaging-message.service");
const _messagingmessagesimportservice = require("./services/messaging-messages-import.service");
const _messagingprocessfolderactionsservice = require("./services/messaging-process-folder-actions.service");
const _messagingprocessgroupemailactionsservice = require("./services/messaging-process-group-email-actions.service");
const _messagingsavemessagesandenqueuecontactcreationservice = require("./services/messaging-save-messages-and-enqueue-contact-creation.service");
const _messagingwebhooksmodule = require("../../../engine/core-modules/messaging-webhooks/messaging-webhooks.module");
const _messageparticipantmanagermodule = require("../message-participant-manager/message-participant-manager.module");
const _messagingmonitoringmodule = require("../monitoring/messaging-monitoring.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MessagingImportManagerModule = class MessagingImportManagerModule {
};
MessagingImportManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _connectedaccountrefreshtokensmanagermodule.RefreshTokensManagerModule,
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _oauth2clientmanagermodule.OAuth2ClientManagerModule,
            _messaginggmaildrivermodule.MessagingGmailDriverModule,
            _messagingmicrosoftdrivermodule.MessagingMicrosoftDriverModule,
            _messagingimapdrivermodule.MessagingIMAPDriverModule,
            _messagingsmtpdrivermodule.MessagingSmtpDriverModule,
            _messaginginboundemaildrivermodule.MessagingInboundEmailDriverModule,
            _messagingcommonmodule.MessagingCommonModule,
            _twentyconfigmodule.TwentyConfigModule,
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity,
                _objectmetadataentity.ObjectMetadataEntity,
                _messagechannelentity.MessageChannelEntity,
                _messagefolderentity.MessageFolderEntity,
                _userworkspaceentity.UserWorkspaceEntity,
                _connectedaccountentity.ConnectedAccountEntity
            ]),
            _emailaliasmanagermodule.EmailAliasManagerModule,
            _featureflagmodule.FeatureFlagModule,
            _messageparticipantmanagermodule.MessageParticipantManagerModule,
            _messagingfoldersyncmanagermodule.MessagingFolderSyncManagerModule,
            _messagingmonitoringmodule.MessagingMonitoringModule,
            _messagingmessagecleanermodule.MessagingMessageCleanerModule,
            _workspaceeventemittermodule.WorkspaceEventEmitterModule,
            _connectedaccountmodule.ConnectedAccountModule,
            _messagingwebhooksmodule.MessagingWebhooksModule
        ],
        providers: [
            _messagingmessagelistfetchcroncommand.MessagingMessageListFetchCronCommand,
            _messagingmessagesimportcroncommand.MessagingMessagesImportCronCommand,
            _messagingongoingstalecroncommand.MessagingOngoingStaleCronCommand,
            _messagingrelaunchfailedmessagechannelscroncommand.MessagingRelaunchFailedMessageChannelsCronCommand,
            _messagingsinglemessageimportcommand.MessagingSingleMessageImportCommand,
            _messagingtriggermessagelistfetchcommand.MessagingTriggerMessageListFetchCommand,
            _messagingmessagelistfetchjob.MessagingMessageListFetchJob,
            _messagingmessagesimportjob.MessagingMessagesImportJob,
            _messagingongoingstalejob.MessagingOngoingStaleJob,
            _messagingrelaunchfailedmessagechanneljob.MessagingRelaunchFailedMessageChannelJob,
            _messagingmessagelistfetchcronjob.MessagingMessageListFetchCronJob,
            _messagingmessagesimportcronjob.MessagingMessagesImportCronJob,
            _messagingongoingstalecronjob.MessagingOngoingStaleCronJob,
            _messagingrelaunchfailedmessagechannelscronjob.MessagingRelaunchFailedMessageChannelsCronJob,
            _messagingaddsinglemessagetocacheforimportjob.MessagingAddSingleMessageToCacheForImportJob,
            _messagingcleancache.MessagingCleanCacheJob,
            _messaginginboundemailimportjob.MessagingInboundEmailImportJob,
            _messagingmessageservice.MessagingMessageService,
            _messagingmessagefolderassociationservice.MessagingMessageFolderAssociationService,
            _messagingmessagelistfetchservice.MessagingMessageListFetchService,
            _messagingmessagesimportservice.MessagingMessagesImportService,
            _messagingsavemessagesandenqueuecontactcreationservice.MessagingSaveMessagesAndEnqueueContactCreationService,
            _messaginggetmessagelistservice.MessagingGetMessageListService,
            _messaginggetmessagesservice.MessagingGetMessagesService,
            _messagingimportexceptionhandlerservice.MessageImportExceptionHandlerService,
            _messagingcursorservice.MessagingCursorService,
            _messagingprocessfolderactionsservice.MessagingProcessFolderActionsService,
            _messagingprocessgroupemailactionsservice.MessagingProcessGroupEmailActionsService,
            _messagingdeletefoldermessagesservice.MessagingDeleteFolderMessagesService,
            _messagingdeletegroupemailmessagesservice.MessagingDeleteGroupEmailMessagesService,
            _inboundemailimportservice.InboundEmailImportService
        ],
        exports: [
            _messagingmessagelistfetchcroncommand.MessagingMessageListFetchCronCommand,
            _messagingmessagesimportcroncommand.MessagingMessagesImportCronCommand,
            _messagingongoingstalecroncommand.MessagingOngoingStaleCronCommand,
            _messagingrelaunchfailedmessagechannelscroncommand.MessagingRelaunchFailedMessageChannelsCronCommand,
            _messagingprocessgroupemailactionsservice.MessagingProcessGroupEmailActionsService,
            _inboundemailimportservice.InboundEmailImportService,
            _messagingsavemessagesandenqueuecontactcreationservice.MessagingSaveMessagesAndEnqueueContactCreationService
        ]
    })
], MessagingImportManagerModule);

//# sourceMappingURL=messaging-import-manager.module.js.map