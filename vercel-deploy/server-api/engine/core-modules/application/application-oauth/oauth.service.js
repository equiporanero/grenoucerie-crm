"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OAuthService", {
    enumerable: true,
    get: function() {
        return OAuthService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _crypto = /*#__PURE__*/ _interop_require_default(require("crypto"));
const _ms = /*#__PURE__*/ _interop_require_default(require("ms"));
const _typeorm1 = require("typeorm");
const _utils = require("twenty-shared/utils");
const _apptokenentity = require("../../app-token/app-token.entity");
const _applicationinstallservice = require("../application-install/application-install.service");
const _applicationregistrationservice = require("../application-registration/application-registration.service");
const _applicationentity = require("../application.entity");
const _applicationservice = require("../application.service");
const _applicationtokenservice = require("../../auth/token/services/application-token.service");
const _twentyconfigservice = require("../../twenty-config/twenty-config.service");
const _userworkspaceentity = require("../../user-workspace/user-workspace.entity");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
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
let OAuthService = class OAuthService {
    async exchangeAuthorizationCode(params) {
        const { authorizationCode, clientId, clientSecret, codeVerifier, redirectUri } = params;
        if (!authorizationCode) {
            return this.errorResponse('invalid_request', 'Authorization code is required');
        }
        const clientValidation = await this.validateClient(clientId);
        if ('error' in clientValidation) {
            return clientValidation;
        }
        const applicationRegistration = clientValidation;
        if (clientSecret) {
            const secretError = await this.validateClientSecret(applicationRegistration, clientSecret);
            if (secretError) {
                return secretError;
            }
        }
        const hashedAuthorizationCode = _crypto.default.createHash('sha256').update(authorizationCode).digest('hex');
        const authCodeToken = await this.appTokenRepository.findOne({
            where: {
                value: hashedAuthorizationCode,
                type: _apptokenentity.AppTokenType.AuthorizationCode
            }
        });
        if (!authCodeToken) {
            return this.errorResponse('invalid_grant', 'Authorization code not found');
        }
        // RFC 6749 §4.1.2: if a previously used code is presented, this indicates
        // a potential compromise — log a security warning
        if (authCodeToken.revokedAt) {
            this.logger.warn(`Authorization code replay detected for client ${clientId}. ` + `Code was already used at ${authCodeToken.revokedAt.toISOString()}.`);
            return this.errorResponse('invalid_grant', 'Authorization code has already been used');
        }
        if (authCodeToken.expiresAt.getTime() < Date.now()) {
            return this.errorResponse('invalid_grant', 'Authorization code expired');
        }
        // RFC 6749 §4.1.3: auth code must have been issued to this client
        const storedClientId = authCodeToken.context?.clientId;
        if (!storedClientId || storedClientId !== clientId) {
            return this.errorResponse('invalid_grant', 'Authorization code was not issued to this client');
        }
        // RFC 6749 §4.1.3: redirect_uri must match the one used in the authorization request
        const storedRedirectUri = authCodeToken.context?.redirectUri;
        if (storedRedirectUri) {
            if (!redirectUri) {
                return this.errorResponse('invalid_request', 'redirect_uri is required');
            }
            if (redirectUri !== storedRedirectUri) {
                return this.errorResponse('invalid_grant', 'redirect_uri does not match the one used in the authorization request');
            }
        }
        // PKCE: if code_challenge was stored, code_verifier is required
        const storedCodeChallenge = authCodeToken.context?.codeChallenge;
        if (storedCodeChallenge) {
            if (!codeVerifier) {
                return this.errorResponse('invalid_request', 'code_verifier is required (PKCE was used in authorization)');
            }
            const computedChallenge = (0, _utils.base64UrlEncode)(_crypto.default.createHash('sha256').update(codeVerifier).digest());
            if (computedChallenge !== storedCodeChallenge) {
                return this.errorResponse('invalid_grant', 'Code verifier does not match the code challenge');
            }
        } else if (codeVerifier) {
            return this.errorResponse('invalid_request', 'code_verifier provided but no code_challenge was used in authorization');
        }
        if (!clientSecret && !storedCodeChallenge) {
            return this.errorResponse('invalid_request', 'Either client_secret or code_verifier (PKCE) is required');
        }
        await this.appTokenRepository.update(authCodeToken.id, {
            revokedAt: new Date()
        });
        if (!authCodeToken.userId || !authCodeToken.workspaceId) {
            return this.errorResponse('server_error', 'Authorization code is missing user or workspace context');
        }
        const application = await this.findOrInstallApplication(applicationRegistration, authCodeToken.workspaceId);
        const userWorkspace = await this.userWorkspaceRepository.findOne({
            where: {
                userId: authCodeToken.userId,
                workspaceId: authCodeToken.workspaceId
            }
        });
        if (!userWorkspace) {
            return this.errorResponse('invalid_grant', 'User no longer has access to this workspace');
        }
        const { applicationAccessToken, applicationRefreshToken } = await this.applicationTokenService.generateApplicationTokenPair({
            workspaceId: authCodeToken.workspaceId,
            applicationId: application.id,
            userId: authCodeToken.userId,
            userWorkspaceId: userWorkspace.id
        });
        const grantedScope = authCodeToken.context?.scope ?? applicationRegistration.oAuthScopes.join(' ');
        this.logger.log(`Authorization code exchanged: client=${clientId} workspace=${authCodeToken.workspaceId} user=${authCodeToken.userId}`);
        return {
            access_token: applicationAccessToken.token,
            token_type: 'Bearer',
            expires_in: this.getAccessTokenExpiresInSeconds(),
            refresh_token: applicationRefreshToken.token,
            scope: grantedScope
        };
    }
    async clientCredentialsGrant(params) {
        const { clientId, clientSecret } = params;
        const clientValidation = await this.validateClient(clientId);
        if ('error' in clientValidation) {
            return clientValidation;
        }
        const applicationRegistration = clientValidation;
        const secretError = await this.validateClientSecret(applicationRegistration, clientSecret);
        if (secretError) {
            return secretError;
        }
        const applications = await this.applicationRepository.find({
            where: {
                applicationRegistrationId: applicationRegistration.id
            }
        });
        if (applications.length === 0) {
            return this.errorResponse('server_error', 'No workspace installation found for this client. Install the app in a workspace first.');
        }
        if (applications.length > 1) {
            return this.errorResponse('invalid_request', 'Multiple workspace installations found. Client credentials grant requires exactly one installation.');
        }
        const application = applications[0];
        const applicationAccessToken = await this.applicationTokenService.generateApplicationAccessToken({
            workspaceId: application.workspaceId,
            applicationId: application.id
        });
        this.logger.log(`Client credentials token issued: client=${clientId} workspace=${application.workspaceId}`);
        return {
            access_token: applicationAccessToken.token,
            token_type: 'Bearer',
            expires_in: this.getAccessTokenExpiresInSeconds(),
            scope: applicationRegistration.oAuthScopes.join(' ')
        };
    }
    async refreshTokenGrant(params) {
        const { refreshToken, clientId, clientSecret } = params;
        const clientValidation = await this.validateClient(clientId);
        if ('error' in clientValidation) {
            return clientValidation;
        }
        const applicationRegistration = clientValidation;
        // Confidential clients (those with a secret) must authenticate
        if (applicationRegistration.oAuthClientSecretHash && !clientSecret) {
            return this.errorResponse('invalid_client', 'Client authentication required for confidential clients');
        }
        if (clientSecret) {
            const secretError = await this.validateClientSecret(applicationRegistration, clientSecret);
            if (secretError) {
                return secretError;
            }
        }
        try {
            const payload = await this.applicationTokenService.validateApplicationRefreshToken(refreshToken);
            // Verify the refresh token belongs to this client
            const application = await this.applicationRepository.findOne({
                where: {
                    id: payload.applicationId
                }
            });
            if (!application || application.applicationRegistrationId !== applicationRegistration.id) {
                return this.errorResponse('invalid_grant', 'Refresh token was not issued to this client');
            }
            const { applicationAccessToken, applicationRefreshToken } = await this.applicationTokenService.renewApplicationTokens(payload);
            this.logger.log(`Refresh token exchanged: client=${clientId} application=${payload.applicationId}`);
            return {
                access_token: applicationAccessToken.token,
                token_type: 'Bearer',
                expires_in: this.getAccessTokenExpiresInSeconds(),
                refresh_token: applicationRefreshToken.token,
                scope: applicationRegistration.oAuthScopes.join(' ')
            };
        } catch (error) {
            this.logger.warn(`Refresh token grant failed: client=${clientId}`, error);
            return this.errorResponse('invalid_grant', 'Invalid or expired refresh token');
        }
    }
    // RFC 7009: Token revocation
    // Returns true if token was successfully processed (even if already invalid)
    async revokeToken(params) {
        const { token, clientId, clientSecret } = params;
        if (clientId) {
            const clientValidation = await this.validateClient(clientId);
            if ('error' in clientValidation) {
                return {
                    success: false
                };
            }
            if (clientSecret) {
                const secretError = await this.validateClientSecret(clientValidation, clientSecret);
                if (secretError) {
                    return {
                        success: false
                    };
                }
            }
        }
        // Since our tokens are stateless JWTs, we can't truly revoke them.
        // We validate the token to log that revocation was requested.
        try {
            const payload = await this.applicationTokenService.validateApplicationRefreshToken(token);
            this.logger.log(`Token revocation requested for application ${payload.applicationId}`);
        } catch  {
        // Per RFC 7009 §2.2: the server responds with HTTP 200 for both
        // valid and invalid tokens
        }
        return {
            success: true
        };
    }
    // RFC 7662: Token introspection
    async introspectToken(params) {
        const { token, clientId, clientSecret } = params;
        const clientValidation = await this.validateClient(clientId);
        if ('error' in clientValidation) {
            return {
                active: false
            };
        }
        if (clientSecret) {
            const secretError = await this.validateClientSecret(clientValidation, clientSecret);
            if (secretError) {
                return {
                    active: false
                };
            }
        }
        try {
            await this.applicationTokenService.validateApplicationRefreshToken(token);
            const decoded = this.applicationTokenService.decodeToken(token);
            if (!decoded) {
                return {
                    active: false
                };
            }
            // Verify the token belongs to this client
            const application = await this.applicationRepository.findOne({
                where: {
                    id: decoded.applicationId
                }
            });
            if (!application || application.applicationRegistrationId !== clientValidation.id) {
                return {
                    active: false
                };
            }
            return {
                active: true,
                sub: decoded.sub,
                client_id: clientId,
                token_type: 'Bearer',
                scope: clientValidation.oAuthScopes.join(' '),
                aud: decoded.workspaceId,
                iss: this.twentyConfigService.get('SERVER_URL'),
                exp: decoded.exp,
                iat: decoded.iat
            };
        } catch  {
            // Try as access token (with signature verification)
            try {
                const payload = await this.applicationTokenService.validateApplicationAccessToken(token);
                const application = await this.applicationRepository.findOne({
                    where: {
                        id: payload.applicationId
                    }
                });
                if (!application || application.applicationRegistrationId !== clientValidation.id) {
                    return {
                        active: false
                    };
                }
                return {
                    active: true,
                    sub: payload.sub,
                    client_id: clientId,
                    token_type: 'Bearer',
                    scope: clientValidation.oAuthScopes.join(' '),
                    aud: payload.workspaceId,
                    iss: this.twentyConfigService.get('SERVER_URL')
                };
            } catch  {
                return {
                    active: false
                };
            }
        }
    }
    async validateClient(clientId) {
        const applicationRegistration = await this.applicationRegistrationService.findOneByClientId(clientId);
        if (!applicationRegistration) {
            return this.errorResponse('invalid_client', 'Client not found');
        }
        return applicationRegistration;
    }
    async validateClientSecret(applicationRegistration, clientSecret) {
        const isValid = await this.applicationRegistrationService.verifyClientSecret(applicationRegistration, clientSecret);
        if (!isValid) {
            return this.errorResponse('invalid_client', 'Invalid client secret');
        }
        return null;
    }
    async findOrInstallApplication(applicationRegistration, workspaceId) {
        const existingApplication = await this.applicationRepository.findOne({
            where: {
                applicationRegistrationId: applicationRegistration.id,
                workspaceId
            }
        });
        if (existingApplication) {
            return existingApplication;
        }
        try {
            await this.applicationInstallService.installApplication({
                appRegistrationId: applicationRegistration.id,
                workspaceId
            });
            const installedApplication = await this.applicationRepository.findOne({
                where: {
                    applicationRegistrationId: applicationRegistration.id,
                    workspaceId
                }
            });
            if (installedApplication) {
                return installedApplication;
            }
            this.logger.warn(`Install succeeded but application not found in workspace, falling back to bare creation`);
        } catch (error) {
            this.logger.warn(`Auto-install failed for ${applicationRegistration.name}, falling back to bare creation`, error);
        }
        return this.applicationService.create({
            universalIdentifier: applicationRegistration.universalIdentifier,
            name: applicationRegistration.name,
            description: `OAuth application registered as "${applicationRegistration.name}"`,
            version: applicationRegistration.latestAvailableVersion ?? '1.0.0',
            sourcePath: 'oauth-install',
            applicationRegistrationId: applicationRegistration.id,
            workspaceId
        });
    }
    // OAuth RFC 6749 requires expires_in as seconds
    getAccessTokenExpiresInSeconds() {
        const duration = this.twentyConfigService.get('APPLICATION_ACCESS_TOKEN_EXPIRES_IN');
        return Math.floor((0, _ms.default)(duration) / 1000);
    }
    errorResponse(error, errorDescription) {
        return {
            error,
            error_description: errorDescription
        };
    }
    constructor(appTokenRepository, applicationRepository, userWorkspaceRepository, applicationTokenService, applicationRegistrationService, applicationService, applicationInstallService, twentyConfigService){
        this.appTokenRepository = appTokenRepository;
        this.applicationRepository = applicationRepository;
        this.userWorkspaceRepository = userWorkspaceRepository;
        this.applicationTokenService = applicationTokenService;
        this.applicationRegistrationService = applicationRegistrationService;
        this.applicationService = applicationService;
        this.applicationInstallService = applicationInstallService;
        this.twentyConfigService = twentyConfigService;
        this.logger = new _common.Logger(OAuthService.name);
    }
};
OAuthService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_apptokenentity.AppTokenEntity)),
    _ts_param(1, (0, _typeorm.InjectRepository)(_applicationentity.ApplicationEntity)),
    _ts_param(2, (0, _typeorm.InjectRepository)(_userworkspaceentity.UserWorkspaceEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _applicationtokenservice.ApplicationTokenService === "undefined" ? Object : _applicationtokenservice.ApplicationTokenService,
        typeof _applicationregistrationservice.ApplicationRegistrationService === "undefined" ? Object : _applicationregistrationservice.ApplicationRegistrationService,
        typeof _applicationservice.ApplicationService === "undefined" ? Object : _applicationservice.ApplicationService,
        typeof _applicationinstallservice.ApplicationInstallService === "undefined" ? Object : _applicationinstallservice.ApplicationInstallService,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], OAuthService);

//# sourceMappingURL=oauth.service.js.map