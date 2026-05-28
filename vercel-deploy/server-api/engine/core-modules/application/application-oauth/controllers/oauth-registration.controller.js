"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OAuthRegistrationController", {
    enumerable: true,
    get: function() {
        return OAuthRegistrationController;
    }
});
const _common = require("@nestjs/common");
const _uuid = require("uuid");
const _typeorm = require("@nestjs/typeorm");
const _oauthscopes = require("../constants/oauth-scopes");
const _oauthregisterinput = require("../dtos/oauth-register.input");
const _applicationregistrationentity = require("../../application-registration/application-registration.entity");
const _applicationregistrationsourcetypeenum = require("../../application-registration/enums/application-registration-source-type.enum");
const _authrestapiexceptionfilter = require("../../../auth/filters/auth-rest-api-exception.filter");
const _validateredirecturiutil = require("../../../auth/utils/validate-redirect-uri.util");
const _throttlerexception = require("../../../throttler/throttler.exception");
const _throttlerservice = require("../../../throttler/throttler.service");
const _nodeenvironmentinterface = require("../../../twenty-config/interfaces/node-environment.interface");
const _nopermissionguard = require("../../../../guards/no-permission.guard");
const _publicendpointguard = require("../../../../guards/public-endpoint.guard");
const _typeorm1 = require("typeorm");
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
// RFC 7591: 10 registrations per hour per IP
const REGISTRATION_RATE_LIMIT_MAX = process.env.NODE_ENV === _nodeenvironmentinterface.NodeEnvironment.DEVELOPMENT ? 100 : 10;
const REGISTRATION_RATE_LIMIT_WINDOW_MS = 3_600_000;
const ALLOWED_GRANT_TYPES = [
    'authorization_code',
    'refresh_token'
];
const ALLOWED_RESPONSE_TYPES = [
    'code'
];
let OAuthRegistrationController = class OAuthRegistrationController {
    async register(body, req, res) {
        const rateLimitResult = await this.applyRateLimit(req);
        if (rateLimitResult) {
            res.status(429);
            return rateLimitResult;
        }
        // Validate redirect URIs
        for (const uri of body.redirect_uris){
            const result = (0, _validateredirecturiutil.validateRedirectUri)(uri);
            if (!result.valid) {
                res.status(400);
                return {
                    error: 'invalid_client_metadata',
                    error_description: result.reason
                };
            }
        }
        if (body.redirect_uris.length === 0) {
            res.status(400);
            return {
                error: 'invalid_client_metadata',
                error_description: 'At least one redirect_uri is required'
            };
        }
        // Validate grant_types — only authorization_code allowed for dynamic clients
        const grantTypes = body.grant_types ?? [
            'authorization_code'
        ];
        for (const grantType of grantTypes){
            if (!ALLOWED_GRANT_TYPES.includes(grantType)) {
                res.status(400);
                return {
                    error: 'invalid_client_metadata',
                    error_description: `Unsupported grant_type: ${grantType}. Only authorization_code and refresh_token are allowed for dynamic registrations.`
                };
            }
        }
        // Validate response_types
        const responseTypes = body.response_types ?? [
            'code'
        ];
        for (const responseType of responseTypes){
            if (!ALLOWED_RESPONSE_TYPES.includes(responseType)) {
                res.status(400);
                return {
                    error: 'invalid_client_metadata',
                    error_description: `Unsupported response_type: ${responseType}`
                };
            }
        }
        // Dynamic registrations are always public — we don't issue a client
        // secret via DCR. Silently downgrade any auth method to "none".
        const requestedTokenEndpointAuthMethod = body.token_endpoint_auth_method ?? 'none';
        const tokenEndpointAuthMethod = 'none';
        if (requestedTokenEndpointAuthMethod !== 'none' && requestedTokenEndpointAuthMethod !== 'client_secret_post' && requestedTokenEndpointAuthMethod !== 'client_secret_basic') {
            res.status(400);
            return {
                error: 'invalid_client_metadata',
                error_description: `Unsupported token_endpoint_auth_method: ${requestedTokenEndpointAuthMethod}`
            };
        }
        // Parse and validate scopes — cap to allowed scopes
        const validScopes = _oauthscopes.ALL_OAUTH_SCOPES;
        const requestedScopes = body.scope ? body.scope.split(' ').filter((s)=>validScopes.includes(s)) : [
            ..._oauthscopes.ALL_OAUTH_SCOPES
        ];
        const clientId = (0, _uuid.v4)();
        const registration = this.applicationRegistrationRepository.create({
            universalIdentifier: (0, _uuid.v4)(),
            name: body.client_name,
            oAuthClientId: clientId,
            oAuthClientSecretHash: null,
            oAuthRedirectUris: body.redirect_uris,
            oAuthScopes: requestedScopes,
            createdByUserId: null,
            ownerWorkspaceId: null,
            sourceType: _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.OAUTH_ONLY
        });
        await this.applicationRegistrationRepository.save(registration);
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        const issuer = `${req.protocol}://${req.get('host')}`;
        return {
            client_id: clientId,
            client_name: body.client_name,
            redirect_uris: body.redirect_uris,
            grant_types: grantTypes,
            response_types: responseTypes,
            token_endpoint_auth_method: tokenEndpointAuthMethod,
            scope: requestedScopes.join(' '),
            client_id_issued_at: Math.floor(Date.now() / 1000),
            registration_client_uri: `${issuer}/oauth/register/${clientId}`
        };
    }
    // RFC 7592 read-back. No registration_access_token is issued; the client_id
    // is an unguessable UUID and the fields returned are already public.
    async readRegistration(clientId, req, res) {
        const registration = await this.applicationRegistrationRepository.findOne({
            where: {
                oAuthClientId: clientId,
                sourceType: _applicationregistrationsourcetypeenum.ApplicationRegistrationSourceType.OAUTH_ONLY
            }
        });
        if (!registration) {
            res.status(404);
            return {
                error: 'invalid_client',
                error_description: 'Client not found'
            };
        }
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        const issuer = `${req.protocol}://${req.get('host')}`;
        return {
            client_id: registration.oAuthClientId,
            client_name: registration.name,
            redirect_uris: registration.oAuthRedirectUris,
            grant_types: [
                'authorization_code',
                'refresh_token'
            ],
            response_types: [
                'code'
            ],
            token_endpoint_auth_method: 'none',
            scope: registration.oAuthScopes.join(' '),
            registration_client_uri: `${issuer}/oauth/register/${registration.oAuthClientId}`
        };
    }
    async applyRateLimit(req) {
        const rateLimitKey = `oauth-register:${req.ip}`;
        try {
            await this.throttlerService.tokenBucketThrottleOrThrow(rateLimitKey, 1, REGISTRATION_RATE_LIMIT_MAX, REGISTRATION_RATE_LIMIT_WINDOW_MS);
            return null;
        } catch (error) {
            if (error instanceof _throttlerexception.ThrottlerException) {
                return {
                    error: 'rate_limit_exceeded',
                    error_description: 'Too many registration requests, please try again later'
                };
            }
            throw error;
        }
    }
    constructor(applicationRegistrationRepository, throttlerService){
        this.applicationRegistrationRepository = applicationRegistrationRepository;
        this.throttlerService = throttlerService;
    }
};
_ts_decorate([
    (0, _common.Post)('register'),
    (0, _common.HttpCode)(201),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    (0, _common.UsePipes)(new _common.ValidationPipe()),
    _ts_param(0, (0, _common.Body)()),
    _ts_param(1, (0, _common.Req)()),
    _ts_param(2, (0, _common.Res)({
        passthrough: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _oauthregisterinput.OAuthRegisterInput === "undefined" ? Object : _oauthregisterinput.OAuthRegisterInput,
        typeof Request === "undefined" ? Object : Request,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], OAuthRegistrationController.prototype, "register", null);
_ts_decorate([
    (0, _common.Get)('register/:clientId'),
    (0, _common.UseGuards)(_publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_param(0, (0, _common.Param)('clientId')),
    _ts_param(1, (0, _common.Req)()),
    _ts_param(2, (0, _common.Res)({
        passthrough: true
    })),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        String,
        typeof Request === "undefined" ? Object : Request,
        typeof Response === "undefined" ? Object : Response
    ]),
    _ts_metadata("design:returntype", Promise)
], OAuthRegistrationController.prototype, "readRegistration", null);
OAuthRegistrationController = _ts_decorate([
    (0, _common.Controller)('oauth'),
    (0, _common.UseFilters)(_authrestapiexceptionfilter.AuthRestApiExceptionFilter),
    _ts_param(0, (0, _typeorm.InjectRepository)(_applicationregistrationentity.ApplicationRegistrationEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _throttlerservice.ThrottlerService === "undefined" ? Object : _throttlerservice.ThrottlerService
    ])
], OAuthRegistrationController);

//# sourceMappingURL=oauth-registration.controller.js.map