"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DnsCloudflareService", {
    enumerable: true,
    get: function() {
        return DnsCloudflareService;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _customdomainmanagerservice = require("../../domain/custom-domain-manager/services/custom-domain-manager.service");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _publicdomainservice = require("../../public-domain/public-domain.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DnsCloudflareService = class DnsCloudflareService {
    async checkHostname(hostname) {
        const workspace = await this.workspaceDomainsService.findByCustomDomain(hostname);
        if ((0, _utils.isDefined)(workspace)) {
            await this.customDomainManagerService.checkCustomDomainValidRecords(workspace);
        }
        const publicDomain = await this.publicDomainService.findByDomain(hostname);
        if ((0, _utils.isDefined)(publicDomain)) {
            await this.publicDomainService.checkPublicDomainValidRecords(publicDomain);
        }
    }
    constructor(publicDomainService, customDomainManagerService, workspaceDomainsService){
        this.publicDomainService = publicDomainService;
        this.customDomainManagerService = customDomainManagerService;
        this.workspaceDomainsService = workspaceDomainsService;
    }
};
DnsCloudflareService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _publicdomainservice.PublicDomainService === "undefined" ? Object : _publicdomainservice.PublicDomainService,
        typeof _customdomainmanagerservice.CustomDomainManagerService === "undefined" ? Object : _customdomainmanagerservice.CustomDomainManagerService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService
    ])
], DnsCloudflareService);

//# sourceMappingURL=dns-cloudflare.service.js.map