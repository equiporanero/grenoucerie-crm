/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OIDCAuthGuard", {
    enumerable: true,
    get: function() {
        return OIDCAuthGuard;
    }
});
const _common = require("@nestjs/common");
const _passport = require("@nestjs/passport");
const _openidclient = require("openid-client");
const _authexception = require("../auth.exception");
const _oidcauthstrategy = require("../strategies/oidc.auth.strategy");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _guardredirectservice = require("../../guard-redirect/services/guard-redirect.service");
const _ssoservice = require("../../sso/services/sso.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let OIDCAuthGuard = class OIDCAuthGuard extends (0, _passport.AuthGuard)('openidconnect') {
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    getStateByRequest(request) {
        if (request.params.identityProviderId) {
            return {
                identityProviderId: request.params.identityProviderId
            };
        }
        if (request.query.state && typeof request.query.state === 'string' && request.query.state.startsWith('{') && request.query.state.endsWith('}')) {
            const state = JSON.parse(request.query.state);
            return {
                identityProviderId: state.identityProviderId
            };
        }
        throw new Error('Invalid OIDC identity provider params');
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        let identityProvider = null;
        try {
            const state = this.getStateByRequest(request);
            if (!state.identityProviderId) {
                throw new _authexception.AuthException('identityProviderId missing', _authexception.AuthExceptionCode.INVALID_DATA);
            }
            identityProvider = await this.ssoService.findSSOIdentityProviderById(state.identityProviderId);
            if (!identityProvider) {
                throw new _authexception.AuthException('Identity provider not found', _authexception.AuthExceptionCode.INVALID_DATA);
            }
            const issuer = await _openidclient.Issuer.discover(identityProvider.issuer);
            new _oidcauthstrategy.OIDCAuthStrategy(this.ssoService.getOIDCClient(identityProvider, issuer), identityProvider.id);
            return await super.canActivate(context);
        } catch (err) {
            this.guardRedirectService.dispatchErrorFromGuard(context, err, this.workspaceDomainsService.getSubdomainAndCustomDomainFromWorkspaceFallbackOnDefaultSubdomain(identityProvider?.workspace));
            return false;
        }
    }
    constructor(ssoService, guardRedirectService, workspaceDomainsService){
        super(), this.ssoService = ssoService, this.guardRedirectService = guardRedirectService, this.workspaceDomainsService = workspaceDomainsService;
    }
};
OIDCAuthGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _ssoservice.SSOService === "undefined" ? Object : _ssoservice.SSOService,
        typeof _guardredirectservice.GuardRedirectService === "undefined" ? Object : _guardredirectservice.GuardRedirectService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService
    ])
], OIDCAuthGuard);

//# sourceMappingURL=oidc-auth.guard.js.map