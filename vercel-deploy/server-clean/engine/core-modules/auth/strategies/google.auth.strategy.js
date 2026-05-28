"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleStrategy", {
    enumerable: true,
    get: function() {
        return GoogleStrategy;
    }
});
const _common = require("@nestjs/common");
const _passport = require("@nestjs/passport");
const _passportgoogleoauth20 = require("passport-google-oauth20");
const _utils = require("twenty-shared/utils");
const _authexception = require("../auth.exception");
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
let GoogleStrategy = class GoogleStrategy extends (0, _passport.PassportStrategy)(_passportgoogleoauth20.Strategy, 'google') {
    // oxlint-disable-next-line @typescripttypescript/no-explicit-any
    authenticate(req, options) {
        options = {
            ...options,
            state: JSON.stringify({
                workspaceInviteHash: req.query.workspaceInviteHash,
                workspaceId: req.params.workspaceId,
                billingCheckoutSessionState: req.query.billingCheckoutSessionState,
                action: req.query.action,
                locale: req.query.locale,
                returnToPath: req.query.returnToPath
            })
        };
        return super.authenticate(req, options);
    }
    async validate(request, _accessToken, _refreshToken, profile, done) {
        const { name, emails, photos } = profile;
        const state = (0, _utils.parseJson)(request.query.state);
        const firstVerifiedEmail = emails?.find((email)=>email?.verified === true)?.value;
        if (!firstVerifiedEmail) {
            throw new _authexception.AuthException('Please verify your email address with Google', _authexception.AuthExceptionCode.EMAIL_NOT_VERIFIED);
        }
        const user = {
            email: firstVerifiedEmail,
            firstName: name?.givenName,
            lastName: name?.familyName,
            picture: photos?.[0]?.value ?? null,
            workspaceInviteHash: state?.workspaceInviteHash,
            workspaceId: state?.workspaceId,
            billingCheckoutSessionState: state?.billingCheckoutSessionState,
            action: state?.action ?? 'list-available-workspaces',
            locale: state?.locale,
            returnToPath: state?.returnToPath
        };
        done(null, user);
    }
    constructor(twentyConfigService){
        super({
            clientID: twentyConfigService.get('AUTH_GOOGLE_CLIENT_ID'),
            clientSecret: twentyConfigService.get('AUTH_GOOGLE_CLIENT_SECRET'),
            callbackURL: twentyConfigService.get('AUTH_GOOGLE_CALLBACK_URL'),
            scope: [
                'email',
                'profile'
            ],
            passReqToCallback: true
        });
    }
};
GoogleStrategy = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _twentyconfigservice.TwentyConfigService === "undefined" ? Object : _twentyconfigservice.TwentyConfigService
    ])
], GoogleStrategy);

//# sourceMappingURL=google.auth.strategy.js.map