"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientConfigModule", {
    enumerable: true,
    get: function() {
        return ClientConfigModule;
    }
});
const _common = require("@nestjs/common");
const _adminpanelmodule = require("../admin-panel/admin-panel.module");
const _domainserverconfigmodule = require("../domain/domain-server-config/domain-server-config.module");
const _clientconfigcontroller = require("./client-config.controller");
const _clientconfigresolver = require("./client-config.resolver");
const _clientconfigservice = require("./services/client-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let ClientConfigModule = class ClientConfigModule {
};
ClientConfigModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _domainserverconfigmodule.DomainServerConfigModule,
            _adminpanelmodule.AdminPanelModule
        ],
        controllers: [
            _clientconfigcontroller.ClientConfigController
        ],
        providers: [
            _clientconfigresolver.ClientConfigResolver,
            _clientconfigservice.ClientConfigService
        ]
    })
], ClientConfigModule);

//# sourceMappingURL=client-config.module.js.map