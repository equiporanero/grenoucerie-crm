"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OAuthDiscoveryController", {
    enumerable: true,
    get: function() {
        return OAuthDiscoveryController;
    }
});
const _common = require("@nestjs/common");
const _oauthscopes = require("../constants/oauth-scopes");
const _applicationregistrationservice = require("../../application-registration/application-registration.service");
const _domainserverconfigservice = require("../../../domain/domain-server-config/services/domain-server-config.service");
const _twentyconfigservice = require("../../../twenty-config/twenty-config.service");
const _nopermissionguard = require("../../../../guards/no-permission.guard");
const _publicendpointguard = require("../../../../guards/public-endpoint.guard");
const _cleanserverurl = require("../../../../../utils/clean-server-url");
const _twentycliapplicationregistrationconstant = require("../../../../workspace-manager/twenty-standard-application/constants/twenty-cli-application-registration.constant");
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
let OAuthDiscoveryController = class OAuthDiscoveryController {
    async getAuthorizationServerMetadata(request) {
        const issuer = this.getRequestBaseUrl(request);
        // /authorize is served by the frontend; SERVER_URL (API-only) has no such
        // route, so we route the client to the default frontend base URL in that
        // case. All other hosts (app.twenty.com, workspace subdomains, custom
        // domains) serve both frontend and API.
        const authorizeBase = this.isApiHost(request) ? (0, _cleanserverurl.cleanServerUrl)(this.domainServerConfigService.getBaseUrl().toString()) : issuer;
        const cliRegistration = await this.applicationRegistrationService.findOneByUniversalIdentifier(_twentycliapplicationregistrationconstant.TWENTY_CLI_APPLICATION_REGISTRATION.universalIdentifier);
        return {
            issuer,
            authorization_endpoint: `${authorizeBase}/authorize`,
            token_endpoint: `${issuer}/oauth/token`,
            registration_endpoint: `${issuer}/oauth/register`,
            revocation_endpoint: `${issuer}/oauth/revoke`,
            introspection_endpoint: `${issuer}/oauth/introspect`,
            scopes_supported: _oauthscopes.ALL_OAUTH_SCOPES,
            response_types_supported: [
                'code'
            ],
            response_modes_supported: [
                'query'
            ],
            grant_types_supported: [
                'authorization_code',
                'client_credentials',
                'refresh_token'
            ],
            code_challenge_methods_supported: [
                'S256'
            ],
            token_endpoint_auth_methods_supported: [
                'client_secret_post',
                'none'
            ],
            revocation_endpoint_auth_methods_supported: [
                'client_secret_post'
            ],
            introspection_endpoint_auth_methods_supported: [
                'client_secret_post'
            ],
            // RFC 9207: advertise `iss` in authorization responses to defend against
            // OAuth mix-up attacks. Required by OAuth 2.1 security BCP.
            authorization_response_iss_parameter_supported: true,
            ...cliRegistration ? {
                cli_client_id: cliRegistration.oAuthClientId
            } : {}
        };
    }
    // RFC 9728 §3.2: the `resource` value MUST equal the resource identifier
    // into which the well-known path suffix was inserted. So the root form maps
    // to the origin as-a-resource, and the /mcp-suffixed form maps to
    // <origin>/mcp. Strict clients probing the path-aware variant will reject
    // mismatching metadata.
    getProtectedResourceMetadataRoot(request) {
        const base = this.getRequestBaseUrl(request);
        return this.buildProtectedResourceMetadata(base, base);
    }
    getProtectedResourceMetadataMcp(request) {
        const base = this.getRequestBaseUrl(request);
        return this.buildProtectedResourceMetadata(base, `${base}/mcp`);
    }
    buildProtectedResourceMetadata(base, resource) {
        return {
            resource,
            authorization_servers: [
                base
            ],
            scopes_supported: _oauthscopes.ALL_OAUTH_SCOPES,
            bearer_methods_supported: [
                'header'
            ]
        };
    }
    getRequestBaseUrl(request) {
        return `${request.protocol}://${request.get('host')}`;
    }
    isApiHost(request) {
        const serverUrl = this.twentyConfigService.get('SERVER_URL');
        return request.get('host') === new URL(serverUrl).host;
    }
    constructor(twentyConfigService, domainServerConfigService, applicationRegistrationService){
        this.twentyConfigService = twentyConfigService;
        this.domainServerConfigService = domainServerConfigService;
        this.applicationRegistrationService = applicationRegistrationService;
    }
};
_ts_decorate([
    (0, _common.Get)('oauth-authorization-server'),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Request === "undefined" ? Object : Request
    ]),
    _ts_metadata("design:returntype", Promise)
], OAuthDiscoveryController.prototype, "getAuthorizationServerMetadata", null);
_ts_decorate([
    (0, _common.Get)('oauth-protected-resource'),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Request === "undefined" ? Object : Request
    ]),
    _ts_metadata("design:returntype", void 0)
], OAuthDiscoveryController.prototype, "getProtectedResourceMetadataRoot", null);
_ts_decorate([
    (0, _common.Get)('oauth-protected-resource/mcp'),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Req)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof Request === "undefined" ? Object : Request
    ]),
    _ts_metadata("design:returntype", void 0)
], OAuthDiscoveryController.prototype, "getProtectedResourceMetadataMcp", null);
OAuthDiscoveryController = _ts_decorate([
    (0, _common.Controller)('.well-known'),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _domainserverconfigservice.DomainServerConfigService === "undefined" ? Object : _domainserverconfigservice.DomainServerConfigService,
        typeof _applicationregistrationservice.ApplicationRegistrationService === "undefined" ? Object : _applicationregistrationservice.ApplicationRegistrationService
    ])
], OAuthDiscoveryController);

//# sourceMappingURL=oauth-discovery.controller.js.map