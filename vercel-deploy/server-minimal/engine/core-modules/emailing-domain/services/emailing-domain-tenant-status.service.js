"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EmailingDomainTenantStatusService", {
    enumerable: true,
    get: function() {
        return EmailingDomainTenantStatusService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("typeorm");
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
let EmailingDomainTenantStatusService = class EmailingDomainTenantStatusService {
    async setTenantStatusForWorkspace(workspaceId, tenantStatus) {
        const { affected } = await this.emailingDomainRepository.update(workspaceId, {
            tenantStatus: (0, _typeorm.Not)(_emailingdomaintenantstatustype.EmailingDomainTenantStatus.PERMANENTLY_SUSPENDED)
        }, {
            tenantStatus
        });
        this.logger.log(`Workspace ${workspaceId}: ${affected ?? 0} domain(s) -> ${tenantStatus}`);
    }
    constructor(emailingDomainRepository){
        this.emailingDomainRepository = emailingDomainRepository;
        this.logger = new _common.Logger(EmailingDomainTenantStatusService.name);
    }
};
EmailingDomainTenantStatusService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _injectworkspacescopedrepositorydecorator.InjectWorkspaceScopedRepository)(_emailingdomainentity.EmailingDomainEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _workspacescopedrepository.WorkspaceScopedRepository === "undefined" ? Object : _workspacescopedrepository.WorkspaceScopedRepository
    ])
], EmailingDomainTenantStatusService);

//# sourceMappingURL=emailing-domain-tenant-status.service.js.map