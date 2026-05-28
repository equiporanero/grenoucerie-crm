"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OAuthTokenController", {
    enumerable: true,
    get: function() {
        return OAuthTokenController;
    }
});
const _common = require("@nestjs/common");
const _oauthintrospectinput = require("../dtos/oauth-introspect.input");
const _oauthrevokeinput = require("../dtos/oauth-revoke.input");
const _oauthtokeninput = require("../dtos/oauth-token.input");
const _oauthservice = require("../oauth.service");
const _authrestapiexceptionfilter = require("../../../auth/filters/auth-rest-api-exception.filter");
const _throttlerexception = require("../../../throttler/throttler.exception");
const _throttlerservice = require("../../../throttler/throttler.service");
const _nopermissionguard = require("../../../../guards/no-permission.guard");
const _publicendpointguard = require("../../../../guards/public-endpoint.guard");
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
const OAUTH_RATE_LIMIT_MAX = 60;
const OAUTH_RATE_LIMIT_WINDOW_MS = 60_000;
let OAuthTokenController = class OAuthTokenController {
    async token(body, req, res) {
        if (await this.applyRateLimit(req, res)) return;
        let result;
        switch(body.grant_type){
            case 'authorization_code':
                result = await this.oauthService.exchangeAuthorizationCode({
                    authorizationCode: body.code ?? '',
                    clientId: body.client_id ?? '',
                    clientSecret: body.client_secret,
                    codeVerifier: body.code_verifier,
                    redirectUri: body.redirect_uri ?? ''
                });
                break;
            case 'client_credentials':
                result = await this.oauthService.clientCredentialsGrant({
                    clientId: body.client_id ?? '',
                    clientSecret: body.client_secret ?? ''
                });
                break;
            case 'refresh_token':
                result = await this.oauthService.refreshTokenGrant({
                    refreshToken: body.refresh_token ?? '',
                    clientId: body.client_id ?? '',
                    clientSecret: body.client_secret
                });
                break;
            default:
                result = {
                    error: 'unsupported_grant_type',
                    error_description: 'The provided grant_type is not supported. Supported values: authorization_code, client_credentials, refresh_token'
                };
                break;
        }
        this.setSecurityHeaders(res);
        if ('error' in result) {
            const statusCode = result.error === 'invalid_client' ? 401 : 400;
            res.status(statusCode);
        }
        return result;
    }
    async revoke(body, req, res) {
        if (await this.applyRateLimit(req, res)) return;
        this.setSecurityHeaders(res);
        await this.oauthService.revokeToken({
            token: body.token,
            clientId: body.client_id,
            clientSecret: body.client_secret
        });
        // RFC 7009 §2.2: always return 200, even for invalid tokens
        return {};
    }
    async introspect(body, req, res) {
        if (await this.applyRateLimit(req, res)) return;
        this.setSecurityHeaders(res);
        if (!body.client_id) {
            res.status(401);
            return {
                error: 'invalid_client',
                error_description: 'client_id is required'
            };
        }
        return this.oauthService.introspectToken({
            token: body.token,
            clientId: body.client_id,
            clientSecret: body.client_secret
        });
    }
    async applyRateLimit(req, res) {
        const rateLimitKey = `oauth:${req.ip}`;
        try {
            await this.throttlerService.tokenBucketThrottleOrThrow(rateLimitKey, 1, OAUTH_RATE_LIMIT_MAX, OAUTH_RATE_LIMIT_WINDOW_MS);
            return false;
        } catch (error) {
            if (error instanceof _throttlerexception.ThrottlerException) {
                res.status(429).json({
                    error: 'rate_limit_exceeded',
                    error_description: 'Too many requests, please try again later'
                });
                return true;
            }
            throw error;
        }
    }
    setSecurityHeaders(res) {
        res.set('Cache-Control', 'no-store');
        res.set('Pragma', 'no-cache');
    }
    constructor(oauthService, throttlerService){
        this.oauthService = oauthService;
        this.throttlerService = throttlerService;
    }
};
_ts_decorate([
    (0, _common.Post)('token'),
    (0, _common.HttpCode)(200),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    (0, _common.UsePipes)(new _common.ValidationPipe()),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Req)()),
    _ts_param(2, (0, _common.Res)({
        passthrough: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _oauthtokeninput.OAuthTokenInput === "undefined" ? Object : _oauthtokeninput.OAuthTokenInput,
        typeof Request === "undefined" ? Object : Request,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], OAuthTokenController.prototype, "token", null);
_ts_decorate([
    (0, _common.Post)('revoke'),
    (0, _common.HttpCode)(200),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    (0, _common.UsePipes)(new _common.ValidationPipe()),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Req)()),
    _ts_param(2, (0, _common.Res)({
        passthrough: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _oauthrevokeinput.OAuthRevokeInput === "undefined" ? Object : _oauthrevokeinput.OAuthRevokeInput,
        typeof Request === "undefined" ? Object : Request,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], OAuthTokenController.prototype, "revoke", null);
_ts_decorate([
    (0, _common.Post)('introspect'),
    (0, _common.HttpCode)(200),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    (0, _common.UsePipes)(new _common.ValidationPipe()),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Req)()),
    _ts_param(2, (0, _common.Res)({
        passthrough: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _oauthintrospectinput.OAuthIntrospectInput === "undefined" ? Object : _oauthintrospectinput.OAuthIntrospectInput,
        typeof Request === "undefined" ? Object : Request,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], OAuthTokenController.prototype, "introspect", null);
OAuthTokenController = _ts_decorate([
    (0, _common.Controller)('oauth'),
    (0, _common.UseFilters)(_authrestapiexceptionfilter.AuthRestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _oauthservice.OAuthService === "undefined" ? Object : _oauthservice.OAuthService,
        typeof _throttlerservice.ThrottlerService === "undefined" ? Object : _throttlerservice.ThrottlerService
    ])
], OAuthTokenController);

//# sourceMappingURL=oauth-token.controller.js.map