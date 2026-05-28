/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SamlAuthStrategy", {
    enumerable: true,
    get: function() {
        return SamlAuthStrategy;
    }
});
const _common = require("@nestjs/common");
const _passport = require("@nestjs/passport");
const _passportsaml = require("@node-saml/passport-saml");
const _classvalidator = require("class-validator");
const _zod = require("zod");
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
const WORKSPACE_INVITE_HASH_PAYLOAD_SCHEMA = _zod.z.object({
    workspaceInviteHash: _zod.z.string().optional()
});
const RELAY_STATE_BODY_SCHEMA = _zod.z.object({
    RelayState: _zod.z.string().transform((raw, ctx)=>{
        try {
            return JSON.parse(raw);
        } catch  {
            ctx.addIssue({
                code: 'custom',
                message: 'RelayState is not valid JSON'
            });
            return _zod.z.NEVER;
        }
    }).pipe(WORKSPACE_INVITE_HASH_PAYLOAD_SCHEMA)
});
let SamlAuthStrategy = class SamlAuthStrategy extends (0, _passport.PassportStrategy)(_passportsaml.MultiSamlStrategy, 'saml') {
    authenticate(req, options) {
        const queryParseResult = WORKSPACE_INVITE_HASH_PAYLOAD_SCHEMA.safeParse(req.query);
        const workspaceInviteHash = queryParseResult.success ? queryParseResult.data.workspaceInviteHash : undefined;
        super.authenticate(req, {
            ...options,
            ...workspaceInviteHash !== undefined ? {
                additionalParams: {
                    RelayState: JSON.stringify({
                        workspaceInviteHash
                    })
                }
            } : {}
        });
    }
    extractWorkspaceInviteHash(req) {
        const result = RELAY_STATE_BODY_SCHEMA.safeParse(req.body);
        return result.success ? result.data.RelayState.workspaceInviteHash : undefined;
    }
    constructor(ssoService){
        super({
            getSamlOptions: (req, callback)=>{
                this.ssoService.findSSOIdentityProviderById(req.params.identityProviderId).then((identityProvider)=>{
                    if (identityProvider && this.ssoService.isSAMLIdentityProvider(identityProvider)) {
                        // IdP metadata XML typically has whitespace-formatted certificates
                        const sanitizedCertificate = identityProvider.certificate.replace(/\s/g, '');
                        const config = {
                            entryPoint: identityProvider.ssoURL,
                            issuer: this.ssoService.buildIssuerURL(identityProvider),
                            callbackUrl: this.ssoService.buildCallbackUrl(identityProvider),
                            idpCert: sanitizedCertificate,
                            wantAssertionsSigned: true,
                            wantAuthnResponseSigned: false,
                            disableRequestedAuthnContext: true,
                            signatureAlgorithm: 'sha256'
                        };
                        return callback(null, config);
                    }
                    // TODO: improve error management
                    return callback(new Error('Invalid SAML identity provider'));
                }).catch((err)=>{
                    // TODO: improve error management
                    return callback(err);
                });
            },
            passReqToCallback: true
        }, async (request, profile, done)=>{
            await this.validate(request, profile, done);
        }), this.ssoService = ssoService, this.validate = async (request, profile, done)=>{
            try {
                if (!profile) {
                    return done(new Error('Profile must be provided'));
                }
                const email = profile.email ?? profile.mail ?? profile.nameID;
                if (!(0, _classvalidator.isEmail)(email)) {
                    return done(new Error('Invalid email'));
                }
                done(null, {
                    identityProviderId: request.params.identityProviderId,
                    workspaceInviteHash: this.extractWorkspaceInviteHash(request),
                    email
                });
            } catch (err) {
                done(err);
            }
        };
    }
};
SamlAuthStrategy = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _ssoservice.SSOService === "undefined" ? Object : _ssoservice.SSOService
    ])
], SamlAuthStrategy);

//# sourceMappingURL=saml.auth.strategy.js.map