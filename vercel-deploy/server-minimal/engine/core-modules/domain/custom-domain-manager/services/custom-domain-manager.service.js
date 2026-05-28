"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CustomDomainManagerService", {
    enumerable: true,
    get: function() {
        return CustomDomainManagerService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _utils = require("twenty-shared/utils");
const _typeorm1 = require("typeorm");
const _auditservice = require("../../../audit/services/audit.service");
const _customdomainactivated = require("../../../audit/utils/events/workspace-event/custom-domain/custom-domain-activated");
const _customdomaindeactivated = require("../../../audit/utils/events/workspace-event/custom-domain/custom-domain-deactivated");
const _billingentitlementkeyenum = require("../../../billing/enums/billing-entitlement-key.enum");
const _billingservice = require("../../../billing/services/billing.service");
const _dnsmanagerservice = require("../../../dns-manager/services/dns-manager.service");
const _publicdomainentity = require("../../../public-domain/public-domain.entity");
const _workspaceentity = require("../../../workspace/workspace.entity");
const _workspaceexception = require("../../../workspace/workspace.exception");
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
let CustomDomainManagerService = class CustomDomainManagerService {
    async isCustomDomainEnabled(workspaceId) {
        const isCustomDomainBillingEnabled = await this.billingService.hasEntitlement(workspaceId, _billingentitlementkeyenum.BillingEntitlementKey.CUSTOM_DOMAIN);
        if (!isCustomDomainBillingEnabled) {
            throw new _workspaceexception.WorkspaceException(`No entitlement found for this workspace`, _workspaceexception.WorkspaceExceptionCode.WORKSPACE_CUSTOM_DOMAIN_DISABLED);
        }
    }
    async setCustomDomain(workspace, customDomain) {
        await this.isCustomDomainEnabled(workspace.id);
        const existingWorkspace = await this.workspaceRepository.findOne({
            where: {
                customDomain
            }
        });
        if (existingWorkspace && existingWorkspace.id !== workspace.id) {
            throw new _workspaceexception.WorkspaceException('Domain already taken', _workspaceexception.WorkspaceExceptionCode.DOMAIN_ALREADY_TAKEN);
        }
        if (await this.publicDomainRepository.findOneBy({
            domain: customDomain
        })) {
            throw new _workspaceexception.WorkspaceException('Domain is already registered as public domain', _workspaceexception.WorkspaceExceptionCode.DOMAIN_ALREADY_TAKEN, {
                userFriendlyMessage: /*i18n*/ {
                    id: "PfJswy",
                    message: "Domain is already registered as public domain"
                }
            });
        }
        if (!(0, _utils.isDefined)(customDomain) || workspace.customDomain === customDomain) {
            return;
        }
        if ((0, _utils.isDefined)(workspace.customDomain)) {
            await this.dnsManagerService.updateHostname(workspace.customDomain, customDomain);
        } else {
            await this.dnsManagerService.registerHostname(customDomain);
        }
    }
    async checkCustomDomainValidRecords(workspace, domainValidRecord) {
        (0, _utils.assertIsDefinedOrThrow)(workspace.customDomain);
        const customDomainWithRecords = domainValidRecord ?? await this.dnsManagerService.getHostnameWithRecords(workspace.customDomain);
        (0, _utils.assertIsDefinedOrThrow)(customDomainWithRecords);
        const isCustomDomainWorking = await this.dnsManagerService.isHostnameWorking(workspace.customDomain);
        if (workspace.isCustomDomainEnabled !== isCustomDomainWorking) {
            workspace.isCustomDomainEnabled = isCustomDomainWorking;
            await this.workspaceRepository.save(workspace);
            const analytics = this.auditService.createContext({
                workspaceId: workspace.id
            });
            void analytics.insertWorkspaceEvent(workspace.isCustomDomainEnabled ? _customdomainactivated.CUSTOM_DOMAIN_ACTIVATED_EVENT : _customdomaindeactivated.CUSTOM_DOMAIN_DEACTIVATED_EVENT, {});
        }
        return customDomainWithRecords;
    }
    constructor(workspaceRepository, // Enforces global uniqueness of a custom domain across all workspaces.
    // eslint-disable-next-line twenty/prefer-workspace-scoped-repository
    publicDomainRepository, billingService, dnsManagerService, auditService){
        this.workspaceRepository = workspaceRepository;
        this.publicDomainRepository = publicDomainRepository;
        this.billingService = billingService;
        this.dnsManagerService = dnsManagerService;
        this.auditService = auditService;
    }
};
CustomDomainManagerService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_publicdomainentity.PublicDomainEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _billingservice.BillingService === "undefined" ? Object : _billingservice.BillingService,
        typeof _dnsmanagerservice.DnsManagerService === "undefined" ? Object : _dnsmanagerservice.DnsManagerService,
        typeof _auditservice.AuditService === "undefined" ? Object : _auditservice.AuditService
    ])
], CustomDomainManagerService);

//# sourceMappingURL=custom-domain-manager.service.js.map