"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CustomDomainManagerModule", {
    enumerable: true,
    get: function() {
        return CustomDomainManagerModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _auditmodule = require("../../audit/audit.module");
const _billingmodule = require("../../billing/billing.module");
const _dnsmanagermodule = require("../../dns-manager/dns-manager.module");
const _customdomainmanagerservice = require("./services/custom-domain-manager.service");
const _publicdomainentity = require("../../public-domain/public-domain.entity");
const _workspaceentity = require("../../workspace/workspace.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CustomDomainManagerModule = class CustomDomainManagerModule {
};
CustomDomainManagerModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity,
                _publicdomainentity.PublicDomainEntity
            ]),
            _dnsmanagermodule.DnsManagerModule,
            _billingmodule.BillingModule,
            _auditmodule.AuditModule
        ],
        providers: [
            _customdomainmanagerservice.CustomDomainManagerService
        ],
        exports: [
            _customdomainmanagerservice.CustomDomainManagerService
        ]
    })
], CustomDomainManagerModule);

//# sourceMappingURL=custom-domain-manager.module.js.map