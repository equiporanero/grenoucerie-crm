"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DevelopmentGuard", {
    enumerable: true,
    get: function() {
        return DevelopmentGuard;
    }
});
const _common = require("@nestjs/common");
const _nodeenvironmentinterface = require("../core-modules/twenty-config/interfaces/node-environment.interface");
const _twentyconfigservice = require("../core-modules/twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DevelopmentGuard = class DevelopmentGuard {
    canActivate() {
        const nodeEnv = this.twentyConfigService.get('NODE_ENV');
        if (nodeEnv !== _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT && nodeEnv !== _nodeenvironmentinterface.NodeEnvironment.TEST) {
            throw new _common.ForbiddenException('This endpoint is only available in development or test environments');
        }
        return true;
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
    }
};
DevelopmentGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], DevelopmentGuard);

//# sourceMappingURL=development.guard.js.map