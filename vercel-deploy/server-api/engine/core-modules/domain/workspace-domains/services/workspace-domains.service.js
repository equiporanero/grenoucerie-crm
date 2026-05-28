"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceDomainsService", {
    enumerable: true,
    get: function() {
        return WorkspaceDomainsService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _domainserverconfigservice = require("../../domain-server-config/services/domain-server-config.service");
const _buildurlwithpathnameandsearchparamsutil = require("../../domain-server-config/utils/build-url-with-pathname-and-search-params.util");
const _publicdomainentity = require("../../../public-domain/public-domain.entity");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _workspaceentity = require("../../../workspace/workspace.entity");
const _workspaceexception = require("../../../workspace/workspace.exception");
const _seederworkspacesconstant = require("../../../../workspace-manager/dev-seeder/core/constants/seeder-workspaces.constant");
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
let WorkspaceDomainsService = class WorkspaceDomainsService {
    buildWorkspaceURL({ workspace, pathname, searchParams }) {
        const workspaceUrls = this.getWorkspaceUrls(workspace);
        const url = (0, _buildurlwithpathnameandsearchparamsutil.buildUrlWithPathnameAndSearchParams)({
            baseUrl: new URL(workspaceUrls.customUrl ?? workspaceUrls.subdomainUrl),
            pathname,
            searchParams
        });
        return url;
    }
    computeWorkspaceRedirectErrorUrl(errorMessage, workspace, pathname) {
        const url = this.buildWorkspaceURL({
            workspace,
            pathname,
            searchParams: {
                errorMessage
            }
        });
        return url.toString();
    }
    async getDefaultWorkspace() {
        if (this.twentyConfigService.get('IS_MULTIWORKSPACE_ENABLED')) {
            throw new Error('Default workspace does not exist when multi-workspace is enabled');
        }
        const workspaces = await this.workspaceRepository.find({
            order: {
                createdAt: 'DESC'
            },
            relations: [
                'workspaceSSOIdentityProviders'
            ]
        });
        if (workspaces.length > 1) {
            _common.Logger.warn(`${workspaces.length} workspaces found in database. In single-workspace mode, there should be only one workspace. The Apple seed workspace will be used as fallback if present.`);
        }
        const foundWorkspace = workspaces.find((workspace)=>workspace.id === _seederworkspacesconstant.SEED_APPLE_WORKSPACE_ID) ?? workspaces[0];
        (0, _utils.assertIsDefinedOrThrow)(foundWorkspace, _workspaceexception.WorkspaceNotFoundDefaultError);
        return foundWorkspace;
    }
    async getWorkspaceByOriginOrDefaultWorkspace(origin) {
        const { workspace } = await this.resolveWorkspaceAndPublicDomain(origin);
        return workspace;
    }
    async resolveWorkspaceAndPublicDomain(origin) {
        const { subdomain, domain } = this.domainServerConfigService.getSubdomainAndDomainFromUrl(origin);
        if (!this.twentyConfigService.get('IS_MULTIWORKSPACE_ENABLED')) {
            // Single-workspace: workspace is always the default. Still resolve a
            // matching public domain so the route trigger can scope by application.
            const publicDomain = (0, _utils.isDefined)(domain) ? await this.publicDomainRepository.findOne({
                where: {
                    domain
                }
            }) : null;
            return {
                workspace: await this.getDefaultWorkspace(),
                publicDomain: publicDomain ?? null
            };
        }
        if (!domain && !subdomain) {
            return {
                workspace: undefined,
                publicDomain: null
            };
        }
        const where = (0, _utils.isDefined)(domain) ? {
            customDomain: domain
        } : {
            subdomain
        };
        const workspaceFromCustomDomainOrSubdomain = await this.workspaceRepository.findOne({
            where,
            relations: [
                'workspaceSSOIdentityProviders'
            ]
        }) ?? undefined;
        if ((0, _utils.isDefined)(workspaceFromCustomDomainOrSubdomain) || !(0, _utils.isDefined)(domain)) {
            return {
                workspace: workspaceFromCustomDomainOrSubdomain,
                publicDomain: null
            };
        }
        const publicDomain = await this.publicDomainRepository.findOne({
            where: {
                domain
            },
            relations: [
                'workspace',
                'workspace.workspaceSSOIdentityProviders'
            ]
        });
        return {
            workspace: publicDomain?.workspace ?? undefined,
            publicDomain: publicDomain ?? null
        };
    }
    getCustomWorkspaceUrl(customDomain) {
        const url = this.domainServerConfigService.getFrontUrl();
        url.hostname = customDomain;
        return url.toString();
    }
    getTwentyWorkspaceUrl(subdomain) {
        const url = this.domainServerConfigService.getFrontUrl();
        url.hostname = this.twentyConfigService.get('IS_MULTIWORKSPACE_ENABLED') ? `${subdomain}.${url.hostname}` : url.hostname;
        return url.toString();
    }
    getSubdomainAndCustomDomainFromWorkspaceFallbackOnDefaultSubdomain(workspace) {
        if (!workspace) {
            return {
                subdomain: this.twentyConfigService.get('DEFAULT_SUBDOMAIN'),
                customDomain: null,
                isCustomDomainEnabled: false
            };
        }
        if (!workspace.isCustomDomainEnabled) {
            return {
                subdomain: workspace.subdomain,
                customDomain: null,
                isCustomDomainEnabled: false
            };
        }
        return workspace;
    }
    getWorkspaceUrls({ subdomain, customDomain, isCustomDomainEnabled }) {
        return {
            customUrl: isCustomDomainEnabled && customDomain ? this.getCustomWorkspaceUrl(customDomain) : undefined,
            subdomainUrl: this.getTwentyWorkspaceUrl(subdomain)
        };
    }
    async findByCustomDomain(customDomain) {
        return this.workspaceRepository.findOne({
            where: {
                customDomain
            }
        });
    }
    constructor(domainServerConfigService, twentyConfigService, workspaceRepository, // Request routing resolves workspace via the public domain registry.
    // eslint-disable-next-line twenty/prefer-workspace-scoped-repository
    publicDomainRepository){
        this.domainServerConfigService = domainServerConfigService;
        this.twentyConfigService = twentyConfigService;
        this.workspaceRepository = workspaceRepository;
        this.publicDomainRepository = publicDomainRepository;
    }
};
WorkspaceDomainsService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(2, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_publicdomainentity.PublicDomainEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _domainserverconfigservice.DomainServerConfigService === "undefined" ? Object : _domainserverconfigservice.DomainServerConfigService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], WorkspaceDomainsService);

//# sourceMappingURL=workspace-domains.service.js.map