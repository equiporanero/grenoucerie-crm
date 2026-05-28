"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CoreEngineModule", {
    enumerable: true,
    get: function() {
        return CoreEngineModule;
    }
});
const _common = require("@nestjs/common");
const _core = require("@nestjs/core");
const _eventemitter = require("@nestjs/event-emitter");
const _workspacequeryrunnermodule = require("../api/graphql/workspace-query-runner/workspace-query-runner.module");
const _actormodule = require("./actor/actor.module");
const _applicationlogsmodule = require("./application-logs/application-logs.module");
const _applicationlogsmodulefactory = require("./application-logs/application-logs.module-factory");
const _adminpanelmodule = require("./admin-panel/admin-panel.module");
const _apikeymodule = require("./api-key/api-key.module");
const _apptokenmodule = require("./app-token/app-token.module");
const _applicationdevelopmentmodule = require("./application/application-development/application-development.module");
const _applicationinstallmodule = require("./application/application-install/application-install.module");
const _marketplacemodule = require("./application/application-marketplace/marketplace.module");
const _applicationoauthmodule = require("./application/application-oauth/application-oauth.module");
const _applicationregistrationmodule = require("./application/application-registration/application-registration.module");
const _applicationupgrademodule = require("./application/application-upgrade/application-upgrade.module");
const _applicationmodule = require("./application/application.module");
const _preinstalledappsmodule = require("./application/pre-installed-apps/pre-installed-apps.module");
const _approvedaccessdomainmodule = require("./approved-access-domain/approved-access-domain.module");
const _authmodule = require("./auth/auth.module");
const _billingwebhookmodule = require("./billing-webhook/billing-webhook.module");
const _appbillingmodule = require("./billing/app-billing/app-billing.module");
const _billingmodule = require("./billing/billing.module");
const _billinggraphqlapiexceptionfilter = require("./billing/filters/billing-graphql-api-exception.filter");
const _cachestoragemodule = require("./cache-storage/cache-storage.module");
const _timelinecalendareventmodule = require("./calendar/timeline-calendar-event.module");
const _captchamodule = require("./captcha/captcha.module");
const _cloudflaremodule = require("./cloudflare/cloudflare.module");
const _codeinterpretermodule = require("./code-interpreter/code-interpreter.module");
const _dnsmanagermodule = require("./dns-manager/dns-manager.module");
const _emailmodule = require("./email/email.module");
const _emailingdomainmodule = require("./emailing-domain/emailing-domain.module");
const _environmentmodule = require("./environment/environment.module");
const _exceptionhandlermodule = require("./exception-handler/exception-handler.module");
const _exceptionhandlermodulefactory = require("./exception-handler/exception-handler.module-factory");
const _featureflagmodule = require("./feature-flag/feature-flag.module");
const _filestoragemodule = require("./file-storage/file-storage.module");
const _geomapmodule = require("./geo-map/geo-map-module");
const _healthmodule = require("./health/health.module");
const _imapsmtpcaldavconnectionmodule = require("./imap-smtp-caldav-connection/imap-smtp-caldav-connection.module");
const _impersonationmodule = require("./impersonation/impersonation.module");
const _labmodule = require("./lab/lab.module");
const _loggermodule = require("./logger/logger.module");
const _loggermodulefactory = require("./logger/logger.module-factory");
const _logicfunctionmodule = require("./logic-function/logic-function.module");
const _messagequeuemodule = require("./message-queue/message-queue.module");
const _messagequeuemodulefactory = require("./message-queue/message-queue.module-factory");
const _timelinemessagingmodule = require("./messaging/timeline-messaging.module");
const _messagingwebhooksmodule = require("./messaging-webhooks/messaging-webhooks.module");
const _metricsmodule = require("./metrics/metrics.module");
const _metricsservice = require("./metrics/metrics.service");
const _openapimodule = require("./open-api/open-api.module");
const _publicdomainmodule = require("./public-domain/public-domain.module");
const _redisclientmodule = require("./redis-client/redis-client.module");
const _redisclientservice = require("./redis-client/redis-client.service");
const _searchmodule = require("./search/search.module");
const _ssomodule = require("./sso/sso.module");
const _telemetrymodule = require("./telemetry/telemetry.module");
const _twentyconfigmodule = require("./twenty-config/twenty-config.module");
const _twentyconfigservice = require("./twenty-config/twenty-config.service");
const _usagemodule = require("./usage/usage.module");
const _usermodule = require("./user/user.module");
const _workflowapimodule = require("./workflow/workflow-api.module");
const _workspaceinvitationmodule = require("./workspace-invitation/workspace-invitation.module");
const _workspacemodule = require("./workspace/workspace.module");
const _aibillingmodule = require("../metadata-modules/ai/ai-billing/ai-billing.module");
const _aimodelsmodule = require("../metadata-modules/ai/ai-models/ai-models.module");
const _pagelayoutmodule = require("../metadata-modules/page-layout/page-layout.module");
const _rolemodule = require("../metadata-modules/role/role.module");
const _rowlevelpermissionmodule = require("../metadata-modules/row-level-permission-predicate/row-level-permission.module");
const _subscriptionsmodule = require("../subscriptions/subscriptions.module");
const _trashcleanupmodule = require("../trash-cleanup/trash-cleanup.module");
const _workspaceeventemittermodule = require("../workspace-event-emitter/workspace-event-emitter.module");
const _channelsyncmodule = require("../../modules/connected-account/channel-sync/channel-sync.module");
const _dashboardmodule = require("../../modules/dashboard/dashboard.module");
const _sendemailmodule = require("../../modules/messaging/message-outbound-manager/send-email.module");
const _auditmodule = require("./audit/audit.module");
const _clientconfigmodule = require("./client-config/client-config.module");
const _eventlogsmodule = require("./event-logs/event-logs.module");
const _filemodule = require("./file/file.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CoreEngineModule = class CoreEngineModule {
};
CoreEngineModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _environmentmodule.EnvironmentModule,
            _twentyconfigmodule.TwentyConfigModule.forRoot(),
            _healthmodule.HealthModule,
            _auditmodule.AuditModule,
            _authmodule.AuthModule,
            _billingmodule.BillingModule,
            _billingwebhookmodule.BillingWebhookModule,
            _messagingwebhooksmodule.MessagingWebhooksModule,
            _usagemodule.UsageModule,
            _clientconfigmodule.ClientConfigModule,
            _featureflagmodule.FeatureFlagModule,
            _filemodule.FileModule,
            _rowlevelpermissionmodule.RowLevelPermissionModule,
            _openapimodule.OpenApiModule,
            _applicationregistrationmodule.ApplicationRegistrationModule,
            _applicationoauthmodule.ApplicationOAuthModule,
            _applicationmodule.ApplicationModule,
            _applicationinstallmodule.ApplicationInstallModule,
            _applicationupgrademodule.ApplicationUpgradeModule,
            _applicationdevelopmentmodule.ApplicationDevelopmentModule,
            _marketplacemodule.MarketplaceModule,
            _apptokenmodule.AppTokenModule,
            _timelinemessagingmodule.TimelineMessagingModule,
            _timelinecalendareventmodule.TimelineCalendarEventModule,
            _usermodule.UserModule,
            _workspacemodule.WorkspaceModule,
            _workspaceinvitationmodule.WorkspaceInvitationModule,
            _ssomodule.WorkspaceSSOModule,
            _approvedaccessdomainmodule.ApprovedAccessDomainModule,
            _emailingdomainmodule.EmailingDomainModule,
            _publicdomainmodule.PublicDomainModule,
            _cloudflaremodule.CloudflareModule,
            _dnsmanagermodule.DnsManagerModule,
            _workflowapimodule.WorkflowApiModule,
            _workspaceeventemittermodule.WorkspaceEventEmitterModule,
            _actormodule.ActorModule,
            _telemetrymodule.TelemetryModule,
            _adminpanelmodule.AdminPanelModule,
            _labmodule.LabModule,
            _rolemodule.RoleModule,
            _redisclientmodule.RedisClientModule,
            _workspacequeryrunnermodule.WorkspaceQueryRunnerModule,
            _geomapmodule.GeoMapModule,
            _subscriptionsmodule.SubscriptionsModule,
            _imapsmtpcaldavconnectionmodule.ImapSmtpCaldavModule,
            _channelsyncmodule.ChannelSyncModule,
            _sendemailmodule.SendEmailModule,
            _filestoragemodule.FileStorageModule.forRoot(),
            _loggermodule.LoggerModule.forRootAsync({
                useFactory: _loggermodulefactory.loggerModuleFactory,
                inject: [
                    _twentyconfigservice.TwentyConfigService
                ]
            }),
            _metricsmodule.MetricsModule,
            _messagequeuemodule.MessageQueueModule.registerAsync({
                useFactory: _messagequeuemodulefactory.messageQueueModuleFactory,
                inject: [
                    _twentyconfigservice.TwentyConfigService,
                    _redisclientservice.RedisClientService,
                    _metricsservice.MetricsService
                ]
            }),
            _exceptionhandlermodule.ExceptionHandlerModule.forRootAsync({
                useFactory: _exceptionhandlermodulefactory.exceptionHandlerModuleFactory,
                inject: [
                    _twentyconfigservice.TwentyConfigService,
                    _core.HttpAdapterHost
                ]
            }),
            _applicationlogsmodule.ApplicationLogsModule.forRootAsync({
                useFactory: _applicationlogsmodulefactory.applicationLogsModuleFactory,
                inject: [
                    _twentyconfigservice.TwentyConfigService
                ]
            }),
            _emailmodule.EmailModule.forRoot(),
            _captchamodule.CaptchaModule.forRoot(),
            _eventemitter.EventEmitterModule.forRoot({
                wildcard: true
            }),
            _cachestoragemodule.CacheStorageModule,
            _aimodelsmodule.AiModelsModule,
            _aibillingmodule.AiBillingModule,
            _logicfunctionmodule.LogicFunctionModule.forRoot(),
            _codeinterpretermodule.CodeInterpreterModule.forRoot(),
            _searchmodule.SearchModule,
            _apikeymodule.ApiKeyModule,
            _pagelayoutmodule.PageLayoutModule,
            _impersonationmodule.ImpersonationModule,
            _trashcleanupmodule.TrashCleanupModule,
            _dashboardmodule.DashboardModule,
            _eventlogsmodule.EventLogsModule,
            _preinstalledappsmodule.PreInstalledAppsModule,
            _appbillingmodule.AppBillingModule
        ],
        providers: [
            {
                provide: _core.APP_FILTER,
                useClass: _billinggraphqlapiexceptionfilter.BillingGraphqlApiExceptionFilter
            }
        ],
        exports: [
            _auditmodule.AuditModule,
            _authmodule.AuthModule,
            _featureflagmodule.FeatureFlagModule,
            _timelinemessagingmodule.TimelineMessagingModule,
            _timelinecalendareventmodule.TimelineCalendarEventModule,
            _usermodule.UserModule,
            _workspacemodule.WorkspaceModule,
            _workspaceinvitationmodule.WorkspaceInvitationModule,
            _ssomodule.WorkspaceSSOModule,
            _imapsmtpcaldavconnectionmodule.ImapSmtpCaldavModule
        ]
    })
], CoreEngineModule);

//# sourceMappingURL=core-engine.module.js.map