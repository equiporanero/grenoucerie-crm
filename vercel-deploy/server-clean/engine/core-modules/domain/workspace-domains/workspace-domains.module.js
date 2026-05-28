"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "WorkspaceDomainsModule", {
    enumerable: true,
    get: function() {
        return WorkspaceDomainsModule;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _domainserverconfigmodule = require("../domain-server-config/domain-server-config.module");
const _workspacedomainsservice = require("./services/workspace-domains.service");
const _publicdomainentity = require("../../public-domain/public-domain.entity");
const _workspaceentity = require("../../workspace/workspace.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let WorkspaceDomainsModule = class WorkspaceDomainsModule {
};
WorkspaceDomainsModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _domainserverconfigmodule.DomainServerConfigModule,
            _typeorm.TypeOrmModule.forFeature([
                _workspaceentity.WorkspaceEntity,
                _publicdomainentity.PublicDomainEntity
            ])
        ],
        providers: [
            _workspacedomainsservice.WorkspaceDomainsService
        ],
        exports: [
            _workspacedomainsservice.WorkspaceDomainsService
        ]
    })
], WorkspaceDomainsModule);

//# sourceMappingURL=workspace-domains.module.js.map