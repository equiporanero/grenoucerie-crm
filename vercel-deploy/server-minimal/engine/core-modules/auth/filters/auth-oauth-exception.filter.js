"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthOAuthExceptionFilter", {
    enumerable: true,
    get: function() {
        return AuthOAuthExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _authexception = require("../auth.exception");
const _domainserverconfigservice = require("../../domain/domain-server-config/services/domain-server-config.service");
const _httpexceptionhandlerservice = require("../../exception-handler/http-exception-handler.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let AuthOAuthExceptionFilter = class AuthOAuthExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        switch(exception.code){
            case _authexception.AuthExceptionCode.OAUTH_ACCESS_DENIED:
                response.status(403).redirect(this.domainServerConfigService.getBaseUrl().toString());
                break;
            default:
                return this.httpExceptionHandlerService.handleError(exception, response, 500);
        }
    }
    constructor(domainServerConfigService, httpExceptionHandlerService){
        this.domainServerConfigService = domainServerConfigService;
        this.httpExceptionHandlerService = httpExceptionHandlerService;
    }
};
AuthOAuthExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_authexception.AuthException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _domainserverconfigservice.DomainServerConfigService === "undefined" ? Object : _domainserverconfigservice.DomainServerConfigService,
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService
    ])
], AuthOAuthExceptionFilter);

//# sourceMappingURL=auth-oauth-exception.filter.js.map