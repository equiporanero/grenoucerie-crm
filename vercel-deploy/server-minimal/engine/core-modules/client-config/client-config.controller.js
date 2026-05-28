"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ClientConfigController", {
    enumerable: true,
    get: function() {
        return ClientConfigController;
    }
});
const _common = require("@nestjs/common");
const _clientconfigservice = require("./services/client-config.service");
const _nopermissionguard = require("../../guards/no-permission.guard");
const _publicendpointguard = require("../../guards/public-endpoint.guard");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let ClientConfigController = class ClientConfigController {
    async getClientConfig() {
        return this.clientConfigService.getClientConfig();
    }
    constructor(clientConfigService){
        this.clientConfigService = clientConfigService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], ClientConfigController.prototype, "getClientConfig", null);
ClientConfigController = _ts_decorate([
    (0, _common.Controller)('/client-config'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _clientconfigservice.ClientConfigService === "undefined" ? Object : _clientconfigservice.ClientConfigService
    ])
], ClientConfigController);

//# sourceMappingURL=client-config.controller.js.map