"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PublicDomainResolver", {
    enumerable: true,
    get: function() {
        return PublicDomainResolver;
    }
});
const _common = require("@nestjs/common");
const _graphql = require("@nestjs/graphql");
const _utils = require("twenty-shared/utils");
const _constants = require("twenty-shared/constants");
const _injectworkspacescopedrepositorydecorator = require("../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
const _metadataresolverdecorator = require("../../api/graphql/graphql-config/decorators/metadata-resolver.decorator");
const _domainvalidrecords = require("../dns-manager/dtos/domain-valid-records");
const _dnsmanagerservice = require("../dns-manager/services/dns-manager.service");
const _preventnesttoautologgraphqlerrorsfilter = require("../graphql/filters/prevent-nest-to-auto-log-graphql-errors.filter");
const _resolvervalidationpipe = require("../graphql/pipes/resolver-validation.pipe");
const _createpublicdomaininput = require("./dtos/create-public-domain.input");
const _publicdomaindto = require("./dtos/public-domain.dto");
const _publicdomaininput = require("./dtos/public-domain.input");
const _updatepublicdomaininput = require("./dtos/update-public-domain.input");
const _publicdomainexceptionfilter = require("./public-domain-exception-filter");
const _publicdomainentity = require("./public-domain.entity");
const _publicdomainexception = require("./public-domain.exception");
const _publicdomainservice = require("./public-domain.service");
const _workspaceentity = require("../workspace/workspace.entity");
const _authworkspacedecorator = require("../../decorators/auth/auth-workspace.decorator");
const _settingspermissionguard = require("../../guards/settings-permission.guard");
const _workspaceauthguard = require("../../guards/workspace-auth.guard");
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
let PublicDomainResolver = class PublicDomainResolver {
    async findManyPublicDomains(currentWorkspace) {
        return this.publicDomainRepository.find(currentWorkspace.id);
    }
    async createPublicDomain({ domain, applicationId }, currentWorkspace) {
        return this.publicDomainService.createPublicDomain({
            domain,
            workspace: currentWorkspace,
            applicationId: applicationId ?? null
        });
    }
    async updatePublicDomain({ domain, applicationId }, currentWorkspace) {
        return this.publicDomainService.updatePublicDomainApplication({
            domain,
            workspace: currentWorkspace,
            applicationId: applicationId ?? null
        });
    }
    async deletePublicDomain({ domain }, currentWorkspace) {
        await this.publicDomainService.deletePublicDomain({
            domain,
            workspace: currentWorkspace
        });
        return true;
    }
    async checkPublicDomainValidRecords({ domain }, workspace) {
        const publicDomain = await this.publicDomainRepository.findOne(workspace.id, {
            where: {
                domain
            }
        });
        (0, _utils.assertIsDefinedOrThrow)(publicDomain, new _publicdomainexception.PublicDomainException(`Public domain ${domain} not found`, _publicdomainexception.PublicDomainExceptionCode.PUBLIC_DOMAIN_NOT_FOUND));
        const domainValidRecords = await this.dnsManagerService.refreshHostname(domain, {
            isPublicDomain: true
        });
        return this.publicDomainService.checkPublicDomainValidRecords(publicDomain, domainValidRecords);
    }
    constructor(publicDomainRepository, publicDomainService, dnsManagerService){
        this.publicDomainRepository = publicDomainRepository;
        this.publicDomainService = publicDomainService;
        this.dnsManagerService = dnsManagerService;
    }
};
_ts_decorate([
    (0, _graphql.Query)(()=>[
            _publicdomaindto.PublicDomainDTO
        ]),
    _ts_param(0, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PublicDomainResolver.prototype, "findManyPublicDomains", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_publicdomaindto.PublicDomainDTO),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _createpublicdomaininput.CreatePublicDomainInput === "undefined" ? Object : _createpublicdomaininput.CreatePublicDomainInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PublicDomainResolver.prototype, "createPublicDomain", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_publicdomaindto.PublicDomainDTO),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _updatepublicdomaininput.UpdatePublicDomainInput === "undefined" ? Object : _updatepublicdomaininput.UpdatePublicDomainInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PublicDomainResolver.prototype, "updatePublicDomain", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>Boolean),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _publicdomaininput.PublicDomainInput === "undefined" ? Object : _publicdomaininput.PublicDomainInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PublicDomainResolver.prototype, "deletePublicDomain", null);
_ts_decorate([
    (0, _graphql.Mutation)(()=>_domainvalidrecords.DomainValidRecords, {
        nullable: true
    }),
    _ts_param(0, (0, _graphql.Args)()),
    _ts_param(1, (0, _authworkspacedecorator.AuthWorkspace)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _publicdomaininput.PublicDomainInput === "undefined" ? Object : _publicdomaininput.PublicDomainInput,
        typeof _workspaceentity.WorkspaceEntity === "undefined" ? Object : _workspaceentity.WorkspaceEntity
    ]),
    _ts_metadata("design:returntype", Promise)
], PublicDomainResolver.prototype, "checkPublicDomainValidRecords", null);
PublicDomainResolver = _ts_decorate([
    (0, _common.UseGuards)(_workspaceauthguard.WorkspaceAuthGuard, (0, _settingspermissionguard.SettingsPermissionGuard)(_constants.PermissionFlagType.WORKSPACE_MEMBERS)),
    (0, _common.UsePipes)(_resolvervalidationpipe.ResolverValidationPipe),
    (0, _common.UseFilters)(_publicdomainexceptionfilter.PublicDomainExceptionFilter, _preventnesttoautologgraphqlerrorsfilter.PreventNestToAutoLogGraphqlErrorsFilter),
    (0, _metadataresolverdecorator.MetadataResolver)(),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_publicdomainentity.PublicDomainEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _publicdomainservice.PublicDomainService === "undefined" ? Object : _publicdomainservice.PublicDomainService,
        typeof _dnsmanagerservice.DnsManagerService === "undefined" ? Object : _dnsmanagerservice.DnsManagerService
    ])
], PublicDomainResolver);

//# sourceMappingURL=public-domain.resolver.js.map