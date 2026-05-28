"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "GoogleAuthController", {
    enumerable: true,
    get: function() {
        return GoogleAuthController;
    }
});
const _common = require("@nestjs/common");
const _express = require("express");
const _authoauthexceptionfilter = require("../filters/auth-oauth-exception.filter");
const _authrestapiexceptionfilter = require("../filters/auth-rest-api-exception.filter");
const _googleoauthguard = require("../guards/google-oauth.guard");
const _googleproviderenabledguard = require("../guards/google-provider-enabled.guard");
const _authservice = require("../services/auth.service");
const _googleauthstrategy = require("../strategies/google.auth.strategy");
const _workspacetype = require("../../workspace/types/workspace.type");
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
let GoogleAuthController = class GoogleAuthController {
    async googleAuth() {
        // As this method is protected by Google Auth guard, it will trigger Google SSO flow
        return;
    }
    async googleAuthRedirect(req, res) {
        return res.redirect(await this.authService.signInUpWithSocialSSO(req.user, _workspacetype.AuthProviderEnum.Google));
    }
    constructor(authService){
        this.authService = authService;
    }
};
_ts_decorate([
    (0, _common.Get)(),
    (0, _common.UseGuards)(_googleproviderenabledguard.GoogleProviderEnabledGuard, _googleoauthguard.GoogleOauthGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", Promise)
], GoogleAuthController.prototype, "googleAuth", null);
_ts_decorate([
    (0, _common.Get)('redirect'),
    (0, _common.UseGuards)(_googleproviderenabledguard.GoogleProviderEnabledGuard, _googleoauthguard.GoogleOauthGuard, _publicendpointguard.PublicEndpointGuard, _nopermissionguard.NoPermissionGuard),
    (0, _common.UseFilters)(_authoauthexceptionfilter.AuthOAuthExceptionFilter),
    _ts_param(0, (0, _common.Req)()),
    _ts_param(1, (0, _common.Res)()),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _googleauthstrategy.GoogleRequest === "undefined" ? Object : _googleauthstrategy.GoogleRequest,
        typeof _express.Response === "undefined" ? Object : _express.Response
    ]),
    _ts_metadata("design:returntype", Promise)
], GoogleAuthController.prototype, "googleAuthRedirect", null);
GoogleAuthController = _ts_decorate([
    (0, _common.Controller)('auth/google'),
    (0, _common.UseFilters)(_authrestapiexceptionfilter.AuthRestApiExceptionFilter),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _authservice.AuthService === "undefined" ? Object : _authservice.AuthService
    ])
], GoogleAuthController);

//# sourceMappingURL=google-auth.controller.js.map