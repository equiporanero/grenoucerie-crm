"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MarketplaceResolver", {
    enumerable: true,
    get: function() {
        return MarketplaceResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _applicationregistrationexceptionfilter = require("../application-registration/application-registration-exception-filter");
const _applicationinstallservice = require("../application-install/application-install.service");
const _applicationservice = require("../application.service");
const _applicationdto = require("../dtos/application.dto");
const _marketplaceappdto = require("./dtos/marketplace-app.dto");
const _marketplaceappdetaildto = require("./dtos/marketplace-app-detail.dto");
const _marketplacequeryservice = require("./marketplace-query.service");
const _workspaceentity = require("../../workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
const _marketplacecatalogsynccronjob = require("./crons/marketplace-catalog-sync.cron.job");
const _messagequeuedecorator = require("../../message-queue/decorators/message-queue.decorator");
const _messagequeueconstants = require("../../message-queue/message-queue.constants");
const _messagequeueservice = require("../../message-queue/services/message-queue.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let MarketplaceResolver = class MarketplaceResolver {
    async findManyMarketplaceApps() {
        return this.marketplaceQueryService.findManyMarketplaceApps();
    }
    async findMarketplaceAppDetail(universalIdentifier) {
        return this.marketplaceQueryService.findMarketplaceAppDetail(universalIdentifier);
    }
    async installMarketplaceApp(universalIdentifier, version, workspace) {
        const registration = await this.marketplaceQueryService.findRegistrationByUniversalIdentifier(universalIdentifier);
        await this.applicationInstallService.installApplication({
            appRegistrationId: registration.id,
            version,
            workspaceId: workspace.id
        });
        return true;
    }
    async installApplication(universalIdentifier, version, workspace) {
        const registration = await this.marketplaceQueryService.findRegistrationByUniversalIdentifier(universalIdentifier);
        await this.applicationInstallService.installApplication({
            appRegistrationId: registration.id,
            version,
            workspaceId: workspace.id
        });
        return this.applicationService.findOneApplicationOrThrow({
            universalIdentifier,
            workspaceId: workspace.id
        });
    }
    async syncMarketplaceCatalog() {
        await this.messageQueueService.add(_marketplacecatalogsynccronjob.MarketplaceCatalogSyncCronJob.name, {}, {
            id: 'marketplace-catalog-sync'
        });
        return true;
    }
    constructor(marketplaceQueryService, applicationInstallService, applicationService, messageQueueService){
        this.marketplaceQueryService = marketplaceQueryService;
        this.applicationInstallService = applicationInstallService;
        this.applicationService = applicationService;
        this.messageQueueService = messageQueueService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _marketplaceappdto.MarketplaceAppDTO
        ]),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], MarketplaceResolver.prototype, "findManyMarketplaceApps", null);
_ts_decorate([
    (0, _graphql.Query)(()=>_marketplaceappdetaildto.MarketplaceAppDetailDTO),
    _ts_param(0, (0, _graphql.Args)('universalIdentifier')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String
    ]),
    _ts_metadata("design:returntype", Promise)
], MarketplaceResolver.prototype, "findMarketplaceAppDetail", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean, {
        deprecationReason: 'Use installApplication instead'
    }),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.MARKETPLACE_APPS)),
    _ts_param(0, (0, _graphql.Args)('universalIdentifier')),
    _ts_param(1, (0, _graphql.Args)('version', {
        type: ()=>String,
        nullable: true
    })),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], MarketplaceResolver.prototype, "installMarketplaceApp", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_applicationdto.ApplicationDTO),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.MARKETPLACE_APPS)),
    _ts_param(0, (0, _graphql.Args)('universalIdentifier')),
    _ts_param(1, (0, _graphql.Args)('version', {
        type: ()=>String,
        nullable: true
    })),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        Object,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], MarketplaceResolver.prototype, "installApplication", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.MARKETPLACE_APPS)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], MarketplaceResolver.prototype, "syncMarketplaceCatalog", null);
MarketplaceResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseFilters)(_applicationregistrationexceptionfilter.ApplicationRegistrationExceptionFilter),
    (0, _common.UseInterceptors)(_workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(3, (0, _messagequeuedecorator.InjectMessageQueue)(_messagequeueconstants.MessageQueue.cronQueue)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _marketplacequeryservice.MarketplaceQueryService === "undefined" ? Object : _marketplacequeryservice.MarketplaceQueryService,
        typeof _applicationinstallservice.ApplicationInstallService === "undefined" ? Object : _applicationinstallservice.ApplicationInstallService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _messagequeueservice.MessageQueueService === "undefined" ? Object : _messagequeueservice.MessageQueueService
    ])
], MarketplaceResolver);

//# sourceMappingURL=marketplace.resolver.js.map