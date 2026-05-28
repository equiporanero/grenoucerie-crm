"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ApprovedAccessDomainResolver", {
    enumerable: true,
    get: function() {
        return ApprovedAccessDomainResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _constants = require("twenty-shared/constants");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _approvedaccessdomainexceptionfilter = require("./approved-access-domain-exception-filter");
const _approvedaccessdomaindto = require("./dtos/approved-access-domain.dto");
const _createapprovedaccessdomaininput = require("./dtos/create-approved-access.domain.input");
const _deleteapprovedaccessdomaininput = require("./dtos/delete-approved-access-domain.input");
const _validateapprovedaccessdomaininput = require("./dtos/validate-approved-access-domain.input");
const _approvedaccessdomainservice = require("./services/approved-access-domain.service");
const _preventnesttoautologgraphqlerrorsfilter = require("../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _workspaceentity = require("../workspace/workspace.entity");
const _authuserdecorator = require("../../decorators/auth/auth-user.decorator");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
const _globalworkspaceormmanager = require("../../twenty-orm/global-workspace-datasource/global-workspace-orm.manager");
const _buildsystemauthcontextutil = require("../../twenty-orm/utils/build-system-auth-context.util");
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
let ApprovedAccessDomainResolver = class ApprovedAccessDomainResolver {
    async createApprovedAccessDomain({ domain, email }, currentWorkspace, currentUser) {
        const authContext = (0, _buildsystemauthcontextutil.buildSystemAuthContext)(currentWorkspace.id);
        const workspaceMember = await this.globalWorkspaceOrmManager.executeInWorkspaceContext(async ()=>{
            const workspaceMemberRepository = await this.globalWorkspaceOrmManager.getRepository(currentWorkspace.id, 'workspaceMember', {
                shouldBypassPermissionChecks: true
            });
            return workspaceMemberRepository.findOneOrFail({
                where: {
                    userId: currentUser.id
                }
            });
        }, authContext);
        return this.approvedAccessDomainService.createApprovedAccessDomain(domain, currentWorkspace, workspaceMember, email);
    }
    async deleteApprovedAccessDomain({ id }, currentWorkspace) {
        await this.approvedAccessDomainService.deleteApprovedAccessDomain(currentWorkspace, id);
        return true;
    }
    async validateApprovedAccessDomain({ validationToken, approvedAccessDomainId }) {
        return await this.approvedAccessDomainService.validateApprovedAccessDomain({
            validationToken,
            approvedAccessDomainId
        });
    }
    async getApprovedAccessDomains(currentWorkspace) {
        return await this.approvedAccessDomainService.getApprovedAccessDomains(currentWorkspace);
    }
    constructor(globalWorkspaceOrmManager, approvedAccessDomainService){
        this.globalWorkspaceOrmManager = globalWorkspaceOrmManager;
        this.approvedAccessDomainService = approvedAccessDomainService;
    }
};
_ts_decorate([
    (0, _graphql.Mutation)(()=>_approvedaccessdomaindto.ApprovedAccessDomainDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_param(2, (0, _authuserdecorator.AuthUser)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createapprovedaccessdomaininput.CreateApprovedAccessDomainInput === "undefined" ? Object : _createapprovedaccessdomaininput.CreateApprovedAccessDomainInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity,
        typeof AuthContextUser === "undefined" ? Object : AuthContextUser
    ]),
    _ts_metadata("design:returntype", Promise)
], ApprovedAccessDomainResolver.prototype, "createApprovedAccessDomain", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _deleteapprovedaccessdomaininput.DeleteApprovedAccessDomainInput === "undefined" ? Object : _deleteapprovedaccessdomaininput.DeleteApprovedAccessDomainInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApprovedAccessDomainResolver.prototype, "deleteApprovedAccessDomain", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_approvedaccessdomaindto.ApprovedAccessDomainDTO),
    _ts_param(0, (0, _graphql.Args)('input')),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _validateapprovedaccessdomaininput.ValidateApprovedAccessDomainInput === "undefined" ? Object : _validateapprovedaccessdomaininput.ValidateApprovedAccessDomainInput
    ]),
    _ts_metadata("design:returntype", Promise)
], ApprovedAccessDomainResolver.prototype, "validateApprovedAccessDomain", null);
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _approvedaccessdomaindto.ApprovedAccessDomainDTO
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], ApprovedAccessDomainResolver.prototype, "getApprovedAccessDomains", null);
ApprovedAccessDomainResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKSPACE_MEMBERS)),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_approvedaccessdomainexceptionfilter.ApprovedAccessDomainExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    (0, _metadataresolverdecorator.MetadataResolver)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _globalworkspaceormmanager.GlobalWorkspaceOrmManager === "undefined" ? Object : _globalworkspaceormmanager.GlobalWorkspaceOrmManager,
        typeof _approvedaccessdomainservice.ApprovedAccessDomainService === "undefined" ? Object : _approvedaccessdomainservice.ApprovedAccessDomainService
    ])
], ApprovedAccessDomainResolver);

//# sourceMappingURL=approved-access-domain.resolver.js.map