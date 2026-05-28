"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CloudflareModule", {
    enumerable: true,
    get: function() {
        return CloudflareModule;
    }
});
const _common = require("@nestjs/common");
const _nestjsquerytypeorm = require("@ptc-org/nestjs-query-typeorm");
const _dnscloudflarecontroller = require("./controllers/dns-cloudflare.controller");
const _dnscloudflareservice = require("./services/dns-cloudflare.service");
const _customdomainmanagermodule = require("../domain/custom-domain-manager/custom-domain-manager.module");
const _workspacedomainsmodule = require("../domain/workspace-domains/workspace-domains.module");
const _publicdomainentity = require("../public-domain/public-domain.entity");
const _publicdomainmodule = require("../public-domain/public-domain.module");
const _workspaceentity = require("../workspace/workspace.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CloudflareModule = class CloudflareModule {
};
CloudflareModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _nestjsquerytypeorm.NestjsQueryTypeOrmModule.forFeature([
                _publicdomainentity.PublicDomainEntity,
                _workspaceentity.WorkspaceEntity
            ]),
            _workspacedomainsmodule.WorkspaceDomainsModule,
            _customdomainmanagermodule.CustomDomainManagerModule,
            _publicdomainmodule.PublicDomainModule
        ],
        providers: [
            _dnscloudflareservice.DnsCloudflareService
        ],
        controllers: [
            _dnscloudflarecontroller.DnsCloudflareController
        ]
    })
], CloudflareModule);

//# sourceMappingURL=cloudflare.module.js.map