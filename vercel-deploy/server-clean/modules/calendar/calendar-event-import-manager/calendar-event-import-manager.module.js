"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CalendarEventImportManagerModule", {
    enumerable: true,
    get: function() {
        return CalendarEventImportManagerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _billingmodule = require("../../../engine/core-modules/billing/billing.module");
const _featureflagentity = require("../../../engine/core-modules/feature-flag/feature-flag.entity");
const _featureflagmodule = require("../../../engine/core-modules/feature-flag/feature-flag.module");
const _metricsmodule = require("../../../engine/core-modules/metrics/metrics.module");
const _workspaceentity = require("../../../engine/core-modules/workspace/workspace.entity");
const _userworkspaceentity = require("../../../engine/core-modules/user-workspace/user-workspace.entity");
const _calendarchannelentity = require("../../../engine/metadata-modules/calendar-channel/entities/calendar-channel.entity");
const _connectedaccountentity = require("../../../engine/metadata-modules/connected-account/entities/connected-account.entity");
const _objectmetadatarepositorymodule = require("../../../engine/object-metadata-repository/object-metadata-repository.module");
const _workspacedatasourcemodule = require("../../../engine/workspace-datasource/workspace-datasource.module");
const _blocklistworkspaceentity = require("../../blocklist/standard-objects/blocklist.workspace-entity");
const _calendareventcleanermodule = require("../calendar-event-cleaner/calendar-event-cleaner.module");
const _calendartriggereventlistfetchcommand = require("./commands/calendar-trigger-event-list-fetch.command");
const _calendareventlistfetchcroncommand = require("./crons/commands/calendar-event-list-fetch.cron.command");
const _calendarimportcroncommand = require("./crons/commands/calendar-import.cron.command");
const _calendarongoingstalecroncommand = require("./crons/commands/calendar-ongoing-stale.cron.command");
const _calendarrelaunchfailedcalendarchannelscroncommand = require("./crons/commands/calendar-relaunch-failed-calendar-channels.cron.command");
const _calendareventlistfetchcronjob = require("./crons/jobs/calendar-event-list-fetch.cron.job");
const _calendareventsimportcronjob = require("./crons/jobs/calendar-events-import.cron.job");
const _calendarongoingstalecronjob = require("./crons/jobs/calendar-ongoing-stale.cron.job");
const _calendarrelaunchfailedcalendarchannelscronjob = require("./crons/jobs/calendar-relaunch-failed-calendar-channels.cron.job");
const _caldavdrivermodule = require("./drivers/caldav/caldav-driver.module");
const _googlecalendardrivermodule = require("./drivers/google-calendar/google-calendar-driver.module");
const _microsoftcalendardrivermodule = require("./drivers/microsoft-calendar/microsoft-calendar-driver.module");
const _calendareventlistfetchjob = require("./jobs/calendar-event-list-fetch.job");
const _calendareventsimportjob = require("./jobs/calendar-events-import.job");
const _calendarongoingstalejob = require("./jobs/calendar-ongoing-stale.job");
const _calendarrelaunchfailedcalendarchanneljob = require("./jobs/calendar-relaunch-failed-calendar-channel.job");
const _calendareventimportexceptionhandlerservice = require("./services/calendar-event-import-exception-handler.service");
const _calendareventsimportservice = require("./services/calendar-events-import.service");
const _calendarfetcheventsservice = require("./services/calendar-fetch-events.service");
const _calendargeteventsservice = require("./services/calendar-get-events.service");
const _calendarsaveeventsservice = require("./services/calendar-save-events.service");
const _calendareventparticipantmanagermodule = require("../calendar-event-participant-manager/calendar-event-participant-manager.module");
const _calendarcommonmodule = require("../common/calendar-common.module");
const _calendarchannelsyncstatusservice = require("../common/services/calendar-channel-sync-status.service");
const _connectedaccountmodule = require("../../connected-account/connected-account.module");
const _emailaliasmanagermodule = require("../../connected-account/email-alias-manager/email-alias-manager.module");
const _connectedaccountrefreshtokensmanagermodule = require("../../connected-account/refresh-tokens-manager/connected-account-refresh-tokens-manager.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CalendarEventImportManagerModule = class CalendarEventImportManagerModule {
};
CalendarEventImportManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _objectmetadatarepositorymodule.ObjectMetadataRepositoryModule.forFeature([
                _blocklistworkspaceentity.BlocklistWorkspaceEntity
            ]),
            _calendareventparticipantmanagermodule.CalendarEventParticipantManagerModule,
            _typeorm.TypeOrmModule.forFeature([
                _featureflagentity.FeatureFlagEntity,
                _workspaceentity.WorkspaceEntity,
                _calendarchannelentity.CalendarChannelEntity,
                _connectedaccountentity.ConnectedAccountEntity,
                _userworkspaceentity.UserWorkspaceEntity
            ]),
            _workspacedatasourcemodule.WorkspaceDataSourceModule,
            _calendareventcleanermodule.CalendarEventCleanerModule,
            _googlecalendardrivermodule.GoogleCalendarDriverModule,
            _caldavdrivermodule.CalDavDriverModule,
            _microsoftcalendardrivermodule.MicrosoftCalendarDriverModule,
            _billingmodule.BillingModule,
            _connectedaccountrefreshtokensmanagermodule.RefreshTokensManagerModule,
            _connectedaccountmodule.ConnectedAccountModule,
            _emailaliasmanagermodule.EmailAliasManagerModule,
            _calendarcommonmodule.CalendarCommonModule,
            _metricsmodule.MetricsModule,
            _featureflagmodule.FeatureFlagModule
        ],
        providers: [
            _calendarchannelsyncstatusservice.CalendarChannelSyncStatusService,
            _calendareventsimportservice.CalendarEventsImportService,
            _calendarfetcheventsservice.CalendarFetchEventsService,
            _calendareventimportexceptionhandlerservice.CalendarEventImportErrorHandlerService,
            _calendargeteventsservice.CalendarGetCalendarEventsService,
            _calendarsaveeventsservice.CalendarSaveEventsService,
            _calendareventlistfetchcronjob.CalendarEventListFetchCronJob,
            _calendareventlistfetchcroncommand.CalendarEventListFetchCronCommand,
            _calendareventlistfetchjob.CalendarEventListFetchJob,
            _calendareventsimportcronjob.CalendarEventsImportCronJob,
            _calendarimportcroncommand.CalendarEventsImportCronCommand,
            _calendareventsimportjob.CalendarEventsImportJob,
            _calendarongoingstalecronjob.CalendarOngoingStaleCronJob,
            _calendarongoingstalecroncommand.CalendarOngoingStaleCronCommand,
            _calendartriggereventlistfetchcommand.CalendarTriggerEventListFetchCommand,
            _calendarongoingstalejob.CalendarOngoingStaleJob,
            _calendarrelaunchfailedcalendarchannelscronjob.CalendarRelaunchFailedCalendarChannelsCronJob,
            _calendarrelaunchfailedcalendarchannelscroncommand.CalendarRelaunchFailedCalendarChannelsCronCommand,
            _calendarrelaunchfailedcalendarchanneljob.CalendarRelaunchFailedCalendarChannelJob
        ],
        exports: [
            _calendareventsimportservice.CalendarEventsImportService,
            _calendarfetcheventsservice.CalendarFetchEventsService,
            _calendareventlistfetchcroncommand.CalendarEventListFetchCronCommand,
            _calendarimportcroncommand.CalendarEventsImportCronCommand,
            _calendarongoingstalecroncommand.CalendarOngoingStaleCronCommand,
            _calendarrelaunchfailedcalendarchannelscroncommand.CalendarRelaunchFailedCalendarChannelsCronCommand
        ]
    })
], CalendarEventImportManagerModule);

//# sourceMappingURL=calendar-event-import-manager.module.js.map