"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DashboardRestApiExceptionFilter", {
    enumerable: true,
    get: function() {
        return DashboardRestApiExceptionFilter;
    }
});
const _common = require("@nestjs/common");
const _utils = require("twenty-shared/utils");
const _httpexceptionhandlerservice = require("../../../engine/core-modules/exception-handler/http-exception-handler.service");
const _dashboardexception = require("../exceptions/dashboard.exception");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let DashboardRestApiExceptionFilter = class DashboardRestApiExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        switch(exception.code){
            case _dashboardexception.DashboardExceptionCode.DASHBOARD_NOT_FOUND:
            case _dashboardexception.DashboardExceptionCode.PAGE_LAYOUT_NOT_FOUND:
                return this.httpExceptionHandlerService.handleError(exception, response, 404);
            case _dashboardexception.DashboardExceptionCode.DASHBOARD_DUPLICATION_FAILED:
                return this.httpExceptionHandlerService.handleError(exception, response, 500);
            default:
                (0, _utils.assertUnreachable)(exception.code);
        }
    }
    constructor(httpExceptionHandlerService){
        this.httpExceptionHandlerService = httpExceptionHandlerService;
    }
};
DashboardRestApiExceptionFilter = _ts_decorate([
    (0, _common.Injectable)(),
    (0, _common.Catch)(_dashboardexception.DashboardException),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _httpexceptionhandlerservice.HttpExceptionHandlerService === "undefined" ? Object : _httpexceptionhandlerservice.HttpExceptionHandlerService
    ])
], DashboardRestApiExceptionFilter);

//# sourceMappingURL=dashboard-rest-api-exception.filter.js.map