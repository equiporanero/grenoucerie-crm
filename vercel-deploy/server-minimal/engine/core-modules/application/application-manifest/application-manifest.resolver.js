"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationManifestResolver", {
    enumerable: true,
    get: function() {
        return ApplicationManifestResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _applicationexceptionfilter = require("../application-exception-filter");
const _applicationsyncservice = require("./application-sync.service");
const _runworkspacemigrationinput = require("./dtos/run-workspace-migration.input");
const _uninstallapplicationinput = require("./dtos/uninstall-application.input");
const _applicationservice = require("../application.service");
const _authgraphqlapiexceptionfilter = require("../../auth/filters/auth-graphql-api-exception.filter");
const _resolvervalidationpipe = require("../../graphql/pipes/resolver-validation.pipe");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
const _workspacemigrationgraphqlapiexceptioninterceptor = require("../../../workspace-manager/workspace-migration/interceptors/workspace-migration-graphql-api-exception.interceptor");
const _workspacemigrationrunnerservice = require("../../../workspace-manager/workspace-migration/workspace-migration-runner/services/workspace-migration-runner.service");
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
let ApplicationManifestResolver = class ApplicationManifestResolver {
    async runWorkspaceMigration({ workspaceMigration: { actions } }, { id: workspaceId }) {
        const { workspaceCustomFlatApplication } = await this.applicationService.findWorkspaceTwentyStandardAndCustomApplicationOrThrow({
            workspaceId
        });
        await this.workspaceMigrationRunnerService.run({
            workspaceMigration: {
                actions: actions,
                applicationUniversalIdentifier: workspaceCustomFlatApplication.universalIdentifier
            },
            workspaceId
        });
        return true;
    }
    async uninstallApplication({ universalIdentifier }, { id: workspaceId }) {
        await this.applicationSyncService.uninstallApplication({
            applicationUniversalIdentifier: universalIdentifier,
            workspaceId
        });
        return true;
    }
    constructor(applicationService, applicationSyncService, workspaceMigrationRunnerService){
        this.applicationService = applicationService;
        this.applicationSyncService = applicationSyncService;
        this.workspaceMigrationRunnerService = workspaceMigrationRunnerService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.APPLICATIONS)),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _runworkspacemigrationinput.RunWorkspaceMigrationInput === "undefined" ? Object : _runworkspacemigrationinput.RunWorkspaceMigrationInput,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationManifestResolver.prototype, "runWorkspaceMigration", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.APPLICATIONS)),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _uninstallapplicationinput.UninstallApplicationInput === "undefined" ? Object : _uninstallapplicationinput.UninstallApplicationInput,
        typeof WorkspaceEntity === "undefined" ? Object : WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationManifestResolver.prototype, "uninstallApplication", null);
ApplicationManifestResolver = _ts_decorate([
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseInterceptors)(_workspacemigrationgraphqlapiexceptioninterceptor.WorkspaceMigrationGraphqlApiExceptionInterceptor),
    (0, _common.UseFilters)(_applicationexceptionfilter.ApplicationExceptionFilter, _authgraphqlapiexceptionfilter.AuthGraphqlApiExceptionFilter),
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _applicationsyncservice.ApplicationSyncService === "undefined" ? Object : _applicationsyncservice.ApplicationSyncService,
        typeof _workspacemigrationrunnerservice.WorkspaceMigrationRunnerService === "undefined" ? Object : _workspacemigrationrunnerservice.WorkspaceMigrationRunnerService
    ])
], ApplicationManifestResolver);

//# sourceMappingURL=application-manifest.resolver.js.map