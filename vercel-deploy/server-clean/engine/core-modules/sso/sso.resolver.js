/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SSOResolver", {
    enumerable: true,
    get: function() {
        return SSOResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _enterprisefeaturesenabledguard = require("../auth/guards/enterprise-features-enabled.guard");
const _preventnesttoautologgraphqlerrorsfilter = require("../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _deletessoinput = require("./dtos/delete-sso.input");
const _deletessodto = require("./dtos/delete-sso.dto");
const _editssoinput = require("./dtos/edit-sso.input");
const _editssodto = require("./dtos/edit-sso.dto");
const _findavailableSSOIDPdto = require("./dtos/find-available-SSO-IDP.dto");
const _setupssoinput = require("./dtos/setup-sso.input");
const _setupssodto = require("./dtos/setup-sso.dto");
const _ssoservice = require("./services/sso.service");
const _workspaceentity = require("../workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _permissionsgraphqlapiexceptionfilter = require("../../metadata-modules/permissions/utils/permissions-graphql-api-exception.filter");
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
let SSOResolver = class SSOResolver {
    async createOIDCIdentityProvider(setupSsoInput, { id: workspaceId }) {
        return this.ssoService.createOIDCIdentityProvider(setupSsoInput, workspaceId);
    }
    async getSSOIdentityProviders({ id: workspaceId }) {
        return this.ssoService.getSSOIdentityProviders(workspaceId);
    }
    async createSAMLIdentityProvider(setupSsoInput, { id: workspaceId }) {
        return this.ssoService.createSAMLIdentityProvider(setupSsoInput, workspaceId);
    }
    async deleteSSOIdentityProvider({ identityProviderId }, { id: workspaceId }) {
        return this.ssoService.deleteSSOIdentityProvider(identityProviderId, workspaceId);
    }
    async editSSOIdentityProvider(input, { id: workspaceId }) {
        return this.ssoService.editSSOIdentityProvider(input, workspaceId);
    }
    constructor(ssoService){
        this.ssoService = ssoService;
    }
};
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _enterprisefeaturesenabledguard.EnterpriseFeaturesEnabledGuard),
    (0, _graphql.Mutation)(()=>_setupssodto.SetupSsoDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _setupssoinput.SetupOIDCSsoInput === "undefined" ? Object : _setupssoinput.SetupOIDCSsoInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], SSOResolver.prototype, "createOIDCIdentityProvider", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _enterprisefeaturesenabledguard.EnterpriseFeaturesEnabledGuard),
    (0, _graphql.Query)(()=>[
            _findavailableSSOIDPdto.FindAvailableSSOIDPDTO
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], SSOResolver.prototype, "getSSOIdentityProviders", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _enterprisefeaturesenabledguard.EnterpriseFeaturesEnabledGuard),
    (0, _graphql.Mutation)(()=>_setupssodto.SetupSsoDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _setupssoinput.SetupSAMLSsoInput === "undefined" ? Object : _setupssoinput.SetupSAMLSsoInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], SSOResolver.prototype, "createSAMLIdentityProvider", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _enterprisefeaturesenabledguard.EnterpriseFeaturesEnabledGuard),
    (0, _graphql.Mutation)(()=>_deletessodto.DeleteSsoDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _deletessoinput.DeleteSsoInput === "undefined" ? Object : _deletessoinput.DeleteSsoInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], SSOResolver.prototype, "deleteSSOIdentityProvider", null);
_ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, _enterprisefeaturesenabledguard.EnterpriseFeaturesEnabledGuard),
    (0, _graphql.Mutation)(()=>_editssodto.EditSsoDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _editssoinput.EditSsoInput === "undefined" ? Object : _editssoinput.EditSsoInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], SSOResolver.prototype, "editSSOIdentityProvider", null);
SSOResolver = _ts_decorate([
    (0, _metadataresolverdecorator.MetadataResolver)(),
    (0, _common.UseFilters)(_permissionsgraphqlapiexceptionfilter.PermissionsGraphqlApiExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseGuards)((0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.SECURITY)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _ssoservice.SSOService === "undefined" ? Object : _ssoservice.SSOService
    ])
], SSOResolver);

//# sourceMappingURL=sso.resolver.js.map