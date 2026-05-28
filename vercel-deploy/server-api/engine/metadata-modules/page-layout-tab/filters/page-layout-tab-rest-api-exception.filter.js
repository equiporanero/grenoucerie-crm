"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutTabRestApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return PageLayoutTabRestApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _httpexceptionhandlerservice = require("../../../core-modules/exception-handler/http-exception-handler.service");
const _pagelayouttabexception = require("../exceptions/page-layout-tab.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PageLayoutTabRestApiExceptionFilter = class PageLayoutTabRestApiExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        switch(exception.code){
            case _pagelayouttabexception.PageLayoutTabExceptionCode.PAGE_LAYOUT_TAB_NOT_FOUND:
                return this.httpExceptionHandlerService.handleError(exception, response, 404);
            case _pagelayouttabexception.PageLayoutTabExceptionCode.INVALID_PAGE_LAYOUT_TAB_DATA:
                return this.httpExceptionHandlerService.handleError(exception, response, 400);
            default:
                // TODO: change to 500 when we have input validation
                return this.httpExceptionHandlerService.handleError(exception, response, 400);
        }
    }
    constructor(httpExceptionHandlerService){
        this.httpExceptionHandlerService = httpExceptionHandlerService;
    }
};
PageLayoutTabRestApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_pagelayouttabexception.PageLayoutTabException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService
    ])
], PageLayoutTabRestApiExceptionFilter);

//# sourceMappingURL=page-layout-tab-rest-api-exception.filter.js.map