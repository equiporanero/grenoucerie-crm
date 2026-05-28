"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailingDomainService", {
    enumerable: true,
    get: function() {
        return EmailingDomainService;
    }
});
const _common = require("@nestjs/common");
const _emailingdomaindriverexception = require("../drivers/exceptions/emailing-domain-driver.exception");
const _emailingdomaindriverfactory = require("../drivers/emailing-domain-driver.factory");
const _emailingdomainstatustype = require("../drivers/types/emailing-domain-status.type");
const _emailingdomaintenantstatustype = require("../drivers/types/emailing-domain-tenant-status.type");
const _emailingdomainentity = require("../emailing-domain.entity");
const _injectworkspacescopedrepositorydecorator = require("../../../twenty-orm/workspace-scoped-repository/inject-workspace-scoped-repository.decorator");
const _workspacescopedrepository = require("../../../twenty-orm/workspace-scoped-repository/workspace-scoped-repository");
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
let EmailingDomainService = class EmailingDomainService {
    async createEmailingDomain(domain, driverType, workspace) {
        const existingEmailingDomain = await this.emailingDomainRepository.findOne(workspace.id, {
            where: {
                domain
            }
        });
        if (existingEmailingDomain) {
            throw new _emailingdomaindriverexception.EmailingDomainDriverException('Emailing domain already exists for this workspace', _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.CONFIGURATION_ERROR);
        }
        const emailingDomainDriver = this.emailingDomainDriverFactory.getCurrentDriver();
        await emailingDomainDriver.provisionWorkspace(workspace.id);
        const verificationResult = await emailingDomainDriver.verifyDomain({
            domain,
            workspaceId: workspace.id
        });
        await emailingDomainDriver.registerDomain({
            domain,
            workspaceId: workspace.id
        });
        const isVerifiedOnCreation = verificationResult.status === _emailingdomainstatustype.EmailingDomainStatus.VERIFIED;
        return this.emailingDomainRepository.save(workspace.id, {
            domain,
            driver: driverType,
            status: verificationResult.status,
            verificationRecords: verificationResult.verificationRecords,
            verifiedAt: isVerifiedOnCreation ? new Date() : null
        });
    }
    async deleteEmailingDomain(workspace, emailingDomainId) {
        const emailingDomain = await this.findEmailingDomainByIdOrThrow(workspace.id, emailingDomainId);
        await this.deleteRemoteEmailingDomain(emailingDomain);
        await this.emailingDomainRepository.delete(workspace.id, {
            id: emailingDomain.id
        });
    }
    async cleanupAllEmailingDomainsForWorkspace(workspaceId) {
        const emailingDomains = await this.emailingDomainRepository.find(workspaceId);
        for (const emailingDomain of emailingDomains){
            await this.deleteRemoteEmailingDomain(emailingDomain);
        }
        await this.deprovisionRemoteWorkspace(workspaceId);
        await this.emailingDomainRepository.delete(workspaceId, {});
    }
    async getEmailingDomains(workspace) {
        return this.emailingDomainRepository.find(workspace.id, {
            order: {
                createdAt: 'DESC'
            }
        });
    }
    async verifyEmailingDomain(workspace, emailingDomainId) {
        const emailingDomain = await this.findEmailingDomainByIdOrThrow(workspace.id, emailingDomainId);
        const emailingDomainDriver = this.emailingDomainDriverFactory.getCurrentDriver();
        const verificationResult = await emailingDomainDriver.verifyDomain({
            domain: emailingDomain.domain,
            workspaceId: emailingDomain.workspaceId
        });
        const hasJustBecomeVerified = emailingDomain.status !== _emailingdomainstatustype.EmailingDomainStatus.VERIFIED && verificationResult.status === _emailingdomainstatustype.EmailingDomainStatus.VERIFIED;
        await this.emailingDomainRepository.update(workspace.id, {
            id: emailingDomain.id
        }, {
            status: verificationResult.status,
            verificationRecords: verificationResult.verificationRecords,
            ...hasJustBecomeVerified ? {
                verifiedAt: new Date()
            } : {}
        });
        return this.emailingDomainRepository.findOneOrFail(workspace.id, {
            where: {
                id: emailingDomain.id
            }
        });
    }
    async sendEmail(workspaceId, emailingDomainId, emailContent) {
        const emailingDomain = await this.findEmailingDomainByIdOrThrow(workspaceId, emailingDomainId);
        if (emailingDomain.status !== _emailingdomainstatustype.EmailingDomainStatus.VERIFIED) {
            throw new _emailingdomaindriverexception.EmailingDomainDriverException(`Emailing domain is not verified (status: ${emailingDomain.status})`, _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.CONFIGURATION_ERROR);
        }
        if (emailingDomain.tenantStatus !== _emailingdomaintenantstatustype.EmailingDomainTenantStatus.ACTIVE) {
            throw new _emailingdomaindriverexception.EmailingDomainDriverException(`Sending is suspended for emailing domain ${emailingDomain.domain} (tenantStatus: ${emailingDomain.tenantStatus})`, _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.SENDING_SUSPENDED);
        }
        const fromAddressDomain = emailContent.from.split('@')[1]?.toLowerCase();
        if (fromAddressDomain !== emailingDomain.domain.toLowerCase()) {
            throw new _emailingdomaindriverexception.EmailingDomainDriverException(`From address ${emailContent.from} does not match verified domain ${emailingDomain.domain}`, _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.CONFIGURATION_ERROR);
        }
        return this.emailingDomainDriverFactory.getCurrentDriver().sendEmail({
            ...emailContent,
            workspaceId,
            domain: emailingDomain.domain
        });
    }
    async findEmailingDomainByIdOrThrow(workspaceId, emailingDomainId) {
        const emailingDomain = await this.emailingDomainRepository.findOne(workspaceId, {
            where: {
                id: emailingDomainId
            }
        });
        if (!emailingDomain) {
            throw new _emailingdomaindriverexception.EmailingDomainDriverException('Emailing domain not found', _emailingdomaindriverexception.EmailingDomainDriverExceptionCode.NOT_FOUND);
        }
        return emailingDomain;
    }
    async deleteRemoteEmailingDomain(emailingDomain) {
        try {
            await this.emailingDomainDriverFactory.getCurrentDriver().cleanupDomain({
                domain: emailingDomain.domain,
                workspaceId: emailingDomain.workspaceId
            });
        } catch (error) {
            this.logger.warn(`Remote cleanup for emailing domain ${emailingDomain.domain} (workspace ${emailingDomain.workspaceId}) failed: ${error}`);
        }
    }
    async deprovisionRemoteWorkspace(workspaceId) {
        try {
            await this.emailingDomainDriverFactory.getCurrentDriver().deprovisionWorkspace(workspaceId);
        } catch (error) {
            this.logger.warn(`Remote deprovision for emailing domain workspace ${workspaceId} failed: ${error}`);
        }
    }
    constructor(emailingDomainRepository, emailingDomainDriverFactory){
        this.emailingDomainRepository = emailingDomainRepository;
        this.emailingDomainDriverFactory = emailingDomainDriverFactory;
        this.logger = new _common.Logger(EmailingDomainService.name);
    }
};
EmailingDomainService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_emailingdomainentity.EmailingDomainEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository,
        typeof _emailingdomaindriverfactory.EmailingDomainDriverFactory === "undefined" ? Object : _emailingdomaindriverfactory.EmailingDomainDriverFactory
    ])
], EmailingDomainService);

//# sourceMappingURL=emailing-domain.service.js.map