"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceModule", {
    enumerable: true,
    get: function() {
        return WorkspaceModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _nestjsquerygraphql = require("@ptc-org/nestjs-query-graphql");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _typeormmodule = require("../../../database/typeorm/typeorm.module");
const _applicationmodule = require("../application/application.module");
const _preinstalledappsmodule = require("../application/pre-installed-apps/pre-installed-apps.module");
const _auditmodule = require("../audit/audit.module");
const _tokenmodule = require("../auth/token/token.module");
const _billingmodule = require("../billing/billing.module");
const _billingsubscriptionentity = require("../billing/entities/billing-subscription.entity");
const _dnsmanagermodule = require("../dns-manager/dns-manager.module");
const _customdomainmanagermodule = require("../domain/custom-domain-manager/custom-domain-manager.module");
const _subdomainmanagermodule = require("../domain/subdomain-manager/subdomain-manager.module");
const _workspacedomainsmodule = require("../domain/workspace-domains/workspace-domains.module");
const _enterprisemodule = require("../enterprise/enterprise.module");
const _featureflagmodule = require("../feature-flag/feature-flag.module");
const _filemodule = require("../file/file.module");
const _metricsmodule = require("../metrics/metrics.module");
const _onboardingmodule = require("../onboarding/onboarding.module");
const _publicdomainentity = require("../public-domain/public-domain.entity");
const _sdkclientmodule = require("../sdk-client/sdk-client.module");
const _userworkspaceentity = require("../user-workspace/user-workspace.entity");
const _userworkspacemodule = require("../user-workspace/user-workspace.module");
const _userentity = require("../user/user.entity");
const _checkcustomdomainvalidrecordscroncommand = require("./crons/commands/check-custom-domain-valid-records.cron.command");
const _checkcustomdomainvalidrecordscronjob = require("./crons/jobs/check-custom-domain-valid-records.cron.job");
const _upgrademodule = require("../upgrade/upgrade.module");
const _coreentitycachemodule = require("../../core-entity-cache/core-entity-cache.module");
const _workspaceentitycacheproviderservice = require("./services/workspace-entity-cache-provider.service");
const _workspaceservice = require("./services/workspace.service");
const _workspacegaugeservice = require("./workspace-gauge.service");
const _workspaceautoresolveropts = require("./workspace.auto-resolver-opts");
const _workspaceentity = require("./workspace.entity");
const _workspaceresolver = require("./workspace.resolver");
const _billingdisabledguard = require("../../guards/billing-disabled.guard");
const _aiagentmodule = require("../../metadata-modules/ai/ai-agent/ai-agent.module");
const _workspacemanyorallflatentitymapscachemodule = require("../../metadata-modules/flat-entity/services/workspace-many-or-all-flat-entity-maps-cache.module");
const _objectmetadatamodule = require("../../metadata-modules/object-metadata/object-metadata.module");
const _permissionsmodule = require("../../metadata-modules/permissions/permissions.module");
const _rolemodule = require("../../metadata-modules/role/role.module");
const _viewmodule = require("../../metadata-modules/view/view.module");
const _workspacecachestoragemodule = require("../../workspace-cache-storage/workspace-cache-storage.module");
const _workspacedatasourcemodule = require("../../workspace-datasource/workspace-datasource.module");
const _workspacemanagermodule = require("../../workspace-manager/workspace-manager.module");
const _workspacemigrationmodule = require("../../workspace-manager/workspace-migration/workspace-migration.module");
const _standardobjectsprefillmodule = require("../../workspace-manager/standard-objects-prefill-data/standard-objects-prefill.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceModule = class WorkspaceModule {
};
WorkspaceModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeormmodule.TypeORMModule,
            _typeorm.TypeOrmModule.forFeature([
                _billingsubscriptionentity.BillingSubscriptionEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _metricsmodule.MetricsModule,
            _standardobjectsprefillmodule.StandardObjectsPrefillModule,
            _nestjsquerygraphql.NestjsQueryGraphQLModule.forFeature({
                imports: [
                    _auditmodule.AuditModule,
                    _billingmodule.BillingModule,
                    _filemodule.FileModule,
                    _tokenmodule.TokenModule,
                    _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                        _userentity.UserEntity,
                        _workspaceentity.WorkspaceEntity,
                        _userworkspaceentity.UserWorkspaceEntity,
                        _publicdomainentity.PublicDomainEntity
                    ]),
                    _objectmetadatamodule.ObjectMetadataModule,
                    _userworkspacemodule.UserWorkspaceModule,
                    _workspacemanagermodule.WorkspaceManagerModule,
                    _featureflagmodule.FeatureFlagModule,
                    _onboardingmodule.OnboardingModule,
                    _workspacedatasourcemodule.WorkspaceDataSourceModule,
                    _typeormmodule.TypeORMModule,
                    _permissionsmodule.PermissionsModule,
                    _workspacecachestoragemodule.WorkspaceCacheStorageModule,
                    _rolemodule.RoleModule,
                    _aiagentmodule.AiAgentModule,
                    _dnsmanagermodule.DnsManagerModule,
                    _workspacedomainsmodule.WorkspaceDomainsModule,
                    _subdomainmanagermodule.SubdomainManagerModule,
                    _customdomainmanagermodule.CustomDomainManagerModule,
                    _viewmodule.ViewModule,
                    _workspacemanyorallflatentitymapscachemodule.WorkspaceManyOrAllFlatEntityMapsCacheModule,
                    _applicationmodule.ApplicationModule,
                    _preinstalledappsmodule.PreInstalledAppsModule,
                    _enterprisemodule.EnterpriseModule,
                    _standardobjectsprefillmodule.StandardObjectsPrefillModule,
                    _workspacemigrationmodule.WorkspaceMigrationModule,
                    _coreentitycachemodule.CoreEntityCacheModule,
                    _upgrademodule.UpgradeModule,
                    _sdkclientmodule.SdkClientModule
                ],
                services: [
                    _workspaceservice.WorkspaceService
                ],
                resolvers: _workspaceautoresolveropts.workspaceAutoResolverOpts
            })
        ],
        exports: [
            _workspaceservice.WorkspaceService,
            _checkcustomdomainvalidrecordscroncommand.CheckCustomDomainValidRecordsCronCommand
        ],
        providers: [
            _workspaceresolver.WorkspaceResolver,
            _workspaceservice.WorkspaceService,
            _workspacegaugeservice.WorkspaceGaugeService,
            _workspaceentitycacheproviderservice.WorkspaceEntityCacheProviderService,
            _billingdisabledguard.BillingDisabledGuard,
            _checkcustomdomainvalidrecordscroncommand.CheckCustomDomainValidRecordsCronCommand,
            _checkcustomdomainvalidrecordscronjob.CheckCustomDomainValidRecordsCronJob
        ]
    })
], WorkspaceModule);

//# sourceMappingURL=workspace.module.js.map