"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthRestApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return AuthRestApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _authexception = require("../auth.exception");
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
let AuthRestApiExceptionFilter = class AuthRestApiExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (!(exception instanceof _authexception.AuthException)) {
            return this.httpExceptionHandlerService.handleError(exception, response, 500);
        }
        switch(exception.code){
            case _authexception.AuthExceptionCode.USER_NOT_FOUND:
            case _authexception.AuthExceptionCode.CLIENT_NOT_FOUND:
                return this.httpExceptionHandlerService.handleError(exception, response, 404);
            case _authexception.AuthExceptionCode.INVALID_INPUT:
            case _authexception.AuthExceptionCode.INVALID_DATA:
            case _authexception.AuthExceptionCode.MISSING_ENVIRONMENT_VARIABLE:
                return this.httpExceptionHandlerService.handleError(exception, response, 400);
            case _authexception.AuthExceptionCode.FORBIDDEN_EXCEPTION:
                return this.httpExceptionHandlerService.handleError(exception, response, 403);
            case _authexception.AuthExceptionCode.GOOGLE_API_AUTH_DISABLED:
            case _authexception.AuthExceptionCode.MICROSOFT_API_AUTH_DISABLED:
            case _authexception.AuthExceptionCode.SIGNUP_DISABLED:
            case _authexception.AuthExceptionCode.WORKSPACE_NOT_FOUND:
                return this.httpExceptionHandlerService.handleError(exception, response, 401);
            case _authexception.AuthExceptionCode.INTERNAL_SERVER_ERROR:
            default:
                return this.httpExceptionHandlerService.handleError(exception, response, 500);
        }
    }
    constructor(httpExceptionHandlerService){
        this.httpExceptionHandlerService = httpExceptionHandlerService;
    }
};
AuthRestApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_authexception.AuthException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService
    ])
], AuthRestApiExceptionFilter);

//# sourceMappingURL=auth-rest-api-exception.filter.js.map