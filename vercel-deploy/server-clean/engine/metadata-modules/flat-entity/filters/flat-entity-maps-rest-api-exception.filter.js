"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlatEntityMapsRestApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return FlatEntityMapsRestApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _httpexceptionhandlerservice = require("../../../core-modules/exception-handler/http-exception-handler.service");
const _flatentitymapsexception = require("../exceptions/flat-entity-maps.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let FlatEntityMapsRestApiExceptionFilter = class FlatEntityMapsRestApiExceptionFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        switch(exception.code){
            case _flatentitymapsexception.FlatEntityMapsExceptionCode.RELATION_UNIVERSAL_IDENTIFIER_NOT_FOUND:
            case _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_NOT_FOUND:
                return this.httpExceptionHandlerService.handleError(exception, response, 404);
            case _flatentitymapsexception.FlatEntityMapsExceptionCode.ENTITY_ALREADY_EXISTS:
                return this.httpExceptionHandlerService.handleError(exception, response, 409);
            default:
                return this.httpExceptionHandlerService.handleError(exception, response, 500);
        }
    }
    constructor(httpExceptionHandlerService){
        this.httpExceptionHandlerService = httpExceptionHandlerService;
    }
};
FlatEntityMapsRestApiExceptionFilter = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _common.Catch)(_flatentitymapsexception.FlatEntityMapsException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService
    ])
], FlatEntityMapsRestApiExceptionFilter);

//# sourceMappingURL=flat-entity-maps-rest-api-exception.filter.js.map