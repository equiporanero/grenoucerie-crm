"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApplicationUpgradeResolver", {
    enumerable: true,
    get: function() {
        return ApplicationUpgradeResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _metadataresolverdecorator = require("../../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _applicationexceptionfilter = require("../application-exception-filter");
const _applicationupgradeservice = require("./application-upgrade.service");
const _workspaceentity = require("../../workspace/workspace.entity");
const _authworkspacedecorator = require("../../../decorators/auth/auth-workspace.decorator");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _settingspermissionguard = require("../../../guards/settings-permission.guard");
const _userauthguard = require("../../../guards/user-auth.guard");
const _workspaceauthguard = require("../../../guards/workspace-auth.guard");
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
let ApplicationUpgradeResolver = class ApplicationUpgradeResolver {
    async upgradeApplication(appRegistrationId, targetVersion, workspace) {
        return this.applicationUpgradeService.upgradeApplication({
            appRegistrationId,
            targetVersion,
            workspaceId: workspace.id
        });
    }
    constructor(applicationUpgradeService){
        this.applicationUpgradeService = applicationUpgradeService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.MARKETPLACE_APPS)),
    _ts_param(0, (0, _graphql.Args)('appRegistrationId')),
    _ts_param(1, (0, _graphql.Args)('targetVersion')),
    _ts_param(2, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApplicationUpgradeResolver.prototype, "upgradeApplication", null);
ApplicationUpgradeResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseFilters)(_applicationexceptionfilter.ApplicationExceptionFilter),
    (0, _common.UseGuards)(_userauthguard.UserAuthGuard, _workspaceauthguard.WorkspaceAuthGuard, _nopermissionguard.NoPermissionGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _applicationupgradeservice.ApplicationUpgradeService === "undefined" ? Object : _applicationupgradeservice.ApplicationUpgradeService
    ])
], ApplicationUpgradeResolver);

//# sourceMappingURL=application-upgrade.resolver.js.map