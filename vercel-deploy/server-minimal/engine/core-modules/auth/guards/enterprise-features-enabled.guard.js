/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "EnterpriseFeaturesEnabledGuard", {
    enumerable: true,
    get: function() {
        return EnterpriseFeaturesEnabledGuard;
    }
});
const _common = require("@nestjs/common");
const _authexception = require("../auth.exception");
const _enterpriseplanservice = require("../../enterprise/services/enterprise-plan.service");
const _guardredirectservice = require("../../guard-redirect/services/guard-redirect.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let EnterpriseFeaturesEnabledGuard = class EnterpriseFeaturesEnabledGuard {
    canActivate(context) {
        try {
            if (!this.enterprisePlanService.isValid()) {
                throw new _authexception.AuthException('Enterprise features are not enabled', _authexception.AuthExceptionCode.ENTERPRISE_VALIDITY_TOKEN_NOT_VALID);
            }
            return true;
        } catch (err) {
            this.guardRedirectService.dispatchErrorFromGuard(context, err, this.guardRedirectService.getSubdomainAndCustomDomainFromContext(context));
            return false;
        }
    }
    constructor(guardRedirectService, enterprisePlanService){
        this.guardRedirectService = guardRedirectService;
        this.enterprisePlanService = enterprisePlanService;
    }
};
EnterpriseFeaturesEnabledGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _guardredirectservice.GuardRedirectService === "undefined" ? Object : _guardredirectservice.GuardRedirectService,
        typeof _enterpriseplanservice.EnterprisePlanService === "undefined" ? Object : _enterpriseplanservice.EnterprisePlanService
    ])
], EnterpriseFeaturesEnabledGuard);

//# sourceMappingURL=enterprise-features-enabled.guard.js.map