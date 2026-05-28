"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RouteTriggerRestApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return RouteTriggerRestApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _routetriggerexception = require("./route-trigger.exception");
const _httpexceptionhandlerservice = require("../../../../../exception-handler/http-exception-handler.service");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let RouteTriggerRestApiExceptionFilter = class RouteTriggerRestApiExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        switch(exception.code){
            case _routetriggerexception.RouteTriggerExceptionCode.WORKSPACE_NOT_FOUND:
            case _routetriggerexception.RouteTriggerExceptionCode.ROUTE_NOT_FOUND:
            case _routetriggerexception.RouteTriggerExceptionCode.TRIGGER_NOT_FOUND:
            case _routetriggerexception.RouteTriggerExceptionCode.LOGIC_FUNCTION_NOT_FOUND:
                return this.httpExceptionHandlerService.handleError(exception, response, 404);
            case _routetriggerexception.RouteTriggerExceptionCode.FORBIDDEN_EXCEPTION:
                return this.httpExceptionHandlerService.handleError(exception, response, 403);
            case _routetriggerexception.RouteTriggerExceptionCode.RATE_LIMIT_EXCEEDED:
                return this.httpExceptionHandlerService.handleError(exception, response, 429);
            case _routetriggerexception.RouteTriggerExceptionCode.LOGIC_FUNCTION_EXECUTION_ERROR:
                return this.httpExceptionHandlerService.handleError(exception, response, 500);
            case _routetriggerexception.RouteTriggerExceptionCode.ROUTE_ALREADY_EXIST:
            case _routetriggerexception.RouteTriggerExceptionCode.ROUTE_PATH_ALREADY_EXIST:
            default:
                {
                    return this.httpExceptionHandlerService.handleError(exception, response, 400);
                }
        }
    }
    constructor(httpExceptionHandlerService){
        this.httpExceptionHandlerService = httpExceptionHandlerService;
    }
};
RouteTriggerRestApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_routetriggerexception.RouteTriggerException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService
    ])
], RouteTriggerRestApiExceptionFilter);

//# sourceMappingURL=route-trigger-rest-api-exception-filter.js.map