/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SSOService", {
    enumerable: true,
    get: function() {
        return SSOService;
    }
});
const _common = require("@nestjs/common");
const _typeorm = require("@nestjs/typeorm");
const _openidclient = require("openid-client");
const _typeorm1 = require("typeorm");
const _workspacessoidentityproviderentity = require("../workspace-sso-identity-provider.entity");
const _billingentitlementkeyenum = require("../../billing/enums/billing-entitlement-key.enum");
const _billingservice = require("../../billing/services/billing.service");
const _exceptionhandlerservice = require("../../exception-handler/exception-handler.service");
const _ssoexception = require("../sso.exception");
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
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
let SSOService = class SSOService {
    async isSSOEnabled(workspaceId) {
        const isSSOBillingEnabled = await this.billingService.hasEntitlement(workspaceId, this.featureLookUpKey);
        if (!isSSOBillingEnabled) {
            throw new _ssoexception.SSOException(`No entitlement found for this workspace`, _ssoexception.SSOExceptionCode.SSO_DISABLE);
        }
    }
    async getIssuerForOIDC(issuerUrl) {
        try {
            return await _openidclient.Issuer.discover(issuerUrl);
        } catch  {
            throw new _ssoexception.SSOException('Invalid issuer', _ssoexception.SSOExceptionCode.INVALID_ISSUER_URL);
        }
    }
    async createOIDCIdentityProvider(data, workspaceId) {
        try {
            await this.isSSOEnabled(workspaceId);
            const issuer = await this.getIssuerForOIDC(data.issuer);
            const identityProvider = await this.workspaceSSOIdentityProviderRepository.save({
                type: _workspacessoidentityproviderentity.IdentityProviderType.OIDC,
                clientID: data.clientID,
                clientSecret: data.clientSecret,
                issuer: issuer.metadata.issuer,
                name: data.name,
                workspaceId
            });
            return {
                id: identityProvider.id,
                type: identityProvider.type,
                name: identityProvider.name,
                status: identityProvider.status,
                issuer: identityProvider.issuer
            };
        } catch (err) {
            if (err instanceof _ssoexception.SSOException) {
                return err;
            }
            this.exceptionHandlerService.captureExceptions([
                err
            ]);
            return new _ssoexception.SSOException('Unknown SSO configuration error', _ssoexception.SSOExceptionCode.UNKNOWN_SSO_CONFIGURATION_ERROR);
        }
    }
    async createSAMLIdentityProvider(data, workspaceId) {
        await this.isSSOEnabled(workspaceId);
        const identityProvider = await this.workspaceSSOIdentityProviderRepository.save({
            ...data,
            type: _workspacessoidentityproviderentity.IdentityProviderType.SAML,
            workspaceId
        });
        return {
            id: identityProvider.id,
            type: identityProvider.type,
            name: identityProvider.name,
            issuer: this.buildIssuerURL(identityProvider),
            status: identityProvider.status
        };
    }
    async findSSOIdentityProviderById(identityProviderId) {
        return await this.workspaceSSOIdentityProviderRepository.findOne({
            where: {
                id: identityProviderId
            },
            relations: {
                workspace: true
            }
        });
    }
    buildCallbackUrl(identityProvider) {
        const callbackURL = new URL(this.twentyConfigService.get('SERVER_URL'));
        callbackURL.pathname = `/auth/${identityProvider.type.toLowerCase()}/callback`;
        if (identityProvider.type === _workspacessoidentityproviderentity.IdentityProviderType.SAML) {
            callbackURL.pathname += `/${identityProvider.id}`;
        }
        return callbackURL.toString();
    }
    buildIssuerURL(identityProvider, searchParams) {
        const authorizationUrl = new URL(this.twentyConfigService.get('SERVER_URL'));
        authorizationUrl.pathname = `/auth/${identityProvider.type.toLowerCase()}/login/${identityProvider.id}`;
        if (searchParams) {
            Object.entries(searchParams).forEach(([key, value])=>{
                authorizationUrl.searchParams.append(key, value.toString());
            });
        }
        return authorizationUrl.toString();
    }
    isOIDCIdentityProvider(identityProvider) {
        return identityProvider.type === _workspacessoidentityproviderentity.IdentityProviderType.OIDC;
    }
    isSAMLIdentityProvider(identityProvider) {
        return identityProvider.type === _workspacessoidentityproviderentity.IdentityProviderType.SAML;
    }
    getOIDCClient(identityProvider, issuer) {
        if (!this.isOIDCIdentityProvider(identityProvider)) {
            throw new _ssoexception.SSOException('Invalid Identity Provider type', _ssoexception.SSOExceptionCode.INVALID_IDP_TYPE);
        }
        return new issuer.Client({
            client_id: identityProvider.clientID,
            client_secret: identityProvider.clientSecret,
            redirect_uris: [
                this.buildCallbackUrl(identityProvider)
            ],
            response_types: [
                _workspacessoidentityproviderentity.OIDCResponseType.CODE
            ]
        });
    }
    async getAuthorizationUrlForSSO(identityProviderId, searchParams) {
        const identityProvider = await this.workspaceSSOIdentityProviderRepository.findOne({
            where: {
                id: identityProviderId
            }
        });
        if (!identityProvider) {
            throw new _ssoexception.SSOException('Identity Provider not found', _ssoexception.SSOExceptionCode.USER_NOT_FOUND);
        }
        return {
            id: identityProvider.id,
            authorizationURL: this.buildIssuerURL(identityProvider, searchParams),
            type: identityProvider.type
        };
    }
    async getSSOIdentityProviders(workspaceId) {
        return await this.workspaceSSOIdentityProviderRepository.find({
            where: {
                workspaceId
            },
            select: [
                'id',
                'name',
                'type',
                'issuer',
                'status'
            ]
        });
    }
    async deleteSSOIdentityProvider(identityProviderId, workspaceId) {
        const identityProvider = await this.workspaceSSOIdentityProviderRepository.findOne({
            where: {
                id: identityProviderId,
                workspaceId
            }
        });
        if (!identityProvider) {
            throw new _ssoexception.SSOException('Identity Provider not found', _ssoexception.SSOExceptionCode.IDENTITY_PROVIDER_NOT_FOUND);
        }
        await this.workspaceSSOIdentityProviderRepository.delete({
            id: identityProvider.id
        });
        return {
            identityProviderId: identityProvider.id
        };
    }
    async editSSOIdentityProvider(payload, workspaceId) {
        const ssoIdp = await this.workspaceSSOIdentityProviderRepository.findOne({
            where: {
                id: payload.id,
                workspaceId
            }
        });
        if (!ssoIdp) {
            throw new _ssoexception.SSOException('Identity Provider not found', _ssoexception.SSOExceptionCode.IDENTITY_PROVIDER_NOT_FOUND);
        }
        const result = await this.workspaceSSOIdentityProviderRepository.save({
            ...ssoIdp,
            ...payload
        });
        return {
            id: result.id,
            type: result.type,
            issuer: result.issuer,
            name: result.name,
            status: result.status
        };
    }
    constructor(workspaceSSOIdentityProviderRepository, twentyConfigService, billingService, exceptionHandlerService){
        this.workspaceSSOIdentityProviderRepository = workspaceSSOIdentityProviderRepository;
        this.twentyConfigService = twentyConfigService;
        this.billingService = billingService;
        this.exceptionHandlerService = exceptionHandlerService;
        this.featureLookUpKey = _billingentitlementkeyenum.BillingEntitlementKey.SSO;
    }
};
SSOService = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _typeorm.InjectRepository)(_workspacessoidentityproviderentity.WorkspaceSSOIdentityProviderEntity)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _typeorm1.Repository === "undefined" ? Object : _typeorm1.Repository,
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService,
        typeof _billingservice.BillingService === "undefined" ? Object : _billingservice.BillingService,
        typeof _exceptionhandlerservice.ExceptionHandlerService === "undefined" ? Object : _exceptionhandlerservice.ExceptionHandlerService
    ])
], SSOService);

//# sourceMappingURL=sso.service.js.map