"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GuardRedirectModule", {
    enumerable: true,
    get: function() {
        return GuardRedirectModule;
    }
});
const _common = require("@nestjs/common");
const _domainserverconfigmodule = require("../domain/domain-server-config/domain-server-config.module");
const _workspacedomainsmodule = require("../domain/workspace-domains/workspace-domains.module");
const _guardredirectservice = require("./services/guard-redirect.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let GuardRedirectModule = class GuardRedirectModule {
};
GuardRedirectModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _workspacedomainsmodule.WorkspaceDomainsModule,
            _domainserverconfigmodule.DomainServerConfigModule
        ],
        providers: [
            _guardredirectservice.GuardRedirectService
        ],
        exports: [
            _guardredirectservice.GuardRedirectService
        ]
    })
], GuardRedirectModule);

//# sourceMappingURL=guard-redirect.module.js.map