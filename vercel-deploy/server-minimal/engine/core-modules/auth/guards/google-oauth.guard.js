"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleOauthGuard", {
    enumerable: true,
    get: function() {
        return GoogleOauthGuard;
    }
});
const _common = require("@nestjs/common");
const _passport = require("@nestjs/passport");
const _typeorm = require("@nestjs/typeorm");
const _typeorm1 = require("typeorm");
const _authexception = require("../auth.exception");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _guardredirectservice = require("../../guard-redirect/services/guard-redirect.service");
const _workspaceentity = require("../../workspace/workspace.entity");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let GoogleOauthGuard = class GoogleOauthGuard extends (0, _passport.AuthGuard)('google') {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        let workspace = null;
        try {
            if (request.query.workspaceId && typeof request.query.workspaceId === 'string') {
                request.params.workspaceId = request.query.workspaceId;
                workspace = await this.workspaceRepository.findOneBy({
                    id: request.query.workspaceId
                });
            }
            if (request.query.error === 'access_denied') {
                throw new _authexception.AuthException('Google OAuth access denied', _authexception.AuthExceptionCode.OAUTH_ACCESS_DENIED);
            }
            return await super.canActivate(context);
        } catch (err) {
            this.guardRedirectService.dispatchErrorFromGuard(context, err, this.workspaceDomainsService.getSubdomainAndCustomDomainFromWorkspaceFallbackOnDefaultSubdomain(workspace));
            return false;
        }
    }
    constructor(guardRedirectService, workspaceRepository, workspaceDomainsService){
        super({
            prompt: 'select_account'
        }), this.guardRedirectService = guardRedirectService, this.workspaceRepository = workspaceRepository, this.workspaceDomainsService = workspaceDomainsService;
    }
};
GoogleOauthGuard = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(1, (0, _typeorm.InjectRepository)(_workspaceentity.WorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _guardredirectservice.GuardRedirectService === "undefined" ? Object : _guardredirectservice.GuardRedirectService,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService
    ])
], GoogleOauthGuard);

//# sourceMappingURL=google-oauth.guard.js.map