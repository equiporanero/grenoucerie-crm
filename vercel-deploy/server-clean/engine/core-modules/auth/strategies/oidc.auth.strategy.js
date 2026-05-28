/* @license Enterprise */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "OIDCAuthStrategy", {
    enumerable: true,
    get: function() {
        return OIDCAuthStrategy;
    }
});
const _common = require("@nestjs/common");
const _passport = require("@nestjs/passport");
const _openidclient = require("openid-client");
const _authexception = require("../auth.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let OIDCAuthStrategy = class OIDCAuthStrategy extends (0, _passport.PassportStrategy)(_openidclient.Strategy, 'openidconnect') {
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    authenticate(req, options) {
        return super.authenticate(req, {
            ...options,
            state: JSON.stringify({
                identityProviderId: req.params.identityProviderId,
                ...req.query.workspaceInviteHash ? {
                    workspaceInviteHash: req.query.workspaceInviteHash
                } : {}
            })
        });
    }
    extractState(req) {
        try {
            const state = JSON.parse(req.query.state && typeof req.query.state === 'string' ? req.query.state : '{}');
            if (!state.identityProviderId) {
                throw new Error();
            }
            return {
                identityProviderId: state.identityProviderId,
                workspaceInviteHash: state.workspaceInviteHash
            };
        } catch  {
            throw new _authexception.AuthException('Invalid state', _authexception.AuthExceptionCode.INVALID_INPUT);
        }
    }
    async validate(req, tokenset, // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    done) {
        try {
            const state = this.extractState(req);
            const userinfo = await this.client.userinfo(tokenset);
            const email = userinfo.email ?? userinfo.upn;
            if (!email || typeof email !== 'string') {
                return done(new _authexception.AuthException('Email not found in identity provider payload', _authexception.AuthExceptionCode.INVALID_DATA));
            }
            done(null, {
                email,
                workspaceInviteHash: state.workspaceInviteHash,
                identityProviderId: state.identityProviderId,
                ...userinfo.given_name ? {
                    firstName: userinfo.given_name
                } : {},
                ...userinfo.family_name ? {
                    lastName: userinfo.family_name
                } : {},
                oidcTokenClaims: tokenset.claims()
            });
        } catch (err) {
            done(err);
        }
    }
    constructor(client, sessionKey){
        super({
            params: {
                scope: 'openid email profile',
                code_challenge_method: 'S256'
            },
            client,
            usePKCE: true,
            passReqToCallback: true,
            sessionKey
        }), this.client = client;
    }
};
OIDCAuthStrategy = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        Object,
        String
    ])
], OIDCAuthStrategy);

//# sourceMappingURL=oidc.auth.strategy.js.map