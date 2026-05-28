"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PublicDomainService", {
    enumerable: true,
    get: function() {
        return PublicDomainService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _applicationentity = require("../application/application.entity");
const _dnsmanagerservice = require("../dns-manager/services/dns-manager.service");
const _publicdomainentity = require("./public-domain.entity");
const _publicdomainexception = require("./public-domain.exception");
const _workspaceentity = require("../workspace/workspace.entity");
const _injectworkspacescopedrepositorydecorator = require("../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
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
let PublicDomainService = class PublicDomainService {
    async deletePublicDomain({ domain, workspace }) {
        const formattedDomain = domain.trim().toLowerCase();
        await this.dnsManagerService.deleteHostnameSilently(formattedDomain, {
            isPublicDomain: true
        });
        await this.publicDomainRepository.delete(workspace.id, {
            domain: formattedDomain
        });
    }
    async createPublicDomain({ domain, workspace, applicationId }) {
        const formattedDomain = domain.trim().toLowerCase();
        const [workspaceWithCustomDomain, existingPublicDomain, application] = await Promise.all([
            this.workspaceRepository.findOneBy({
                customDomain: formattedDomain
            }),
            this.publicDomainRepository.findOne(workspace.id, {
                where: {
                    domain: formattedDomain
                }
            }),
            (0, _utils.isDefined)(applicationId) ? this.applicationRepository.findOneBy({
                id: applicationId,
                workspaceId: workspace.id
            }) : Promise.resolve(null)
        ]);
        if ((0, _utils.isDefined)(workspaceWithCustomDomain)) {
            throw new _publicdomainexception.PublicDomainException('Domain already used for workspace custom domain', _publicdomainexception.PublicDomainExceptionCode.DOMAIN_ALREADY_REGISTERED_AS_CUSTOM_DOMAIN, {
                userFriendlyMessage: /*i18n*/ {
                    id: "IymH4t",
                    message: "Domain already used for workspace custom domain"
                }
            });
        }
        if ((0, _utils.isDefined)(existingPublicDomain)) {
            throw new _publicdomainexception.PublicDomainException('Public domain already registered', _publicdomainexception.PublicDomainExceptionCode.PUBLIC_DOMAIN_ALREADY_REGISTERED, {
                userFriendlyMessage: /*i18n*/ {
                    id: "OL88cI",
                    message: "Public domain already registered"
                }
            });
        }
        if ((0, _utils.isDefined)(applicationId) && !(0, _utils.isDefined)(application)) {
            throw new _publicdomainexception.PublicDomainException('Application not found in this workspace', _publicdomainexception.PublicDomainExceptionCode.APPLICATION_NOT_FOUND);
        }
        const publicDomain = {
            domain: formattedDomain,
            workspaceId: workspace.id,
            applicationId
        };
        await this.dnsManagerService.registerHostname(formattedDomain, {
            isPublicDomain: true
        });
        try {
            await this.publicDomainRepository.insert(workspace.id, publicDomain);
        } catch (error) {
            await this.dnsManagerService.deleteHostnameSilently(formattedDomain, {
                isPublicDomain: true
            });
            throw error;
        }
        return publicDomain;
    }
    async updatePublicDomainApplication({ domain, workspace, applicationId }) {
        const formattedDomain = domain.trim().toLowerCase();
        const [publicDomain, application] = await Promise.all([
            this.publicDomainRepository.findOne(workspace.id, {
                where: {
                    domain: formattedDomain
                }
            }),
            (0, _utils.isDefined)(applicationId) ? this.applicationRepository.findOneBy({
                id: applicationId,
                workspaceId: workspace.id
            }) : Promise.resolve(null)
        ]);
        if (!(0, _utils.isDefined)(publicDomain)) {
            throw new _publicdomainexception.PublicDomainException(`Public domain ${domain} not found`, _publicdomainexception.PublicDomainExceptionCode.PUBLIC_DOMAIN_NOT_FOUND);
        }
        if ((0, _utils.isDefined)(applicationId) && !(0, _utils.isDefined)(application)) {
            throw new _publicdomainexception.PublicDomainException('Application not found in this workspace', _publicdomainexception.PublicDomainExceptionCode.APPLICATION_NOT_FOUND);
        }
        publicDomain.applicationId = applicationId;
        return this.publicDomainRepository.save(workspace.id, publicDomain);
    }
    async checkPublicDomainValidRecords(publicDomain, domainValidRecords) {
        const publicDomainWithRecords = domainValidRecords ?? await this.dnsManagerService.getHostnameWithRecords(publicDomain.domain, {
            isPublicDomain: true
        });
        if (!publicDomainWithRecords) return;
        const isCustomDomainWorking = await this.dnsManagerService.isHostnameWorking(publicDomain.domain, {
            isPublicDomain: true
        });
        if (publicDomain.isValidated !== isCustomDomainWorking) {
            publicDomain.isValidated = isCustomDomainWorking;
            await this.publicDomainRepository.save(publicDomain.workspaceId, publicDomain);
        }
        return publicDomainWithRecords;
    }
    async findByDomain(domain) {
        return this.publicDomainRepositoryUnscoped.findOne({
            where: {
                domain
            }
        });
    }
    constructor(dnsManagerService, publicDomainRepository, // Hostname-to-workspace resolution at request-routing time, before workspace context exists.
    // eslint-disable-next-line twenty/prefer-workspace-scoped-repository
    publicDomainRepositoryUnscoped, workspaceRepository, applicationRepository){
        this.dnsManagerService = dnsManagerService;
        this.publicDomainRepository = publicDomainRepository;
        this.publicDomainRepositoryUnscoped = publicDomainRepositoryUnscoped;
        this.workspaceRepository = workspaceRepository;
        this.applicationRepository = applicationRepository;
    }
};
PublicDomainService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_publicdomainentity.PublicDomainEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_publicdomainentity.PublicDomainEntity)),
    _ts_param(3, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(4, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _dnsmanagerservice.DnsManagerService === "undefined" ? Object : _dnsmanagerservice.DnsManagerService,
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository
    ])
], PublicDomainService);

//# sourceMappingURL=public-domain.service.js.map