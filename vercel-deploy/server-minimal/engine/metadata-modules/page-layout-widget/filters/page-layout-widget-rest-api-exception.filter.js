"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PageLayoutWidgetRestApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return PageLayoutWidgetRestApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _httpexceptionhandlerservice = require("../../../core-modules/exception-handler/http-exception-handler.service");
const _pagelayoutwidgetexception = require("../exceptions/page-layout-widget.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let PageLayoutWidgetRestApiExceptionFilter = class PageLayoutWidgetRestApiExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        switch(exception.code){
            case _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.PAGE_LAYOUT_WIDGET_NOT_FOUND:
                return this.httpExceptionHandlerService.handleError(exception, response, 404);
            case _pagelayoutwidgetexception.PageLayoutWidgetExceptionCode.INVALID_PAGE_LAYOUT_WIDGET_DATA:
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
PageLayoutWidgetRestApiExceptionFilter = _ts_decorate([
    (0, _common.Catch)(_pagelayoutwidgetexception.PageLayoutWidgetException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService
    ])
], PageLayoutWidgetRestApiExceptionFilter);

//# sourceMappingURL=page-layout-widget-rest-api-exception.filter.js.map