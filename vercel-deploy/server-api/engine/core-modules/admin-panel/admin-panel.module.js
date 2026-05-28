"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AdminPanelModule", {
    enumerable: true,
    get: function() {
        return AdminPanelModule;
    }
});
const _common = require("@nestjs/common");
const _terminus = require("@nestjs/terminus");
const _typeorm = require("@nestjs/typeorm");
const _adminpanelapplicationregistrationresolver = require("./admin-panel-application-registration.resolver");
const _adminpanelhealthservice = require("./admin-panel-health.service");
const _adminpanelqueueservice = require("./admin-panel-queue.service");
const _adminpanelresolver = require("./admin-panel.resolver");
const _apphealth = require("./indicators/app.health");
const _connectedaccounthealth = require("./indicators/connected-account.health");
const _databasehealth = require("./indicators/database.health");
const _redishealth = require("./indicators/redis.health");
const _workerhealth = require("./indicators/worker.health");
const _maintenancemodeservice = require("./maintenance-mode.service");
const _adminpanelbillingservice = require("./services/admin-panel-billing.service");
const _adminpanelchatservice = require("./services/admin-panel-chat.service");
const _adminpanelconfigservice = require("./services/admin-panel-config.service");
const _adminpanelsigningkeyservice = require("./services/admin-panel-signing-key.service");
const _adminpanelstatisticsservice = require("./services/admin-panel-statistics.service");
const _adminpaneluserlookupservice = require("./services/admin-panel-user-lookup.service");
const _adminpanelversionservice = require("./services/admin-panel-version.service");
const _applicationregistrationmodule = require("../application/application-registration/application-registration.module");
const _auditmodule = require("../audit/audit.module");
const _authmodule = require("../auth/auth.module");
const _billingmodule = require("../billing/billing.module");
const _billingcustomerentity = require("../billing/entities/billing-customer.entity");
const _billingpriceentity = require("../billing/entities/billing-price.entity");
const _workspacedomainsmodule = require("../domain/workspace-domains/workspace-domains.module");
const _featureflagentity = require("../feature-flag/feature-flag.entity");
const _featureflagmodule = require("../feature-flag/feature-flag.module");
const _filemodule = require("../file/file.module");
const _impersonationmodule = require("../impersonation/impersonation.module");
const _jwtmodule = require("../jwt/jwt.module");
const _keyvaluepairmodule = require("../key-value-pair/key-value-pair.module");
const _metricsmodule = require("../metrics/metrics.module");
const _redisclientmodule = require("../redis-client/redis-client.module");
const _securehttpclientmodule = require("../secure-http-client/secure-http-client.module");
const _telemetrymodule = require("../telemetry/telemetry.module");
const _upgrademodule = require("../upgrade/upgrade.module");
const _usagemodule = require("../usage/usage.module");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _uservarsmodule = require("../user/user-vars/user-vars.module");
const _userentity = require("../user/user.entity");
const _usermodule = require("../user/user.module");
const _workspaceentity = require("../workspace/workspace.entity");
const _agentmessageentity = require("../../metadata-modules/ai/ai-agent-execution/entities/agent-message.entity");
const _agentchatthreadentity = require("../../metadata-modules/ai/ai-chat/entities/agent-chat-thread.entity");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _provideworkspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/provide-workspace-scoped-repository");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let AdminPanelModule = class AdminPanelModule {
};
AdminPanelModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _userentity.UserEntity,
                _workspaceentity.WorkspaceEntity,
                _userworkspaceentity.UserWorkspaceEntity,
                _featureflagentity.FeatureFlagEntity,
                _agentchatthreadentity.AgentChatThreadEntity,
                _agentmessageentity.AgentMessageEntity,
                _billingcustomerentity.BillingCustomerEntity,
                _billingpriceentity.BillingPriceEntity
            ]),
            _authmodule.AuthModule,
            _billingmodule.BillingModule,
            _filemodule.FileModule,
            _workspacedomainsmodule.WorkspaceDomainsModule,
            _redisclientmodule.RedisClientModule,
            _terminus.TerminusModule,
            _metricsmodule.MetricsModule,
            _featureflagmodule.FeatureFlagModule,
            _auditmodule.AuditModule,
            _telemetrymodule.TelemetryModule,
            _impersonationmodule.ImpersonationModule,
            _permissionsmodule.PermissionsModule,
            _securehttpclientmodule.SecureHttpClientModule,
            _applicationregistrationmodule.ApplicationRegistrationModule,
            _usagemodule.UsageModule,
            _keyvaluepairmodule.KeyValuePairModule,
            _uservarsmodule.UserVarsModule,
            _upgrademodule.UpgradeModule,
            _usermodule.UserModule,
            _jwtmodule.JwtModule
        ],
        providers: [
            _adminpanelresolver.AdminPanelResolver,
            _adminpanelapplicationregistrationresolver.AdminPanelApplicationRegistrationResolver,
            _adminpaneluserlookupservice.AdminPanelUserLookupService,
            _adminpanelstatisticsservice.AdminPanelStatisticsService,
            _adminpanelbillingservice.AdminPanelBillingService,
            _adminpanelchatservice.AdminPanelChatService,
            _adminpanelconfigservice.AdminPanelConfigService,
            _adminpanelsigningkeyservice.AdminPanelSigningKeyService,
            _adminpanelversionservice.AdminPanelVersionService,
            _adminpanelhealthservice.AdminPanelHealthService,
            _adminpanelqueueservice.AdminPanelQueueService,
            _maintenancemodeservice.MaintenanceModeService,
            _databasehealth.DatabaseHealthIndicator,
            _redishealth.RedisHealthIndicator,
            _workerhealth.WorkerHealthIndicator,
            _connectedaccounthealth.ConnectedAccountHealth,
            _apphealth.AppHealthIndicator,
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_agentmessageentity.AgentMessageEntity),
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_featureflagentity.FeatureFlagEntity),
            (0, _provideworkspacescopedrepository.provideWorkspaceScopedRepository)(_billingcustomerentity.BillingCustomerEntity)
        ],
        exports: [
            _adminpaneluserlookupservice.AdminPanelUserLookupService,
            _adminpanelstatisticsservice.AdminPanelStatisticsService,
            _adminpanelchatservice.AdminPanelChatService,
            _adminpanelconfigservice.AdminPanelConfigService,
            _adminpanelversionservice.AdminPanelVersionService,
            _maintenancemodeservice.MaintenanceModeService
        ]
    })
], AdminPanelModule);

//# sourceMappingURL=admin-panel.module.js.map