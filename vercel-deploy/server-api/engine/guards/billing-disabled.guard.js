"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "BillingDisabledGuard", {
    enumerable: true,
    get: function() {
        return BillingDisabledGuard;
    }
});
const _common = require("@nestjs/common");
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
let BillingDisabledGuard = class BillingDisabledGuard {
    canActivate(_context) {
        return !this.twentyConfigService.isBillingEnabled();
    }
    constructor(twentyConfigService){
        this.twentyConfigService = twentyConfigService;
    }
};
BillingDisabledGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], BillingDisabledGuard);

//# sourceMappingURL=billing-disabled.guard.js.map