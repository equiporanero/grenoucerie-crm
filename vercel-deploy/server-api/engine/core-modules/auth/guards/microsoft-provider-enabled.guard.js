"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MicrosoftProviderEnabledGuard", {
    enumerable: true,
    get: function() {
        return MicrosoftProviderEnabledGuard;
    }
});
const _common = require("@nestjs/common");
const _authexception = require("../auth.exception");
const _microsoftauthstrategy = require("../strategies/microsoft.auth.strategy");
const _guardredirectservice = require("../../guard-redirect/services/guard-redirect.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let MicrosoftProviderEnabledGuard = class MicrosoftProviderEnabledGuard {
    canActivate(context) {
        try {
            if (!this.twentyConfigService.get('AUTH_MICROSOFT_ENABLED')) {
                throw new _authexception.AuthException('Microsoft auth is not enabled', _authexception.AuthExceptionCode.MICROSOFT_API_AUTH_DISABLED);
            }
            new _microsoftauthstrategy.MicrosoftStrategy(this.twentyConfigService);
            return true;
        } catch (err) {
            this.guardRedirectService.dispatchErrorFromGuard(context, err, this.guardRedirectService.getSubdomainAndCustomDomainFromContext(context));
            return false;
        }
    }
    constructor(twentyConfigService, guardRedirectService){
        this.twentyConfigService = twentyConfigService;
        this.guardRedirectService = guardRedirectService;
    }
};
MicrosoftProviderEnabledGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _guardredirectservice.GuardRedirectService === "undefined" ? Object : _guardredirectservice.GuardRedirectService
    ])
], MicrosoftProviderEnabledGuard);

//# sourceMappingURL=microsoft-provider-enabled.guard.js.map