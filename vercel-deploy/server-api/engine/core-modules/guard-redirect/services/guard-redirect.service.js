"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GuardRedirectService", {
    enumerable: true,
    get: function() {
        return GuardRedirectService;
    }
});
const _common = require("@nestjs/common");
const _types = require("twenty-shared/types");
const _authexception = require("../../auth/auth.exception");
const _domainserverconfigservice = require("../../domain/domain-server-config/services/domain-server-config.service");
const _workspacedomainsservice = require("../../domain/workspace-domains/services/workspace-domains.service");
const _exceptionhandlerservice = require("../../exception-handler/exception-handler.service");
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
let GuardRedirectService = class GuardRedirectService {
    dispatchErrorFromGuard(context, error, workspace, pathname = _types.AppPath.Verify) {
        if ('contextType' in context && context.contextType === 'graphql') {
            throw error;
        }
        context.switchToHttp().getResponse().redirect(this.getRedirectErrorUrlAndCaptureExceptions({
            error,
            workspace,
            pathname
        }));
    }
    getSubdomainAndCustomDomainFromContext(context) {
        const request = context.switchToHttp().getRequest();
        const subdomainAndDomainFromReferer = request.headers.referer ? this.domainsServerConfigService.getSubdomainAndDomainFromUrl(request.headers.referer) : null;
        return subdomainAndDomainFromReferer && subdomainAndDomainFromReferer.subdomain ? {
            subdomain: subdomainAndDomainFromReferer.subdomain,
            customDomain: subdomainAndDomainFromReferer.domain
        } : {
            subdomain: this.twentyConfigService.get('DEFAULT_SUBDOMAIN'),
            customDomain: null
        };
    }
    captureException(err, workspaceId) {
        if (err instanceof _authexception.AuthException && err.code !== _authexception.AuthExceptionCode.INTERNAL_SERVER_ERROR) return;
        this.exceptionHandlerService.captureExceptions([
            err
        ], {
            workspace: {
                id: workspaceId
            }
        });
    }
    getRedirectErrorUrlAndCaptureExceptions({ error, workspace, pathname }) {
        this.captureException(error, workspace.id);
        const errorMessage = error instanceof _authexception.AuthException ? error.message : `Authentication error: ${error instanceof Error ? error.message : String(error)}`;
        return this.workspaceDomainsService.computeWorkspaceRedirectErrorUrl(errorMessage, {
            subdomain: workspace.subdomain,
            customDomain: workspace.customDomain,
            isCustomDomainEnabled: workspace.isCustomDomainEnabled ?? false
        }, pathname);
    }
    constructor(twentyConfigService, exceptionHandlerService, domainsServerConfigService, workspaceDomainsService){
        this.twentyConfigService = twentyConfigService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.domainsServerConfigService = domainsServerConfigService;
        this.workspaceDomainsService = workspaceDomainsService;
    }
};
GuardRedirectService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService,
        typeof _domainserverconfigservice.DomainServerConfigService === "undefined" ? Object : _domainserverconfigservice.DomainServerConfigService,
        typeof _workspacedomainsservice.WorkspaceDomainsService === "undefined" ? Object : _workspacedomainsservice.WorkspaceDomainsService
    ])
], GuardRedirectService);

//# sourceMappingURL=guard-redirect.service.js.map