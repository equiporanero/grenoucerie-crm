"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OAuthPropagatorController", {
    enumerable: true,
    get: function() {
        return OAuthPropagatorController;
    }
});
const _common = require("@nestjs/common");
const _express = require("express");
const _utils = require("twenty-shared/utils");
const _nodeenvironmentinterface = require("../../twenty-config/interfaces/node-environment.interface");
const _authrestapiexceptionfilter = require("../filters/auth-rest-api-exception.filter");
const _domainserverconfigservice = require("../../domain/domain-server-config/services/domain-server-config.service");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _nopermissionguard = require("../../../guards/no-permission.guard");
const _publicendpointguard = require("../../../guards/public-endpoint.guard");
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
let OAuthPropagatorController = class OAuthPropagatorController {
    async propagateOAuthCallback(state, code, res) {
        if (!(0, _utils.isDefined)(state)) {
            throw new _common.BadRequestException('Missing state parameter');
        }
        if (!(0, _utils.isDefined)(code)) {
            throw new _common.BadRequestException('Missing code parameter');
        }
        const decodedRedirectUri = decodeURIComponent(state);
        let redirectUrl;
        try {
            redirectUrl = new URL(decodedRedirectUri);
        } catch  {
            throw new _common.BadRequestException('Invalid redirect URI in state');
        }
        const isValidDomain = await this.isValidDomain(redirectUrl);
        if (!isValidDomain) {
            throw new _common.ForbiddenException(`${redirectUrl.hostname} is not a valid Twenty domain`);
        }
        redirectUrl.searchParams.set('code', code);
        redirectUrl.searchParams.set('state', state);
        return res.redirect(302, redirectUrl.toString());
    }
    async isValidDomain(url) {
        if (this.twentyConfigService.get('NODE_ENV') === _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT) {
            return true;
        }
        const workspace = await this.workspaceDomainsService.getWorkspaceByOriginOrDefaultWorkspace(url.href);
        return (0, _utils.isDefined)(workspace);
    }
    constructor(domainServerConfigService, twentyConfigService, workspaceDomainsService){
        this.domainServerConfigService = domainServerConfigService;
        this.twentyConfigService = twentyConfigService;
        this.workspaceDomainsService = workspaceDomainsService;
    }
};
_ts_decorate([
    (0, _common.Get)('callback'),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Query)('state')),
    _ts_param(1, (0, _common.Query)('code')),
    _ts_param(2, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        String,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], OAuthPropagatorController.prototype, "propagateOAuthCallback", null);
OAuthPropagatorController = _ts_decorate([
    (0, _common.Controller)('auth/oauth-propagator'),
    (0, _common.UseFilters)(_authrestapiexceptionfilter.AuthRestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _domainserverconfigservice.DomainServerConfigService === "undefined" ? Object : _domainserverconfigservice.DomainServerConfigService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService
    ])
], OAuthPropagatorController);

//# sourceMappingURL=oauth-propagator.controller.js.map