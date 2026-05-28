"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FrontComponentRestApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return FrontComponentRestApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _httpexceptionhandlerservice = require("../../../core-modules/exception-handler/http-exception-handler.service");
const _frontcomponentexception = require("../front-component.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FrontComponentRestApiExceptionFilter = class FrontComponentRestApiExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        switch(exception.code){
            case _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_NOT_FOUND:
            case _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_NOT_READY:
                return this.httpExceptionHandlerService.handleError(exception, response, 404);
            case _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_CREATE_FAILED:
            case _frontcomponentexception.FrontComponentExceptionCode.INVALID_FRONT_COMPONENT_INPUT:
                return this.httpExceptionHandlerService.handleError(exception, response, 400);
            case _frontcomponentexception.FrontComponentExceptionCode.FRONT_COMPONENT_ALREADY_EXISTS:
                return this.httpExceptionHandlerService.handleError(exception, response, 409);
            default:
                return this.httpExceptionHandlerService.handleError(exception, response, 500);
        }
    }
    constructor(httpExceptionHandlerService){
        this.httpExceptionHandlerService = httpExceptionHandlerService;
    }
};
FrontComponentRestApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_frontcomponentexception.FrontComponentException),
    (0, _common.Injectable)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService
    ])
], FrontComponentRestApiExceptionFilter);

//# sourceMappingURL=front-component-rest-api-exception.filter.js.map